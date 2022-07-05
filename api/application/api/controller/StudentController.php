<?php
namespace app\api\controller;   //命名空间，说明文件所在文件夹
use think\Controller;
use think\Request;
use app\common\model\Student;
use app\index\service\MenuService;
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Term;


class StudentControll extends Controller
{
	public function page() {
		$params = Request()->param();
		$where = '';
		$query = Student::order(['id desc'])->where($where);
		$students = $query->limit(
			$params['page'] * $params['size'],
			$params['size']
		)->select();
		$data['content'] = $students;
		$data['length'] = $query->count();
		return json_encode($data);
	}
}