initializeVideopage()

const observer = new ResizeObserver(() => {
    console.log("页面高度发生变化");
});

function initializeVideopage() {
    // 去除视频右侧广告
    let adCard = document.querySelector('.video-card-ad-small');
    adCard.style.display = "none";
}