<?php
namespace app\index\controller;
use app\common\model\Teacher;
use think\Request;
use think\Controller;

/**
 * 管理端
 */
class AdminTeacherController extends Controller
{
	
	public function index()
	{
		$teachers = Teacher::paginate();
		$this->assign('teachers', $teachers);
		return $this->fetch();
	}

	public function add() {
		return $this->fetch();
	}

	public function edit() {
		$id = Request::instance()->param('id/d');
		$Teacher = Teacher::get($id);
		$this->assign('Teacher', $Teacher);
		return $this->fetch();
	}

	public function update() {
		$teacher = Request::instance()->post();
		$id = Request::instance()->post('id/d');
		$Teacher = Teacher::get($id);
		$state = $Teacher->validate(true)->isUpdate(true)->save($teacher);
		if ($state === false) 
        {
            $message = '操作失败:' . $Teacher->getError();
            return $this->error($message);
        }
        return $this->success('操作成功', url('index'));
	}

	public function save() {
		$postData = Request::instance()->post();

        $Teacher = new Teacher();
        $Teacher->name = $postData['name'];
        $Teacher->username = $postData['username'];
        $Teacher->sex = $postData['sex'];
        if ($Teacher->validate(true)->save() === false) 
        {
            $message = '操作失败:' . $Teacher->getError();
            return $this->error($message);
        } 
        return $this->success('操作成功', url('index'));
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