const url = 'http://localhost:3000/api/products/';
let cart = JSON.parse(localStorage.getItem('cart'))
init()

async function showCart(cart)
{
    for (let productId in cart) {

       const productDetails = await getProductDetails(productId);
       const productName = productDetails.name;
       const productImgUrl = productDetails.imageUrl;
       const productPrice = productDetails.price;

                for (let color in cart[productId]) {
                    let productColor = color
                    let quantity = cart[productId][color];
                    await createCartFiche(productId, productName, productImgUrl, productPrice, productColor, quantity);
                }
    }
}

/**
 * Create card node
 *
 * @returns {void}
 * */
async function createCartFiche(productId, productName, productImgUrl, productPrice, productColor, quantity)
{

//  <itemContent>

    //  <description>

    let itemTitle = document.createElement('h2');
        itemTitle.textContent = productName;

    let itemColor = document.createElement('p');
        itemColor.textContent = productColor;

    let itemPrice = document.createElement('p');
        itemPrice.textContent = productPrice + " €";

    let itemContentDescription = document.createElement('div');
        itemContentDescription.classList.add('cart__item__content__description');
        itemContentDescription.append(itemTitle);
        itemContentDescription.append(itemColor);
        itemContentDescription.append(itemPrice);

//  </description>

//  <settings>

    let deleteBtn = document.createElement('p');
        deleteBtn.classList.add('deleteItem');
        deleteBtn.textContent = "Supprimer";

    let itemContentSettingsDelete = document.createElement('div');
        itemContentSettingsDelete.classList.add('cart__item__content__setting__delete');
        itemContentSettingsDelete.append(deleteBtn);

    let itemQuantityInput = document.createElement('input');
        itemQuantityInput.classList.add('itemQuantity')
        itemQuantityInput.setAttribute('type', 'number');
        itemQuantityInput.setAttribute('name', 'itemQuantity');
        itemQuantityInput.setAttribute('min', '1');
        itemQuantityInput.setAttribute('max', '100');
        itemQuantityInput.value = quantity;

    let itemQuantity = document.createElement('p');
        itemQuantity.textContent = 'Qté : ';

    let itemContentSettingsQuantity = document.createElement('div');
        itemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
        itemContentSettingsQuantity.append(itemQuantity);
        itemContentSettingsQuantity.append(itemQuantityInput);

    let itemContentSettings = document.createElement('div');
        itemContentSettings.classList.add('cart__item__content_settings');
        itemContentSettings.append(itemContentSettingsQuantity);
        itemContentSettings.append(itemContentSettingsDelete);

//  <settings>

    let itemContent = document.createElement('div');
        itemContent.classList.add('cart__item__content');
        itemContent.append(itemContentDescription);
        itemContent.append(itemContentSettings);

//  <itemContent>

//  <itemImg>

    let itemImg = document.createElement('img');
        itemImg.setAttribute('src', productImgUrl);
        itemImg.setAttribute('alt', 'Photographie d\'un canapé');

    let divItemImg = document.createElement('div');
        divItemImg.classList.add('cart__item__img');
        divItemImg.append(itemImg);

//  <itemImg>


    let article = document.createElement('article');
        article.classList.add('cart__item');
        article.dataset.id = productId;
        article.dataset.color = productColor;
        article.append(divItemImg);
        article.append(itemContent);

    let itemsContainer = document.getElementById('cart__items');
        itemsContainer.append(article);

}

/**
 * Récupère les détails du produit avec son id
 *
 * @returns {json}  détail
 * */
async function getProductDetails(id)
{
    try
    {
        const response = await fetch(url + id);
        return await response.json();
    }
    catch (e)
    {
        console.warn(`${e.message}: ${url}`)
    }
}

async function totalCommand()
{
    let quantity = 0;
    let price = 0;

    const articles = document.getElementsByClassName('cart__item');
    for (let i = 0; i < articles.length; i++)
    {
        const productId = articles[i].dataset.id;
        const product = await getProductDetails(productId);

        const inputQuantity = articles[i].getElementsByClassName('itemQuantity');

        const productPrice = product.price;
        const productQuantity = Number(inputQuantity[0].value);
        price += Number(productPrice) * productQuantity;
        quantity += productQuantity
    }

    const totalQuantity = document.getElementById('totalQuantity');
          totalQuantity.innerText = quantity;

    const totalPrice = document.getElementById('totalPrice');
          totalPrice.innerText = price;
}

async function updateCart(input)
{
    const item = input.target
    const article = item.closest('.cart__item');

    console.log(article.getElementsByTagName('article'))
    console.log(article)
}

async function removeItem(btn)
{
    btn.closest('.cart__item').remove();
}

async function init()
{
    await showCart(cart);
    await totalCommand();

    const btnDelete = document.querySelectorAll('.deleteItem');
          btnDelete.forEach((btn)=>{
                btn.addEventListener('click', (e)=> {
                    removeItem(e.target);
                })
          })

    const quantityInput = document.querySelectorAll('.itemQuantity');
    /*quantityInput.forEach((input)=>{

        input.addEventListener("change", (event)=>{
            updateCart(event)
        })
    })*/
}

