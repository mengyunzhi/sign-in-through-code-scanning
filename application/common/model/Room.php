<?php
namespace app\common\model;
use think\Model;

class Room extends Model {

    public function getId() {
        return $this->data['id'];
    }

    public function getName() {
        return $this->data['name'];
    }

    public function getCapacity() {
        return $this->data['capacity'];
    }

    
}