// ---------- State ----------
let cart = JSON.parse(localStorage.getItem("voxel_cart") || "[]");
let activeCategory = "All";
let checkoutMode = false;

// Current selection inside the open modal
let sel = null;

// ---------- Helpers ----------
const $ = (id) => document.getElementById(id);
const money = (n) => "HK$" + Math.round(n);
const material = (id) => MATERIALS.find((m) => m.id === id);
const color = (id) => COLORS.find((c) => c.id === id);
const size = (id) => SIZES.find((s) => s.id === id);
// Colors available in a given material (color choice depends on stock).
const matColors = (matId) => (material(matId).colors || []).map(color);

const imgFor = (id) => `assets/${id}.svg`;
// If a product has no image file yet, show its emoji instead of a broken image.
function imgFallback(el, icon) {
  const s = document.createElement("span");
  s.className = "thumb-emoji";
  s.textContent = icon;
  el.replaceWith(s);
}
const imgTag = (p) =>
  `<img src="${imgFor(p.id)}" alt="${p.name}" onerror="imgFallback(this,'${p.icon}')" />`;

function itemPrice(it) {
  const base = PRODUCTS.find((p) => p.id === it.productId).basePrice;
  // Round to whole HK$ so all totals add up cleanly for cash.
  return Math.round(base * material(it.material).priceMult * size(it.size).priceMult);
}
function saveCart() {
  localStorage.setItem("voxel_cart", JSON.stringify(cart));
  renderCartCount();
}
// Subtotal = items only.
function cartTotal() {
  return cart.reduce((sum, it) => sum + itemPrice(it) * it.qty, 0);
}
// Fee lines computed from the subtotal (each rounded to whole HK$).
function computeFees(subtotal) {
  return FEES.map((f) => ({
    label: f.label,
    detail: f.type === "percent" ? Math.round(f.rate * 100) + "%" : null,
    amount: f.type === "percent" ? Math.round(subtotal * f.rate) : f.rate,
  }));
}
// Grand total = subtotal + all fees.
function grandTotal() {
  const sub = cartTotal();
  return sub + computeFees(sub).reduce((s, f) => s + f.amount, 0);
}
// Shared totals breakdown shown in the cart and at checkout.
function summaryRows() {
  const sub = cartTotal();
  let html = `<div class="row"><span class="muted">Subtotal</span><span>${money(sub)}</span></div>`;
  computeFees(sub).forEach((f) => {
    html += `<div class="row"><span class="muted">${f.label}${f.detail ? " (" + f.detail + ")" : ""}</span><span>${money(f.amount)}</span></div>`;
  });
  html += `<div class="row"><span class="muted">${FULFILMENT.label}</span><span>${FULFILMENT.note}</span></div>`;
  html += `<div class="row total"><span>Total</span><span>${money(grandTotal())}</span></div>`;
  return html;
}

// ---------- Catalog ----------
function renderFilters() {
  const cats = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  $("filters").innerHTML = cats
    .map(
      (c) =>
        `<button class="chip ${c === activeCategory ? "active" : ""}" data-cat="${c}">${c}</button>`
    )
    .join("");
  $("filters").querySelectorAll(".chip").forEach((b) =>
    b.addEventListener("click", () => {
      activeCategory = b.dataset.cat;
      renderFilters();
      renderGrid();
    })
  );
}

function renderGrid() {
  const list = PRODUCTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );
  $("grid").innerHTML = list
    .map(
      (p) => `
    <div class="card">
      <div class="thumb">
        ${p.popular ? '<span class="badge">Popular</span>' : ""}
        ${imgTag(p)}
      </div>
      <div class="card-body">
        <span class="cat">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="card-foot">
          <span class="price">${money(p.basePrice)} <small>from</small></span>
          <button class="btn" data-id="${p.id}">Customize</button>
        </div>
      </div>
    </div>`
    )
    .join("");
  $("grid").querySelectorAll(".btn").forEach((b) =>
    b.addEventListener("click", () => openModal(b.dataset.id))
  );
}

// ---------- Product modal ----------
function openModal(productId) {
  const p = PRODUCTS.find((x) => x.id === productId);
  const firstMat = p.materials[0];
  sel = {
    productId,
    material: firstMat,
    color: matColors(firstMat)[0].id,
    size: "m",
    qty: 1,
    note: "",
  };
  renderModal();
  $("overlay").classList.add("open");
}

function closeModal() {
  $("overlay").classList.remove("open");
  sel = null;
}

