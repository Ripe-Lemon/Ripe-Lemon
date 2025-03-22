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

    getCurrentUserNickname();

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
            hideBlockedUsers()

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

// 隐藏屏蔽的人
async function hideBlockedUsers() {
    let hostElement = document.querySelector('bili-comments');
    if (!hostElement || !hostElement.shadowRoot) return;

    let commentThreads = hostElement.shadowRoot.querySelectorAll('bili-comment-thread-renderer');

    for (let thread of commentThreads) {
        if (!thread.shadowRoot) continue;

        let biliCommentRenderer = thread.shadowRoot.querySelector('bili-comment-renderer');
        if (!biliCommentRenderer || !biliCommentRenderer.shadowRoot) continue;

        let commentsInfo = biliCommentRenderer.shadowRoot.querySelector('bili-comment-user-info');
        if (!commentsInfo || !commentsInfo.shadowRoot) continue;

        let userNameElement = commentsInfo.shadowRoot.querySelector('#user-name');
        if (!userNameElement) continue;

        let userId = userNameElement.getAttribute('data-user-profile-id');
        if (!userId) continue;

        if (await isInBanList(userId)) {
            thread.style.display = "none";
        } else {
            await addLemonButton(biliCommentRenderer, userId) // 添加柠檬按钮
        }
    }
}


async function isInBanList(number) {
    let data = await browser.storage.local.get("banList");
    let currentBanList = data.banList || {}; // 确保 banList 存在
    isIn = number in currentBanList;
    return isIn;
}

async function getCurrentUserNickname() {
    let currentUserNickName = document.querySelector(".nickname-item.light").textContent;
    browser.storage.local.set({
        currentUserNickName: currentUserNickName,
    });
}

async function addLemonButton(biliCommentRenderer, userId) {
    console.log("添加柠檬按钮");
    let biliCommentActionButtonsRenderer = biliCommentRenderer.shadowRoot.querySelector('bili-comment-action-buttons-renderer');
    if (!biliCommentActionButtonsRenderer) return;

    let biliCommentMenu = biliCommentActionButtonsRenderer.shadowRoot.querySelector('bili-comment-menu');
    if (!biliCommentMenu) return;

    let options = biliCommentMenu.shadowRoot.querySelector('#options');
    if (!options) return;
    if (options.classList.contains('lemon-button-added')) return;
    options.classList.add('lemon-button-added');
    let lemonButton = document.createElement('li');
    lemonButton.textContent = "柠檬熟了";
    lemonButton.addEventListener('click', function () {
        console.log("点击了柠檬按钮");
        blockUp(userId);
    });
    options.appendChild(lemonButton);
}

async function blockUp(mid) {
    nickName = await browser.storage.local.get("currentUserNickName");
    console.log(nickName.currentUserNickName);
    browser.storage.local.get("banList").then(data => {
        let newBanList = {};
        newBanList = data.banList || {}; // 处理空值
        let currentUserNickName = nickName.currentUserNickName;
        if (!newBanList[mid]) {
            newBanList[mid] = []; // 如果该 ID 不存在，则创建一个数组
        }
        if (!newBanList[mid].includes(currentUserNickName)) {
            newBanList[mid].push(currentUserNickName); // 避免重复添加同一用户
        }
        browser.storage.local.set({
            banList: newBanList
        });
    });

    hideBlockedUsers();
}