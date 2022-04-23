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

    public function login() {
        $postData = Request()->post();
        if (!isset($postData['number']) || empty($postData['number'])) {
            return $this->error('未接收到手机号');
        } elseif (!isset($postData['password']) || empty($postData['password'])) {
            return $this->error('未接收到密码');
        }
        $role = User::login($postData['number'], $postData['password'], $msg);
        if (is_null($role)) {
            return $this->error('登录失败：'.$msg);
        }
        $url = User::getUrlByRole($role);
        return $this->success('登录成功', url($url));
    }

    public function logout() {
        User::logout();
        return $this->success('已注销', url('index'));
    }

}