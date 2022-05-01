<?php
namespace app\index\controller;
use app\common\model\Teacher;
use app\common\model\Admin;
use app\common\model\Student;
use app\common\model\Course;
use app\common\model\User;
use app\common\model\Klass;
use app\common\model\Room;
use app\common\model\Term;
use app\common\model\Schedule;
use app\common\model\Program;
use app\common\model\DispatchRoom;
use app\common\model\Dispatch;
use app\common\model\ScheduleKlass;
use app\common\model\StudentSchedule;
use app\index\service\MenuService;
use think\Controller;
use think\Db;
use think\Request;

/**
 * 管理端
 */
class VueController extends IndexController {

    public function getAllKlassesJson() {
        return json(Klass::All());
    }

    public function getAllScheduleKlassesJson() {
        return json(ScheduleKlass::All());
    }

    public function getAllCoursesJson() {
        //学期暂不考虑
        $courses = Course::column('id, name, lesson');
        $coursesWithScheduleIds = [];

        foreach ($courses as $course) {
            $course['schedule_ids'] = Schedule::where('course_id', 'eq', $course['id'])->column('id');
            $coursesWithScheduleIds[] = $course;
        }
        $coursesWithScheduleIdsAndKlassIds = [];
        foreach ($coursesWithScheduleIds as $coursesWithScheduleId) {
            if (empty($coursesWithScheduleId['schedule_ids'])) {
                $coursesWithScheduleId['schedule_ids'] = [0];
            }
            $coursesWithScheduleId['klassIds'] = ScheduleKlass::where('schedule_id', 'in', $coursesWithScheduleId['schedule_ids'])->column('klass_id');
            unset($coursesWithScheduleId['schedule_ids']);
            $coursesWithScheduleIdsAndKlassIds[] = $coursesWithScheduleId;
        }
        return json($coursesWithScheduleIdsAndKlassIds); 
    }

    public function getAllSchedulesJson() {
        return json(Schedule::All());
    }

    public function getDispatchesJson() {
        //通过学期 教师 班级 教室 原dispatches 获取数据如下
        //
        //学期，教师暂不考虑
        //
        //通过dispatches 获取 roomIds 
        ///找到每一个对应的roomIds
        $DisWithRoomIds;
        $Dispatches = Dispatch::column('id, schedule_id, week, day, lesson');
        foreach ($Dispatches as $Dispatch) {
            $Dispatch['roomIds'] = DispatchRoom::where('dispatch_id', 'eq', $Dispatch['id'])->column('room_id'); 
            $DisWithRoomIds[] = $Dispatch;
        }
        //通过dispatches 获取 klassIds
        ///找到每一个对应的scheduleId
        ///找到每一个scheduleId对应的klassIds
        $DisWithRoomIdsAndKlassIds;
        foreach ($DisWithRoomIds as $DisWithRoomId) {
            $DisWithRoomId['klassIds'] = ScheduleKlass::where('schedule_id', 'eq', $DisWithRoomId['schedule_id'])->column('klass_id'); 
            //去除无用项
            unset($DisWithRoomId['id'], $DisWithRoomId['schedule_id']);
            $DisWithRoomIdsAndScheduleIds[] = $DisWithRoomId;
        }
        return json($DisWithRoomIdsAndScheduleIds);
    }

    public function getAllRoomsJson() {
        return json(Room::All());
    }

    public function getTeacherJson() {
        $User = User::getCurrentLoginUser();
        $Teacher = Teacher::where('user_id', 'eq', $User->getId())->find();
        return json($Teacher);
    }
    
    public function getTermJson() {
        return json(Term::getCurrentTerm());
    }

}