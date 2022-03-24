<?php
namespace app\index\controller;
use app\common\model\Teacher;
use think\Request;
use think\Controller;

/**
 * 管理端
 */
class AdminStudentController extends IndexController
{
	
    public function index()
    {
        return $this->fetch();
    }

    public function add()
    {
        return $this->fetch();
    }

    public function update()
    {
        return $this->success('操作成功', url('index'));
    }

    public function save() {
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

}