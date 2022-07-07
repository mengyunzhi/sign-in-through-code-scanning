<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Student;
use app\index\service\MenuService;
use think\Controller;
use think\Request;
use think\Db;

class ClazzController extends Controller
{

    public function add() {
        $data = json_decode(file_get_contents("php://input"));
        $status = Klass::klassSave($data->name, $data->entrance_date, $data->length, $msg);
        if (!$status) {
            return $this->error('班级添加失败:'. $msg);
        }
        return json_encode($status);
    }

    public function clazzMembers() {
        $clazz_id = Request()->param('clazz_id');
        $params = Request()->param();
        Db::name('student');
        $where['klass_id'] = ["=", $clazz_id];
        $query = Db::table('yunzhi_user')->alias('user')
        ->join('yunzhi_student student', 'user.id = student.user_id')->order('student.id desc')->where($where);

        $data['content'] = $query->limit(
            $params['page'] * $params['size'],
            $params['size'])->select();
        $data['length'] = $query->where($where)->count();
        return json_encode($data);
    }

    public function delete() {
        $id = Request()->param('id/d');
        $clazz = Klass::get($id);
        $status = $clazz->delete();
        if (!$status) {
            return $this->error('班级删除失败:'.$clazz->getError());
        }
        return json_encode($status);
    }

    public function getById() {
        $id = Request()->param('id/d');
        return json_encode(Klass::get($id));
    }

    public function page() {
        // page 和 size
        $params = Request()->param();
        $where = [];
        $query = Klass::order(['id desc'])->where($where);

        $clazzes = $query->limit(
            $params['page'] * $params['size'],
            $params['size']
        )->select();

        foreach ($clazzes as $clazz) {
            $clazz['number_of_students'] = Student::where('klass_id', 'eq', $clazz->id)->count();
        }
        $data['content'] = $clazzes;
        $data['length'] = $query->count();
        return json_encode($data);
    }

    public function update() {
        $id = Request()->param('id/d');
        $data = json_decode(file_get_contents("php://input"));
        $clazz = Klass::get($id);
        $clazz->setAttr('name', $data->name);
        $clazz->entrance_date = strtotime($data->entrance_date);
        $clazz->length = $data->length;
        $status = $clazz->validate(true)->save();
        if (!$status) {
            return $this->error('班级更新失败:'.$clazz->getError());
        }
        return json_encode($status);
    }

    public function getAll() {
        return Klazz::getAll();
    }

}

