<?php
namespace app\index\controller;
use app\common\model\Room;
use think\Request;
use think\Controller;

/**
 * 管理端
 */
class AdminRoomController extends IndexController
{
	
	public function index() 
	{
		$pageSize = 5;

		$rooms = Room::paginate($pageSize, false);
		$this->assign('rooms', $rooms);
		return $this->fetch();
	}

	public function add() {
		return $this->fetch();
	}

	public function edit() {
		// 获取传入ID
		$room = Room::get(Request::instance()->param('id/d'));

		// 向模版传值
		$this->assign('room', $room);
		return $this->fetch();
	}

	/**
     * 插入新数据
     * @return   html                   
     * @author 梦云智 http://www.mengyunzhi.com
     * @DateTime 2016-11-07T12:31:24+0800
     */
    public function insert()
    {
        $postData = Request::instance()->post();

        $room = new room();
        $room->name = $postData['name'];
        $room->capacity = $postData['capacity'];
        if ($room->validate(true)->save() === false) 
        {
            $message = '操作失败:' . $room->getError();
            return $this->error($message);
        } 
        return $this->success('操作成功', url('index'));
    }

    public function update() {
    	// 接收数据，取要更新的关键字信息
        $id = Request::instance()->post('id/d');
        $postData = Request::instance()->post();

        // 获取当前对象
        $room = room::get($id);

        if (!is_null($room)) {
            // 写入要更新的数据
        	$room->name = $postData['name'];
        	$room->capacity = $postData['capacity'];

            // 更新
            if (false === $room->validate(true)->save()) {
                return $this->error('更新失败' . $room->getError());
            } else {
            	return $this->success('操作成功', url('index'));
            } 
        }
    }

    public function delete() {
    	// 实例化请求类
        $Request = Request::instance();
        
        // 获取get数据
        $id = Request::instance()->param('id/d');
        
        // 判断是否成功接收
        if (0 === $id) {
            throw new \Exception('未获取到ID信息', 1);
        }

        // 获取要删除的对象
        $room = room::get($id);

        // 要删除的对象存在
        if (is_null($room)) {
            throw new \Exception('不存在id为' . $id . '的教师，删除失败', 1);
        }

        // 删除对象
        if (!$room->delete()) {
            return $this->error('删除失败:' . $room->getError());
        }
        // 进行跳转 
        return $this->success('删除成功', $Request->header('referer')); 
    }
}