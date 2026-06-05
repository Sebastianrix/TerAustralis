# Starbase Down Under — multi-page site

A self-contained, static multi-page website for **TerAustralis Incognita —
Starbase Down Under**. Plain HTML/CSS/JS (no build step), so it can be opened
directly or served from any static host.

## Pages
- `index.html` — Home (hero, overview, CTAs)
- `vision.html` — About, Why the Pilbara, Strategic Pillars, **interactive
  Leaflet map** + **CesiumJS 3D launch/reentry visualization with real-time
  telemetry and dynamic heat-flux colour intensity**
- `roadmap.html` — Strategic framework + interactive accordion timeline (4 phases)
- `team.html` — Founder + the five advisory roles being assembled
- `faq.html` — 9 FAQs (accordion)
- `contact.html` — Contact details + message form placeholder

## Theme
Original cool **purple/cyan** base mixed with warm **Pilbara red-dust**
(orange/amber/rust) accents in the signature gradients — "Red Dust to Rockets",
earth to stars. Heat-flux red is reserved for data intensity, not site chrome.

## Structure
```
site/
  *.html
  assets/
    css/styles.css      shared styling + design system
    js/components.js    nav + footer injection, mobile menu, scroll reveal
    js/ui.js            accordions (roadmap + FAQ) + contact form
    js/map.js           Leaflet 2D map (street / satellite toggle)
    js/cesium-viz.js    CesiumJS 3D viz, telemetry, heat-flux colour
    favicon.svg
```

## Third-party libraries (via CDN, token-less)
- **Leaflet 1.9.4** — 2D map; tiles from OpenStreetMap + Esri World Imagery
- **CesiumJS 1.118** — 3D globe; satellite imagery via Esri (no token needed)

### Optional: Cesium ion token
To enable Cesium World Terrain (3D relief) and Cesium-hosted imagery, add a
token to `CESIUM_ION_TOKEN` at the top of `assets/js/cesium-viz.js`
(get one free at https://cesium.com/ion/tokens). The site runs fully without one.

## Notes
- All flight data in the 3D view is **parametric / conceptual** — not real
  telemetry or an engineering analysis.
- All cultural / Indigenous framing is **provisional and consent-pending**.

## Running locally
Just open `index.html`, or serve the folder:
```bash
cd site && python3 -m http.server 8080   # then visit http://localhost:8080
```
