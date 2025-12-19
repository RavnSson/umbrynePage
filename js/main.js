async function load(id, file) {
  const el = document.getElementById(id);
  const res = await fetch(`partials/${file}`);
  el.innerHTML = await res.text();
}

load('header', 'header.html');
load('hero', 'hero.html');
load('servicios', 'services.html');
load('proyectos', 'projects.html');
load('acerca', 'about.html');
load('contacto', 'contact.html');
load('footer', 'footer.html');

document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

