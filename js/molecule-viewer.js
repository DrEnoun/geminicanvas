(() => {
  'use strict';

  const fallbackData = {
    CH4: {
      formula: 'CH₄', center: 'C', centerColor: '#253052', axe: 'AX₄', geometry: 'Tetrahedral', angle: '109.5°',
      atoms: [
        { element: 'H', vector: [0.5773502692, 0.5773502692, 0.5773502692] },
        { element: 'H', vector: [-0.5773502692, -0.5773502692, 0.5773502692] },
        { element: 'H', vector: [-0.5773502692, 0.5773502692, -0.5773502692] },
        { element: 'H', vector: [0.5773502692, -0.5773502692, -0.5773502692] }
      ], lonePairs: [],
      note: 'Rotate the molecule to inspect the tetrahedral arrangement from different viewpoints.'
    },
    NH3: {
      formula: 'NH₃', center: 'N', centerColor: '#4c5fc7', axe: 'AX₃E', geometry: 'Trigonal pyramidal', angle: '≈107°',
      atoms: [
        { element: 'H', vector: [0.9271, 0, 0.3748] },
        { element: 'H', vector: [-0.4636, 0.8030, 0.3748] },
        { element: 'H', vector: [-0.4636, -0.8030, 0.3748] }
      ], lonePairs: [[0, 0, -1]],
      note: 'The lone pair occupies an electron domain and compresses the H–N–H angle below the ideal tetrahedral value.'
    },
    H2O: {
      formula: 'H₂O', center: 'O', centerColor: '#c85a78', axe: 'AX₂E₂', geometry: 'Bent', angle: '≈104.5°',
      atoms: [
        { element: 'H', vector: [0.7907, 0, 0.6122] },
        { element: 'H', vector: [-0.7907, 0, 0.6122] }
      ], lonePairs: [[0, 0.784, -0.621], [0, -0.784, -0.621]],
      note: 'Two lone-pair domains produce a bent molecular geometry and further compress the H–O–H angle.'
    }
  };

  const state = {
    data: fallbackData,
    key: 'CH4',
    yaw: -0.65,
    pitch: 0.34,
    zoom: 1,
    auto: true,
    showDomains: true,
    dragging: false,
    px: 0,
    py: 0,
    last: performance.now(),
    raf: 0,
    initialized: false
  };

  function init() {
    if (state.initialized) return;
    const canvas = document.getElementById('moleculeCanvas');
    if (!canvas) return;
    state.initialized = true;

    const ctx = canvas.getContext('2d');
    const axe = document.getElementById('molAxe');
    const geometry = document.getElementById('molGeometry');
    const angle = document.getElementById('molAngle');
    const note = document.getElementById('molNote');
    const status = document.getElementById('viewerStatus');
    const rotateBtn = document.getElementById('toggleRotate');
    const domainsBtn = document.getElementById('toggleDomains');
    const resetBtn = document.getElementById('resetMolecule');
    const zoomInput = document.getElementById('molZoom');
    const zoomValue = document.getElementById('zoomValue');
    const molBtns = [...document.querySelectorAll('.mol-btn[data-molecule]')];
    const atomColors = { H: '#8c7cf0' };
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reducedMotion) state.auto = false;

    function setStatus(message) {
      if (status) status.textContent = message;
    }

    async function loadData() {
      try {
        const response = await fetch('data/molecules.json', { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        if (!json.CH4 || !json.NH3 || !json.H2O) throw new Error('Incomplete molecule data');
        state.data = json;
        setMolecule(state.key, false);
        setStatus('Molecular data loaded');
      } catch (error) {
        // Opening index.html directly from file:// can block JSON fetch. The embedded fallback keeps the viewer usable.
        state.data = fallbackData;
        setStatus('Using built-in molecular data');
      }
    }

    function rotateVector(v) {
      let [x, y, z] = v;
      const cy = Math.cos(state.yaw), sy = Math.sin(state.yaw);
      const cx = Math.cos(state.pitch), sx = Math.sin(state.pitch);
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const y2 = y * cx - z1 * sx;
      const z2 = y * sx + z1 * cx;
      return [x1, y2, z2];
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(300, Math.round(rect.width * dpr));
      const height = Math.max(260, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { dpr, width: canvas.width / dpr, height: canvas.height / dpr };
    }

    function project(v, width, height) {
      const [x, y, z] = rotateVector(v);
      const focal = 4.4;
      const perspective = focal / (focal - z);
      const scale = Math.min(width, height) * 0.27 * perspective * state.zoom;
      return { x: width / 2 + x * scale, y: height / 2 - y * scale, z, scale };
    }

    function sphere(x, y, radius, color, label = '', alpha = 1) {
      const r = Math.max(5, radius);
      ctx.save();
      ctx.globalAlpha = alpha;
      const gradient = ctx.createRadialGradient(x - r * 0.32, y - r * 0.36, r * 0.08, x, y, r);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.18, color);
      gradient.addColorStop(1, '#111827');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.55)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      if (label) {
        ctx.fillStyle = '#fff';
        ctx.font = `800 ${Math.max(12, r * 0.62)}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y + 1);
      }
      ctx.restore();
    }

    function drawLonePair(point, center) {
      const vx = point.x - center.x;
      const vy = point.y - center.y;
      const len = Math.hypot(vx, vy) || 1;
      const nx = -vy / len;
      const ny = vx / len;
      const r = Math.max(6, 8 + point.z * 1.5) * state.zoom;
      sphere(point.x + nx * 8 * state.zoom, point.y + ny * 8 * state.zoom, r, '#20a6b7', '', 0.88);
      sphere(point.x - nx * 8 * state.zoom, point.y - ny * 8 * state.zoom, r, '#20a6b7', '', 0.88);
    }

    function draw() {
      const { width, height } = resize();
      ctx.clearRect(0, 0, width, height);
      const molecule = state.data[state.key] || fallbackData.CH4;
      const center = project([0, 0, 0], width, height);
      const atoms = molecule.atoms.map((atom, index) => ({ ...atom, p: project(atom.vector, width, height), index }));
      const lonePairs = (molecule.lonePairs || []).map((vector, index) => ({ vector, p: project(vector, width, height), index }));

      // Orientation guide: intentionally subtle and not part of the molecular structure.
      ctx.save();
      ctx.strokeStyle = 'rgba(104,112,134,.11)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 7]);
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, Math.min(width, height) * 0.28 * state.zoom, Math.min(width, height) * 0.10 * state.zoom, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      atoms.slice().sort((a, b) => a.p.z - b.p.z).forEach(atom => {
        ctx.strokeStyle = 'rgba(115,124,151,.78)';
        ctx.lineWidth = Math.max(6, (11 + atom.p.z * 2) * state.zoom);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(atom.p.x, atom.p.y);
        ctx.stroke();
      });

      if (state.showDomains) {
        lonePairs.slice().sort((a, b) => a.p.z - b.p.z).forEach(lp => drawLonePair(lp.p, center));
      }

      const far = atoms.filter(a => a.p.z < 0);
      const near = atoms.filter(a => a.p.z >= 0);
      far.forEach(atom => sphere(atom.p.x, atom.p.y, (20 + atom.p.z * 1.8) * state.zoom, atomColors[atom.element] || '#8c7cf0', atom.element, 0.96));
      sphere(center.x, center.y, 31 * state.zoom, molecule.centerColor, molecule.center, 1);
      near.forEach(atom => sphere(atom.p.x, atom.p.y, (20 + atom.p.z * 1.8) * state.zoom, atomColors[atom.element] || '#8c7cf0', atom.element, 1));

      ctx.fillStyle = 'rgba(23,32,51,.76)';
      ctx.font = '800 14px Inter, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(molecule.formula || state.key, width - 16, 24);
    }

    function setMolecule(key, announce = true) {
      if (!state.data[key]) return;
      state.key = key;
      molBtns.forEach(button => button.classList.toggle('active', button.dataset.molecule === key));
      const molecule = state.data[key];
      if (axe) axe.textContent = molecule.axe;
      if (geometry) geometry.textContent = molecule.geometry;
      if (angle) angle.textContent = molecule.angle;
      if (note) note.textContent = molecule.note || '';
      if (announce) setStatus(`${molecule.formula}: ${molecule.geometry}`);
      draw();
    }

    function updateAutoButton() {
      if (!rotateBtn) return;
      rotateBtn.textContent = state.auto ? 'Pause rotation' : 'Auto rotate';
      rotateBtn.setAttribute('aria-pressed', String(state.auto));
    }

    function updateDomainButton() {
      if (!domainsBtn) return;
      domainsBtn.textContent = state.showDomains ? 'Hide lone pairs' : 'Show lone pairs';
      domainsBtn.setAttribute('aria-pressed', String(state.showDomains));
    }

    function setZoom(value) {
      const n = Number(value);
      state.zoom = Math.min(1.5, Math.max(0.7, Number.isFinite(n) ? n / 100 : 1));
      if (zoomInput) zoomInput.value = String(Math.round(state.zoom * 100));
      if (zoomValue) zoomValue.textContent = `${Math.round(state.zoom * 100)}%`;
      draw();
    }

    function reset() {
      state.yaw = -0.65;
      state.pitch = 0.34;
      state.zoom = 1;
      state.auto = !reducedMotion;
      state.showDomains = true;
      setZoom(100);
      updateAutoButton();
      updateDomainButton();
      setStatus('View reset');
      draw();
    }

    function frame(time) {
      const dt = Math.min(40, time - state.last);
      state.last = time;
      if (state.auto && !state.dragging) state.yaw += dt * 0.00045;
      draw();
      state.raf = requestAnimationFrame(frame);
    }

    molBtns.forEach(button => button.addEventListener('click', () => setMolecule(button.dataset.molecule)));
    rotateBtn?.addEventListener('click', () => {
      state.auto = !state.auto;
      updateAutoButton();
      setStatus(state.auto ? 'Auto rotation on' : 'Auto rotation paused');
    });
    domainsBtn?.addEventListener('click', () => {
      state.showDomains = !state.showDomains;
      updateDomainButton();
      setStatus(state.showDomains ? 'Lone-pair domains shown' : 'Lone-pair domains hidden');
      draw();
    });
    resetBtn?.addEventListener('click', reset);
    zoomInput?.addEventListener('input', event => setZoom(event.target.value));

    canvas.addEventListener('dblclick', reset);
    canvas.addEventListener('pointerdown', event => {
      state.dragging = true;
      state.px = event.clientX;
      state.py = event.clientY;
      canvas.setPointerCapture?.(event.pointerId);
      setStatus('Rotating molecule');
    });
    canvas.addEventListener('pointermove', event => {
      if (!state.dragging) return;
      const dx = event.clientX - state.px;
      const dy = event.clientY - state.py;
      state.px = event.clientX;
      state.py = event.clientY;
      state.yaw += dx * 0.012;
      state.pitch = Math.max(-1.35, Math.min(1.35, state.pitch + dy * 0.012));
      draw();
    });
    const endDrag = event => {
      if (!state.dragging) return;
      state.dragging = false;
      try { canvas.releasePointerCapture?.(event.pointerId); } catch (_) {}
      setStatus(`${state.data[state.key].formula}: ${state.data[state.key].geometry}`);
    };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('wheel', event => {
      event.preventDefault();
      setZoom((state.zoom * 100) + (event.deltaY < 0 ? 5 : -5));
    }, { passive: false });
    canvas.addEventListener('keydown', event => {
      const step = 0.10;
      if (event.key === 'ArrowLeft') { state.yaw -= step; event.preventDefault(); }
      else if (event.key === 'ArrowRight') { state.yaw += step; event.preventDefault(); }
      else if (event.key === 'ArrowUp') { state.pitch = Math.max(-1.35, state.pitch - step); event.preventDefault(); }
      else if (event.key === 'ArrowDown') { state.pitch = Math.min(1.35, state.pitch + step); event.preventDefault(); }
      else return;
      draw();
    });
    window.addEventListener('resize', draw);

    setMolecule('CH4', false);
    updateAutoButton();
    updateDomainButton();
    setZoom(100);
    loadData();
    state.raf = requestAnimationFrame(frame);
  }

  window.MoleculeViewer = { init };
})();
