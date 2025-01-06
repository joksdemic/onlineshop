async function loadProducts() {
    try {
        const response = await fetch('products.json');  
        const products = await response.json();

        const page = window.location.pathname.split('/').pop().split('.')[0]; 

        let startId = 0;
        let endId = 0;

        switch(page) {
            case 'page1':
                startId = 1;
                endId = 12;
                break;
            case 'page2':
                startId = 13;
                endId = 20;
                break;
            case 'page3':
                startId = 22;
                endId = 29;
                break;
            case 'page4':
                startId = 31;
                endId = 38;
                break;
            case 'page5':
                startId = 40;
                endId = 47;
                break;
            case 'page6':
                startId = 49;
                endId = 56;
                break;
            case 'page7':
                startId = 76;
                endId = 83;
                break;
            case 'page8':
                startId = 85;
                endId = 92;
                break;
            case 'page9':
                startId = 94;
                endId = 101;
                break;
            case 'page10':
                startId = 103;
                endId = 110;
                break;
            case 'page11':
                startId = 112;
                endId = 119;
                break;
            case 'page12':
                startId = 121;
                endId = 128;
                break;
            case 'page13':
                startId = 130;
                endId = 137;
                break;
            case 'page14':
                startId = 138;
                endId = 145;
                break;
            case 'page15' :
                startId = 148;
                endId = 156;
                break;
            case 'page16':
                startId = 58;
                endId = 65;
                break;
            case 'page17':
                startId = 67;
                endId = 74;
                break;
}

        const filteredProducts = products.filter(product => product.id >= startId && product.id <= endId);

        const productContainer = document.getElementById('product-list');
        productContainer.innerHTML = '';

        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.price} RSD</p>
            `;
            productContainer.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Greška pri učitavanju proizvoda:', error);
    }
}

loadProducts();
