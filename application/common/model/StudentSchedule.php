<?php
namespace app\common\model;
use think\Model;

class StudentSchedule extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getStudentId() {
        return isset($this->data['student_id']) ? (int)$this->data['student_id'] : null;
    }

    public function getScheduleId() {
        return isset($this->data['schedule_id']) ? (int)$this->data['schedule_id'] : null;
    }

}