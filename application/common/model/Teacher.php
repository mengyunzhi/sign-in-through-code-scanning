<?php
namespace app\common\model;
use think\Model;

class Teacher extends Model {

	/**
     *通过id获取教师
     */
    static public function getTeacherById($id) 
    {
        $Teacher = self::get($id);
        return $Teacher;
    }

    /**
     *获取教师的user_id字段
     */
    static public function getUserId($id) 
    {
        $Teacher = self::getTeacherById($id);
        return $Teacher['user_id'];
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