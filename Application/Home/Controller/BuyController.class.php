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
    /**
     * 首页
     */
    public function index(){
        $this->pre_list();
        $Buy=D('Buy');
        $this->assign('buy_list',$Buy->select());
        $this->show();
    }

    /**
     * 发布供应
     */
    public function add(){
        $this->pre_list();
        $this->show();
    }

    public function addx(){
        $Buy=D('Buy');
        if($Buy->create()){
            $result=$Buy->add();
            if($result){
                $this->success('发布成功','index');
            }else{
                $this->error('发布失败');
            }
        }
    }

    /**
     * 为页面准备标题,列表
     */
    private function pre_list(){
        $this->assign('title','商品采购');
        $this->assign('class2','active');
        $Category=A('Category');
        $this->assign('list',$Category->_list());
        $Province=A('Province');
        $this->assign('province_list',$Province->_list());
        $Type=A('Type');
        $this->assign('type_list',$Type->_list());
    }

    /**
     * 获取对应的数据
     * @param $num 指定的条数
     * @return mixed 获得的数据数组
     */
    public function _list($num){
        $Buy=D('Buy');
        return $Buy->order('time desc')->limit($num)->select();
    }
}