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

    public function index() {
        $postData = Request::instance()->param();
        if (!empty($postData)) {
            return json($postData);
        }else {
            return '是空';
        }
    }

    public function getAllKlassesJson() {
        return json(Klass::All());
    }

    public function getCurrentTermStartTimeJson() {
        return json(Term::getCurrentTerm()->getStartTime());
    }

    public function getCurrentTermEndTimeJson() {
        return json(Term::getCurrentTerm()->getEndTime());
    }

    public function getAllDispatchsWeekJson() {
        $result = [];
        $dispatches = Dispatch::All();
        foreach ($dispatches as $dispatch) {
            array_push($result, $dispatch->getWeek());
        }
        return json($result);
    }

    public function getAllDispatchRosJson() {
        $result = [];
        $dispatcheRos = DispatchRoom::All();
        foreach ($dispatcheRos as $dispatchRo) {
            array_push($result, $dispatchRo);
        }
        return json($result);
    }

    public function getAllDispatchsJson() {
        $result = [];
        $dispatches = Dispatch::All();
        foreach ($dispatches as $dispatch) {
            array_push($result, $dispatch);
        }
        return json($result);
    }

    public function getAllDispatchsRoomJson() {
        $dispatchRoomes = [];
        $dispatchRoom = new DispatchRoom;
        $dispatches = Dispatch::All();
        foreach ($dispatches as $dispatch) {
            array_push($dispatchRoomes, $dispatchRoom->where('dispatch_id', $dispatch->getId())->find()->getRoomId());
        }
        return json($dispatchRoomes);
    }

    public function getAllScheduleKlassesJson() {
        return json(ScheduleKlass::All());
    }

    public function getAllCoursesJson() {
        $courses = Course::column('id, name, lesson');
        $coursesWithScheduleIds = [];
        $term = Term::getCurrentTerm();
        foreach ($courses as $course) {
            $course['schedule_ids'] = Schedule::where("course_id=".$course['id']." AND term_id=$term->id")->column('id');
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

    public function getDispatchesJson() {;
        //通过学期获取调度
        $user = User::getCurrentLoginUser();
        $term = Term::getCurrentTerm();
        $scheduleIds = Schedule::where("term_id=$term->id")->column('id');
        $Dispatches = Dispatch::where('schedule_id', 'in', $scheduleIds)->column('id, schedule_id, week, day, lesson');

        //通过dispatches 获取 teacherId
        $DisWithTeacherId = [];
        foreach ($Dispatches as $Dispatch) {
            $Dispatch['teacherId'] = Schedule::where('id', 'eq', $Dispatch['schedule_id'])->column('teacher_id')[0]; 
            $DisWithTeacherId[] = $Dispatch;
        }
        $rooms=[];
        //通过dispatches 获取 roomIds
        ///找到每一个对应的roomIds放到rooms
        foreach ($DisWithTeacherId as $Dispatch) {
            $roomIds = DispatchRoom::where('dispatch_id', 'eq', $Dispatch['id'])->column('room_id');
            foreach ($roomIds as $roomId) {
                $rooms[$Dispatch['week']][$Dispatch['day']*11 + $Dispatch['lesson']][] = $roomId;
            }
        }
        $DisWithRoomIds = [];
        foreach ($DisWithTeacherId as $Dispatch) {
            $Dispatch['roomIds'] = $rooms[$Dispatch['week']][$Dispatch['day']*11 + $Dispatch['lesson']];
            $DisWithRoomIds[]=$Dispatch;
        }

        //通过dispatches 获取 klassIds
        ///找到每一个对应的scheduleId
        ///找到每一个scheduleId对应的klassIds
        $DisWithRoomIdsAndKlassIds = [];
        foreach ($DisWithRoomIds as $DisWithRoomId) {
            $DisWithRoomId['klassIds'] = ScheduleKlass::where('schedule_id', 'eq', $DisWithRoomId['schedule_id'])->column('klass_id'); 
            //去除无用项
            unset($DisWithRoomId['id'], $DisWithRoomId['schedule_id']);
            $DisWithRoomIdsAndKlassIds[] = $DisWithRoomId;
        }
        return json($DisWithRoomIdsAndKlassIds);
    }

    public function getAllRoomsJson() {
        return json(Room::All());
    }

    public function getKlassesJson() {
        return 1;
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