<?php
namespace app\index\controller;
use think\Controller;

/**
 * 管理端
 */
class AdminKlassController extends Controller
{
	
	public function index() 
	{
		return $this->fetch();
	}

	public function add() {
		return $this->fetch();
	}

	public function edit() {
		return $this->fetch();
	}

	public function klassMembers() {
		return $this->fetch();
	}

	public function studentAdd() {
		return $this->fetch();
	}
	public function studentEdit() {
		return $this->fetch();
	}
}