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

const scrollBar = document.querySelector('.scroll-bar');
const scrollContainer = document.querySelector('.scroll-container');

let isDragging = false;
let startY = 0;
let startTop = 0;

function updateScrollBar() {
    const containerHeight = scrollContainer.clientHeight; 
    const contentHeight = document.body.scrollHeight;

    const minScrollBarHeight = 30; 
    const maxScrollBarHeight = containerHeight * 0.3; 
    const scrollBarHeight = Math.max(
        (containerHeight / contentHeight) * containerHeight, 
        minScrollBarHeight
    );

    const limitedScrollBarHeight = Math.min(scrollBarHeight, maxScrollBarHeight);

    scrollBar.style.height = `${limitedScrollBarHeight}px`;

    const scrollPosition = (window.scrollY / (contentHeight - containerHeight)) * (containerHeight - limitedScrollBarHeight);
    scrollBar.style.top = `${scrollPosition}px`;
}

scrollBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startTop = parseInt(window.getComputedStyle(scrollBar).top);
    document.body.style.userSelect = 'none';  
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const distance = e.clientY - startY;  
    let newTop = startTop + distance;

    const maxTop = scrollContainer.clientHeight - scrollBar.clientHeight;
    if (newTop < 0) {
        newTop = 0;
    } else if (newTop > maxTop) {
        newTop = maxTop;
    }

    scrollBar.style.top = `${newTop}px`;

    const pageHeight = document.body.scrollHeight - window.innerHeight;
    window.scrollTo(0, (newTop / maxTop) * pageHeight);
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';  
});

window.addEventListener('scroll', updateScrollBar);

updateScrollBar();
