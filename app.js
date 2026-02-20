document.addEventListener('DOMContentLoaded', () => {
    let characters = manualData;
    let activeTags = new Set();
    let activeRarity = 'all';

    // 1. Loading Screen
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 600);
        }, 1200);
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

        // Search Event
        document.getElementById('search-input').addEventListener('input', (e) => {
            filterData();
        });

        // Rarity Filter Event
        document.querySelectorAll('.chip[data-rarity]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.chip[data-rarity].active').classList.remove('active');
                btn.classList.add('active');
                activeRarity = btn.dataset.rarity;
            });
        });

        // Apply Filter Button
        document.getElementById('apply-filter').addEventListener('click', () => {
            filterData();
            closeDrawer();
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
                    <div class="card-rarity rarity-${char.rarity}">${char.rarity}</div>
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
                    <div class="card-rarity rarity-${char.rarity}" style="font-size: 0.8rem; padding: 5px 15px;">RANK ${char.rarity}</div>
                </div>

                <div class="tags-chips" style="margin-top: 20px;">
                    ${char.tags.map(t => `<span class="chip active">${t}</span>`).join('')}
                </div>

                <div class="story-text">
                    ${char.story}
                </div>

                <div class="carousel-section">
                    <div class="carousel-container" id="carousel">
                        <img src="${char.extraImages[0]}" class="carousel-item side-left" data-pos="0">
                        <img src="${char.mainImage}" class="carousel-item active" data-pos="1">
                        <img src="${char.extraImages[1]}" class="carousel-item side-right" data-pos="2">
                    </div>
                    <p style="text-align:center; font-size: 0.7rem; color: var(--text-dim); margin-top: 20px; letter-spacing: 2px;">TAP CENTER TO ENLARGE • SWIPE TO ROTATE</p>
                </div>
            </section>
        `;

        setupCarousel();
        setupModal();
    }

    function setupCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        let activeIndex = 1; // Center is active by default

        items.forEach((item, index) => {
            item.onclick = () => {
                if (item.classList.contains('active')) {
                    openModal(item.src);
                } else {
                    rotateCarousel(index);
                }
            };
        });

        function rotateCarousel(newActiveIndex) {
            items.forEach(item => {
                item.classList.remove('active', 'side-left', 'side-right');
            });

            items[newActiveIndex].classList.add('active');
            
            // Simple rotation logic for 3 items
            const leftIndex = (newActiveIndex + 2) % 3;
            const rightIndex = (newActiveIndex + 1) % 3;
            
            items[leftIndex].classList.add('side-left');
            items[rightIndex].classList.add('side-right');
        }
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
