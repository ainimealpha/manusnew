document.addEventListener('DOMContentLoaded', () => {
    let characters = manualData;
    let activeTags = new Set();
    let activeRarity = 'all';

    // 1. Decorative Loading Screen
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }, 1800);
    }

    // 2. Page Router
    const galleryGrid = document.getElementById('gallery-grid');
    const detailContent = document.getElementById('detail-content');

    if (galleryGrid) {
        initGallery();
    } else if (detailContent) {
        initDetail();
    }

    // --- GALLERY LOGIC ---
    function initGallery() {
        renderTags();
        renderGallery(characters);
        setupDrawer();

        document.getElementById('search-input').addEventListener('input', () => filterData());

        document.querySelectorAll('.chip[data-rarity]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.chip[data-rarity].active').classList.remove('active');
                btn.classList.add('active');
                activeRarity = btn.dataset.rarity;
            });
        });

        document.getElementById('apply-filter').addEventListener('click', () => {
            filterData();
            closeDrawer();
        });

        document.getElementById('reset-filter').addEventListener('click', () => {
            activeTags.clear();
            activeRarity = 'all';
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            document.querySelector('.chip[data-rarity="all"]').classList.add('active');
            document.getElementById('search-input').value = '';
            filterData();
        });
    }

    function setupDrawer() {
        const drawer = document.getElementById('filter-drawer');
        const toggle = document.getElementById('filter-toggle');
        const close = document.getElementById('close-drawer');
        toggle.onclick = () => drawer.classList.add('open');
        close.onclick = () => drawer.classList.remove('open');
        window.closeDrawer = () => drawer.classList.remove('open');
    }

    function renderTags() {
        const tagsList = document.getElementById('tags-list');
        const allTags = new Set();
        characters.forEach(char => char.tags.forEach(tag => allTags.add(tag)));
        allTags.forEach(tag => {
            const tagEl = document.createElement('div');
            tagEl.className = 'chip';
            tagEl.textContent = tag;
            tagEl.onclick = () => {
                tagEl.classList.toggle('active');
                if (activeTags.has(tag)) activeTags.delete(tag);
                else activeTags.add(tag);
            };
            tagsList.appendChild(tagEl);
        });
    }

    function filterData() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filtered = characters.filter(char => {
            const matchesSearch = char.name.toLowerCase().includes(searchTerm) || 
                                char.nickname.toLowerCase().includes(searchTerm);
            const matchesRarity = activeRarity === 'all' || char.rarity === activeRarity;
            const matchesTags = activeTags.size === 0 || [...activeTags].every(t => char.tags.includes(t));
            return matchesSearch && matchesRarity && matchesTags;
        });
        renderGallery(filtered);
    }

    function renderGallery(data) {
        galleryGrid.innerHTML = '';
        data.forEach(char => {
            const card = document.createElement('div');
            card.className = 'char-card';
            card.onclick = () => {
                localStorage.setItem('selectedCharId', char.id);
                window.location.href = 'detail.html';
            };
            card.innerHTML = `
                <img src="${char.mainImage}" alt="${char.name}" loading="lazy">
                <div class="card-overlay">
                    <div class="card-name">${char.name}</div>
                    <div class="card-rarity">${char.rarity}</div>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }

    // --- DETAIL LOGIC ---
    function initDetail() {
        const charId = localStorage.getItem('selectedCharId');
        const char = characters.find(c => c.id == charId) || characters[0];

        detailContent.innerHTML = `
            <section class="hero-section">
                <img src="${char.mainImage}" class="hero-img">
                <div class="hero-mask"></div>
            </section>
            <section class="info-section">
                <div class="detail-title">
                    <h1>${char.name}</h1>
                    <p>"${char.nickname}"</p>
                    <div class="card-rarity" style="font-size: 0.8rem; padding: 5px 15px;">RANK ${char.rarity}</div>
                </div>
                <div class="tags-chips" style="margin-top: 20px;">
                    ${char.tags.map(t => `<span class="chip active">${t}</span>`).join('')}
                </div>
                <div class="story-text">${char.story}</div>
                <div class="carousel-section">
                    <h3 class="gallery-title">GALLERY</h3>
                    <div class="carousel-container" id="carousel"></div>
                </div>
            </section>
        `;

        setupInfiniteCarousel(char);
        setupAutoHideNav();
        setupModal();
    }

    function setupInfiniteCarousel(char) {
        const container = document.getElementById('carousel');
        const images = [char.extraImages[0], char.mainImage, char.extraImages[1]];
        let currentIndex = 1;

        function renderCarousel() {
            container.innerHTML = '';
            images.forEach((src, i) => {
                const img = document.createElement('img');
                img.src = src;
                img.className = 'carousel-item';
                if (i === currentIndex) {
                    img.classList.add('active');
                    img.onclick = () => openModal(src);
                } else {
                    img.classList.add(i < currentIndex ? 'side-left' : 'side-right');
                    img.classList.add('side');
                    img.onclick = () => {
                        currentIndex = i;
                        renderCarousel();
                    };
                }
                container.appendChild(img);
            });
        }
        renderCarousel();
    }

    function setupAutoHideNav() {
        const nav = document.getElementById('auto-hide-nav');
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                nav.classList.add('nav-hidden');
            } else {
                nav.classList.remove('nav-hidden');
            }
            lastScrollY = window.scrollY;
        });
    }

    function setupModal() {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-img');
        const closeBtn = document.querySelector('.close-modal');
        window.openModal = (src) => {
            modal.style.display = "flex";
            modalImg.src = src;
        };
        closeBtn.onclick = () => modal.style.display = "none";
        window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
    }
});
