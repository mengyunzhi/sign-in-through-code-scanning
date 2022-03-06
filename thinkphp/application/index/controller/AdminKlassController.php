<?php
namespace app\index\controller;
use app\common\model\Admin;
use app\common\model\Klass;
use think\Controller;
use think\Request;

/**
 * 管理端
 */
class AdminKlassController extends Controller
{
	
	public function index() 
	{
		$klasses = Klass::paginate();
		$this->assign('klasses', $klasses);
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