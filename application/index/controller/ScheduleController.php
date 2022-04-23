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
class ScheduleController extends IndexController {

    public function A() 
    {
        $teacher_id = Teacher::get(1)->getId();
        $schedule = new Schedule;
        $dispatch = new Dispatch;
        $scheduleIds =  $schedule->where('teacher_id', $teacher_id)->column('id');
        for ($i = 0; $i < count($scheduleIds); $i++) {
            $weeks[$i] = $dispatch->where('schedule_id', $scheduleIds[$i])->column('week');
            $days[$i] = $dispatch->where('schedule_id', $scheduleIds[$i])->column('day');
            $lessons[$i] = $dispatch->where('schedule_id', $scheduleIds[$i])->column('lesson');
        }
        return json($weeks);
    }

    public function courseDetail() 
    {

        $scheduleId = Request::instance()->param('schedule_id');
        $Schedule = Schedule::get($scheduleId);
        $DispatchArr = $Schedule->getDispatches();
        $roomArr = [];
        for ($key = 0; $key < count($DispatchArr); $key++) {
            $dispatchRoom = DispatchRoom::where('dispatch_id', $DispatchArr[$key]['id'])->find();
            $roomId = $dispatchRoom->getRoomId();
            $room = Room::get($roomId);
            $roomArr[$key] = $room->getName();
        }
        $this->assign('Schedule', $Schedule);
        $this->assign('DispatchArr', $DispatchArr);
        $this->assign('roomArr', $roomArr);
        $htmls = $this->fetch();
        return $htmls;
    }

    public function courseDelete()
    {
        $scheduleId = (int)Request::instance()->param('schedule_id');
        if (!$scheduleId) {
            return $this->error('无排课id');
        }

        $status = Teacher::courseDelete($scheduleId);

        if (!$status) {
            return $this->error('删除失败');
        }
        return $this->success('删除成功');
    }

    public function courseEdit() 
    {
        $backUrl = $_SERVER["HTTP_REFERER"];
        $data = Request::instance()->param();
        $Course = Course::get($data['course_id']);
        $this->assign('backUrl', $backUrl);
        $this->assign('Course', $Course);
        $htmls = $this->fetch();

        return $htmls;
    }

    public function courseUpdate() 
    {
        // 接收V层数据
        $course = Request::instance()->post();
        // 获取该条数据在Course表中的id
        $course_id = Request::instance()->post('id');
        // 找出Course表中的对应数据
        $Course = Course::get($course_id);
        // 进行数据更改
        $state = $Course->validate(true)->isUpdate(true)->save($course);
        if ($state === false) 
        {
            $message = '操作失败:' . $Course->getError();
            return $this->error($message);
        }
        return $this->success('操作成功', url('coursesort'));
    }

    public function courseKlassAdd() 
    {
        $scheduleId = Request::instance()->param('schedule_id');
        $Schedule = Schedule::get($scheduleId);
        $existKlasses = $Schedule->Klasses;
        $Klasses = Teacher::excludeKlasses($existKlasses);
        $this->assign('Klasses', $Klasses);
        $this->assign('Schedule', $Schedule);
        $htmls = $this->fetch();
        return $htmls;
    }

    public function courseKlassDelete()
    {
        $data = Request::instance()->param();
        $scheduleKlass = new ScheduleKlass;
        $scheduleKlassId = $scheduleKlass->where('klass_id', $data['klass_id'])->find()->getScheduleId();
        if (!isset($scheduleKlassId)) {
            return $this->error('无排课id');
        } elseif (!isset($data['klass_id'])) {
            return $this->error('无班级id');
        }
        $status = Teacher::courseKlassDelete($scheduleKlassId, $data['klass_id']);
        if (!$status) {
            return $this->error('删除失败');
        }
        return $this->success('删除成功');
    }

    public function courseKlassSave()
    {
        $postData = Request::instance()->post();
        if (!isset($postData['schedule_id'])) {
            return $this->error('无课程调度id');
        } elseif (!isset($postData['klass_id'])) {
            return $this->error('未选择班级');
        }

        $status = Teacher::courseKlassSave($postData['schedule_id'], $postData['klass_id']);
        if (!$status) {
            return $this->error('保存失败');
        }
        return $this->success('操作成功', url('courseDetail?schedule_id='.$postData['schedule_id']));
    }

    public function courseProgramAdd() 
    {
        $scheduleId = Request::instance()->param('schedule_id');
        $Schedule = Schedule::get($scheduleId);
        $this->assign('Schedule', $Schedule);
        return $this->fetch();
    }

    public function courseProgramDelete()
    {
        $programId = Request::instance()->param('program_id');
        if (!$programId) {
            return $this->error('无项目id');
        }
        $status = Teacher::courseProgramDelete($programId);
        if (!$status) {
            return $this->error('删除失败');
        }
        return $this->success('删除成功');
    }

    public function courseProgramEdit() 
    {
        return $this->fetch();
    }

