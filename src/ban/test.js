const basicChannalname = "//space.bilibili.com/";
let banID = "";

function banuser() {
    let videoCards = document.querySelectorAll(".video-card.group");
    videoCards.forEach(card => {
        const channalname = card.querySelector(".channel-name").href;
        let userID = channalname.replace(basicChannalname, "");
        if (userID != "") {
            card.style.display = "none";
        };
    });
    
}

browser.runtime.onMessage.addListener((message) => {
    document.body.style.display = "none";
    if (message.action === "ban") {
        document.body.display = "none";
        banID = message.banId;
        
    } else if (message.action === "reset") {

    }
});

setInterval(banuser, 2000); // 每隔2秒循环一次banuser