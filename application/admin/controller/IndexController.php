<?php
namespace app\admin\controller;
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Term;
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
        if (is_null(User::getCurrentLoginUser())) {
            return $this->error('请先进行登录', url('login/index'));
        }
        if (!User::checkAccessByRole(User::$ROLE_ADMIN)) {
            return $this->error('您并不拥有操作当前模块的权限');
        }
    }

    public function index()
    {
        $Terms = Term::paginate(2);
        $this->assign('Terms', $Terms);
        return $this->fetch('admin_term/index');
    }

}