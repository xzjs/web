<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/11/4
 * Time: 下午10:20
 */
namespace Home\Controller;

use Think\Controller;

class BuyController extends Controller
{
    public function index(){
        $Category=A('Category');
        $category_list=$Category->_list();
        $this->assign('category_list',$category_list);
        $this->show();
    }
}