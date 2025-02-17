document.getElementById('banTest').addEventListener('click', function() {  // 修改为正确的ID
    // 发送消息到页面端脚本
    browser.tabs.sendMessage(tabs[0].id, {
        action: 'ban',
        banId: document.getElementById('getBanUrlTest').value
    });
});
