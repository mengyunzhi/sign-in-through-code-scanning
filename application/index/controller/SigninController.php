<?php
namespace app\index\controller;
use app\common\model\Teacher;
use think\Request;
use think\Controller;
use app\index\controller\LoginController;

/**
 * 管理端
 */
class SigninController extends IndexController
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

	public function PasswordSignIn()
	{
		return $this->fetch();
	}

	public function PasswordConfirmation()
	{
		return $this->fetch();
	}

	public function nosignin()
	{
		return $this->fetch();
	}

	public function alreadysignin()
	{
		return $this->fetch();
	}

	public function RegisterSuccess()
	{
		return $this->success('注册成功，正在转跳登录页面', url('StudentLogin'));  
	}
}