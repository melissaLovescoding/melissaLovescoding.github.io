document.getElementById("surpriseButton").addEventListener("click", function() {
    var surpriseDiv = document.getElementById("surprise");
    surpriseDiv.classList.toggle("hidden");

    // 背景颜色变化
    function changeBackgroundColor() {
        var colors = ["#FFB6C1", "#FF1493", "#FF69B4", "#FFC0CB", "#FF6347"];
        document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }
    setInterval(changeBackgroundColor, 2000);

    // 烟花动画
    var canvas = document.getElementById("fireworksCanvas");
    var ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawFirework() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 50, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255, 69, 0, 0.8)';
        ctx.fill();
        setTimeout(drawFirework, 1000);
    }

    drawFirework();
});

// 视频控制函数
function playVideo() {
    document.getElementById("birthdayVideo").play();
	video.muted = false;
	video.volume = 1.0;
	video.play();
}

function pauseVideo() {
    document.getElementById("birthdayVideo").pause();
}

function restartVideo() {
    var video = document.getElementById("birthdayVideo");
    video.currentTime = 0;
    video.play();
}

// 生日愿望提交 
document.getElementById("submitWish").addEventListener("click", function() {
    var wishInput = document.getElementById("wishInput");
    var wishText = wishInput.value.trim();
    if (wishText !== "") {
        addWishToWall(wishText); // 保持这个函数调用
        saveWish(wishText);      // 保存到LocalStorage
        wishInput.value = "";    // 清空输入框
    }
});

// 从 LocalStorage 加载愿望
window.onload = function() {
    loadWishes();
};

// 将愿望添加到墙上
function addWishToWall(wishText) {
    var wishDiv = document.createElement("div");
    wishDiv.className = "wish";
    wishDiv.textContent = wishText;

    // 创建删除按钮
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.style.marginLeft = "10px";
    
    // 为删除按钮添加点击事件
    deleteButton.onclick = function() {
        // 从页面上移除愿望
        document.getElementById("wishes").removeChild(wishDiv);
        // 从LocalStorage中删除愿望
        deleteWish(wishText);
    };

    // 将删除按钮添加到 wishDiv
    wishDiv.appendChild(deleteButton);

    // 将 wishDiv 添加到愿望墙
    document.getElementById("wishes").appendChild(wishDiv);
}

// 保存愿望到 LocalStorage
function saveWish(wishText) {
    var wishes = JSON.parse(localStorage.getItem("wishes")) || [];
    wishes.push(wishText);
    localStorage.setItem("wishes", JSON.stringify(wishes));
}

// 从 LocalStorage 加载愿望
function loadWishes() {
    var wishes = JSON.parse(localStorage.getItem("wishes")) || [];
    wishes.forEach(function(wishText) {
        addWishToWall(wishText);
    });
}

// 删除愿望并从LocalStorage中移除
function deleteWish(wishText) {
    // 从 LocalStorage 中删除愿望
    var wishes = JSON.parse(localStorage.getItem("wishes")) || [];
    var updatedWishes = wishes.filter(function(wish) {
        return wish !== wishText; // 保留所有与 wishText 不匹配的愿望
    });
    localStorage.setItem("wishes", JSON.stringify(updatedWishes));
}
