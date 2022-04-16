<?php
namespace app\common\validate;
use think\Validate;

class ScheduleKlass extends Validate
{
    protected $rule = [
        'name'      => 'require|length:1,25',
    ];
}