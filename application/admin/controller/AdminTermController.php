<?php
namespace app\admin\controller;
use think\Controller;
use think\Request;
use app\common\model\Admin;
use app\common\model\Term;

/**
 * 管理端
 */
class AdminTermController extends IndexController
{
    
    public function add()
    {
        return $this->fetch();
    }

    public function edit()
    {
        return $this->fetch();
    }

    public function index() 
    {
        $Terms = Term::paginate(2);
        $this->assign('Terms', $Terms);
        return $this->fetch();
    }

    public function save()
    {
        //数据接收和校验
        $postData = Request::instance()->post();
        if (empty($postData['name'])) {
            return $this->error('无学期名称');
        } elseif (empty($postData['start_time'])) {
            return $this->error('无学期开始时间');
        } elseif (empty($postData['end_time'])) {
            return $this->error('无学期结束时间');
        } elseif (is_null($postData['state'])) {
            return $this->error('无学期状态');
        }
        //保存
        $msg = '';
        $status = Term::termSave($postData['name'], $postData['start_time'], $postData['end_time'], $postData['state'], $msg);
        //跳转
        if (!$status) {
            return $this->error('操作失败：'.$msg);
        }
        return $this->success('操作成功', url('index'));
    }
    
}