    public function courseProgramSave()
    {
        $postData = Request::instance()->post();
        if (!isset($postData['schedule_id'])) {
            $this->error('无课程调度id');
        } elseif(!isset($postData['name'])) {
            $this->error('请输入姓名');
        } elseif(!isset($postData['lesson'])) {
            $this->error('请输入课时');
        }

        $Schedule = Schedule::get($postData['schedule_id']);
        $status = Teacher::courseProgramSave($postData['name'], $postData['lesson'], $Schedule->course_id);


        if (!$status) {
            return $this->error('保存失败');
        }
        return $this->success('操作成功', url('courseDetail?schedule_id='.$Schedule->id));
    }

    public function courseProgramUpdate()
    {
        $postData = Request::instance()->post();
        if (!isset($postData['program_id'])) {
            return $this->error('无项目id');
        } elseif (!isset($postData['name'])) {
            return $this->error('未输入姓名称');
        } elseif (!isset($postData['lesson'])) {
            return $this->error('未输入学时');
        } elseif (!isset($postData['schedule_id'])) {
            return $this->error('无课程调度id');
        }
        $status = Teacher::courseProgramUpdate($postData['program_id'], $postData['name'], $postData['lesson']);
        if (!$status) {
            return $this->error('更新失败');
        }
        return $this->success('更新成功', url('courseDetail?schedule_id='.$postData['schedule_id']));
    }
    
    public function courseSort()
    {
        $data = Request::instance()->param();
        $currentUser = User::getCurrentLoginUser();

        $userId = $currentUser->getId();
        $Teacher = Teacher::where('user_id', 'eq', $userId)->find();
        $Schedule = new Schedule;

        $Courses = Course::all();
        $Terms = Term::all();
        $courseId = $termId = '';

        if (!empty($data['course_id'])) {
            $courseId = $data['course_id'];
            $Schedule->where('course_id', 'eq', $courseId);
        }

        if (!empty($data['term_id'])) {
            $termId = $data['term_id'];
            $Schedule->where('term_id', 'eq', $termId);
        }

        $Schedules = $Schedule->where('teacher_id', 'eq', $Teacher->getId())->order('id desc')->paginate(5, false, [
            'query'=>[
                'course_id' =>  $courseId,
                'term_id' => $termId
            ]]);
        $this->assign('Courses', $Courses);
        $this->assign('Terms', $Terms);
        $this->assign('Schedules', $Schedules);
        return $this->fetch();
    }

    public function courseTimeAdd() 
    {
        //周几
        $dayArray = ['一','二','三','四','五','六','日'];
        //所有教室
        $Rooms = Room::all();
        $scheduleId = Request::instance()->param('schedule_id');
        $Schedule = Schedule::get($scheduleId);

        $this->assign('Schedule', $Schedule);
        $this->assign('Rooms', $Rooms);
        $this->assign('dayArray', $dayArray);
        return $this->fetch();
    }

    public function courseTimeAndRoomDelete() 
    {
        $dispatchId = Request::instance()->param('dispatch_id');
        if (!$dispatchId) {
            return $this->error('调度id');
        }
        $status = Dispatch::courseTimeAndRoomDelete($dispatchId);
        if (!$status) {
            return $this->error('删除失败');
        }
        return $this->success('删除成功');
    }

    public function courseTimeSave()
    {
        $postData = Request::instance()->post();
        $status = Teacher::courseTimeSave($postData);
        if (!$status) {
            return $this->success('保存失败');
        }
        return $this->success('操作成功', url('courseDetail?schedule_id='.$postData['schedule_id']));
    }

    public function scheduleAdd() 
    {
        //获取课程
        $Courses = Course::all();
        $this->assign('Courses', $Courses);
        //获取班级
        $Klasses = Klass::all();
        $this->assign('Klasses', $Klasses);
        //7行
        $Rows = [];
        for ($i=0; $i < 7; $i++) { 
            $Rows[$i] = $i;
        }
        //11列
        $Cols = [];
        for ($i=0; $i < 5; $i++) { 
            $Cols[$i] = $i;
        }
        //周几
        $dayArray = ['一','二','三','四','五','六','日'];
        //多少周 可以通过term的start和end计算
        $Weeks = [];
        for ($i=0; $i < 11; $i++) { 
            $Weeks[$i] = $i;
        }
        //所有教室
        $Rooms = Room::all();
        //传参
        $this->assign('Weeks', $Weeks);
        $this->assign('Rooms', $Rooms);
        $this->assign('dayArray', $dayArray);
        $this->assign('Rows', $Rows);
        $this->assign('Cols', $Cols);
        $htmls = $this->fetch();
        return $htmls;
    }

    public function scheduleSave()
    {
        $postData = Request::instance()->post();
        if (empty($postData['klass_id'][0])) {
            return $this->error('无班级信息');
        } elseif (empty($postData['course_id'])) {
            return $this->error('无课程信息');
        }
        
        $status = Teacher::scheduleSave($postData);
        if (!$status) {
            return $this->error('操作失败');
        }
        return $this->success('操作成功', url('courseSort'));
    }

}