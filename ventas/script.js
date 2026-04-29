const STORAGE_KEY = "lifeplus_sales_console_v42";
const API_URL = "./api.php";
const API_TOKEN = "pets2026_Xk7mQ9pZrT";

function createDefaultData() {
  return {
    updated_at: null,
    scripts: {
      suave: {
        title: "Llamada fria - version suave",
        content:
          "Hola, soy Peter de LifePlus Pets.\n\nTe llamo porque estamos hablando con clinicas y tiendas que trabajan con perros para compartir una nueva opcion de cuidado externo.\n\nQueria preguntar quien lleva este tipo de productos en el centro, o quien seria la persona adecuada para enviarle una ficha breve.\n\nEs Care & Comfort, un spray veterinario natural sin permetrina. Habla de pulgas, garrapatas, mosquitos, moscas y otros parasitos. Es una opcion mas suave para hogares y familias que muchas personas estan pidiendo ahora.",
      },
      directo: {
        title: "Llamada al decisor - version directa",
        content:
          "Hola, soy Peter de LifePlus Pets.\n\nEstoy llamando porque tenemos un spray externo para perros, Care & Comfort, y queria hablar con la persona que decide o recomienda productos en el centro.\n\nNo quiero quitarte tiempo. Solo queria saber si os encaja recibir una ficha breve con ingredientes, modo de uso y propuesta para clientes que buscan una rutina mas natural y sin permetrina.\n\nSi te interesa, te la envio por WhatsApp ahora mismo y me dices en dos minutos si merece la pena hablar mas adelante.",
      },
    },
    whatsapp: [
      {
        id: "ws-suave",
        title: "Contacto inicial - suave",
        text:
          "Hola, soy Peter de LifePlus Pets.\n\nTe escribo porque estamos compartiendo una nueva opcion de cuidado externo para perros: Care & Comfort.\n\nQuien seria la persona adecuada en vuestro centro para recibir una ficha breve con ingredientes y modo de uso?\n\nComo ventaja importante, no lleva permetrina y es un spray veterinario natural, facil de explicar a familias que buscan una rutina mas simple y segura.",
      },
      {
        id: "ws-seguimiento",
        title: "Mensaje de seguimiento",
        text:
          "Hola, retomo por aqui el mensaje de Care & Comfort por si se te paso.\n\nEs una ficha breve y sin compromiso. Si no es tu area, con que me digas quien lo lleva me vale. Un saludo!",
      },
      {
        id: "ws-tecnico",
        title: "Explicacion tecnica - quimicos vs natural",
        text:
          "Sobre tu duda de la eficacia frente a quimicos:\n\nCare & Comfort no busca sustituir el farmaco si hay riesgo alto, sino ser el refuerzo ideal:\n\n1. Barrera extra: capa natural para paseos sin anadir mas carga quimica.\n2. Efecto repelente: el limoncillo y la andiroba evitan que el insecto se acerque; la pastilla actua cuando ya ha picado.\n3. Seguridad: sin permetrina. Ideal si hay ninos o gatos en casa.\n\nEs la opcion profesional para el cliente que pide algo menos agresivo.",
      },
    ],
    objeciones: [
      {
        id: "obj-1",
        label: "Repelencia vs accion",
        text: "La quimica actua cuando pican. Nosotros ayudamos a evitar que se acerquen gracias a Andiroba y Limoncillo.",
      },
      {
        id: "obj-2",
        label: "Hogares con gatos y ninos",
        text: "No lleva permetrina, lo que facilita explicarlo en hogares donde se busca reducir riesgos y simplificar la rutina externa del perro.",
      },
      {
        id: "obj-3",
        label: "Refuerzo de paseo",
        text: "No sustituye la recomendacion veterinaria en casos de riesgo alto. Suma una barrera natural para paseos y temporadas de mayor exposicion.",
      },
    ],
    productos: [
      {
        name: "Care & Comfort",
        promise: "Defensa externa natural. Sin permetrina.",
        ingredient: "Lemongrass 4.0% + Andiroba",
        use: "Rociar sobre el pelaje, evitando ojos, nariz y boca.",
      },
      {
        name: "Ahiflower Oil",
        promise: "Omega 3 y 6 vegetal para piel, pelo y bienestar.",
        ingredient: "Ahiflower, fuente vegetal de SDA",
        use: "Dosificar segun peso y rutina recomendada.",
      },
      {
        name: "Move",
        promise: "Apoyo articular para perros activos o senior.",
        ingredient: "Glucosamina + MSM",
        use: "Presentar cuando hablan de movilidad o edad.",
      },
      {
        name: "Digest",
        promise: "Apoyo digestivo y equilibrio intestinal.",
        ingredient: "Calostro + prebioticos",
        use: "Presentar ante sensibilidad digestiva o cambios de dieta.",
      },
    ],
  };
}

let data = loadLocalData();
let editing = null;
let syncState = "local";

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return normalizeData(parsed || createDefaultData());
  } catch {
    return normalizeData(createDefaultData());
  }
}

function saveLocalData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function normalizeData(value) {
  const base = createDefaultData();
  const source = value && typeof value === "object" ? value : {};
  const normalized = {
    ...base,
    ...source,
    updated_at: source.updated_at || null,
    scripts: {
      ...base.scripts,
      ...(source.scripts || {}),
    },
    whatsapp: Array.isArray(source.whatsapp) ? source.whatsapp : base.whatsapp,
    objeciones: Array.isArray(source.objeciones) ? source.objeciones : base.objeciones,
    productos: Array.isArray(source.productos) ? source.productos : base.productos,
  };

  return normalized;
}

function currentStamp() {
  return new Date().toISOString();
}

function markDirty() {
  data.updated_at = currentStamp();
}

