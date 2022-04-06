<?php
namespace app\common\validate;
use think\Validate;

class Teacher extends Validate
{
    protected $rule = [
        'user_id'      => 'require|length:1,25',
    ];
}