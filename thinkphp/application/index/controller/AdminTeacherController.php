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
		$Teacher = new Teacher;
		$state = $Teacher->validate(true)->isUpdate(true)->save($teacher);
		if ($state) {
            return '更新成功';
        } else {
            return $Teacher->getError();
        }
	}

	public function save() {
		$postData = Request::instance()->post();

        $Teacher = new Teacher();
        var_dump($Teacher->getData());
        $Teacher->name = $postData['name'];
        $Teacher->username = $postData['username'];
        $Teacher->sex = $postData['sex'];
        if ($Teacher->validate(true)->save() === false) 
        {
            $message = '操作失败:' . $Teacher->getError();
            return $message;
        } 
        return $this->success('操作成功', url('index'));
	}

        

}