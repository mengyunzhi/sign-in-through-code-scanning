<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Student;
use app\common\model\Schedule;
use app\common\model\ScheduleKlass;
use app\common\model\Klass;
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

    /* 已经选过某个课程的班级 */
    public function clazzesHaveSelectCourse() {
        $course_id = Request()->param('course_id/d');
        $scheduleIds = Schedule::where('course_id', $course_id)->column('id');
        if (!$scheduleIds) $scheduleIds = [0];
        $klassIds = ScheduleKlass::where('schedule_id', 'in', $scheduleIds)->column('klass_id');
        return json_encode($klassIds);
    }

    public function clazzMembers() {
        $clazz_id = Request()->param('clazz_id');
        $params = Request()->param();
        Db::name('student');
        $where['klass_id'] = ["=", $clazz_id];
        $query = Db::table('yunzhi_user')->alias('user')
        ->join('yunzhi_student student', 'user.id = student.user_id')
        ->field('user.id as user_id, user.name, user.sex, student.sno')
        ->order('student.id desc')
        ->where($where)
        ->where('user.name', 'like', '%' . $params['searchName'] . '%')
        ->where('student.sno', 'like', '%' . $params['searchSno'] . '%');
        

        $data['content'] = $query->limit(
            $params['page'] * $params['size'],
            $params['size'])->select();
        $query = Db::table('yunzhi_user')->alias('user')
        ->join('yunzhi_student student', 'user.id = student.user_id')
        ->field('user.id as user_id, user.name, user.sex, student.sno')
        ->order('student.id desc')
        ->where($where)
        ->where('user.name', 'like', '%' . $params['searchName'] . '%')
        ->where('student.sno', 'like', '%' . $params['searchSno'] . '%');
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
        $query = Klass::order(['id desc'])
                  ->where('name', 'like', '%' . $params['searchName'] . '%');

        $clazzes = $query->limit(
            $params['page'] * $params['size'],
            $params['size']
        )->select();

        foreach ($clazzes as $clazz) {
            $clazz['number_of_students'] = Student::where('klass_id', 'eq', $clazz->id)->count();
        }
        $data['content'] = $clazzes;
        $query = $query->where('name', 'like', '%' . $params['searchName'] . '%');
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
        return json_encode(Klass::all());
    }

}

