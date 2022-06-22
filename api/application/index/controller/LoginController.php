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

    public function test() {
        return 1231233;
    }

    public function login() {
        $postData = Request()->post();
        if (!isset($postData['number']) || empty($postData['number'])) {
            return $this->error('未接收到手机号');
        } elseif (!isset($postData['password']) || empty($postData['password'])) {
            return $this->error('未接收到密码');
        }
        $User = User::login($postData['number'], $postData['password'], $msg);
        if (is_null($User)) {
            return $this->error('登录失败：'.$msg);
        }
        $url = User::getUrlByUser($User);
        return $this->success('登录成功', url($url));
    }

    public function logout() {
        User::logout();
        return $this->success('已注销', url('index'));
    }

    public function studentRegister() {
        return $this->fetch();
    }

    /**
     * 注册
     * */
    public function register()
    {
        $postData = Request::instance()->post();
        //数据校验
        if (!isset($postData['sno']) || empty($postData['sno'])) {
            return $this->error('请输入学号');
        } elseif (!isset($postData['password']) || empty($postData['password'])) {
            return $this->error('请输入密码');
        } elseif (!isset($postData['number']) || empty($postData['number'])) {
            return $this->error('请输入手机号');
        } elseif (!isset($postData['verificationCode']) || empty($postData['verificationCode'])) {
            return $this->error('请输入验证码');
        }
        $msg = '';
        $status = User::register($postData['sno'], $postData['number'], $postData['password'], $postData['verificationCode'], $msg);

        if (!$status) {
            return $this->error('注册失败:'.$msg);
        }
        return $this->success('注册成功', url('index'));
    }

}
