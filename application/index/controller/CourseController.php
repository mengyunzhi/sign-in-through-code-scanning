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
class CourseController extends IndexController {

    public function getAllCoursesJson() {
        return json(Course::All());
    }
	
	public function courseAdd()
    {
        return $this->fetch();
    }


    public function courseSave()
    {
        $postData = Request::instance()->post();
        if (!isset($postData['name'])) {
            return $this->error('无课程名称');
        } elseif (!isset($postData['lesson'])) {
            return $this->error('无课时信息');
        }

        $Course = new Course;
        $Course->setAttr('name', $postData['name']);
        $Course->lesson = $postData['lesson'];
        $status = $Course->validate(true)->save();

        if (!$status) {
            return $this->error('添加失败：'.$Course->getError());
        }
        return $this->success('添加成功', url('index'));

    }

    public function courseEdit() 
    {
        $backUrl = $_SERVER["HTTP_REFERER"];
        $id = Request::instance()->param('id/d');
        $Course = Course::get($id);
        $this->assign('Course', $Course);
        $this->assign('backUrl', $backUrl);
        return $this->fetch();
    }

    public function courseUpdate() 
    {
        // 接收V层数据
        $course = Request::instance()->post();
        // 获取该条数据在User表中的id
        $Course_id = Request::instance()->post('id/d');
        // 找出user表中的对应数据
        $Course = Course::get($Course_id);
        // 进行数据更改
        $state = $Course->validate(true)->isUpdate(true)->save($course);
        if ($state === false) 
        {
            $message = '操作失败:' . $Course->getError();
            return $this->error($message);
        }
        return $this->success('操作成功', url('index'));
    }

    public function courseDelete() 
    {
        try {
            // 获取get数据
            $Request = Request::instance();
            // 获取要删除对象在course表中的id
            $course_id = Request::instance()->param('id/d');
            
            // 判断是否成功接收
            if (is_null($course_id) || 0 === $course_id) {
                throw new \Exception('未获取到ID信息', 1);
            }

            // 获取要删除的course对象
            $course = Course::get($course_id);

            // 要删除的对象在course表中存在
            if (is_null($course)) {
                throw new \Exception('不存在id为' . $course_id . '的教师，删除失败', 1);
            }

            // 删除course表中的对象
            if (!$course->delete()) {
                return $this->error('删除失败:' . $course->getError());
            }

        // 获取到ThinkPHP的内置异常时，直接向上抛出，交给ThinkPHP处理
        } catch (\think\Exception\HttpResponseException $e) {
            throw $e;

        // 获取到正常的异常时，输出异常
        } catch (\Exception $e) {
            return $e->getMessage();
        } 

        // 进行跳转
        return $this->success('删除成功', $Request->header('referer'));
    }

    public function index() {

        // 获取查询信息
        $name = Request::instance()->get('name');
        $lesson = Request::instance()->get('number');

        // 实例化User
        $Course = new Course; 

        // 定制查询信息,查询Course表中的数据
        if (!empty($name)) {
            $Course->where('name', 'like', '%' . $name . '%');
        }

        if (!empty($lesson)) {
            $Course->where('lesson', 'like', '%' . $lesson . '%');
        }


        // 每页显示5条数据
        $pageSize = 5;

        // 按条件查询数据并调用分页
        $Courses = $Course->paginate($pageSize, false, [
            'query'=>[
                'name' => $name,
                'lesson' => $lesson
                    ],
            ]);

        // 向V层传数据
        $this->assign('Courses', $Courses);
        $this->assign('name', $name);
        $this->assign('lesson', $lesson);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
}