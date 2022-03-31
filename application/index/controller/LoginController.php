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
        $postData = Request::instance()->post();
        //数据校验
        if (!isset($postData['number'])) {
            return $this->error('请输入手机号');
        } elseif (!isset($postData['password'])) {
            return $this->error('请输入密码');
        }

        $status = User::login($postData['number'], $postData['password'], User::$ROLE_TEACHER);
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
     * 教师web端登录
     * 登录成功：跳转主页
     * 登录失败：返回登录界面
     */
    public function webLogin() 
    {
        $postData = Request::instance()->post();
        //数据校验
        if (!isset($postData['number'])) {
            return $this->error('请输入手机号');
        } elseif (!isset($postData['password'])) {
            return $this->error('请输入密码');
        }
        
        $status = User::login($postData['number'], $postData['password'], User::$ROLE_TEACHER);
        if (!$status) {
            return $this->error('登录失败：用户名或密码错误');
        }
        return $this->success('登录成功', url('index/index'));
    }

    /**
     * 教师web端注销
     */
    public function webLogout()
    {
        User::logout();
        return $this->success('已注销', url('index'));
    }
}