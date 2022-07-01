<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Term;
use app\index\service\MenuService;
use think\Controller;
use think\Request;


class IndexController extends Controller
{
    public function index() {
        return json(Term::all());
    }
}
