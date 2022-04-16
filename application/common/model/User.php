<?php
namespace app\common\model;
use app\common\model\Student;
use think\Model;
use think\Exception;
use think\Db;   // 引用数据库操作类

class User extends Model {

    //管理员
    public static $ROLE_ADMIN = 0;
    //教师
    public static $ROLE_TEACHER = 1;
    //学生
    public static $ROLE_STUDENT = 2;
    //登录用户信息的session索引
    public static $SESSION_KEY_USER = 'user';

    /**
     * 获取id字段
     */
    public function getId() 
    {
        return isset($this->data['id']) ? $this->data['id'] : null;
    }

    /**
     *获取用户的number字段
     */
    public function getNumber() 
    {
        return isset($this->data['number']) ? $this->data['number'] : null;
    }

    /**
     *获取用户的password字段
     */
    public function getPassword() 
    {
        return isset($this->data['password']) ? $this->data['password'] : null;
    }

    /**
     *获取用户的role字段
     */
    public function getRole() 
    {
        return isset($this->data['role']) ? $this->data['role'] : null;
    }

    /**
     *获取用户的name字段
     */
    public function getName() 
    {
        return isset($this->data['name']) ? $this->data['name'] : null;
    }

    /**
     *获取用户的sex字段
     */
    public function getSex() 
    {
        return isset($this->data['sex']) ? $this->sex : null;
    }

    /**
     *通过user_id获取到学生对象
     */
    public function getStudentByUserId() 
    {
        $id = $this->getId();
        $student_id = Db::query("select * from yunzhi_student where user_id=" . $id);
        $student = Student::get($student_id[0]['id']);
        return $student;
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

    /**
     *判断是否具有某个角色的权限
     */
    static public function checkAccessByRole($role)
    {
        return self::getCurrentLoginUserRole() === $role;
    }

    /**
     * 判断密码是否正确
     * 进行密码加密(暂未实现)
     * */
    public function checkPassword($password)
    {
        return ($this->getData('password') === $password);
    }

    /**
     * 获取当前登录用户
     * @return 用户存在:User; 用户不存在:null
     */
    static public function getCurrentLoginUser() 
    {   
        return isset($_SESSION[User::$SESSION_KEY_USER]) ? unserialize($_SESSION[User::$SESSION_KEY_USER]) : null;
    }

    /**
     *获取当前登录用户的角色
     */
    static public function getCurrentLoginUserRole() 
    {
        return is_null(self::getCurrentLoginUser()) ? null : (int)self::getCurrentLoginUser()['role'];
    }

    /**
     * @param $username 用户名（学生是学号，其他用户是手机号; $password密码;
     * @param $role 权限判断;
     * @return 登录失败 false; 登录成功 true;
     *
     * 登录成功后存入session的是数组
     */
    static public function login($username, $password, $role)
    {
        //传入数据存在null
        if (is_null($username) || is_null($password)) {
            throw new Exception('用户名或密码为空');
            return false;
        }
        //不是学生使用手机号查
        if ($role != self::$ROLE_STUDENT) {
            $User = self::get(['number' => $username]);
        } else {
        //是学生使用学号查
            $Student = Student::get(['sno' => $username]);
            //无数据
            if (is_null($Student)) {
                // throw new Exception('学号不存在');
                return false;
            }
            //未注册
            if ($Student->state === 0) {
                // throw new Exception('未注册');
                return false;
            }
            $User = self::get(['id' => $Student->user_id]);
        }
        //找不到数据
        if (is_null($User)) {
            // throw new Exception('该用户不存在');
            return false;
        }
        //查出的数据和角色不匹配
        if ($User->role != $role) {
            // throw new Exception("权限错误");
            return false;
        }
        //密码校验
        if (!$User->checkPassword($password)) {
            return false;
        }

        //将查出数据存入session
        $_SESSION[self::$SESSION_KEY_USER] = serialize($User);
        return true;
    }

    static public function logout()
    {
        session_unset();
    }

    /**
     * @param   $sno      用来获取数据
     * @param   $number   存入user的手机号
     * @param   $password 存入user的密码
     * @return  不同错误返回不同信息
     */
    static public function register($sno, $number, $password, $verificationCode)
    {
        //传入数据存在空值
        if (is_null($sno)) {
            throw new Exception("学号为空");
        } elseif (is_null($number)) {
            throw new Exception("手机号为空");
            return false;
        } elseif (is_null($password)) {
            throw new Exception("密码为空");
            return false;
        }
        //学生表中查询数据
        $Student = Student::get(['sno' => $sno]);
        //学号不存在
        if (is_null($Student)) {
            // throw new Exception("学号错误");
            return false;
        }
        if ($Student->state === 1) {
            // throw new Exception("已注册");
            return false;
        }
        //student表中state改成1，user表中存入number和password
        $User = self::get(['id' => $Student->user_id]);
        $status = $Student->save(['state' => 1]) && $User->save(['number' => $number, 'password' => $password]);
        if (!$status) {
            return false;
        }

        return true;
    }
}