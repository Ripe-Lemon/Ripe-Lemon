// 仅保留信息流卡片
const hidePage = `
    .recommended-swipe, .grid-anchor {
        display: none;
    }
    
    .floor-single-card {
        display: none;
    }
    
    .bb0deu3qp70rj {
        display: none;
    }
`;

// 获取开关元素并执行首页过滤
const homepageFilter = document.getElementById('homepageFilter');
// 监听开关的的change事件
function listenForChage() {
    homepageFilter.addEventListener('change', function() {
        if (homepageFilter.checked) {
            // 勾选时
            browser.tabs
                .query({ active: true, currentWindow: true })
                .then(enableHomepageFilter)
        } else {
            // 取消勾选时
            browser.tabs
                .query({ active: true, currentWindow: true })
                .then(disableHomepageFilter)
        }
    });

    // 启用首页过滤功能
    function enableHomepageFilter(tabs) {
        browser.tabs.insertCSS({ code: hidePage }).then(() => {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "enableHomepageFilter",
            });
        });
    }

    // 禁用首页过滤功能
    function disableHomepageFilter(tabs) {
        browser.tabs.removeCSS({ code: hidePage }).then(() => {
            browser.tabs.sendMessage(tabs[0].id, {
            command: "disableHomepageFilter",
            });
        });
    }
}

// 当弹出窗口加载时注入脚本
browser.tabs
  .executeScript({ file: "/js/homepage_filter.js" })
  .then(listenForChage)