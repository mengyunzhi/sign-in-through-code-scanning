<?php
namespace app\common\validate;
use think\Validate;

class Room extends Validate
{
    protected $rule = [
        'maxnumber'  => 'require',
        'name'      => 'require|unique:room|length:2,25',
    ];
}