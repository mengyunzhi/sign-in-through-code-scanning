<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
use app\common\model\Admin;
use app\common\model\Teacher;
use app\common\model\Student;
use app\common\model\User;

/**
 * 管理端
 */
class PersonalController extends IndexController
{
    
    public function index() {
        $currentUser = User::getCurrentLoginUser();
        $this->assign('currentUser', $currentUser);
        return $this->fetch();
    }

    public function edit() {
        return $this->fetch();
    }

    public function update() {
        return $this->success('操作成功', url('index'));
    }
    
}