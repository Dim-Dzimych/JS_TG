// Модуль создания карточек профиля с данных от бека

// Вызов функции инициализации при загрузке страницы
// window.onload = initializeBack;

// imageSrc - адрес фото
// altText - текст под фото
// buttonText - текст кнопки
// userId - понятно
// transferPersonId - приствоенный айди номер для передачи после нажатия
// const UI = {
//     createBox: function(imageSrc, altText, buttonText, userId, transferPersonId) {
//         const box = document.createElement('div');
//         box.classList.add('box');
//
//         const img = document.createElement('img');
//         img.src = imageSrc;
//         img.alt = altText;
//
//         const discuse = document.createElement('p');
//         discuse.textContent = 'Your text goes here';
//
//         const button = document.createElement('button');
//         button.textContent = `${buttonText} ${UI.buttonCounter}`;
//         button.id = `${UI.buttonCounter}`;
//
//         button.setAttribute('data-user-id', userId);
//         button.setAttribute('transfer-person-id', transferPersonId);
//
//         button.addEventListener("click", function () {
//             Events.handleButtonClick(button.id, userId, transferPersonId);
//         });
//
//         box.appendChild(img);
//         box.appendChild(discuse);
//         box.appendChild(button);
//
//         document.body.appendChild(box);
//         UI.buttonCounter++;
//     },
//     buttonCounter: 1
// };
const UI = {
    createBox: function(imageSrc, altText, userName, userId, transferPersonId, city, zodiac, age, profession, aboutInfo) {
        const person = document.createElement('div');
        person.className = 'person';

        const card = document.createElement('div');
        card.className = 'card';

        // Фото
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = altText;
        img.className = 'my_photo';
        card.appendChild(img);

        // Блюр-оверлей
        const blurOverlay = document.createElement('div');
        blurOverlay.className = 'image-blur-overlay';
        card.appendChild(blurOverlay);

        // Имя сверху по центру
        const centeredName = document.createElement('div');
        centeredName.className = 'centered-name';
        centeredName.textContent = `${userName}, ${age}`;
        card.appendChild(centeredName);

        // Нижняя информация
        const bottomInfo = document.createElement('div');
        bottomInfo.className = 'bottom-info';

        const textInfo = document.createElement('div');
        textInfo.className = 'text-info';

        const nameAge = document.createElement('div');
        nameAge.className = 'name-age';
        nameAge.textContent = `${userName}, ${age}`;
        textInfo.appendChild(nameAge);

        const location = document.createElement('div');
        location.className = 'location';

        const locationIcon = document.createElement('img');
        locationIcon.src = 'icon_location.svg';
        locationIcon.className = 'location-icon';
        locationIcon.alt = 'Гео';
        location.appendChild(locationIcon);

        const locationText = document.createElement('span');
        locationText.className = 'mosckva';
        locationText.textContent = city;
        location.appendChild(locationText);

        textInfo.appendChild(location);

        // Кнопка-сердечко
        const heartButton = document.createElement('button');
        heartButton.className = 'heart-button';

        const heartImg = document.createElement('img');
        heartImg.src = 'iconLikeNonActive.svg';
        heartImg.alt = 'like';
        heartImg.setAttribute('data-user-id', userId);
        heartImg.setAttribute('transfer-person-id', transferPersonId);
        heartButton.appendChild(heartImg);

        // heartButton.addEventListener('click', () => {
        //     card.classList.toggle('liked');
        //     heartImg.src = card.classList.contains('liked') ? 'iconLikeActive.svg' : 'iconLikeNonActive.svg';
        //     // Можно также вызвать внешнюю like() функцию, если она есть
        //     // like(heartImg, userId, transferPersonId);
        // });
        
        heartButton.addEventListener('click', () => {
            if (card.classList.contains("liked"))
            {
                return;
            }
            const liked = card.classList.toggle('liked');
            heartImg.src = liked ? 'iconLikeActive.svg' : 'iconLikeNonActive.svg';

            // Отправка данных на сервер
            fetch("https://be3f-94-230-229-121.ngrok-free.app/api/finder/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    transferPersonId: transferPersonId,
                    liked: liked
                }),
                keepalive: true 
            }).then(response => {
                if (!response.ok) {
                    console.error("Ошибка при отправке лайка:", response.status);
                }
            }).catch(error => {
                console.error("Сетевая ошибка:", error);
            });
        });

        bottomInfo.appendChild(textInfo);
        bottomInfo.appendChild(heartButton);
        card.appendChild(bottomInfo);

        // Кнопка стрелочки
        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle-button';
        const arrowImg = document.createElement('img');
        arrowImg.src = 'iconExpand.svg';
        arrowImg.alt = 'IconExpand';
        toggleButton.appendChild(arrowImg);
        card.appendChild(toggleButton);

        toggleButton.addEventListener('click', () => {
            card.classList.toggle('active');
            arrowImg.src = card.classList.contains('active') ? 'iconHide.svg' : 'iconExpand.svg';
        });

        // Всплывающее окно
        const slideUp = document.createElement('div');
        slideUp.className = 'slide-up';

        const tags = document.createElement('div');
        tags.className = 'tags';
        tags.innerHTML = `
        <p>${city}</p>
        <p>${profession}</p>
        <p>${zodiac}</p>
    `;
        slideUp.appendChild(tags);

        const aboutTitle = document.createElement('span');
        aboutTitle.id = 'aboutTitle';
        aboutTitle.textContent = 'О себе';
        slideUp.appendChild(aboutTitle);

        const aboutText = document.createElement('p');
        aboutText.textContent = aboutInfo;
        slideUp.appendChild(aboutText);

        card.appendChild(slideUp);
        person.appendChild(card);

        // document.getElementById('container').appendChild(person);
        document.body.appendChild(person);
        UI.buttonCounter++;
    },

    buttonCounter: 1
}


