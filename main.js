import '/src/styles/style.css';
import gsap from 'gsap';

const tl = gsap.timeline();

tl.from('.visual', { opacity: 0, y: 30 }).from('h2>span', {
  opacity: 0,
  x: -30,
  stagger: 0.2,
});