function renderModal() {
  const p = PRODUCTS.find((x) => x.id === sel.productId);
  const availMats = MATERIALS.filter((m) => p.materials.includes(m.id));
  const unit = itemPrice(sel);

  $("modal").innerHTML = `
    <div class="modal-head">
      <div class="micon">${imgTag(p)}</div>
      <div>
        <h2>${p.name}</h2>
        <p>${p.desc}</p>
      </div>
      <button class="x-close" id="mClose">&times;</button>
    </div>
    <div class="modal-body">
      <div class="opt-group">
        <label class="title">Material</label>
        <div class="pills">
          ${availMats
            .map(
              (m) =>
                `<button class="pill ${m.id === sel.material ? "active" : ""}" data-mat="${m.id}">${m.name}<small>${m.blurb}</small></button>`
            )
            .join("")}
        </div>
      </div>

      <div class="opt-group">
        <label class="title">Color <span style="text-transform:none;font-weight:400;color:var(--muted)">— available in ${material(sel.material).name}</span></label>
        <div class="swatches">
          ${matColors(sel.material)
            .map(
              (c) =>
                `<div class="swatch ${c.id === sel.color ? "active" : ""}" data-color="${c.id}" title="${c.name}" style="background:${c.hex}"><span class="tick">✓</span></div>`
            )
            .join("")}
        </div>
      </div>

      <div class="opt-group">
        <label class="title">Size</label>
        <div class="pills">
          ${SIZES.map(
            (s) =>
              `<button class="pill ${s.id === sel.size ? "active" : ""}" data-size="${s.id}">${s.name}<small>${Math.round(s.scale * 100)}% scale</small></button>`
          ).join("")}
        </div>
      </div>

      <div class="opt-group">
        <label class="title">Quantity</label>
        <div class="qty">
          <button id="qMinus">−</button>
          <span id="qVal">${sel.qty}</span>
          <button id="qPlus">+</button>
        </div>
      </div>

      <div class="opt-group note">
        <label class="title">Notes (optional)</label>
        <textarea id="mNote" placeholder="Anything we should know? e.g. text to engrave, gift note…">${sel.note}</textarea>
      </div>
    </div>
    <div class="modal-foot">
      <div class="total">${money(unit * sel.qty)}<small>${money(unit)} each</small></div>
      <button class="btn" id="addToCart">Add to cart</button>
    </div>
  `;

  // wire up
  $("mClose").addEventListener("click", closeModal);
  $("modal").querySelectorAll("[data-color]").forEach((el) =>
    el.addEventListener("click", () => { sel.color = el.dataset.color; renderModal(); })
  );
  $("modal").querySelectorAll("[data-mat]").forEach((el) =>
    el.addEventListener("click", () => {
      sel.material = el.dataset.mat;
      // If the current color isn't available in the new material, switch to one that is.
      const avail = matColors(sel.material);
      if (!avail.some((c) => c.id === sel.color)) sel.color = avail[0].id;
      renderModal();
    })
  );
  $("modal").querySelectorAll("[data-size]").forEach((el) =>
    el.addEventListener("click", () => { sel.size = el.dataset.size; renderModal(); })
  );
  $("qMinus").addEventListener("click", () => { sel.qty = Math.max(1, sel.qty - 1); renderModal(); });
  $("qPlus").addEventListener("click", () => { sel.qty = Math.min(99, sel.qty + 1); renderModal(); });
  $("mNote").addEventListener("input", (e) => { sel.note = e.target.value; });
  $("addToCart").addEventListener("click", addCurrentToCart);
}

function addCurrentToCart() {
  cart.push({ ...sel });
  saveCart();
  closeModal();
  openDrawer();
}

// ---------- Cart drawer ----------
function renderCartCount() {
  const n = cart.reduce((s, it) => s + it.qty, 0);
  $("cartCount").textContent = n;
}

function openDrawer() {
  checkoutMode = false;
  renderDrawer();
  $("drawer").classList.add("open");
  $("drawerOverlay").classList.add("open");
}
function closeDrawer() {
  $("drawer").classList.remove("open");
  $("drawerOverlay").classList.remove("open");
}

