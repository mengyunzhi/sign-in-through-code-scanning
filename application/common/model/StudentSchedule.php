<?php
namespace app\common\model;
use think\Model;

class StudentSchedule extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getStudentId() {
        return isset($this->data['student_id']) ? (int)$this->data['student_id'] : null;
    }

    public function getScheduleId() {
        return isset($this->data['schedule_id']) ? (int)$this->data['schedule_id'] : null;
    }
    /**
     * 在student表中调用 存学生排课
     * @author chenshihang 858190647@qq.com
     * @param  string $msg       报错信息
     * @return boolean         成功 true；失败 false
     */
    static public function studentScheduleSave($studentId, $klassId, $msg='') {
        $scheduleIds = ScheduleKlass::where('klass_id', 'eq', $klassId)->column('schedule_id');
        $data = [];
        foreach ($scheduleIds as $scheduleId) {
            array_push($data, ['student_id'=>$studentId, 'schedule_id'=>$scheduleId]);
        }
        $StudentSchedule = new StudentSchedule;
        //返回数组 元素为对象
        $status = $StudentSchedule->saveAll($data);
        $msg .= $StudentSchedule->getError();
        if (!empty($StudentSchedule->getError())) {
            return false;
        }
        return true;
    }
}