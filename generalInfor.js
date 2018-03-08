function scrollLine() {
    // $(".line-scroll-wrapper").width($(".line-wrapper").width() + $(".line-btn-delete").width());
    // 设定常规信息区域宽度=屏幕宽度
    // $(".line-normal-wrapper").width($(".line-wrapper").width());

    // 获取所有行，对每一行设置监听
    var lines = $(".line-normal-wrapper");
    var len = lines.length;
    var lastX, lastXForMobile;

    // 用于记录被按下的对象
    var pressedObj;  // 当前左滑的对象
    var lastLeftObj; // 上一个左滑的对象

    // 用于记录按下的点
    var start;

    // 网页在移动端运行时的监听
    for (var i = 0; i < len; ++i) {
        lines[i].addEventListener('touchstart', function(e){
            lastXForMobile = e.changedTouches[0].pageX;
            pressedObj = this; // 记录被按下的对象

            // 记录开始按下时的点
            var touches = event.touches[0];
            start = {
                x: touches.pageX, // 横坐标
                y: touches.pageY  // 纵坐标
            };
        });

        lines[i].addEventListener('touchmove',function(e){
            // 计算划动过程中x和y的变化量
            var touches = event.touches[0];
            delta = {
                x: touches.pageX - start.x,
                y: touches.pageY - start.y
            };

            // 横向位移大于纵向位移，阻止纵向滚动
            if (Math.abs(delta.x) > Math.abs(delta.y)) {
                event.preventDefault();
            }
        });

        lines[i].addEventListener('touchend', function(e){
            if (lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
                $(lastLeftObj).animate({marginLeft:"0"}, 500); // 右滑
                lastLeftObj = null; // 清空上一个左滑的对象
            }
            var diffX = e.changedTouches[0].pageX - lastXForMobile;
            if (diffX < -150) {
                $(pressedObj).animate({marginLeft:"-0.8rem"}, 500); // 左滑
                lastLeftObj && lastLeftObj != pressedObj &&
                $(lastLeftObj).animate({marginLeft:"0"}, 500); // 已经左滑状态的按钮右滑
                lastLeftObj = pressedObj; // 记录上一个左滑的对象
            } else if (diffX > 150) {
                if (pressedObj == lastLeftObj) {
                    $(pressedObj).animate({marginLeft:"0"}, 500); // 右滑
                    lastLeftObj = null; // 清空上一个左滑的对象
                }
            }
        });
    }
}
$(function () {
    scrollLine();
    /*标签切换*/
    $(".line-btn-delete").on("click",function (e) {
        e.stopPropagation();
       $(this).parent().parent().remove();
    });
    $(".tabTitle").on("click",function (e) {
        e.stopPropagation();
        $ind=$(".tabTitle").index($(this));
        $(".tabTitle").removeClass("active");
        $(this).addClass("active");
        $(".mainInfoBox").hide();
        $(".mainInfoBox").eq($ind).show();
        $(".line-normal-wrapper").animate({marginLeft:"0"}, 500);
    });
});