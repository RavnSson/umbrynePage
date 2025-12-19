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

// Año automático footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
