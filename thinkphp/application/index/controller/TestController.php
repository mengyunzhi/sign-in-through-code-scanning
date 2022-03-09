<?php
namespace app\index\controller;     //命名空间，也说明了文件所在的文件夹
use think\Controller;
use think\Request;
use think\Db;   // 引用数据库操作类

class TestController extends Controller
{

    public function index() 
    {
        $a = '1';
        var_dump($a);
        $a = (int) $a;
        var_dump($a);
        die();
        return $this->fetch();
    }


     public function into()
    {
        if (!empty ($_FILES ['file_stu'] ['name'])) {
            $tmp_file = $_FILES ['file_stu'] ['tmp_name'];
            $file_types = explode(".", $_FILES ['file_stu'] ['name']);
            $file_type = $file_types [count($file_types)-1];
           /*Distinguish whether it is an .xls file, or whether it is an excel file*/
            if (strtolower($file_type) != "xlsx") {
                $this->error('Not an Excel file, upload again');
            }
           /*Set upload path*/
           /*The upload path written in some Baidu articles is compiled with incorrect slashes. When it is wrong, replace it with uppercase DS, and then use the connector link to piece together the path. */
            $savePath = ROOT_PATH.'public'. DS.'upload'. DS;

           /*Name the uploaded file by time*/
            $str = date('Ymdhis');
            $file_name = $str. ".". $file_type;
           /*Whether the upload is successful*/
            if (!copy($tmp_file, $savePath. $file_name)) {
                $this->error('Upload failed');
            }
           /*
            *Process the uploaded Excel data to generate programming data. This function will be in the ExcelToArray class in the third step below
            *Note: The read function in the third step class is called here, and Excel is converted into an array and returned to $res, and then the database is written
            */
            require THINK_PATH.'Library/Org1/Util/ExcelToArrary.class.php';//Import excelToArray class
         //Introducing this class tried several methods that Baidu came out to fail. Finally, the require method is used simply and rudely. Where do you want this class to be placed? As long as the path is right.
            $ExcelToArrary=new ExcelToArrary();//Instantiate

            $res=$ExcelToArrary->read($savePath.$file_name,"UTF-8",$file_type);//pass parameters, judge office2007 or office2003

           /*Write the database to the generated array*/
            foreach ($res as $k => $v) {
                if ($k> 1) {
                    $data[$k]['username'] = $v[1];
                    $data[$k]['phone'] = $v[2];
//$data ['password'] = sha1('111111');
                }
            }
           //The insertion operation is best placed outside the loop
            $result = db('sys_ceshi')->insertAll($data);
           //var_dump($result);
        }
    }
}