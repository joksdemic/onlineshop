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

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((item) => item.product_id == product_id);
    
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity++;
    }
    
    updateCartDisplay();
    updateCartInLocalStorage();
};

const updateCartDisplay = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let product = products.find(p => p.id == item.product_id);
            
            newItem.innerHTML = `
            <div class="image">
                <img src="${product.image}">
            </div>
            <div class="name">${product.name}</div>
            <div class="totalPrice">${(product.price * item.quantity)} din.</div>
            <div class="quantity">
                <span class="minus">-</span>
                <span>${item.quantity}</span>
                <span class="plus">+</span>
            </div>
        `;
            listCartHTML.appendChild(newItem);
        });
    }

    iconCartSpan.innerText = totalQuantity;  
};

listCartHTML.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('minus') || target.classList.contains('plus')) {
        let product_id = target.closest('.item').dataset.id;
        let action = target.classList.contains('plus') ? 'plus' : 'minus';
        changeProductQuantityInCart(product_id, action);
    }
});

const changeProductQuantityInCart = (product_id, action) => {
    let itemIndex = cart.findIndex((item) => item.product_id == product_id);
    if (itemIndex >= 0) {
        let item = cart[itemIndex];
        if (action === 'plus') {
            item.quantity++;
        } else if (action === 'minus' && item.quantity > 1) {
            item.quantity--;
        } else if (action === 'minus' && item.quantity === 1) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartDisplay();
    updateCartInLocalStorage();
};

const updateCartInLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

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

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

document.querySelector('.checkOut').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Vaša korpa je prazna!');
    } else {
        window.location.href = 'checkout.html';  
    }
});

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
