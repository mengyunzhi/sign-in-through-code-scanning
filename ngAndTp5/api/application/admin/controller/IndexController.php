<?php
namespace app\admin\controller;
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Term;
use app\index\service\MenuService;
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
        $currentUser = User::getCurrentLoginUser();
        //登录校验
        if (is_null($currentUser)) {
            return $this->error('请先进行登录', url('login/index'));
        }
        
        //权限校验
        if (!User::checkAccessByRole(User::$ROLE_ADMIN)) {
            return $this->error('您并不拥有操作当前模块的权限');
        }
        $MenuService = new MenuService;
        $this->assign('Menus', $MenuService->getCurrentMenus());
    }

    public function index()
    {
        $Terms = Term::paginate(2);
        $this->assign('Terms', $Terms);
        return $this->fetch('admin_term/index');
    }

}