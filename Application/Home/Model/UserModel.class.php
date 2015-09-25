<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/9/19
 * Time: 上午11:34
 */
namespace Home\Model;

use Think\Model;

class UserModel extends Model{
    protected $_validate=array(
        array('email','require','email必须！'),
        array('pwd','require','密码必须！'),
        array('pwd2','require','密码必须！'),
        array('email','','email已被注册',0,'unique',1),
        array('pwd2','pwd','两次输入的密码不一致',0,'confirm'),
    );
    protected $_auto = array (
        array('pwd','md5',3,'function') , // 对password字段在新增和编辑的时候使md5函数处理
        array('type','0'),
    );
}