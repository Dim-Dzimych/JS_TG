
//<script src="https://telegram.org/js/telegram-web-app.js"></script>

//<script src="https://github.com/TelegramMessenger/TGMiniAppsJsSDK.git"></script>


function toggleArrow(arrow) {
    const scroll = arrow.closest('.card').querySelector('.scroll-view'); 
    const photo = arrow.closest('.card').querySelector('.card-photo'); 
    const tags = scroll.querySelector('.tags'); 
    const upperName = arrow.closest('.card').querySelector('.name-Up'); 
    const about = scroll.querySelector('.about'); 
    const aboutText = about.querySelector('p');

    if (arrow.src.includes("iconHide.svg")) {
        arrow.src = "iconExpand.svg";
        scroll.style.height = "0px";

        setTimeout(() => {
            tags.style.visibility = "hidden";
            scroll.style.visibility = "hidden";
            upperName.style.visibility = "hidden";
            photo.classList.remove("blur");
        }, 150); // время для закрытия

    } else {
        // open scroll window in 3 variant (30 letters in one row)
        
        if (aboutText.textContent.length <= 68) 
        {
            scroll.style.height = "200px";
        } 
        else if (aboutText.textContent.length > 68 && 
                aboutText.textContent.length <= 118)
        {
            scroll.style.height = "220px";
        }
        else if (aboutText.textContent.length > 118 &&
                aboutText.textContent.length <= 151)
        {
            scroll.style.height = "230px";
        }
        
        arrow.src = "iconHide.svg";

        setTimeout(() => {
            scroll.style.visibility = "visible";
            tags.style.visibility = "visible";
            upperName.style.visibility = "visible";
        }, 150); // время для открытия

        setTimeout(() => {
            about.style.visibility = "visible";
            photo.classList.add("blur");
        }, 180); // время для отображения текста
    }
}

const people = {};

function like(like,userId,transferPersonId)
{
    if (like.src.includes("iconLikeNonActive.svg"))
    {
        like.src = "iconLikeActive.svg"
    } else 
    {
        like.src = "iconLikeNonActive.svg";
    }
    
    if (!people[userId])
    {
        people[userId] = new Set();
        people[userId].add(transferPersonId);
        CreateIdPerson(userId);
    } else if (people[userId].has(transferPersonId))
    {
        people[userId].delete(transferPersonId);
        if (people[userId].size === 0){
            delete people[userId]
        }
    }else {
        people[userId].add(transferPersonId);
    }
   
   
}

// start view
window.addEventListener('load', function () {
    setTimeout(function () {
        const splashScreen = document.getElementById('startScreen');
        const appContent = document.getElementById('container');

        splashScreen.style.opacity = '0';
        
        setTimeout(function () {
            splashScreen.style.display = 'none';
            appContent.style.display = 'block'; 
        }, 500); 
    }, 450); 
});

//
// import { init } from '@twa-dev/sdk';
//
// // Инициализация Web App
// const app = init();
//
// // Настройка главной кнопки
// app.MainButton
//     .setText('Отправить')
//     .onClick(() => {
//         console.log('Main button clicked!');
//         app.close();
//     })
//     .show();
//
// // Автоматическое разворачивание WebView
// app.expand();
//
// // Событие при закрытии Web App
// app.onEvent('close', () => {
//     console.log('Web App закрыто.');
// });




//
// // after close web interface
// window.addEventListener("visibilitychange",function (){
//      let id = localStorage.getItem('userId');
//      let transfersPersonsIds = people[id];
//    
//    
//     //var xhr = new XMLHttpRequest();
//     //xhr.open("POST", "https://add0-87-255-17-234.ngrok-free.app/api/finder/chat", true);
//     //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//    
//     //var data = JSON.stringify({ userId: id, transferPersonId: transfersPersonsIds });
//     //var data = JSON.stringify("2124");
//    
//    
//     fetch("https://add0-87-255-17-234.ngrok-free.app/api/finder/chat", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId: id, transfersPersonsIds: transfersPersonsIds }),
//         keepalive: true, // Важный параметр
//     });
//    
//     //xhr.send(data);
// })


const tg = window.Telegram.WebApp;

tg.ready();

tg.onEvent('close', () => {
    const id = localStorage.getItem('userId');
    const transfersPersonsIds = people[id];

    if (id && transfersPersonsIds) {
        fetch("https://add0-87-255-17-234.ngrok-free.app/api/finder/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify("123"),
            keepalive: true,
        });
    }

});





function CreateIdPerson(userId)
{
    let currentUserId = localStorage.getItem('userId');

    if (!currentUserId) {
        //currentUserId = `${userId}-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        currentUserId = `${userId}`;
        localStorage.setItem('userId', currentUserId);
    }
    
    console.log("User ID:", currentUserId);
   
}


