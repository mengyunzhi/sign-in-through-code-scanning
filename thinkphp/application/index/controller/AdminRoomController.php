<?php
namespace app\index\controller;
use app\common\model\Room;
use think\Request;
use think\Controller;

/**
 * 管理端
 */
class AdminRoomController extends Controller
{
	
	public function index() 
	{
		$rooms = Room::paginate();
		$this->assign('rooms', $rooms);
		return $this->fetch();
	}

	public function add() {
		return $this->fetch();
	}

	public function edit() {
		return $this->fetch();
	}
}