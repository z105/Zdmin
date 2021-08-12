
//菜单
(function($){

    $.accMenu = {
        //收展menu
        accordion:function(){
            $(this).next().animate({
                height:'toggle'
            },200,function(a){
                
            });

            $(this).find(".icon").toggleClass("show");
            //默认为关
            if($(this).data("isOpen")){
                //当前为打开状态
                

                $(this).data("isOpen", false);
            }else{
                $(this).data("isOpen", true);
            }

            
            // if($(this).find("i").hasClass("rotate-0")){
            //     $(this).find("i").addClass("rotate-90").removeClass("rotate-0");
            // }else{
            //     $(this).find("i").addClass("rotate-0").removeClass("rotate-90");
            // }

            // var status = $(this).next().attr("data-status");

        },

        init:function(){
            $(".menu-header").on("click",this.accordion);
        }
    };

    $(function(){
        $.accMenu.init();
    })
        
}(jQuery));


// tab
(function($){
    let intervalTime = 4;
    let movePX = 2;
    var interval;

    $("#tab-left").mousedown(function(){
        
        interval = setInterval(function(){
            let $tabContent = $(".tab-content");
            if($("#tab-left").position().left + 30 > $tabContent.position().left){
                $tabContent.css("left", $tabContent.position().left + movePX);
            }
            
        }, intervalTime);
        
    })

    
    $("#tab-left").mouseup(function(){
        clearInterval(interval);
    })

    $("#tab-right").mousedown(function(){
        
        interval = setInterval(function(){
            let $tabContent = $(".tab-content");
            if($("#tab-right").position().left < $tabContent.position().left + $tabContent.width()){
                $tabContent.css("left", $tabContent.position().left - movePX);

            }
        }, intervalTime);
        
    })

    $("#tab-right").mouseup(function(){
        clearInterval(interval);
    });

    $.pagetab = {

        // 添加 tab
        addTab: function(){
            let $this = $(this);
            var dataUrl = $this.attr('data-href');
            var name = $.trim($(this).text());
            //let isOpen = true;
            let $tab = $('.tab[data-href="' + dataUrl + '"]');

            if($tab.length > 0){
                // 判断是否是当前活动页面
                if($(".tab-active").attr("data-href") == dataUrl){
                    return;
                }

                // active page
                $('.tab[data-href="' + dataUrl + '"]').toggleClass("tab-active")
                    .siblings().removeClass('tab-active');

                $('iframe[data-href="' + dataUrl + '"]').show().siblings().hide();
                
                return;
            }
            
            // 打开新窗口
            $(".tab-active").toggleClass("tab-active");
            let tabHtml = `<a class="tab tab-active" data-href="${ dataUrl }">
                <span>${ name }</span>
                <span class="icon iconfont">&#xeca0;</span>
                </a>`;
            $(".tab-content").append(tabHtml);

            $(".page iframe").hide();
            let iframeHtml = `<iframe src="${ dataUrl }" data-href="${ dataUrl }" frameborder="0"></iframe>`;
            $(".page").append(iframeHtml);
            

        },

        activeTab: function(){
            let $this = $(this);
            let dataUrl = $this.attr("data-href");
            if($this.hasClass("tab-active")){
                return;
            }

            $this.toggleClass("tab-active")
                .siblings().removeClass('tab-active');

            $('iframe[data-href="' + dataUrl + '"]').show().siblings().hide();

        },

        closeTab: function(){
            let $tab = $(this).parent();
            let dataUrl = $tab.attr("data-href");

            if($tab.hasClass("tab-active")){
                let $prev = $tab.prev();
                let $next = $tab.next();
    
                if($next.length > 0){
                    $next.toggleClass("tab-active");
                    $.pagetab.activeIframe($next.attr("data-href"));

                }else{
                    $prev.toggleClass("tab-active");
                    $.pagetab.activeIframe($prev.attr("data-href"));
                }
            }

            $tab.remove();
            $('iframe[data-href="' + dataUrl + '"]').remove();


        },

        activeIframe: function(url){
            $('iframe[data-href="' + url + '"]').show().siblings().hide();
        },

        //
        init: function(){
            // 菜单点击事件
            $(".menus").on("click", "h4", this.addTab);

            // tab激活事件
            $(".tab-content").on("click", ".tab",  this.activeTab);

            // 关闭事件
            $(".tab-content").on("click", ".icon",  this.closeTab);
        }
    }

    $(function(){
        $.pagetab.init();
    });

}(jQuery));

$("#menu_openclose").click(function(){
    $(".frame-left").toggleClass("frame-left-hide");
    $(this).toggleClass("btn-toolbar-close");
});