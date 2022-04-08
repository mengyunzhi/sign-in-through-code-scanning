<?php
namespace app\common\model;
use think\Model;

class Dispatch extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getDay() {
        return isset($this->data['day']) ? $this->data['day'] : null;
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