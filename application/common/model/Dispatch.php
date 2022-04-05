<?php
namespace app\common\model;
use think\Model;

class Dispatch extends Model {

    public function getId() {
        return (int)$this->data['id'];
    }

    public function getYear() {
        return $this->data['year'];
    }

    public function getMonth() {
        return $this->data['month'];
    }

    public function getDay() {
        return $this->data['day'];
    }

    public function getStartTime() {
        return $this->data['start_time'];
    }

    public function getEndTime() {
        return $this->data['end_time'];
    }

}