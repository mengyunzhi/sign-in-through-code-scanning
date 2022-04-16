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
class TaskController extends IndexController {

    public function CourseEnd() 
    {
        return $this->success('课程已结束', url('index'));
    }

    public function courseStart() 
    {
        $htmls = $this->fetch();
        return $htmls;
    }

    public function coursing()
    {
        return $this->fetch();
    }

    public function fraction() 
    {
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function fractionSave()
    {
        return $this->success('操作成功', url('student'));
    }

    public function index()
    {
        $currentUser = User::getCurrentLoginUser();
        $teacher = Teacher::where('user_id', 'eq', $currentUser->getId())->find();
        $Schedules = Schedule::where('teacher_id', 'eq', $teacher->getId())->paginate();

        $this->assign('Schedules', $Schedules);
        $htmls = $this->fetch();
        return $htmls;
    }

    public function klass()
    {
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function klassImport() 
    {
        $htmls = $this->fetch();

        return $htmls;
    }


    public function signInSeat() 
    {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function signInSeatAdd()
    {
        return $this->fetch();
    }

    public function signInSeatSave()
    {
        return $this->success('操作成功', url('coursing'));
    }

    public function signInStudent() 
    {
        $htmls = $this->fetch();

        return $htmls;
    }
    
    public function signInStudentAdd()
    {
        return $this->fetch();
    }

    public function signInStudentSave()
    {
        return $this->success('操作成功', url('coursing'));
    }

    public function student()
    {
        $scheduleId = Request::instance()->param('schedule_id');
        $Schedule = Schedule::get($scheduleId);
        $studentIds = StudentSchedule::where('schedule_id', 'eq', $scheduleId)->column('student_id');
        if (empty($studentIds)) {
            $studentIds = [0];
        }
        $Students = Student::where('id', 'in', $studentIds)->select();

        $this->assign('Students', $Students);
        $this->assign('Schedule', $Schedule);
        $htmls = $this->fetch();
        return $htmls;
    }

    public function studentAdd() 
    {
        $klasses = Klass::all();
        $this->assign('klasses', $klasses);
        $htmls = $this->fetch();

        return $htmls;
    }

    public function studentSave()
    {
        $postData = Request::instance()->post();
        if (!isset($postData['name'])) {
            return $this->error('无姓名信息');
        } elseif (!isset($postData['sex'])) {
            return $this->error('无性别信息');
        } elseif (!isset($postData['klass_id'])) {
            return $this->error('无班级id信息');
        } elseif (!isset($postData['sno'])) {
            return $this->error('无学号信息');
        } elseif (!isset($postData['number'])) {
            return $this->error('无电话信息');
        } elseif (!isset($postData['password'])) {
            return $this->error('无密码信息');
        }
        $message = '';
        $status = Student::studentSave($postData, $message);
        if (!$status) {
            return $this->error('添加失败：'.$message);
        }
        return $this->success('添加成功', url('student'));
    }

    public function randomCode()
    {
        return $this->fetch();
    }

    public function rankUpdate() 
    {
        return $this->success('操作成功', url('courseStart'));
    }

}