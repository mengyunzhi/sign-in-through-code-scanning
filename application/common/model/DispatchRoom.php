<?php
namespace app\common\model;
use think\Model;

class DispatchRoom extends Model {

    public function getId() {
        return (int)$this->data['id'];
    }

    public function getStudentId() {
        return (int)$this->data['student_id'];
    }

    public function getScheduleId() {
        return (int)$this->data['schedule_id'];
    }

}