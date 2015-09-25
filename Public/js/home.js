require(['jquery', 'ymt', 'tab', 'menu-aim', 'mar'], function($, Y){
    var banners = $('#banner-index .bg')
    , timer = setTimeout(bannerSlide, 3000)
    , bannerIndex = 0
    , leftHeight = $('.content .da-fl').height()
    , newsBox  = $('.news-slide')
    , storeBox = $('.store-slide')
    , bannerCtrl = $('#banner-index-btn');
    $('#purchase-list-con').marquee({isMarquee:true,time:3,duration:20,isEqual:false,scrollDelay:50,direction:'down'});
    $('.xz_area .roll').marquee({isMarquee:true,time:3,duration:20,isEqual:false,scrollDelay:80,direction:'up'});
    for(var i = 0, l = banners.length; i < l; i++) {
        bannerCtrl.append($('<a data-idx="' + i + '" href="###"></a>').click(function(){bannerGo($(this).data('idx'))}));
    }

    bannerBtn = $('a', bannerCtrl);
    function bannerGo(idx) {
        bannerIndex = idx + 1;
        banners.removeClass('active');
        bannerBtn.removeClass('active');
        $(banners.get(idx)).addClass('active');
        $(bannerBtn.get(idx)).addClass('active');
    }
    function bannerSlide() {
        if(bannerIndex++ >= banners.length) {
            bannerIndex = 1;
        }
        bannerGo(bannerIndex - 1);
        timer = setTimeout(bannerSlide, 3000);
    }
    
    $('#banner-index').delegate('a', 'mouseover', function(){
        timer = clearTimeout(timer);
    });

    $('#banner-index').delegate('a', 'mouseout', function(){
        timer = setTimeout(bannerSlide, 3000);
    });

    var tabImg = $('.r_box');
    for(var i = 1; i <= tabImg.length; i ++){
        tabSlide(i);
    }
    function tabSlide(id) {
        var tabBanners = $('.tab_img_' + id + ' a')
            , tabMenu = $('.tab_' + id)
            , tabTimer = setTimeout(Slide, 3000)
            , Index = 0
            , tabCtrl = $('.tab_' + id + ' li');
        function tabGo(idx) {
            Index = idx + 1;
            tabBanners.hide();
            tabCtrl.removeClass('active');
            $(tabBanners.get(idx)).show();
            $(tabCtrl.get(idx)).addClass('active');
        }
        function Slide() {
            if(Index++ >= tabBanners.length) {
                Index = 1;
            }
            tabGo(Index - 1);
            tabTimer = setTimeout(Slide, 3000);
        }
        tabBanners.on('mouseover', function(){
            tabTimer = clearTimeout(tabTimer);
        });
        tabBanners.on('mouseout', function(){
            tabTimer = setTimeout(Slide, 3000);
        });
        
        tabMenu.delegate('li', 'mouseover', function(){
            var tabIdx = $(this).index()
            , ulKey = $(this).parent().data('key');
            $(this).parent().find('li').removeClass('active');
            $(this).addClass('active');

            $('.tab_img_' + ulKey + ' a').hide();
            $('.tab_img_' + ulKey + ' a:eq(' + $(this).index() + ')').show();
            tabTimer = clearTimeout(tabTimer);
        });
        tabMenu.delegate('li','mouseout', function(){
            tabTimer = setTimeout(Slide, 3000);
        });
        tabGo(Index);
    }

    bannerGo(bannerIndex);
    
    for (var i = 0, l = newsBox.length; i < l; i ++) {
        newsSlide(i);
    }

    function newsSlide(id) {
        var news = $('#news-index-' + id + ' a')
        , newsTimer = setInterval(Slide, 3000)
        , Index = 0
        , newsCtrl = $('#news-index-btn-' + id);
        for(var i = 0, l = news.length; i < l; i++) {
            newsCtrl.append($('<a data-idx="' + i + '" href="###"></a>').click(function(){newsGo($(this).data('idx'))}));
        }
        var newsBtn = $('a', newsCtrl);
        function newsGo(idx) {
            Index = idx + 1;
            news.hide();
            newsBtn.removeClass('active');
            $(news.get(idx)).show();
            $(newsBtn.get(idx)).addClass('active');
        }
        function Slide() {
            if(Index++ >= news.length) {
                Index = 1;
            }
            newsGo(Index - 1);
        }
        newsGo(Index);
    }


    bbsSlide();
    function bbsSlide() {
        var bbsCtrl = $('#bbs-btn')
        , bbsPic = $('.bbs-slide a')
        , Index = 0
        , bbsTimer = setInterval(Slide, 5000);
        for(var i = 0, l = bbsPic.length; i<l; i++) {
            bbsCtrl.append($('<a data-idx="'+ i +'" href="###"></a>').click(function(){imgGo($(this).data('idx'))}));
        }
        var bbsBtn = $('a', bbsCtrl);
        function imgGo(idx) {
            bbsPic.hide();
            bbsBtn.removeClass('active');
            $(bbsPic.get(idx)).show();
            $(bbsBtn.get(idx)).addClass('active');
        }
        function Slide() {
            if(Index++ >= bbsPic.length) {
                Index = 1;
            }
            imgGo(Index-1);
        }

        imgGo(Index);
    }

    for (var i= 0, l = storeBox.length; i<l; i++ ) {
        storeSlide(i);
    }

    function storeSlide(id) {
        var store = $('#store-index-' + id + ' a')
        , storeTimer = setInterval(Slide, 3000)
        , Index = 0
        , storeCtrl = $('#store-btn-' + id);
        for(var i = 0, l = store.length; i<l; i++) {
            storeCtrl.append($('<a data-idx="' + i +'" href="###"></a>').click(function(){imgGo($(this).data('idx'))}));
        }
        var storeBtn = $('a', storeCtrl);
        function imgGo(idx) {
            Index = idx+1;
            store.hide();
            storeBtn.removeClass('active');
            $(store.get(idx)).show();
            $(storeBtn.get(idx)).addClass('active');
        }
        function Slide() {
            if(Index++ >= store.length) {
                Index = 1;
            }
                imgGo(Index-1);
        }
        imgGo(Index);
    }

    $('.menu-ul li').hover(function(){
        $(this).addClass('active');
    }, function(){
        $(this).removeClass('active');
    });
    var float = $('<div class="fixed_3 fixed"><a href="###" class="dis">快速<br>跳转</a><a href="#section-1" class="section-tab tu-1">蔬菜</a><a href="#section-2" class="section-tab tu-2">水果</a><a href="#section-3" class="section-tab tu-3">苗木</a></div>')
        , mir = $('.content')
        , homeFloat = function(){}
        , gotoCategory = function() {
            var anchor = $(this);
            if(anchor.attr('href') == '###'){return;}
            $("html, body").animate({scrollTop:$(anchor.attr('href')).offset().top},120)
        }
        , indexAnchors = $('.section-tab', float).click(gotoCategory)
        , sections = $('.section')
        , changeFloatIndex = function(i) {
            indexAnchors.removeClass('active-1').removeClass('active-2').removeClass('active-3');
            $(indexAnchors.get(i)).addClass('active-' + (i+1));
        }
        , floatIndex = function() {
            var scrollHeight = $(document).scrollTop();
            if(scrollHeight < $(sections.get(0)).offset().top) {
                changeFloatIndex(0);
            } else {
                for(var i = sections.length; i > 0; i--) {
                    if(scrollHeight >= $(sections.get(i - 1)).offset().top) {
                        break;
                    }
                }
                changeFloatIndex(i - 1);
            }
        };
    if($(window).width() < 1130) {
        float.removeClass('fixed_3').addClass('line_3').css('left', mir.offset().left + 'px');
        if(Y.IE6) {
            float.css({position: "absolute", top:($(window).height() - float.height())+"px",overflow:"hidden"});
            homeFloat = function() {
                float.css('top', ($(window).height() + $(window).scrollTop() - float.height()) + 'px');
            }
        }
    } else {
        float.addClass('fixed').css('left', (mir.offset().left - 70) + 'px');
        if(Y.IE6) {
            float.css({position: "absolute", top:($(window).height() - float.height())+"px",overflow:"hidden"});
        }
        homeFloat = function() {
            var scrollHeight = $(document).scrollTop()
                , mTop = mir.offset().top;
            if(scrollHeight > mTop && scrollHeight < (mTop + mir.height() - float.height())) {
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
    $(window).scroll(homeFloat).scroll(floatIndex).scroll();
    $('#tab-section-0').tab({tab: '.top-btn a', content:'.tab-cbox .td-con'});
    $('#tab-section-1').tab({tab: '.top-btn a', content:'.tab-cbox .td-con'});
    $('#tab-section-2').tab({tab: '.top-btn a', content:'.tab-cbox .td-con'});
    $('#tab-section-3').tab({tab: '.top-btn a', content:'.tab-cbox .td-con'});
    $('.tab-hang').tab({tab: '.list-btn-box a', content:'.bg-box .bd'});
    var ids = []
        , btnChange = $('.btn-change').each(function(){ids.push($(this).data('id'))});
    btnChange.click(function () {
        if(ids.length > 1) {
            var id = $(this).data('id')
            , next = ids[Math.floor(Math.random() * ids.length + 1)-1];
            while(id == next) {
                next = ids[Math.floor(Math.random() * ids.length + 1)-1];
            }
            $('.tab-hang').hide(0, function () {
                $('.tab-hang-'+next).show();    
            });
        }
    });
    $('.comment-list').marquee({
        distance:79,
        time:3,
        duration:13,
        isEqual:false,
        scrollDelay:35,
        direction:'down'
    });

    $('.bs_right .bd').marquee({
        isMarquee:true,
        distance:49,
        time:1,
        duration:40,
        isEqual:false,
        scrollDelay:50,
        direction:'down'
    });

    $('.h115 .dt_list').marquee({
        isMarquee:true,
        distance:49,
        time:3,
        duration:40,
        isEqual:false,
        scrollDelay:50,
        direction:'down'
    });

    $('.tab_home_nav').on('mouseover', function () {
        var val = $(this).data('val')
          , obj = $('.tab_home_news_' + val);
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
        obj.siblings('.tab_main').hide();
        obj.show();
    });

    $(".tab_menu2 li").mouseover(function(){
        var mark_id = $(this).attr("data-mark");
        $(this).parent().children().removeClass("active");
        $(this).addClass("active");
        $(this).parents(".bd_middle_position").children(".list_1").css("display","none");
        $(this).parents(".bd_middle_position").children(".mark_"+mark_id).css("display","block");

        var key = $(this).parent().data('floor');
        $('.hide-' + key).addClass('hide');
        $('.real_time_' + key + '_'+mark_id).removeClass('hide');
    });
});
