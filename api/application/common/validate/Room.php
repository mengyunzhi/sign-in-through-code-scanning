<?php
namespace app\common\validate;
use think\Validate;

class Room extends Validate
{
    protected $rule = [
        'capacity'  => 'require|number',
        'name'      => 'unique:room|require'
    ];
}