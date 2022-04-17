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

        $dispatchRooms = new DispatchRoom();

        $dispatchRoom = $dispatchRooms->where('dispatch_id', $dispatchId)->find();

        $status = $dispatchRoom->delete();
        if (!$status) {
            throw new Exception('调度表删除失败');
        }
        return $status;
    }


    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getDay() {
        if (!isset($this->data['day'])) {
            return null;
        }
        if ($this->data['day'] === 1) {return '一';}
        if ($this->data['day'] === 2) {return '二';}
        if ($this->data['day'] === 3) {return '三';}
        if ($this->data['day'] === 4) {return '四';}
        if ($this->data['day'] === 5) {return '五';}
        if ($this->data['day'] === 6) {return '六';}
        if ($this->data['day'] === 7) {return '日';}
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

}