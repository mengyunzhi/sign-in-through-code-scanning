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


class LoginController extends Controller
{
    
    public function index() 
    {
        return $this->fetch();
    }

    /**
     * 管理员web端注销
     */
    public function logout() 
    {
        User::logout();
        return $this->success('已注销', url('index'));
    }

    /**
     * 管理员web端登录
     * 登录成功：跳转主页
     * 登录失败：返回登录界面
     */
    public function Login() 
    {
        $postData = Request::instance()->post();
        //数据校验
        if (!isset($postData['number'])) {
            return $this->error('请输入手机号');
        } elseif (!isset($postData['password'])) {
            return $this->error('请输入密码');
        }
        
        $status = User::login($postData['number'], $postData['password'], User::$ROLE_ADMIN);
        if (!$status) {
            return $this->error('登录失败：用户名或密码错误');
        }
        return $this->success('登录成功', url('admin/admin_term/index'));
    }

}