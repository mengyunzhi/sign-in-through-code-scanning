<?php
namespace app\api\controller;   //命名空间，说明文件所在文件夹
use think\Controller;
use think\Request;
use think\Db;
use app\common\model\Student;
use app\index\service\MenuService;
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Term;


class StudentController extends Controller
{
	public function page() {
		$params = Request()->param();
		$where = '';
		Db::name('Student');
		$query = Db::table('yunzhi_user')->alias('user')
		->join('yunzhi_student student', 'user_id = student.user_id')
		->order(['student.id desc'])->where($where);
		
		$students = $query->limit(
			$params['page'] * $params['size'],
			$params['size']
		)->select();
		$data['content'] = $students;
		$data['length'] = $query->count();
		return json_encode($data);
	}

	public function delete() {
        $id = Request()->param('id/d');
        $student = Student::get($id);
        $status = $student->delete();
        if ($status) {
            return json_encode($student);
        } else {
            return $student->getError();
        }
    }
}