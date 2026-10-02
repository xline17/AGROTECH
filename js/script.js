// Memastikan DOM telah dimuat sempurna sebelum JS dijalankan
document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================
       1. Mobile Navigation Toggle Menu (Pure JS)
    ==================================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Menutup menu mobile ketika item navigasi diklik
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    /* ====================================================
       2. Logika Kalkulator Pertanian (Pure JS)
    ==================================================== */
    const cropTypeSelect = document.getElementById('cropType');
    const landSizeInput = document.getElementById('landSize');
    const btnCalculate = document.getElementById('btnCalculate');
    const resFertilizer = document.getElementById('resFertilizer');
    const resHarvest = document.getElementById('resHarvest');

    // Data rasio pupuk (kg/ha) & estimasi hasil panen (ton/ha)
    const cropData = {
        padi: { fertilizerRate: 200, harvestRate: 6.5 },
        jagung: { fertilizerRate: 250, harvestRate: 8.0 },
        cabai: { fertilizerRate: 300, harvestRate: 12.0 },
        tomat: { fertilizerRate: 280, harvestRate: 15.0 }
    };

    function calculateYield() {
        const selectedCrop = cropTypeSelect.value;
        const size = parseFloat(landSizeInput.value) || 0;

        if (size <= 0) {
            resFertilizer.textContent = '0 Kg';
            resHarvest.textContent = '0 Ton';
            return;
        }

        const data = cropData[selectedCrop] || cropData.padi;
        const totalFertilizer = Math.round(data.fertilizerRate * size);
        const totalHarvest = (data.harvestRate * size).toFixed(1);

        resFertilizer.textContent = `${totalFertilizer} Kg`;
        resHarvest.textContent = `${totalHarvest} Ton`;
    }

    if (btnCalculate) {
        btnCalculate.addEventListener('click', calculateYield);
    }

    /* ====================================================
       3. Filtering Produk (Pure JS)
    ==================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus kelas 'active' dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan kelas 'active' pada tombol yang diklik
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ====================================================
       4. Modal Pop-up (Pure JS)
    ==================================================== */
    const buyButtons = document.querySelectorAll('.btn-icon');
    const modal = document.getElementById('modalBuy');
    const modalClose = document.getElementById('modalClose');
    const modalOkBtn = document.getElementById('modalOkBtn');

    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modal) modal.classList.add('show');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    if (modalOkBtn) {
        modalOkBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    // Menutup modal jika area di luar kotak modal diklik
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    /* ====================================================
       5. Highlight Active Link berdasarkan Scroll
    ==================================================== */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});