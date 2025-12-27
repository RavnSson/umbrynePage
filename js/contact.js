const TO_EMAIL = "contacto@umbryne.cl"; // cámbialo

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const copyBtn = document.getElementById("copyBtn");
const charCount = document.getElementById("charCount");

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const topicEl = document.getElementById("topic");
const msgEl = document.getElementById("message");

const MAX_CHARS = 600;

function setStatus(text, type = "") {
  if (!statusEl) return;
  statusEl.className = `status ${type}`.trim();
  statusEl.textContent = text;
}

function helpEl(key) {
  return document.querySelector(`[data-help="${key}"]`);
}

function setHelp(key, text, isError = false) {
  const el = helpEl(key);
  if (!el) return;
  el.textContent = text || "";
  el.classList.toggle("error", !!isError);
}

function isEmail(v) {
  // simple y suficiente para UI
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validate() {
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const topic = topicEl.value.trim();
  const message = msgEl.value.trim();

  let ok = true;

  if (name.length < 2) {
    setHelp("name", "Ingresa tu nombre (mínimo 2 caracteres).", true);
    ok = false;
  } else setHelp("name", "");

  if (!isEmail(email)) {
    setHelp("email", "Ingresa un correo válido.", true);
    ok = false;
  } else setHelp("email", "");

  if (!topic) {
    setHelp("topic", "Selecciona un motivo.", true);
    ok = false;
  } else setHelp("topic", "");

  if (message.length < 10) {
    setHelp("message", "Escribe un mensaje (mínimo 10 caracteres).", true);
    ok = false;
  } else if (message.length > MAX_CHARS) {
    setHelp("message", `Máximo ${MAX_CHARS} caracteres.`, true);
    ok = false;
  } else setHelp("message", "");

  return ok;
}

function buildMailBody() {
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const topic = topicEl.value.trim();
  const message = msgEl.value.trim();

  return `Nombre: ${name}
Correo: ${email}
Motivo: ${topic}

Mensaje:
${message}
`;
}

function updateCount() {
  const len = msgEl.value.length;
  if (charCount) charCount.textContent = `${Math.min(len, MAX_CHARS)}/${MAX_CHARS}`;
  if (len > MAX_CHARS) {
    msgEl.value = msgEl.value.slice(0, MAX_CHARS);
  }
}

if (msgEl) {
  msgEl.addEventListener("input", () => {
    updateCount();
    // limpia status mientras escribe
    setStatus("");
  });
  updateCount();
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    setStatus("");

    if (!validate()) {
      setStatus("Revisa los campos marcados.", "bad");
      return;
    }

    const subject = encodeURIComponent(`[Umbryne] ${topicEl.value.trim()}`);
    const body = encodeURIComponent(buildMailBody());

    setStatus("Abriendo tu cliente de correo…", "ok");
    window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
  });
}

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    setStatus("");

    if (!validate()) {
      setStatus("Completa los campos para copiar un mensaje consistente.", "bad");
      return;
    }

    try {
      await navigator.clipboard.writeText(buildMailBody());
      setStatus("Copiado al portapapeles.", "ok");
    } catch {
      setStatus("No se pudo copiar (permiso del navegador).", "bad");
    }
  });
}
