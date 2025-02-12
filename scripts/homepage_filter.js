// 获取首页信息流视频卡片
const videoCards = document.querySelectorAll(".enable-no-interest");

// 清空当前页面内容
document.body.innerHTML = "";

// 创建一个容器来装载这些元素
const container = document.createElement("div");
// 设置容器样式
container.style.display = "flex";
container.style.flexWrap = "wrap";
container.style.gap = "20px";
container.style.padding = "20px";
container.style.justifyContent = "center";
container.style.width = "100%";
container.style.left = "5%";
container.style.right = "5%";

// 遍历视频卡片
videoCards.forEach(card => {
    // 克隆原始div标签
    const cloneCard = card.cloneNode(true);

    // 设置克隆卡片的样式
    cloneCard.style.width = "600px";
    cloneCard.style.height = "100%";
    cloneCard.style.overflow = "hidden";
    cloneCard.style.borderRadius = "5px";

    // 将克隆的div标签添加到容器中
    container.appendChild(cloneCard);
});

// 将容器添加到页面中
document.body.appendChild(container);