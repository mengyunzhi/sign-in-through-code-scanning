<?php
namespace app\common\model;
use app\common\model\User;
use app\common\model\Term;
use think\Model;
use think\Db;   // 引用数据库操作类
use think\Exception;
class Teacher extends Model {

    static public function courseDelete($scheduleId)
    {
        if (empty($scheduleId)) {
            throw new Exception('无排课id');
        }
        //删除scheduleId对应的调度表 调度room表 klass表 学生排课表 
        $Schedule = Schedule::get($scheduleId);

        if (is_null($Schedule)) {
            throw new Exception('无排课信息');
        }

        //删除dispatch表 diapatch_room表
        $Dispatches = $Schedule->getDispatches();
        $roomIds = Room::column('id');
        foreach ($Dispatches as $key => $Dispatch) {
            $Dispatch->rooms()->detach($roomIds);
            $status = $Dispatch->delete();
            if (!$status) {
                throw new Exception('调度表删除失败');
            }
        }

        //删除schedule_klass表
        $klassIds = Klass::column('id');
        $Schedule->Klasses()->detach($klassIds);
        //删除student_schedule表
        $studentIds = Student::column('id');
        $status = $Schedule->Students()->detach($studentIds);
        //删除排课表
        $status = $Schedule->delete();
        return $status;
    }

    static public function courseKlassDelete($scheduleId, $klassId)
    {
        if (empty($scheduleId)) {
            throw new Exception('无排课id');
        } elseif (empty($klassId)) {
            throw new Exception('无班级id');
        }
        //detach方法返回值为null
        Schedule::get($scheduleId)->Klasses()->detach($klassId);
        return true;
    }

    static public function courseKlassSave($scheduleId, $klassIds)
    {
        return Schedule::get($scheduleId)->Klasses()->saveAll($klassIds);
    }

    static public function courseProgramDelete($programId)
    {
        $status = Program::where('id', 'eq', (int)$programId)->delete();
        return $status;
    }

    static public function courseProgramSave($name, $lesson, $courseId)
    {
        $Program = new Program;
        $Program->setAttr('name', $name);
        $Program->lesson = $lesson;
        $Program->course_id = $courseId;
        $status = $Program->save();
        return $status;
    }

    static public function courseProgramUpdate($programId, $name, $lesson)
    {
        $Program = Program::get($programId);
        $Program->name = $name;
        $Program->lesson = $lesson;
        return $Program->save();
    }

    static public function courseTimeSave($postData)
    {
        return self::dispatchSave($postData);
    }

    static public function excludeKlasses($excludedKlasses)
    {
        $excludedKlassIds = [];
        foreach ($excludedKlasses as $key => $excludedKlass) {
            $excludedKlassIds[$key] = $excludedKlass->id;
        }
        if (empty($excludedKlassIds)) {
            $excludedKlassIds = 0;
        }
        $Klasses = Klass::where('id', 'not in', $excludedKlassIds)->select();
        return $Klasses;
    }

    /**
     * 添加课程
     */
    static public function scheduleSave($postData) {
        //string 对应课程         1个
        $courseId = (int) $postData['course_id'];
        //array 班级              n个
        $klass_ids = $postData['klass_id'];
        //teacher_id 教师id       1个
        $Teacher = Teacher::where('user_id', 'eq', User::getCurrentLoginUser()->getId())->find();
        $teacherId = (int) $Teacher->getId();
        //已激活学期
        $term = Term::getCurrentTerm();


        //存入排课信息
        $Schedule = new Schedule;
        $Schedule->teacher_id = $teacherId;
        $Schedule->term_id = $term->getId();
        $Schedule->course_id = $courseId;
        $status = $Schedule->save();
        if (!$status) {
            throw new Exception('schedule表添加失败');
        }

        //排课班级表
        $status = $Schedule->Klasses()->saveAll($klass_ids);
        if (!$status) {
            throw new Exception('schedule_klass表添加失败');
        }

        //存入学生和排课表的关系  通过班级id数组
        //如果班级的学生是空的也会报错
        $status = self::studentScheduleSaveByKlassIds($Schedule, $klass_ids);
        if (!$status) {
            throw new Exception('student_schedule表添加失败');
        }

        $status = self::dispatchSave($postData, $Schedule->getId());
        return $status;
    }

    static public function dispatchSave($postData, $scheduleId = null)
    {
        $status = false;
        if (isset($postData['schedule_id'])) {
            $scheduleId = $postData['schedule_id'];
        }
        for ($i=1;$i <= 77; $i++) { 
            if (isset($postData['course_'. $i])) {
                if (empty($postData['room_' . $i])) {
                    //只选了第几周，没选教室
                    throw new Exception('room_' . $i .'中无数据');
                }
                
                //course_$i是一个数组 
                foreach ($postData['course_'. $i] as $key => $week) {
                    $Dispatch[$i][$key] = new Dispatch;
                    $Dispatch[$i][$key]->schedule_id = $scheduleId;
                    $Dispatch[$i][$key]->week = $week;
                    if ( (1 <= $i && $i <= 5) || 
                        (11*1 + 1 <= $i && $i <= 11*1 + 5) ||
                        (11*2 + 1 <= $i && $i <= 11*2 + 5) ||
                        (11*3 + 1 <= $i && $i <= 11*3 + 5) ||
                        (11*4 + 1 <= $i && $i <= 11*4 + 5) ||
                        (11*5 + 1 <= $i && $i <= 11*5 + 5) ||
                        (11*6 + 1 <= $i && $i <= 11*6 + 5)  )  {
                        $Dispatch[$i][$key]->day = $i / 11 + 1;
                    } else {
                        $Dispatch[$i][$key]->day = $i / 11;
                    }
                    if ($i % 11 !== 0) {
                        $Dispatch[$i][$key]->lesson = $i % 11;
                    } else {
                        $Dispatch[$i][$key]->lesson = 11;
                    }
                    
                    //调度表中存时间  
                    $status = $Dispatch[$i][$key]->save();
                    if (!$status) {
                        throw new Exception('dispatch表添加失败');
                    }
                    //room_$i是数组
                    $roomIds = $postData['room_'.$i];
                    $status = $Dispatch[$i][$key]->Rooms()->saveAll($roomIds);
                    if (!$status) {
                        throw new Exception('dispatch_room表添加失败');
                    }
                }
            }
        }
        return $status;
    }

