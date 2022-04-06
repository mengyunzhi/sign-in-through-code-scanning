<?php
namespace app\common\model;
use think\Model;

class ProgramScore extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getStudentId() {
        return isset($this->data['student_id']) ? (int)$this->data['student_id'] : null;
    }

    public function getCourseId() {
        return isset($this->data['course_id']) ? (int)$this->data['course_id'] : null;
    }

    public function getProgramId() {
        return isset($this->data['program']) ? $this->data['program'] : null;
    }

    public function getUsual() {
        return isset($this->data['usual']) ? $this->data['usual'] : null;
    }

    public function getTerminal() {
        return isset($this->data['terminal']) ? $this->data['terminal'] : null;
    }

}