<?php
namespace app\common\validate;
use think\Validate;

class StudentSchedule extends Validate
{
    protected $rule = [
        'name'      => 'require|length:1,25',
    ];
}