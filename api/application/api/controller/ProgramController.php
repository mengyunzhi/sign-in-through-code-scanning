<?php
namespace app\api\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use app\common\model\Schedule;
use app\common\model\Room;
use app\common\model\Program;
use app\index\service\MenuService;
use think\Controller;
use think\Request;


class ProgramController extends Controller
{
    public function add() {
        $data = json_decode(file_get_contents("php://input"));
        $program = new Program;
        $program->name = $data->name;
        $program->lesson = $data->lesson;
        $program->course_id = $data->course_id;
        $status = $program->validate(true)->save();
        if (!$status) {
            return $this->error('项目添加失败：'.$program->getError());
        }
        return json_encode($status);
    }

    public function delete() {
        $id = Request()->param('id/d');
        $program = Program::get($id);
        if (!$program->delete()) {
            return $this->error('项目删除失败'. $program->getError());
        }
        return json_encode(true);
    }

    public function getById() {
        $id = Request()->param('id/d');
        return json_encode(Program::get($id));
    }

    public function programNameUnique() {
        $name = Request()->param('name');
        $progarm_id = Request()->param('progarm_id/d');
        $program = Program::where('name', 'eq', $name)->find();
        if (!is_null($program) && ($progarm_id !== $program->getId())) {
            return json_encode('名称已存在');
        }
    }

    public function update() {
        $id = Request()->param('id/d');
        $data = json_decode(file_get_contents("php://input"));
        $program = Program::get($id);
        $program->setAttr('name', $data->name);
        $program->lesson = $data->lesson;
        if (!$program->validate(true)->save()) {
            return $this->error('项目更新失败：'. $program->getError());
        }
        return json_encode(true);
    }
    
}