// Модуль для обработки событий
const Events = {
    handleButtonClick: function(buttonNumber, userId, transferPersonId) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://be3f-94-230-229-121.ngrok-free.app/api/finder/chat", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        var data = JSON.stringify({ userId: userId, transferPersonId: transferPersonId });
        xhr.send(data);
    }
};

// Модуль полученмя данных с бека
const Data = {
    handlePageBuilder: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const idperson = urlParams.get('id');

        const infoRequest = new XMLHttpRequest();
        infoRequest.open("POST", "https://be3f-94-230-229-121.ngrok-free.app/api/finder/info", true);
        infoRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        infoRequest.onreadystatechange = function () {
            if (infoRequest.readyState === 4 && infoRequest.status === 200) {
                const result = JSON.parse(infoRequest.responseText);

                for (let person of result.person) {
                    const imageUrl = person.photo === 'AA==' ? './Он.jpg' :
                        person.photo === 'AAA=' ? './Она.jpg' :
                            person.photo === 'IncorrectEnter' ? './IncorrectEnter.jpg' :
                            `data:image/jpeg;base64,${person.photo}`;
                    console.log(person.photo)

                    UI.createBox(
                        imageUrl,                          // imageSrc
                        'Фото пользователя',              // altText
                        person.name,                      // buttonText / name
                        person.userId,                    // userId
                        person.transferPersonId,          // transferPersonId
                        person.city,                      // city
                        person.zodiac,                    // zodiac
                        person.age,                       // age
                        person.proffesion,                // proffesion
                        person.aboutInfo                  // aboutInfo
                    );
                }
            }
        };

        const requestData = JSON.stringify({ PersonName: idperson });
        infoRequest.send(requestData);
    }
};


// Функция для создания блоков
function CreateBoxsLine(maxCount) {
    if (UI.buttonCounter <= maxCount) {
        Data.handlePageBuilder();
    } else {
        const centerText = document.createElement('p');
        centerText.innerHTML = 'Больше Людей не найдено в вашем регионе.<br>Подождите или поменяйте регион';
        centerText.style.textAlign = 'center';
        centerText.style.color = 'red';
        centerText.style.fontWeight = 'bold';
        centerText.style.backgroundColor = 'yellow';
        centerText.style.marginTop = '5vh';
        centerText.style.fontSize = '21px';
        centerText.style.padding = '15px';
        centerText.style.borderRadius = '15px';

        document.body.appendChild(centerText);
        document.body.style.maxHeight = '100vh';
    }
}


// Инициализация
function initializeBack() {
    CreateBoxsLine(20);
    console.log("START IT")
    //handlePageBuilder;
}

// Обработчик прокрутки
window.addEventListener("scroll", function () { // НА ВРЕМЯ ТЕСТА ОСТАНОВИЛ ЧТОБЫ ПРИЛЕТАЛ ТОЛЬКО ОДИН ЗАПРОС
    // if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //     Data.handlePageBuilder();
    // }
});


// window.onload = function () {
//     initializeBack();
//
//     // Убираем заставку через 4 секунды
//     setTimeout(() => {
//         const splash = document.getElementById("splash-screen");
//         splash.style.transition = "opacity 0.5s ease";
//         splash.style.opacity = "0";
//
//         // Удалим элемент после исчезновения
//         setTimeout(() => {
//             splash.remove();
//         }, 100);
//     }, 4000);
// };









