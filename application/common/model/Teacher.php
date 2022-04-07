<?php
namespace app\common\model;
use app\common\model\User;
use app\common\model\Term;
use think\Model;

class Teacher extends Model {

    /**
     * 添加课程
     */
    static public function courseSave($postData) {

        //string
        $courseId = (int) $postData['course_id'];
        //array
        $klass_ids = $postData['klass_id'];
        //call_id
        $callId = (int) $_SESSION['user']['id'];
        //哪个学期是激活状态那么termId就是哪个
        $termId = 1;

        //排课表
        $Schedule = new Schedule;
        $Schedule->call_id = $callId;
        $Schedule->role = $_SESSION['user']['role'];
        $Schedule->term_id = $termId;
        $Schedule->course_id = $courseId;
        $Schedule->save();

        //排课班级表
        $Schedule->klasses()->saveAll($klass_ids);
        $status = false; 
        //当前有week_XX, room_XX
        $Dispatch = [];
        //学期开始时间,从term表获取
        $startTimeString = Term::getStartTimeString();
        for ($i=1;$i <= 77; $i++) { 
            if (isset($postData['course_'. $i])) {
                if (empty($postData['room_' . $i])) {
                    //只选了第几周，没选教室
                    return false;
                }
                //room_$i是字符串(一节课可以在多个教室之后改成数组)
                $roomId = $postData['room_'.$i];

                //course_$i是一个数组
                foreach ($postData['course_'. $i] as $key => $week) {
                    //获取距离开学时间的秒数
                    $seconds = Teacher::getSecondsFromTermBegin($i, $week);
                    //日期字符串和秒数转换成当前日期
                    $dayString = Teacher::getDateAfterSeconds($startTimeString, $seconds);
                    //获取时间数组
                    $date = Teacher::getTimeFromString($dayString);

                    $Dispatch[$i][$key] = new Dispatch;
                    $Dispatch[$i][$key]->schedule_id = $Schedule->getId();
                    $Dispatch[$i][$key]->year = $date['year'];
                    $Dispatch[$i][$key]->month = $date['month'];
                    $Dispatch[$i][$key]->day = $date['day'];
                    //第几节课,还没用得上 
                    $lesson = $i % 11;
                    //开始时间和结束时间 再补充
                    $Dispatch[$i][$key]->start_time = 1;
                    $Dispatch[$i][$key]->end_time = 1;

                    //调度表中存时间  //调度表和教室表的中间表
                    $status = $Dispatch[$i][$key]->save() &&  $Dispatch[$i][$key]->rooms()->save($roomId);
                    if (!$status) {
                        return false;
                    }
                }
            }
        }
        //如果失败删除存入schedule表的东西
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

    /**
     * @param  [int] $lessonRank    [第几节课(一周为77节课)]
     * @param  [int] $weekRank [第几周的课]
     * @return [int]       [返回秒数]
     */
    static public function getSecondsFromTermBegin($lessonRank, $weekRank) 
    {
        //距学期开始的第几周内
        $days = ((int)$weekRank-1) * 7;
        //某天当天
        $weekDay = (int)($lessonRank / 11) + 1;
        //当天距离学期开始的秒数
        $seconds = ($days + ($weekDay-1))* 86400;

        return $seconds; 
    }

    /**
     * 从中间无符号的日期字符串获取数据
     * @param  [string] $string [日期字符串]
     * @return [array]         [带年月日的数组]
     */
    static public function getTimeFromString($string)
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
	
}