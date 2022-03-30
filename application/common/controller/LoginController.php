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
    
    public function __construct()
    {
        parent::__construct();
        session_start();
    }

    public function index() 
    {
        return $this->fetch();
    }

    public function MobileLogin() 
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
        $status = User::register($postData['sno'], $postData['number'], $postData['password']);
        if ($status === '存在空值') {
            return $this->error('注册失败：传入数据存在空值');
        } else if ($status === '学号错误') {
            return $this->error('注册失败：学号错误');
        } else if ($status === '已注册') {
            return $this->error('您已注册');
        } else if ($status === '注册失败') {
            return $this->error('注册失败');
        } else {
            return $this->success('注册成功', url('studentLogin'));
        }
        
    }

    public function studentLogin()
    {
        return $this->fetch();
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
     * 教师移动端注销
     */
    public function mobileTeacherLogout()
    {
        User::logout();
        return $this->success('已注销', url('mobileLogin'));
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
     * 学生移动端注销
     */
    public function signInStudentLogout() 
    {
        User::logout();
        return $this->success('已注销', url('studentLogin'));
    }

    /**
     * 管理员web端注销
     */
    public function webAdminLogout() 
    {
        User::logout();
        return $this->success('已注销', url('index'));
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

    /**
     * 教师web端注销
     */
    public function webTeacherLogout() 
    {
        User::logout();
        return $this->success('已注销', url('index'));
    }
}