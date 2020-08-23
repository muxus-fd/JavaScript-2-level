const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

//Добавил слушателя для кнопки корзины для показа\скрытия меню корзины
let bascetCart = document.querySelector('.btn-cart');
    bascetCart.addEventListener('click', function (event) {
        let bascet = document.querySelector('.bascetCart');
                bascet.classList.toggle('invisible');
    })


class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов

    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    init() {
        return this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];

            });
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

//Добавил класс списка корзины на основе продуктового списка , но брал из другого списка и добавил слушателя для кнопок удаления
class BascetList extends ProductsList {
    constructor() {
        super('.bascetCart');

    }
    init() {
        return this._getBascets()
            .then(data => { //data - объект js
                this.goods = [...data];

            });
    }
    _getBascets() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(x => x.contents)
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const bascetObj = new BascetItem(product);
            this.allProducts.push(bascetObj);
            block.insertAdjacentHTML('beforeend', bascetObj.render());

        }
        this.addRemoveBascetListener();
    }
    addRemoveBascetListener() {
        const delbtns = document.querySelectorAll('.del-btn');
        delbtns.forEach(function (btn) {
            btn.addEventListener('click', e => {
                let dataId = e.currentTarget.dataset.id;
                let bascetElement = document.querySelector(`.bascet-item[data-id="${dataId}"]`);
                bascetElement.remove();
            });
        })

    }

}
//Добавил класс для каждого товара в корзине и отрисовал его на основе продуктового товара
class BascetItem extends ProductItem {
    constructor(product, img = 'https://placehold.it/80x75') {
        super(product, img);
    }
    render() {
        return `<div class="bascet-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="bascet-desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="del-btn" data-id="${this.id}">Удалить</button>
                </div>
                <div class="count">1</div>
            </div>`
    }
}
//вызываю асинхронную функцию для заполнения товаров в корзине и продуктов после загрзуки списка данных из Json
(async () => {
    let list = new ProductsList();
    await list.init();
    list.render();
    let bascet = new BascetList();
    await bascet.init();
    bascet.render();

})();
