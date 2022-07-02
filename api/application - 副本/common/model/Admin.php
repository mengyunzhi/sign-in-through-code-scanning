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
        if (isset($this->data['user'])) {
            return $this->data['user'];
        }

        $UserId = isset($this->data['user_id']) ? $this->data['user_id'] : null;
        $this->data['user'] = User::get($UserId);
        return $this->data['user'];
    }

    /**
     * 获取id字段
     */
    public function getId() 
    {
        return isset($this->data['id']) ? $this->data['id'] : null;
    }

    /**
     *获取管理员的number字段
     */
    public function getNumber() 
    {

        return !is_null($this->getUser()) ? $this->getUser()->getNumber() : null;
    }

    /**
     *获取管理员的password字段
     */
    public function getPassword() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getPassword() : null;
    }


    /**
     *获取管理员的name字段
     */
    public function getName() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getName() : null;
    }

    /**
     *获取管理员的sex字段
     */
    public function getSex() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getSex() : null;
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