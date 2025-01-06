let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];
let currentPage = 1; 
const itemsPerPage = 24; 

const addDataToHTML = () => {
    listProductHTML.innerHTML = ''; 

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    if (paginatedProducts.length > 0) {
        paginatedProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
    <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <button class="addCart">Add To Cart</button>
    </div>
    <h2>${product.name}</h2>
    <div class="price">${product.price} din.</div>
`;

            listProductHTML.appendChild(newProduct);

            const productImageDiv = newProduct.querySelector('.product-image');
            const addCartButton = newProduct.querySelector('.addCart');

            productImageDiv.addEventListener('mouseover', () => {
                addCartButton.style.display = 'block';
            });

            productImageDiv.addEventListener('mouseout', () => {
                addCartButton.style.display = 'none';
            });

            addCartButton.addEventListener('click', (event) => {
                event.stopPropagation();
                addToCart(product.id);
            });
        });
    }
    window.scrollTo(0, 0);
};

function changePage(direction) {
    const totalPages = Math.ceil(products.length / itemsPerPage); 
    currentPage += direction; 

    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    addDataToHTML(); 
    updatePageNumber(); 
}

function updatePageNumber() {
    document.getElementById('page-number').textContent = `Strana ${currentPage}`;
}

document.getElementById('next').addEventListener('click', () => {
    changePage(1); 
});

document.getElementById('prev').addEventListener('click', () => {
    changePage(-1);  
});

addDataToHTML();

const initApp = () => {
    
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();

            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                updateCartDisplay();
            }
        });
};

initApp();