const requestURL = 'qqq';
let Quantity = 0;
let listPlace = 1;
//Счетчик объектов для перемещения description
var parent = document.getElementsByClassName("list")[0];
parent.onmouseover = function (e) {
    var e = e || event;
    var target = e.target || e.srcElement;
    for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i] == target) {listPlace = i;}
    }
}
//Отдельная ф-ия для стартового запроса
function start() {
    let dataBase = sendRequest('GET', 10);

    dataBase.then(data => {
        const title = [];
        for (let i = 0; i < 10; i++) {
            title[i] = data.products[i].title;
        }
        addListItem(title, 10);
        dataBase.catch(err => console.log(err))
    })
}
start();
//Ф-я для создания заданного кол-ва элементов
function makeListItem() {
    let dataBase = sendRequest('GET', requestURL);
    Quantity = document.getElementById('Quant').value;
    document.querySelector('.mainContainer').style.gridTemplateRows='80px repeat(' + Quantity+2 + ', 40px)';
        dataBase.then(data => {
            const title = [];
            for (let i = 0; i < Quantity; i++) {
                title[i] = data.products[i].title;
            }
            addListItem(title, Quantity);
            dataBase.catch(err => console.log(err))
        })
}

function addSortedRequest(){

}
//Создание описания
function makeListDescription(n) {
    let dataBase = sendRequest('GET', requestURL);
    dataBase.then(data => {
        const id = [];
        const title = [];
        const description = [];
        const price = [];
        const discountPercentage = [];
        const rating = [];
        const stock = [];
        const brand = [];
        const category = [];
        const images = [];
        id[n] = data.products[n].id;
        title[n] = data.products[n].title;
        description[n] = data.products[n].description;
        price[n] = data.products[n].price;
        discountPercentage[n] = data.products[n].discountPercentage;
        rating[n] = data.products[n].rating;
        stock[n] = data.products[n].stock;
        brand[n] = data.products[n].brand;
        category[n] = data.products[n].category;
        images[n] = data.products[n].images;

        // Легкий вариант спрятать пустую картинку
        for (let i = 0; i < 5; i++) {
            if (images[n][i] == undefined) { images[n][i] = images[n][0]; }
        }

        let removeDiv = document.querySelectorAll(".listObjectDescription");
        let targetDiv = document.querySelector(".mainContainer");
        let newDiv = document.createElement("div");
        for (let k = removeDiv.length; k > 0; k--) { removeDiv[k - 1].remove(); }
        newDiv.className = 'listObjectDescription';
        newDiv.id = 'Description';
        newDiv.innerHTML = ' <button id = "x" onclick = removeDescriptionX()>x</button> <img src="' + images[n][0] + '" id="big"> <div id="thumbs"> <a href="' + images[n][0] + '"> <img src="' + images[n][0] + '"> </a> <a href="' + images[n][1] + '"> <img src="' + images[n][1] + '"> </a> <a href="' + images[n][2] + '"> <img src="' + images[n][2] + '"> <a href="' + images[n][3] + '"> <img src="' + images[n][3] + '"> <a href="' + images[n][4] + '"> <img src="' + images[n][4] + '"> </a> </div> <div class="mainDescriptionInfo"><div>id: ' + id[n] + '</div> <div>title: ' + title[n] + '</div> <div>description: "' + description[n] + '"</div> <div>price: ' + price[n] + '</div> <div>discountPercentage: ' + discountPercentage[n] + '</div> <div>rating: ' + rating[n] + '</div> <div>stock: ' + stock[n] + '</div> <div>brand: "' + brand[n] + '"</div> <div>category: "' + category[n] + '"</div> </div>';
        targetDiv.append(newDiv);

        changeListItem(n, newDiv);

        changeItemDescription(listPlace);

        imgChanging();

        dataBase.catch(err => console.log(err))


    })
}
//Запрос на сервер
function sendRequest(method, quantity, body = null) {
    if(Quantity != 0){
    return fetch('https://dummyjson.com/products?limit='+Quantity).then(response => {
        return response.json()
    })
    }
    else{
        return fetch('https://dummyjson.com/products?limit='+10).then(response => {
        return response.json()
    })
    }
}
//Перемещение Description
function changeItemDescription(h) {

    document.getElementById('Description').style.backgroundColor = "rgba(102, 51, 153, 0.297)";
    document.getElementById('Description').style.gridArea = h + 3 + '/2/' + (h + 12) + '/3';

}
//Св-ва объектов Листа
function changeListItem(n, description) {
    let object = document.getElementById(n);
    description.addEventListener('mouseover', function () {
        object.style.backgroundColor = "rgba(102, 51, 153, 0.297)";
    });
    description.addEventListener('mouseout', function () {
        object.style.backgroundColor = "";
    });
    document.getElementById('x').addEventListener('click', function () {
        object.style.backgroundColor = "";
    });

}
function addSortedListItem(title, i){
        let targetDiv = document.querySelector(".list");
        let newDiv = document.createElement("div");
        newDiv.className = 'listObject';
        newDiv.id = i;
        newDiv.onmouseover = () => makeListDescription(newDiv.id);
        newDiv.draggable = 'true';
        newDiv.innerHTML = '<a>' + title[i] + '</a>';
        targetDiv.append(newDiv);
    }

