<?php
namespace app\common\model;
use think\Model;

class ProgramScore extends Model {

    public function getId() {
        return (int)$this->data['id'];
    }

    public function getStudentId() {
        return (int)$this->data['student_id'];
    }

    public function getCourseId() {
        return (int)$this->data['course_id'];
    }

    public function getProgramId() {
        return $this->data['program'];
    }

    public function getUsual() {
        return $this->data['usual'];
    }

    public function getTerminal() {
        return $this->data['terminal'];
    }

}