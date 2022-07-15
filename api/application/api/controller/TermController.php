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
        $params = Request()->param();
        $query = Term::order(['state desc', 'id desc'])
                 ->where('name', 'like', '%' . $params['searchName'] . '%');
        $terms = $query->limit(
            $params['page'] * $params['size'],
            $params['size']
        )->select();
        $data['content'] = $terms;
        $query = $query->where('name', 'like', '%' . $params['searchName'] . '%');
        $data['length'] = $query->count();
        return json_encode($data);
    }

    public function test() {
        $list = Db::name('yunzhi_term')->where('status',1)->paginate(10);
    }

    public function allTerms() {
        return Term::all();
    }

    public function add() {
        $json_raw = file_get_contents("php://input");
        $data = json_decode($json_raw);
        $msg = '';
        $status = Term::termSave($data->name, $data->start_time, $data->end_time, $data->state, $msg);
        if ($status) {
            return $json_raw;
        } else {
            $this->error('添加失败:'.$msg);
        }
    }

    public function getById() {
        $id = Request()->param('id/d');
        return json(Term::get($id));
    }

    public function update() {
        $id = Request()->param('id/d');
        $term = json_decode(file_get_contents("php://input"));

        $status = Term::termUpdate(
            $id,
            $term->name,
            $term->start_time,
            $term->end_time,
            $msg,
            $term->state
        );
        if ($status) {
            return json_encode($status);
        } else {
            $this->error('添加失败:'.$msg);
            return $msg;
        }
    }

    public function activate() {
        $id = file_get_contents("php://input");
        $status = Term::activate($id);
        return json_encode($status ? true : false);
    }

    public function delete() {
        $id = Request()->param('id/d');
        $term = Term::get($id);
        $status = $term->delete();
        if ($status) {
            return json_encode($term);
        } else {
            return $term->getError();
        }
    }
}
