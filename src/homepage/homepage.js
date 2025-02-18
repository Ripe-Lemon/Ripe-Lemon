let isLemonRiped = 1
let originalHead = document.head.innerHTML
let originalHomepage = document.body.innerHTML;
let lemonHomepage = document.body.innerHTML;
let isgettingVideoCards = false

// 初始化页面
function initializeHomepage() {
    document.head.innerHTML += `
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.tailwindcss.com"></script>
    `;
    document.body.innerHTML = `
        <div class="navbar bg-base-300">
            <button class="btn btn-ghost text-xl navbarTitle" id="ripeLemonButton">🍋 BILIBILI</button>
            <button class="btn btn-ghost text-xl navbarTitleOld" id="bilibiliButton">📺 bilibili</button>
        </div>

        <div class="videoCardsContainer">
            
        </div>

        <style>
            .navbar {
                box-shadow: 0 4px 4px 0 rgba(0,0,0,0.5);
            }

            .videoCardsContainer {
                display: flex;
                position: absolute;
                flex-wrap: wrap;
                gap: 10px;
                padding: 20px 3%;
                justify-content: center;
                align-items: center;
                width: 100%;
                padding-top: 40px;
                box-sizing: border-box;
                background-color: rgba(0, 0, 0, 1);
            }

            
            .videoCard {
                width: 18%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                overflow: hidden;
                border-radius: 15px;
                padding: 10px;
                cursor: pointer;
                transition: all 0.5s ease;
                scale: 1;
            }
            .videoCard:hover {
                background-color: rgba(255, 255, 255, 0.35);
                scale: 1.05;
            }
            .videoCover {
                width: 100%;
                height: 0;
                padding-bottom: 56.25%;
                border-radius: 15px;
                position: relative;
                overflow: hidden;
            }

            .videoCoverImg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .detailContainer {
                padding: 5px;
            }

            .videoTitle {
                font-size: 18px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                height: 52.4px;
            }

            .ownerName {
                padding-top: 5px;
                font-size: 15px;
                transition: all 0.3s ease;
            }
            .ownerName:hover {
                color: rgb(49, 197, 255);
            }
            
            .videoDuration {
                right: 8px;
                bottom: 8px;
                position: absolute;
                z-index: 100;
                border-radius: 15px;
                background-color: rgba(0, 0, 0, 0.8);
                padding-left: 5px;
                padding-right: 5px;
            }
            
            .navbarTitle{
                font-size: 20px;
                font-weight: bold;
                color: rgb(255, 244, 87);
            }
            
            .navbarTitleOld{
                font-size: 20px;
                font-weight: bold;
                color: rgb(49, 197, 255);
            }
            
            .cardLemonButton{
                right: 8px;
                bottom: 8px;
                position: absolute;
                z-index: 200;
                border-radius: 15px;
            }
        </style>
    `;

    //return originalHomepage;
}


// 获取视频数据
function getVideoCards() {
    const url = "https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd";
    let cookies = document.cookie;
    const headers = new Headers({
        'Host': 'api.bilibili.com',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Connection' : 'keep-alive',
        'Cookie': cookies,
        'Upgrade-Insecure-Requests' : '1',
        'Sec-Fetch-Dest' : 'document',
        'Sec-Fetch-Mode' : 'navigate',
        'Sec-Fetch-Site' : 'cross-site',
        'Sec-Fetch-User' : '?1',
        'TE' : 'trailers'
    });

    fetch(url, {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('哇袄！！获取B站视频请求失败了捏：' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.data.item);
            let videoData = data.data.item;
            // 处理获取到的数据
            let videoCardsContainer = document.querySelector('.videoCardsContainer');
            videoData.forEach(element => {
                addVideoCard(element, videoCardsContainer);
            });

        })
        .catch(error => {
            console.error('哇袄！！获取B站视频请求失败了捏：', error);
        });
}


