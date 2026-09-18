const documents = [
  {
    category: "Shooting Document",
    name: "Script Final Draft",
    description: "Naskah Final terbaru 14/09/2026",
    files: [
      { name: "Final Draft Revisi 1", file: "assets/FIX 2_Malamar Gawian_Revised 01 Final Draft_20260914.pdf" }
    ]
  },
  {
    category: "Shooting Document",
    name: "Character Bible",
    description: "Character Bible terbaru 15/09/2026",
    files: [
      { name: "Character Bible draft 2", file: "assets/Character Bible_Malamar Gawian Draft 02.pdf" }
    ]
  },
  {
    category: "Shooting Document",
    name: "Production Breakdown",
    description: "Breakdown kebutuhan produksi",
    files: [
      { name: "Master Breakdown", file: "https://docs.google.com/spreadsheets/d/1H3bndVZ1mIDCqQ_J5QjAFw8brcTymQHLGMUHy3IsnY8/htmlembed?gid=1428216985&single=true&widget=false" },
      { name: "Script Breakdown Sheet", file: "https://docs.google.com/spreadsheets/d/1a2urSseE0H86rR5A33RfvJ-EexvgXATvwCVkVnPg_ds/preview" },
      { name: "Cast Breakdown", file: "https://docs.google.com/spreadsheets/d/1H3bndVZ1mIDCqQ_J5QjAFw8brcTymQHLGMUHy3IsnY8/htmlembed?gid=730519025&single=true&widget=false" }
    ]
  },
{
    category: "Shooting Document",
    name: "Storyboard",
    description: "Kumpulan Storyboard",
    files: [
      { name: "Storyboard Draft 2", file: "assets/Storyboard-draft2.pdf" }
    ]
  },
  {
    category: "Shooting Document",
    name: "Production Book",
    description: "Kumpulan Production Book",
    files: [
      { name: "Production Book", file: "https://www.canva.com/design/DAHUtFMoKiQ/DDtuLjiynOTdCV1T-wnVdw/view?embed" }
    ]
  },
  {
    category: "Shooting Document",
    name: "PPM",
    description: "Dokumen display PPM 1,2 dan FPPM",
    files: [
      { name: "Deck PPM 1 [PDF]", file: "https://drive.google.com/file/d/1yXpYzidTvo30qBhCvXeXjVcnqLO2cact/preview" },
      { name: "Deck PPM 1 [SLIDESHOW]", file: "https://www.canva.com/design/DAHUPnv1Wrg/exb_QwFsWBRBEqBv9ANH0Q/view?embed" },
      { name: "Notulensi PPM 2", file: "https://docs.google.com/document/d/1w7dZwCVzG4HHn5sfeJxBOr4BvhnlfMaDsA-DoS9V3CI/preview" },
      { name: "Record PPM 2", file: "https://drive.google.com/file/d/16GWuxYNJmfHRc6JD5jL85JncvWHaqeoW/preview" }
    ]
  },
  {
    category: "Schedule",
    name: "Production Timeline",
    description: "Timeline kru & timeline talent",
    files: [
      { name: "Production Timeline", file: "https://docs.google.com/spreadsheets/d/14a24qJKKKdss3G4HLF3qXw9HgH5XrSPzg5MhBBv04co/htmlembed?gid=0&single=true&widget=false" },
      { name: "Talent Timeline", file: "https://docs.google.com/spreadsheets/d/14a24qJKKKdss3G4HLF3qXw9HgH5XrSPzg5MhBBv04co/htmlembed?gid=145818722&single=true&widget=false" }
    ]
  },
  {
    category: "Schedule",
    name: "Shooting Schedule",
    description: "Jadwal shooting produksi",
    files: [
      { name: "Shooting Schedule", file: "https://docs.google.com/spreadsheets/d/1H3bndVZ1mIDCqQ_J5QjAFw8brcTymQHLGMUHy3IsnY8/htmlembed?gid=729014959&single=true&widget=false" }
    ]
  },
  {
    category: "Schedule",
    name: "Callsheet",
    description: "Jadwal harian shooting & recce",
    files: [
      { name: "Callsheet All day & Stripboard", file: "https://docs.google.com/spreadsheets/d/1bUycb8FNiVQ-ukYm8MQHGWTOeU6pCZU-6FMvRrS2i_c/preview" },
      { name: "Recce", file: "https://drive.google.com/file/d/16OyftC0lsZ8fZ8j3CBbqwC1O1XbiaJfS/preview" }
    ]
  },
  {
    category: "Schedule",
    name: "Talent Schedule",
    description: "Jadwal harian talent",
    files: [
      { name: "Talent Calendar", file: "https://docs.google.com/spreadsheets/d/1jNVwNmAFc9Pv8CxkUOae9zQY0_jg5Sff/preview" },
    ]
  },
  {
    category: "Man Behind the Film",
    name: "Crew List",
    description: "Daftar kru produksi lengkap",
    files: [
      { name: "Crew List", file: "https://docs.google.com/spreadsheets/d/146ImwxB4C1qiWp4z-bErnRfu3puE9IKHLo5e-EM5VCA/edit?usp=sharing" }
    ]
  },
  {
    category: "Man Behind the Film",
    name: "Talent List",
    description: "Daftar talent & kontak",
    files: [
      { name: "Talent List", file: "pdf/talent-list.pdf" }
    ]
  },
  {
    category: "Production",
    name: "Location List",
    description: "Daftar & denah lokasi",
    files: [
      { name: "Denah Lokasi", file: "images/denah copy.jpg" },
      { name: "Rumah Izai [Rumah Said BJB]",
        file: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.467031332893!2d114.82083469999998!3d-3.4786403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de687006e4ac47f%3A0xc94b602785556692!2sUpa%20pempek!5e0!3m2!1sen!2sid!4v1789320028245!5m2!1sen!2sid" },
      { name: "Rumah Ubay [Rumah Mama Ela BJB]",
        file: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d497.82566107943546!2d114.8256817!3d-3.4457633!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de681001edcff95%3A0x9ee33bc699d7583d!2sPutera%20Mahbara%20Advertising!5e0!3m2!1sen!2sid!4v1789366249401!5m2!1sen!2sid" },
      { name: "Kafe [Belmus Cafe BJB]",
        file: "https://maps.google.com/maps?q=Belmus+Coffee+and+Eatery+Banjarbaru&output=embed" },
        { name: "Sungai Pekauman Ulu",
        file: "https://maps.google.com/maps?q=-3.398283,114.844417&output=embed" },
        { name: "Ruko Kosong [Pasar Sekumpul MTP]",
        file: "https://maps.google.com/maps?q=-3.4215168,114.847986&output=embed" },
        { name: "Rumah Kai Pananamba & Urang Pintar [Pekauman Ulu]",
        file: "https://maps.google.com/maps?q=-3.398967,114.844791&output=embed" },
        { name: "Taman Irigasi Sekumpul",
        file: "https://maps.google.com/maps?q=-3.4255905,114.8525605&output=embed" },
        { name: "Ruangan Seminar [Aula Disbudporapar Banjar]",
        file: "https://maps.google.com/maps?q=-3.411014,114.848828&output=embed" }
    ]
  },
  {
    category: "Art",
    name: "Props List",
    description: "Daftar master properti",
    files: [
      { name: "Props List", file: "pdf/props-list.pdf" }
    ]
  },
  {
    category: "Costume & Make Up",
    name: "Costume",
    description: "Konsep kostum & Make up",
    files: [
      { name: "Costume Concept", file: "pdf/costume-list.pdf" }
    ]
  },
  {
    category: "Camera & Sound",
    name: "Visual Mood, Shotlist, & Equipment List",
    description: "ya itulah isinya",
    files: [
      { name: "Visual Mood", file: "https://drive.google.com/file/d/1RtbT2SpR7vKe1PKYw4nIPvyi04T9UNi4/preview" },
      { name: "Shotlist", file: "https://docs.google.com/spreadsheets/d/1z6kSWAS8mhrFGZrG97zTThultuZ3ENBgptdsTcq4hl8/preview" },
      { name: "Equipment List", file: "pdf/equipment-list.pdf" }
    ]
  },
    {
    category: "Sponsor & Partner",
    name: "Proposal",
    description: "Proposal Sponsor & Dukungan",
    files: [
      { name: "Proposal", file: "assets/Proposal Malamar Gawian.pdf" },
      { name: "Tanda Terima Proposal", file: "https://docs.google.com/spreadsheets/d/1d-Ph8mqWI_RHa_YGdYHyw-f5tyjVVs-j7w0d5Badtm4/edit?usp=sharing" }
    ]
  }
];

let currentCategory = "Semua";
let searchQuery = "";

const content = document.getElementById("content");
const documentCount = document.getElementById("documentCount");
const filterPills = document.getElementById("filterPills");
const searchBox = document.getElementById("searchBox");
const modal = document.getElementById("pdfModal");
const tabs = document.getElementById("tabs");
const pdfViewer = document.getElementById("pdfViewer");
const documentTitle = document.getElementById("documentTitle");
const openPdf = document.getElementById("openPdf");
const viewerFrame = document.getElementById("viewerFrame");
const zoomLevel = document.getElementById("zoomLevel");

function getFileType(fileName) {
  if (fileName.includes("canva.com")) return "CANVA";
  if (fileName.includes("spreadsheets") || fileName.includes("htmlembed")) return "SHEET";
  if (fileName.includes(".jpg") || fileName.includes(".jpeg") || fileName.includes(".png")) return "IMG";
  if (fileName.includes("google.com/maps")) return "MAPS";
  return "DOC";
}

function initFilterPills() {
  const categories = ["Semua", ...new Set(documents.map(d => d.category))];
  filterPills.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `pill ${cat === currentCategory ? "active" : ""}`;
    btn.textContent = cat;
    btn.onclick = () => {
      currentCategory = cat;
      document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      renderDocuments();
    };
    filterPills.appendChild(btn);
  });
}

