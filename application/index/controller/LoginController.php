<?php
namespace app\index\controller;
use think\Controller;
use think\Request;

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

	public function login() 
	{
		// 接收V层传入的数据
		$postData = Request::instance()->post();

		// 验证用户名何密码，不同的用户名密码将登录不同的端口
		if ($postData['username'] === 'teacher' && $postData['password'] === '111111') {
			return $this->success('登录成功', url('teacher/index'));
		} else {
			if ($postData['username'] === 'student' && $postData['password'] === '111111') {
				return $this->success('登录成功', url('student/index'));
			} else {
				if ($postData['username'] === 'admin' && $postData['password'] === '111111') {
					return $this->success('登录成功', url('admin_teacher/index'));
				} else {
					return $this->error('用户名或密码错误', url('login/index'));
				}
			}
		}
	}
}