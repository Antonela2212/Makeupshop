let mobiteli = [];

function getData() {
    fetch('http://localhost:80/Makeupshop/makeup.json', {
  
    }).then((res) => {

        return res.json();

    }).then((response) => {
        makeup = response.data;
        draw('articles', mobiteli, onArticleSelect);
    })
}

getData();

let shopingCart = [];

function createElement (el) {
    let elem = document.createElement(el);
    return elem;
}

function deleteElement (el) {
    el.remove();
}

function appendToElem (elem, child, opts) {
    if (opts && opts.html) {
        elem.innerHTML = child;
    } else {
        elem.appendChild(child);
    }
    
}

function setElementValue (elem, value) {
    elem.innerText = value;
}

function addClass (elem, cl) {
    elem.classList.add(cl);
}

function addAttribute (elem, attr, value) {
    elem.setAttribute(attr, value);
}

function addEventListener (elem, event, callback) {
    elem.addEventListener(event, callback);
}

function onArticleSelect (evt) {
    let clickedElementIndex = evt.srcElement.attributes.index.value;
    addToShopingCart(clickedElementIndex);
}

function resetList (list) {
    let elem = document.getElementsByClassName(list)[0];
    Array.from(elem.children).forEach(element => {
        deleteElement(element);        
    });
}

function addToShopingCart(index) {
    shopingCart.push(make up[index]);
    mobiteli.splice(index, 1)
    resetList('shoping-cart');
    resetList('articles');
    draw('articles', mobiteli, onArticleSelect);
    draw('shoping-cart', shopingCart, null)
    calcTotalItems();
}

function calcTotalItems () {
    let elem = document.getElementById('total');
    let totalItems = shopingCart.length;
    let totalPrice = shopingCart.reduce((prevVal, currVal) => {
        prevVal = Number(currVal.cijena) + prevVal;
        return prevVal;
    }, 0)
    let html =  `<span class="total-items">
           U košarici imate: ${totalItems} artikal/artikla
             </span>
             <span class="total">
            Za platiti:  ${totalPrice} KM
            </span>`
    appendToElem(elem, html, {html: true});
}

// RESET KOŠARICE
let resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', (evt) => {
    shopingCart = [];
    
    resetList('shoping-cart');
    resetList('articles');
    calcTotalItems();
    getData();
});


function draw (container, list, onSelectCallback) {
    let elem = document.getElementsByClassName(container)[0];
    for (var i = 0; i < list.length; i++) {
        let article = createElement('div');
        let html = `
        <img class="make up-image" src="${list[i].slika}"></img>
        <div class="article-info">
            <div class="naziv">
                ${list[i].naziv}
            </div>
            <div>
                Brand: ${list[i].brend}
            </div>
            <div>
                Model:  ${list[i].model}
            </div>
            <div class="price">
                ${list[i].cijena} ${list[i].valuta}
            </div>
            <div>
                OS:   ${list[i].os}
            </div>
        </div>
        `
        appendToElem(article, html, {html: true})

        addEventListener(article, 'click', onSelectCallback);
        addAttribute(article, 'index', i);
        addClass(article, 'article');
        appendToElem(elem, article);
    }
}

