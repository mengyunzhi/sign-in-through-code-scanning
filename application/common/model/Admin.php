<?php
namespace app\common\model;
use think\Model;

class Admin extends Model {

	static public $user = 'admin';

	/**
     *通过id获取管理员
     */
    static public function getAdminById($id) 
    {
        $Admin = self::get($id);
        return $Admin;
    }

    /**
     *获取管理员的user_id字段
     */
    static public function getUserId($id) 
    {
        $Admin = self::getAdminById($id);
        return $Admin['user_id'];
    }

	public function getSexAttr($value) 
	{
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
		if (isset($_SESSION[Admin::$user])) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 判断密码是否正确
	 * 进行密码加密
	 * */
	public function checkPassword($password)
	{
		return ($this->getData('password') === $password);
	}

	static public function login($postData)
	{
		$map = array("number" => $postData['number']);
		$Admin = self::get($map);

		if (!is_null($Admin)) {
			if ($Admin->checkPassword($postData['password'])) {
				$_SESSION[Admin::$user] = $Admin->getData('id');
				return true;
			}
		}
		return false;
	}

}