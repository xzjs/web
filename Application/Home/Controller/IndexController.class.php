<?php
namespace Home\Controller;

use Think\Controller;

class IndexController extends Controller
{
    /**
     * 首页
     */
    public function index()
    {
        $this->pre_list();
        $Buy=A('Buy');
        $this->assign('buy_list',$Buy->_list(8));
        $Support=A('Support');
        $this->assign('support_list',$Support->_list(8));
        $Today=A('Today');
        $this->assign('today_list',$Today->_list(8));
        $Company=A('Company');
        $this->assign('company_list',$Company->_list(8));
        $this->show();
    }

    /**
     * 为页面准备标题,列表
     */
    private function pre_list(){
        $this->assign('title','首页');
        $this->assign('class1','active');
    }
}