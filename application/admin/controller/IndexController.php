<?php
namespace app\admin\controller;
use app\common\model\Teacher;
use think\Request;
use think\Controller;
use app\index\controller\LoginController;

/**
 * 管理端
 */
class IndexController extends Controller
{       

    // public function __construct()
    // {
    //     parent::__construct();
        
    //     //判断是否登录
    //     if (!(Admin::isLogin())) {
    //         return $this->error('请先进行登录', url('login/index'));
    //     }
    // }
    
    public function __construct()
    {
        parent::__construct();
        session_start();
    }

    public function index()
    {
        return $this->fetch('login/index');
    }

}