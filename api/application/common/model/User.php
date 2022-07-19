<?php
namespace app\common\model;
use app\common\model\Student;
use think\Model;
use think\Exception;
use think\Db;   // 引用数据库操作类

class User extends Model {

    //管理员
    public static $ROLE_ADMIN = 0;
    //教师
    public static $ROLE_TEACHER = 1;
    //学生
    public static $ROLE_STUDENT = 2;
    //登录用户信息的session索引
    public static $SESSION_KEY_USER = 'user';

    /**
     * 获取id字段
     */
    public function getId() 
    {
        return isset($this->data['id']) ? $this->data['id'] : null;
    }

    /**
     *获取用户的number字段
     */
    public function getNumber() 
    {
        return isset($this->data['number']) ? $this->data['number'] : null;
    }

    /**
     *获取用户的password字段
     */
    public function getPassword() 
    {
        return isset($this->data['password']) ? $this->data['password'] : null;
    }

    /**
     *获取用户的role字段
     */
    public function getRole() 
    {
        return isset($this->data['role']) ? $this->data['role'] : null;
    }

    /**
     *获取用户的name字段
     */
    public function getName() 
    {
        return isset($this->data['name']) ? $this->data['name'] : null;
    }

    /**
     *获取用户的sex字段
     */
    public function getSex() 
    {
        return isset($this->data['sex']) ? $this->sex : null;
    }

    /**
     *获取学生对象
     */
    public function getStudent() 
    {
        return isset($this->data['student']) ? $this->data['student'] : $this->data['student'] = Student::where('user_id', 'eq', $this->getId())->find(); 
    }

    public function getSexAttr($value) 
    {
        $status = [
            '0'=> 0,
            '1'=> 1,
        ];

        $sex = $status[$value];

        if (isset($sex)) {
            return $sex;
        } else {
            return $status[0];
        }
    }

    /**
     *判断是否具有某个角色的权限
     */
    static public function checkAccessByRole($role)
    {
        return self::getCurrentLoginUserRole() === $role;
    }

    /**
     * 判断密码是否正确
     * 进行密码加密(暂未实现)
     * */
    public function checkPassword($password)
    {
        return ($this->getData('password') === $password);
    }

    /**
     * 获取当前登录用户
     * @return 用户存在:User; 用户不存在:null
     */
    static public function getCurrentLoginUser() 
    {   
        return isset($_SESSION[User::$SESSION_KEY_USER]) ? unserialize($_SESSION[User::$SESSION_KEY_USER]) : null;
    }

    /**
     *获取当前登录用户的角色
     */
    static public function getCurrentLoginUserRole() 
    {
        return is_null(self::getCurrentLoginUser()) ? null : (int)self::getCurrentLoginUser()['role'];
    }

    static public function getDefaultPassword($role) {
        $password = '';
        switch ($role) {
            case User::$ROLE_ADMIN :
                $password = '000000';break;
            case User::$ROLE_TEACHER :
                $password = '111111';break;
            case User::$ROLE_STUDENT :
                $password = '222222';break;
        }
        return $password;
    }

    static public function getUrlByUser($User) {
        $role = (int)$User->role;
        if ($role === User::$ROLE_ADMIN) {
            return 'admin/admin_term/index';
        } elseif ($role === User::$ROLE_TEACHER) {
            //移动端
            if (self::is_mobile_request()) {
                return 'index/mobile/index';
            //web端
            } else {
                return 'index/task/index';
            }
        } elseif ($role === User::$ROLE_STUDENT) {
            return 'student/index/index';
        }
    }

