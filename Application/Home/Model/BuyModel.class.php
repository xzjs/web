<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/11/14
 * Time: 下午3:00
 */
namespace Home\Model;

use Think\Model;

class BuyModel extends Model
{
    protected $_auto = array (
        array('time','time',3,'function'), // 对update_time字段在更新的时候写入当前时间戳
    );
}