<?php
namespace app\common\model;
use think\Model;

class ScheduleKlass extends Model {

    public function getId() {
        return (int)$this->data['id'];
    }

    public function getScheduleId() {
        return (int)$this->data['schedule_id'];
    }

    public function getKlassId() {
        return (int)$this->data['klass_id'];
    }

}