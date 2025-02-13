// 隐藏原本页面的内容
(function() {
    // 获取页面上所有的元素
    const allElements = document.body.children;

    // 隐藏所有元素
    for (let element of allElements) {
        element.style.display = "none";
    }
})();

// 获取首页信息流视频卡片
const videoCards = document.querySelectorAll(".enable-no-interest");

// 创建一个容器来装载这些元素
const container = document.createElement("div");
// 设置容器样式
container.style.display = "flex";
container.style.flexWrap = "wrap";
container.style.gap = "20px";
container.style.padding = "20px";
container.style.justifyContent = "center"; // flex容器内的项目水平居中
container.style.width = "calc(100% - 160px)"; // 减去左右边距
container.style.margin = "0 auto"; // 容器本身水平居中
container.style.boxSizing = "border-box";

// 遍历视频卡片
videoCards.forEach(card => {
    const newVideoCards = document.createElement("div");

    // 设置卡片的样式
    newVideoCards.style.width = "18%";
    newVideoCards.style.height = "100%";
    newVideoCards.style.overflow = "hidden";
    newVideoCards.style.borderRadius = "15px";
    newVideoCards.style.padding = "10px";
    newVideoCards.style.cursor = "pointer"; // 添加鼠标样式
    newVideoCards.style.transition = "all 0.5s ease";
    newVideoCards.style.transform = "scale(1)";

    // 获取原先卡片封面
    const coverDiv = card.querySelector(".bili-video-card__cover");
    const coverImg = coverDiv.querySelector("img");

    // 创建一个新的视频封面标签
    const newCoverImg = document.createElement("img");
    newCoverImg.src = coverImg.src;
    newCoverImg.style.width = "100%";
    newCoverImg.style.height = "100%";
    newCoverImg.style.borderRadius = "15px";
    // 将视频封面添加进视频卡片
    newVideoCards.appendChild(newCoverImg);




    // 获取原先卡片标题
    const titleDiv = card.querySelector(".bili-video-card__info--right");
    const titleH3 = titleDiv.querySelector("h3");
    const titleA = titleH3.querySelector("a")
    
    // 创建新的视频标题
    const newTitleH3 = document.createElement("h3");
    newTitleH3.textContent = titleA.textContent
    newTitleH3.style.display = "-webkit-box";
    newTitleH3.style.webkitBoxOrient = "vertical";
    newTitleH3.style.webkitLineClamp = "2"; // 限制为两行
    newTitleH3.style.overflow = "hidden";
    newTitleH3.style.textOverflow = "ellipsis";
    newTitleH3.style.height = "52.4px";
    // 将标题添加进视频卡片
    newVideoCards.appendChild(newTitleH3);





    // 获取视频作者
    const authorSpan = card.querySelector(".bili-video-card__info--author");
    // 创建新的视频作者
    const newAuthorA = document.createElement("a");
    newAuthorA.textContent = authorSpan.textContent;
    // 将作者添加进视频卡片
    newVideoCards.appendChild(newAuthorA);



    // 获取视频播放量和弹幕数量
    const detailDiv = card.querySelector(".bili-video-card__stats--left");
    const detailSpans = detailDiv.querySelectorAll('span.bili-video-card__stats--text');
    // 创建新的视频播放量和弹幕数量
    const newDetailP = document.createElement("p");
    newDetailP.textContent = `${detailSpans[0].textContent}播放 · ${detailSpans[1].textContent}弹幕`;
    // 将播放量和弹幕数量添加进视频卡片
    newVideoCards.appendChild(newDetailP);

    

    // 获取视频链接
    const videoLink = titleA.href;
    // 添加鼠标悬停事件
    newVideoCards.addEventListener("mouseover", () => {
        newVideoCards.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        newVideoCards.style.transform = "scale(1.02)";
    });
    newVideoCards.addEventListener("mouseout", () => {
        newVideoCards.style.backgroundColor = "transparent";
        newVideoCards.style.transform = "scale(1)";
    });
    // 为视频卡片添加链接
    newVideoCards.onclick = function() {
        window.open(videoLink);
    }
    // 为作者链接添加样式和点击事件
    newAuthorA.style.cursor = "pointer";
    newAuthorA.addEventListener("click", (event) => {
        event.stopPropagation(); // 阻止事件冒泡
        const authorLink = card.querySelector(".bili-video-card__info--owner").href;
        window.open(authorLink);
    });

    // 将克隆的div标签添加到容器中
    container.appendChild(newVideoCards);
});

// 将容器添加到页面中
document.body.insertBefore(container, document.body.firstChild);
