// Instituto DERMA90 - Main JavaScript
// =====================================

// Sticky Header & Bar Bottom
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const stickyBarBottom = document.getElementById('sticky-bar-bottom');
    
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
    
    if (stickyBarBottom) {
        // Mostrar después de scroll de 600px (después de ver el dolor)
        if (window.scrollY > 600) {
            stickyBarBottom.classList.add('visible');
        } else {
            stickyBarBottom.classList.remove('visible');
        }
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Stock Counter (simulated - replace with real API)
let currentStock = 150;

function updateStockDisplay() {
    const stockElements = document.querySelectorAll('[id^="stock-restantes"], [id*="stock"]');
    stockElements.forEach(el => {
        if (el.id.includes('stock')) {
            el.textContent = currentStock;
        }
    });
}

// Initialize stock
updateStockDisplay();

// Stock can be updated via backend
window.updateStock = function(newStock) {
    currentStock = newStock;
    updateStockDisplay();
};

// Form Validation Helper
window.validateEmail = function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Local Storage Helper for Lead Tracking
window.saveLeadData = function(data) {
    try {
        localStorage.setItem('derma90_lead', JSON.stringify({
            ...data,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.error('Could not save lead data:', e);
    }
};

window.getLeadData = function() {
    try {
        const data = localStorage.getItem('derma90_lead');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Could not retrieve lead data:', e);
        return null;
    }
};

// Testimonials Rotation (optional)
const testimonials = document.querySelectorAll('.testimonial-card');
if (testimonials.length > 0) {
    // Can add auto-rotation logic here if needed
}

// Mobile Menu Toggle (if implemented)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('mobile-open');
    });
}

// Console branding
console.log('%cInstituto DERMA90', 'font-size: 24px; font-weight: bold; color: #c67856;');
console.log('%cProtocolo SŌMA 12 Semanas', 'font-size: 14px; color: #4a4a4a;');
console.log('');
console.log('Desarrollado con investigación profunda en consumer psychology.');
console.log('');

// Expose version
window.DERMA90_VERSION = '2.0.0';
