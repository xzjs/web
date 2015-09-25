require(['jquery', 'ymt', 'predict', 'dialog'], function($, Y, predict){
    var last_item = getCookie("last_item");
    if(last_item != null) {
        var item = $('#' + last_item);
        item.prev().addClass('neibourPrev');
        item.next().addClass('neibourNext');
    }else {
        $("#itemid-0").next().addClass('neibourNext');
    }
    $('.content .sort .price').hover(function () {
        $(this).children('.trigger-list').fadeIn(150);
    }, function () {
        $(this).children('.trigger-list').fadeOut(150);
    });
    $('.rank-div').hover(function () {
        $(this).addClass('hover');
    }, function (e) {
        $(this).removeClass('hover');
    });
    $('.goods .end .num .cut').click(function () {
        var val = $(this).siblings('.text').children('input').val();
        val = parseInt(val) - 1;
        if(val < 1){val = 1;}
        $(this).siblings('.text').children('input').val(val);
        var min = parseFloat($(this).siblings('.text').children('input').data('min'));
        var max = parseFloat($(this).siblings('.text').children('input').data('max'));
        var total = num_val(min, max, val);
        var obj = $(this).parent().siblings('.count');
        obj.children('.count-qty').html(val);
        obj.children().children('.count-price').html(total);
        $('.goods .end .count').hide();
        obj.show();
    });
    $('.goods .end .num .add').click(function () {
        var val = $(this).siblings('.text').children('input').val();
        val = parseInt(val) + 1;
        $(this).siblings('.text').children('input').val(val);
        var min = parseFloat($(this).siblings('.text').children('input').data('min'));
        var max = parseFloat($(this).siblings('.text').children('input').data('max'));
        var total = num_val(min, max, val);
        var obj = $(this).parent().siblings('.count');
        obj.children('.count-qty').html(val);
        obj.children().children('.count-price').html(total);
        $('.goods .end .count').hide();
        obj.show();
    });

    $('.goods .end .num').mouseout(function(){
        $(this).siblings('.count').hide();
    });

    var cookie_info = getCookie("cookie_info");
    if(cookie_info != null) {
        var old_link = cookie_info.split("|");
        for(var i = 0, l = old_link.length; i < 3; i++) {
            var id = $('#' + old_link[i]);
            id.addClass("last");
        }
    }

    $(".content-new").on("click", "a", function(e) {
        e = e ? e : window.event;
        var srcElem = (e.target) ? e.target : e.srcElement;
        try {
            while(srcElem.parentNode && srcElem != srcElem.parentNode) {
                if(srcElem.tagName && srcElem.tagName.toUpperCase() == "A") {
                    var insert = true;
                    var origin_id = srcElem.id;
                    var id = origin_id + "|";
                    var cookie_info = getCookie("cookie_info");
                    if(cookie_info == null) {
                        insert = true;
                    }else {
                        var old_link = cookie_info.split("|");
                        for(var i = 0, l = old_link.length; i < 3; i++) {
                            if(old_link[i].indexOf(origin_id) != -1) {
                                insert = false;
                            }
                            if(old_link[i] == "null") {
                                break;
                            }
                        }
                    }
                    if(insert) {
                        id += getCookie("cookie_info");
                        setCookie("cookie_info", id);
                        break;
                    }
                }
                srcElem = srcElem.parentNode;
            }
        }
        catch(e) {
        } 
        return true;
    });
    function getCookieVal(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if(endstr == -1) {
            endstr = document.cookie.length;
        }
        return unescape(document.cookie.substring(offset, endstr));
    }
    
    function getCookie(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while(i < clen) {
            var j = i + alen;
            if(document.cookie.substring(i, j) == arg) {
                return getCookieVal(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if(i == 0) {
                break;
            }
        }
        return null;
    }
    
    function setCookie(name, value) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 3600000000);
        document.cookie = name + "=" + value + ";expires = " + exp.toGMTString();
    }
    
    var $menu = $(".navlist-ul");
    
    $menu.menuAim({
        activate : activateSubmenu,
        deactivate : deactivateSubmenu
    });

    function activateSubmenu(row) {
        var $row = $(row),
        submenuid = $row.data("submenuid"),
        itemid = $row.data("itemid");
        $submenu = $("#" + submenuid);
        $submenu.addClass('on');
        $submenu.siblings().removeClass('on');
        $row.addClass('on');
        $row.siblings().removeClass('neibourPrev');
        $row.siblings().removeClass('neibourNext');
        $row.removeClass('neibourPrev');
        $row.removeClass('neibourNext');
        $row.prev().addClass('neibourPrev');
        $row.next().addClass('neibourNext');
        $row.siblings().removeClass('on');
        setCookie('last_item', itemid);
    }

    function deactivateSubmenu(row) {
        var $row = $(row);
        submenuid = $row.data("submenuid");
        $submenu = $("#" + submenuid);
        $submenu.removeClass('on');
        $row.removeClass('on');
    }

    $(function() {
        $(".flexslider").flexslider({
            animation: "slide",
            animationLoop: true,
            directionNav: true,
            itemWidth: 140,
            itemMargin: 5,
            minItems: 4,
            maxItems: 4,
            move: 1
        });
    });

    $('.goods li').hover(function () {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    $('.goods .spec-info').hover(function(){
        $(this).find('.td-hover-ceng').stop().fadeIn(150);
    }, function(){
        $(this).find('.td-hover-ceng').stop().fadeOut(150);
    });

    $('.goods table tbody .icon_arrow').click(
        function () {
            var val = $(this).attr('data-val');
            if(val == 0){
                $(this).parent().parent().parent('tbody').addClass('expand');
                $(this).parent().parent().siblings().show();
                $(this).attr('data-val', 1);
            }else{
                $(this).parent().parent().parent('tbody').removeClass('expand');
                $(this).parent().parent().siblings().hide();
                $(this).attr('data-val', 0);
            }
        }
    );
    $(".supply-more").click(function(){
        var hide = $(this).parent().prev().children(".b-list").children(".select-hide");
        var hide_more = hide.css('display');       
        if(hide_more == "none"){
            $(this).removeClass("more");
            $(this).addClass("more-active");
            $(this).text("收起");
            hide.css("display", "block");
        }else{
            $(this).removeClass("more-active");
            $(this).addClass("more");
            $(this).text("更多");
            hide.css("display","none");
        }
    });

    $("#pre_search li").each(function(){
        $(this).click(function(){
            var cid1 = $(this).parent().attr('data-category');
            $("#breed_more").removeClass("more-active");
            $("#breed_more").addClass("more");
            $("#breed_more").text("更多");
            $("#hostlist").removeClass("active");
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $.post(Y.baseUrl("supply/py_breed_list"),{py:$(this).text(),cid:cid1},function(data){
                inert_data(data);
            },
            "json"
            );
        });
    });

    $("#hostlist").click(function(){
        $("#breed_more").removeClass("more-active");
        $("#breed_more").addClass("more");
        $("#breed_more").text("更多");
        $("#pre_search li").removeClass("active");
        var cid = $(this).data('category');
        $(this).addClass('active');
        $.post("supply/hostlist",{cid:cid},function(data){
            inert_data(data);
        },"json");
    });

    var inert_data = function(data) {
        if(data && data['result']){
            var len = data['result'].length;
            var str = "";
            for(var i = 0; i < len; i++){
                if(i < 24){
                    str += "<li><a href="+Y.baseUrl("gy_"+data['result'][i]['product_id'])+">"+data['result'][i]['product_name']+"</a></li>"
                }else{
                    str += "<li class='select-hide' style='display:none'><a href="+Y.baseUrl("gy_"+data['result'][i]['product_id'])+">"+data['result'][i]['product_name']+"</a></li>"
                }
            }
            $("#b_list").html(str);
        }else{
            $("#b_list").html("<li><a>暂无数据</a></li>");
        }
    }

    $('.supply-page-btn').click(function () {
        var uri_string = $(this).attr('data-page-url');
        var page_size  = parseInt($(this).attr('data-page-size'));
        var page_num   = parseInt($('.supply-page').val());
        if(page_num > 40){
            page_num = 40;
        }
        if(isNaN(page_num) || page_num < 1){
            page_num = 1;
        }
        page_num = page_num - 1;
        page_num = page_num * page_size;
        uri_string = uri_string + '/' + page_num;
        window.location.href = Y.baseUrl(uri_string);
    });

    $('.supply-sel').change(function () {
        var url   = $(this).data('url');
        var sflag = $(this).data('sflag');
        var url_str = url+'?sflag='+sflag;
        var par   = $(this).parent();
        $('.supply-sel').each(function (i) {
            var str  = get_param($(this));
            if(str !== false){
                url_str  = url_str+"&prop["+i+"]="+str;
            }

        });
       
        window.location.href = Y.baseUrl(url_str);
    });
    function get_param(obj) {
        var id    = obj.data('id');
        var val   = obj.val();
        if(typeof id != 'undefined'){
            return id+'_'+val;
        }else{
            return false;
        }
    }

    $('.goods .end .num .text .supply-qty').change(function () {
        var min = parseFloat($(this).data('min'));
        var max = parseFloat($(this).data('max'));
        var val = parseInt($(this).val());
        var total = num_val(min, max, val);
        var obj = $(this).parent().parent().siblings('.count');
        obj.children('.count-qty').html(val);
        obj.children().children('.count-price').html(total);
        $('.goods .end .count').hide();
        obj.show();
    });
    function num_val(min, max, val) {
        var min_val = min*val;
        var max_val = max*val;
        if(min > 0 && max>0){
            return min_val.toFixed(2)+' ~ '+max_val.toFixed(2);
        }else if(max > 0){
            return max_val.toFixed(2);
        }else if(min > 0){
            return min_val.toFixed(2);
        }
    }
    var order_info = $('#order_info')
      , order_volume = $('input[name=volume]', order_info)
      , order_name   = $('input[name=name]', order_info)
      , order_loca   = $('input[name=location_id]', order_info);
    order_info.delegate('select:lt(2)', 'change', function(){
        var me = $(this);
        me.nextAll().remove();
        if(me.val()>0){
            order_loca.val(me.val());
            $.ajax({
                type: 'post',
                url: Y.baseUrl('ajax/get_list_from_upid'),
                dataType: 'json',
                data: { pid:me.val() }
            })
            .done(function(res){
                if(res.status>0){
                    var tmp = $('<select class="sel"><option value="0">请选择</option></select>');
                    $.each(res.list, function(i, v) {
                        tmp.append('<option value="'+v.id+'">'+v.name+'</option>');
                    });
                    me.after(tmp);
                }
            });
        }
    });

    order_volume.blur(function(){
        predict.init($('#dlg-supply-subscribe'));
        predict.setSupplyId(supplyId)
    });

    var dialogSubscribe = $('#dlg-supply-subscribe')
        , btnSubcribe = $('input[type=submit]', order_info)
        , mobileSubcribe = $('.phone .text', dialogSubscribe)
        , dialogEntrust = $('#dlg-supply-entrust')
        , successDialog = $('#success_msg')
        , btnEntrust = $('.phone .btn', dialogEntrust)
        , mobileEntrust = $('.phone .text', dialogEntrust)
        , supplyId = 0
        , qty = 0;

    function subSubmitCallback(data) {
        successDialog.children(".title").children(".fl").html("回执作息");
        if (data.status == 0) {
            var order_btn = $("<a>"), continue_btn = $("<a>"), p = $("<p>");
            order_btn.attr("href", Y.baseUrl("center/purchase_order")).addClass("orange-btn").text("查看订单");
            continue_btn.attr("href", "###").addClass("gray-btn").text("继续看货");
            p.append(order_btn).append(continue_btn);
            $(".success_status").html("下单成功，您可以在商务中心->我的订单中找到").append(p);
        }else{
            $(".success_status").html("下单失败，请稍后重试");
        }
        dialogSubscribe.dialog('close');
        successDialog.dialog("show");
    }
    function subSubmit() {
        curMobile = $.trim(mobileSubcribe.val());
        if(!Y.isMobile(curMobile)) {
            alert('请输入正确的手机号码');
            return;
        } 

        if (order_volume.val().match(/[0-9]+/) == null) {
            alert('采购量只能填写数字');
            return;
        }

        if (order_name.val().length < 1) {
            alert('请填写您的姓名');
            return;
        }

        if($('select', order_info).length < 3 || parseInt($('select:eq(2)', order_info).val()) == 0){
            alert('请选择您的地址，精确到县');
            return
        }
        var inputXieYi = $('input[name=xieyi]:checked', order_info);
        if(inputXieYi.length == 0) {
            alert("请认真阅读并同意一亩田的《采购商线上注册协议》");
            inputXieYi.val(0);
            return false;
        } else {
            inputXieYi.val(2);
        }

        var prov_id = 0
          , city_id = 0
          , county_id = 0;

        $('select', order_info).each(function (i) {
            switch (i) {
                case 0:
                    prov_id = $(this).val();
                    break;
                case 1:
                    city_id = $(this).val();
                    break;
                case 2:
                    county_id = $(this).val();
                    break;
                default:
                    break;
            }
        });
        var loca_id = order_loca.val();
        $.ajax({
            type:'POST',
            url:Y.baseUrl('supply/order_add'),
            data:{name:order_name.val(),mobile:curMobile,prov_id:prov_id,city_id:city_id,county_id:county_id,supply_id:supplyId,loca_id:loca_id,volume:order_volume.val(),xieyi:inputXieYi.val()},
            success:subSubmitCallback,
            dataType:'json'
        });

    }

    function subscribe(e) {
        e.preventDefault();
        e.stopPropagation();
        var curObj = $(this);
        $.post(Y.baseUrl('ajax/check_login'), {}, function(msg){
            if(!msg.status){
                alert('请您先登录！！');
                location.href = Y.baseUrl('login'); 
            }else{
                var realname = curObj.data('realname')
                , unit = curObj.data('unit');
                supplyId = curObj.data('id');        
                $('.m-name .fl', dialogSubscribe).html('' + realname);
                $('.order_unit').html(unit);
                dialogSubscribe.dialog('show');        
            } 
        }, 'json');
        
    }

    $('.goods .subscribe').click(subscribe);
    btnSubcribe.click(subSubmit);

    $('.supply-publish_type').click(function () {
        var url = $(this).data('url');
        window.location.href = url;
    });
    $('.supply-view-btn').click(function (e) {
        e.stopPropagation();
    });
    $("#success_msg").delegate(".gray-btn", "click", function(){
        successDialog.dialog('close');
    })
    $('.goods .user-reporter').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        var url = $(this).data('href');
        Y.redirect(url);
    });
});
