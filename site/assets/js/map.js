/* ============================================================
   Leaflet 2D interactive map — proposed Starbase Down Under
   location in the Pilbara, with a street/satellite layer toggle.
   Uses only free, token-less tile sources.
   ============================================================ */
(function () {
  if (typeof L === 'undefined') return;

  // Proposed (conceptual) Starbase Down Under location — coastal Pilbara, WA.
  var STARBASE = [-20.86, 117.05];

  var map = L.map('leaflet-map', {
    center: STARBASE,
    zoom: 7,
    scrollWheelZoom: false,
    attributionControl: true,
  });
  map.on('focus', function () { map.scrollWheelZoom.enable(); });
  map.on('blur',  function () { map.scrollWheelZoom.disable(); });

  var street = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom: 18, attribution: '© OpenStreetMap contributors' }
  );

  // Esri World Imagery (satellite) — free to use with attribution.
  var satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 18, attribution: 'Imagery © Esri, Maxar, Earthstar Geographics' }
  );

  satellite.addTo(map); // default to satellite

  // Custom glowing marker for the Starbase
  var icon = L.divIcon({
    className: '',
    html: '<div style="width:18px;height:18px;border-radius:50%;' +
          'background:radial-gradient(circle,#ff9a3c,#e2571e);' +
          'box-shadow:0 0 0 6px rgba(226,87,30,0.25),0 0 18px rgba(255,122,24,0.9);' +
          'border:2px solid #fff;"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  L.marker(STARBASE, { icon: icon }).addTo(map)
    .bindPopup(
      '<strong>Proposed Starbase Down Under</strong><br>' +
      'Coastal Pilbara, Western Australia<br>' +
      '<span style="color:#94a3b8;font-size:0.85em">Conceptual site — subject to feasibility studies, ' +
      'regulatory approval, and consent-based partnership with native title holders.</span>'
    );

  // A few reference markers for context
  var refs = [
    { p: [-20.31, 118.61], n: 'Port Hedland — logistics & export hub' },
    { p: [-22.59, 117.66], n: 'Pilbara critical minerals province' },
    { p: [-23.36, 119.73], n: 'Inland test-range corridor (illustrative)' },
  ];
  refs.forEach(function (r) {
    L.circleMarker(r.p, {
      radius: 5, color: '#22d3ee', weight: 2, fillColor: '#22d3ee', fillOpacity: 0.5,
    }).addTo(map).bindPopup(r.n);
  });

  // Layer toggle buttons
  function setLayer(which) {
    if (which === 'satellite') {
      map.addLayer(satellite); map.removeLayer(street);
    } else {
      map.addLayer(street); map.removeLayer(satellite);
    }
    document.getElementById('btn-sat').classList.toggle('active', which === 'satellite');
    document.getElementById('btn-street').classList.toggle('active', which === 'street');
  }
  var bSat = document.getElementById('btn-sat');
  var bStreet = document.getElementById('btn-street');
  if (bSat) bSat.addEventListener('click', function () { setLayer('satellite'); });
  if (bStreet) bStreet.addEventListener('click', function () { setLayer('street'); });

  setTimeout(function () { map.invalidateSize(); }, 200);
})();
