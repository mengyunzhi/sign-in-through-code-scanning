<?php
namespace app\common\model;
use think\Model;

class CourseScore extends Model {

    public function getId() {
        return $this->data['id'];
    }

    public function getStudentId() {
        return $this->data['student_id'];
    }

    public function getCourseId() {
        return $this->data['Course_id'];
    }

    public function getUsual() {
        return $this->data['usual'];
    }

    public function getTerminal() {
        return $this->data['terminal'];
    }

}