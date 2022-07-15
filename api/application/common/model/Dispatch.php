<?php
namespace app\common\model;
use think\Model;

class Dispatch extends Model {

      static public function courseTimeAndRoomDelete($dispatchId) {
        if (empty($dispatchId)) {
            throw new Exception('无调度id');
        }
        $dispatch = Dispatch::get($dispatchId);

        if (is_null($dispatch)) {
            throw new Exception('无调度信息');
        }

        $status = $dispatch->delete();
        if (!$status) {
            throw new Exception('调度表删除失败');
        }

        $dispatchRooms = DispatchRoom::where('dispatch_id', $dispatchId)->select();

        foreach ($dispatchRooms as $dispatchRoom) {
            $status = $status && $dispatchRoom->delete();
        }

        if (!$status) {
            throw new Exception('调度表删除失败');
        }
        return $status;
    }

    public static function klassesOfSameTimeScheduleIds($currentDispatch) {
        $klassesOfSameTimeScheduleIds = [];
        $allDispatches = Dispatch::All();
        foreach($allDispatches as $x=>$x_value) {
            for ($key = 0; $key < count($currentDispatch); $key++) {
                if ($x_value->day === $currentDispatch[$key]->day) {
                    if ($x_value->lesson === $currentDispatch[$key]->lesson) {
                        if ($x_value->week === $currentDispatch[$key]->week) {
                            if ($x_value->id !== $currentDispatch[$key]->id) {
                                array_push($klassesOfSameTimeScheduleIds, $x_value->schedule_id);
                            }
                        }
                    }
                }
            }
        }
        return $klassesOfSameTimeScheduleIds;
    }

    static public function dispatchSave($scheduleId, $courseTimes, &$msg='') {
        // 3、每个组件的值通过scheduleId、weeks、day、lesson来存dispatch表并获取到dispatchId
        // 4、通过dispatchIds和roomIds来存dispatch_room表
        for ($i=0; $i < 7; $i++) {
            for ($j=0; $j < 5; $j++) { 

                if ((!empty($courseTimes[$i][$j]->weeks)) && (!empty($courseTimes[$i][$j]->roomIds))) {
                    $day = $i;$lesson = $j;
                    $weeks = $courseTimes[$i][$j]->weeks;
                    $roomIds = $courseTimes[$i][$j]->roomIds;
                    foreach ($weeks as $week) {
                        $dispatch = Dispatch::saveDispatch($scheduleId, $week, $day, $lesson, $msg);
                        if (is_null($dispatch)) return false;
                        foreach ($roomIds as $roomId) {
                            $dispatchRoom = DispatchRoom::saveDispatchRoom($dispatch->id, $roomId, $msg);
                            if (is_null($dispatchRoom)) return false;
                        }
                    }
                }
            }
        }
        return true;
    }


    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getDay() {
        if (!isset($this->data['day'])) {
            return null;
        }
        if ($this->data['day'] === 0) {return '一';}
        if ($this->data['day'] === 1) {return '二';}
        if ($this->data['day'] === 2) {return '三';}
        if ($this->data['day'] === 3) {return '四';}
        if ($this->data['day'] === 4) {return '五';}
        if ($this->data['day'] === 5) {return '六';}
        if ($this->data['day'] === 6) {return '日';}
    }

    public function getLesson() {
        return isset($this->data['lesson']) ? $this->data['lesson'] : null;
    }

    public function getScheduleId() {
        return isset($this->data['schedule_id']) ? $this->data['schedule_id'] : null;
    }

    public function getSchedule() {
        return isset($this->data['schedule']) ? $this->data['schedule'] : $this->data['schedule'] = Schedule::where('id', 'eq', $this->getScheduleId())->find();
    }

    public function getWeek() {
        return isset($this->data['week']) ? $this->data['week'] : null;
    }

    public function Rooms() {
        return $this->belongsToMany('Room', 'yunzhi_dispatch_room', 'room_id', 'dispatch_id');
    }

    static public function saveDispatch($scheduleId, $week, $day, $lesson, &$msg='') {
        $dispatch = new Dispatch;
        $dispatch->schedule_id = $scheduleId;
        $dispatch->week = $week;
        $dispatch->day = $day;
        $dispatch->lesson = $lesson;
        $status = $dispatch->validate()->save();
        $msg .= $dispatch->getError();
        return $status ? $dispatch : null;
    }

}