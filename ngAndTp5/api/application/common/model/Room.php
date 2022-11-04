<?php
namespace app\common\model;
use think\Model;

class Room extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getName() {
        return isset($this->data['name']) ? $this->data['name'] : null;
    }

    public function getCapacity() {
        return isset($this->data['capacity']) ? $this->data['capacity'] : null;
    }
}
