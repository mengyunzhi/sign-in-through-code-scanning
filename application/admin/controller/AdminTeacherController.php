<?php
namespace app\admin\controller;
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Admin;
use think\Request;
use think\Controller;

/**
 * 管理端
 */
class AdminTeacherController extends IndexController
{
    

    public function index()
    {
        // 获取查询信息
        $name = Request::instance()->get('name');
        $number = Request::instance()->get('number');
        $role = User::$ROLE_TEACHER;

        // 实例化User
        $User = new User; 

        // 定制查询信息,查询user表中的数据
        if (!empty($name)) {
            $User->where('name', 'like', '%' . $name . '%');
        }

        if (!empty($number)) {
            $User->where('number', 'like', '%' . $number . '%');
        }

        if (!empty($role)) {
            $User->where('role', 'like', '%' . $role . '%');
        }

        // 每页显示5条数据
        $pageSize = 5;

        // 按条件查询数据并调用分页
        $users = $User->order('id desc')->paginate($pageSize, false, [
            'query'=>[
                'name' => $name,
                'number' => $number,
                'role' => $role,
                    ],
            ]);

        // 向V层传数据
        $this->assign('Users', $users);
        $this->assign('name', $name);
        $this->assign('number', $number);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function add() 
    {
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
            $Teacher = Teacher::where('user_id', $user_id)->find();
            // 获取要删除的User对象
            $User = User::get($user_id);
            
            // 要删除的对象在Teacher表中存在
            if (is_null($Teacher)) {
                throw new \Exception('不存在id为' . $user_id . '的教师，删除失败', 1);
            }

            // 删除Teacher表中的对象
            if (!$Teacher->delete()) {
                return $this->error('删除失败:' . $Teacher->getError());
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

    public function edit() 
    {
        $backUrl = $_SERVER["HTTP_REFERER"];
        $id = Request::instance()->param('id/d');
        $User = User::get($id);
        $this->assign('Teacher', $User);
        $this->assign('backUrl', $backUrl);
        return $this->fetch();
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

    public function passwordEdit() {
        $userId = Request()->param('user_id/d');
        $User = User::get($userId);
        $this->assign('User', $User);
        return $this->fetch();
    }
    
    public function save() 
    {     
        // 接收数据
        $postData = Request::instance()->post();
        if (!isset($postData['name']) || empty($postData['name'])) {
            return $this->error('无姓名信息');
        } elseif (!isset($postData['sex'])) {
            return $this->error('无姓别信息');
        } elseif (!isset($postData['number']) || empty($postData['number'])) {
            return $this->error('无手机号信息');
        }
        // 实例化对User象
        $User = new User();
        // 将数据存入User表中
        $User->name = $postData['name'];
        $User->number = $postData['number'];
        $User->sex = $postData['sex'];
        $User->password = '111111';
        $User->role = User::$ROLE_TEACHER;
        if ($User->validate(true)->save() == false) 
        {
            $message = '操作失败:' . $User->getError();
            return $this->error($message);
        }
        // 数据成功存入User表中后，获取该条数据在User表中的id
        $user_id = $User->getId();
        // 实例化Teacher对象
        $Teacher = new Teacher();
        // 将该条数据在User表中的id值存入Teacher表中的user_id字段中
        $Teacher->user_id = $user_id;
        if ($Teacher->validate(true)->save() === false) 
        {
            $message = '操作失败:' . $Teacher->getError();
            return $this->error($message);
        }

        return $this->success('操作成功', url('index'));
    }
    
    public function update() 
    {
        // 接收V层数据
        $teacher = Request::instance()->post();
        // 获取该条数据在User表中的id
        $user_id = Request::instance()->post('id/d');
        // 找出user表中的对应数据
        $User = User::get($user_id);
        // 进行数据更改
        $state = $User->validate(true)->isUpdate(true)->save($teacher);
        if ($state === false) 
        {
            $message = '操作失败:' . $User->getError();
            return $this->error($message);
        }
        return $this->success('操作成功', url('index'));
    }


}