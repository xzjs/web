<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/11/8
 * Time: 下午4:05
 */
namespace Home\Model;

use Think\Model\RelationModel;

class TodayModel extends RelationModel
{
    protected $_link = array(
        'Category'=> self::BELONGS_TO,
        'Province'=>self::BELONGS_TO,
        'Type'=>self::BELONGS_TO,
    );
}