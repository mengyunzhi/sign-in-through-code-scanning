<?php
namespace app\admin\controller;
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
    
    public function index() 
    {
        $currentUser = User::getCurrentLoginUser();
        $this->assign('currentUser', $currentUser);
        return $this->fetch();
    }
    
}