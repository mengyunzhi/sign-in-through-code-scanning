<?php
namespace app\index\controller;
use think\Controller;

/**
 * 管理端
 */
class AdminCenterController extends Controller
{
	
	public function index() 
	{
		return $this->fetch();
	}

	
}