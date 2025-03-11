initializeVideopage()

//const observer = new ResizeObserver(() => {
//    console.log("页面高度发生变化");
//});

function initializeVideopage() {
    removeSideAd();
}

// 去除视频右侧广告
function removeSideAd() {
    // 去除视频右侧小广告
    let adCard = document.querySelector('.video-card-ad-small');
    adCard.style.display = "none";

    // 去除视频右侧大广告
    adCard = document.querySelector('.slide-ad-exp');
    adCard.style.display = "none";
}