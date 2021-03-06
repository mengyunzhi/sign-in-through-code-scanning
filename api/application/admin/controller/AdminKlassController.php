<?php
namespace app\admin\controller;
use app\common\model\Admin;
use app\common\model\Klass;
use app\common\model\Student;
use app\common\model\User;
use think\Controller;
use think\Request;

/**
 * 管理端
 */
class AdminKlassController extends IndexController
{
    
    public function index() 
    {
        $klasses = Klass::order('id desc')->paginate();
        $this->assign('klasses', $klasses);
        return $this->fetch();
    }

    public function add() {

        return $this->fetch();
    }

    public function delete() {
        try {
            // 获取get数据
            $Request = Request::instance();
            $id = Request::instance()->param('id/d');
            
            // 判断是否成功接收
            if (is_null($id) || 0 === $id) {
                throw new \Exception('未获取到ID信息', 1);
            }

            // 获取要删除的对象
            $Klass = Klass::get($id);

            // 要删除的对象存在
            if (is_null($Klass)) {
                throw new \Exception('不存在id为' . $id . '的班级，删除失败', 1);
            }

            // 删除对象
            if (!$Klass->delete()) {
                return $this->error('删除失败:' . $Klass->getError());
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

    public function save() {
        $postData = Request::instance()->post();
        if (!isset($postData['name'])) {
            return $this->error('无名称信息');
        } elseif (!$postData['entrance_date']) {
            return $this->error('无入学日期信息');
        } elseif (!$postData['length']) {
            return $this->error('无学制信息');
        }
        $message = '';
        $status = Klass::klassSave($postData['name'], $postData['entrance_date'], $postData['length'], $message);

        if (!$status) {
            return $this->error('添加失败：'.$message);
        }
        return $this->success('添加成功', url('index'));
    }

    public function edit() {
        $id = Request::instance()->param('klass_id/d');
        $Klass = Klass::get($id);
        $this->assign('Klass', $Klass);
        return $this->fetch();
    }

    public function update() {
        $postData = Request::instance()->post();
        if (!isset($postData['name']) || empty($postData['name'])) {
            return $this->error('未接收到名称信息');
        } elseif (!isset($postData['entrance_date']) || empty($postData['entrance_date'])) {
            return $this->error('未接收到入学日期信息');
        } elseif (!isset($postData['length']) || empty($postData['length'])) {
            return $this->error('未接收到学制信息');
        } 
        $id = Request::instance()->post('id/d');
        $Klass = Klass::get($id);
        $state = $Klass->validate(true)->save($postData);
        if ($state === false) {
            $message = '操作失败:' . $Klass->getError();
            return $this->error($message);
        }
        return $this->success('操作成功', url('index'));
    }

    public function klassMembers() {
        $klassId = Request::instance()->param('klass_id');
        $Students = Student::where('klass_id', 'eq', $klassId)->paginate(5);
        $this->assign('Students', $Students);
        return $this->fetch();
    }

    public function studentAdd() {
        return $this->fetch();
    }

    public function studentSave() {
        $postData = Request::instance()->post();
        if (!isset($postData['name']) || empty($postData['name'])) {
            return $this->error('无姓名信息');
        } elseif (!isset($postData['sex'])) {
            return $this->error('无性别信息');
        } elseif (!isset($postData['klass_id']) || empty($postData['klass_id'])) {
            return $this->error('无班级id信息');
        } elseif (!isset($postData['sno']) || empty($postData['sno'])) {
            return $this->error('无学号信息');
        }
        $msg = '';
        $status = User::userSave($postData, User::$ROLE_STUDENT, $msg);
        if (!$status) {
            return $this->error('添加失败：'.$msg);
        }
        return $this->success('添加成功', url('klassMembers?klass_id='.$postData['klass_id']));
    }

    public function studentDelete() {
        try {
                // 获取get数据
        $Request = Request::instance();
        $id = Request::instance()->param('id/d');
                // 判断是否成功接收
        if (is_null($id) || 0 === $id) {
            throw new \Exception('未获取到ID信息', 1);
        }
                // 获取要删除的对象
        $Student = Student::get($id);
                // 要删除的对象存在
        if (is_null($Student)) {
            throw new \Exception('不存在id为' . $id . '的学生，删除失败', 1);
        }
                // 删除对象
        if (!$Student->delete()) {
            return $this->error('删除失败:' . $Student->getError());
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

    public function studentEdit() {
        $id = Request::instance()->param('student_id/d');
        $Student = Student::get($id);
        $this->assign('Student', $Student);
        return $this->fetch();
    }

    public function studentUpdate() {
        //数据校验
        //
        //
        $postData = Request::instance()->post();
        $msg = '';
        $Stduent = Student::get($postData['student_id']);
        $status = User::userSave($postData, User::$ROLE_STUDENT, $msg, $Stduent->user_id);
        if ($status === false) {
            return $this->error('操作失败:'.$msg);
        }
        return $this->success('操作成功', url('klassMembers?klass_id='.$postData['klass_id']));
    }

    public function excelAdd()
    {
        return $this->fetch();
    }

    public function excelSave()
    {
        return $this->success('导入成功', url('klassMembers'));
    }
}