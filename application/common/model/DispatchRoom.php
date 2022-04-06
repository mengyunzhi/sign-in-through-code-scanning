<?php
namespace app\common\model;
use think\Model;

class DispatchRoom extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getDispatchId() {
        return isset($this->data['dispatch_id']) ? (int)$this->data['dispatch_id'] : null;
    }

    public function getScheduleId() {
        return isset($this->data['schedule_id']) ? (int)$this->data['schedule_id'] : null;
    }

}