<?php
namespace app\common\model;
use think\Model;

class Term extends Model {

    /**
     * 学期激活
     * @author chenshihang 858190647@qq.com
     * @param  [int]  $termId [学期id]
     * @param  string  &$msg   [报错信息]
     * @param  boolean $judge  [是否判断state，区分用户激活还是插入数据的时候的激活]
     * @return boolean        成功 true；失败 false
     */
    static public function activate($termId, &$msg = '', $judge=false) {
        if (is_null($termId) || empty($termId)) {
            throw new \Exception('未接收到学期id');
        }
        //获取学期，state是1直接返回
        $Term = Term::get($termId);
        if ($judge) {
            if (!$Term->state) {
                return true;
            }
        }
        //激活学期
        $Term->where('state=1')->update(['state'=>0]);
        $status = $Term->where("id=$termId")->update(['state'=>1]);
        if (!$status) {
            $msg .= $Term->getError();
            throw new \Exception('激活失败:'.$Term->getError());
        }

        return $status;
    }

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getName() {
        return isset($this->data['name']) ? $this->data['name'] : null;
    }

    public function getState() {
        if (isset($this->data['state'])) {
            if ($this->state === 0) {
                return '未激活';
            } else {
                return '已激活';
            }
        } else {
            return null;
        }
    }

    public function getStartTime() {
        return isset($this->data['startTime']) ? $this->data['startTime'] : $this->data['startTime'] = date('Y-m-d', $this->start_time);
    }

    public function getEndTime() {
        return isset($this->data['endTime']) ? $this->data['endTime'] : $this->data['endTime'] = date('Y-m-d', $this->end_time);
    }

    static public function getCurrentTerm()
    {
        return self::where('state', 'eq', 1)->find();
    }

    /**
     * 插入学期数据
     * @author chenshihang 858190647@qq.com
     * @param  string &$msg      [description]
     * @param  [type] $termId    [新增的时候不需要，更新的时候需要]
     * @return [bool]            [成功 true ；失败 false]
     */
    static public function termInsert($name, $startTime, $endTime, $state, &$msg = '', $termId = null) 
    {
        if (is_null($termId)) {
            $Term = new Term;
        } else {
            $Term = self::get($termId);
        }

        //存入数据
        $Term->setAttr('name', $name);
        $startTimeStamp = strtotime($startTime);
        $endTimeStamp = strtotime($endTime);
        if ($startTimeStamp > $endTimeStamp) {
            $msg .= '开始时间晚于结束时间';
            return false;
        }
        $Term->start_time = $startTimeStamp;
        $Term->end_time = $endTimeStamp;
        if (!is_null($state)) {
            $Term->state = $state;
        }
        //插入数据、学期激活
        $status = $Term->validate(true)->save() && self::activate($Term->getId, $msg, true);
        $msg .= $Term->getError();
        return $status;
    }

    static public function termSave($name, $startTime, $endTime, $state, &$msg = '')
    {
        //检查数据
        if (is_null($name)) {
            throw new \Exception('name信息为空');
        } elseif (is_null($startTime)) {
            throw new \Exception('startTime');
        } elseif (is_null($endTime)) {
            throw new \Exception('endTime');
        } elseif (is_null($state)) {
            throw new \Exception('state');
        }
        $status = self::termInsert($name, $startTime, $endTime, $state, $msg);
        return $status;
    }

    static public function termUpdate($termId, $name, $startTime, $endTime, &$msg = '', $state = null) {
        //检查数据
        if (is_null($name)) {
            throw new \Exception('name信息为空');
        } elseif (is_null($startTime)) {
            throw new \Exception('startTime');
        } elseif (is_null($endTime)) {
            throw new \Exception('endTime');
        }
        $status = self::termInsert($name, $startTime, $endTime, $state, $msg, $termId);
        return $status;
    }

}