<?php
namespace app\common\model;
use think\Model;

class StudentSchedule extends Model {

    public function getId() {
        return $this->data['id'];
    }

    public function getStudentId() {
        return $this->data['student_id'];
    }

    public function getScheduleId() {
        return $this->data['schedule_id'];
    }

}