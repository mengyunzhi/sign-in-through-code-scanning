<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
use app\common\model\Admin;

/**
 * 管理端
 */
class AdminTermController extends IndexController
{
	
	public function add()
	{
		return $this->fetch();
	}

	public function edit()
	{
		return $this->fetch();
	}

	public function index() 
	{
		return $this->fetch();
	}

	public function termEdit()
	{
		return $this->fetch();
	}

	public function termSave()
	{
		return $this->success('操作成功', url('index'));
	}
	
}