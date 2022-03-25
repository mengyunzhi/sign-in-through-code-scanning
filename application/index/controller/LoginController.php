<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
use app\common\model\Admin;
use app\common\model\Teacher;

/**
 * 管理端
 */
class LoginController extends IndexController
{
	
	public function index() 
	{
		return $this->fetch();
	}

	public function MobileLogin() 
	{
		return $this->fetch();
	}

	public function login() 
	{
		// 接收V层传入的数据
		$postData = Request::instance()->post();
	}
	
	public function mobileTeacherLogin()
	{
		$postData = Request::instance()->post();
		if (Teacher::Login($postData)) {
			return $this->success('登录成功', url('mobile/index'));	
		} else {
			return $this->error('用户名或密码错误，请重新登录', url('login/mobileLogin'));
		}
	}

	public function mobileTeacherLogout()
	{
		Teacher::logout();
		return $this->success('您已成功注销', url('login/mobileLogin'));
	}

}