function saveData() {
  markDirty();
  saveLocalData();
  void saveRemoteData();
  updateSyncStatus();
}

async function loadRemoteData() {
  const response = await fetch(API_URL, {
    cache: "no-store",
    headers: { "X-CRM-Token": API_TOKEN },
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const payload = await response.json();
  if (!payload?.ok || typeof payload.data !== "object") {
    throw new Error("Respuesta invalida del servidor");
  }

  return normalizeData(payload.data);
}

async function saveRemoteData() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CRM-Token": API_TOKEN,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    if (!payload?.ok) throw new Error(payload?.error || "Error guardando");

    syncState = "online";
    updateSyncStatus();
  } catch (error) {
    syncState = "local";
    updateSyncStatus();
    console.warn("No se pudo guardar en servidor:", error);
  }
}

function compareStamps(left, right) {
  return new Date(left || 0).getTime() - new Date(right || 0).getTime();
}

async function hydrateData() {
  try {
    const remote = await loadRemoteData();
    const local = loadLocalData();
    data = compareStamps(local.updated_at, remote.updated_at) >= 0 ? local : remote;

    if (compareStamps(local.updated_at, remote.updated_at) > 0) {
      syncState = "online";
      saveLocalData();
      await saveRemoteData();
    } else {
      syncState = "online";
      saveLocalData();
    }
  } catch (error) {
    console.warn("No se pudo cargar del servidor, uso almacenamiento local:", error);
    syncState = location.protocol === "file:" ? "local" : "online";
  }

  updateSyncStatus();
  renderAll();
}

function updateSyncStatus() {
  const el = document.getElementById("syncStatus");
  if (!el) return;

  if (syncState === "online") {
    el.textContent = "Sincronizacion online";
    el.classList.remove("is-local");
    el.classList.add("is-online");
  } else {
    el.textContent = "Sincronizacion local";
    el.classList.remove("is-online");
    el.classList.add("is-local");
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  return Promise.resolve();
}

function cardTemplate({ id, title, text, category }) {
  const isEditing = editing === id;
  return `
    <article class="script-card">
      <div class="script-top">
        <h3 class="script-title">${escapeHtml(title)}</h3>
        <div class="tools">
          <button class="tool-btn" data-action="edit" data-category="${category}" data-id="${id}" type="button">${isEditing ? "Cerrar" : "Editar"}</button>
          <button class="tool-btn copy-btn" data-action="copy" data-category="${category}" data-id="${id}" type="button">Copiar</button>
        </div>
      </div>
      <div class="script-body">
        ${
          isEditing
            ? `<div class="editor">
                <textarea data-editor="${id}">${escapeHtml(text)}</textarea>
                <button class="save-btn" data-action="save" data-category="${category}" data-id="${id}" type="button">Guardar cambios</button>
              </div>`
            : `<p class="script-text">${escapeHtml(text)}</p>`
        }
      </div>
    </article>
  `;
}

function getItem(category, id) {
  if (category === "scripts") return data.scripts[id];
  return data[category].find((item) => item.id === id);
}

function getText(category, id) {
  const item = getItem(category, id);
  return category === "scripts" ? item.content : item.text;
}

function setText(category, id, value) {
  if (category === "scripts") {
    data.scripts[id].content = value;
    return;
  }
  getItem(category, id).text = value;
}

function renderScripts() {
  document.getElementById("scriptsList").innerHTML = Object.entries(data.scripts)
    .map(([id, item]) =>
      cardTemplate({
        id,
        title: item.title,
        text: item.content,
        category: "scripts",
      }),
    )
    .join("");
}

function renderWhatsApp() {
  document.getElementById("whatsappList").innerHTML = data.whatsapp
    .map((item) =>
      cardTemplate({
        id: item.id,
        title: item.title,
        text: item.text,
        category: "whatsapp",
      }),
    )
    .join("");
}

function renderObjections() {
  document.getElementById("objectionsList").innerHTML = data.objeciones
    .map((item) =>
      cardTemplate({
        id: item.id,
        title: item.label,
        text: item.text,
        category: "objeciones",
      }),
    )
    .join("");
}

function renderProducts() {
  document.getElementById("productsList").innerHTML = data.productos
    .map(
      (product) => `
        <article class="product-card">
          <div>
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.promise)}</p>
          </div>
          <div class="product-meta">
            <span>Ingrediente clave: ${escapeHtml(product.ingredient)}</span>
            <span>Uso: ${escapeHtml(product.use)}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderAll() {
  renderScripts();
  renderWhatsApp();
  renderObjections();
  renderProducts();
}

document.querySelector(".tabs-inner").addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]");
  if (!tab) return;

  document.querySelectorAll("[data-tab]").forEach((item) => {
    item.classList.toggle("is-active", item === tab);
  });
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === tab.dataset.tab);
  });
  editing = null;
  renderAll();
});

document.body.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const { action, category, id } = button.dataset;

  if (action === "edit") {
    editing = editing === id ? null : id;
    renderAll();
  }

  if (action === "copy") {
    copyText(getText(category, id)).then(() => showToast("Texto copiado"));
  }

  if (action === "save") {
    const textarea = document.querySelector(`[data-editor="${CSS.escape(id)}"]`);
    setText(category, id, textarea.value.trim());
    saveData();
    editing = null;
    renderAll();
    showToast("Cambios guardados");
  }
});

document.getElementById("resetDataBtn").addEventListener("click", () => {
  if (!window.confirm("Quieres resetear todos los cambios guardados?")) return;
  data = normalizeData(cloneData(createDefaultData()));
  saveData();
  editing = null;
  renderAll();
  showToast("Datos restaurados");
});

updateSyncStatus();
renderAll();
void hydrateData();
