<?php
namespace app\admin\controller;
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Student;
use app\common\model\Klass;
use think\Request;
use think\Controller;
use think\Db;   // 引用数据库操作类


/**
 * 管理端
 */
class AdminStudentController extends IndexController
{
    
    

    public function add()
    {
        $Klass = new Klass;
        $klasses = $Klass->All();
        $this->assign('klasses', $klasses);
        return $this->fetch();
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

            // 获取要删除的Teacher对象
            $Student = Student::where('user_id', $user_id)->find();
            // 获取要删除的User对象
            $User = User::get($user_id);
            
            // 要删除的对象在studnet表中存在
            if (is_null($Student)) {
                throw new \Exception('不存在id为' . $user_id . '的学生，删除失败', 1);
            }

            // 删除student表中的对象
            if (!$Student->delete()) {
                return $this->error('删除失败:' . $Student->getError());
            }

            // 要删除的对象在User表中存在
            if (is_null($User)) {
                throw new \Exception('不存在id为' . $user_id . '的学生，删除失败', 1);
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

    public function edit()
    {
        $userId = Request()->param('id/d');
        $User = User::get($userId);
        $Klasses = Klass::all();
        $this->assign('Klasses', $Klasses);
        $this->assign('User', $User);
        return $this->fetch();
    }

    public function insert()
    {
        return $this->success('保存成功', url('index'));
    }

    public function index()
    {
        // 获取查询信息
        $name = Request::instance()->get('name');
        $sno = Request::instance()->get('sno');
        $klass = Request::instance()->get('klass');

        //学号查询
        $Student = new Student;
        if (!empty($sno)) {
            $Student = $Student->where('sno', 'like', '%'.$sno.'%');
        }
        
        //根据班级名称查询
        if (!empty($klass)) {
            $klassIds = Klass::where('name', 'like', '%'.$klass.'%')->column('id');
            if (!empty($klassIds)) {
                $Student = $Student->where('klass_id', 'in', $klassIds);
            } else {
                $Student = $Student->where('klass_id', 'eq', 0);
            }
        }

        $studentUserIds = $Student->column('user_id');
        // 实例化User
        $User = new User; 

        // 定制查询信息,查询user表中的数据
        if (!empty($name)) {
            $User->where('name', 'like', '%' . $name . '%');
        }

        //限定权限
        $User->where('role', 'eq', User::$ROLE_STUDENT);

        if (!empty($studentUserIds)) {
            $User->where('id', 'in', $studentUserIds);
        } else {
            $User->where('id', 'eq', 0);
        }

        // 每页显示5条数据
        $pageSize = 5;

        // 按条件查询数据并调用分页
        $users = $User->order('id desc')->paginate($pageSize, false, [
            'query'=>[
                'klass'=> $klass,
                'name' => $name,
                'sno'  => $sno,
                    ],
            ]);

        // 向V层传数据
        $this->assign('Users', $users);
        $this->assign('name', $name);
        $this->assign('sno', $sno);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function passwordEdit() {
        $userId = Request()->param('user_id/d');
        $User = User::get($userId);
        $this->assign('User', $User);
        return $this->fetch('admin_teacher/passwordEdit');
    }

     public function passwordChange() {
        $postData = Request()->param();
        if (!isset($postData['user_id']) || empty($postData['user_id'])) {
            return $this->error('未接收到用户信息');
        } elseif (!isset($postData['password']) || empty($postData['password'])) {
            return $this->error('未接收到密码信息');
        }
        $msg = '';
        $status = User::passwordChange($postData['user_id'], $postData['password'], $msg);

        if (!$status) {
            return $this->error('保存失败：'.$msg);
        }
        return $this->success('保存成功', url('index'));
    }

    public function save() 
    {
        // 接收数据
        $postData = Request::instance()->post();
        if (!isset($postData['name']) || empty($postData['name'])) {
            return $this->error('无姓名信息');
        } elseif (!isset($postData['sex'])) {
            return $this->error('无姓别信息');
        } elseif (!isset($postData['klass_id']) || empty($postData['klass_id'])) {
            return $this->error('无班级信息');
        } elseif (!isset($postData['sno']) || empty($postData['sno'])) {
            return $this->error('无学号信息');
        }
        $msg = '';
        $status = User::userSave($postData, User::$ROLE_STUDENT, $msg);
        if (!$status) {
            return $this->error('操作失败：'.$msg);
        }
        return $this->success('操作成功', url('index'));
    }

    public function update()
    {
        $postData = Request()->post();
        if (!isset($postData['name']) || empty($postData['name'])) {
            return $this->error('未接收到姓名信息');
        } elseif (!isset($postData['sex']) || empty($postData['sex'])) {
            return $this->error('未接收到性别信息');
        } elseif (!isset($postData['klass_id']) || empty($postData['klass_id'])) {
            return $this->error('未接收到班级信息');
        } elseif (!isset($postData['sno']) || empty($postData['sno'])) {
            return $this->error('未接收到学号信息');
        }
        $msg = '';
        $status = User::userSave($postData, User::$ROLE_STUDENT, $msg, $postData['id']);
        if (!$status) {
            return $this->error('保存失败：'.$msg);
        }
        return $this->success('操作成功', url('index'));
    }

}