    static public function is_mobile_request() {
        $_SERVER['ALL_HTTP'] = isset($_SERVER['ALL_HTTP'])?$_SERVER['ALL_HTTP'] : '';
        $mobile_browser = 0;
        //preg_match('/(foo)(bar)(baz)/', 'foobarbaz', array);
        //在第二个参数中匹配第一个参数项，有第三个array参数存入
        if(preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|iphone|ipad|ipod|android|xoom)/i',strtolower($_SERVER['HTTP_USER_AGENT'])))
            $mobile_browser++;

        if((isset($_SERVER['HTTP_ACCEPT'])) and (strpos(strtolower($_SERVER['HTTP_ACCEPT']),'application/vnd.wap.xhtml+xml') !== false))
            $mobile_browser++;

        if(isset($_SERVER['HTTP_X_WAP_PROFILE'])) 
            $mobile_browser++;

        if(isset($_SERVER['HTTP_PROFILE'])) 
            $mobile_browser++;

        $mobile_ua = strtolower(substr($_SERVER['HTTP_USER_AGENT'],0,4));
        $mobile_agents = array(
        'w3c ','acs-','alav','alca','amoi','audi','avan','benq','bird','blac',
        'blaz','brew','cell','cldc','cmd-','dang','doco','eric','hipt','inno',
        'ipaq','java','jigs','kddi','keji','leno','lg-c','lg-d','lg-g','lge-',
        'maui','maxo','midp','mits','mmef','mobi','mot-','moto','mwbp','nec-',
        'newt','noki','oper','palm','pana','pant','phil','play','port','prox',
        'qwap','sage','sams','sany','sch-','sec-','send','seri','sgh-','shar',
        'sie-','siem','smal','smar','sony','sph-','symb','t-mo','teli','tim-',
        'tosh','tsm-','upg1','upsi','vk-v','voda','wap-','wapa','wapi','wapp',
        'wapr','webc','winw','winw','xda','xda-'
        );

        if(in_array($mobile_ua, $mobile_agents))
            $mobile_browser++;
        //strpos(string $haystack, mixed $needle, int $offset = 0): int
        //返回 needle 在 haystack 中首次出现的数字位置。
        if(strpos(strtolower($_SERVER['ALL_HTTP']), 'operamini') !== false)
            $mobile_browser++;

        // Pre-final check to reset everything if the user is on Windows
        if(strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'windows') !== false)
            $mobile_browser=0;

