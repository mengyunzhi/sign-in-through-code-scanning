<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Term;
use app\index\service\MenuService;
use think\Controller;
use think\Request;


class TermController extends Controller
{
    public function page() {
        return json(Term::all());
    }

    public function add() {
        $json_raw = file_get_contents("php://input");
        $data = json_decode($json_raw);
        $msg = '';
        $term = Term::termSave($data->name, $data->start_time, $data->end_time, $data->state, $msg);
        if ($status) {
            return $json_raw;
        } else {
            $this->error('添加失败:'.$msg);
        }

    }
}
