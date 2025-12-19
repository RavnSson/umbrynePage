async function load(id, file) {
  const el = document.getElementById(id);
  const res = await fetch(`partials/${file}`);
  el.innerHTML = await res.text();
}

load('header', 'header.html');
load('hero', 'hero.html');
load('servicios', 'servicios.html');
load('proyectos', 'proyectos.html');
load('acerca', 'acerca.html');
load('contacto', 'contacto.html');
load('footer', 'footer.html');

// Año automático footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