        // But WP7 is also Windows, with a slightly different characteristic
        if(strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'windows phone') !== false)
            $mobile_browser++;

        if($mobile_browser>0)
            return true;
        else
            return false;
    }

    /**
     * @param $username 用户名; $password密码;
     * @param $msg 报错信息;
     * @return 登录失败 null; 登录成功 User;
     */
    static public function login($username, $password, &$msg='')
    {
        //传入数据存在null
        if (is_null($username) || is_null($password)) {
            throw new Exception('用户名或密码为空');
            return null;
        }

        $User = self::get(['number' => $username]);
        //找不到数据
        if (is_null($User)) {
            // throw new Exception('该用户不存在');
            return null;
        }
        //检查学生是否注册
        if ((int)$User->role === User::$ROLE_STUDENT) {
            $status = Student::isRegisterByUserId($User->id);
            if (!$status) {
                $msg .= '该学号尚未绑定手机号，请注册绑定';
                return null;
            }
        }
        //密码校验
        if (!$User->checkPassword($password)) {
            return null;
        }
        //将查出数据存入session
        $_SESSION[self::$SESSION_KEY_USER] = serialize($User);
        return $User;
    }

    static public function logout()
    {
        session_unset();
    }

    /**
     * 管理端的  教师管理和学生管理 的修改密码
     * @author chenshihang 858190647@qq.com
     * @param  $userId   [User表id]
     * @param  $password [密码]
     * @param  &$msg     [返回报错信息]
     * @return [bool]   成功 true； 失败 false
     */
    static public function passwordChange($userId, $password, &$msg) {
        if (is_null($userId) || empty($userId)) {
            throw new Exception('无user_id');
        } elseif (is_null($password) || empty($password)) {
            throw new Exception('无password');
        }
        $User = self::get($userId);
        if (is_null($User)) {
            throw new Exception('该user_id无对应用户');
        }
        $User->password = $password;
        $status = $User->validate(['password' => 'min:5|max:20'])->save();
        if (!$status) {
            $msg .= $User->getError();
        }

        return $status;
    }

    /**
     * 注册，即修改手机号码和state
     * @param   $sno      用来获取数据
     * @param   $number   存入user的手机号
     * @return  boolean 成功 true；失败 false
     */
    static public function register($sno, $number, $password, $verificationCode, &$msg='')
    {
        //传入数据存在空值
        if (is_null($sno)) {
            throw new Exception("学号为空");
        } elseif (is_null($number)) {
            throw new Exception("手机号为空");
            return false;
        } elseif (is_null($verificationCode)) {
            throw new Exception("验证码为空");
            return false;
        }
        //学生表中查询数据
        $Student = Student::get(['sno' => $sno]);
        //学号不存在
        if (is_null($Student)) {
            // throw new Exception("学号错误");
            $msg .= '学号错误';
            return false;
        }
        if ($Student->state === 1) {
            // throw new Exception("已注册");
            $msg .= '该学号已注册';
            return false;
        }

        //student表中state改成1，user表中存入number和password
        $User = self::get(['id' => $Student->user_id]);
        $status = $User->save(['number' => $number, 'password' => $password]);
        //手机可能已存在
        $msg .= $User->getError();
        if (!$status) return false;

        $status = $Student->save(['state' => 1]);
        $msg .= $Student->getError();
        if (!$status) return false;
        return true;
    }

    /**
     * 存User表
     * @author chenshihang 858190647@qq.com
     * @param  array $data   需要存入的信息 
     * 新增: role password在usersave方法给过data,另外需要number, name, sex ,student需要sno不需要number
     * 更新: role在 usersave方法给过data, 另外需要 password number name sex ,student需要sno
     * @param  string   $msg   报错信息
     * @param  int $userId 如果非空代表修改；空代表新增
     * @return object         成功 object; 失败 null
     */
    static public function saveUser($data, &$msg, &$userId=null) {
        if (!is_null($userId)) {
            $User = self::get($userId);
        } else {
            $User = new User;
        }
        //将学生的手机号存为学号
        //data无number，role为student；对象的number为空
        if (!isset($data['number']) && empty($User->number) && $data['role'] === User::$ROLE_STUDENT) {
            $data['number'] = $data['sno'];
            $User->number = $data['sno'];
        }
        //更新时如果sno和number相等，同时修改number
        if (!is_null($User->getStudent())) {
            if ($User->getStudent()->sno === $User->number) {
                $data['number'] = $data['sno'];
                $User->number = $data['sno'];
            }
        }
        // 防止更新时候出现unique检验不排除自己的问题，单个赋值
        $User->role = $data['role'];
        $User->password = $data['password'];
        if (isset($data['number'])) $User->number = $data['number'];
        if (isset($data['name'])) $User->setAttr('name', $data['name']);
        if (isset($data['sex'])) $User->sex = $data['sex'];

        $status = $User->validate(true)->allowField(true)->save();
        $msg .= $User->getError();
        if ($status) {
            return $User;
        }
        return null;
    }

    static public function updateUserSession() {
        $id = User::getCurrentLoginUser()->id;
        $_SESSION[self::$SESSION_KEY_USER] = serialize(User::get($id));
    }

    /**
     * 存用户
     * @author chenshihang 858190647@qq.com
     * @param  array    $data   保存的数据 
     * 含学生  姓名/性别/学号/班级 
     * 可能有  手机号/密码 
     * 没有    角色/学生状态
     * @param  int      $role   角色
     * @param  string   &$msg   报错信息
     * @param  int      $userId 用户id， 区分新增和更新
     * @return boolean     成功 true；失败 false
     */
    static public function userSave($data, $role, &$msg='', $userId=null) {
        //如果不是修改的时候传入密码则获取默认密码
        if (!isset($data['password'])) {
            $data['password'] = self::getDefaultPassword($role);
        }
        //存User表 (先将角色值存入)
        $data['role'] = $role;
        $User = self::saveUser($data, $msg, $userId);
        if (is_null($User)) {
            // throw new Exception('存User表失败');
            return false;
        }
        //学生=>存student表； ......(之后可能存管理员、教师)
        if ($role === User::$ROLE_STUDENT) {
            $status = Student::saveStudent($User->id, $data['klass_id'], $data['sno'], $msg);
        } elseif ($role === User::$ROLE_TEACHER) {
            // 存教师表
            $status = Teacher::saveTeacher($User->id, $msg);
        } elseif ($role === User::$ROLE_ADMIN) {
            $status = true;
        }

        if (!$status) {
            $User->delete();
            $msg .= $Teacher->getError();
        }
        return $status;
    }

    static public function userDelete($user_id, &$msg='') {
        $user = User::get($user_id);
        $status = false;
        if ((int)$user->role === User::$ROLE_ADMIN) {
            $obj = Admin::where('user_id', 'eq', $user_id)->find();
            return $user;
            $status = $obj->delete();
            $msg .= $obj->getError();
        } else if ((int)$user->role === User::$ROLE_TEACHER) {
            $obj = Teacher::where('user_id', 'eq', $user_id)->find();
            // 删除该教师名下排课
            $scheduleIds = Schedule::where('teacher_id', $obj->id)->column('id');
            foreach ($scheduleIds as $scheduleId) {
                Schedule::deleteById($scheduleId);
            }
            
            $status = $obj->delete();
            $msg .= $obj->getError();
        } else if ((int)$user->role === User::$ROLE_STUDENT) {
            $obj = Student::where('user_id', 'eq', $user_id)->find();
            StudentSchedule::where('student_id', $obj->id)->delete();
            $status = $obj->delete();
            $msg .= $obj->getError();
        }
        $status = $status && $user->delete();
        $msg .=  $user->getError();
        return $status;
    }

}