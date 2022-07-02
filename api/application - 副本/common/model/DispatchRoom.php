<?php
namespace app\common\model;
use think\Model;

class DispatchRoom extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getDispatchId() {
        return isset($this->data['dispatch_id']) ? (int)$this->data['dispatch_id'] : null;
    }

    public function getRoomId() {
        return isset($this->data['room_id']) ? (int)$this->data['room_id'] : null;
    }

    static public function saveDispatchRoom($dispatchId, $roomId, &$msg='') {
        $dispatchRoom = new DispatchRoom;
        $dispatchRoom->dispatch_id = $dispatchId;
        $dispatchRoom->room_id = $roomId;
        $status = $dispatchRoom->save();
        $msg .= $dispatchRoom->getError();
        return $status ? $dispatchRoom : null;
    }

}