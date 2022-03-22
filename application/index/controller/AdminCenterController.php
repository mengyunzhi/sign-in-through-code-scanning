<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
use app\common\model\Admin;

/**
 * 管理端
 */
class AdminCenterController extends Controller
{
	
	public function index() 
	{
		$admins = Admin::paginate();
		$this->assign('admins', $admins);
		return $this->fetch();
	}

	
}