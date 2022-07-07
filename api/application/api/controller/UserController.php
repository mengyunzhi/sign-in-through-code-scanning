<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
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

    public function userUpdate() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = Request()->param('id/d');
        $status = User::userSave($data, $data['role'], $msg, $id);
        User::updateUserSession();
        // return json_encode($status);
        if (!$status) {
            return $this->error('用户更新失败:'. $msg);
        }
        return json_decode(true);
    }
}
