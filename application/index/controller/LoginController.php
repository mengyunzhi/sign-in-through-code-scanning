<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
use app\common\model\Admin;
use app\common\model\Teacher;
use app\common\model\Student;

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

	public function studentLogin()
	{
        return $this->fetch();
	}

	/**
	 * 根据index不同，注销后跳转不同界面
	 * */
	public function logout()
	{
		session_unset();
		$index = Request::instance()->param('index');
		var_dump($index);
		return $this->success('您已成功注销', url('login/' . $index));
	}


	/**
	 * 根据role不同，调用不同类的登录方法，跳转不同界面
	 * */
	public function login()
	{
		$postData = Request::instance()->post();
		$role = $postData['role'];
		if ($role === 'student') {
			$status = Student::Login($postData);
			//通过$status返回值不同，报错不同
			if ($status === 1) {
				return $this->success('登录成功', url('SignIn/index'));	
			} else if ($status === 0) {
				return $this->error('登录失败：用户名或密码错误', url('login/studentLogin'));
			} elseif ($status === -1) {
				return $this->error('登录失败：当前学号尚未注册', url('login/studentLogin'));
			}
		} else if($role === 'teacher') {
			$status = Teacher::Login($postData);
			if ($status) {
				return $this->success('登录成功', url('mobile/index'));	
			} else {
				return $this->error('用户名或密码错误，请重新登录', url('login/mobileLogin'));
			}
		} else if($role === 'admin') {
			$status = Admin::Login($postData);
			if ($status) {
				return $this->success('登录成功', url('admin_term/index'));	
			} else {
				return $this->error('用户名或密码错误，请重新登录', url(''));
			}
		}

	}

	

}