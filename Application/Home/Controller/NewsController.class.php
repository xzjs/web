<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/11/9
 * Time: 下午5:26
 */
namespace Home\Controller;

use Think\Controller;

class NewsController extends Controller
{
    public function _list(){
        $News=M('News');
        return $News->select();
    }
}