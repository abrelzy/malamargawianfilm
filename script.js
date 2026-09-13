const documents = [
  {
    category: "Shooting Document",
    name: "Script Final Draft",
    description: "Naskah Final terbaru 07/09/2026",
    files: [
      { name: "Final Draft", file: "https://drive.google.com/file/d/1S4RNCFppn2bkuyowzNZXOANrKF_oA8ee/preview" }
    ]
  },
  {
    category: "Shooting Document",
    name: "Production Breakdown",
    description: "Breakdown kebutuhan produksi",
    files: [
      { name: "Master Breakdown", file: "https://docs.google.com/spreadsheets/d/1H3bndVZ1mIDCqQ_J5QjAFw8brcTymQHLGMUHy3IsnY8/htmlembed?gid=1428216985&single=true&widget=false" }
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
    description: "Dokumen display PPM 1",
    files: [
      { name: "Deck PPM 1 [PDF]", file: "https://drive.google.com/file/d/1yXpYzidTvo30qBhCvXeXjVcnqLO2cact/preview" },
      { name: "Deck PPM 1 [SLIDESHOW]", file: "https://www.canva.com/design/DAHUPnv1Wrg/exb_QwFsWBRBEqBv9ANH0Q/view?embed" }
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
      { name: "Recce", file: "https://drive.google.com/file/d/16OyftC0lsZ8fZ8j3CBbqwC1O1XbiaJfS/preview" }
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
      { name: "Denah Lokasi", file: "images/denah.jpg" },
      { 
        name: "Rumah Izai [BJB]",
        file: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.467031332893!2d114.82083469999998!3d-3.4786403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de687006e4ac47f%3A0xc94b602785556692!2sUpa%20pempek!5e0!3m2!1sen!2sid!4v1789320028245!5m2!1sen!2sid",
        isExternal: true 
      }
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
    description: "Konsep kostum & wardrobe",
    files: [
      { name: "Costume Concept", file: "pdf/wardrobe-list.pdf" }
    ]
  },
  {
    category: "Equipment",
    name: "Equipment List",
    description: "Daftar alat kamera & sound",
    files: [
      { name: "Equipment List", file: "pdf/equipment-list.pdf" }
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
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery) ||
                          doc.description.toLowerCase().includes(searchQuery) ||
                          doc.category.toLowerCase().includes(searchQuery);
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

  setZoom(1);
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