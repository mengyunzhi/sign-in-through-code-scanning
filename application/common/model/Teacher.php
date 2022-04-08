<?php
namespace app\common\model;
use app\common\model\User;
use app\common\model\Term;
use think\Model;
use think\Exception;
class Teacher extends Model {

    /**
     * 添加课程
     */
    static public function courseSave($postData) {
        //string 对应课程         1个
        $courseId = (int) $postData['course_id'];
        //array 班级              n个
        $klass_ids = $postData['klass_id'];
        //teacher_id 教师id       1个
        $Teacher = Teacher::where('user_id', 'eq', $_SESSION['user']['id'])->find();
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

        //当前有week_XX, room_XX
        $Dispatch = [];
        //学期开始时间,从term表获取
        $startTimeString = date('Ymd', $term->getStartTime());
        for ($i=1;$i <= 77; $i++) { 
            if (isset($postData['course_'. $i])) {
                if (empty($postData['room_' . $i])) {
                    //只选了第几周，没选教室
                    throw new Exception('room_' . $i .'中无数据');
                }
                

                //course_$i是一个数组 
                foreach ($postData['course_'. $i] as $key => $week) {
                    $Dispatch[$i][$key] = new Dispatch;
                    $Dispatch[$i][$key]->schedule_id = $Schedule->getId();
                    $Dispatch[$i][$key]->week = $week;
                    $Dispatch[$i][$key]->day = $i / 11 + 1;
                    $Dispatch[$i][$key]->lesson = $i % 11;

                    //调度表中存时间  
                    $status = $Dispatch[$i][$key]->save();
                    if (!$status) {
                        throw new Exception('dispatch表添加失败');
                    }
                    //room_$i是数组
                    $roomId = $postData['room_'.$i];
                    $status = $Dispatch[$i][$key]->Rooms()->saveAll($roomId);
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

    static public function getDispatchesInSomeWeek($Dispatches, $week)
    {
        $DispatchesInSomeWeek = [];

        foreach ($Dispatches as $key => $Dispatch) {
            if ($Dispatch['week'] === $week) {
                array_push($DispatchesInSomeWeek, $Dispatch);
            }
        }
        return $DispatchesInSomeWeek;
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
     *通过user_id获取教师用户
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