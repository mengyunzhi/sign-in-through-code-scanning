<?php
namespace app\common\model;
use think\Model;

class ScheduleKlass extends Model {

    public function getId() {
        return $this->data['id'];
    }

    public function getScheduleId() {
        return $this->data['schedule_id'];
    }

    public function getKlassId() {
        return $this->data['klass_id'];
    }

}