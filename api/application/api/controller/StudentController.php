<?php
namespace app\api\controller;   //命名空间，说明文件所在文件夹
use think\Controller;
use think\Request;
use app\common\model\Student;
use app\index\service\MenuService;
use app\common\model\User;
use app\common\model\Klazz;


class StudentController extends Controller
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

	public function add() {
		// name: string, sex: number, clazz_id: number, sno: number
		$data = json_decode(file_get_contents("php://input"));
		$params['name'] = $data->name;
		$params['sex'] = $data->sex;
		$params['clazz_id'] = $data->clazz_id;
		$params['sno'] = $data->sno;
		$msg = '';
		$status = User::userSave($params, User::$ROLE_STUDENT, $msg);
		if (!$status) {
			$this->error('学生添加失败:' . $msg);
			return $msg;
		}
		return $status;
	}

	 public function getById() {
        $id = Request()->param('id/d');
        return json_encode(User::get($id));
    }

    public function update() {
		// name: string, sex: number, clazz_id: number, number: number
		$data = json_decode(file_get_contents("php://input"));
		$params['name'] = $data->name;
		$params['sex'] = $data->sex;
		$params['clazz_id'] = $data->clazz_id;
		$params['sno'] = $data->sno;
		$user_id = Request()->param('id/d');
		$status = User::userSave($params, User::$ROLE_STUDENT, $msg, $user_id);
		if (!$status) {
			$this->error('学生添加失败:' . $msg);
			return $msg;
		}
		return json_encode($status);
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