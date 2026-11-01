// DATA ARRAY AI TOOLS
const aiToolsData = [
  {
    id: 1,
    name: "ChatGPT",
    category: "Writing",
    description: "Model bahasa AI generatif untuk penulisan, percakapan, dan pemecahan masalah.",
    icon: "fa-solid fa-comments",
    pricing: "Free / Freemium",
    featured: true,
    popular: true,
    isNew: false,
    url: "https://chat.openai.com"
  },
  {
    id: 2,
    name: "Midjourney",
    category: "Image",
    description: "Generasi gambar resolusi tinggi realistis berdasarkan instruksi teks (prompt).",
    icon: "fa-solid fa-image",
    pricing: "Paid",
    featured: true,
    popular: true,
    isNew: false,
    url: "https://midjourney.com"
  },
  {
    id: 3,
    name: "GitHub Copilot",
    category: "Coding",
    description: "Asisten pemrogram AI yang memberikan saran autocomplete kode secara real-time.",
    icon: "fa-solid fa-code",
    pricing: "Paid",
    featured: true,
    popular: true,
    isNew: false,
    url: "https://github.com/features/copilot"
  },
  {
    id: 4,
    name: "Runway Gen-2",
    category: "Video",
    description: "Platform AI untuk membuat dan mengedit video berkualitas bioskop dari teks.",
    icon: "fa-solid fa-video",
    pricing: "Freemium",
    featured: false,
    popular: true,
    isNew: true,
    url: "https://runwayml.com"
  },
  {
    id: 5,
    name: "Jasper AI",
    category: "Writing",
    description: "Asisten copywriting AI khusus untuk tim pemasaran dan pembuat konten.",
    icon: "fa-solid fa-pen-nib",
    pricing: "Paid",
    featured: false,
    popular: false,
    isNew: false,
    url: "https://jasper.ai"
  },
  {
    id: 6,
    name: "v0 by Vercel",
    category: "Coding",
    description: "Generasi antarmuka pengguna UI React & Tailwind CSS secara instan berbasis AI.",
    icon: "fa-solid fa-laptop-code",
    pricing: "Freemium",
    featured: false,
    popular: false,
    isNew: true,
    url: "https://v0.dev"
  },
  {
    "id": 7,
    "name": "agent-qa",
    "category": "Coding",
    "description": "QA web dan aplikasi seluler dengan bahasa alami dari vostride, mesin memori, dan peningkatan mandiri. Rilis awal; Node.js 24+. FSL-1.1-ALv2 membatasi penggunaan komersial yang bersaing. Biaya model dan perangkat terpisah.",
    "icon": "fa-solid fa-flask",
    "pricing": "Gratis sesuai lisensi",
    "featured": false,
    "popular": false,
    "isNew": false,
    "url": "https://vostride.com"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  let activeCategory = 'all';
  let activeTab = 'all';
  let searchQuery = '';

  const toolsGrid = document.getElementById('toolsGrid');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearch');
  const pills = document.querySelectorAll('.pill');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const themeToggle = document.getElementById('themeToggle');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModal = document.getElementById('closeModal');
  const modalBody = document.getElementById('modalBody');

  // Theme Switcher
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.querySelector('i').className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });

  // Render Function
  function renderTools() {
    toolsGrid.innerHTML = '';

    const filtered = aiToolsData.filter(tool => {
      // Category Filter
      const matchCategory = activeCategory === 'all' || tool.category === activeCategory;
      // Tab Filter
      const matchTab = activeTab === 'all' || 
                       (activeTab === 'featured' && tool.featured) ||
                       (activeTab === 'popular' && tool.popular) ||
                       (activeTab === 'new' && tool.isNew);
      // Search Filter
      const matchSearch = tool.name.toLowerCase().includes(searchQuery) || 
                          tool.description.toLowerCase().includes(searchQuery);

      return matchCategory && matchTab && matchSearch;
    });

    if (filtered.length === 0) {
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      filtered.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.innerHTML = `
          <div>
            <div class="tool-header">
              <div class="tool-icon"><i class="${tool.icon}"></i></div>
              <div class="tool-title">
                <h3>${tool.name}</h3>
                <span class="category-tag">${tool.category}</span>
              </div>
            </div>
            <p class="tool-desc">${tool.description}</p>
          </div>
          <div class="tool-footer">
            <span class="pricing-badge">${tool.pricing}</span>
            <div class="badges-wrap">
              ${tool.featured ? '<span class="status-badge">Featured</span>' : ''}
              ${tool.isNew ? '<span class="status-badge">New</span>' : ''}
            </div>
          </div>
        `;
        card.addEventListener('click', () => openModal(tool));
        toolsGrid.appendChild(card);
      });
    }
  }

  // Event Listeners for Filters
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    renderTools();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderTools();
  });

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderTools();
    });
  });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.getAttribute('data-tab');
      renderTools();
    });
  });

  // Modal Functions
  function openModal(tool) {
    modalBody.innerHTML = `
      <div class="tool-header">
        <div class="tool-icon"><i class="${tool.icon}"></i></div>
        <div class="tool-title">
          <h2>${tool.name}</h2>
          <span class="category-tag">${tool.category}</span>
        </div>
      </div>
      <p style="margin: 20px 0; color: var(--text-muted);">${tool.description}</p>
      <p><strong>Pricing:</strong> ${tool.pricing}</p>
      <a href="${tool.url}" target="_blank" class="modal-link-btn">Visit Website <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    `;
    modalOverlay.style.display = 'flex';
  }

  closeModal.addEventListener('click', () => modalOverlay.style.display = 'none');
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.style.display = 'none';
  });

  // Initial Render
  renderTools();
});