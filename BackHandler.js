// Модуль создания карточек профиля с данных от бека

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
    createBox: function(imageSrc, altText, buttonText, userId, transferPersonId,city,zodiac,age,proffesion,aboutInfo) {
        const person = document.createElement('div');
        person.className = 'person';

        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = altText;
        img.className = 'card-photo';

        // Контейнер для верхней информации и стрелки
        const cardUpperInfo = document.createElement('div');
        cardUpperInfo.className = 'card-upper-info';

        const upperName = document.createElement('h2');
        upperName.className = 'name-Up';
        upperName.textContent = buttonText + ' ' +age;

        const arrow = document.createElement('img');
        arrow.src = 'iconExpand.svg';
        arrow.alt = 'IconExpand';
        arrow.className = 'card-expand';
        arrow.onclick = function() {
            toggleArrow(arrow);  // Привязываем стрелку к функции toggleArrow
        };

        cardUpperInfo.appendChild(upperName);
        cardUpperInfo.appendChild(arrow);

        const cardInfo = document.createElement('div');
        cardInfo.className = 'card-info';

        const name = document.createElement('h2');
        name.textContent = buttonText + ' ' + age;

        const location = document.createElement('img');
        location.src = "icon_location.svg";
        location.alt = "icon Picture"
        location.className = "card-photo-location";

        const place = document.createElement('h3');
        place.textContent = city;

        const likeIcon = document.createElement('img')
        likeIcon.src = 'iconLikeNonActive.svg'
        likeIcon.alt = 'heardIcon'
        likeIcon.className = 'icon_like'
        likeIcon.setAttribute('data-user-id', userId)
        likeIcon.setAttribute('transfer-person-id', transferPersonId)
        likeIcon.onclick = function()
        {
            like(likeIcon,userId,transferPersonId);
        }

        cardInfo.appendChild(name);
        cardInfo.appendChild(location);
        cardInfo.appendChild(place);
        cardInfo.appendChild(likeIcon)

        // Создаем выезжающий блок
        const scrollView = document.createElement('div');
        scrollView.className = 'scroll-view';

        const tags = document.createElement('div');
        tags.className = 'tags';
        tags.innerHTML = `
        <p>${city}</p>
        <p>${proffesion}</p>
        <p>${zodiac}</p>
    `;
        
        // Создаём div для блока "О себе"
        const about = document.createElement('div');
        about.className = 'about';

        const aboutTitle = document.createElement('span');
        aboutTitle.textContent = "О себе";

        const aboutText = document.createElement('p');
        aboutText.textContent = aboutInfo;

        about.appendChild(aboutTitle);
        about.appendChild(aboutText);

        scrollView.appendChild(tags);
        scrollView.appendChild(about);

        card.appendChild(cardUpperInfo);
        card.appendChild(img);
        card.appendChild(cardInfo);
        card.appendChild(scrollView);

        person.appendChild(card);

        document.getElementById('container').appendChild(person);
        UI.buttonCounter++;
    },
    buttonCounter: 1
}


// Модуль для обработки событий
const Events = {
    handleButtonClick: function(buttonNumber, userId, transferPersonId) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://add0-87-255-17-234.ngrok-free.app/api/finder/chat", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        var data = JSON.stringify({ userId: userId, transferPersonId: transferPersonId });
        xhr.send(data);
    }
};

// Модуль полученмя данных с бека
const Data = {
    handlePageBuilder: function() {
        var result;
        var urlParams = new URLSearchParams(window.location.search);
        var idperson = urlParams.get('id');
        
console.log("BEFORE REQUEST")
        
        var infoRequest = new XMLHttpRequest();
        infoRequest.open("POST", "https://add0-87-255-17-234.ngrok-free.app/api/finder/info", true);
        infoRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        infoRequest.onreadystatechange = function () {
            if (infoRequest.readyState == 4 && infoRequest.status == 200) {
                result = JSON.parse(infoRequest.responseText);

                for (let person of result.person) {
                    let imageUrl = person.photo === 'AA==' ? './Он.jpg' :
                        person.photo === 'AAA=' ? './Она.jpg' :
                            `data:image/jpeg;base64,${person.photo}`;
                    
                    console.log(person)
                    UI.createBox(imageUrl,
                        'Your Image',
                        `${person.name}`,
                        `${person.userId}`,
                        `${person.transferPersonId}`,
                        `${person.city}`,
                        `${person.zodiac}`,
                        `${person.age}`,
                        `${person.proffesion}`,
                        `${person.aboutInfo}`
                        );
                }
            }
        };
        console.log("After REQUEST")
        var data = JSON.stringify({ PersonName: idperson });
        infoRequest.send(data);
    }
};

// Функция для создания блоков
function CreateBoxsLine(maxCount) {
    if (UI.buttonCounter <= maxCount) {
        console.log(UI.buttonCounter)
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
}

// Обработчик прокрутки
window.addEventListener("scroll", function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        Data.handlePageBuilder();
    }
});

// Вызов функции инициализации при загрузке страницы
window.onload = initializeBack;

