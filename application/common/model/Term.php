<?php
namespace app\common\model;
use think\Model;

class Term extends Model {

    public function getId() {
        return (int)$this->data['id'];
    }

    public function getName() {
        return $this->data['name'];
    }

    public function getStartTime() {
        return $this->data['start_time'];
    }

}