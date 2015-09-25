define(['jquery'], function($){
    var BASE_URL = window.location.protocol + '//' + window.location.hostname
    , CUR_URL = window.location.href
    , IE = !!window.ActiveXObject
    , IE6 = IE && !window.XMLHttpRequest
    , IE8 = IE && !!document.documentMode && (document.documentMode == 8)
    , IE7 = IE && !IE6 && !IE8
    , WWW_URL = 'http://www.ymt.com/';

    function baseUrl(path) {
        path = path || '';
        if(path.length > 0) {
            return BASE_URL + '/' + path;
        }
        return BASE_URL;
    }
    function currentUrl() {
        return CUR_URL;
    }
    function redirect(path) {
        window.location.href=baseUrl(path);
    }
    function isMobile(str) {
        return /^1[3-8][0-9]{9}$/.test(str);
    }
    function isEmail(str) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);
    }
    function normalizeFloat(val) {
        var res = $.trim(val);
        if(res.length == 0) return '';
        res = parseFloat(
            ('' + res) 
            .replace('。', '.')
            .replace('．', '.')
            .replace('一', '1')
            .replace('二', '2')
            .replace('两', '2')
            .replace('三', '3')
            .replace('四', '4')
            .replace('五', '5')
            .replace('六', '6')
            .replace('七', '7')
            .replace('八', '8')
            .replace('九', '9')
            .replace('０', '0')
            .replace('１', '1')
            .replace('２', '2')
            .replace('３', '3')
            .replace('４', '4')
            .replace('５', '5')
            .replace('６', '6')
            .replace('７', '7')
            .replace('８', '8')
            .replace('９', '9')
            .replace(',', '.')
            .replace('，', '.')
            .replace('、', '.')
            .replace('\\', '.')
            .replace('/', '.')
            .replace('／', '.')
            .replace('块', '.')
            .replace('快', '.')
            .replace('元', '.')
            .replace('圆', '.')
            .replace('园', '.')
            .replace('角', '')
            .replace('毛', '')
            .replace('%', '')
            .match(/[0-9]+\.*[0-9]*/ig)
            );
        return isNaN(res) ? 0 : res;
    }
    function prodSuggest(options) {
        var defaultOptions = {
            itemClick : function (){
                            var value = $(this).data('item').name;
                            $(this).data('input').val(value).change();
                            $(this).parent().empty().hide();
                        }
            , suggestUrl : 'http://cate.suggest.ymt.com/'
        }
        options = $.extend(defaultOptions, options);
        return $(this).each(function() {
            var input = $(this)
            , width = input.innerWidth()
            , height = input.height()
            , x = input.offset().left
            , y = input.outerHeight() + input.offset().top
            , el = $('<div></div>').css({background:'#fff','z-index':99999,position:'absolute',border:input.css('border'), 'border-top': 'none', top:y, left:x}).width(width).appendTo('body').empty().hide().hover(cancleTimer, startTimer)
            , timer = null;
            
            function destroy() {
                el.empty().hide();
            }
            function show() {
                el.show();
            }
            function startTimer() {
                timer = setTimeout(destroy, 500);
            }
            function cancleTimer() {
                clearTimeout(timer);
            }
            input.keyup(function(){
                var addr = input.val($.trim(input.val())).val();
                el.empty().hide();
                if(addr.length > 0) {
                    $.ajax({
                        url: options.suggestUrl,
                        method: "GET",
                        data: {term: addr},
                        dataType: "jsonp",
                        jsonp: "c"
                    }).done(function(data) {
                        $.each(data, function(i, v) {
                            var name = (v.cname ? (v.cname + ' -> ') : '') + v.name
                            , item = $('<div data-pid="' + v.id + '" class="suggest-li"></div>').text(name).css('line-height', height + 'px').height(height).data('input', input).data('item', v).click(options.itemClick).appendTo(el);
                        })
                        show();
                    })
                }
            }).blur(startTimer);
        });
    }

    /*
     *  判断验证码是否正确
     *  status状态码
     *  1  正确
     *  0  错误
     *  -1 尝试次数过多，刷新验证码
     */
    function checkCaptcha(captcha_val) {
        var result = 0;
        if(captcha_val.length == 4) {
            $.ajax({
                url: baseUrl('captcha/check/'),
                type: 'post',
                dataType: 'json',
                data: {'code': captcha_val},
                async: false
            }).done(function(res) {
                    if (res.status == 1) {
                        result = 1;
                    } else if(res.status == -1) {
                        result = -1;
                    }
                });
        } else {
            result = 0;
        }

        return result;
    }

    $.fn.extend({prodSuggest:prodSuggest});
    return {
        baseUrl: baseUrl,
        currentUrl: currentUrl,
        redirect: redirect,
        isMobile: isMobile,
        isEmail: isEmail,
        normalizeFloat: normalizeFloat,
        checkCaptcha: checkCaptcha,
        IE : IE,
        IE6: IE6,
        IE7: IE7,
        IE8: IE8,
        WWW_URL: WWW_URL
    }
    
});
