<?php
namespace app\common\model;
use think\Model;

class ScheduleKlass extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getScheduleId() {
        return isset($this->data['schedule_id']) ? (int)$this->data['schedule_id'] : null;
    }

    public function getKlassId() {
        return isset($this->data['klass_id']) ? (int)$this->data['klass_id'] : null;
    }

}