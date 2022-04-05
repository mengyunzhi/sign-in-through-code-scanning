<?php
namespace app\common\model;
use think\Model;

class Course extends Model {

	public function getId() {
		return $this->data['id'];
	}

	public function getName() {
		return $this->data['name'];
	}

	public function getLesson() {
		return $this->data['lesson'];
	}

}