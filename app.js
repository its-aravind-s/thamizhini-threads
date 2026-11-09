(function () {
  const shop = window.SHOP;
  const products = window.PRODUCTS;
  const categories = window.CATEGORIES;
  const photos = window.PHOTOS || {};
  const catById = Object.fromEntries(categories.map(c => [c.id, c]));

  const phoneDigits = (shop.phone || "").replace(/\D/g, "");
  const waNumber = shop.whatsapp || (phoneDigits.length === 10 ? "91" + phoneDigits : phoneDigits);

  // Star with 5 points, for the kids print
  function star(x, y, r) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5;
      const d = i % 2 ? r * .45 : r;
      pts.push(`${(x + d * Math.cos(a)).toFixed(1)},${(y + d * Math.sin(a)).toFixed(1)}`);
    }
    return `<polygon points="${pts.join(" ")}"/>`;
  }

  // One print per category; the first colourway is used on the tiles,
  // products without photos get one of the colourways picked by their id.
  const PRINTS = {
    lattice: {
      variants: [["#6B1D2F", "#C9A24B"], ["#C9A24B", "#6B1D2F"], ["#2F4A3A", "#E2C27A"]],
      draw: ([bg, line], id, w, h) => `
        <defs><pattern id="${id}" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 0L40 40M40 0L0 40" stroke="${line}" stroke-width="1.6"/></pattern></defs>
        <rect width="${w}" height="${h}" fill="${bg}"/>
        <rect width="${w}" height="${h}" fill="url(#${id})"/>
        <rect x="12" y="12" width="${w - 24}" height="${h - 24}" fill="none" stroke="${line}" stroke-width="3"/>`
    },
    quilted: {
      variants: [["#CFE6D6", "#8DB89A", "#FBF6EA"], ["#F3DCD3", "#C99A8A", "#FBF6EA"], ["#DCE3F2", "#93A3C9", "#FBF6EA"]],
      draw: ([bg, line, fill], id, w, h) => `
        <defs><pattern id="${id}" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect x="4" y="4" width="42" height="42" rx="11" fill="${fill}" stroke="${line}" stroke-width="2.5"/></pattern></defs>
        <rect width="${w}" height="${h}" fill="${bg}"/>
        <rect width="${w}" height="${h}" fill="url(#${id})"/>`
    },
    diamonds: {
      variants: [["#B5476E", "#E7C36A", "#FFFFFF"], ["#3E6E8E", "#E7C36A", "#FFFFFF"], ["#6B1D2F", "#E7C36A", "#F3E3C3"]],
      draw: ([bg, gold, tick], id, w, h) => `
        <defs><pattern id="${id}" width="44" height="52" patternUnits="userSpaceOnUse">
          <path d="M22 8L29 26L22 44L15 26Z" fill="${gold}"/>
          <path d="M4 7l3 3M40 45l-3-3M6 40l2-2M38 12l-2 2" stroke="${tick}" stroke-width="2" stroke-linecap="round"/></pattern></defs>
        <rect width="${w}" height="${h}" fill="${bg}"/>
        <rect width="${w}" height="${h}" fill="url(#${id})"/>`
    },
    flowers: {
      variants: [["#1F4E5F", "#FBF6EA", "#E2BE6A"], ["#6B1D2F", "#F6EBD3", "#E2BE6A"], ["#4E6B3B", "#F6EBD3", "#E2BE6A"], ["#26457A", "#F6EBD3", "#E2BE6A"]],
      draw: ([bg, petal, centre], id, w, h) => `
        <defs><pattern id="${id}" width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="${petal}">
            <ellipse cx="32" cy="21" rx="4.5" ry="8.5"/><ellipse cx="32" cy="43" rx="4.5" ry="8.5"/>
            <ellipse cx="21" cy="32" rx="8.5" ry="4.5"/><ellipse cx="43" cy="32" rx="8.5" ry="4.5"/>
          </g>
          <circle cx="32" cy="32" r="4.5" fill="${centre}"/></pattern></defs>
        <rect width="${w}" height="${h}" fill="${bg}"/>
        <rect width="${w}" height="${h}" fill="url(#${id})"/>`
    },
    night: {
      variants: [["#3D5A99", "#E7C36A", "#FFFFFF"], ["#2A3B6E", "#E7C36A", "#FFFFFF"], ["#5A3D7A", "#E7C36A", "#FFFFFF"]],
      draw: ([bg, moon, stars], id, w, h) => `
        <defs><pattern id="${id}" width="200" height="160" patternUnits="userSpaceOnUse">
          <circle cx="52" cy="70" r="32" fill="${moon}"/><circle cx="66" cy="60" r="29" fill="${bg}"/>
          <g fill="${stars}">${star(140, 34, 9)}${star(178, 100, 8)}${star(120, 128, 7)}${star(28, 140, 5)}${star(186, 22, 4)}</g></pattern></defs>
        <rect width="${w}" height="${h}" fill="${bg}"/>
        <rect width="${w}" height="${h}" fill="url(#${id})"/>`
    },
    butti: {
      variants: [["#C9A24B", "#6B1D2F", "#4E6B3B", "#FAF3E5"], ["#6B1D2F", "#F3E3C3", "#C9A24B", "#FAF3E5"], ["#3B2230", "#C0473F", "#5A78B0", "#E8E2D0"]],
      draw: ([bg], id, w, h) => `
        <defs><pattern id="${id}" width="56" height="56" patternUnits="userSpaceOnUse">
          <use href="#butti" x="6" y="6" width="44" height="44"/></pattern></defs>
        <rect width="${w}" height="${h}" fill="${bg}"/>
        <rect width="${w}" height="${h}" fill="url(#${id})"/>`
    }
  };

  const state = { category: "all", query: "", stockOnly: false };

  const $ = id => document.getElementById(id);
  const grid = $("grid");
  const dialog = $("detail");

  function hash(str) {
    let h = 0;
    for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return h;
  }

  function printSVG(kind, colours, id, w, h, caption) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    svg.setAttribute("aria-hidden", "true");
    if (kind === "butti") svg.style.cssText = `--petal:${colours[1]};--leaf:${colours[2]};--eye:${colours[3]}`;
    svg.innerHTML = PRINTS[kind].draw(colours, id, w, h) + (caption ? `
      <rect x="0" y="${h - 54}" width="${w}" height="54" fill="rgba(42,26,31,.62)"/>
      <text x="${w / 2}" y="${h - 20}" text-anchor="middle" fill="#fff" font-family="Lato, sans-serif" font-size="20">Photo coming soon</text>` : "");
    return svg;
  }

  function placeholder(p, key) {
    const kind = catById[p.category].print;
    const variants = PRINTS[kind].variants;
    return printSVG(kind, variants[hash(p.id) % variants.length], `pat-${p.id}-${key}`, 400, 500, true);
  }

  function imagePath(p, n, thumb) {
    return `images/${p.id}/${thumb ? "thumbs/" : ""}${n}.jpg`;
  }

  function photoCount(p) {
    return photos[p.id]?.count || 0;
  }

  function hasPieceShown(p) {
    return p.inStock && !!photos[p.id]?.inHand;
  }

  function designsLine(p) {
    const n = photoCount(p);
    if (!n) return "";
    if (hasPieceShown(p)) return n === 1 ? "1 design" : `1 design here, ${n - 1} to order`;
    return `${n} design${n === 1 ? "" : "s"}`;
  }

  function badge(p) {
    const b = document.createElement("span");
    b.className = p.inStock ? "badge in" : "badge order";
    b.textContent = p.inStock ? "Available now" : "We'll order it";
    return b;
  }

  function cardFor(p) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card";
    btn.setAttribute("aria-label", `${p.name}, ${p.size}. ${p.inStock ? "Available now" : "We'll order it"}`);

    const frame = document.createElement("div");
    frame.className = "frame";
    if (photoCount(p)) {
      const img = new Image();
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.src = imagePath(p, 1, true);
      frame.append(img);
    } else {
      frame.append(placeholder(p, "card"));
    }

    const body = document.createElement("div");
    body.className = "card-body";
    const h = document.createElement("h3");
    h.textContent = p.name;
    const size = document.createElement("p");
    size.className = "size";
    size.textContent = p.size;
    const designs = document.createElement("p");
    designs.className = "designs-line";
    designs.textContent = designsLine(p);
    body.append(h, size, designs, badge(p));

    btn.append(frame, body);
    btn.addEventListener("click", () => openDetail(p));
    li.append(btn);
    return li;
  }

  function matches(p) {
    if (state.category !== "all" && p.category !== state.category) return false;
    if (state.stockOnly && !p.inStock) return false;
    if (!state.query) return true;
    const hay = [p.name, p.size, p.dimensions, p.fabric, p.filling, catById[p.category].label, ...(p.features || [])]
      .join(" ").toLowerCase();
    return state.query.split(/\s+/).every(w => hay.includes(w));
  }

  function render() {
    const list = products.filter(matches)
      .sort((a, b) => (b.inStock - a.inStock));
    grid.replaceChildren(...list.map(cardFor));
    $("empty").hidden = list.length > 0;
    const inNow = list.filter(p => p.inStock).length;
    $("result-count").textContent = list.length
      ? `${list.length} design${list.length === 1 ? "" : "s"}, ${inNow} available now`
      : "";
  }

  function setCategory(id) {
    state.category = id;
    renderChips();
    render();
  }

  function renderChips() {
    const all = [{ id: "all", label: "All" }, ...categories];
    const chips = all.map(c => {
      const count = c.id === "all" ? products.length : products.filter(p => p.category === c.id).length;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", String(state.category === c.id));
      b.innerHTML = `${c.label}<span class="n">${count}</span>`;
      b.addEventListener("click", () => setCategory(c.id));
      return b;
    });
    $("chips").replaceChildren(...chips);
  }

  function renderShowcase() {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tiles = categories.filter(c => c.blurb).map(c => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tile";
      const swatch = document.createElement("div");
      swatch.className = "swatch";
      swatch.append(printSVG(c.print, PRINTS[c.print].variants[0], `tile-${c.id}`, 400, 160, false));
      const body = document.createElement("div");
      body.className = "tile-body";
      const h = document.createElement("h3");
      h.textContent = c.label;
      const p = document.createElement("p");
      p.textContent = c.blurb;
      body.append(h, p);
      b.append(swatch, body);
      b.addEventListener("click", () => {
        setCategory(c.id);
        $("catalog").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      });
      return b;
    });
    $("showcase").prepend(...tiles);
  }

  let current = null;
  let currentDesign = 1;

  function updateWhatsApp() {
    const wa = $("detail-whatsapp");
    if (!waNumber) { wa.hidden = true; return; }
    const p = current;
    const design = photoCount(p) > 1 ? `, design ${currentDesign}` : "";
    const msg = `Hi, I'm interested in the ${p.name} (${p.size})${design} from Thamizhini Threads. Is it available?`;
    wa.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    wa.hidden = false;
  }

  function showDesign(n) {
    const p = current;
    const total = photoCount(p);
    currentDesign = n;
    const img = new Image();
    img.alt = `${p.name}, design ${n}`;
    img.src = imagePath(p, n);
    $("detail-stage").replaceChildren(img);
    const label = hasPieceShown(p)
      ? (n === 1 ? "Design 1: available now" : `Design ${n}: we can order this`)
      : `Design ${n} of ${total}`;
    $("detail-label").textContent = label;
    $("detail-prev").disabled = n === 1;
    $("detail-next").disabled = n === total;
    document.querySelectorAll("#design-grid button").forEach((b, i) =>
      b.setAttribute("aria-pressed", String(i + 1 === n)));
    updateWhatsApp();
  }

  function openDetail(p) {
    current = p;
    const total = photoCount(p);
    const hasPhotos = total > 0;
    $("detail-prev").hidden = $("detail-next").hidden = total < 2;
    $("detail-label").hidden = !hasPhotos;
    $("detail-designs").hidden = total < 2;
    if (total > 1) {
      $("designs-title").textContent = `All ${total} designs`;
      $("design-grid").replaceChildren(...Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", `Show design ${n}`);
        const img = new Image();
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        img.src = imagePath(p, n, true);
        const num = document.createElement("span");
        num.textContent = n;
        b.append(img, num);
        b.addEventListener("click", () => {
          showDesign(n);
          dialog.querySelector(".detail-sheet").scrollTo({ top: 0 });
        });
        return b;
      }));
    }
    if (!hasPhotos) {
      currentDesign = 1;
      $("detail-stage").replaceChildren(placeholder(p, "detail"));
    }

    $("detail-cat").textContent = catById[p.category].label;
    $("detail-title").textContent = p.name;
    $("detail-size").textContent = p.size;
    const stock = $("detail-stock");
    stock.replaceChildren(badge(p));
    const note = document.createElement("span");
    note.className = "stock-note";
    note.textContent = !p.inStock
      ? "Reaches us in about 5 to 7 days, if the design is still available."
      : hasPieceShown(p)
        ? (total > 1 ? "We have design 1 here. Other designs can be ordered in about 5 to 7 days, if still available." : "")
        : "We have one piece here, so ask us which design. Others can be ordered in about 5 to 7 days, if still available.";
    stock.append(note);

    const rows = [
      ["Size", p.dimensions],
      ["Fabric", p.fabric],
      ["Filling", p.filling],
      ["Pillow cover", p.pillow],
      ["Weight", p.weight],
      ["Packing", p.packing]
    ].filter(r => r[1]);
    $("detail-specs").replaceChildren(...rows.flatMap(([k, v]) => {
      const dt = document.createElement("dt"); dt.textContent = k;
      const dd = document.createElement("dd"); dd.textContent = v;
      return [dt, dd];
    }));
    $("detail-features").replaceChildren(...(p.features || []).map(f => {
      const li = document.createElement("li"); li.textContent = f; return li;
    }));

    if (hasPhotos) showDesign(1); else updateWhatsApp();

    history.replaceState(null, "", `#${p.id}`);
    if (!dialog.open) dialog.showModal();
    dialog.querySelector(".detail-sheet").scrollTop = 0;
  }

  function closeDetail() {
    dialog.close();
  }

  function renderFooter() {
    $("visit").textContent = shop.address
      ? `Visit us at home: ${shop.address}`
      : "Visit us at home and see every piece in person.";
    const contact = $("contact");
    if (shop.phone) {
      const a = document.createElement("a");
      a.href = `tel:+${waNumber || phoneDigits}`;
      a.textContent = `Call / WhatsApp: ${shop.phone}`;
      contact.append(a);
    }
    if (shop.instagram) {
      const a = document.createElement("a");
      a.href = `https://instagram.com/${shop.instagram.replace(/^@/, "")}`;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = `Instagram: @${shop.instagram.replace(/^@/, "")}`;
      contact.append(a);
    }
    contact.hidden = !contact.children.length;
    $("footer-text").textContent = `${shop.name}. ${shop.tagline}.`;
  }

  dialog.addEventListener("close", () => history.replaceState(null, "", location.pathname + location.search));
  dialog.addEventListener("click", e => { if (e.target === dialog) closeDetail(); });
  $("detail-close").addEventListener("click", closeDetail);
  $("detail-prev").addEventListener("click", () => showDesign(currentDesign - 1));
  $("detail-next").addEventListener("click", () => showDesign(currentDesign + 1));

  $("search").addEventListener("input", e => {
    state.query = e.target.value.trim().toLowerCase();
    render();
  });
  $("stock-only").addEventListener("change", e => {
    state.stockOnly = e.target.checked;
    render();
  });

  document.title = shop.name;
  $("shop-tagline").textContent = shop.tagline;

  renderShowcase();
  renderChips();
  render();
  renderFooter();

  // Open a product directly from a shared link like index.html#organic-razai-double
  const fromHash = products.find(p => p.id === decodeURIComponent(location.hash.slice(1)));
  if (fromHash) openDetail(fromHash);
})();
