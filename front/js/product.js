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


}

let productId = getUrlParam();
let productDetails = getProductDetails(productId);
console.log(productDetails);
