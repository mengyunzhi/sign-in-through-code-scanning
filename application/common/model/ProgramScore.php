<?php
namespace app\common\model;
use think\Model;

class ProgramScore extends Model {

	public function getId() {
		return $this->data['id'];
	}

	public function getStudentId() {
		return $this->data['student_id'];
	}

	public function getCourseId() {
		return $this->data['course_id'];
	}

	public function getProgramId() {
		return $this->data['program'];
	}

	public function getUsual() {
		return $this->data['usual'];
	}

	public function getTerminal() {
		return $this->data['terminal'];
	}

}