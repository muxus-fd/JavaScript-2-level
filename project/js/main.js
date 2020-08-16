const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'https://placeimg.com/300/200/tech'},
    {id: 2, title: 'Mouse', price: 20, img: 'https://placeimg.com/300/200/tech'},
    {id: 3, title: 'Keyboard', price: 200, img: 'https://placeimg.com/300/200/tech'},
    {id: 4, price: 50, img: 'https://placeimg.com/300/200/tech'},
];
const defaultProduct = {title: 'default', img: '../default.jpg'};// дефолтные значения для свойств
//Функция для формирования верстки каждого товара
const renderProduct = (item) => {  
    item = {...defaultProduct,...item};
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <img src="${item.img}" alt="..." class="product-img" height="200" with="300">
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
    //когда идет преобразование в to string массив по дефолту отображается как список элементов через запятую.
    //процедура join преобрзаует массив с помощью заданного разделителя
};

renderPage(products);