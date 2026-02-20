document.addEventListener('DOMContentLoaded', () => {
    let characters = manualData;
    let activeTags = new Set();
    let activeRarity = 'all';

    // 1. Loading Screen
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1500);
    }

    // 2. Initialize Page
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

        // Search Event
        document.getElementById('search-input').addEventListener('input', (e) => {
            filterData();
        });

        // Rarity Filter Event
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                btn.classList.add('active');
                activeRarity = btn.dataset.rarity;
                filterData();
            });
        });
    }

    function renderTags() {
        const tagsList = document.getElementById('tags-list');
        const allTags = new Set();
        characters.forEach(char => char.tags.forEach(tag => allTags.add(tag)));

        allTags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.textContent = tag;
            tagEl.onclick = () => {
                tagEl.classList.toggle('active');
                if (activeTags.has(tag)) activeTags.delete(tag);
                else activeTags.add(tag);
                filterData();
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
                <div class="thumb-container">
                    <img src="${char.mainImage}" alt="${char.name}" loading="lazy">
                </div>
                <div class="char-info">
                    <div class="char-name">${char.name}</div>
                    <div class="rarity-badge rarity-${char.rarity}">${char.rarity}</div>
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
            <div class="main-image-container">
                <img src="${char.mainImage}" alt="${char.name}" id="main-view">
            </div>
            
            <div class="detail-info">
                <div class="detail-header">
                    <h1 class="detail-name">${char.name}</h1>
                    <p class="detail-nickname">"${char.nickname}"</p>
                    <div class="rarity-badge rarity-${char.rarity}" style="font-size: 1.2rem">RANK ${char.rarity}</div>
                </div>

                <div class="tags-container">
                    ${char.tags.map(t => `<span class="tag active">${t}</span>`).join('')}
                </div>

                <div class="story-box">
                    <h3>STORY</h3>
                    <p>${char.story}</p>
                </div>

                <div class="extra-images-section">
                    <h3>GALLERY</h3>
                    <div class="slider-container">
                        <img src="${char.extraImages[0]}" class="extra-img" onclick="openModal(this.src)">
                        <img src="${char.mainImage}" class="extra-img center" onclick="openModal(this.src)">
                        <img src="${char.extraImages[1]}" class="extra-img" onclick="openModal(this.src)">
                    </div>
                    <p style="text-align:center; font-size: 0.8rem; color: #888; margin-top: 10px;">Tap image to enlarge</p>
                </div>
            </div>
        `;

        setupModal();
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
        window.onclick = (event) => {
            if (event.target == modal) modal.style.display = "none";
        };
    }
});
