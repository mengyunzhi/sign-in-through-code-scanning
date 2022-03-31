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
     *判断是否具有某个角色的权限
     */
    static public function checkAccessByRole($role)
    {
        return self::getCurrentLoginUserRole() === $role;
    }


    /**
     * 获取当前登录用户
     * @return 用户存在:用户的数组信息; 用户不存在:null
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
     * @param $mode false-根据mode判定权限是否匹配，true-根据$User->role字段选择跳转页面;
     * @param $callbackMessage 报错信息
     * @return 登录失败 false; 登录成功 true;
     *
     * 登录成功后存入session的是数组
     */
    static public function login($username, $password, $role, &$callbackMessage, $mode = false)
    {
        //传入数据存在null
        if (is_null($username) || is_null($password)) {
            // throw new Exception('用户名或密码为空');
            $callbackMessage = '用户名或密码为空';
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
                $callbackMessage = '学号不存在';
                return false;
            }
            //未注册返回 '未注册'
            if ($Student->state === 0) {
                $callbackMessage = '未注册';
                return false;
            }
            $User = self::get(['id' => $Student->user_id]);
        }
        //找不到数据
        if (is_null($User)) {
            $callbackMessage = '该用户不存在';
            return false;
        }
        if ($mode) {
            //存session（数组）
            $_SESSION[self::$SESSION_KEY_USER] = $User->toArray();
            if ((int)$User->role === self::$ROLE_TEACHER) {
                return 'Teacher';
            } else if ((int)$User->role === self::$ROLE_ADMIN) {
                return 'Admin';
            }
        }
        //查出的数据和角色不匹配
        if ($User->role != $role) {
            // throw new Exception("权限错误");
            $callbackMessage = '权限错误';
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
     * @param   $verificationCode 验证码判断
     * @return  不同错误返回不同信息
     */
    static public function register($sno, $number, $password, $verificationCode, &$callbackMessage)
    {
        //传入数据存在空值
        if (is_null($sno)) {
            $callbackMessage = '学号为空';
            return false;
        } elseif (is_null($number)) {
            $callbackMessage = '手机号为空';
            return false;
        } elseif (is_null($password)) {
            $callbackMessage = '密码为空';
            return false;
        }
        //学生表中查询数据
        $Student = Student::get(['sno' => $sno]);
        //学号不存在
        if (is_null($Student)) {
            $callbackMessage = '学号错误';
            return false;
        }
        if ($Student->state === 1) {
            $callbackMessage = '已注册';
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