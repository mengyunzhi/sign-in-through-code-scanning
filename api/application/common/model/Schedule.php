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
        return isset($this->data['course']) ? $this->data['course'] : $this->data['course'] = Course::get($this->getCourseId());
    }
    
    public function getCourseId() 
    {
        return isset($this->data['course_id']) ? (int)$this->data['course_id'] : null;
    }

    public function Klasses()
    {
        return $this->belongsToMany('Klass', 'yunzhi_schedule_klass', 'klass_id', 'schedule_id');
    }
    
    static public function saveSchedule($teacherId, $termId, $courseId, &$msg='') {
        $schedule = new Schedule;
        $schedule->teacher_id = $teacherId;
        $schedule->term_id = $termId;
        $schedule->course_id = $courseId;
        $status = $schedule->save();
        $msg .= $schedule->getError();
        return $status ? $schedule : null;
    }

    static public function scheduleSave($teacherId, $courseId, $klassIds, $courseTimes, &$msg='') {
        //1、通过 teacherId、termId、courseId 先存schedule表
        $term = Term::getCurrentTerm();
        $schedule = Schedule::saveSchedule($teacherId, $term->id, $courseId, $msg);
        if (is_null($schedule)) return false;
        //2、通过 scheduleId、klassIds 存schedule_klass 表
        foreach ($klassIds as $klassId) {
            $scheduleKlass = ScheduleKlass::saveScheduleKlass($schedule->id, $klassId, $msg);
            if (is_null($scheduleKlass)) return false;
        }
        //存dispatch、dispatchroom
        $status = Dispatch::dispatchSave($schedule->id, $courseTimes, $msg);
        return $status;
    }

    static public function courseTimeSave($teacherId, $courseId, $scheduleId, $courseTimes, &$msg) {
        $dispatchIds = Dispatch::where('schedule_id', 'eq', $scheduleId)->column('id');
        $status = Dispatch::where('schedule_id', 'eq', $scheduleId)->delete();
        if (!$status) return false;
        $status = DispatchRoom::where('dispatch_id', 'in', $dispatchIds)->delete();
        if (!$status) return false;
        $status = Dispatch::dispatchSave($scheduleId, $courseTimes, $msg);
        return $status;
    }

    public function Students()
    {
        return $this->belongsToMany('Student', 'yunzhi_student_schedule', 'student_id', 'schedule_id');
    }
    

}