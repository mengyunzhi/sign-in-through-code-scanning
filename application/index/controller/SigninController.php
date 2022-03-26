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
        return $this->fetch();
	}

	public function LoginSuccess()
	{
		return $this->success('操作成功', url('index'));
	}


	public function dontRegister()
	{
        return $this->error('检测到您未注册，请先注册', url('StudentRegister'));
	}

	/**
	 * 注册
	 * 如果学号存在，就将密码，手机号存入
	 * */
	public function register()
	{
		$postData = Request::instance()->post();
		$map = ['sno' => $postData['sno']];
		$Student = Student::get($map);
		if (is_null($Student)) {
			//学号不存在
			return $this->error('注册失败：学号不存在，请联系教师', url('StudentRegister'));
		}
		if (!empty($Student['password'])) {
			//已经注册
			return $this->error('注册失败：该学号已经注册过,请进行登录', url('login/studentLogin'));
		}

		$Student->password = $postData['password'];
		$Student->number = $postData['number'];
		//保存
		$status = $Student->validate()->save();
		if (!$status) {
			$message = '注册失败' . $Student->getError();
			return $this->error($message);
		}
		return $this->success('注册成功', url('login/studentLogin'));
	}

	public function studentRegister()
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