<?php
namespace app\common\validate;
use think\Validate;

class Student extends Validate
{
    protected $rule = [
        'name'      => 'require|length:2,25',
        'sex'       => 'require|in:0,1',
        'sno'       => 'require|unique:student',
        'klass_id'  => 'require',
    ];
}