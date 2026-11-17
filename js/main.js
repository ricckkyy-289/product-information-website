// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
}

// Helper to create product card HTML linking to product-details.html?id=...
function createProductCard(product) {
  const specEntries = Object.entries(product.specs).slice(0, 3);
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-banner" style="background: ${product.color};">
      <span class="sku">MODEL: ${product.sku}</span>
      <h3>${product.name}</h3>
    </div>
    <div class="product-body">
      <span class="category-badge">${product.category}</span>
      <p class="product-summary">${product.summary}</p>
      <ul class="quick-specs">
        ${specEntries.map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join("")}
      </ul>
      <div class="card-footer">
        <span class="price-tag">${product.price}</span>
        <a href="product-details.html?id=${product.id}" class="btn btn-primary btn-sm">
          View Full Details &rarr;
        </a>
      </div>
    </div>
  `;
  return card;
}

// 1. Home Page: Render Featured Products (first 3)
const featuredGrid = document.getElementById("featuredGrid");
if (featuredGrid) {
  products.slice(0, 3).forEach((p) => featuredGrid.appendChild(createProductCard(p)));
}

// 2. Products Page: Render Full Catalog with Search & Filter
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const noResults = document.getElementById("noResults");

function renderCatalog(list) {
  if (!productGrid) return;
  productGrid.innerHTML = "";
  if (list.length === 0) {
    if (noResults) noResults.style.display = "block";
    return;
  }
  if (noResults) noResults.style.display = "none";
  list.forEach((p) => productGrid.appendChild(createProductCard(p)));
}

if (productGrid) {
  renderCatalog(products);
  const applyFilters = () => {
    const q = searchInput.value.toLowerCase().trim();
    const cat = categoryFilter.value;
    const filtered = products.filter((p) => {
      const matchCat = cat === "all" || p.category === cat;
      const matchQuery =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        Object.values(p.specs).some((v) => v.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
    renderCatalog(filtered);
  };
  searchInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);
}

// 3. Product Details Page: Render selected product from URL ?id=... or dropdown
const productSelector = document.getElementById("productSelector");
const productDetailContainer = document.getElementById("productDetailContainer");

function renderProductDetail(productId) {
  const product = products.find((p) => p.id === productId) || products[0];
  if (!product || !productDetailContainer) return;

  if (productSelector) {
    productSelector.value = product.id;
  }

  productDetailContainer.innerHTML = `
    <div class="detail-hero-card">
      <div class="detail-visual" style="background: ${product.color};">
        <span class="sku">MODEL SKU: ${product.sku}</span>
        <h2>${product.name}</h2>
      </div>
      <div class="detail-info">
        <span class="category-badge">${product.category}</span>
        <h1>${product.name}</h1>
        <p style="color: #334155;">${product.summary}</p>
        <div class="detail-price">${product.price} <span style="font-size: 0.9rem; font-weight: 500; color: #64748b;">MSRP</span></div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="compare.html" class="btn btn-primary">Compare With Another Model</a>
          <a href="manuals.html" class="btn btn-outline">Download User Manual</a>
        </div>
      </div>
    </div>

    <div class="detail-two-col">
      <div>
        <h3 style="margin-bottom: 14px;">Complete Technical Specifications</h3>
        <div class="table-wrapper">
          <table class="compare-table">
            <tbody>
              <tr><th>Model Number</th><td>${product.sku}</td></tr>
              <tr><th>Category</th><td>${product.category}</td></tr>
              ${Object.entries(product.specs)
                .map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`)
                .join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="box-panel">
        <h3>What's Included in the Box</h3>
        <ul class="box-list">
          ${product.inBox.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <h3>Warranty &amp; Support</h3>
        <p style="font-size: 0.92rem; color: #334155; margin-bottom: 14px;">
          Covered by a 24-month manufacturer warranty. Need bulk specs or verification?
        </p>
        <a href="verify.html" class="btn btn-outline btn-sm">Verify Serial Number</a>
      </div>
    </div>
  `;
}

if (productSelector && productDetailContainer) {
  products.forEach((p) => {
    productSelector.add(new Option(`${p.name} (${p.sku})`, p.id));
  });
  const params = new URLSearchParams(window.location.search);
  const initialId = params.get("id") || products[0].id;
  renderProductDetail(initialId);

  productSelector.addEventListener("change", (e) => {
    const newId = e.target.value;
    window.history.replaceState({}, "", `product-details.html?id=${newId}`);
    renderProductDetail(newId);
  });
}

// 4. Compare Page
const compareSelectA = document.getElementById("compareSelectA");
const compareSelectB = document.getElementById("compareSelectB");
const compareTable = document.getElementById("compareTable");

if (compareSelectA && compareSelectB && compareTable) {
  products.forEach((p, idx) => {
    compareSelectA.add(new Option(`${p.name} (${p.price})`, p.id, idx === 0, idx === 0));
    compareSelectB.add(new Option(`${p.name} (${p.price})`, p.id, idx === 1, idx === 1));
  });

  const renderCompare = () => {
    const prodA = products.find((p) => p.id === compareSelectA.value);
    const prodB = products.find((p) => p.id === compareSelectB.value);
    const specsA = Object.entries(prodA.specs);
    const specsB = Object.entries(prodB.specs);

    compareTable.innerHTML = `
      <thead>
        <tr>
          <th>Specification</th>
          <th><a href="product-details.html?id=${prodA.id}" style="color: #0f766e;">${prodA.name}</a></th>
          <th><a href="product-details.html?id=${prodB.id}" style="color: #0f766e;">${prodB.name}</a></th>
        </tr>
      </thead>
      <tbody>
        <tr><th>Model SKU</th><td>${prodA.sku}</td><td>${prodB.sku}</td></tr>
        <tr><th>Category</th><td>${prodA.category}</td><td>${prodB.category}</td></tr>
        <tr><th>Price</th><td><strong>${prodA.price}</strong></td><td><strong>${prodB.price}</strong></td></tr>
        ${specsA
          .map(
            ([k, v], i) => `
          <tr>
            <th>${k}</th>
            <td>${v}</td>
            <td>${specsB[i] ? `<strong>${specsB[i][0]}:</strong> ${specsB[i][1]}` : "—"}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    `;
  };

  renderCompare();
  compareSelectA.addEventListener("change", renderCompare);
  compareSelectB.addEventListener("change", renderCompare);
}

// 5. Manuals Page: FAQ Accordion & Download Alert
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-question");
  btn.addEventListener("click", () => {
    const open = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("active");
      i.querySelector("span").textContent = "+";
    });
    if (!open) {
      item.classList.add("active");
      btn.querySelector("span").textContent = "−";
    }
  });
});

document.querySelectorAll(".download-doc").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert(`Downloading "${btn.getAttribute("data-doc")}" (PDF)...`);
  });
});

// 6. Verify Page: Serial Lookup & Inquiry Form
const verifyForm = document.getElementById("verifyForm");
const verifyResult = document.getElementById("verifyResult");
if (verifyForm && verifyResult) {
  verifyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = document.getElementById("serialInput").value.trim().toUpperCase();
    if (code === "IS-2026-8841") {
      verifyResult.style.color = "#0f766e";
      verifyResult.textContent = "Verified Genuine: PulseTrack Smart Watch S1 (Model IS-SW100) — Warranty Active.";
    } else if (code.startsWith("IS-")) {
      verifyResult.style.color = "#0f766e";
      verifyResult.textContent = `Serial ${code} verified in InfoSpec database — 24-Month Warranty Valid.`;
    } else {
      verifyResult.style.color = "#dc2626";
      verifyResult.textContent = "Invalid serial format. Valid serials start with 'IS-' (try IS-2026-8841).";
    }
  });
}

const inquiryForm = document.getElementById("inquiryForm");
const inqStatus = document.getElementById("inqStatus");
if (inquiryForm && inqStatus) {
  inquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("inqName").value.trim();
    inqStatus.style.color = "#0f766e";
    inqStatus.textContent = `Thank you, ${name}! Your product information request has been submitted.`;
    inquiryForm.reset();
  });
}
