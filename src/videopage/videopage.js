console.log("videopage.js 脚本生效");
initializeVideopage();

async function initializeVideopage() {
    console.log("开始初始化页面");
    await removeAd();

    // 监听整个 document.body
    observeDOM(document.body);

    // 遍历已有 shadowRoot 并监听
    document.querySelectorAll('*').forEach(el => {
        if (el.shadowRoot) {
            console.log('发现已有的 shadowRoot:', el);
            observeDOM(el.shadowRoot);
        }
    });

    console.log("初始化页面完成");
}

// 去广告
async function removeAd() {
    console.log("开始去广告");
    // 需要隐藏的广告
    const adSelectors = [
        '.video-card-ad-small',  // 视频右侧小广告
        '.slide-ad-exp',         // 视频右侧大广告
        '.ad-floor-exp',         // 视频底部条形广告
        '.activity-m-v1',         // 视频底部条形活动广告
        '.ad-report.ad-floor-exp.right-bottom-banner'         // 视频右侧底部广告
    ];

    // 遍历所有广告选择器
    adSelectors.forEach(selector => {
        let adCard = document.querySelector(selector);
        if (adCard) {
            adCard.style.display = "none";
        }
    });
    console.log("去广告完成");
}

function observeDOM(targetNode) {
    if (!targetNode) return;

    const config = {
        childList: true,    // 监听子元素增删
        subtree: true,      // 监听所有子元素
        characterData: true // 监听文本内容变化
    };

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            console.log('页面或 shadowRoot 发生变化:', mutation);
            removeAd();

            // 处理新增节点，检查是否包含 shadowRoot
            mutation.addedNodes.forEach(node => {
                if (node.shadowRoot) {
                    console.log('检测到新的 shadowRoot:', node);
                    observeDOM(node.shadowRoot); // 递归监听 shadowRoot
                }
            });
        }
    });

    observer.observe(targetNode, config);
}