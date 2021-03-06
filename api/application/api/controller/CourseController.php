<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Program;
use app\common\model\Course;
use app\index\service\MenuService;
use think\Controller;
use think\Request;


class CourseController extends Controller
{
    /*
    * index页面
    */
    public function page() {
        $params = Request()->param();
        $where['name'] = ['like', '%' . $params['searchName'] . '%'];
        if (!empty($params['searchLesson'])) {
            $where['lesson'] = ['eq', $params['searchLesson']];
        }

        $query = Course::order(['id desc'])
                    ->where($where);
        $courses = $query->limit(
            $params['page'] * $params['size'],
            $params['size']
        )->select();
        $data['content'] = $courses;

        $query = $query->where($where);
        $data['length'] = $query->count();
        return json_encode($data);
    }

    /*
    * 新增课程
    */
    public function add() {
        $json_raw = file_get_contents("php://input");
        $data = json_decode($json_raw);
        $msg = '';
        $course = new Course;
        $course->setAttr('name', $data->name);
        $course->lesson = $data->lesson;
        $status = $course->validate(true)->save();
        if ($status) {
            return $json_raw;
        } else {
            $this->error('添加失败:'.$msg);
        }
    }

    public function courseNameUnique() {
        $name = Request()->param('name');
        $course_id = Request()->param('course_id/d');
        $course = Course::where('name', 'eq', $name)->find();
        if (!is_null($course) && ($course_id !== $course->getId())) {
            return json_encode('名称已存在');
        }
    }

    /*
    * 通过id获取课程
    */
    public function getById() {
        $id = Request()->param('id/d');
        return json(Course::get($id));
    }

    /*
    * 更新课程
    */
    public function update() {
        $id = Request()->param('id/d');
        $postData = json_decode(file_get_contents("php://input"));
        $msg = '';
        $course = Course::get($id);
        if (!is_null($postData)) {
            // 写入更新的数据
            $course->setAttr('name', $postData->name);
            $course->lesson = $postData->lesson;
        }
        $status = $course->validate(true)->save();
        if ($status) {
            return json_encode($status);
        } else {
            this.error('添加失败:', $msg);
            return $msg;
        }
    }

    /*
    * 删除课程
    */
    public function delete() {
        $id = Request()->param('id/d');
        $course = Course::get($id);
        
        Program::where('course_id', $id)->delete();
        $course->delete();
        return json_encode($course);
    }
}
