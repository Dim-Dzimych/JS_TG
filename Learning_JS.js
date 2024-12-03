
// function addPerson() {
//     // Создаем общий контейнер для карточки
//     const person = document.createElement('div');
//     person.className = 'person';
//
//     const card = document.createElement('div');
//     card.className = 'card';
//
//     const img = document.createElement('img');
//     img.src = 'photo2.jpg';
//     img.alt = 'Person picture';
//     img.className = 'card-photo';
//
//     // Контейнер для верхней информации и стрелки
//     const cardUpperInfo = document.createElement('div');
//     cardUpperInfo.className = 'card-upper-info';
//
//     const upperName = document.createElement('h2');
//     upperName.className = 'name-Up';
//     upperName.textContent = 'Дмитрий, 24';
//
//     const arrow = document.createElement('img');
//     arrow.src = 'iconExpand.svg';
//     arrow.alt = 'IconExpand';
//     arrow.className = 'card-expand';
//     arrow.onclick = function() {
//         toggleArrow(arrow);  // Привязываем стрелку к функции toggleArrow
//     };
//
//     cardUpperInfo.appendChild(upperName);
//     cardUpperInfo.appendChild(arrow);
//
//     const cardInfo = document.createElement('div');
//     cardInfo.className = 'card-info';
//
//     const name = document.createElement('h2');
//     name.textContent ='Дмитрий, 24';
//
//     const location = document.createElement('img');
//     location.src = "icon_location.svg";
//     location.alt = "icon Picture"
//     location.className = "card-photo-location";
//    
//     const place = document.createElement('h3');
//     place.textContent = 'Mинск';
//    
//     const likeIcon = document.createElement('img')
//     likeIcon.src = 'iconLikeNonActive.svg'
//     likeIcon.alt = 'heardIcon'
//     likeIcon.className = 'icon_like'
//     likeIcon.onclick = function() 
//     {
//         like(likeIcon);
//     }
//
//     cardInfo.appendChild(name);
//     cardInfo.appendChild(location);
//     cardInfo.appendChild(place);
//     cardInfo.appendChild(likeIcon)
//
//     // Создаем выезжающий блок
//     const scrollView = document.createElement('div');
//     scrollView.className = 'scroll-view';
//
//     const tags = document.createElement('div');
//     tags.className = 'tags';
//     tags.innerHTML = `
//         <p>Минск</p>
//         <p>Разработчи</p>
//         <p>Скорпион</p>
//     `;
//
//     // const about = document.createElement('div');
//     // about.className = 'about';
//     // about.innerHTML = `
//     //     <span>О себе</span>
//     //     <p>a</p>
//     // `;
//     // Создаём div для блока "О себе"
//     const about = document.createElement('div');
//     about.className = 'about';
//
//     const aboutTitle = document.createElement('span');
//     aboutTitle.textContent = 'О себе';
//
//     const aboutText = document.createElement('p');
//     aboutText.textContent = 'Люблю кофейню и кофе';
//    
//     about.appendChild(aboutTitle);
//     about.appendChild(aboutText);
//
//     scrollView.appendChild(tags);
//     scrollView.appendChild(about);
//
//     card.appendChild(cardUpperInfo);
//     card.appendChild(img);
//     card.appendChild(cardInfo);
//     card.appendChild(scrollView);
//
//     person.appendChild(card);
//
//     document.getElementById('container').appendChild(person);
// }

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

function like(like)
{
    if (like.src.includes("iconLikeNonActive.svg"))
    {
        like.src = "iconLikeActive.svg"
    } else 
    {
        like.src = "iconLikeNonActive.svg";
    }
    
    //send like to array of "Clicked"
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



