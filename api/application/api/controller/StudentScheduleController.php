<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\StudentSchedule;
use app\common\model\Room;
use app\index\service\MenuService;
use think\Controller;
use think\Request;


class StudentScheduleController extends Controller
{
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
}
