function createProductLink(product){
    let items = document.getElementById('items');
    let linkCard = document.createElement("a");
    linkCard.setAttribute("href", './product.html?_id='+product._id);

    let article = document.createElement('article');
    let productImage = document.createElement('img');
    productImage.setAttribute('src', product.imageUrl);
    productImage.setAttribute('alt', product.altTxt);

    let productTitle = document.createElement('h3');
    productTitle.classList.add('productName')
    productTitle.textContent = product.name;
    let productDescription = document.createElement('p');
    productDescription.classList.add('productDescription');
    productDescription.textContent = product.description;
    linkCard.appendChild(article);
    article.appendChild(productImage)
    article.appendChild(productTitle)
    article.appendChild(productDescription)

    items.appendChild(linkCard);
}
function getProducts(){

    fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then(products => {
            for (let i = 0; i < products.length; i++)
            {
                createProductLink(products[i]);
            }
        })
        .catch(function (e){
            console.log(e);
        })
}

getProducts();
