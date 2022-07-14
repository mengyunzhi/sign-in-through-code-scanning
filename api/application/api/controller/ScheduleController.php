<?php
namespace app\api\controller;   //命名空间，说明文件所在文件夹
use think\Controller;
use think\Request;
use think\Db;
use app\index\service\MenuService;
use app\common\model\Teacher;
use app\common\model\Term;
use app\common\model\Course;
use app\common\model\ScheduleKlass;
use app\common\model\Klass;
use app\common\model\DispatchRoom;
use app\common\model\Room;
use app\common\model\Dispatch;
use app\common\model\User;
use app\common\model\Schedule;

class ScheduleController extends Controller {
	public function page() {
		$params = Request()->param();
        $currentUser = User::getCurrentLoginUser();
        $teacher = Teacher::get(['user_id' => $currentUser->id]);
		$where = "$teacher->id = teacher_id";
        $content = [];
        $query = Schedule::where($where);
        $schedules = $query->limit($params['page'] * $params['size'], $params['size'])->order('id desc')->select();

        $clazzes = [];
        foreach ($schedules as $key => $schedule) {
            $clazzes[$key]['clazzes'] = [];
            $scheduleKlasses = ScheduleKlass::where('schedule_id', '=', $schedule->id)->select();
            foreach ($scheduleKlasses as $scheduleKlass) {
                array_push($clazzes[$key]['clazzes'], Klass::where('id', 'eq', $scheduleKlass->klass_id)->find());
            }
        }

        $teachers = [];
        foreach ($schedules as $key => $schedule) {
            $teachers[$key] = $schedule->getTeacher();
        }

        $terms = [];
        foreach ($schedules as $key => $schedule) {
            $terms[$key] = $schedule->getTerm();
        }

        $courses = [];
        foreach ($schedules as $key => $schedule) {
            $courses[$key] = $schedule->getCourse();
        }

        $content['schedules'] = $schedules;
        $content['clazzes'] = $clazzes;
        $content['teachers'] = $teachers;
        $content['terms'] = $terms;
        $content['courses'] = $courses;
        $data['length'] = $query->count();
        $data['content'] = $content;
        return json_encode($data);
	}

	public function delete() {
        $id = Request()->param('id/d');
        $schedule = Schedule::get($id);
        $status = $schedule->delete();
        if ($status) {
            return json_encode($schedule);
        } else {
            return $room->getError();
        }
    }

    public function editIndex() {
        $id = Request()->param('id/d');
        $schedule = Schedule::get($id);
        $clazzes = $schedule->klasses;
        $teacher = $schedule->getTeacher();
        $user = $teacher->getUser();
        $course = $schedule->getCourse();
        $programs = $course->getProgram();
        $dispatches = $schedule->getDispatches();
        $rooms = [];
        foreach ($dispatches as $key => $dispatch) {
            $dispatchRooms = DispatchRoom::where('dispatch_id', 'eq', $dispatch->id)->select();
            $rooms[$key] = [];
            foreach ($dispatchRooms as $dispatchRoom) {
                array_push($rooms[$key], Room::where('id', $dispatchRoom->room_id)->find());
            }
        }
        $data['schedule'] = $schedule;
        $data['clazzes'] = $clazzes;
        $data['teacher'] = $teacher;
        $data['user'] = $user;
        $data['course'] = $course;
        $data['programs'] = $programs;
        $data['dispatches'] = $dispatches;
        $data['rooms'] = $rooms;
        return json_encode($data);

    }

    public function getById() {
        $id = Request()->param('id/d');
        $schedule = Schedule::get($id);
        $data['id'] = $schedule->id;
        $data['course'] = $schedule->getCourse();
        $data['teacher'] = $schedule->getTeacher();
        $data['term'] = $schedule->getTerm();
        return json_encode($data);
    }


    public function getCourses() {
        return json_encode(Course::All());
    }

    public function getClazzes() {
        return json_encode(Klass::All());
    }

    public function getRooms() {
        return json_encode(Room::All());
    }

    public function getCurrentTerm() {
        $currentTerm = Term::getCurrentTerm();
        return json_encode($currentTerm);
    }

}
