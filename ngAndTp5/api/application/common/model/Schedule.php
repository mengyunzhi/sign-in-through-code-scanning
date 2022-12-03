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
        $status1 = 0;
        $status2 = 0;
        $status3 = 0;
        $status4 = 0;
        $status5 = 0;
        $status6 = 0;
        $msg = '';
        $newRoomIds = [];
        $deleteRoomIds = [];
        $dispatch_1 = Dispatch::where('schedule_id', 'eq', $scheduleId)->select();
        // 获取默认的coourseTimes
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
                    }
                }


                $eidtAddCourseTimes[$i][$j]['weeks'] = [];
                $eidtAddCourseTimes[$i][$j]['roomIds'] = [];

                $eidtDeleteCourseTimes[$i][$j]['weeks'] = [];
                $eidtDeleteCourseTimes[$i][$j]['roomIds'] = [];
            }
        }
        // weeks或者roomIds的, 数量相同但是内容不同
        for ($i = 0; $i < 7; $i++) {
            for ($j = 0; $j < 5; $j++) {
                if (count($indexCourseTimes[$i][$j]['weeks']) === count($newCourseTimes[$i][$j]->weeks)) {
                    if ($indexCourseTimes[$i][$j]['weeks'] !== $newCourseTimes[$i][$j]->weeks) {
                        return false; 
                    }
                }
                if (count($indexCourseTimes[$i][$j]['roomIds']) === count($newCourseTimes[$i][$j]->roomIds)) {
                    if ($indexCourseTimes[$i][$j]['roomIds'] !== $newCourseTimes[$i][$j]->roomIds) {
                        return false; 
                    }
                }
            }
        }

        for ($i = 0; $i < 7; $i++) {
            for ($j = 0; $j < 5; $j++) { 
                // 当小单元中又选week又选room时：$status1
                if (count($indexCourseTimes[$i][$j]['weeks']) < count($newCourseTimes[$i][$j]->weeks)
                 && count($indexCourseTimes[$i][$j]['roomIds']) < count($newCourseTimes[$i][$j]->roomIds)) {
                    $status1 = 1;
                    // 找到其中新增的weeks 
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
                    // 找到其中新增的roomIds
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

                // 当小单元中只选week不选room时：$status2
                else if (count($indexCourseTimes[$i][$j]['weeks']) < count($newCourseTimes[$i][$j]->weeks)
                 && count($indexCourseTimes[$i][$j]['roomIds']) === count($newCourseTimes[$i][$j]->roomIds)) {
                    $status2 = 1;
                    // 原indexCourseTimes不变，新选周默认在当前单元所有已选教室上课
                    // 找到新增的Weeks
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
                    // RoomIds不变    
                    for ($x = 0; $x < count($newCourseTimes[$i][$j]->roomIds); $x++) {
                        array_push($eidtAddCourseTimes[$i][$j]['roomIds'], $newCourseTimes[$i][$j]->roomIds[$x]);
                    }
                }

                // 当小单元中不选week只选room时：$status3
                else if (count($indexCourseTimes[$i][$j]['weeks']) === count($newCourseTimes[$i][$j]->weeks)
                 && count($indexCourseTimes[$i][$j]['roomIds']) < count($newCourseTimes[$i][$j]->roomIds)) {
                    $status3 = 1;
                    // 原week的教室中加入新选教室
                    // 找到新增的RoomIds
                    for ($x = 0; $x < count($newCourseTimes[$i][$j]->roomIds); $x++) {
                        $sta = 1;
                        for ($y = 0; $y < count($indexCourseTimes[$i][$j]['roomIds']); $y++) {
                            if ($newCourseTimes[$i][$j]->roomIds[$x] === $indexCourseTimes[$i][$j]['roomIds'][$y]) {
                                $sta = 0;
                            }
                        }
                        if ($sta === 1) {
                            array_push($newRoomIds, $newCourseTimes[$i][$j]->roomIds[$x]);
                        }
                    }
                    // 直接找到对应的dispatches 然后添加其room
                    for ($x = 0; $x < count($newCourseTimes[$i][$j]->weeks); $x++) {
                        array_push($eidtAddCourseTimes[$i][$j]['weeks'], $newCourseTimes[$i][$j]->weeks[$x]);
                        $dispatch = new Dispatch();
                        $dispatchId = $dispatch->where('day', $i)
                                                        ->where('lesson', $j)
                                                        ->where('week', $indexCourseTimes[$i][$j]['weeks'][$x])
                                                        ->where('schedule_id', $scheduleId)
                                                        ->find()->getId();
                        $room_id = DispatchRoom::where('dispatch_id', $dispatchId)->column('room_id');
                        if (!empty($newRoomIds)) {
                            for ($y = 0; $y < count($newRoomIds); $y++) {
                                if (!in_array($newRoomIds[$y], $room_id)) {
                                    DispatchRoom::saveDispatchRoom($dispatchId, $newRoomIds[$y], $msg);
                                }
                            }
                        }
                    }
                }


                // 当小单元中不选week不选room时：$status4
                else if (count($indexCourseTimes[$i][$j]['weeks']) === count($newCourseTimes[$i][$j]->weeks)
                 && count($indexCourseTimes[$i][$j]['roomIds']) === count($newCourseTimes[$i][$j]->roomIds)) {
                    $status4 = 1;
                    // 没有需要新增的数据
                    $eidtAddCourseTimes[$i][$j]['weeks'] = [];
                    $eidtAddCourseTimes[$i][$j]['roomIds'] = [];
                }

                // 当小单元中对week取消勾选且room不变时：$status5
                else if (count($indexCourseTimes[$i][$j]['weeks']) > count($newCourseTimes[$i][$j]->weeks)
                 && count($indexCourseTimes[$i][$j]['roomIds']) === count($newCourseTimes[$i][$j]->roomIds)) {
                    $status5 = 1;

                    for ($x = 0; $x < count($indexCourseTimes[$i][$j]['weeks']); $x++) {
                        $sta = 1;
                        // 如果某周在新courseTimes不存在则$sta = 1
                        for ($y = 0; $y < count($newCourseTimes[$i][$j]->weeks); $y++) {
                            if ($indexCourseTimes[$i][$j]['weeks'][$x] === $newCourseTimes[$i][$j]->weeks[$y]) {
                                $sta = 0;
                            }
                        }
                        // 该周在新courseTimes不存在,删掉dispatch与room的关系
                        if ($sta === 1) {
                            array_push($eidtDeleteCourseTimes[$i][$j]['weeks'], $indexCourseTimes[$i][$j]['weeks'][$x]);
                            $dispatch = new Dispatch();
                            $deleteDispatch = $dispatch->where('day', $i)
                                                        ->where('lesson', $j)
                                                        ->where('week', $indexCourseTimes[$i][$j]['weeks'][$x])
                                                        ->where('schedule_id', $scheduleId)
                                                        ->find();
                            DispatchRoom::where('dispatch_id', $deleteDispatch->id)->delete();
                            $deleteDispatch->delete();
                        }
                    }            
                }

                // 当小单元中对room取消勾选且week不变时：$status6
                else if (count($indexCourseTimes[$i][$j]['weeks']) === count($newCourseTimes[$i][$j]->weeks)
                 && count($indexCourseTimes[$i][$j]['roomIds']) > count($newCourseTimes[$i][$j]->roomIds)) {
                    $status6 = 1;
                    for ($x = 0; $x < count($indexCourseTimes[$i][$j]['roomIds']); $x++) {
                        $sta = 1;
                        // 新的在里面不存在就$sta = 1;
                        for ($y = 0; $y < count($newCourseTimes[$i][$j]->roomIds); $y++) {
                            if ($indexCourseTimes[$i][$j]['roomIds'][$x] === $newCourseTimes[$i][$j]->roomIds[$y]) {
                                $sta = 0;
                            }
                        }
                        // 新的在里面不存在
                        if ($sta === 1) {
                            // array_push($deleteRoomIds, $indexCourseTimes[$i][$j]['roomIds'][$x]);
                            // for ($t = 0; $t < count($deleteRoomIds); $t++) {
                                $deleteRoomId = $indexCourseTimes[$i][$j]['roomIds'][$x];
                                // dump($deleteRoomId);
                                $dispatch_idOfDispatch_rooms = DispatchRoom::where('room_id', 'eq', $deleteRoomId)->column('dispatch_id');
                                // dump($dispatch_idOfDispatch_rooms);
                                for ($a = 0; $a < count($dispatch_idOfDispatch_rooms); $a++) {
                                    $dispatch_room_roomIds = DispatchRoom::where('dispatch_id', 'eq', $dispatch_idOfDispatch_rooms[$a])->column('room_id');
                                    // dump($dispatch_room_roomIds);
                                    if (count($dispatch_room_roomIds) === 1) {
                                        Dispatch::where('id', $dispatch_idOfDispatch_rooms[$a])->find()->delete();
                                    }
                                    // DispatchRoom::where('dispatch_id', $dispatch_idOfDispatch_rooms[$a])->delete();
                                    $dispatchRoom = new DispatchRoom();
                                    $dispatchRoom->where('dispatch_id', $dispatch_idOfDispatch_rooms[$a])
                                                 ->where('room_id', $deleteRoomId)->delete();
                                    // dump(DispatchRoom::where('dispatch_id', $dispatch_idOfDispatch_rooms[$a]);
                                }
                            // }
                        }
                    }
                }

                // 当小单元中取消勾选所有选项（week和room）
                else if (count($newCourseTimes[$i][$j]->weeks) === 0
                      && count($newCourseTimes[$i][$j]->roomIds) === 0) {
                    for ($x = 0; $x < count($indexCourseTimes[$i][$j]['weeks']); $x++) {
                        $sta = 1;
                        for ($y = 0; $y < count($newCourseTimes[$i][$j]->weeks); $y++) {
                            if ($indexCourseTimes[$i][$j]['weeks'][$x] === $newCourseTimes[$i][$j]->weeks[$y]) {
                                $sta = 0;
                            }
                        }
                        if ($sta === 1) {
                            array_push($eidtDeleteCourseTimes[$i][$j]['weeks'], $indexCourseTimes[$i][$j]['weeks'][$x]);
                            $dispatch = new Dispatch();
                            $deleteDispatch = $dispatch->where('day', $i)
                                                        ->where('lesson', $j)
                                                        ->where('week', $indexCourseTimes[$i][$j]['weeks'][$x])
                                                        ->where('schedule_id', $scheduleId)
                                                        ->find();
                            DispatchRoom::where('dispatch_id', $deleteDispatch->id)->delete();
                            $deleteDispatch->delete();
                        }
                    }
                }

                else {
                    return false;
                }
            }
        }

        $statu = Dispatch::editDispatchSave($scheduleId, $eidtAddCourseTimes, $msg);
        return $statu;
        // dump($newCourseTimes[0][0]->weeks);
        // dump($newCourseTimes[0][0]->roomIds);
        // dump($indexCourseTimes[0][0]['weeks']);
        // dump($indexCourseTimes[0][0]->roomIds);
        // dump($newCourseTimes[0][0]);
        // dump($indexCourseTimes[0][0]);
        // dump($eidtAddCourseTimes[0][0]);
        // dump($deleteRoomIds);

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
