<?php
namespace app\api\controller;   //命名空间，说明文件所在文件夹
use think\Controller;
use think\Request;
use think\Db;
use app\common\model\Student;
use app\index\service\MenuService;
use app\common\model\User;
use app\common\model\Klazz;


class StudentController extends Controller
{
	public function page() {
		$params = Request()->param();
		$where = '';
		Db::name('Student');
		$query = Db::table('yunzhi_user')->alias('user')
		->join('yunzhi_student student', 'user.id = student.user_id')
		->order(['student.id desc'])->where($where);
		
		$students = $query->limit(
			$params['page'] * $params['size'],
			$params['size']
		)->select();
		$data['content'] = $students;
		$data['length'] = $query->count();
		return json_encode($data);
	}


	public function add() {
		// name: string, sex: number, clazz_id: number, sno: string
		$data = json_decode(file_get_contents("php://input"));
		$params['name'] = $data->name;
		$params['sex'] = $data->sex;
		$params['klass_id'] = $data->clazz_id;
		$params['sno'] = $data->sno;
		$msg = '';
		$status = User::userSave($params, User::$ROLE_STUDENT, $msg);
		if (!$status) {
			$this->error('学生添加失败:' . $msg);
			return $msg;
		}
		return json_encode($status);
	}

	 public function getById() {
        $id = Request()->param('id/d');
        Db::name('user');
        $user = Db::table('yunzhi_user')->alias('user')
        ->join('yunzhi_student student',  'user.id = student.user_id')
        ->join('yunzhi_klass klass', 'student.klass_id = klass.id')
        ->where("user.id=$id")->find();
        return json_encode($user);
    }

    public function update() {
		// name: string, sex: number, clazz_id: number, sno: string
		$data = json_decode(file_get_contents("php://input"));
		$params['name'] = $data->name;
		$params['sex'] = $data->sex;
		$params['klass_id'] = $data->clazz_id;
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

    public function updatePasswordByAdmin() {
        $password = file_get_contents("php://input");
        $id = Request()->param('id/d');
        $user = User::get($id);
        $user->password = $password;
        if ($user->save() === false) {
            throw new \Exception('更新失败:'. $user->getError);
            return $user->getError;
        }
        return json_encode(true);
    }
}