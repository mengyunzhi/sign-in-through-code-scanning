<?php
namespace app\common\validate;
use think\Validate;

class Program extends Validate
{
    protected $rule = [
        'name'      => 'require|length:1,25|unique:program',
    ];
}