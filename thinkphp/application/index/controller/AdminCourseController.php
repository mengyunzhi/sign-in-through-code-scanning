<?php
namespace app\index\controller;
use think\Controller;

/**
 * 管理端
 */
class AdminCourseController extends Controller
{
	
	public function index() 
	{
		return $this->fetch();
	}

	public function edit() {
		return $this->fetch();
	}

	public function courseDetail() {
		return $this->fetch();
	}
	public function add() {
		return $this->fetch();
	}

	public function programAdd() {
		return $this->fetch();
	}
	public function courseTimeAdd() {
		return $this->fetch();
	}
	public function klassAdd() {
		return $this->fetch();
	}

}