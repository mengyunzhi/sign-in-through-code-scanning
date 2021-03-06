<?php
namespace app\api\controller;   //命名空间，说明文件所在文件夹
use think\Controller;
use think\Request;
use think\Db;
use app\common\model\Student;
use app\common\model\StudentSchedule;
use app\index\service\MenuService;
use app\common\model\User;
use app\common\model\Klazz;


class StudentController extends Controller
{
	public function page() {
		$params = Request()->param();
		Db::name('Student');
		$query = Db::table('yunzhi_user')->alias('user')
		->join('yunzhi_student student', 'user.id = student.user_id')
		->join('yunzhi_klass klass', 'student.klass_id = klass.id')
		->field('student.id, student.user_id, user.number, user.sex, user.name, student.sno,  klass.id as clazz_id, klass.name as clazz_name, student.state')
		->order(['student.id desc'])
		->where('klass.name', 'like', '%' . $params['searchClazz'] . '%')
		->where('user.name', 'like', '%' . $params['searchName'] . '%')
        ->where('sno', 'like', '%' . $params['searchSno'] . '%');
		
		$students = $query->limit(
			$params['page'] * $params['size'],
			$params['size']
		)->select();
		$data['content'] = $students;
		$query = Db::table('yunzhi_user')->alias('user')
		->join('yunzhi_student student', 'user.id = student.user_id')
		->join('yunzhi_klass klass', 'student.klass_id = klass.id')
		->field('student.id, student.user_id, user.number, user.sex, user.name, student.sno,  klass.id as clazz_id, klass.name as clazz_name')
		->order(['student.id desc'])
		->where('klass.name', 'like', '%' . $params['searchClazz'] . '%')
		->where('user.name', 'like', '%' . $params['searchName'] . '%')
        ->where('sno', 'like', '%' . $params['searchSno'] . '%');
		$data['length'] = $query->count();
		return json_encode($data);
	}

	public function pageByScheduleId() {
		$scheduleId = Request()->param('schedule_id/d');
		$params = Request()->param();
		$queryWhere['klass.name'] = ['like', '%'. $params['clazz'] .'%'];
		$queryWhere['sno'] = ['like', '%'. $params['sno'] .'%'];
		$queryWhere['user.name'] = ['like', '%'. $params['name'] .'%'];
		$where = '';
		$query = Db::table('yunzhi_schedule')->alias('schedule')
		->where('schedule.id', '=', $scheduleId)
		->join('yunzhi_student_schedule student_schedule', 'schedule.id = student_schedule.schedule_id')
		->join('yunzhi_student student', 'student.id = student_schedule.student_id')
		->join('yunzhi_user user', 'student.user_id = user.id')
		->join('yunzhi_klass klass', 'student.klass_id = klass.id')
		->field('student.id, student.user_id, user.number, user.sex, user.name, student.sno,  klass.id as clazz_id, klass.name as clazz_name')
		->where($queryWhere);

		$queryCopy = clone $query;

		$data['content'] = $query->order('id desc')->limit(
			$params['page'] * $params['size'], $params['size']
		)->select();

		$data['length'] = $queryCopy->where($queryWhere)->count(); 
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
        ->field('student.id, student.user_id, user.number, user.sex, user.name, student.sno,  klass.id as klass_id')
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
        $status = User::userDelete($id);
        if ($status) {
            return json_encode($status);
        } else {
            return $this->error('删除失败：'.$student->getError());
        }
    }

    public function snoUnique() {
        $sno = Request()->param('sno');
        $user_id = Request()->param('user_id/d');
        $student = Student::where('sno', 'eq', $sno)->find();
    	$user = $student ? $student->getUser() : null;
        if (!is_null($user) && ($user_id !== $user->getId())) {
            return json_encode('学号已存在');
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