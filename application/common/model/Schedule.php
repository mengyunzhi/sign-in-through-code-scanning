<?php
namespace app\common\model;
use think\Model;

class Schedule extends Model {

    public function getId() {
        return $this->data['id'];
    }

    public function getCallId() {
        return $this->data['call_id'];
    }

    public function getTermId() {
        return $this->data['term_id'];
    }

    public function getCourseId() {
        return $this->data['course_id'];
    }

    

}