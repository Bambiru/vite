import '/src/pages/login/login.css';
import {
  getNode,
  tiger,
  getStorage,
  setStorage,
  setDocumentTitle,
} from '/src/lib';
import pb from '/src/api/pocketbase';
import gsap from 'gsap';
// import PocketBase from 'pocketbase';
// const pb = new PocketBase(import.meta.env.VITE_PB_URL);

setDocumentTitle('2.9CM / 로그인');

const loginButton = getNode('.login');

const tl = gsap.timeline({
  defaults: {
    opacity: 0,
  },
});
tl.from('.container h1', { y: 30 })
  .from(
    '.container hr',
    {
      scaleX: 0,
      // transformOrigin: 'right center',
    },
    '0'
  )
  .from('form > * ', { y: 30, stagger: 0.1 })
  .from('.register', { y: -30 }, '<');
// tl.eventCallback('onUpdate', (e) => {
//   console.log('애니메이션 진헹중 ! ');
// });

async function handleLogin(e) {
  e.preventDefault();

  try {
    const userId = getNode('#idField').value;
    const userPw = getNode('#pwField').value;

    /* SDK */
    const userData = await pb
      .collection('users')
      .authWithPassword(userId, userPw);

    const { model, token } = await getStorage('pocketbase_auth');

    setStorage('auth', {
      isAuth: !!model,
      user: model,
      token: token,
    });

    alert('로그인 완료 ! 메인페이지로 이동합니다.');
    window.location.href = '/index.html';

    /* CRUD */
    // const userData = await tiger.post(
    //   `${import.meta.env.VITE_PB_API}/collections/users/auth-with-password`,
    //   {import { setStorage } from './../../lib/utils/storage';
    //     identity: 'kkipo@naver.com',
    //     password: 'bambi123#',
    //   }
    // );
    // console.log(userData);
  } catch {
    alert('인증된 사용자가 아닙니다.');
  }
}

loginButton.addEventListener('click', handleLogin);
