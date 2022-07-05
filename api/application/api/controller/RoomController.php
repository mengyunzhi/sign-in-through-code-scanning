<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Room;
use app\index\service\MenuService;
use think\Controller;
use think\Request;


class RoomController extends Controller
{
    /*
    * index页面
    */
    public function page() {
        $data['content'] = Room::all();
        return json_encode($data);
    }

    /*
    * 删除教室
    */
    public function delete() {
        $id = Request()->param('id/d');
        $room = Room::get($id);
        $status = $room->delete();
        if ($status) {
            return json_encode($room);
        } else {
            return $room->getError();
        }
    }

    /*
    * 新增教室
    */
    public function add() {
        $json_raw = file_get_contents("php://input");
        $data = json_decode($json_raw);
        return json_encode(var_dump($json_raw, $data));
    }
}
