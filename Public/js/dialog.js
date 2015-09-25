define(['jquery'], function($){
    var zIdx = 9999
    , autoOpen = true,
    elms = [];

    function dialog(opt) {
        var data = $(this).data('dialog');
        if(!data) {
            create($(this));
        }
        if(opt == 'show') {
            show($(this));
        }
        if(opt == 'close') {
            close($(this));
        }
    }
    function create(obj) {
        obj.data('dialog', {opend: false});
        $('.close', obj).click(function(){close(obj)});
        obj.click(function() {top(obj)});
        $(window).scroll(function(){
            var top = $(window).scrollTop()
                , offset = ($(window).height() - obj.height()) / 2;
            obj.css('top', (top + offset) + 'px');
        }).scroll();
        if(autoOpen) {
            show(obj);
        }
        elms.push(obj);
    }
    function top(obj) {
        obj.css('z-index', zIdx++);
    }
    function show(obj) {
        var data = obj.data('dialog');
        $(".words_notice").html("");
        if(! data.opend) {
            obj.css({'z-index': zIdx++});
            obj.show();
            data.opend = true;
            obj.data('dialog', data);
        }
        if(elms.length > 1) {
            top(obj)
        }
    }
    function close(obj) {
        var data = obj.data('dialog');
        if(data.opend) {
            obj.hide();
            data.opend = false;
            obj.data('dialog', data);
        }
    }

    $.fn.dialog = dialog;
    return {
        dialog: dialog
    }
});
