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

    // 此处删掉了第一个参数$teacherId, Csh 20220716
    static public function courseTimeSave($courseId, $scheduleId, $courseTimes, &$msg) {
        // dump('333333333333');
        $dispatchIds = Dispatch::where('schedule_id', 'eq', $scheduleId)->column('id');
        Dispatch::where('schedule_id', 'eq', $scheduleId)->delete();
        if (empty($dispatchIds)) $dispatchIds = [0];
        DispatchRoom::where('dispatch_id', 'in', $dispatchIds)->delete();
        $status = Dispatch::dispatchSave($scheduleId, $courseTimes, $msg);
        return $status;
    }

    static public function eidtCourseTimeSave($courseId, $scheduleId, $newCourseTimes, &$msg) {
        $status = 0;
        $msg = '';
        // 通过scheduleId去dispatch表找对应的dispatch(1) 
        // 在dispatch(1)中找出dispatch.day === courseTime.changeDay; dispatch.lesson === courseTime.changeLesson的dispatch(2)
        // 通过dispatch(2).id去dispatch_room里找对应的alreadExitRoomIds
        // 从courseTimes.selectRoomIds中除去alreadExitRoomIds得到courseTimes(1)
        // 调用Dispatch::dispatchSave($scheduleId, $courseTimes(1), $msg)
        $dispatch_1 = Dispatch::where('schedule_id', 'eq', $scheduleId)->select();
        for ($i = 0; $i < 7; $i++) {
            for ($j = 0; $j < 5; $j++) { 
                $indexCourseTimes[$i][$j]['weeks'] = [];
                $indexCourseTimes[$i][$j]['roomIds'] = [];
                foreach ($dispatch_1 as $dispatch) 
                {
                    if ($dispatch['day'] === $i && $dispatch['lesson'] === $j) 
                    {
                        array_push($indexCourseTimes[$i][$j]['weeks'], $dispatch['week']);
                        $room_id = DispatchRoom::where('dispatch_id', $dispatch['id'])->column('room_id');
                        for ($a = 0; $a < count($room_id); $a++) 
                        {
                            if (!in_array($room_id[$a], $indexCourseTimes[$i][$j]['roomIds'])) {
                                array_push($indexCourseTimes[$i][$j]['roomIds'], $room_id[$a]);
                            }
                        }
                        // if (count($indexCourseTimes[$i][$j]['roomIds']) === 0) 
                        // {
                        //     for ($a = 0; $a < count($room_id); $a++) 
                        //     {
                        //         array_push($indexCourseTimes[$i][$j]['roomIds'], $room_id[$a]);
                        //     }
                        // } 
                        // else 
                        // {
                        //     $staa = 1;
                        //     for ($p = 0; $p < count($indexCourseTimes[$i][$j]['roomIds']); $p++) 
                        //     {
                        //         for ($a = 0; $a < count($room_id); $a++) 
                        //         {
                        //             if ($room_id[$a] === $indexCourseTimes[$i][$j]['roomIds'][$p]) 
                        //             {
                        //                 $staa = 0;
                        //             }
                        //             if ($staa) 
                        //             {
                        //                 array_push($indexCourseTimes[$i][$j]['roomIds'], $room_id[$a]);
                        //             }
                        //         }
                        //     }
                        // }
                    }
                }


                $eidtAddCourseTimes[$i][$j]['weeks'] = [];
                $eidtAddCourseTimes[$i][$j]['roomIds'] = [];
            }
        }
        for ($i = 0; $i < 7; $i++) {
            for ($j = 0; $j < 5; $j++) { 
                if (count($indexCourseTimes[$i][$j]['weeks']) < count($newCourseTimes[$i][$j]->weeks)
                 && count($indexCourseTimes[$i][$j]['roomIds']) < count($newCourseTimes[$i][$j]->roomIds)) {
                    $status = 1;
                    for ($x = 0; $x < count($newCourseTimes[$i][$j]->weeks); $x++) {
                        $sta = 1;
                        for ($y = 0; $y < count($indexCourseTimes[$i][$j]['weeks']); $y++) {
                            if ($newCourseTimes[$i][$j]->weeks[$x] === $indexCourseTimes[$i][$j]['weeks'][$y]) {
                                $sta = 0;
                            }
                        }
                        if ($sta === 1) {
                            array_push($eidtAddCourseTimes[$i][$j]['weeks'], $newCourseTimes[$i][$j]->weeks[$x]);
                        }
                    }

                    for ($x = 0; $x < count($newCourseTimes[$i][$j]->roomIds); $x++) {
                        $sta = 1;
                        for ($y = 0; $y < count($indexCourseTimes[$i][$j]['roomIds']); $y++) {
                            if ($newCourseTimes[$i][$j]->roomIds[$x] === $indexCourseTimes[$i][$j]['roomIds'][$y]) {
                                $sta = 0;
                            }
                        }
                        if ($sta === 1) {
                            array_push($eidtAddCourseTimes[$i][$j]['roomIds'], $newCourseTimes[$i][$j]->roomIds[$x]);
                        }
                    }
                 }
            }
        }
        if ($status) {
            $statu = Dispatch::editDispatchSave($scheduleId, $eidtAddCourseTimes, $msg);
            return $statu;
        } else {
            $statu = self::courseTimeSave($courseId, $scheduleId, $newCourseTimes, $msg);
            return $statu;
        }
        // dump($newCourseTimes[0][0]->weeks);
        // dump($newCourseTimes[0][0]->roomIds);
        // dump($indexCourseTimes[0][0]['weeks']);
        // dump($indexCourseTimes[0][0]->roomIds);
        // dump($newCourseTimes[0][0]);
        // dump($indexCourseTimes[0][0]);
        // dump($eidtAddCourseTimes[0][0]);
        



    }

    public function Students()
    {
        return $this->belongsToMany('Student', 'yunzhi_student_schedule', 'student_id', 'schedule_id');
    }

    static public function deleteById($id) {
        $schedule = Schedule::get($id);

        StudentSchedule::where('schedule_id', $id)->delete();
        ScheduleKlass::where('schedule_id', $id)->delete();
        
        $dispatchIds = Dispatch::where('schedule_id', $id)->column('id');
        foreach ($dispatchIds as $dispatchId) {
            Dispatch::courseTimeAndRoomDelete($dispatchId);
        }
        
        $status = $schedule->delete();
        return true;
    }
    

}