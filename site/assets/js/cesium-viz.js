/* ============================================================
   TerAustralis — CesiumJS 3D visualization
   Launch trajectory + atmospheric reentry, with a real-time
   telemetry overlay and dynamic heat-flux colour intensity on
   both the readout and the trajectory polyline.

   NOTE: All flight data is parametric/conceptual (illustrative
   profiles), not real telemetry. Satellite imagery is served
   token-lessly via Esri World Imagery. To enable 3D world
   terrain + Cesium imagery, drop a Cesium ion token into
   CESIUM_ION_TOKEN below (https://cesium.com/ion/tokens).
   ============================================================ */
(function () {
  'use strict';

  var CESIUM_ION_TOKEN = ''; // optional — leave blank to run token-less

  var loadingEl = document.getElementById('vizLoading');
  function showError(msg) {
    if (loadingEl) {
      loadingEl.classList.remove('hidden');
      loadingEl.innerHTML = '<div style="text-align:center;max-width:340px;padding:0 20px">' +
        '<p style="color:#ff9a3c;font-weight:600;margin-bottom:8px">3D view unavailable</p>' +
        '<p style="font-size:0.85rem">' + msg + '</p></div>';
    }
  }
  function hideLoading() { if (loadingEl) loadingEl.classList.add('hidden'); }

  if (typeof Cesium === 'undefined') {
    showError('The CesiumJS library could not be loaded. Check your network connection and refresh.');
    return;
  }

  /* -------------------- geo + math helpers -------------------- */
  var STAR_LAT = -20.86, STAR_LON = 117.05; // proposed Starbase, coastal Pilbara
  var R = 6371; // km
  var D2R = Math.PI / 180, R2D = 180 / Math.PI;

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  // destination point given start, bearing (deg) and distance (km)
  function dest(lat, lon, bearing, dKm) {
    var br = bearing * D2R, la1 = lat * D2R, lo1 = lon * D2R, ad = dKm / R;
    var la2 = Math.asin(Math.sin(la1) * Math.cos(ad) + Math.cos(la1) * Math.sin(ad) * Math.cos(br));
    var lo2 = lo1 + Math.atan2(Math.sin(br) * Math.sin(ad) * Math.cos(la1),
                               Math.cos(ad) - Math.sin(la1) * Math.sin(la2));
    return [la2 * R2D, lo2 * R2D];
  }

  // linear interpolation over [t, value] keyframes (t ascending)
  function sampleAt(kf, t) {
    if (t <= kf[0][0]) return kf[0][1];
    var last = kf[kf.length - 1];
    if (t >= last[0]) return last[1];
    for (var i = 1; i < kf.length; i++) {
      if (t <= kf[i][0]) {
        var a = kf[i - 1], b = kf[i];
        var f = (t - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * f;
      }
    }
    return last[1];
  }

  /* -------------------- mission profiles -------------------- */
  // Launch: heat flux stays low (cooler range); orbital insertion.
  var LAUNCH = {
    mode: 'launch', duration: 540, dt: 2, bearing: 350,
    alt:       [[0,0],[40,18],[80,45],[150,95],[300,150],[540,200]],
    downrange: [[0,0],[80,30],[150,160],[300,650],[540,2200]],
    vel:       [[0,0],[40,0.45],[80,1.1],[150,2.4],[300,4.6],[540,7.8]],
    acc:       [[0,1.2],[40,2.6],[70,3.4],[150,1.0],[160,3.0],[300,3.6],[535,4.0],[540,0.4]],
    q:         [[0,0],[20,12],[55,33],[90,12],[150,2],[540,0]],
    heat:      [[0,0],[55,8],[90,18],[150,12],[300,4],[540,1]],
  };
  // Reentry: heat flux peaks dramatically near peak heating (~720 W/cm²).
  var REENTRY = {
    mode: 'reentry', duration: 360, dt: 2, bearing: 110,
    alt:       [[0,120],[60,95],[120,70],[180,45],[230,30],[300,8],[360,0]],
    downrange: [[0,2000],[120,1200],[230,400],[320,60],[360,0]],
    vel:       [[0,7.6],[60,7.4],[120,6.8],[180,4.5],[230,2.2],[300,0.6],[345,0.12],[360,0]],
    acc:       [[0,0.1],[60,0.6],[120,2.5],[170,5.8],[210,4.0],[260,1.5],[320,0.8],[360,0.2]],
    q:         [[0,0.2],[60,3],[120,18],[180,42],[220,30],[300,8],[360,1]],
    heat:      [[0,5],[60,60],[110,260],[150,520],[175,720],[200,560],[240,220],[300,40],[360,3]],
  };
  var HEAT_MAX = 750, HEAT_HOT = 300;

  function telemetryAt(cfg, t) {
    return {
      alt: sampleAt(cfg.alt, t), v: sampleAt(cfg.vel, t), a: sampleAt(cfg.acc, t),
      q: sampleAt(cfg.q, t), heat: sampleAt(cfg.heat, t),
    };
  }

  /* -------------------- heat-flux colour ramp -------------------- */
  // warm white -> light orange -> orange -> orange-red -> bright red -> deep red
  var HEAT_STOPS = [
    [0.00, 255, 243, 217], [0.10, 255, 205, 120], [0.25, 255, 154, 46],
    [0.45, 255, 92, 26],   [0.70, 255, 42, 20],   [1.00, 196, 14, 8],
  ];
  function heatRGB(value) {
    var n = clamp(value / HEAT_MAX, 0, 1);
    for (var i = 1; i < HEAT_STOPS.length; i++) {
      if (n <= HEAT_STOPS[i][0]) {
        var a = HEAT_STOPS[i - 1], b = HEAT_STOPS[i];
        var f = (n - a[0]) / (b[0] - a[0]);
        return {
          r: Math.round(a[1] + (b[1] - a[1]) * f),
          g: Math.round(a[2] + (b[2] - a[2]) * f),
          b: Math.round(a[3] + (b[3] - a[3]) * f),
        };
      }
    }
    var last = HEAT_STOPS[HEAT_STOPS.length - 1];
    return { r: last[1], g: last[2], b: last[3] };
  }

  /* -------------------- Cesium viewer -------------------- */
  var viewer;
  try {
    if (CESIUM_ION_TOKEN) Cesium.Ion.defaultAccessToken = CESIUM_ION_TOKEN;

    var esri = new Cesium.UrlTemplateImageryProvider({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      credit: 'Imagery © Esri, Maxar, Earthstar Geographics', maximumLevel: 18,
    });

    viewer = new Cesium.Viewer('cesiumContainer', {
      baseLayer: new Cesium.ImageryLayer(esri),
      baseLayerPicker: false, geocoder: false, homeButton: false,
      sceneModePicker: false, navigationHelpButton: false, animation: false,
      timeline: false, fullscreenButton: false, infoBox: false,
      selectionIndicator: false, requestRenderMode: false,
    });
  } catch (err) {
    showError('Could not initialise the 3D globe: ' + (err && err.message ? err.message : err));
    return;
  }

  document.getElementById('cesiumContainer').classList.add('cesium-credit-fix');
  viewer.scene.globe.enableLighting = true;
  viewer.scene.skyAtmosphere.show = true;
  viewer.scene.globe.showGroundAtmosphere = true;

  // Optional high-res world terrain when an ion token is supplied
  if (CESIUM_ION_TOKEN) {
    try { viewer.scene.setTerrain(Cesium.Terrain.fromWorldTerrain()); } catch (e) { /* keep ellipsoid */ }
  }

  // Loading overlay: hide once tiles settle (with a safety timeout)
  var loadHandler = viewer.scene.globe.tileLoadProgressEvent.addEventListener(function (q) {
    if (q === 0) { hideLoading(); }
  });
  setTimeout(hideLoading, 4500);

  /* -------------------- mission state -------------------- */
  var epoch = Cesium.JulianDate.now();
  var mission = null;      // { cfg, duration, positionProp, positions }
  var currentHeat = 0;     // drives polyline + point colour callbacks
  var speed = 4;           // playback multiplier

  // DOM refs
  var el = {
    v: document.getElementById('tVel'), a: document.getElementById('tAcc'),
    q: document.getElementById('tQ'), heat: document.getElementById('tHeat'),
    heatRow: document.getElementById('tHeatRow'), alt: document.getElementById('tAlt'),
    time: document.getElementById('tTime'), phase: document.getElementById('tPhase'),
    prog: document.getElementById('tProg'), play: document.getElementById('vizPlay'),
  };

  function fmtTime(s) {
    s = Math.max(0, Math.round(s));
    var m = Math.floor(s / 60), ss = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (ss < 10 ? '0' : '') + ss;
  }

  function updatePanel(t) {
    if (!mission) return;
    var d = telemetryAt(mission.cfg, t);
    currentHeat = d.heat;
    if (el.v) el.v.firstChild.nodeValue = d.v.toFixed(2) + ' ';
    if (el.a) el.a.firstChild.nodeValue = d.a.toFixed(1) + ' ';
    if (el.q) el.q.firstChild.nodeValue = d.q.toFixed(1) + ' ';
    if (el.alt) el.alt.firstChild.nodeValue = d.alt.toFixed(1) + ' ';
    if (el.heat) {
      var c = heatRGB(d.heat);
      el.heat.firstChild.nodeValue = Math.round(d.heat) + ' ';
      el.heat.style.color = 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
    }
    if (el.heatRow) el.heatRow.classList.toggle('heat-hot', d.heat >= HEAT_HOT);
    if (el.time) el.time.firstChild.nodeValue = fmtTime(t) + ' ';
    if (el.prog) el.prog.style.width = (clamp(t / mission.duration, 0, 1) * 100) + '%';
  }

  // dynamic colour for vehicle + polyline based on live heat flux
  function liveColor(alphaBase) {
    var c = heatRGB(currentHeat);
    var n = clamp(currentHeat / HEAT_MAX, 0, 1);
    return Cesium.Color.fromBytes(c.r, c.g, c.b, Math.round(255 * (alphaBase + (1 - alphaBase) * n)));
  }

  function buildMission(cfg) {
    viewer.entities.removeAll();

    // dense samples for the animated position
    var positionProp = new Cesium.SampledPositionProperty();
    positionProp.setInterpolationOptions({
      interpolationDegree: 1, interpolationAlgorithm: Cesium.LinearApproximation,
    });
    var positions = [];
    for (var t = 0; t <= cfg.duration; t += cfg.dt) {
      var p = dest(STAR_LAT, STAR_LON, cfg.bearing, sampleAt(cfg.downrange, t));
      var carto = Cesium.Cartesian3.fromDegrees(p[1], p[0], sampleAt(cfg.alt, t) * 1000);
      positionProp.addSample(Cesium.JulianDate.addSeconds(epoch, t, new Cesium.JulianDate()), carto);
      positions.push(carto);
    }

    mission = { cfg: cfg, duration: cfg.duration, positionProp: positionProp, positions: positions };

    // clock
    var start = epoch;
    var stop = Cesium.JulianDate.addSeconds(epoch, cfg.duration, new Cesium.JulianDate());
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
    viewer.clock.multiplier = speed;
    viewer.clock.shouldAnimate = false;

    // Starbase marker
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(STAR_LON, STAR_LAT, 0),
      point: { pixelSize: 11, color: Cesium.Color.fromCssColorString('#ff9a3c'),
               outlineColor: Cesium.Color.WHITE, outlineWidth: 2,
               heightReference: Cesium.HeightReference.CLAMP_TO_GROUND },
      label: { text: 'Starbase Down Under', font: '600 13px "Space Grotesk", sans-serif',
               fillColor: Cesium.Color.WHITE, showBackground: true,
               backgroundColor: Cesium.Color.fromCssColorString('#0a0614').withAlpha(0.7),
               pixelOffset: new Cesium.Cartesian2(0, -22),
               verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
               disableDepthTestDistance: Number.POSITIVE_INFINITY },
    });

    // trajectory polyline — glow + colour intensify with live heat flux
    viewer.entities.add({
      polyline: {
        positions: positions,
        width: new Cesium.CallbackProperty(function () {
          return 5 + clamp(currentHeat / HEAT_MAX, 0, 1) * 9;
        }, false),
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: new Cesium.CallbackProperty(function () {
            return 0.12 + clamp(currentHeat / HEAT_MAX, 0, 1) * 0.55;
          }, false),
          color: new Cesium.CallbackProperty(function () { return liveColor(0.55); }, false),
        }),
        arcType: Cesium.ArcType.GEODESIC,
      },
    });

    // animated vehicle
    viewer.entities.add({
      position: positionProp,
      point: {
        pixelSize: new Cesium.CallbackProperty(function () {
          return 9 + clamp(currentHeat / HEAT_MAX, 0, 1) * 9;
        }, false),
        color: new Cesium.CallbackProperty(function () { return liveColor(0.85); }, false),
        outlineColor: Cesium.Color.WHITE, outlineWidth: 1.5,
      },
    });

    updatePanel(0);
    if (el.phase) el.phase.textContent = cfg.mode === 'launch' ? 'Launch' : 'Reentry';

    // frame the trajectory with an oblique view
    var span = sampleAt(cfg.downrange, 0);
    var range = Math.max(span, sampleAt(cfg.downrange, cfg.duration), 600) * 1600;
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(STAR_LON, STAR_LAT - 4, range),
      orientation: { heading: Cesium.Math.toRadians(0), pitch: Cesium.Math.toRadians(-40), roll: 0 },
      duration: 1.4,
    });
  }

  // per-frame telemetry update
  viewer.clock.onTick.addEventListener(function (clock) {
    if (!mission) return;
    var secs = clamp(Cesium.JulianDate.secondsDifference(clock.currentTime, epoch), 0, mission.duration);
    updatePanel(secs);
    if (secs >= mission.duration && clock.shouldAnimate) {
      clock.shouldAnimate = false;
      if (el.play) el.play.textContent = '▶';
    }
  });

  /* -------------------- controls -------------------- */
  function setMode(mode) {
    buildMission(mode === 'reentry' ? REENTRY : LAUNCH);
    document.getElementById('mode-launch').classList.toggle('active', mode === 'launch');
    document.getElementById('mode-reentry').classList.toggle('active', mode === 'reentry');
    if (el.play) el.play.textContent = '▶';
  }

  document.getElementById('mode-launch').addEventListener('click', function () { setMode('launch'); });
  document.getElementById('mode-reentry').addEventListener('click', function () { setMode('reentry'); });

  if (el.play) el.play.addEventListener('click', function () {
    var c = viewer.clock;
    if (c.shouldAnimate) { c.shouldAnimate = false; el.play.textContent = '▶'; }
    else {
      if (Cesium.JulianDate.secondsDifference(c.currentTime, epoch) >= mission.duration - 0.01) {
        c.currentTime = c.startTime.clone();
      }
      c.shouldAnimate = true; el.play.textContent = '⏸';
    }
  });

  document.getElementById('vizReset').addEventListener('click', function () {
    viewer.clock.currentTime = viewer.clock.startTime.clone();
    viewer.clock.shouldAnimate = false;
    if (el.play) el.play.textContent = '▶';
    updatePanel(0);
  });

  var speedBtns = document.querySelectorAll('.viz-controls .speed');
  speedBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      speed = parseFloat(b.getAttribute('data-speed'));
      viewer.clock.multiplier = speed;
      speedBtns.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
    });
  });

  /* -------------------- go -------------------- */
  setMode('launch');
  void loadHandler;
})();
