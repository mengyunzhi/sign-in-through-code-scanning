<?php
namespace app\common\model;
use think\Model;

class ScheduleKlass extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getScheduleId() {
        return isset($this->data['schedule_id']) ? (int)$this->data['schedule_id'] : null;
    }

    public function getKlassId() {
        return isset($this->data['klass_id']) ? (int)$this->data['klass_id'] : null;
    }

    static public function saveScheduleKlass($scheduleId, $klassId, &$msg='') {
        $studentIds = Student::where('klass_id', 'eq', $klassId)->column('id');
        foreach ($studentIds as $studentId) {
            $studentSchedule = new StudentSchedule;
            $studentSchedule->student_id = $studentId;
            $studentSchedule->schedule_id = $scheduleId;
            $status = $studentSchedule->save();
            $msg .= $studentSchedule->getError();
            if (!$status) return null;
        }

        $scheduleKlass = new ScheduleKlass;
        $scheduleKlass->schedule_id = $scheduleId;
        $scheduleKlass->klass_id = $klassId;
        $status = $scheduleKlass->save();
        $msg .= $scheduleKlass->getError();
        return $status ? $scheduleKlass : null;
    }

    static public function findklassIdsOfSameTime($klassesOfSameTimeScheduleIds) {
        $klassIdsOfSameTime = [];
        for ($key = 0; $key < count($klassesOfSameTimeScheduleIds); $key++) {
            $klassId = ScheduleKlass::where('schedule_id', $klassesOfSameTimeScheduleIds[$key])->select();
            array_push($klassIdsOfSameTime, $klassId[0]['klass_id']);
        }
        return $klassIdsOfSameTime;
    }

}