<?php
namespace app\common\model;
use app\common\model\User;
use think\Model;

class Admin extends Model {

	static public $user = 'admin';

	/**
     *通过user_id获取管理员用户
     */
    public function getUser() 
    {
        $UserId = $this->data['user_id'];
        $this->data['user'] = User::get($UserId);
        return $this->data['user'];
    }

<<<<<<< HEAD
    /**
     *获取管理员的number字段
     */
    public function getNumber() 
    {
        return $this->getUser()->getNumber();
    }
=======
>>>>>>> d50a02672ef77d134f7b313b457a83259477a089

    /**
     *获取管理员的password字段
     */
    public function getPassword() 
    {
        return $this->getUser()->getPassword();
    }


    /**
     *获取管理员的name字段
     */
    public function getName() 
    {
        return $this->getUser()->getName();
    }

    /**
     *获取管理员的sex字段
     */
    public function getSex() 
    {
        return $this->getUser()->getSex();
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