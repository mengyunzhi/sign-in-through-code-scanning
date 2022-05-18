<?php
namespace app\common\validate;
use think\Validate;

class Sign extends Validate
{
    protected $rule = [
        'name'      => 'require|length:1,25',
    ];
}