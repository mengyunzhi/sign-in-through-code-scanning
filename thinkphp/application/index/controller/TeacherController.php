<?php
namespace app\index\controller;     //命名空间，也说明了文件所在的文件夹
use think\Controller;
use think\Request;
use think\Db;   // 引用数据库操作类

class TeacherController extends Controller
{
    public function index()
    {
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function klass()
    {
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function student()
    {
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
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

    public function courseUpdate()
    {
        return $this->success('操作成功', url('courseDetail'));
    }

    public function courseStart() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function courseSave()
    {
        return $this->success('操作成功', url('index'));
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

    public function courseTimeSave()
    {
        return $this->success('操作成功', url('courseDetail'));
    }

    public function klassImport() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function courseKlassAdd() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function courseKlassSave()
    {
        return $this->success('操作成功', url('courseDetail'));
    }

    public function courseTimeAdd() {
        return $this->fetch();
    }

    public function courseProgramAdd() {
        return $this->fetch();
    }

    public function studentAdd() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function studentSave()
    {
        return $this->success('操作成功', url('student'));
    }

    public function QRCodeOpen() {
        return $this->success('二维码开放成功', url('coursestart'));
    }

    public function QRCodeView() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function signInStudent() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function signInSeat() {
        $htmls = $this->fetch();

        return $htmls;
    }

    public function CourseEnd() {
        return $this->success('课程已结束', url('index'));
    }

    public function rankEdit() {
        return $this->fetch();
    }

    public function rankUpdate() 
    {
        return $this->success('操作成功', url('courseStart'));
    }

}