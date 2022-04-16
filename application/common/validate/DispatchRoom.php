<?php
namespace app\common\validate;
use think\Validate;

class DispatchRoom extends Validate
{
    protected $rule = [
        'name'      => 'require|length:1,25',
    ];
}