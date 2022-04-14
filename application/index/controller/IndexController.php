<?php
namespace app\index\controller;     //命名空间，也说明了文件所在的文件夹
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
use app\common\model\Dispatch;
use think\Controller;
use think\Db;
use think\Request;
class IndexController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        if (is_null(User::getCurrentLoginUser())) {
            return $this->error('请先进行登录', url('login/index'));
        }
        if (!User::checkAccessByRole(User::$ROLE_TEACHER)) {
            return $this->error('您并不拥有操作当前模块的权限', url('login/index'));
        }
        $dispatchTime = Teacher::getDispatchTimeFromTermBegin(time());
        $week = $dispatchTime['week'];
        $this->assign('week', $week);
    }

    public function add() 
    {
        return $this->success('操作成功', url('index'));
    }

    public function courseAdd() 
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
        for ($i=0; $i < 11; $i++) { 
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

    public function courseDetail() 
    {

        $scheduleId = Request::instance()->param('schedule_id');
        $Schedule = Schedule::get($scheduleId);
        $this->assign('Schedule', $Schedule);
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
        $htmls = $this->fetch();

        return $htmls;
    }

    public function CourseEnd() 
    {
        return $this->success('课程已结束', url('index'));
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
        if (!isset($data['schedule_id'])) {
            return $this->error('无排课id');
        } elseif (!isset($data['klass_id'])) {
            return $this->error('无班级id');
        }
        $status = Teacher::courseKlassDelete($data['schedule_id'], $data['klass_id']);
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

    public function courseSave()
    {
        $postData = Request::instance()->post();
        $status = Teacher::courseSave($postData);
        if (!$status) {
            return $this->error('操作失败');
        }
        return $this->success('操作成功', url('courseSort'));
    }

    public function courseScheduleTerm()
    {
        $currentTerm = Term::getCurrentTerm();
        $scheduleIds = Schedule::where('term_id', 'eq', $currentTerm->getId())->column('id');
        $Dispatches = Dispatch::where('schedule_id', 'in', $scheduleIds)->order('week')->select();
        $this->assign('currentTerm', $currentTerm);
        $this->assign('Dispatches', $Dispatches);
        return $this->fetch();
    }

    public function courseScheduleWeek()
    {
        $userId = $_SESSION['user']['id'];
        $teacher = Teacher::where('user_id', $userId)->find();
        $teacherId = $teacher->getId();
        $scheduleIds = Schedule::where('teacher_id', 'eq', $teacherId)->column('id');
        $week = Request::instance()->param('week');
        $Dispatches = Dispatch::where('schedule_id', 'in', $scheduleIds)->where('week', 'eq', $week)->select();
        $this->assign('Dispatches', $Dispatches);
        return $this->fetch();
    }

    public function courseSort()
    {
        $data = Request::instance()->param();
        $teacherId = $_SESSION['user']['id'];

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

        $Schedules = $Schedule->order('id desc')->paginate(2, false, [
            'query'=>[
                'course_id' =>  $courseId,
                'term_id' => $termId
            ]]);
        $this->assign('Courses', $Courses);
        $this->assign('Terms', $Terms);
        $this->assign('Schedules', $Schedules);
        return $this->fetch();
    }

    public function courseStart() 
    {
        $htmls = $this->fetch();
        return $htmls;
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

    public function courseTimeSave()
    {
        $postData = Request::instance()->post();
        $status = Teacher::courseTimeSave($postData);
        if (!$status) {
            return $this->success('保存失败');
        }
        return $this->success('操作成功', url('courseDetail?schedule_id='.$postData['schedule_id']));
    }

    public function courseUpdate()
    {
        return $this->success('操作成功', url('courseDetail'));
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
        $teacher = Teacher::where('user_id', $_SESSION[User::$SESSION_KEY_USER]['id'])->find();
        $Schedules = Schedule::where('teacher_id', 'eq', $teacher->getId())->paginate();
        $this->assign('Schedules', $Schedules);
        $htmls = $this->fetch();
        return $htmls;
    }

    public function insert() 
    {
        return $this->success('操作成功', url('coursedetail'));
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
    

    public function QRCodeOpen() 
    {
        return $this->success('二维码开放成功', url('coursestart'));
    }

    public function QRCodeView() 
    {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function rankEdit() 
    {
        return $this->fetch();
    }

    public function save() 
    {
        return $this->success('操作成功', url('student'));
    }

    public function savefraction() 
    {
        return $this->success('操作成功', url('fraction'));
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

        $this->assign('Schedule', $Schedule);
        $htmls = $this->fetch();
        return $htmls;
    }

    public function studentAdd() 
    {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function studentSave()
    {
        return $this->success('操作成功', url('student'));
    }

    public function randomCode()
    {
        return $this->fetch();
    }

    public function rankUpdate() 
    {
        return $this->success('操作成功', url('courseStart'));
    }

    public function update() 
    {
        return $this->success('操作成功', url('coursedetail'));
    }

}