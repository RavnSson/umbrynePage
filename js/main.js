async function load(id, file) {
  const el = document.getElementById(id);
  const res = await fetch(`partials/${file}`);
  el.innerHTML = await res.text();
}

load('header', 'header.html');
load('hero', 'hero.html');
load('services', 'services.html');
load('projects', 'projects.html');
load('about', 'about.html');
load('contact', 'contact.html');
load('footer', 'footer.html');

document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

const menuBtn = document.getElementById('menuBtn');
const mobilePanel = document.getElementById('mobilePanel');

if (menuBtn && mobilePanel) {
  menuBtn.addEventListener('click', () => {
    mobilePanel.classList.toggle('show');
  });

  mobilePanel.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      mobilePanel.classList.remove('show');
    }
  });
}