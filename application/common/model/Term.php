<?php
namespace app\common\model;
use think\Model;

class Term extends Model {

    static public function activate($termId, &$msg = '') {
        if (is_null($termId) || empty($termId)) {
            throw new \Exception('未接收到学期id');
        }

        $Term = new Term;

        $status = $Term->where('state=1')->update(['state'=>0]);
        if (!$status) {
            $msg .= $Term->getError();
            throw new \Exception('激活失败:'.$Term->getError());
        }

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
        return isset($this->data['endTime']) ? $this->data['endTime'] : $this->data['endTime'] = date('Y-m-d', $this->start_time);
    }

    static public function getCurrentTerm()
    {
        return self::where('state', 'eq', 1)->find();
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
        
        //保存
        $Term = new Term;
        $Term->setAttr('name', $name);
        $startTimeStamp = strtotime($startTime);
        $endTimeStamp = strtotime($endTime);
        if ($startTimeStamp > $endTimeStamp) {
            $msg .= '开始时间晚于结束时间';
            return false;
        }        
        $Term->start_time = $startTimeStamp;
        $Term->end_time = $endTimeStamp;
        $Term->state = $state;
        $status = $Term->validate(true)->save() && self::activate($Term->getId, $msg);
        
        $msg .= $Term->getError();

        return $status;
    }
}