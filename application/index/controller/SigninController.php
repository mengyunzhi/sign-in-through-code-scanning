<?php
namespace app\index\controller;
use app\common\model\Teacher;
use think\Request;
use think\Controller;
use app\index\controller\LoginController;
use app\common\model\Student;

/**
 * 管理端
 */
class SignInController extends IndexController
{
	
	public function __construct()
	{
		parent::__construct();
		if (!Student::isLogin()) {
			return $this->error('请先进行登录', url('Login/studentLogin'));
		}
	}

	public function index()
	{
		$map = ["id" => $_SESSION['student']];
		$Student = Student::get($map);
		$this->assign('Student', $Student);
		return $this->fetch();
	}

	public function LoginSuccessV()
	{
		return $this->fetch();
	}	

	public function signIn()
	{
		return $this->success('签到成功', url('loginsuccessV'));  
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
}