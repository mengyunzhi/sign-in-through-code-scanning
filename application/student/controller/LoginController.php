<?php
namespace app\student\controller;
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

    /**
     * 学生移动端注销
     * */
    public function logout()
    {
        session_unset();
        return $this->success('您已成功注销', url('login/studentLogin'));
    }

    /**
     * 注册
     * 如果学号存在，就将密码，手机号存入
     * */
    public function register()
    {
        $postData = Request::instance()->post();
        $status = User::register($postData['sno'], $postData['number'], $postData['password'],$postData['verificationCode'], $callbackMessage);

        if (!$status) {
            return $this->error('注册失败：' . $callbackMessage);
        }
        return $this->success('注册成功', url('studentLogin'));
    }

    /**
     * 学生登录界面 
     */
    public function studentLogin()
    {
        return $this->fetch();
    }

    public function studentRegister()
    {
        return $this->fetch();
    }

    /**
     * 移动端学生登录
     * 登录成功：跳转主页
     * 登录失败：返回登录界面
     * 未注册：提示未注册返回登录界面
     */
    public function signInStudentLogin()
    {
        $role = User::$ROLE_STUDENT;
        $postData = Request::instance()->post();
        $status = User::login($postData['sno'], $postData['password'], $role);
        if ($status === '未注册') {
            return $this->error('登录失败：该学号还未注册');
        } else if (!$status) {
            return $this->error('登录失败：用户名或密码错误');
        }
        return $this->success('登录成功', url('student/sign_in/index'));
    }

    /**
     * 学生移动端注销
     */
    public function signInStudentLogout() 
    {
        User::logout();
        return $this->success('已注销', url('studentLogin'));
    }
}