    /**
     * 返回经过多少秒后的日期字符串(中间无符号)
     * @param  [string] $primaryDate [初始日期 中间无符号]
     * @param  [秒数] $seconds 
     * @return [string]              [字符串]
     */
    static public function getDateAfterSeconds($primaryDateString, $seconds)
    {
        $primaryDateStamp = strtotime($primaryDateString);
        $dateStamp = $primaryDateStamp + $seconds;
        return date('Ymd', $dateStamp);
    }

    static public function getDispatchTimeFromTermBegin($timestamp)
    {
        $term = Term::getCurrentTerm();
        if (!is_null($term)) {
            $termBeginTimeStamp = strtotime($term->getStartTime());
        } else {
            $termBeginTimeStamp = null;
        }

        $seconds = $timestamp - $termBeginTimeStamp;
        $days = (int)($seconds / 86400);
        $seconds = $seconds % 86400;
        $dispatchTime['week'] = (int) ($days / 7) + 1;
        $dispatchTime['day'] = $days % 7 + 1;
        $dispatchTime['lesson'] = self::getLessonBySeconds($seconds);
        if ($dispatchTime['lesson'] === 6) {
            $dispatchTime['week'] += (int)(($dispatchTime['day'] ) / 7);
            $dispatchTime['day'] = ($dispatchTime['day']) % 7  + 1;
            $dispatchTime['lesson'] = 1;
        }
        return $dispatchTime;
    }

    static public function getLessonBySeconds($seconds)
    {
        $seconds = (int)$seconds % 86400;
        if ($seconds < 7500 ) {
            return 1;
        } elseif ($seconds < 14400) {
            return 2;
        } elseif ($seconds < 27300) {
            return 3;
        } elseif ($seconds < 34200) {
            return 4;
        } elseif ($seconds < 47100) {
            return 5;
        } else {
            return 6;
        }
        // 1 : 1800-7500  第一节课
        // 2 : 8700-14400  第二节课
        // 3 : 21600-27300  第三节课
        // 4 : 28500-34200  第四节课
        // 5 : 38400-47100  第五节课
        // 获取周 天 节 然后courseSort页面根据相减排序
    }



    /**
     * @param  [int] $lesson    [第几节课]
     * @param  [int] $week [第几周的课]
     * @param  [int] $day [本周第几天]
     * @return [int]       [返回秒数]
     */
    static public function getSecondsFromTermBegin($week, $day, $lesson = 0) 
    {
        //距学期开始的第几周内
        $days = ((int)$week-1) * 7;
        //当天距离学期开始的秒数
        $seconds = ($days + ($day-1))* 86400;

        return $seconds; 
    }

    /**
     * 从中间无符号的日期字符串获取数据
     * @param  [string] $string [日期字符串]
     * @return [array]         [带年月日的数组]
     */
    static public function getTimeFromDateString($string)
    {
        // function 从中间无符号的字符串截取日期
        $date['year'] = (int)substr($string, 0, 4);
        $date['month'] = (int)substr($string, 4, 2);
        $date['day'] = (int)substr($string, 6, 2);
        return $date;
    }

    

	/**
     *通过user_id获取user表中的教师对象
     */
    public function getUser() 
    {
        if (isset($this->data['user'])) {
            return $this->data['user'];
        }

        $UserId = isset($this->data['user_id']) ? $this->data['user_id'] : null;
        $this->data['user'] = User::get($UserId);
        return $this->data['user'];
    }

    /**
     * 获取id字段
     */
    public function getId() 
    {
        return isset($this->data['id']) ? $this->data['id'] : null;
    }

    /**
     * 获取user_id字段
     */
    public function getUserId() 
    {
        return isset($this->data['user_id']) ? $this->data['user_id'] : null;
    }
    
    /**
     *获取教师的number字段
     */
    public function getNumber() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getNumber() : null;
    }

    /**
     *获取教师的password字段
     */
    public function getPassword() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getPassword() : null;
    }


    /**
     *获取教师的name字段
     */
    public function getName() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getName() : null;
    }

    /**
     *获取教师的sex字段
     */
    public function getSex() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getSex() : null;
    }

	/**
	 * 判断密码是否正确
	 * 进行密码加密
	 * */
	public function checkPassword($password)
	{
		return ($this->getData('password') === $password);
	}

	public function getSexAttr($value) {
		$status = [
			'0'=>'男',
			'1'=>'女',
		];
		$sex = $status[$value];
		if (isset($sex)) {
			return $sex;
		} else {
			return $status[0];
		}
	}

    /**
     * 通过班级id存入学生和排课的关系
     * @param  [object] $Schedule [要存的排课对象]
     * @param  [array] $klassIds [班级id的数组]
     * @return [bool]           [成功 true; 失败 false]
     */
    static public function studentScheduleSaveByKlassIds($Schedule, $klassIds) {
        foreach ($klassIds as $key => $klassId) {
            $Student[$key] = Student::where('klass_id', 'eq', $klassId)->select();
            $status = $Schedule->Students()->saveAll($Student[$key]);
            if (!$status) {
                break;
            }
        }
        return $status;
    }
	
}