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
    public function page() {
        $data['content'] = Room::all();
        return json_encode($data);
    }
}