// 添加视频卡片
function addVideoCard(videoData, container) {
    if (videoData.business_info && Object.keys(videoData.business_info).length > 0) {
        console.log("videoData.business_info 不为空，退出 addVideoCard 功能。");
        return; // 退出函数
    }
    let videoCard = document.createElement('a');
    videoCard.href = videoData.uri
    videoCard.className = "videoCard"
    videoCard.innerHTML = `
        <div class="videoCover">
            <img class="videoCoverImg" src="${videoData.pic}" alt="${videoData.title}" />
            <p class="videoDuration">${formatTime(videoData.duration)}</p>
        </div>
        <div class="detailContainer">
            <h2 class="videoTitle">${videoData.title}</h2>
            <a href="https://space.bilibili.com/${videoData.owner.mid}" class="ownerName" onclick="stopPropagationClicked(event)">${videoData.owner.name}</a>
            <p class="videoDetail">${videoData.stat.view}播放·${videoData.stat.like}喜欢·${videoData.stat.danmaku}弹幕</p>
            <p class="videoDetail">${timeAgo(videoData.pubdate)}</p>
        </div>
    `;
    container.appendChild(videoCard);
    isgettingVideoCards = false
}

// 阻止冒泡
function stopPropagationClicked(event) {
    // 阻止点击事件冒泡，这样不会触发整个卡片的点击跳转
    event.stopPropagation();
}
  

// 格式化视频时间
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    if (hours > 0) {
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}

// 格式化发布时间
function timeAgo(timestamp) {
    if (typeof timestamp !== 'number') {
        return '无效的时间戳';
    }
  
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now - date;
  
    if (isNaN(diff)) {
        return '无效的日期';
    }
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const currentYear = now.getFullYear();
    const targetYear = date.getFullYear();
  
    if (currentYear !== targetYear) {
        return targetYear + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    } else if (months >= 3) {
        return (date.getMonth() + 1) + '-' + date.getDate();
    } else if (weeks > 0) {
        return weeks + ' 周前';
    } else if (days > 0) {
        return days + ' 天前';
    } else if (hours > 0) {
        return hours + ' 小时前';
    } else if (minutes > 0) {
        return minutes + ' 分钟前';
    } else if (seconds >= 0) {
        return '刚刚';
    } else {
        return '未来时间';
    }
}

function changeToBilibili() {
    document.head.innerHTML = originalHead
    document.body.innerHTML = originalHomepage
    document.head.innerHTML += `
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.tailwindcss.com"></script>
    `;
    document.body.innerHTML = `
        <div class="navbar bg-base-300">
            <button class="btn btn-ghost text-xl navbarTitle" id="ripeLemonButton">🍋 BILIBILI</button>
            <button class="btn btn-ghost text-xl navbarTitleOld" id="bilibiliButton">📺 bilibili</button>
        </div>
        <style>
            .navebar{
                position:absolute;
                left:0;
                up:0;
            }
            .navbarTitle{
                font-size: 20px;
                font-weight: bold;
                color: rgb(255, 244, 87);
            }
            
            .navbarTitleOld{
                font-size: 20px;
                font-weight: bold;
                color: rgb(49, 197, 255);
            }
        </style>
    ` + document.body.innerHTML
    document.getElementById('ripeLemonButton').addEventListener('click', changeToRipeLemon);
    document.getElementById('bilibiliButton').addEventListener('click', changeToBilibili);
}

function changeToRipeLemon() {
    initializeHomepage();
    getVideoCards();
}

initializeHomepage();
getVideoCards();

document.getElementById('ripeLemonButton').addEventListener('click', changeToRipeLemon);
document.getElementById('bilibiliButton').addEventListener('click', changeToBilibili);

// 监听滚动事件
window.addEventListener("scroll", function() {
    // 获取文档总高度
    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    
    // 获取视口高度
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // 获取当前滚动位置
    const scrollPosition = window.scrollY || window.pageYOffset;

    // 设置触发的阈值，距离底部2000px时触发
    const threshold = 2000;

    // 判断是否接近底部
    if (documentHeight - windowHeight - scrollPosition <= threshold) {
        if (!isgettingVideoCards) {
            isgettingVideoCards = true
            getVideoCards();
        }
        
    } 
});

// 处理页面内容不足时无法产生滚动条的情况
function checkIfContentIsInsufficient() {
    const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // 如果文档高度小于或等于视口高度，则没有滚动条
    if (documentHeight <= windowHeight) {
        getVideoCards();
    } 
}