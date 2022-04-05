<?php
namespace app\common\model;
use think\Model;

class CourseScore extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getStudentId() {
        return isset($this->data['student_id']) ? (int)$this->data['student_id'] : null;
    }

    public function getCourseId() {
        return isset($this->data['Course_id']) ? (int)$this->data['Course_id'] : null;
    }

    public function getUsual() {
        return isset($this->data['usual']) ? $this->data['usual'] : null;
    }

    public function getTerminal() {
        return isset($this->data['terminal']) ? $this->data['terminal'] : null;
    }

}