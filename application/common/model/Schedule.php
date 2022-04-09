<?php
namespace app\common\model;
use think\Model;

class Schedule extends Model {

    public function getDispatches()
    {
        return isset($this->data['dispatch']) ? $this->data['dispatch'] : $this->data['dispatch'] = Dispatch::where('schedule_id', 'eq', $this->getId())->select();
    }

    public function getId() 
    {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getTeacher()
    {
        return isset($this->data['teacher']) ? $this->data['teacher'] : $this->data['teacher'] = Teacher::get($this->getTeacherId());
    }

    public function getTeacherId() 
    {
        return isset($this->data['teacher_id']) ? (int)$this->data['teacher_id'] : null;
    }

    public function getTerm()
    {
        return isset($this->data['term']) ? $this->data['term'] : $this->data['term'] = Term::get($this->getTermId());
    }

    public function getTermId() 
    {
        return isset($this->data['term_id']) ? (int)$this->data['term_id'] : null;
    }

    public function getCourse()
    {
        return isset($this->data['course']) ? $this->data['course'] : $this->data['course'] = Course::get($this->getTeacherId());
    }

    public function getCourseId() 
    {
        return isset($this->data['course_id']) ? (int)$this->data['course_id'] : null;
    }

    public function Klasses()
    {
        return $this->belongsToMany('Klass', 'yunzhi_schedule_klass', 'klass_id', 'schedule_id');
    }

    public function Students()
    {
        return $this->belongsToMany('Student', 'yunzhi_student_schedule', 'student_id', 'schedule_id');
    }
    

}