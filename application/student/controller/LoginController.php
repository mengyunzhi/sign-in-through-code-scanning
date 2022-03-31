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
     * 学生登录界面 
     */
    public function index()
    {
        return $this->fetch();
    }

    /**
     * 移动端学生登录
     * 登录成功：跳转主页
     * 登录失败：返回登录界面
     * 未注册：提示未注册返回登录界面
     */
    public function login()
    {
        $role = User::$ROLE_STUDENT;
        $postData = Request::instance()->post();
        //数据校验
        if (!isset($postData['sno'])) {
            return $this->error('请输入学号');
        } elseif (!isset($postData['password'])) {
            return $this->error('请输入密码');
        }

        $status = User::login($postData['sno'], $postData['password'], $role);
        if (!$status) {
            return $this->error('登录失败');
        }
        return $this->success('登录成功', url('index/index'));
    }

    /**
     * 学生移动端注销
     * */
    public function logout()
    {
        User::logout();
        return $this->success('您已成功注销', url('login/index'));
    }

    /**
     * 注册
     * 如果学号存在，就将密码，手机号存入
     * */
    public function register()
    {
        $postData = Request::instance()->post();
        //数据校验
        if (!isset($postData['sno'])) {
            return $this->error('请输入学号');
        } elseif (!isset($postData['number'])) {
            return $this->error('请输入手机号');
        } elseif (!isset($postData['password'])) {
            return $this->error('请输入密码');
        } elseif (!isset($postData['verificationCode'])) {
            return $this->error('请输入验证码');
        }

        $status = User::register($postData['sno'], $postData['number'], $postData['password'],$postData['verificationCode']);

        if (!$status) {
            return $this->error('注册失败');
        }
        return $this->success('注册成功', url('studentLogin'));
    }

    public function studentRegister()
    {
        return $this->fetch();
    }

}