function renderDrawer() {
  $("drawerTitle").textContent = checkoutMode ? "Checkout" : "Your Cart";

  if (cart.length === 0) {
    $("drawerItems").innerHTML = `<div class="empty">Your cart is empty.<br />Pick a design to get started 🧊</div>`;
    $("drawerFoot").innerHTML = "";
    return;
  }

  if (checkoutMode) {
    renderCheckout();
    return;
  }

  $("drawerItems").innerHTML = cart
    .map((it, i) => {
      const p = PRODUCTS.find((x) => x.id === it.productId);
      const c = color(it.color);
      return `
      <div class="line-item">
        <div class="li-icon">${imgTag(p)}</div>
        <div class="li-main">
          <h4>${p.name}</h4>
          <div class="li-opts">
            <span class="color-dot" style="background:${c.hex}"></span>${c.name} · ${material(it.material).name} · ${size(it.size).name}
            ${it.note ? `<br/>📝 ${it.note}` : ""}
          </div>
          <div class="li-foot">
            <span class="li-price">${money(itemPrice(it) * it.qty)} <span class="muted" style="font-weight:400">×${it.qty}</span></span>
            <button class="li-remove" data-i="${i}">Remove</button>
          </div>
        </div>
      </div>`;
    })
    .join("");

  $("drawerItems").querySelectorAll(".li-remove").forEach((b) =>
    b.addEventListener("click", () => {
      cart.splice(Number(b.dataset.i), 1);
      saveCart();
      renderDrawer();
    })
  );

  $("drawerFoot").innerHTML = `
    ${summaryRows()}
    <button class="btn" id="goCheckout" style="width:100%">Checkout</button>
  `;
  $("goCheckout").addEventListener("click", () => { checkoutMode = true; renderDrawer(); });
}

// ---------- Checkout ----------
function renderCheckout() {
  $("drawerItems").innerHTML = `
    <div class="pay-note">${STORE.paymentNote}</div>
    <form id="checkoutForm">
      <div class="field">
        <label>Full name</label>
        <input name="name" required placeholder="Jane Doe" />
      </div>
      <div class="field">
        <label>Email</label>
        <input name="email" type="email" required placeholder="jane@email.com" />
      </div>
      <div class="field">
        <label>Phone (optional)</label>
        <input name="phone" placeholder="+1 …" />
      </div>
      <div class="field">
        <label>Address (optional — pickup in store)</label>
        <textarea name="address" placeholder="Only needed if you arrange delivery"></textarea>
      </div>
      <div class="field">
        <label>Order notes (optional)</label>
        <textarea name="notes" placeholder="Delivery preferences, etc."></textarea>
      </div>
    </form>
  `;
  $("drawerFoot").innerHTML = `
    ${summaryRows()}
    <div style="display:flex;gap:10px">
      <button class="btn ghost" id="backToCart" style="flex:1">Back</button>
      <button class="btn" id="placeOrder" style="flex:2">Place order</button>
    </div>
  `;
  $("backToCart").addEventListener("click", () => { checkoutMode = false; renderDrawer(); });
  $("placeOrder").addEventListener("click", placeOrder);
}

async function placeOrder() {
  const form = $("checkoutForm");
  if (!form.reportValidity()) return;
  const fd = new FormData(form);
  const order = {
    id: "VX-" + Date.now().toString(36).toUpperCase(),
    customer: Object.fromEntries(fd.entries()),
    items: cart.map((it) => {
      const p = PRODUCTS.find((x) => x.id === it.productId);
      return {
        name: p.name,
        color: color(it.color).name,
        material: material(it.material).name,
        size: size(it.size).name,
        qty: it.qty,
        note: it.note,
        lineTotal: +(itemPrice(it) * it.qty).toFixed(2),
      };
    }),
    subtotal: cartTotal(),
    fees: computeFees(cartTotal()),
    fulfilment: FULFILMENT.label + " (" + FULFILMENT.note + ")",
    total: grandTotal(),
    placedAt: new Date().toISOString(),
  };

  // Keep a local copy as a backup.
  const orders = JSON.parse(localStorage.getItem("voxel_orders") || "[]");
  orders.push(order);
  localStorage.setItem("voxel_orders", JSON.stringify(orders));

  const msg = buildOrderMessage(order);
  cart = [];
  saveCart();

  // Also send a copy to the store owner's Mac (VOXEL Orders program), if running.
  // Fire-and-forget: never blocks checkout, silently ignored if the Mac is off.
  if (STORE.localEndpoint) {
    fetch(STORE.localEndpoint.replace(/\/$/, "") + "/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).catch(() => {});
  }

  // If a Web3Forms key is set, auto-email the order to the store owner so
  // it arrives even if the customer never taps a send button.
  if (STORE.web3formsKey) {
    $("drawerFoot").innerHTML = `<button class="btn" style="width:100%" disabled>Sending order…</button>`;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: STORE.web3formsKey,
          subject: `🧊 VOXEL3D Order ${order.id} — ${money(order.total)}`,
          from_name: "VOXEL3D Store",
          name: order.customer.name,
          email: order.customer.email,
          message: msg,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "submit failed");
      showConfirmed(order);
      return;
    } catch (e) {
      console.error("Auto-submit failed, falling back to manual send:", e);
      showManualSend(order, msg, "We couldn't send it automatically — please tap a button below to send your order.");
      return;
    }
  }

  // No Web3Forms key configured: customer sends via WhatsApp / email.
  showManualSend(order, msg, "Send us your order using a button below and we'll confirm it.");
}

