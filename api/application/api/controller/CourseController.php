<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
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
        $where = '';
        $query = Course::order(['id desc'])->where($where);
        $courses = $query->limit(
            $params['page'] * $params['size'],
            $params['size']
        )->select();
        $data['content'] = $courses;
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

    public function getById() {
        $id = Request()->param('id/d');
        return json(Course::get($id));
    }
}
