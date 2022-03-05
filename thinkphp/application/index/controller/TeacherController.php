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

    public function courseStart() {
        $htmls = $this->fetch();

        return $htmls;
    }
}