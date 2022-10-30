<?php
namespace app\common\model;
use app\common\model\Klass;
use think\Db;   // 引用数据库操作类
use think\Model;

class Student extends Model {

    /**
     *通过user_id获取学生用户
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
     * 获取klass_id字段
     */
    public function getKlassId() 
    {
        return $this->data['klass_id'];
    }

    /**
     * 获取学生所在班级
     */
    public function getKlass() 
    {
        return isset($this->data['klass']) ? $this->data['klass'] : $this->data['klass'] = Klass::get($this->getKlassId());
    }
    
    /**
     *通过获取sno(学号)字段
     */
    public function getSno() 
    {
        return $this->data['sno'];
    }

    /**
     *通过获取state字段
     */
    public function getState() 
    {
        return $this->data['state'];
    }

    /**
     *获取学生的number字段
     */
    public function getNumber() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getNumber() : null;
    }

    /**
     *获取学生的password字段
     */
    public function getPassword() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getPassword() : null;
    }


    /**
     *获取学生的name字段
     */
    public function getName() 
    {
        return !is_null($this->getUser()) ? $this->getUser()->getName() : null;
    }

    /**
     *获取学生的sex字段
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

    static public function isLogin()
    {
        return isset($_SESSION[Student::$user]);
    }

    static public function isRegisterByUserId($userId) {
        $Student = Student::get(['user_id'=>$userId]);
        return $Student->getState() !== 0;
    }

    /*
     * 学生登录
     * 登录成功就设置 $_SESSION[Student::$user] 并将id存入
     */
    static public function login($postData)
    {
        $map = array("sno" => $postData['sno']);
        $student = self::get($map);
        if (!is_null($student)) {
            if (!is_null($student['password'])) {
                if ($student->checkPassword($postData['password'])) {
                    $_SESSION[Student::$user] = $student->getData('id');
                    return 1;
                }
            } else {
                return -1;
            }
        }
        return 0;
    }

    /**
     * 存student表和 student_schedule表
     * @author chenshihang 858190647@qq.com
     * @param  string $msg     [报错信息]
     * @return [bool]        成功 true ；失败 false
     */
    static public function saveStudent($userId, $klassId = null, $sno = null, &$msg='') {
        $Student = Student::where('user_id', 'eq', $userId)->find();
        if (is_null($Student)) {
            $Student = new Student;
            $Student->user_id = $userId;
        }
        if (!is_null($klassId)) {
            $Student->klass_id = $klassId;
        }
        if (isset($data['sno'])) {
            $Student->sno = $sno;
        }
        $status = $Student->validate(true)->save();
        $msg .= $Student->getError();
        //存学生排课
        if (!empty($Student->getError())) {
            return false;
        }
        $status = StudentSchedule::saveStudentSchedule($Student->id, $klassId, $msg);
        return $status;
    }

    static public function studentSave($data, &$message)
    {
        if (count($data) !== 6) {
            throw new Exception('数据有误');
        }

        // 实例化User对象
        $User = new User();
        // 存入User
        $User->setAttr('name', $data['name']);
        $User->number = $data['number'];
        $User->sex = $data['sex'];
        $User->password = $data['password'];
        $User->role = User::$ROLE_STUDENT;
        $status = $User->validate(true)->save();
        if (!$status) {
            $message .= $User->getError();
            return $status;
        }

        // 存Student
        // 数据成功存入User表中后，获取该条数据在User表中的id
        $userId = $User->getId();
        // 实例化Student对象
        $Student = new Student();
        // 将user_id , klass_id , sno 存入student表中
        $Student->user_id = $userId;
        $Student->klass_id = $data['klass_id'];
        $Student->sno = $data['sno'];
        $Student->validate(true)->save();
        if (!$status) {
            $message .= $Student->getError();
            return $status;
        }

        //存student_schedule
        $studentId = $Student->getId();
        $scheduleIds = ScheduleKlass::where('klass_id', 'eq', $data['klass_id'])->column('schedule_id');
        foreach ($scheduleIds as $key => $scheduleId) {
            $status = $Student->StudentSchedule()->save(['schedule_id'=>$scheduleId]);
            if (!$status) {
                $message .= $Student->StudentSchedule()->getError();
                return $status;
            }
        }
        return $status;
    }

    public function StudentSchedule()
    {
        return $this->hasMany('StudentSchedule');
    }
    

}