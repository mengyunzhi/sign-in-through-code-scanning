<?php
namespace app\common\model;
use think\Model;
use think\Db;   // 引用数据库操作类
use think\Exception;


class Klass extends Model {

    public function getEntranceDate($format = 'Y-m-d') {
        return isset($this->data['entranceDate']) ? $this->data['entranceDate'] : $this->data['entranceDate'] = date($format, $this->data['entrance_date']);
    }

    public function getId() 
    {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getLength() 
    {
        return isset($this->data['length']) ? $this->data['length'] : null;
    }

    public function getName() 
    {
        return isset($this->data['name']) ? $this->data['name'] : null;
    }

    public function getStudents()
    {
        return isset($this->data['students']) ? $this->data['students'] : $this->data['students'] = Student::where('klass_id', 'eq', $this->data['id'])->select();
    }

    public function getCount()
    {
        return count($this->getStudents());
    }

    static public function klassSave($name, $entranceDate, $length, &$message)
    {
        if (is_null($name)) {
            throw new Exception('无班级名称');
        } elseif (is_null($entranceDate)) {
            throw new Exception('无入学日期');
        } elseif (is_null($length)) {
            throw new Exception('无学制');
        }

        $Klass = new Klass;
        $Klass->setAttr('name', $name);
        $Klass->entrance_date = $entranceDate;
        $Klass->length = $length;
        $status = $Klass->validate()->save();
        
        if (!$status) {
            $message = $Klass->getError();
        }

        return $status;
    }

}