function renderDocuments() {
  const filtered = documents.filter(doc => {
    const matchesCategory = currentCategory === "Semua" || doc.category === currentCategory;
    
    // Cek apakah kata kunci pencarian cocok dengan nama dokumen, deskripsi, kategori, ATAU nama file sub-menu di dalamnya
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery) ||
                          doc.description.toLowerCase().includes(searchQuery) ||
                          doc.category.toLowerCase().includes(searchQuery) ||
                          doc.files.some(file => file.name.toLowerCase().includes(searchQuery));
                          
    return matchesCategory && matchesSearch;
  });

  documentCount.textContent = `${filtered.length} dokumen`;
  content.innerHTML = "";

  if (filtered.length === 0) {
    content.innerHTML = `<div class="no-results">Tidak ada dokumen ditemukan dengan kata kunci "${searchQuery}".</div>`;
    return;
  }

  const groups = {};
  filtered.forEach(doc => {
    if (!groups[doc.category]) groups[doc.category] = [];
    groups[doc.category].push(doc);
  });

  Object.entries(groups).forEach(([category, items]) => {
    const section = document.createElement("section");
    section.className = "section";

    const title = document.createElement("div");
    title.className = "section-title";
    title.textContent = category;

    const grid = document.createElement("div");
    grid.className = "grid";

    items.forEach(doc => {
      const card = document.createElement("article");
      card.className = "card";
      const fileType = getFileType(doc.files[0]?.file || "");

      card.innerHTML = `
        <div class="card-header-row">
          <div class="card-title">${doc.name}</div>
          <div class="card-badges">
            <span class="type-badge">${fileType}</span>
            <span style="font-size: 9px; color: var(--muted);">${doc.files.length} file</span>
          </div>
        </div>
        <div class="card-description">${doc.description}</div>
      `;

      card.onclick = () => openPreview(doc);
      grid.appendChild(card);
    });

    section.appendChild(title);
    section.appendChild(grid);
    content.appendChild(section);
  });
}

