<?php
namespace app\common\controller;
use think\Controller;
use think\Request;
use app\common\model\Admin;
use app\common\model\Teacher;
use app\common\model\Student;
use app\common\model\User;

/**
 * 管理端
 */
class LoginController extends Controller
{
    
    public function index() 
    {
        return $this->fetch();
    }

    public function MobileLogin() 
    {
        return $this->fetch();
    }



    public function studentLogin()
    {
        return $this->fetch();
    }

    /**
     * 注册
     * 如果学号存在，就将密码，手机号存入
     * */
    public function register()
    {
        $postData = Request::instance()->post();
        $map = ['sno' => $postData['sno']];
        $Student = Student::get($map);
        if (is_null($Student)) {
            //学号不存在
            return $this->error('注册失败：学号不存在，请联系教师', url('StudentRegister'));
        }
        if (!empty($Student['password'])) {
            //已经注册
            return $this->error('注册失败：该学号已经注册过,请进行登录', url('login/studentLogin'));
        }

        $Student->password = $postData['password'];
        $Student->number = $postData['number'];
        //保存
        $status = $Student->validate()->save();
        if (!$status) {
            $message = '注册失败' . $Student->getError();
            return $this->error($message);
        }
        return $this->success('注册成功', url('login/studentLogin'));
    }

    public function studentRegister()
    {
        return $this->fetch();
    }

    /**
     * 根据index不同，注销后跳转不同界面
     * */
    public function logout()
    {
        session_unset();
        $index = Request::instance()->param('index');
        return $this->success('您已成功注销', url('login/' . $index));
    }

    /**
     * 移动端教师登录
     * 登录成功：跳转主页
     * 登录失败：返回登录界面
     */
    public function mobileTeacherLogin()
    {
        $role = User::$ROLE_TEACHER;
        $postData = Request::instance()->post();
        $status = User::login($postData['number'], $postData['password'], $role);
        if ($status === false) {
            return $this->error('登录失败：用户名或密码错误');
        }
        return $this->success('登录成功', url('index/mobile/index'));
    }

    /**
     * 移动端学生登录
     * 登录成功：跳转主页
     * 登录失败：返回登录界面
     * 未注册：提示未注册返回登录界面
     */
    public function signInStudentLogin()
    {
        $role = User::$ROLE_STUDENT;
        $postData = Request::instance()->post();
        $status = User::login($postData['sno'], $postData['password'], $role);
        if ($status === '未注册') {
            return $this->error('登录失败：该学号还未注册');
        } else if (!$status) {
            return $this->error('登录失败：用户名或密码错误');
        }
        return $this->success('登录成功', url('student/sign_in/index'));
    }

    /**
     * 管理员与教师的web端登录
     * 登录成功：跳转主页
     * 登录失败：返回登录界面
     */
    public function webLogin() 
    {
        $postData = Request::instance()->post();
        $status = User::login($postData['number'], $postData['password'], 'not student', true);
        if ($status === 'Admin') {
            return $this->success('登录成功', url('admin/admin_term/index'));
        } else if ($status === 'Teacher') {
            return $this->success('登录成功', url('index/teacher/index'));
        }
        return $this->error('登录失败：用户名或密码错误');
    }
}