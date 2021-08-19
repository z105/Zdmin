let baseUrl = 'https://localhost:5001';

(function(){

    function removeHTMLTag(str){
        str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
        str = str.replace(/[ | ]* /g, ' '); //去除行尾空白
        return str;
    }

    function IsNullOrEmpty(str){
        var isOK = false;
        if (str == undefined || str == "" || str == 'null') {
            isOK = true;
        }
        return isOK;
    }

    // jquery 扩展
    $.extend({
        /*
            自动获取页面控件值
        */

        getWebControls: function ($ele) {
            var reVal = "";
            let retObj = new Object();
            $ele.find('input,select,textarea').each(function (r) {
                var name = $(this).attr('name');
                let type = $(this).attr('type');
                var value = $.trim($(this).val());
                retObj[name] = value;
                if(type === "number"){
                    retObj[name] = parseInt(value)
                }
                // if (!IsNullOrEmpty(value)) {
                //     value = value.replace(/[\r\n]/g, "\\r\\n").replace(/\"/g, "\\\"").replace(/\t/g, "\\t");
                // }
                // var type = $(this).attr('type');
                // if(type == "number"){
                //     retObj[ id ] = $.trim(value);
                // }else{

                // }
                // reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",';
    
            });
            return JSON.stringify(retObj);
            //
            // reVal = reVal.substr(0, reVal.length - 1);
            // //reVal = reVal.substr(0, reVal.length - 1).replace(/[\r\n]/g, "");
            // //return '{' + base.removeHTMLTag(reVal) + '}';
            // let jsonstr = '{' + removeHTMLTag(reVal) + '}';
            // return jsonstr;
        },

        // 
        setWebControls: function($ele, data){
            for(n in data){
                $ele.find(`[name='${ n }']`).val(data[n]);
            }
        },

        // 设置对象属性名首字母大写
        setObjFirstUpper: function(obj){
            let newObj = new Object();
            for(n in obj){
                let name = n.substr(0, 1).toUpperCase() + n.substr(1)
                newObj[name] = obj[n];
            }
            return newObj;
        },
        
        trimInput: function($ele){
            $ele.find('input,textarea,select').val('');
        },
        
        IsNullOrEmpty: IsNullOrEmpty,

        corsPost: function(url, data, success){
            $.ajax({
                // 本地调试时，这里不能写ip地址只能用localhost
                url: url,
                xhrFields: {
                  // 需要有这项配置，不然cookie无法发送至服务器
                  withcredentials: true 
                },
                data: data,
                contentType: 'application/json',    // 请求类型
                dataType: "json",   // 服务器的返回类型，用于格式化回调函数参数
                type: "post",
                success: success,
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    layer.msg("请求后台失败：" + textStatus);
                }
            });
        }
    
    });
    

}());



