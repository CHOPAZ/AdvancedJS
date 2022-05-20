const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (item = {}) => {
  const { title = '', price = '' } = item

  return `
    <div class="goods-item">
      <h3>${title}</h3>
      <p>${price}</p>
    </div>
  `
};


const mapList = (list) => list.map(renderGoodsItem).join('');

const writeHtml = (list) =>  document.querySelector('.goods-list').innerHTML = list;


const renderGoodsList = (list = []) => {
  const mappedList = mapList(list);
  writeHtml(mappedList);
};

renderGoodsList(goods);