class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this.sum = 0; //переменная для подсчета суммы товаров
        //this.allProducts = [];//массив товаров c добавлением фото
        this._fetchProducts();
        this.render();//вывод товаров на страницу
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            
           // this.allProducts.push(item);
             block.insertAdjacentHTML("beforeend",item.render());
             //block.innerHTML += item.render();
        }
    }
    total(){ //метод для подсчета суммы товара 
       for(let product of this.goods){ //перебираем массив товаров и в переменную sum прибавляем значения свойства price
           this.sum += this.goods.price;
       }
        return this.sum;
    }
}

class ProductItem{
    constructor(product,img='https://placehold.it/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
           return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

// Добавил 2 класса из задания 
class BasketGoods { //класс для корзины
    constructor (basket='.basket'){  //получаем доступ к области где будет распологаться корзина
        this.basket = basket;
        this.productOfBasket = [] //массив продуктов в корзине
        this.count = ''; //переменная для подсчета количества товара
        this.render(); //нам нужно отрисовать товары в корзине 
        this.total(); // нам нужно подсчитывать сумму товаров в корзине
    }
    render(){ //функция для отрисовки товаров в корзине
        
    }
    total() { //функция для подсчета суммы в корзине товаров
        
    }
    deleteEL(){ //функция для удаления товара из корзины
        
    }
}

class BasketItem extends ProductItem { //класс для элемента корзины
    constructor(product){ //получаем сам элемент
        super(product); //заполняем данные о товаре из родительского элемента товара
    }
    render(){ //Здесь будет полиморфная функция отрисовки товара в корзине
        
    }
}



let list = new ProductList();
//console.log(list);

//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);