<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/11/14
 * Time: 下午5:02
 */
namespace Home\Controller;

use Think\Controller;

class UserController extends Controller
{
    public function loginx()
    {
        $User=M('User');
        $condition=array(
            'email'=>I('post.email'),
            'pwd'=>md5(I('post.pwd'))
        );
        $u=$User->where($condition)->find();
        if($u){
            $_SESSION['user']=$u;
            $this->success('登录成功',__APP__);
        }else{
            $this->error('登录失败');
        }
    }

    public function registerx()
    {
        $User = D('User');
        if ($User->create()) {
            $result = $User->add();
            if ($result) {
                $this->success('注册成功', "login");
            } else {
                $this->error('注册失败');
            }
        } else {
            $this->error($User->getError());
        }
    }

    public function logout(){
        session_unset();
        session_destroy();
        $this->success('注销成功',__APP__);
    }
}