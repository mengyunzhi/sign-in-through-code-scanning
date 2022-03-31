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
class LoginController extends Controller
{
    
    public function __construct()
    {
        parent::__construct();
    }

    public function index() 
    {
        return $this->fetch();
    }

    public function MobileLogin() 
    {
        return $this->fetch();
    }

    /**
     * 移动端教师登录
     * 登录成功：跳转主页
     * 登录失败：返回登录界面
     */
    public function mobileTeacherLogin()
    {
        $role = User::$ROLE_TEACHER;
        $postData = Request::instance()->post();
        $status = User::login($postData['number'], $postData['password'], $role);
        if ($status === false) {
            return $this->error('登录失败：用户名或密码错误');
        }
        return $this->success('登录成功', url('index/mobile/index'));
    }

    /**
     * 教师移动端注销
     */
    public function mobileTeacherLogout()
    {
        User::logout();
        return $this->success('已注销', url('mobileLogin'));
    }


    /**
     * 管理员与教师的web端登录
     * 登录成功：跳转主页
     * 登录失败：返回登录界面
     */
    public function webLogin() 
    {
        $postData = Request::instance()->post();
        $status = User::login($postData['number'], $postData['password'], 'not student', true);
        if ($status === 'Admin') {
            return $this->success('登录成功', url('admin/admin_term/index'));
        } else if ($status === 'Teacher') {
            return $this->success('登录成功', url('index/teacher/index'));
        }
        return $this->error('登录失败：用户名或密码错误');
    }

    /**
     * 教师web端注销
     */
    public function webTeacherLogout() 
    {
        User::logout();
        return $this->success('已注销', url('index'));
    }
}