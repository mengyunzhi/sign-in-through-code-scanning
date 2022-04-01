<?php
namespace app\index\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\Admin;
use app\common\model\Student;
use app\common\model\User;
use think\Controller;
use think\Request;
class IndexController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        if (is_null(User::getCurrentLoginUser())) {
            return $this->error('请先进行登录', url('login/index'));
        }
        if (!User::checkAccessByRole(User::$ROLE_TEACHER)) {
            return $this->error('您并不拥有操作当前模块的权限');
        }
    }

    public function add() 
    {
        return $this->success('操作成功', url('index'));
    }

    public function courseAdd() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function courseDetail() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function courseEdit() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function CourseEnd() {
        return $this->success('课程已结束', url('index'));
    }

    public function courseKlassAdd() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function courseKlassSave()
    {
        return $this->success('操作成功', url('courseDetail'));
    }

    public function courseProgramAdd() {
        return $this->fetch();
    }

    public function courseProgramEdit() 
    {
        return $this->fetch();
    }

    public function courseProgramSave()
    {
        return $this->success('操作成功', url('courseDetail'));
    }

    public function courseProgramUpdate()
    {
        return $this->success('操作成功', url('courseDetail'));
    }

    public function courseSave()
    {
        return $this->success('操作成功', url('index'));
    }

    public function courseSort()
    {
        return $this->fetch();
    }

    public function courseStart() 
    {
        $htmls = $this->fetch();
        return $htmls;
    }

    public function courseTimeAdd() {
        return $this->fetch();
    }

    public function courseTimeSave()
    {
        return $this->success('操作成功', url('courseDetail'));
    }

    public function courseUpdate()
    {
        return $this->success('操作成功', url('courseDetail'));
    }

    public function coursing()
    {
        return $this->fetch();
    }

    public function fraction() {
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function fractionSave()
    {
        return $this->success('操作成功', url('student'));
    }

    public function index()
    {
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function insert() 
    {
        return $this->success('操作成功', url('coursedetail'));
    }

    public function klass()
    {
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function klassImport() {
        $htmls = $this->fetch();

        return $htmls;
    }
    

    public function QRCodeOpen() {
        return $this->success('二维码开放成功', url('coursestart'));
    }

    public function QRCodeView() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function rankEdit() {
        return $this->fetch();
    }

    public function save() 
    {
        return $this->success('操作成功', url('student'));
    }

    public function savefraction() 
    {
        return $this->success('操作成功', url('fraction'));
    }

    public function signInSeat() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function signInSeatAdd()
    {
        return $this->fetch();
    }

    public function signInSeatSave()
    {
        return $this->success('操作成功', url('coursing'));
    }

    public function signInStudent() {
        $htmls = $this->fetch();

        return $htmls;
    }
    
    public function signInStudentAdd()
    {
        return $this->fetch();
    }

    public function signInStudentSave()
    {
        return $this->success('操作成功', url('coursing'));
    }

    public function student()
    {
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function studentAdd() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function studentSave()
    {
        return $this->success('操作成功', url('student'));
    }

    public function randomCode()
    {
        return $this->fetch();
    }

    public function rankUpdate() 
    {
        return $this->success('操作成功', url('courseStart'));
    }

    public function update() 
    {
        return $this->success('操作成功', url('coursedetail'));
    }

}