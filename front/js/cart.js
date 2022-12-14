const url = 'http://localhost:3000/api/products/';
let cart;

/**
 * Initialise
 * */
(async function()
{
    cart = JSON.parse(localStorage.getItem('cart'));

    await showCart(cart);
    await totalCommand();

    const btnDelete = document.querySelectorAll('.deleteItem');
    btnDelete.forEach((btn)=>{
        btn.addEventListener('click', (e)=> {
            removeItem(e.target);
        })
    })

    const quantityInput = document.querySelectorAll('.itemQuantity');
    quantityInput.forEach((input)=>{

        input.addEventListener("change", (event)=>{

            const productId = event.target.closest('.cart__item').dataset.id;
            const productColor = event.target.closest('.cart__item').dataset.color;
            const quantity = Number(event.target.value);

            updateCart(productId, productColor, quantity);
            totalCommand();
        })
    })

    const form = document.querySelector('form.cart__order__form');
    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        let contact = formValidity(e)
        if (contact)
        {
            const command = generateCommandNumber(contact);
            console.log(command.orderId)
        }
    })
}());

/**
 * Affiche le contenu du panier (localstorage)
 * */
async function showCart(cart)
{
    for (let productId in cart) {

       const productDetails = await getProductDetails(productId);

                for (let color in cart[productId]) {
                    productDetails.color = color;
                    productDetails.quantity = cart[productId][color];
                    await createCartFiche(productDetails);
                }
    }
}

/**
 * Create card node
 *
 * @returns {void}
 * */
async function createCartFiche(product)
{

//  <itemContent>

    //  <description>

    let itemTitle = document.createElement('h2');
        itemTitle.textContent = product.name;

    let itemColor = document.createElement('p');
        itemColor.textContent = product.color;

    let itemPrice = document.createElement('p');
        itemPrice.textContent = product.price + " ???";

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
        itemQuantityInput.value = product.quantity;

    let itemQuantity = document.createElement('p');
        itemQuantity.textContent = 'Qt?? : ';

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
        itemImg.setAttribute('src', product.imageUrl);
        itemImg.setAttribute('alt', 'Photographie d\'un canap??');

    let divItemImg = document.createElement('div');
        divItemImg.classList.add('cart__item__img');
        divItemImg.append(itemImg);

//  <itemImg>


    let article = document.createElement('article');
        article.classList.add('cart__item');
        article.dataset.id = product._id;
        article.dataset.color = product.color;
        article.append(divItemImg);
        article.append(itemContent);

    let itemsContainer = document.getElementById('cart__items');
        itemsContainer.append(article);

}

/**
 * R??cup??re les d??tails du produit avec son id
 *
 * @returns {json}  d??tail
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
        return [];
    }
}

/**
 * Calcul et affiche le total du prix et la quantit?? des produits
 * */
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

/**
 * Met ?? jour le localstorage
 * */
async function updateCart(productId, productColor, quantity)
{
    if (quantity === 0)
    {
        delete cart[productId][productColor];
        if (Object.keys(cart[productId]).length === 0)
        {
            delete cart[productId];
        }
    }else
    {
        cart[productId][productColor] = quantity;
    }
    console.log(cart)

    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * On click remove node of article
 * */
async function removeItem(btn)
{
    const productId = btn.closest('.cart__item').dataset.id;
    const productColor = btn.closest('.cart__item').dataset.color;
    btn.closest('.cart__item').remove();

    await updateCart(productId, productColor, 0);
    await totalCommand();
}

/**
 * V??rifie la validit?? du formulaire
 * */
function formValidity()
{
    let contact = new Object();

    const firstname = document.getElementById('firstName');
    const firstNameError = document.getElementById('firstNameErrorMsg');
    if (nameValidity(firstname.value) !== true)
    {
        firstNameError.innerText = 'Pr??nom invalide';
        return false;
    }
    else
    {
        firstNameError.innerText = '';
        contact['firstName'] = firstname.value;
    }

    const lastname = document.getElementById('lastName');
    const lastNameError = document.getElementById('lastNameErrorMsg');
    if (nameValidity(lastname.value) !== true)
    {
        lastNameError.innerText = 'Nom invalide';
        return false;
    }
    else
    {
        lastNameError.innerText = '';
        contact['lastName'] = lastname.value;
    }

    const address = document.getElementById('address');
    const addressError = document.getElementById('addressErrorMsg');
    if (addressValidity(address.value) !== true)
    {
        addressError.innerText = 'Adresse invalide';
        return false;
    }
    else
    {
        addressError.innerText = '';
        contact['address'] = address.value;
    }

    const city = document.getElementById('city');
    const cityError = document.getElementById('cityErrorMsg');
    if (addressValidity(city.value) !== true)
    {
        cityError.innerText = 'Nom de ville invalide';
        return false;
    }
    else
    {
        cityError.innerText = '';
        contact['city'] = city.value;
    }

    const mail = document.getElementById('email');
    const mailError = document.getElementById('emailErrorMsg');
    if (mailValidity(mail.value) !== true)
    {
        mailError.innerText = 'Adresse mail invalide';
        return false;
    }
    else
    {
        mailError.innerText = '';
        contact['email'] = mail.value;
    }

    return contact;
}

/**
 * V??rifie la validit?? d'un nom ou d'un pr??nom
 *
 * @returns {boolean}
 * */
function nameValidity(name)
{
    const regex = /^[a-zA-Z????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\-]+$/;

    if (name.match(regex))
    {
        return true;
    }

}

/**
 * V??rifie la validit?? d'une adresse ou d'une ville
 *
 * @returns {boolean}
 * */
function addressValidity(address)
{
    const regex = /^[a-zA-Z0-9????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'. \-????]+$/;

    if (address.match(regex))
    {
        return true;
    }
}

/**
 * V??rifie la validit?? d'une adresse mail
 *
 * @returns {boolean}
 * */
function mailValidity(mail)
{
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (mail.match(regex))
    {
        return true;
    }
}

async function generateCommandNumber(contact)
{
    let products = new Array();

    for (const product in cart)
    {
        products.push(product);
    }

    const response = await fetch(url + 'order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({contact, products})
    }) .then((result) => result.json())
        .then((order) => {
            window.location.href = "./confirmation.html?id=" + order.orderId;
        })

}