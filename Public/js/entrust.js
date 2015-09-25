define(['jquery', 'ymt', 'dialog'], function($, Y){

    var desc = ''
    , mobile = ''
    , stepOneDialog = $('#dlg-entrust-desc')
    , stepTwoDialog = $('#dlg-entrust-mobile')
    , successDialog = $('#success_msg')
    , btnOpen = $('.btn-entrust-open')
    , btnSetDesc = $('.btn-entrust-set-desc')
    , inputPhone = $('.input-entrust-phone');

    function open() {
        $('textarea', stepOneDialog).val(desc);
        stepOneDialog.dialog('show');
    }
    function saveCallback(data) {
        if(data['result']){
            $("#cb_mobile").val(data['mobile']);
            stepTwoDialog.dialog('close');
            $('.success_status').html("委托成功，收到后我们会立即回电，剩下的就交给我们吧！");
            successDialog.dialog('show');
        }else{
            $('.success_status').html("提交失败，请核对信息");
        }
    }

    function setDesc() {
        var con = $('#' + $(this).data('val'));
        if(con.length > 0) {
            var content = $.trim(con.val());
            if(content.length > 0) {
                desc = content;
                if(stepOneDialog.data('dialog')) {
                    var dialog = stepOneDialog.data('dialog');
                    if(dialog.opend) {
                        stepOneDialog.dialog('close');
                    }
                }
                stepTwoDialog.dialog('show');
            } else {
                alert(con.attr('placeholder'));
            }
        }
    }
    $('body').delegate('a.btn-entrust-open', 'click', open);
    btnSetDesc.click(setDesc);
    return {
    };
});
