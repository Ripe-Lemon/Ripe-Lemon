// 隐藏原有页面内容
function hideOriginalContent() {
    const allElements = document.body.children;
    for (let element of allElements) {
        element.style.display = "none";
    }
}

// 创建并设置容器样式
function createContainer() {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "20px";
    container.style.padding = "20px";
    container.style.justifyContent = "center";
    container.style.width = "calc(100% - 160px)";
    container.style.margin = "0 auto";
    container.style.boxSizing = "border-box";
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
    card.style.width = "18%";
    card.style.height = "100%";
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
    newCoverImg.style.height = "100%";
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
    newCard.appendChild(newTitleH3);
}

// 添加作者信息
function addAuthorToCard(originalCard, newCard) {
    const authorSpan = originalCard.querySelector(".bili-video-card__info--author");
    const newAuthorA = document.createElement("a");
    newAuthorA.textContent = authorSpan.textContent;
    newAuthorA.style.cursor = "pointer";
    newCard.appendChild(newAuthorA);
}

// 添加统计信息
function addStatsToCard(originalCard, newCard) {
    const detailSpans = originalCard.querySelectorAll('.bili-video-card__stats--left span.bili-video-card__stats--text');
    const newDetailP = document.createElement("p");
    newDetailP.textContent = `${detailSpans[0].textContent}播放 · ${detailSpans[1].textContent}弹幕`;
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
}

// 执行主函数
initializeHomepage();
