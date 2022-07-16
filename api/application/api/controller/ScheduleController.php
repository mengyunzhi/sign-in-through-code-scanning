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

        $query = Schedule::where($where);
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

    public function getDataForScheduleAdd() {
        $data['courses'] = Course::All();
        $data['clazzes'] = Klass::All();
        $data['rooms'] = Room::All();
        $data['term'] = Term::getCurrentTerm();
        $data['dispatches'] = $this->getDispatches();
        $data['teacher'] = $this->getLoginTeacher();
        return json_encode($data);
    }

    public function getDataForScheduleEdit() {
        $schedule_id = Request()->param('schedule_id/d');
        $schedule = Schedule::get($schedule_id);
        $data['course'] = $schedule->getCourse();
        $data['clazzes'] = $schedule->Klasses;
        $data['rooms'] = Room::All();
        $data['term'] = Term::getCurrentTerm();
        $data['dispatches'] = $this->getDispatches();
        $data['teacher'] = $this->getLoginTeacher();
        return json_encode($data);
    }


    public function getCurrentTerm() {
        $currentTerm = Term::getCurrentTerm();
        return json_encode($currentTerm);
    }

    public function getDispatches() {
        $json_raw = file_get_contents("php://input"); //获取前端传来的json数据
        $isForEdit = json_decode($json_raw);
        //通过学期获取调度
        $user = User::getCurrentLoginUser();
        $term = Term::getCurrentTerm();
        $scheduleIds = Schedule::where("term_id=$term->id")->column('id');
        if (empty($scheduleIds)) $scheduleIds = [0];
        $Dispatches = Dispatch::where('schedule_id', 'in', $scheduleIds)->column('id, schedule_id, week, day, lesson');
        //通过dispatches 获取 teacherId
        $DisWithTeacherId = [];
        foreach ($Dispatches as $Dispatch) {
            $fields = Schedule::where('id', 'eq', $Dispatch['schedule_id'])->find();
            $Dispatch['teacher_id'] = $fields->teacher_id;
            $DisWithTeacherId[] = $Dispatch;
        }
        $DisWithRoomIds = $this->addRoomIds($DisWithTeacherId, $isForEdit);
        //通过dispatches 获取 klassIds
        ///找到每一个对应的scheduleId
        ///找到每一个scheduleId对应的klassIds
        $DisWithRoomIdsAndKlassIds = [];
        foreach ($DisWithRoomIds as $DisWithRoomId) {
            $DisWithRoomId['clazzIds'] = ScheduleKlass::where('schedule_id', 'eq', $DisWithRoomId['schedule_id'])->column('klass_id'); 
            //去除无用项
            unset($DisWithRoomId['id']);
            $DisWithRoomIdsAndKlassIds[] = $DisWithRoomId;
        }
        return ($DisWithRoomIdsAndKlassIds);
    }

    public function addRoomIds($DisWithTeacherId, $isForEdit=0) {
        $DisWithRoomIds = [];
        foreach ($DisWithTeacherId as $Dispatch) {
            $Dispatch['roomIds'] = DispatchRoom::where('dispatch_id', 'eq', $Dispatch['id'])->column('room_id');
            $DisWithRoomIds[]=$Dispatch;
        }
        return $DisWithRoomIds;
    }

    /* 编辑和不编辑的区别在于 同一day 同一 lesson的 roomIds是否合并
     * 如果是编辑，那么应该除去当前的schedule对应的roomids不合并，其他的应该同样合并，
     * 该方法的编辑可能有问题  
     */
    public function addRoomIdsa($DisWithTeacherId, $isForEdit=0) {
        $DisWithRoomIds = [];
        if($isForEdit) {
            foreach ($DisWithTeacherId as $Dispatch) {
                $Dispatch['roomIds'] = DispatchRoom::where('dispatch_id', 'eq', $Dispatch['id'])->column('room_id');
                $DisWithRoomIds[]=$Dispatch;
            }
        } else {
            $rooms=[];
            //通过dispatches 获取 roomIds
            ///找到每一个对应的roomIds放到rooms
            foreach ($DisWithTeacherId as $Dispatch) {
                $roomIds = DispatchRoom::where('dispatch_id', 'eq', $Dispatch['id'])->column('room_id');
                foreach ($roomIds as $roomId) {
                    $rooms[$Dispatch['week']][$Dispatch['day']*11 + $Dispatch['lesson']][] = $roomId;
                }
            }
            foreach ($DisWithTeacherId as $Dispatch) {
                // var_dump($Dispatch['week'], $Dispatch['day'], $Dispatch['lesson']);
                $Dispatch['roomIds'] = $rooms[$Dispatch['week']][$Dispatch['day']*11 + $Dispatch['lesson']];
                $DisWithRoomIds[]=$Dispatch;
            }
        }
        return $DisWithRoomIds;
    }

    public function getLoginTeacher() {
        $user = User::getCurrentLoginUser();
        $teacher = Teacher::where('user_id', $user->id)->find();
        unset($teacher->user_id);
        $teacher->user = $user;
        return $teacher;
    }

    public function scheduleSave()
    {
        $data = json_decode(file_get_contents("php://input"));
        $teacherId = $data->teacherId;
        $courseId = $data->courseId;
        $klassIds = $data->clazzIds;
        $courseTimes = $data->courseTimes;
        $msg='';
        $status = Schedule::scheduleSave($teacherId , $courseId, $klassIds, $courseTimes, $msg);
        if (!$status) {
            return $this->error('排课新增失败:'. $msg);
        }
        return json_encode(true);
    }

    public function scheduleUpdate() {
        $data = json_decode(file_get_contents("php://input"));
        $courseId = $data->courseId;
        $scheduleId = $data->scheduleId;
        $courseTimes = $data->courseTimes;
        $msg = '';
        $status = Schedule::courseTimeSave($courseId, $scheduleId, $courseTimes, $msg);
        return json_encode($status);
        if (true) {
            return $this->error('更新失败：'. $msg);
        }
        return json_encode(true);
    }
    
    public function getClazzesByScheduleId() {
        $json_raw = file_get_contents("php://input"); //获取前端传来的json数据
        $scheduleIds = json_decode($json_raw);
        $klassIdsOfSameTime = ScheduleKlass::findklassIdsOfSameTime($scheduleIds);
        $disableKlasses = Klass::findDisableKlassesByIds($klassIdsOfSameTime);
        return json_encode($disableKlasses);
    }

}
