<?php
namespace app\index\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use think\Controller;
use think\Request;

class MobileController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        if (is_null(User::getCurrentLoginUser())) {
            return $this->error('请先进行登录', url('login/mobileLogin'));
        }
        if (!User::checkAccessByRole(User::$ROLE_TEACHER)) {
            return $this->error('您并不拥有操作当前模块的权限');
        }
    }

    public function index()
    {
        // 取回打包后的数据
        $htmls = $this->fetch();
        // 将数据返回给用户
        return $htmls;
    }

    public function courseEnd() {
        return $this->success('课程已结束', url('index'));
    }

    public function courseStart() 
    {
        return $this->fetch();
    }

    public function coursing()
    {
        return $this->fetch();
    }

    public function randomCode()
    {
        return $this->fetch();
    }

    public function signInSeat() {
        $htmls = $this->fetch();
        return $htmls;
    }

    public function signInStudent() {
        $htmls = $this->fetch();
        return $htmls;
    }
}