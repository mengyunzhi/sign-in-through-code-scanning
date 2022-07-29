<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Student;
use app\common\model\Room;
use app\index\service\MenuService;
use think\Controller;
use think\Request;


class UserController extends Controller
{

    public function getCurrentLoginUser() {
        User::updateUserSession();
        $user = User::getCurrentLoginUser();
        if (is_null($user)) {
            return $this->error('获取当前登录用户失败');
        }
        return json_encode($user);
    }

    public function login() {
        $postData = Request()->param();
        if (!isset($postData['number']) || empty($postData['number'])) {
            return $this->error('未接收到手机号');
        } elseif (!isset($postData['password']) || empty($postData['password'])) {
            return $this->error('未接收到密码');
        }
        $User = User::login($postData['number'], $postData['password'], $msg);
        if (is_null($User)) {
            return $this->error('登录失败：'.$msg);
        }
        $url = User::getUrlByUser($User);
        return json_encode($User);
    }

    public function logout() {
        User::logout();
    }

    public function isLogin() {
        $moduleRole = Request()->param('moduleRole/d');
        $currentUser = User::getCurrentLoginUser();
        //登录校验
        if (is_null($currentUser)) {
            return $this->error('当前未登录');
        }
        //权限校验
        if (!User::checkAccessByRole($moduleRole)) {
            return $this->error('您并不拥有操作当前模块的权限');
        }
        return json_encode(true);
    }

    public function numberUnique() {
        $number = Request()->param('number');
        $id = Request()->param('id/d');
        $user = User::where('number', 'eq', $number)->find();
        if (!is_null($user) && ($id !== $user->getId())) {
            return json_encode('手机号已存在');
        }
    }

    public function studentRegister() {
        $data = json_decode(file_get_contents("php://input"));
        $student = Student::where('sno', $data->sno)->find();
        if (is_null($student)) {
            $this->error('注册失败：学号不存在');
            return '学号不存在';
        }
        $user = $student->getUser();
        if ($student->state === 1) {
            $this->error('注册失败：该用户已注册');
            return '该用户已注册';
        }
        if ($user->password !== $data->password) {
            $this->error('注册失败：密码错误');
            return json_encode(false);
        } 

        $user->number = $data->number;
        $status = $user->validate(true)->save();
        if ($status) {
            $student->state = 1;
            $status = $student->validate(true)->save();
        } else {
            $this->error('注册失败:'. $user->getError());
            return $user->getError();
        }
        
        return json_encode($status);
    }

    public function userUpdate() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = Request()->param('id/d');
        $status = User::userSave($data, $data['role'], $msg, $id);
        User::updateUserSession();
        if (!$status) {
            return $this->error('用户更新失败:'. $msg);
        }
        return json_decode(true);
    }

    public function updateTeacherIndexPassword() {
        $newTeacherIndexPassword = json_decode(file_get_contents("php://input"));
        $_SESSION['newTeacherIndexPassword'] = $newTeacherIndexPassword;
        // dump($_SESSION['newTeacherIndexPassword']);
        return json_decode($newTeacherIndexPassword);
    }

    public function getTeacherDefaultPassword() {
        $indexTeacherPassword = User::getDefaultPassword(User::$ROLE_TEACHER);
        return $indexTeacherPassword;
    }

    public function updateStudentIndexPassword() {
        $newStudentIndexPassword = json_decode(file_get_contents("php://input"));
        $_SESSION['newStudentIndexPassword'] = $newStudentIndexPassword;
        // dump($_SESSION['newStudentIndexPassword']);
        return json_decode($newStudentIndexPassword);
    }

    public function getStudentDefaultPassword() {
        $indexStudentPassword = User::getDefaultPassword(User::$ROLE_STUDENT);
        return $indexStudentPassword;
    }

}
