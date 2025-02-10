document.addEventListener('DOMContentLoaded', () => {
    const switch1 = document.querySelector('.switch-item:first-child input');
    browserAPI.tabs.query({active: true, currentWindow: true}, tabs => {
        const url = new URL(tabs[0].url);
        const isHomepage = url.hostname === 'www.bilibili.com' && url.pathname === '/';
        switch1.disabled = !isHomepage;
        switch1.parentElement.style.opacity = isHomepage ? 1 : 0.5;
    });
    
    switch1.addEventListener('change', () => {
        browserAPI.tabs.query({active: true, currentWindow: true}, tabs => {
            browserAPI.tabs.sendMessage(tabs[0].id, {
                action: "filterHomepage",
                enable: switch1.checked
            });
        });
    });
});
