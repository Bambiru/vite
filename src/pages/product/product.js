import defaultAuthData from '/src/api/defaultAuthData';
import '/src/pages/product/product.css';
/* 번들러 환경이기 때문에 index.js가 생략된다. */
import gsap from 'gsap';
import {
  comma,
  getPbImageURL,
  getStorage,
  insertLast,
  setStorage,
  tiger,
  setDocumentTitle,
} from '/src/lib';
/* vite이기 때문에 가능한 것 */
// console.log(import.meta.env.VITE_PB_API);

setDocumentTitle('2.9CM / 상품 목록');

if (!localStorage.getItem('auth')) {
  setStorage('auth', defaultAuthData);
}
async function renderProduct() {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/products/records`
  );
  console.log(response);

  const userData = response.data.items;

  const { isAuth } = await getStorage('auth');

  console.log(isAuth);

  // http://127.0.0.1:8090/api/files/${item.collectionId}/${item.id}/${item.photo}

  userData.forEach((item) => {
    const ratio = item.price * (item.discount * 0.01);
    const template = /* html */ `
      <li class="product-item">
        <a href="${
          !isAuth
            ? '/src/pages/login/'
            : `/src/pages/detail/index.html#${item.id}`
        }"> 
          <figure>
            <img src="${getPbImageURL(item)}" alt="" />
          </figure>
          <span class="brand">${item.brand}</span>
          <span class="desc"
            >${item.description}</span
          >
          <span class="price">${item.price.toLocaleString('ko-KR')}</span>
          <div>
            <span class="discount">${item.discount}%</span>
            <span class="real-price">${comma(item.price - ratio)}원</span>
          </div>
        </a>
      </li>
    `;
    insertLast('.container ul', template);
  });

  gsap.from('.product-item', { y: 30, opacity: 0, stagger: 0.1, delay: 0.3 });
}
renderProduct();
