<?php
namespace app\index\controller;
use think\Controller;

/**
 * 管理端
 */
class AdminTeacherController extends Controller
{
	
	public function index() 
	{
		return $this->fetch();
	}
}