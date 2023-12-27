import"./tailwind-9Rtriztz.js";import{g as r,t as i}from"./delay-5bI5_ORe.js";function o(t,e){typeof t=="string"&&(t=r(t)),t.insertAdjacentHTML("beforeend",e)}async function c(){(await i.get("http://127.0.0.1:8090/api/collections/cards/records")).data.items.forEach(({name:s,description:a})=>{const n=`
    <div>
      <span>이름 : ${s}</span>
      <span>게시글 : ${a}</span>
    </div>
    `;o(".container",n)})}c();
