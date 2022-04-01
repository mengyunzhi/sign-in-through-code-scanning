<?php
namespace app\common\model;
use app\common\model\Student;
use think\Model;
use think\Exception;

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
     *通过id获取用户
     */
    static public function getUserById($id) 
    {
        $User = self::get($id);
        return $User;
    }

    /**
     *获取用户的number字段
     */
    static public function getNumber($id) 
    {
        $User = self::getUserById($id);
        return $User['number'];
    }

    /**
     *获取用户的password字段
     */
    static public function getPassword($id) 
    {
        $User = self::getUserById($id);
        return $User['password'];
    }

    /**
     *获取用户的role字段
     */
    static public function getRole($id) 
    {
        $User = self::getUserById($id);
        return $User['role'];
    }

    /**
     *获取用户的name字段
     */
    static public function getName($id) 
    {
        $User = self::getUserById($id);
        return $User['name'];
    }

    /**
     *获取用户的sex字段
     */
    static public function getSex($id) 
    {
        $User = self::getUserById($id);
        return $User['sex'];
    }

    /**
     *判断是否具有某个角色的权限
     */
    static public function checkAccessByRole($role)
    {
        return self::getCurrentLoginUserRole() === $role;
    }


    /**
     * 获取当前登录用户
     * @return 用户存在:User; 用户不存在:null
     */
    static public function getCurrentLoginUser() 
    {   
        return isset($_SESSION[User::$SESSION_KEY_USER]) ? $User = $_SESSION[User::$SESSION_KEY_USER]: null;
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
            //无数据返回false
            if (is_null($Student)) {
                throw new Exception('学号不存在');
                return false;
            }
            //未注册返回 '未注册'
            if ($Student->state === 0) {
                throw new Exception('未注册');
                return false;
            }
            $User = self::get(['id' => $Student->user_id]);
        }
        //找不到数据
        if (is_null($User)) {
            throw new Exception('该用户不存在');
            return false;
        }
        //查出的数据和角色不匹配
        if ($User->role != $role) {
            throw new Exception("权限错误");
            return false;
        }
        //将查出数据以数组形式存入session
        
        $_SESSION[self::$SESSION_KEY_USER] = $User->toArray();
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
            throw new Exception("学号错误");
            return false;
        }
        if ($Student->state === 1) {
            throw new Exception("已注册");
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