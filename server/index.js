import express from "express";
import cors from "cors";
import { writeFile, readFile } from 'fs/promises';

const BASKET = './public/basket_goods.json';
const GOODS = './public/goods.json'

const readBasket = () => readFile(BASKET, 'utf-8')
.then((basketFile) => {
  return JSON.parse(basketFile)
})

const readGoods = () => readFile(GOODS, 'utf-8')
.then((basketFile) => {
  return JSON.parse(basketFile)
})

function getReformBasket() {
  return Promise.all([
    readBasket(),
    readGoods()
  ]).then(([basketList, goodsList]) => {
    const result = basketList.map((basketItem) => {
      const goodsItem = goodsList.find(({ id_product: _goodsId}) => {
        return _goodsId === basketItem.id_product
      });
      return {
        ...basketItem,
        ...goodsItem
      }
    })
    return result
  })
};



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
 

app.post('/basket', (res, req) => {
  readBasket().then((basket) => {
    const basketItem = basket.find(({ id_product: _id}) => _id === res.body.id)
    if (!basketItem) {
      basket.push({
        id_product: res.body.id,
        count: 1,
      })
    } else {
      basket = basket.map((basketItem) => {
        if (basketItem.id_product === res.body.id) {
          return {
            ...basketItem,
            count: basketItem.count + 1
          }
        } else {
          return basketItem
        }
      })
    }
    return writeFile(BASKET, JSON.stringify(basket)).then(() => {
      return getReformBasket()
    }).then((result) => {
      req.send(result)
    })
    
  })
});

app.delete('/basket', (res, req) => {
  readBasket().then((basket) => {
      basket = basket.map((basketItem) => {
        if (basketItem.id_product === res.body.id) {
          return {
            ...basketItem,
            count: basketItem.count - 1
          } 
        } else {
          return basketItem
        }
      }).filter((basket) => basket.count > 0)
    return writeFile(BASKET, JSON.stringify(basket)).then(() => {
      return getReformBasket()
    }).then((result) => {
      req.send(result)
    })
    
  })
});

app.get('/basket', (res, req) => {

  getReformBasket().then((result) => {
    req.send(JSON.stringify(result))
  })

});
  
app.listen('8000', () => {
  console.log('server is starting!');
});