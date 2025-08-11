const journeyItems = document.querySelectorAll(".journey__item");
const container = document.querySelector('.unique.service');
const components = [...container.querySelectorAll('.bg-component')];
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileNav = document.querySelector(".mobile-nav");

const velocityRange = 0.5; 
const attractionStrength = 0.1;
 
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  mobileNav.classList.toggle("expanded");
});

function checkActive() {
  const triggerBottom = window.innerHeight * 0.83;
  journeyItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < triggerBottom && top > 0) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", checkActive);
// window.addEventListener("load", checkActive);



const state = components.map(el => {
  const x = el.offsetLeft;
  const y = el.offsetTop;

  const vx = (Math.random() - 0.5) * velocityRange * 2;
  const vy = (Math.random() - 0.5) * velocityRange * 2;

  return { el, baseX: x, baseY: y, x: x, y: y, vx, vy };
});

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  const containerRect = container.getBoundingClientRect();

  state.forEach(obj => {
    const compCenterX = containerRect.left + obj.x + obj.el.offsetWidth / 2;
    const compCenterY = containerRect.top + obj.y + obj.el.offsetHeight / 2;

    const dx = mouse.x - compCenterX;
    const dy = mouse.y - compCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const forceX = (dx / dist) * attractionStrength * (1 / dist) * 1500;
    const forceY = (dy / dist) * attractionStrength * (1 / dist) * 1500;

    obj.vx += forceX * 0.1 + (Math.random() - 0.5) * 0.03;
    obj.vy += forceY * 0.1 + (Math.random() - 0.5) * 0.03;

    obj.vx = Math.max(Math.min(obj.vx, velocityRange), -velocityRange);
    obj.vy = Math.max(Math.min(obj.vy, velocityRange), -velocityRange);

    obj.x += obj.vx;
    obj.y += obj.vy;

    const maxOffset = 200;
    obj.x = Math.min(Math.max(obj.x, obj.baseX - maxOffset), obj.baseX + maxOffset);
    obj.y = Math.min(Math.max(obj.y, obj.baseY - maxOffset), obj.baseY + maxOffset);

    const tx = obj.x - obj.baseX;
    const ty = obj.y - obj.baseY;

    obj.el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  });

  requestAnimationFrame(animate);
}

animate();
