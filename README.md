# Catalog website

A simple one-page site for showing neighbours every quilt, dohar and bedsheet design. No prices are shown.

## 1. Your contact details

The shop name, tagline and logo (in `brand/`) are already set. Open `products.js` and fill in the lines at the top:

```js
address: "Flat 1, Your Apartment, Area",  // footer: "Visit us at home: …"
phone: "98765 43210",                                  // footer + WhatsApp buttons
instagram: "thamizhinithreads",                        // without @
```

Any line left empty is simply hidden. The WhatsApp buttons use your phone number (India +91 is added automatically). If WhatsApp is on a different number, put it in `whatsapp: "91XXXXXXXXXX"`.

The tiles at the top ("Razai", "Comforters" …) and their short descriptions are in `window.CATEGORIES` in the same file.

## 2. Photos

All photos are already in `images/<product-id>/` (`1.jpg`, `2.jpg` …, with small copies in `thumbs/`). `photos.js` says how many each product has. Photo 1 is the design you already have, wherever `inHand` is true.

To add a photo to a product: add the next numbered `.jpg` to its folder, add a copy (about 360 px) to `thumbs/` with the same number, and raise `count` in `photos.js`.

## 3. Mark what's in stock

In `products.js`, each product has `inStock: true` (shows "Available now") or `inStock: false` (shows "We'll order it", with a 5–7 day note). Change these as items sell out or arrive.

Please check these flags, because a few lines in the original order were unclear: Hawamahal dohar, Jaipuri Leaf, and the single bedsheets.

## 4. Preview on your computer

Double-click `index.html` to open it in a browser. Everything works without a server.

## 5. Put it online (free)

**Netlify Drop (easiest):** go to https://app.netlify.com/drop, sign in, and drag this whole `site` folder onto the page. You get a link like `https://something.netlify.app`. You can rename it in Site settings. To update the site later, drag the folder in again from the site's Deploys tab.

**GitHub Pages:** create a repository, upload the contents of this folder, then Settings → Pages → Deploy from branch `main`.

Make a QR code of the link (for example with your phone's share menu or any free QR generator) and print it for the sale table.

### Sharing one product

Each product has its own link. Open it, then copy the address (it ends with `#product-id`). Anyone who opens that link goes straight to that product.
