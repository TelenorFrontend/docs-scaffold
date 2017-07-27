document.addEventListener("DOMContentLoaded", function(event) {
    Barba.Pjax.start();
    Barba.Prefetch.init();
    Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
        var js = container.querySelector("script");
        if(js != null){
            eval(js.innerHTML);
            if (typeof pageReady === "function") {
                pageReady();
            }
        }
    });
});
