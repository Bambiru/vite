import '/src/pages/product/product.css';
/* 번들러 환경이기 때문에 index.js가 생략된다. */
import { tiger, insertLast, comma, getPbImageURL } from '/src/lib';

/* vite이기 때문에 가능한 것 */
// console.log(import.meta.env.VITE_PB_API);

async function renderProduct() {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/products/records`
  );

  const userData = response.data.items;

  console.log(userData);

  // http://127.0.0.1:8090/api/files/${item.collectionId}/${item.id}/${item.photo}

  userData.forEach((item) => {
    const ratio = item.price * (item.discount * 0.01);
    const template = /* html */ `
      <li class="product-item">
        <a href="/">
          <figure>
            <img src="${getPbImageURL(item)}
" alt="" />
          </figure>
          <span class="brand">${item.brand}</span>
          <span class="desc"
            >${item.description}</span
          >
          <span class="price">${item.price.toLocaleString('ko-KR')}</span>
          <div>
            <span class="discount">${item.discount}%</span>
            <span class="real-price">${comma(item.price - ratio)}</span>
          </div>
        </a>
      </li>
    `;
    insertLast('.container ul', template);
  });
}

renderProduct();
