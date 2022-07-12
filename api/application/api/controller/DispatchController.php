<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Course;
use app\common\model\Dispatch;
use app\index\service\MenuService;
use think\Controller;
use think\Request;


class DispatchController extends Controller
{
    public function delete() {
        $id = Request()->param('id/d');
        if (!Dispatch::courseTimeAndRoomDelete($id)) {
            return $this->error('删除失败');
        }
        return json_encode(true);
    }
    
}
