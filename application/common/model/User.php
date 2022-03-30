<?php
namespace app\common\model;
use app\common\model\Student;
use think\Model;

class User extends Model {
    public static $ROLE_ADMIN = 0;
    public static $ROLE_TEACHER = 1;
    public static $ROLE_STUDENT = 2;
    public static $USER_KEY_ID = 'userId';

    /**
     * session存在，返回role
     */
    static public function isLogin()
    {
        if (isset($_SESSION[self::$USER_KEY_ID])) {
            $User = self::get(['id' => $_SESSION[self::$USER_KEY_ID]]);
            return $User->role;
        }
    }

    /**
     * @param $username 用户名（学生是学号，其他用户是手机号; $password密码;$role 权限判断;$mode false-根据mode判定权限是否匹配，true-根据$User->role字段选择跳转页面
     * @return 登录失败 false; 登录成功 true;
     */
    static public function login($username, $password, $role, $mode = false)
    {
        //传入数据存在null
        if (is_null($username) || is_null($password)) {
            // throw new Exception('用户名或密码为空');
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
                return false;
            }
            //未注册返回 '未注册'
            if ($Student->state === 0) {
                return '未注册';
            }
            $User = self::get(['id' => $Student->user_id]);
        }
        //找不到数据
        if (is_null($User)) {
            return false;
        }
        if ($mode) {
            //存session
            $_SESSION[self::$USER_KEY_ID] = $User->id;
            if ((int)$User->role === self::$ROLE_TEACHER) {
                return 'Teacher';
            } else if ((int)$User->role === self::$ROLE_ADMIN) {
                return 'Admin';
            }
        }
        //查出的数据和角色不匹配
        if ($User->role != $role) {
            // throw new Exception("权限错误");
            return false;
        }
        //将查出数据的id存入session

        $_SESSION[self::$USER_KEY_ID] = $User->id;
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
    static public function register($sno, $number, $password)
    {
        if (is_null($sno) || is_null($number) || is_null($password)) {
            return '存在空值';
        }
        $Student = Student::get(['sno' => $sno]);

        if (is_null($Student)) {
            return '学号错误';
        }
        if ($Student->state === 1) {
            return '已注册';
        }
        $User = self::get(['id' => $Student->user_id]);
        $status = $Student->save(['state' => 1]) && $User->save(['number' => $number, 'password' => $password]);

        if (!$status) {
            return false;
        }

        return true;
    }
}