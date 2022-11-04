<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Term;
use app\index\service\MenuService;
use think\Controller;
use think\Request;
use think\Db;

class TeacherController extends Controller
{


    public function add() {
        // name: string, sex: number, number: string
        $data = json_decode(file_get_contents("php://input"));
        $params['name'] = $data->name;
        $params['sex'] = $data->sex;
        $params['number'] = null;
        if (empty($data->number)) {
            return $this->error('教师添加失败：' . '手机号为空');
        } else {
            $params['number'] = $data->number;
        }
        $msg = '';
        $status = User::userSave($params, User::$ROLE_TEACHER, $msg);
        if (!$status) {
            $this->error('教师添加失败：' . $msg);
            return $msg;
        }
        return $status;
    }

    public function delete() {
        $id = Request()->param('id/d');
        $status = User::userDelete($id, $msg);
        if (!$status) {
            throw new \Exception('删除失败:'. $msg);
        }
        return json_encode($status);
    }

    public function getById() {
        $id = Request()->param('id/d');
        return json_encode(User::get($id));
    }



    public function page() {
        $params = Request()->param();
        Db::name('Teacher');

        $query = Db::table('yunzhi_user')->alias('user')
        ->join('yunzhi_teacher teacher', 'user.id = teacher.user_id')
        ->order(['teacher.id desc'])
        ->where('name', 'like', '%' . $params['searchName'] . '%')
        ->where('number', 'like', '%' . $params['searchPhone'] . '%');
        $teachers = $query->limit(
            $params['page'] * $params['size'],
            $params['size']
        )->select();
        $data['content'] = $teachers;

        $query = Db::table('yunzhi_user')->alias('user')
        ->join('yunzhi_teacher teacher', 'user.id = teacher.user_id')
        ->order(['teacher.id desc'])
        ->where('name', 'like', '%' . $params['searchName'] . '%')
        ->where('number', 'like', '%' . $params['searchPhone'] . '%');
        $data['length'] = $query->count();
        return json_encode($data);
    }

    public function update() {
        $data = json_decode(file_get_contents("php://input"));
        $params['name'] = $data->name;
        $params['sex'] = $data->sex;
        $params['number'] = $data->number;
        $user_id = Request()->param('id/d');
        $status = User::userSave($params, User::$ROLE_TEACHER, $msg, $user_id);
        if (!$status) {
            $this->error('教师更新失败：' . $msg);
            return $msg;
        } 
        return json_encode($status); 
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
