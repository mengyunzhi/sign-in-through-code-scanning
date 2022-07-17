<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Student;
use app\common\model\Schedule;
use app\common\model\ScheduleKlass;
use app\common\model\DispatchRoom;
use app\common\model\Dispatch;
use app\common\model\Room;
use app\common\model\Klass;
use app\index\service\MenuService;
use think\Controller;
use think\Request;
use think\Db;

class CourseScheduleController extends Controller
{

    //{week day lesson rooms clazzes course}
    // 
    public function getDataForWeek() {
        $teacher = Teacher::getLoginTeacher();
        $schedules = Schedule::where('teacher_id', $teacher->id)->select();
        $courses = [];
        $clazzes = [];
        $dispatches = [];
        $rooms = [];
        foreach ($schedules as $key => $schedule) {
            // 获取courses
            $courses[] = $schedule->getCourse();

            // 获取班级
            $clazzIds = ScheduleKlass::where('schedule_id', $schedule->id)->column('klass_id');
            $clazzes[$key] = [];
            foreach ($clazzIds as $clazzId) {
                $clazzes[$key][] = Klass::get($clazzId);
            }
            // 获取dispatches
            $dispatches[$key] = Dispatch::where('schedule_id', $schedule->id)->select();
            $rooms[$key] = [];
            $flag = [];
            foreach ($dispatches[$key] as $k => $dispatch) {
                $roomIds = DispatchRoom::where('dispatch_id', $dispatch->id)->column('room_id');
                $roomGruop = [];
                foreach ($roomIds as $roomId) {
                    $roomGruop[] = Room::get($roomId);
                }
                $rooms[$key][$k] = $roomGruop;
            }
        }
        $data['courses'] = $courses;
        $data['clazzes'] = $clazzes;
        $data['dispatches'] = $dispatches;
        $data['rooms'] = $rooms;
        return json_encode($data);
    }

}

