<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
use app\common\model\Admin;

/**
 * 管理端
 */
class AdminCenterController extends IndexController
{
	
	public function index() 
	{
		$admins = Admin::paginate();
		$this->assign('admins', $admins);
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