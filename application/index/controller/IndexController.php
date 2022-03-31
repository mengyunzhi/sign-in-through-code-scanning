<?php
namespace app\index\controller;
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
        if (!User::checkAccessByRole(User::$ROLE_TEACHER)) {
            return $this->error('您并不拥有操作当前模块的权限', url('login/index'));
        }
    }

    public function index()
    {
        return $this->fetch();
    }
}