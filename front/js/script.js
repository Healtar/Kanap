const url = 'http://localhost:3000/api/products';

init();


/**
 *Init the app
 *Get products and create nodes for each product
 *
 */
async function init()
{
    const products = await getProducts();
    console.log(products)
    products.forEach(product => createProductLink(product));
}

/**
 *Create products link cards
 *
 *@returns {void}
 * */
function createProductLink(product)
{

    let title = document.createElement('h3');
        title.classList.add('productName');
        title.textContent = product.name;

    let image = document.createElement('img');
        image.setAttribute('src', product.imageUrl);
        image.setAttribute('alt', product.altTxt);

    let description = document.createElement('p');
        description.classList.add('description');
        description.textContent = product.description;

    let article = document.createElement('article');
        article.appendChild(title);
        article.appendChild(image);
        article.appendChild(description);

    let link = document.createElement("a");
        link.setAttribute("href", `./product.html?id=${product._id}`);
        link.appendChild(article);

    let items = document.getElementById('items');
        items.appendChild(link);
}

/**
 *Get products from API
 *
 *@returns {array} of products
 */
async function getProducts()
{

    try {

        const response = await fetch(url);
        return await response.json();

    }
    catch (e){
        console.warn(`${e.message}: ${url}`);

        return [];
    }
}


