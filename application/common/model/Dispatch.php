<?php
namespace app\common\model;
use think\Model;

class Dispatch extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getYear() {
        return isset($this->data['year']) ? $this->data['year'] : null;
    }

    public function getMonth() {
        return isset($this->data['month']) ? $this->data['month'] : null;
    }

    public function getDay() {
        return isset($this->data['day']) ? $this->data['day'] : null;
    }

    public function getStartTime() {
        return isset($this->data['start_time']) ? $this->data['start_time'] : null;
    }

    public function getEndTime() {
        return isset($this->data['end_time']) ? $this->data['end_time'] : null;
    }

    public function rooms() {
        return $this->belongsToMany('Room', 'yunzhi_dispatch_room', 'room_id', 'dispatch_id');
    }

}