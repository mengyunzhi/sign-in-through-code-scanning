<?php
namespace app\common\model;
use app\common\model\User;
use think\Model;

class Teacher extends Model {

	static public $user = 'teacher';

	/**
     *通过user_id获取教师用户
     */
    public function getUser() 
    {
        $UserId = $this->data['user_id'];
        $this->data['user'] = User::get($UserId);
        return $this->data['user'];
    }

    /**
     *获取教师的number字段
     */
    public function getNumber() 
    {
        return $this->getUser()->getNumber();
    }

    /**
     *获取教师的password字段
     */
    public function getPassword() 
    {
        return $this->getUser()->getPassword();
    }


    /**
     *获取教师的name字段
     */
    public function getName() 
    {
        return $this->getUser()->getName();
    }

    /**
     *获取教师的sex字段
     */
    public function getSex() 
    {
        return $this->getUser()->getSex();
    }


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
		if (isset($_SESSION[Teacher::$user])) {
			return true;
		} else {
			return false;
		}
	}

	/*
	 * 移动端教师登录
	 * 登录成功就设置 $_SESSION[Teacher::$user] 并将id存入
	 */
	static public function login($postData)
	{
		$map = array("number" => $postData['number']);
		$Teacher = self::get($map);

		if (!is_null($Teacher)) {
			if ($Teacher->checkPassword($postData['password'])) {
				$_SESSION[Teacher::$user] = $Teacher->getData('id');
				return true;
			}
		}
		return false;
	}
}