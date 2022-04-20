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
        $termId = Request()->param('term_id');
        $Term = Term::get($termId);
        $this->assign('Term', $Term);
        return $this->fetch();
    }

    public function index() 
    {
        $termId = Request()->param('term_id/d');

        if (!empty($termId) && $termId) {
            Term::activate($termId);
        }

        $Terms = Term::order(['state desc', 'id desc'])->paginate(5);
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

    public function update() {
        $postData = Request()->post();
        if (!isset($postData['term_id']) || empty($postData['term_id'])) {
            return $this->error('无学期id');
        } elseif (!isset($postData['name']) || empty($postData['name'])) {
            return $this->error('无学期名称');
        } elseif (!isset($postData['start_time']) || empty($postData['start_time'])) {
            return $this->error('无学期开始日期');
        } elseif (!isset($postData['end_time']) || empty($postData['end_time'])) {
            return $this->error('无学期结束日期');
        } 
        $msg = '';
        $status = Term::termUpdate($postData['term_id'] ,$postData['name'], $postData['start_time'], $postData['end_time'], $msg);
        if (!$status) {
            return $this->error('操作失败：'. $msg);
        }
        return $this->success('保存成功', url('index'));
    }
    
}