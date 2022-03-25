<?php
namespace app\common\model;
use think\Model;

class Teacher extends Model {

	static public $user = 'teacher';

	/**
	 * 判断密码是否正确
	 * 进行密码加密
	 * */
	public function checkPassword($password)
	{
		return ($this->getData('password') === $password);
	}

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
		if (isset($_SESSION["static::user"])) {
			return true;
		} else {
			return false;
		}
	}

	/*
	 * 移动端教师登录
	 * 登录成功就设置 $_SESSION["static::user"] 并将id存入
	*/
	static public function login($postData)
	{
		$map = array("number" => $postData['number']);
		$Teacher = self::get($map);

		if (!is_null($Teacher)) {
			if ($Teacher->checkPassword($postData['password'])) {
				$_SESSION["static::user"] = $Teacher->getData('id');
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