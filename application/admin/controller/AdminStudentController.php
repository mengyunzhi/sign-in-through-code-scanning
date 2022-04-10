<?php
namespace app\admin\controller;
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Student;
use app\common\model\Klass;
use think\Request;
use think\Controller;

/**
 * 管理端
 */
class AdminStudentController extends IndexController
{
    
    public function index()
    {
        // 获取查询信息
        $name = Request::instance()->get('name');
        $sno = Request::instance()->get('sno');
        $role = User::$ROLE_STUDENT;

        // 实例化User
        $User = new User; 

        // 定制查询信息,查询user表中的数据
        if (!empty($name)) {
            $User->where('name', 'like', '%' . $name . '%');
        }

        if (!empty($sno)) {
            $User->where('sno', 'like', '%' . $sno . '%');
        }

        if (!empty($role)) {
            $User->where('role', 'like', '%' . $role . '%');
        }

        // 每页显示5条数据
        $pageSize = 5;

        // 按条件查询数据并调用分页
        $users = $User->paginate($pageSize, false, [
            'query'=>[
                'name' => $name,
                'sno' => $sno,
                'role' => $role,
                    ],
            ]);

        // 向V层传数据
        $this->assign('students', $users);
        $this->assign('name', $name);
        $this->assign('sno', $sno);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function add()
    {
        $Klass = new Klass;
        $klasses = $Klass->All();
        $this->assign('klasses', $klasses);
        return $this->fetch();
    }

    public function update()
    {
        return $this->success('操作成功', url('index'));
    }

    public function save() 
    {
        // 接收数据
        $postData = Request::instance()->post();
        // 获取班级id
        $KlassID = Klass::getKlassIdByName($postData['klass'][0]);
        
        // 实例化User对象
        $User = new User();
        // 将数据存入User表中
        $User->name = $postData['name'];
        $User->number = $postData['number'];
        $User->sex = $postData['sex'];
        $User->password = $postData['password'];
        $User->role = $postData['role'];
        if ($User->validate(true)->save() === false) 
        {
            $message = '操作失败:' . $User->getError();
            return $this->error($message);
        }
        // 数据成功存入User表中后，获取该条数据在User表中的id
        $user_id = $User->getId();
        // 实例化Student对象
        $Student = new Student();

        // 将user_id , klass_id , sno 存入student表中
        $Student->user_id = $user_id;
        $Student->klass_id = $KlassID;
        $Student->sno = $postData['sno'];

        if ($Student->validate(true)->save() === false) 
        {
            $message = '操作失败:' . $Student->getError();
            return $this->error($message);
        }

        return $this->success('操作成功', url('index'));
    }

    public function edit()
    {
        return $this->fetch();
    }

    public function insert()
    {
        return $this->success('保存成功', url('index'));
    }

    public function delete() 
    {
        try {
            // 获取get数据
            $Request = Request::instance();
            // 获取要删除对象在User表中的id
            $user_id = Request::instance()->param('id/d');
            
            // 判断是否成功接收
            if (is_null($user_id) || 0 === $user_id) {
                throw new \Exception('未获取到ID信息', 1);
            }

            // 获取要要删除对象的teacher_id
            $student_id = Student::getStudentIdByUserId($user_id);
            // 获取要删除的Teacher对象
            $Student = Student::get($student_id);
            // 获取要删除的User对象
            $User = User::get($user_id);
            
            // 要删除的对象在Teacher表中存在
            if (is_null($Student)) {
                throw new \Exception('不存在id为' . $user_id . '的教师，删除失败', 1);
            }

            // 删除Student表中的对象
            if (!$Student->delete()) {
                return $this->error('删除失败:' . $Student->getError());
            }

            // 要删除的对象在User表中存在
            if (is_null($User)) {
                throw new \Exception('不存在id为' . $user_id . '的教师，删除失败', 1);
            }

            // 删除User表中的对象
            if (!$User->delete()) {
                return $this->error('删除失败:' . $User->getError());
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

}