const CONTACT_TO = "contacto@umbryne.cl";

function enc(v) { return encodeURIComponent(v); }

const form = document.getElementById("contactForm");
const note = document.getElementById("contactNote");
const copyBtn = document.getElementById("copyEmail");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const topic = document.getElementById("topic").value;
    const message = document.getElementById("message").value.trim();

    const subject = `[Umbryne] ${topic}`;
    const body =
`Nombre: ${name}
Correo: ${email}

Mensaje:
${message}
`;

    window.location.href = `mailto:${CONTACT_TO}?subject=${enc(subject)}&body=${enc(body)}`;
  });
}

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_TO);
      if (note) note.textContent = "Correo copiado al portapapeles.";
    } catch {
      if (note) note.textContent = "No se pudo copiar automáticamente. Copia manualmente: " + CONTACT_TO;
    }
  });
}
