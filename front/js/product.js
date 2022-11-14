function getUrlParam() {
    let params = new URLSearchParams(window.location.search);
    let productId = params.get('_id');
    return productId;
}

function getProductDetails(productId) {
    let url = 'http://localhost:3000/api/products/' + productId;
    fetch(url)
        .then(res => res.json())
        .then(productDetail => {
            createProductFiche(productDetail);
        })
        .catch(function (e) {
            console.log(e);
        })
}

function createProductFiche(productDetails) {
    let itemImg = document.getElementsByClassName("item__img");
    itemImg = itemImg[0]
    let img = document.createElement('img');
    img.setAttribute('src', productDetails.imageUrl);
    itemImg.appendChild(img);

    let title = document.getElementById('title');
    title.textContent = productDetails.name;

    let price = document.getElementById('price');
    price.textContent = productDetails.price;

    let description = document.getElementById('description');
    description.textContent = productDetails.description;

    let colorSelect = document.getElementById('colors');

    for (let i = 0; i < productDetails.colors.length; i++) {
        let colorOption = document.createElement('option');
        colorOption.setAttribute('value', productDetails.colors[i]);
        colorOption.textContent = productDetails.colors[i];
        colorSelect.append(colorOption);

    }
}

function addProductToCart(itemId, color, quantity) {
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
let productId = getUrlParam();
let productDetails = getProductDetails(productId);

let confirmButton = document.getElementById('addToCart');
confirmButton.addEventListener('click', () => {
    let colorSelect = document.getElementById('colors');
    let color = colorSelect.options[colorSelect.selectedIndex].value;
    let inputQuantity = document.getElementById('quantity');
    let quantity = inputQuantity.value;

    if (quantity <= 0) {
        alert('Veuillez sélectionner une quantité');
    } else if (color == "") {
        alert('Veuillez sélectionner une couleur');
    } else {
        addProductToCart(productId, color, quantity);
    }


})