// Order was emailed to the store automatically — nothing more for the customer to do.
function showConfirmed(order) {
  $("drawerTitle").textContent = "Order confirmed";
  $("drawerItems").innerHTML = `
    <div class="confirm">
      <div class="check">✅</div>
      <h2>Thank you, ${order.customer.name.split(" ")[0]}!</h2>
      <p>Your order has been received. We'll contact you at <b>${order.customer.email}</b> to confirm. Payment is <b>cash on pickup / delivery</b>.</p>
      <div class="order-id">${order.id}</div>
    </div>
  `;
  $("drawerFoot").innerHTML = `<button class="btn" id="doneOrder" style="width:100%">Done</button>`;
  $("doneOrder").addEventListener("click", closeDrawer);
}

// Customer sends the order themselves via WhatsApp / email (fallback / no-key mode).
function showManualSend(order, msg, lead) {
  const waLink = STORE.whatsapp
    ? `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`
    : null;
  const mailLink = `mailto:${STORE.email}?subject=${encodeURIComponent(
    "VOXEL3D Order " + order.id
  )}&body=${encodeURIComponent(msg)}`;
  $("drawerTitle").textContent = "Almost done!";
  $("drawerItems").innerHTML = `
    <div class="confirm">
      <div class="check">🧊</div>
      <h2>One last step, ${order.customer.name.split(" ")[0]}</h2>
      <p>${lead} Payment is <b>cash on pickup / delivery</b>.</p>
      <div class="order-id">${order.id}</div>
    </div>
  `;
  $("drawerFoot").innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px">
      ${waLink ? `<a class="btn" href="${waLink}" target="_blank" style="text-align:center;text-decoration:none">📱 Send order via WhatsApp</a>` : ""}
      <a class="btn ghost" href="${mailLink}" style="text-align:center;text-decoration:none">✉️ Send order via Email</a>
      <button class="li-remove" id="doneOrder" style="margin-top:4px">Close</button>
    </div>
  `;
  $("doneOrder").addEventListener("click", closeDrawer);
}

function buildOrderMessage(order) {
  const lines = [];
  lines.push(`VOXEL3D order ${order.id}`);
  lines.push("");
  lines.push(`Name: ${order.customer.name}`);
  lines.push(`Email: ${order.customer.email}`);
  if (order.customer.phone) lines.push(`Phone: ${order.customer.phone}`);
  lines.push(`Address: ${order.customer.address}`);
  if (order.customer.notes) lines.push(`Notes: ${order.customer.notes}`);
  lines.push("");
  lines.push("Items:");
  order.items.forEach((it) => {
    lines.push(`• ${it.qty}× ${it.name} — ${it.color}, ${it.material}, ${it.size} (${money(it.lineTotal)})`);
    if (it.note) lines.push(`   note: ${it.note}`);
  });
  lines.push("");
  lines.push(`Subtotal: ${money(order.subtotal)}`);
  (order.fees || []).forEach((f) =>
    lines.push(`${f.label}${f.detail ? " (" + f.detail + ")" : ""}: ${money(f.amount)}`)
  );
  if (order.fulfilment) lines.push(`${order.fulfilment}`);
  lines.push(`TOTAL: ${money(order.total)} (cash on pickup)`);
  return lines.join("\n");
}

// ---------- Wire global controls ----------
$("openCart").addEventListener("click", openDrawer);
$("closeDrawer").addEventListener("click", closeDrawer);
$("drawerOverlay").addEventListener("click", closeDrawer);
$("overlay").addEventListener("click", (e) => { if (e.target === $("overlay")) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModal(); closeDrawer(); } });

// ---------- Init ----------
renderFilters();
renderGrid();
renderCartCount();
