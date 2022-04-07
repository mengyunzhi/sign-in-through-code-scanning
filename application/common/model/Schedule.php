<?php
namespace app\common\model;
use think\Model;

class Schedule extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getCallId() {
        return isset($this->data['call_id']) ? (int)$this->data['call_id'] : null;
    }

    public function getTermId() {
        return isset($this->data['term_id']) ? (int)$this->data['term_id'] : null;
    }

    public function getCourseId() {
        return isset($this->data['course_id']) ? (int)$this->data['course_id'] : null;
    }

    public function klasses()
    {
        return $this->belongsToMany('Klass', 'yunzhi_schedule_klass', 'klass_id', 'schedule_id');
    }

    public function students()
    {
        return $this->belongsToMany('Student', 'yunzhi_student_schedule', 'student_id', 'schedule_id');
    }
    

}