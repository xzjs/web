require.config({
    paths : {'jquery' : '../../js/jquery-1.11.0.min', 'placeholder' : '../../js/jquery.placeholder', 'menu-aim' : '../../js/jquery.menu-aim', 'tracker': '../../js/js_tracker.min',"highcharts":"../../js/highcharts.4.0.3", "bmap":"http://api.map.baidu.com/getscript?v=2.0&ak=Co8KTsqgp5u8kmiquF7emOqd", 'lazyload': '../../js/jquery.lazyload.min', 'socket' : '../../js/socket.io', 'cookie':'../../js/jquery.cookie', 'notice': '../../js/common/notice', 'raty' : './order/jquery.raty', 'datepicker' : './order/My97DatePicker/1_WdatePicker', 'accounting' : './order/accounting', 'price_unit_map' : './order/price_unit_map'}
    , shim: {'placeholder' : ['jquery'], 'tracker' : ['jquery'], 'menu-aim' : ['jquery'], 'jqzoom' : {deps:['jquery'], exports:'jQuery.fn.jqzoom'}, "highcharts":{"exports":"Highcharts", "deps":["jquery"]}, "bmap":{"exports":"BMap"}, 'lazyload':{deps:['jquery'], exports:'jQuery.fn.lazyload'}, 'cookie' : {deps:['jquery'], exports:'jQuery.fn.cookie'}, 'accounting' : {exports : 'accounting'}}
});
require(['jquery', 'ymt', 'placeholder', 'tracker', 'entrust', 'mar', 'cookie'], function ($, Y){
    var dataModule = $('body').delegate('a[href^="#"]', 'click', function(e){e.preventDefault()}).data('module');
    if(dataModule) {require(dataModule.split(' '))}
    $('#page-top').load(Y.baseUrl('home/top?v=' + new Date().getTime()), '', function(){
        $('#btn-set-home', this).click(function(){
            if(document.all){
                document.body.style.behavior='url(#default#homepage)';
                document.body.setHomePage(Y.currentUrl());
            } else if(window.sidebar){
                if(window.netscape){
                    try{
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                    }catch(e){
                        alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
                    }
                }
                var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);prefs.setCharPref('browser.startup.homepage',Y.currentUrl())
            } else {
                alert('您的浏览器不支持自动自动设置首页, 请使用浏览器菜单手动设置!');
            }
        });
        $('#btn-set-fav', this).click(function(){
            var url = document.location.href, title = document.title;
            try {
                window.external.addFavorite(url, title);
            } catch(e) {
                try {
                    window.sidebar.addPanel(title, url, "");
                }
                catch (e) {
                    alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
                }
            }
        });
        //右下角广告位
        $('#qr-top-weixin').hover(function(){$('.weixin-box,.weixin-box-hd', this).show()}, function(){$('.weixin-box,.weixin-box-hd', this).hide()});
        $('#qr-top-wap').hover(function(){$('.qrcode-box,.qrcode-box-hd', this).show()}, function(){$('.qrcode-box,.qrcode-box-hd', this).hide()});
        $(window).scroll();
        var msgBtn = $('#msg-btn')
          , msgDiv = $('#msg-div')
          , msgContDiv = $('#msg-cont-div')
          , msgBox = msgDiv.find('.box')
          , msgClose = msgDiv.find('.close');
        msgBtn.on('click', function() {
            msgDiv.fadeIn(300, function() {
                msgBox.height(100).addClass('loading');
                $.ajax({
                    type: 'POST',
                    url: Y.baseUrl('home/msg'),
                    dataType: 'json',
                }).done(function(res) {
                    msgBox.height('auto').removeClass('loading');
                    msgContDiv.html(res.msg);
                });
            });
        });
        msgClose.on('click', function() {
            msgDiv.fadeOut(300, function() {
                msgBox.height('auto').removeClass('loading');
                msgContDiv.html('');
            });
        });
    });
    // search bar
    (function() {
        var textMarket = '输入商品名搜索价格行情'
        textSupply = '输入商品名搜索供应信息'
            , textPurchase = '输入商品名搜索采购信息'
            , textSouren = '输入商品名搜索生意圈'
            , textHangQing = '输入商品名搜索行情信息'
            , container = $('#top-search').html('<input type="text" class="s-text" value="" /><input type="button" class="s-button" value="搜 索" /><span class="s-serve">服务时间：9:00~18:00</span>')
            , btn = $('.s-button', container)
            , input = $('.s-text', container)
            , curModule = dataModule.split(' ').shift();
        if($.inArray(curModule, ['shuju', 'data', 'msearch', 'price/market', 'price/purchase', 'price/supply', 'price/supply.time', 'chart_miaomu', 'hangqing/msearch_miaomu', 'hangqing/msearch']) >= 0) {
            input.attr('placeholder', textMarket);
            input.prodSuggest({itemClick:function(){Y.redirect('jiage/' + $(this).data('item').id)}});
        } else if(curModule == 'purchase') {
            input.attr('placeholder', textPurchase);
            input.prodSuggest({itemClick:function(){Y.redirect('caigou_' + $(this).data('item').id)}});
        } else if(curModule == 'souren' || curModule == 'souren_subarea') {
            input.attr('placeholder', textSouren);
            input.prodSuggest({itemClick:function(){Y.redirect('souren/search_jump/' + input.val())}});
        } else if(curModule == 'hangqing/home' || curModule == "hangqing/detail"){
            input.attr('placeholder', textHangQing);
            input.prodSuggest({itemClick:function(){
                if(parseInt($(this).data('item').id, 10) > 0){
                    Y.redirect('dianping/p' + $(this).data('item').id);
                }
            }});
        } else if(curModule == 'hangqing/shuju' || curModule == "hangqing/msearch"){
            input.attr('placeholder', textHangQing);
            input.prodSuggest({itemClick:function(){
                if(parseInt($(this).data('item').id, 10) > 0){
                    Y.redirect('jiage/' + $(this).data('item').id);
                }
            }});
        }else{
            input.attr('placeholder', textSupply);
            input.prodSuggest({itemClick:function(){Y.redirect('gy_' + $(this).data('item').id)}});
        }
        function goSearch() {
            var keyword = $.trim(input.val());
            if(keyword.length > 0) {
                if($.inArray(curModule, ['shuju', 'data', 'msearch', 'price/market', 'price/purchase', 'price/supply', 'price/supply.time']) >= 0) {
                    Y.redirect('data/chartn/' + encodeURIComponent(keyword));
                } else if(curModule == 'purchase') {
                    Y.redirect('purchase/search/' + encodeURIComponent(keyword));
                } else if(curModule == 'souren' || curModule == 'souren_subarea') {
                    Y.redirect('souren/search_jump/' + encodeURIComponent(keyword));
                } else if(curModule == 'hangqing/home' || curModule == 'hangqing/detail'){
                    $.ajax({
                        url: 'http://api.ymt.com/product/get_by_name/?is_formal=1&product_name=' + encodeURIComponent(keyword),
                        crossDomain: true,
                        dataType: 'jsonp'
                    }).done(function( data ) {
                        if(data.status == 0){
                            Y.redirect('dianping/p' + data.result.id);
                        }else{
                            alert('您搜索的产品不存在');
                            return false;
                        }
                    });
                } else if(curModule == 'hangqing/shuju' || curModule == 'hangqing/msearch') {
                    $.ajax({
                        url: 'http://api.ymt.com/product/get_by_name/?is_formal=1&product_name=' + encodeURIComponent(keyword),
                        crossDomain: true,
                        dataType: 'jsonp'
                    }).done(function( data ) {
                        if(data.status == 0){
                            Y.redirect('jiage/' + data.result.id);
                        }else{
                            alert('您搜索的产品不存在');
                            return false;
                        }
                    });
                } else {
                    $.ajax({
                        url: 'http://api.ymt.com/product/get_by_name/?is_formal=1&product_name=' + encodeURIComponent(keyword),
                        crossDomain: true,
                        dataType: 'jsonp'
                    }).done(function( data ) {
                        if(data.status == 0){
                            Y.redirect('gy_' + data.result.id);
                        }else{
                            alert('您搜索的产品不存在');
                            return false;
                        }
                    });
                }
            } else {
                input.focus();
            }
        }
        function keyTrack(e) {
            if(e.keyCode == 13) {
                goSearch();
            }
        }
        input.keyup(keyTrack);
        btn.click(goSearch);
    })();

    // global float controller
    (function(){
        var ymtQrcode = $('.ymt-qrcode').data('value')
        , qrcodeSrc = '';
        if(ymtQrcode){
           qrcodeSrc = '<img class="qrcode-global" src="' + ymtQrcode + '" >';
        }
        var float = $('<div id="float-global"><ul><li><a target="_blank" id="btn-global-back-top2" href="http://www.ymt.com/intro/app?ref=sidebar_2wm&c0=00002" class="f2-app">APP下载'+ qrcodeSrc +'</a></li><li class="active"><a href="http://www.ymt.com/purchase/publish" target="_blank" class="f2-find"><em>人工</em>找货</a></li><li class="f2"><a id="btn-add-comment" href="http://www.ymt.com/feedback" target="_blank">意 见  反 馈</a></li><li><a id="btn-global-right-qq" href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA3MDE4OF8xNTI2MDFfNDAwODk4MzAwOF8yXw" class="f2-qq" target="_blank">QQ咨询</a></li><li><a id="btn-global-back-top" href="###" class="f2-back">返回顶部</a></li></ul></div>')
            ,globalFloat = function(){}
            , mir = $('.content');
        if(mir.length > 0) {
            $('a:last', float).click(function(){$("html, body").animate({scrollTop:0},120)});
            if($(window).width() < 1130) {
                float.addClass('line-2').css('left', (mir.offset().left + mir.width() - 376) + 'px');
                if(Y.IE6) {
                    float.css({position: "absolute", top:($(window).height() - float.height())+"px",overflow:"hidden"});
                    globalFloat = function() {
                        float.css('top', ($(window).height() + $(window).scrollTop() - float.height()) + 'px');
                    }
                }
            } else {
                float.addClass('fixed-2').css('left', (mir.offset().left + mir.width() + 10) + 'px');
                if(Y.IE6) {
                    float.css({position: "absolute", top:($(window).height() - float.height())+"px",overflow:"hidden"});
                }
                globalFloat = function() {
                    var scrollHeight = $(document).scrollTop()
                        , mTop = mir.offset().top;
                    if((scrollHeight > mTop) && (scrollHeight < (mTop + mir.height() - float.height()))) {
                        if(Y.IE6) {
                            float.css({position: 'absolute', top: (scrollHeight + 10) + 'px'})
                        } else {
                            float.css({position: 'fixed', top: '10px'});
                        }
                    } else if(scrollHeight < mTop + 10){
                        float.css({position: 'absolute', top: (mTop + (Y.IE6 ? 10 : 0)) + 'px'});
                    } else {
                        float.css({position: 'absolute', top: (mTop + mir.height() - float.height() + 10) + 'px'});
                    }
                }
            }
            $('body').append(float);
            $(window).scroll(globalFloat);
        }

    })();
    $('input, textarea').placeholder();

    (function(){
        var checkTextarea = $("#index-entrust-desc-textarea,.mt18 textarea")
            , maxChar = 300;

        checkTextarea.keyup(function(){
            var obj = $(this)
                , str = obj.val()
                , contentLen = str.length
                , wordCon = obj.siblings('p').html("最多300字，您还可输入300字");
            if(contentLen > maxChar){
                obj.val(str.substr(0, maxChar));
                wordCon.html("最多" + maxChar + "字，您还可输入"+ ( maxChar - obj.val().length ) +"字");
            }else if($.trim($(obj).siblings("p").html()) != ""){
                wordCon.html("最多" + maxChar + "字，您还可输入"+ (maxChar - contentLen)+"字");
            }
        });
    })();
    $('.weblinks_con').marquee({
        distance:38,
        time:3,
        duration:20,
        isEqual:false,
        scrollDelay:50,
        direction:'up'
    });
    var perm_id = $.cookie("__permanent_id");
    var bannerDiv = $('.link-head-box')
    , bannerBox = $('.link-banner', bannerDiv)
    , bannerCtrl  = $('.link-head-dian', bannerDiv)
    , bannerTimer = 0
    , bannerCount = bannerBox.length;
    if(bannerCount > 1) {
        var bannerIndex = 0;
        for(var i = 0; i < bannerCount; i++) {
            var className = i == 0 ? 'class="active"' : '';
            bannerCtrl.append($('<a data-idx="' + i + '" ' + className + ' href="###"></a>')
            .click(function(){
                var idx = $(this).data('idx');
                bannerBox.hide();
                bannerBox.eq(idx).show();
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            }));
        }
        function bannerSlide() {
            bannerBox.hide();
            bannerBox.eq(bannerIndex).show();
            $('a', bannerCtrl).eq(bannerIndex).siblings().removeClass('active');
            $('a', bannerCtrl).eq(bannerIndex).addClass('active');
            bannerIndex++;
            bannerIndex = bannerIndex >= bannerCount ? 0 : bannerIndex;
        }
        bannerTimer = setInterval(bannerSlide, 5000);
        bannerDiv.hover(function(){
            clearInterval(bannerTimer);
        }, function(){
            bannerTimer = setInterval(bannerSlide, 5000);
        });
    }
	
	$('.blink').each(function(){
		var color1 = $(this).data('color1');
		var color2 = $(this).data('color2');

		if(color1 && color2){
			var index = 0, colors = [color1, color2], me = $(this);

			setInterval(function(){
				me.css({color:colors[index++]});
				index = index > 1 ? 0 : index;
			}, 200);
			
		}
	});
    
});
