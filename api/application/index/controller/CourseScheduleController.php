<?php
namespace app\index\controller;
use app\common\model\Teacher;
use app\common\model\Admin;
use app\common\model\Student;
use app\common\model\User;
use app\common\model\Course;
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
class CourseScheduleController extends IndexController {
    
    public function courseScheduleTerm()
    {
        $currentTerm = Term::getCurrentTerm();
        $scheduleIds = Schedule::where('term_id', 'eq', $currentTerm->getId())->column('id');
        if(empty($scheduleIds)) $scheduleIds = [0];
        $Dispatches = Dispatch::where('schedule_id', 'in', $scheduleIds)->order('week')->select();

        $currentUser = User::getCurrentLoginUser();
        $userId = $currentUser->getId();
        $teacher = Teacher::where('user_id', $userId)->find();
        $teacherId = $teacher->getId();
        $scheduleIds1 = Schedule::where('teacher_id', 'eq', $teacherId)->column('id');
        $week = Request::instance()->param('week');
        if (empty($scheduleIds1)) {
            $scheduleIds1 = [0];
        }
        $DispatchesByTeacher = Dispatch::where('schedule_id', 'in', $scheduleIds1)->order('week')->select();


        $Dispatches =  array_intersect($Dispatches, $DispatchesByTeacher);

        $this->assign('currentTerm', $currentTerm);
        $this->assign('Dispatches', $Dispatches);
        return $this->fetch();
    }

    public function courseScheduleWeek()
    {
        $currentUser = User::getCurrentLoginUser();
        $userId = $currentUser->getId();
        $teacher = Teacher::where('user_id', $userId)->find();
        $teacherId = $teacher->getId();
        $scheduleIds = Schedule::where('teacher_id', 'eq', $teacherId)->column('id');
        $week = Request::instance()->param('week');
        if (empty($scheduleIds)) {
            $scheduleIds = [0];
        }
        $Dispatches = Dispatch::where('schedule_id', 'in', $scheduleIds)->where('week', 'eq', $week)->select();
        $this->assign('Dispatches', $Dispatches);
        return $this->fetch();
    }
}