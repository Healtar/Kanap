
const url = 'http://localhost:3000/api/products/';

init()

/**
* Récupère l'id du produit dans l'URL
*
* @returns {int} Id du produit
* */
function getUrlParam()
{
    let params = new URLSearchParams(window.location.search);
       return params.get('id');
}

/**
 * Récupère les détails du produit avec son id
 *
 * @returns {json}  détail
 * */
async function getProductDetails()
{
    try
    {
        const id = getUrlParam();
        const response = await fetch(url + id);
        return await response.json();
    }
    catch (e)
    {
        console.warn(`${e.message}: ${url}`)
    }
}

/**
* Créé la fiche détaillée du produit
 *
 * @returns {void}
 * */
function createProductFiche(productDetails)
{

    let itemImg = document.getElementsByClassName("item__img");
        itemImg = itemImg[0];

    let img = document.createElement('img');
        img.setAttribute('src', productDetails.imageUrl);
        itemImg.appendChild(img);

    let title = document.getElementById('title');
        title.textContent = productDetails.name;

    let description = document.getElementById('description');
        description.textContent = productDetails.description;

    let price = document.getElementById('price');
        price.textContent = productDetails.price;

    let colorSelect = document.getElementById('colors');

    for (let i = 0; i < productDetails.colors.length; i++) {
        let colorOption = document.createElement('option');
            colorOption.setAttribute('value', productDetails.colors[i]);
            colorOption.textContent = productDetails.colors[i];
            colorSelect.append(colorOption);

    }
}

/**
 * Ajoute la quantité et la couleur souhaitée d'un produit dans le local storage
 * */
function addProductToCart(itemId, color, quantity)
{
    quantity = Number(quantity);
    let detailProductToCart = new Object();
    let productColor = new Object();
    if (localStorage.getItem('cart') === null) {
        productColor[color] = quantity;
        detailProductToCart[itemId] = productColor;
        localStorage.setItem('cart', JSON.stringify(detailProductToCart));
    } else {
        let actualCart = JSON.parse(localStorage.getItem('cart'));
        if (actualCart[itemId]) {
            if (actualCart[itemId][color]) {
                actualCart[itemId][color] = actualCart[itemId][color] + quantity;
                localStorage.setItem('cart', JSON.stringify(actualCart));
            }
            else{
                actualCart[itemId][color] = quantity;
                localStorage.setItem('cart', JSON.stringify(actualCart));
            }

        } else {
            let actualCart = JSON.parse(localStorage.getItem('cart'));
                productColor[color] = quantity;
                actualCart[itemId] = productColor;
                localStorage.setItem('cart', JSON.stringify(actualCart));
        }

    }


}

/**
 * Get product details and create node
 * */
async function init()
{
    const productId =  getUrlParam();
    const productDetails = await getProductDetails(productId);

    createProductFiche(productDetails);

    let confirmButton = document.getElementById('addToCart');
        confirmButton.addEventListener('click', () => {
    let colorSelect = document.getElementById('colors');
    let color = colorSelect.options[colorSelect.selectedIndex].value;
    let inputQuantity = document.getElementById('quantity');
    let quantity = inputQuantity.value;

        if (color === "") {
            alert('Veuillez sélectionner une couleur');
        } else if (quantity <= 0) {
            alert('Veuillez sélectionner une quantité');
        } else {
            addProductToCart(productId, color, quantity);
        }
    })
}


