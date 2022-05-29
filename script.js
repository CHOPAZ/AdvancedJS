const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const RECEIVE_GOODS = `${API_URL}/catalogData.json`;
const GET_BUSKET_GOODS = `${API_URL}/getBasket.json`;



function service (url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  
   
  xhr.onload = () => {
    callback(JSON.parse(xhr.response));
  }
  
  xhr.send();

}

class GoodsItem {
  constructor ({ product_name = '', price = '' }){
    this.product_name = product_name;
    this.price = price; 
  }
  render() {
  return`
    <div class="goods-item">
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
    </div>
  `
  }
}


class GoodsList {
  list = [];
  fetchData(callback) {
    service(RECEIVE_GOODS, (data) => {
      this.list = data;
      callback();
    });
  }

  costAllgoods () {
    return goods.reduce((currentValue, {price}) => 
    currentValue + price
    , 0 ); 
  }

  render() {
    const goodsList = this.list.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render() 
    }).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
  }
}

class Basket {
  list = [];
  fetchData(callback) {
    service(GET_BUSKET_GOODS, (data) => {
      this.list = data;
      callback();
    });
  }
}

const goodsList = new GoodsList(goods);
goodsList.fetchData(() => {
  goodsList.render()
});

const basketList = new Basket();
basketList.fetchData();