searchBox.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderDocuments();
});

function openDirectDoc(name) {
  const doc = documents.find(d => d.name === name);
  if (doc) openPreview(doc);
}

function openPreview(documentData) {
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
  tabs.innerHTML = "";

  documentData.files.forEach((file, index) => {
    const tab = document.createElement("button");
    tab.className = "tab" + (index === 0 ? " active" : "");
    tab.textContent = file.name;
    tab.onclick = () => selectFile(documentData, file, tab);
    tabs.appendChild(tab);
  });

  selectFile(documentData, documentData.files[0], tabs.children[0]);
}

function selectFile(documentData, file, selectedTab) {
  if (file.isExternal || file.file.includes("maps.app.goo.gl")) {
    window.open(file.file, "_blank");
    return;
  }

  Array.from(tabs.children).forEach(tab => tab.classList.remove("active"));
  selectedTab.classList.add("active");

  const isMaps = file.file.includes("google.com/maps/embed");

  // Reset ukuran kontainer secara paksa
  viewerFrame.style.width = "100%";
  viewerFrame.style.height = "100%";
  pdfViewer.style.width = "100%";
  pdfViewer.style.height = "100%";

  if (isMaps) {
    zoom = 1;
    zoomLevel.textContent = "100%";
    pdfViewer.style.transform = "none";
  } else {
    setZoom(1);
  }

  pdfViewer.src = file.file;
  documentTitle.textContent = `${documentData.name} · ${file.name}`;
  openPdf.href = file.file;
}

function closePreview() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
  pdfViewer.src = "";
}

/* Zoom Handlers */
let zoom = 1;
function updateZoom() {
  if (pdfViewer.src && pdfViewer.src.includes("google.com/maps/embed")) {
    viewerFrame.style.width = "100%";
    viewerFrame.style.height = "100%";
    pdfViewer.style.transform = "none";
    return;
  }

  zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
  viewerFrame.style.width = `${100 / zoom}%`;
  viewerFrame.style.height = `${100 / zoom}%`;
  pdfViewer.style.transformOrigin = "top left";
  pdfViewer.style.transform = `scale(${zoom})`;
}

function setZoom(val) {
  zoom = Math.min(2, Math.max(0.5, val));
  updateZoom();
}

document.getElementById("zoomIn").onclick = () => setZoom(zoom + 0.1);
document.getElementById("zoomOut").onclick = () => setZoom(zoom - 0.1);
document.getElementById("zoomReset").onclick = () => setZoom(1);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePreview();
});

initFilterPills();
renderDocuments();