//Добавление объектов листа
function addListItem(title, Quantity) {
    removeListItems();
    for (let i = 0; i < Quantity; i++) {
        let targetDiv = document.querySelector(".list");
        let newDiv = document.createElement("div");
        newDiv.className = 'listObject';
        newDiv.id = i;
        newDiv.onmouseover = () => makeListDescription(newDiv.id);
        newDiv.draggable = 'true';
        newDiv.innerHTML = '<a>' + title[i] + '</a>';
        targetDiv.append(newDiv);
    }
}
//Чистка объектов листа
function removeListItems() {
    const removeItems = document.querySelectorAll(".listObject");
    const removeDescription = document.querySelector(".listObjectDescription");
    for (let k = removeItems.length; k > 0; k--) {
        removeItems[k - 1].remove();
    }
    if (removeDescription == null) { }
    else {
        removeDescription.remove();
    }
}
//Закрытие с крестика
function removeDescriptionX() {
    const removeDescription = document.querySelector(".listObjectDescription");
    if (removeDescription == null) { }
    else {
        removeDescription.remove();
    }
}
//Галерея фото в Description
function imgChanging() {
    var thumbs = document.querySelectorAll('#thumbs > a');
    var big = document.getElementById('big');
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener('mouseover', function (e) {
            e.preventDefault();
            big.src = this.href;
        });
    }
}
//Создаем возможность перетаскивания наших объектов 
function dragAndDrop() {
    const listObjects = document.querySelectorAll('.listObject');
    const list = document.querySelectorAll('.list');
    const tasksListElement = document.querySelector(`.list`);
    const taskElements = tasksListElement.querySelectorAll(`.listObject`);

    for (const task of taskElements) { task.draggable = true; }

    tasksListElement.addEventListener(`dragstart`, (evt) => { evt.target.classList.add(`selected`); });
    tasksListElement.addEventListener(`dragend`, (evt) => { evt.target.classList.remove(`selected`); });

    const getNextElement = (cursorPosition, currentElement) => {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;
        return nextElement;
    };

    tasksListElement.addEventListener(`dragover`, (evt) => {
        evt.preventDefault();

        const activeElement = tasksListElement.querySelector(`.selected`);
        const currentElement = evt.target;
        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains(`listObject`);

        if (!isMoveable) {
            return;
        }

        const nextElement = getNextElement(evt.clientY, currentElement);
        if (nextElement && activeElement === nextElement.previousElementSibling || activeElement === nextElement) { return; }

        tasksListElement.insertBefore(activeElement, nextElement);
    });
}
dragAndDrop();
//sortByPrice
function  sortByPrice(){
    let Quantity = parent.children.length;
    let dataBase = sendRequest('GET', requestURL);
    dataBase.then(data => {
        let price = [];
        const title = [];
        let sortedListCounter = [];
        
        for(let i = 0;i < Quantity;i++){title[i] = data.products[i].title;}        
        for(let i = 0;i < Quantity;i++){price[i] = data.products[i].price;}
        
        price.sort(function(a,b){return a-b;});
        for(let i = 0;i < Quantity;i++){

            for(let j = 0;j < Quantity;j++){

                if((price[i]==data.products[j].price) && (sortedListCounter[i-1] != (data.products[j].id-1)))
                {
                    sortedListCounter[i]=(data.products[j].id-1);
                    console.log(title[i],'    ',data.products[j].title);
                    console.log(sortedListCounter);}

                else{}
            }}

        removeListItems();

            for(let i = 0; i < Quantity;  i++){
            addSortedListItem(title,sortedListCounter[i]);}
            
        console.log(price);
});}
//sortByRating
function sortByRating(){
        let Quantity = parent.children.length;
        let dataBase = sendRequest('GET', requestURL);
        dataBase.then(data => {
            let rating = [];
            const title = [];
            let sortedListCounter = [];
            
            for(let i = 0;i < Quantity;i++){title[i] = data.products[i].title;}        
            for(let i = 0;i < Quantity;i++){rating[i] = data.products[i].rating;}
            
            rating.sort(function(a,b){return a-b;});
            for(let i = 0;i < Quantity;i++){
    
                for(let j = 0;j < Quantity;j++){
    
                    if((rating[i]==data.products[j].rating) && (sortedListCounter[i-1] != (data.products[j].id-1)))
                    {
                        sortedListCounter[i]=(data.products[j].id-1);
                        console.log(title[i],'    ',data.products[j].title);
                        console.log(sortedListCounter);}
    
                    else{}
                }}
    
            removeListItems();
    
                for(let i = 0; i < Quantity;  i++){
                addSortedListItem(title,sortedListCounter[i]);}
                
            console.log(rating);
    });}