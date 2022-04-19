<?php
namespace app\index\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\index\service\MenuService;
use think\Controller;
use think\Request;

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
        if (!User::checkAccessByRole(User::$ROLE_TEACHER)) {
            return $this->error('您并不拥有操作当前模块的权限', url('login/index'));
        }

        //获取学期开始到现在的调度时间  周/天/节
        $dispatchTime = Teacher::getDispatchTimeFromTermBegin(time());
        $week = $dispatchTime['week'];
        $MenuService = new MenuService;

        //通过登录用户获取菜单
        $this->assign('Menus', $MenuService->getCurrentMenus());
        $this->assign('week', $week);
    }

    public function index()
    {
        $currentUser = User::getCurrentLoginUser();
        $teacher = Teacher::where('user_id', 'eq', $currentUser->getId())->find();
        $Schedules = Schedule::where('teacher_id', 'eq', $teacher->getId())->paginate();
        
        $this->assign('Schedules', $Schedules);
        $htmls = $this->fetch('task/index');
        return $htmls;
    }

}