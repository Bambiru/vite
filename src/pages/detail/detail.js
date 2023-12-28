import {
  setDocumentTitle,
  insertFirst,
  getNode,
  getPbImageURL,
  comma,
} from '/src/lib';
import '/src/pages/detail/detail.css';
import pb from '/src/api/pocketbase';

setDocumentTitle('2.9cm / 디테일');

async function renderProductData() {
  const cancel = getNode('.cancel');
  const modify = getNode('.modify');

  const hash = window.location.hash.slice(1);

  const productData = await pb.collection('products').getOne(hash);

  const { brand, price, description, discount } = productData;

  const template = /* html */ `
    <div class="wrapper">
      <div class="brand">
        <label for="brand">브랜드</label>
        <input type="text" value="${brand}" id="brand" />
      </div>
      <div class="visual">
        <img src="${getPbImageURL(productData)}" alt="" />
      </div>
      <div class="desc">
        <label for="description">상품 제목</label>
        <input type="text" value="${description}" id="description"/>
      </div>
      <div class="price">
        <label for="price">가격</label>
        <input type="text" value="${price}" id="price" />
      </div>
      <div class="discount">
        <label for="discount">할인율(%)</label>
        <input type="text" value="${discount}" id="discount" />
      </div>
      <div class="real-price">${comma(
        price - price * (discount * 0.01)
      )}원</div>
    </div>
  `;

  insertFirst('.container', template);

  const priceInput = getNode('#price');
  const discountInput = getNode('#discount');

  function handleDiscount() {
    let newPrice = price;
    let newDiscount = discount;

    newPrice = priceInput.value;
    newDiscount = discountInput.value;

    const ratio = newPrice * (newDiscount * 0.01);
    const realPrice = newPrice - ratio;

    getNode('.real-price').textContent = comma(realPrice) + '원';
  }

  function handleModify() {
    pb.collection('products')
      .update(hash, {
        brand: getNode('#brand').value,
        price: getNode('#price').value,
        discount: getNode('#discount').value,
        description: getNode('#description').value,
      })
      .then(() => {
        location.href = '/src/pages/product/';
      })
      .catch(() => {});
  }

  cancel.addEventListener('click', () => history.back());
  discountInput.addEventListener('input', handleDiscount);
  priceInput.addEventListener('input', handleDiscount);
  modify.addEventListener('click', handleModify);
}

renderProductData();
