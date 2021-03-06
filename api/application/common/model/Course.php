<?php
namespace app\common\model;
use think\Model;

class Course extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getName() {
        return isset($this->data['name']) ? $this->data['name'] : null;
    }

    public function getLesson() {
        return isset($this->data['lesson']) ? $this->data['lesson'] : null;
    }

    public function getProgram()
    {
        return isset($this->data['program']) ? $this->data['program'] : $this->data['program'] = Program::where('course_id', 'eq', $this->getId())->select();
    }

}