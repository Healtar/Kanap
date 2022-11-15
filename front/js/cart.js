
function showCart() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    let totalPriceSpan = document.getElementById('totalPrice');;
    for (let productId in cart) {
        let url = 'http://localhost:3000/api/products/' + productId;

        fetch(url)
            .then(res => res.json())
            .then(productDetail => {
                let productName = productDetail.name;
                let productImgUrl = productDetail.imageUrl;
                let productPrice = productDetail.price;
                for (let color in cart[productId]) {
                    let productColor = color
                    let quantity = cart[productId][color];
                    createCartFiche(productId, productName, productImgUrl, productPrice, productColor, quantity);

                    let totalQuantity = document.getElementById('totalQuantity');
                    totalQuantity.textContent = Number(totalQuantity.textContent) + quantity;
                   let totalPrice = productPrice * quantity;
                   let actualTotal = Number(totalPriceSpan.textContent);
                   actualTotal += totalPrice;
                   totalPriceSpan.innerText = String(actualTotal);
                }
            })
            .catch(function (e) {
                console.log(e);
            })


    }


}
function createCartFiche(productId, name, imgUrl, price, color, quantity) {
    let article = document.createElement('article');
    article.classList.add('cart__item');
    article.dataset.id = productId;
    article.dataset.color = color;

    let divItemImg = document.createElement('div');
    divItemImg.classList.add('cart__item__img')

    let itemImg = document.createElement('img');
    itemImg.setAttribute('src', imgUrl);
    itemImg.setAttribute('alt', 'Photographie d\'un canapé');

    let itemContent = document.createElement('div');
    itemContent.classList.add('cart__item__content');

//  <description>
    let itemContentDescription = document.createElement('div');
    itemContentDescription.classList.add('cart__item__content__description');

    let itemTitle = document.createElement('h2');
    itemTitle.textContent = name;

    let itemColor = document.createElement('p');
    itemColor.textContent = color;

    let itemPrice = document.createElement('p');
    itemPrice.textContent = price + " €";
//  </description>


    let itemContentSettings = document.createElement('div');
    itemContentSettings.classList.add('cart__item__content_settings');

    let itemContentSettingsQuantity = document.createElement('div');
    itemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');

    let itemQuantity = document.createElement('p');
    itemQuantity.textContent = 'Qté : ';

    let itemQuantityInput = document.createElement('input');
    itemQuantityInput.classList.add('itemQuantity')
    itemQuantityInput.setAttribute('type', 'number');
    itemQuantityInput.setAttribute('name', 'itemQuantity');
    itemQuantityInput.setAttribute('min', '1');
    itemQuantityInput.setAttribute('max', '100');
    itemQuantityInput.value = quantity;

    let itemContentSettingsDelete = document.createElement('div');
    itemContentSettingsDelete.classList.add('cart__item__content__setting__delete');

    let deleteBtn = document.createElement('p');
    deleteBtn.classList.add('deleteItem');
    deleteBtn.textContent = "Supprimer";

    let itemsContainer = document.getElementById('cart__items');

    itemsContainer.append(article);
    article.append(divItemImg);
    divItemImg.append(itemImg);


    article.append(itemContent);
    itemContent.append(itemContentDescription);

    itemContentDescription.append(itemTitle);
    itemContentDescription.append(itemColor)
    itemContentDescription.append(itemPrice);

    itemContent.append(itemContentSettings);
    itemContentSettings.append(itemContentSettingsQuantity);
    itemContentSettingsQuantity.append(itemQuantity);
    itemContentSettingsQuantity.append(itemQuantityInput);

    itemContentSettings.append(itemContentSettingsDelete);
    itemContentSettingsDelete.append(deleteBtn);
}
/*function totalPriceCart(){
    let totalPrice;
    const quantities = document.getElementsByClassName('itemQuantity');
    console.log(quantities)
    for (let i = 0; i < quantities.length; i++) {
        console.log(i)
    }
}*/
showCart();
