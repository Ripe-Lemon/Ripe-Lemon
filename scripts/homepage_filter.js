// 隐藏原有页面内容
function hideOriginalContent() {
    const allElements = document.body.children;
    for (let element of allElements) {
        element.style.visibility = "hidden";
        element.style.display = "absolute";
        element.style.width = "0";
        element.style.height = "0";
        element.style.padding = "0";
        element.style.margin = "0";
        element.style.transform = "scale(0)";
    }
}

// 创建并设置容器样式
function createContainer() {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.position = "absolute";
    container.style.flexWrap = "wrap";
    container.style.gap = "20px";
    container.style.padding = "20px 3%";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.width = "100%";
    container.style.marginTop = "70px";
    container.style.boxSizing = "border-box";
    container.style.zIndex = "999";
    //container.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
    return container;
}

// 处理单个视频卡片
function processVideoCard(card) {
    const newVideoCards = document.createElement("div");
    setCardStyle(newVideoCards);
    
    // 处理视频封面
    addCoverToCard(card, newVideoCards);
    
    // 处理视频标题
    addTitleToCard(card, newVideoCards);
    
    // 处理作者信息
    addAuthorToCard(card, newVideoCards);
    
    // 处理视频统计信息
    addStatsToCard(card, newVideoCards);
    
    // 添加交互事件
    addCardInteractions(card, newVideoCards);
    
    return newVideoCards;
}

// 设置卡片样式
function setCardStyle(card) {
    card.style.width = "17%";
    card.style.height = "100%";
    card.style.justifyContent = "center";
    card.style.overflow = "hidden";
    card.style.borderRadius = "15px";
    card.style.padding = "10px";
    card.style.cursor = "pointer";
    card.style.transition = "all 0.5s ease";
    card.style.transform = "scale(1)";
}

// 添加封面
function addCoverToCard(originalCard, newCard) {
    const coverImg = originalCard.querySelector(".bili-video-card__cover img");
    const newCoverImg = document.createElement("img");
    newCoverImg.src = coverImg.src;
    newCoverImg.style.width = "100%";
    newCoverImg.style.maxHeight = "56.25%";
    newCoverImg.style.borderRadius = "15px";
    newCard.appendChild(newCoverImg);
}

// 添加标题
function addTitleToCard(originalCard, newCard) {
    const titleA = originalCard.querySelector(".bili-video-card__info--right h3 a");
    const newTitleH3 = document.createElement("h3");
    newTitleH3.textContent = titleA.textContent;
    newTitleH3.style.display = "-webkit-box";
    newTitleH3.style.webkitBoxOrient = "vertical";
    newTitleH3.style.webkitLineClamp = "2";
    newTitleH3.style.overflow = "hidden";
    newTitleH3.style.textOverflow = "ellipsis";
    newTitleH3.style.height = "52.4px";
    newTitleH3.style.paddingLeft = "5px";
    newTitleH3.style.paddingRight = "5px";
    newCard.appendChild(newTitleH3);
}

// 添加作者信息
function addAuthorToCard(originalCard, newCard) {
    const authorSpan = originalCard.querySelector(".bili-video-card__info--author");
    const dateSpan = originalCard.querySelector(".bili-video-card__info--date");
    const newAuthorA = document.createElement("a");
    newAuthorA.textContent = `${authorSpan.textContent} ${dateSpan.textContent}`;
    newAuthorA.style.cursor = "pointer";
    newAuthorA.style.paddingLeft = "5px";
    newCard.appendChild(newAuthorA);
}

// 添加统计信息
function addStatsToCard(originalCard, newCard) {
    const detailSpans = originalCard.querySelectorAll('.bili-video-card__stats--left span.bili-video-card__stats--text');
    const newDetailP = document.createElement("p");
    newDetailP.textContent = `${detailSpans[0].textContent}播放 · ${detailSpans[1].textContent}弹幕`;
    newDetailP.style.paddingLeft = "5px";
    newCard.appendChild(newDetailP);
}

// 添加交互事件
function addCardInteractions(originalCard, newCard) {
    const videoLink = originalCard.querySelector(".bili-video-card__info--right h3 a").href;
    
    newCard.addEventListener("mouseover", () => {
        newCard.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        newCard.style.transform = "scale(1.02)";
    });
    
    newCard.addEventListener("mouseout", () => {
        newCard.style.backgroundColor = "transparent";
        newCard.style.transform = "scale(1)";
    });
    
    newCard.onclick = () => window.open(videoLink);
    
    const authorLink = originalCard.querySelector(".bili-video-card__info--owner").href;
    const authorElement = newCard.querySelector("a");
    authorElement.addEventListener("click", (event) => {
        event.stopPropagation();
        window.open(authorLink);
    });
}

// 添加header
function addHeader() {
    const header = document.querySelector(".bili-header.large-header");
    header.style.zIndex = "9999";
    children = header.children;
    children[1].style.display = "none";
    children[2].style.display = "none";
    return header;

}

// 主函数
function initializeHomepage() {
    hideOriginalContent();
    const container = createContainer();
    const videoCards = document.querySelectorAll(".enable-no-interest");
    videoCards.forEach(card => {
        const newCard = processVideoCard(card);
        container.appendChild(newCard);
    });
    
    document.body.insertBefore(container, document.body.firstChild);
    document.body.appendChild(addHeader());
}

// 执行主函数
initializeHomepage();

// 修改加载更多内容的函数
async function loadMoreContent() {
    // 获取当前container
    const container = document.body.firstElementChild;
    
    // 连续触发两次加载
    for(let i = 0; i < 10; i++) {
        // 等待一段时间让B站的懒加载机制生效
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // 获取新加载的视频卡片
        const allVideoCards = document.querySelectorAll(".enable-no-interest");
        const existingCards = container.children.length;
        
        // 只处理新出现的卡片
        for (let j = existingCards; j < allVideoCards.length; j++) {
            const newCard = processVideoCard(allVideoCards[j]);
            container.appendChild(newCard);
        }
    }
}

// 监听滚动事件
window.addEventListener("scroll", function() {
    // 获取文档总高度
    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    
    // 获取视口高度
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // 获取当前滚动位置
    const scrollPosition = window.scrollY || window.pageYOffset;

    // 设置触发的阈值，距离底部500px时触发
    const threshold = 4000;

    // 判断是否接近底部
    if (documentHeight - windowHeight - scrollPosition <= threshold) {
        loadMoreContent();
    } 
});

// 处理页面内容不足时无法产生滚动条的情况
function checkIfContentIsInsufficient() {
    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // 如果文档高度小于或等于视口高度，则没有滚动条
    if (documentHeight <= windowHeight) {
        loadMoreContent();
    } 
}

// 页面加载时检查是否有足够内容
window.addEventListener("load", checkIfContentIsInsufficient);

// 监听窗口大小变化，可能导致页面内容变化
window.addEventListener("resize", checkIfContentIsInsufficient);

// 初次运行时检查内容是否足够滚动
checkIfContentIsInsufficient();
