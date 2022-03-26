<?php
namespace app\common\model;
use think\Model;

class Student extends Model {

	static public $user = 'student';
	
	/**
	 * 判断密码是否正确
	 * 进行密码加密
	 * */
	public function checkPassword($password)
	{
		return ($this->getData('password') === $password);
	}

	static public function isLogin()
	{
		return isset($_SESSION[Student::$user]);
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

	/*
	 * 学生登录
	 * 登录成功就设置 $_SESSION[Student::$user] 并将id存入
	 */
	static public function login($postData)
	{
		$map = array("sno" => $postData['sno']);
		$student = self::get($map);
		if (!is_null($student)) {
			if (!is_null($student['password'])) {
				if ($student->checkPassword($postData['password'])) {
					$_SESSION[Student::$user] = $student->getData('id');
					return 1;
				}
			} else {
				return -1;
			}
		}
		return 0;
	}

	

}