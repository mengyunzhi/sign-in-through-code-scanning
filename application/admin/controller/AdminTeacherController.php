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

        $pageSize = 5; // 每页显示5条数据

        // 实例化Teacher
        $Teacher = new Teacher; 

        // 定制查询信息
        if (!empty($name)) {
            $Teacher->where('name', 'like', '%' . $name . '%');
        }

        // 按条件查询数据并调用分页
        $teachers = $Teacher->paginate($pageSize, false, [
           'query'=>[
                'name' => $name,
                ],
            ]);

        // 向V层传数据
        $this->assign('teachers', $teachers);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function add() 
    {
        return $this->fetch();
    }

    public function edit() 
    {
        $id = Request::instance()->param('id/d');
        $Teacher = Teacher::get($id);
        $this->assign('Teacher', $Teacher);
        return $this->fetch();
    }

    public function update() 
    {
        $teacher = Request::instance()->post();
        $id = Request::instance()->post('id/d');
        $Teacher = Teacher::get($id);
        $Teacher = new Teacher;
        $state = $Teacher->validate(true)->isUpdate(true)->save($teacher);
        if ($state === false) 
        {
            $message = '操作失败:' . $Teacher->getError();
            return $this->error($message);
        }
        return $this->success('操作成功', url('index'));
    }

    public function save() 
    {     
        // 接收数据
        $postData = Request::instance()->post();
        // 实例化对User象
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

    public function delete() 
    {
        try {
            // 获取get数据
            $Request = Request::instance();
            $id = Request::instance()->param('id/d');
            
            // 判断是否成功接收
            if (is_null($id) || 0 === $id) {
                throw new \Exception('未获取到ID信息', 1);
            }

            // 获取要删除的对象
            $Teacher = Teacher::get($id);

            // 要删除的对象存在
            if (is_null($Teacher)) {
                throw new \Exception('不存在id为' . $id . '的教师，删除失败', 1);
            }

            // 删除对象
            if (!$Teacher->delete()) {
                return $this->error('删除失败:' . $Teacher->getError());
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