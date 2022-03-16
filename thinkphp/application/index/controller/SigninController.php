<?php
namespace app\index\controller;
use app\common\model\Teacher;
use think\Request;
use think\Controller;
use app\index\controller\LoginController;

/**
 * 管理端
 */
class SigninController extends Controller
{
	
	public function index()
	{
        return $this->fetch();
	}

	public function LoginSuccess()
	{
		return $this->success('操作成功', url('index'));
	}

	public function dontLogin()
	{
        return $this->error('检测到您未登录，请先登录', url('StudentLogin'));
	}

	public function StudentLogin()
	{
        return $this->fetch();
	}

	public function dontRegister()
	{
        return $this->error('检测到您未注册，请先注册', url('StudentRegister'));
	}

	public function StudentRegister()
	{
        return $this->fetch();
	}

	public function signIn()
	{
		return $this->success('签到成功', url('loginsuccessV'));  
	}

	public function verificationCode()
	{
        return $this->fetch();
	}

	public function loginsuccessV()
	{
        return $this->fetch();
	}
}