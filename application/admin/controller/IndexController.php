<?php
namespace app\admin\controller;
use app\common\model\Teacher;
use app\common\model\User;
use think\Request;
use think\Controller;

/**
 * 管理端
 */
class IndexController extends Controller
{       

    public function __construct()
    {
        parent::__construct();
        session_start();
        if ((int)User::isLogin() !== User::$ROLE_ADMIN) {
            return $this->error('当前未登录');
        }
    }

    public function index()
    {
        return $this->fetch('login/index');
    }

}