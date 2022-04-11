<?php
namespace app\common\model;
use app\common\model\Klass;
use think\Model;

class Student extends Model {

    /**
     *通过user_id获取学生用户
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
     * 获取klass_id字段
     */
    public function getKlassId() 
    {
        return $this->data['klass_id'];
    }

    /**
     * 获取学生所在班级
     */
    public function getKlass() 
    {
        return isset($this->data['klass']) ? $this->data['klass'] : $this->data['klass'] = Klass::get($this->getKlassId());
    }
    
    /**
     *通过获取sno(学号)字段
     */
    public function getSno() 
    {
        return $this->data['sno'];
    }

    /**
     *通过获取state字段
     */
    public function getState() 
    {
        return $this->data['state'];
    }

    /**
     *获取学生的number字段
     */
    public function getNumber() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getNumber() : null;
    }

    /**
     *获取学生的password字段
     */
    public function getPassword() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getPassword() : null;
    }


    /**
     *获取学生的name字段
     */
    public function getName() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getName() : null;
    }

    /**
     *获取学生的sex字段
     */
    public function getSex() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getSex() : null;
    }

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