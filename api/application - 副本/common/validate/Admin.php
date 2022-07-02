<?php
namespace app\common\validate;
use think\Validate;

class Admin extends Validate
{
    protected $rule = [
        'name'      => 'require|length:1,25',
    ];
}