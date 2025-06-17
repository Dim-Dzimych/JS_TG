
// function toggleArrow(arrow) {
//     const scroll = arrow.closest('.card').querySelector('.scroll-view');
//     const photo = arrow.closest('.card').querySelector('.card-photo');
//     const tags = scroll.querySelector('.tags');
//     const upperName = arrow.closest('.card').querySelector('.name-Up');
//     const about = scroll.querySelector('.about');
//     const aboutText = about.querySelector('p');
//
//     if (arrow.src.includes("iconHide.svg")) {
//         arrow.src = "iconExpand.svg";
//         scroll.style.height = "0px";
//
//         setTimeout(() => {
//             tags.style.visibility = "hidden";
//             scroll.style.visibility = "hidden";
//             upperName.style.visibility = "hidden";
//             photo.classList.remove("blur");
//         }, 150); // время для закрытия
//
//     } else {
//         // open scroll window in 3 variant (30 letters in one row)
//
//         if (aboutText.textContent.length <= 68)
//         {
//             scroll.style.height = "200px";
//         }
//         else if (aboutText.textContent.length > 68 &&
//             aboutText.textContent.length <= 118)
//         {
//             scroll.style.height = "220px";
//         }
//         else if (aboutText.textContent.length > 118 &&
//             aboutText.textContent.length <= 151)
//         {
//             scroll.style.height = "230px";
//         }
//
//         arrow.src = "iconHide.svg";
//
//         setTimeout(() => {
//             scroll.style.visibility = "visible";
//             tags.style.visibility = "visible";
//             upperName.style.visibility = "visible";
//         }, 150); // время для открытия
//
//         setTimeout(() => {
//             about.style.visibility = "visible";
//             photo.classList.add("blur");
//         }, 180); // время для отображения текста
//     }
// }

const people = {};
// нажатия на сердечко
function like(like,userId,transferPersonId)
{
    if (like.classList.contains("liked")) {
    return;
}

    // Меняем иконку на активную
    like.src = "iconLikeActive.svg";

    // Добавляем лайк в people
    if (!people[userId]) {
        people[userId] = new Set();
    }

    people[userId].add(transferPersonId);

    // Вызываем нужную логику (например, для отправки на сервер)
    CreateIdPerson(userId);
}



// after close web interface
window.addEventListener("visibilitychange",function (){
     let id = localStorage.getItem('userId');
     let transfersPersonsIds = people[id];

    fetch("https://e4aa-213-230-82-80.ngrok-free.app/api/finder/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id, transfersPersonsIds: transfersPersonsIds }),
        keepalive: true, // Важный параметр
    });

    //xhr.send(data);
})


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


window.addEventListener('beforeunload', (event) => {
    // Отправка данных
    fetch('https://e4aa-213-230-82-80.ngrok-free.app/api/finder/chat', {
        method: 'POST',
        body: JSON.stringify({ message: 'User is leaving!' }),
        headers: { 'Content-Type': 'application/json' }
    });
    // Настраиваем сообщение для подтверждения закрытия (может быть проигнорировано)
    event.preventDefault();
    event.returnValue = ''; // В некоторых браузерах нужно вернуть пустую строку
});
