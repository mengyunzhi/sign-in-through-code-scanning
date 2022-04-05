<?php
namespace app\common\model;
use think\Model;

class Schedule extends Model {

    public function getId() {
        return (int)$this->data['id'];
    }

    public function getCallId() {
        return (int)$this->data['call_id'];
    }

    public function getTermId() {
        return (int)$this->data['term_id'];
    }

    public function getCourseId() {
        return (int)$this->data['course_id'];
    }

    

}