define(['jquery'], function($){

    var data = {
        supply_id: 0,
        unitstr: 0,
        predictMin: 0,
        predictMax: 0,
        rangeAmount: '',
        parseUnit: '',
        divObj:''
    };

    function cal(){
        data.unitstr = $('.predict-' + data.supply_id).data('unitstr').toString();
        var qtyArr = $.trim($('input[name=volume]', data.divObj).val()).split(' ') 
            , qty = $.grep(qtyArr, function(n) {return $.trim(n).length > 0;}).join('');

        if(qty.match(/^[0-9]+$/) == null){
            alert('采购量输入有误');
            return false;
        }else{
            $('input[name=volume]', data.divObj).val(qty);
        }

        if(data.unitstr.indexOf('-') > 0){
            data.parseUnit = data.unitstr.split('-');
        }else{
            data.parseUnit = parseInt(data.unitstr, 10); 
        }
        if(typeof data.parseUnit == 'number'){
            data.predictMin = parsePrice(qty, data.parseUnit);
        }else{
            data.predictMin = parsePrice(qty, data.parseUnit[0]);
            data.predictMax = parsePrice(qty, data.parseUnit[1]);
        }       

        if((data.predictMin > 0 && data.predictMax > 0) && (data.predictMax > data.predictMin)){
            data.rangeAmount = data.predictMin + '~' + data.predictMax; 
        }else if(data.predictMin > 0){
            data.rangeAmount = data.predictMin;
        }else if(data.predictMax > 0){
            data.rangeAmount = data.predictMax;
        }
        $('.predict', data.divObj).html(data.rangeAmount + '元');
    }
    
    function setSupplyId(supplyId) {
        data.supply_id = supplyId;
        cal();
    }
    
    function parsePrice(volume, price){
        return parseFloat((volume * (price / 100)).toFixed(2));
    }

    function init(obj){
        data.divObj = obj;
    }

    return {
        init: init,
        setSupplyId: setSupplyId
    };

});
