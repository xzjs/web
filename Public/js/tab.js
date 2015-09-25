define(['jquery'], function($){
    function select() {
        var p = $(this).parent().parent()
        , data = p.data('tab');
        data.tab.eq(data.idx).removeClass('active');
        data.con.eq(data.idx).removeClass('active');
        data.idx = $(this).index();
        data.tab.eq(data.idx).addClass('active');
        data.con.eq(data.idx).addClass('active');
        p.data('tab', data);

    }

    function tab(opt) {
        return $(this).each(function(){
            var data = $(this).data('tab');
            if(!data) {
                data = {tab: $(opt.tab, this), con: $(opt.content, this), idx: 0};
                $(this).data('tab', data);
            }
            data.tab.click(select);
        });
    }

    $.fn.tab = tab;
    return {
        tab: tab 
    }
});
