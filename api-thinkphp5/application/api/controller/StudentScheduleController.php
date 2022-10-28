<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Student;
use app\common\model\ScheduleKlass;
use app\common\model\Klass;
use app\common\model\StudentSchedule;
use app\common\model\Room;
use app\index\service\MenuService;
use think\Controller;
use think\Request;
use think\Db;


class StudentScheduleController extends Controller
{
    public function add() {
        $data = json_decode(file_get_contents("php://input"));
        $studentSchedule = new StudentSchedule;
        $studentSchedule->student_id = $data->student_id;
        $studentSchedule->schedule_id = $data->schedule_id;
        if (!$studentSchedule->save()) {
            return $this->error('studentschedule添加失败'.$studentSchedule->getError());
        }
        return json_encode(true);
    }

    public function deleteByStudentId() {
        $data = Request()->param();
        $map['student_id'] = $data['student_id'];
        $map['schedule_id'] = $data['schedule_id'];
        $studentSchedule = StudentSchedule::where($map)->find();
        if (!$studentSchedule->delete()) {
            return $this->error('删除失败:'.$studentSchedule->getError());
        }
        return json_encode(true);
    }

    public function getForAddByScheduleId() {
        $scheduleId = Request()->param('schedule_id/d');
        $studentIds = StudentSchedule::where('schedule_id', $scheduleId)->column('student_id');
        $clazzes = Klass::all();
        $students = [];
        foreach ($clazzes as $key => $clazz) {
            $students[$key] = Student::where('klass_id', $clazz->id)->select();
            foreach ($students[$key] as $i => $student) {
                $students[$key][$i]->user = $student->getUser();
            }
        }
        $data['studentIds'] = $studentIds;
        $data['clazzes'] = $clazzes;
        $data['students'] = $students;
        return json_encode($data);
    }
}
