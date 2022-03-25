<?php
namespace app\common\model;
use think\Model;

class Teacher extends Model {

	public function getSexAttr($value) {
		$status = [
			'0'=>'男',
			'1'=>'女',
		];
		$sex = $status[$value];
		if (isset($sex)) {
			return $sex;
		} else {
			return $status[0];
		}
	}
	
	static public function isLogin()
	{
		if (isset($_SESSION['teacherId'])) {
			return true;
		} else {
			return false;
		}
	}
	//移动端教师登录
	//登录成功就设置 $_SESSION['teacherId'] 并将id存入
	static public function login($postData)
	{
		$map = array("number" => $postData['number']);
		$user = Teacher::get($map);

		if (!is_null($user)) {
			if ($postData['password'] === $user['password']) {
				$_SESSION['teacherId'] = $user->getData('id');
				return true;
			}
		}

		return false;
	}

	static public function logout()
	{
		session_unset();
	}

}