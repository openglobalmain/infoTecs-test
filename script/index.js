class ListController {

    async fetch(itemsCount) {
        const data = await fetch('https://dummyjson.com/products?limit='+itemsCount).then(response => {
            return response.json()
        })
        this.products = data.products;
    }


    //Добавление объектов листа
    createListItems() {
        this.clearListItems();
        console.log(this.products)
        for (let i = 0; i < this.products.length; i++) {
            let targetDiv = document.querySelector(".list");
            let newDiv = document.createElement("div");
            newDiv.className = 'listObject';
            newDiv.id = "item-" + i;
            newDiv.onmouseover = () => this.addItemsDetailsHoverListener(i);
            // newDiv.onmouseleave = () => this.clearDescrption();
            newDiv.draggable = 'true';
            newDiv.innerHTML = '<a>' + this.products[i].title + '</a>';
            targetDiv.append(newDiv);
        }
    }

    //Чистка объектов листа
    clearListItems() {
        const removeItems = document.querySelectorAll(".listObject");
        const removeDescription = document.querySelector(".listObjectDescription");
        removeItems.forEach(i => i.remove());
        
        if(removeDescription) {
            removeDescription.remove();
        }
    }

    addApplyListener() {
        const applyButton = document.querySelector('#apply-button');
        applyButton.addEventListener('click', async (ev) => {
            const count = document.querySelector('#input-count');
            await this.fetch(count.value);
            if(count.value <= this.products.length){
            document.querySelector(".mainContainer").style.gridTemplateRows = '80px 40px repeat('+ count.value +', 40px)';
            this.render();
            }
            else{
                alert('let me lower number');
            }
        });
    }

    addStartListener() {
        const applyButton = document.querySelector('#start-button');
        applyButton.addEventListener('click', async (ev) => {
            const count = document.querySelector('#input-count');
            await this.fetch(10);
            document.querySelector(".mainContainer").style.gridTemplateRows = '80px 40px repeat('+ 10  +', 40px)';
            this.render();
        });
    }

    addClearListener() {
        const applyButton = document.querySelector('#clear-button');
        applyButton.addEventListener('click', async (ev) => {
            this.clearListItems();
            this.clearDescrption();
            document.querySelector(".mainContainer").style.gridTemplateRows = '80px 40px repeat('+ 10  +', 40px)';

        });
    }

    addSortByPriceListener() {
        const applyButton = document.querySelector('#sort-price-button');
        applyButton.addEventListener('click', async (ev) => {
            this.products = this.products.sort((a, b) => a.price - b.price)
            console.log(this.products)
            this.render();
        });
    }

    addSortByRatingListener() {
        const applyButton = document.querySelector('#sort-rating-button');
        applyButton.addEventListener('click', async (ev) => {
            this.products = this.products.sort((a, b) => b.rating - a.rating)
            console.log(this.products)
            this.render();
        });
    }

        addHeaderListeners() {
        this.addApplyListener();
        this.addStartListener();
        this.addClearListener();
        this.addSortByPriceListener();
        this.addSortByRatingListener();
    }

    addItemsDetailsHoverListener(n) {
        const index = parseInt(n)
        this.clearDescrption();
        let targetDiv = document.querySelector('.objectDescription');
        let newDiv = document.createElement("div");
        newDiv.className = 'description'
        // newDiv.style.
        newDiv.id = 'Description';
        console.log(this.products[n].images[0])

        // Легкий вариант спрятать пустую картинку
        for (let i = 0; i < 5; i++) {
            if (this.products[n].images[i] == undefined) { this.products[n].images[i] = this.products[n].images[0]; }
        }

        newDiv.innerHTML = 
        `
        <img src="${this.products[n].images[0]}" id="big"> 
        <div id="thumbs"> <a href="${this.products[n].images[0]}"> 
        <img src="${this.products[n].images[0]}"> </a> <a href="${this.products[n].images[1]}"> 
        <img src="${this.products[n].images[1]}"> </a> <a href="${this.products[n].images[2]}"> 
        <img src="${this.products[n].images[2]}"> <a href="${this.products[n].images[3]}"> 
        <img src="${this.products[n].images[3]}"> <a href="${this.products[n].images[4]}"> 
        <img src="${this.products[n].images[4]}"> </a> 
        </div>

        <div class = 'mainDescriptionInfo'> 
        <div> brand: ${this.products[n].brand} </div>
        <div> category: ${this.products[n].category} </div>
        <div> title: ${this.products[n].title} </div>
        <div> description: ${this.products[n].description} </div>
        <div> rating: ${this.products[n].rating} </div>
        <div> price: ${this.products[n].price} $</div>
        </div>

        `
        // // newDiv.innerHTML = ' <button id = "x" onclick = removeDescriptionX()>x</button> <img src="' + this.products[n].images[0] + '" id="big"> <div id="thumbs"> <a href="' + images[n][0] + '"> <img src="' + images[n][0] + '"> </a> <a href="' + images[n][1] + '"> <img src="' + images[n][1] + '"> </a> <a href="' + images[n][2] + '"> <img src="' + images[n][2] + '"> <a href="' + images[n][3] + '"> <img src="' + images[n][3] + '"> <a href="' + images[n][4] + '"> <img src="' + images[n][4] + '"> </a> </div> <div class="mainDescriptionInfo"><div>id: ' + id[n] + '</div> <div>title: ' + title[n] + '</div> <div>description: "' + description[n] + '"</div> <div>price: ' + price[n] + '</div> <div>discountPercentage: ' + discountPercentage[n] + '</div> <div>rating: ' + rating[n] + '</div> <div>stock: ' + stock[n] + '</div> <div>brand: "' + brand[n] + '"</div> <div>category: "' + category[n] + '"</div> </div>';
        targetDiv.append(newDiv);
        
        imgChanging();

    }

    clearDescrption() {
        let removeDivs = document.querySelectorAll(".description");
        removeDivs.forEach(d => d.remove()) 
    }

    render() {
        this.createListItems();
    }

    //Создаем возможность перетаскивания наших объектов 

}



async function main() {
    const listController = new ListController();
    listController.addHeaderListeners();
    await listController.fetch(10);
    listController.render();
}

main().then(() => {
    
});

 function imgChanging() {
    var thumbs = document.querySelectorAll('#thumbs > a');
    console.log(thumbs);
    var big = document.getElementById('big');
    console.log(big);
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener('click', function (e) {
            e.preventDefault();
            big.src = this.href;
        });
    }
}

async function dragAndDrop() {
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
        const isMoveable = activeElement !== currentElement && currentElement.classList.contains(`listObject`);

        if (!isMoveable) {
            return;
        }

        const nextElement = getNextElement(evt.clientY, currentElement);
        if (nextElement && activeElement === nextElement.previousElementSibling || activeElement === nextElement) { return; }

        tasksListElement.insertBefore(activeElement, nextElement);
    });
}

dragAndDrop().then(() => {  

});