/**
 * LUXESTUDIO — Main Application Orchestrator
 * Preloader, Global Studio Clock, Mobile Drawer, Clipboard, and Navigation
 */

function getHashTarget() {
    const hash = window.location.hash;
    if (!hash || hash === '#') return null;
    try {
        const id = decodeURIComponent(hash.slice(1));
        return document.getElementById(id);
    } catch (e) {
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 0. Scroll handling: preserve hash navigation, otherwise start from top
    if (!window.location.hash) {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    } else {
        setTimeout(() => {
            const target = getHashTarget();
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 220);
    }

    // 1. Initialize Motion Engine
    try {
        if (typeof initMotionEngine === 'function') {
            initMotionEngine();
        }
    } catch (e) {
        console.warn('Motion engine initialization warning:', e);
    }

    // 2. Preloader Animation
    try {
        initPreloader();
    } catch (e) {
        console.warn('Preloader initialization warning:', e);
        document.documentElement.classList.remove('is-loading');
        document.body.classList.add('loaded');
        const ldr = document.getElementById('loader');
        if (ldr) ldr.style.display = 'none';
    }

    // 3. Global Studio Live Time
    initGlobalClock();

    // 4. Mobile Navigation Drawer
    initMobileDrawer();

    // 5. Email Copy Functionality
    initEmailCopy();

    // 6. Smooth Scroll Anchors
    initSmoothAnchors();

    // 7. Page Visibility Listener
    initVisibilityListener();

    // 8. Work Archive Drawer (10 Real Projects)
    initWorkArchiveDrawer();

    // 9. Back To Top Button
    initBackToTop();

    // 10. Australia Contact Action Modal (Call / WhatsApp)
    initContactActionModal();
});

// Ensure top position on window load only when no hash is present
window.addEventListener('load', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    } else {
        setTimeout(() => {
            const target = getHashTarget();
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 120);
    }
});
window.addEventListener('beforeunload', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});

/* =========================================================
   CINEMATIC BRAND INTRO LOADER & HERO REVEAL TRANSITION
   ========================================================= */
function initPreloader() {
    const loader = document.getElementById('loader');
    const wordmark = document.getElementById('loaderWordmark');
    const line = document.getElementById('loaderLine');
    const taglines = document.querySelectorAll('.loader-tagline .lt-line');
    const paperVeil = document.getElementById('loaderPaperVeil');
    const stage = document.getElementById('loaderStage');

    if (!loader || !wordmark || !line || !paperVeil) {
        document.documentElement.classList.remove('is-loading');
        document.body.classList.add('loaded');
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
        return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Complete loader, unveil website, and initiate Hero entrance
    const dismissLoader = () => {
        if (loader.classList.contains('dismissed')) return;

        loader.classList.add('dismissed');
        document.documentElement.classList.remove('is-loading');
        document.body.classList.add('loaded');

        // Ensure user starts cleanly at top of Hero only if no hash is requested
        if (!window.location.hash) {
            window.scrollTo(0, 0);
            if (typeof lenisInstance !== 'undefined' && lenisInstance) {
                lenisInstance.scrollTo(0, { immediate: true });
            }
        }
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }

        // Complete DOM cleanup so loader never intercepts pointer/touch events
        setTimeout(() => {
            loader.style.display = 'none';
            loader.setAttribute('aria-hidden', 'true');
        }, 450);
    };

    // Reduced motion accessibility: brief reveal & fast fade
    if (prefersReducedMotion) {
        setTimeout(dismissLoader, 350);
        return;
    }

    // Safety fallback: never trap user under any circumstances
    const safetyTimeout = setTimeout(dismissLoader, 2400);

    // Sequence timing: ~1.4 - 1.6 seconds total
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({
            onComplete: () => {
                clearTimeout(safetyTimeout);
                dismissLoader();
            }
        });

        // 1. Initial full black state
        tl.set(loader, { backgroundColor: '#0B0B0B' })
          .set(wordmark, { opacity: 0, y: 10 })
          .set(line, { width: '0%', left: 0 })
          .set(taglines, { opacity: 0, y: 6 })
          .set(paperVeil, { clipPath: 'inset(50% 50% 50% 50%)', opacity: 0 });

        // 2. Wordmark entrance (520ms)
        tl.to(wordmark, {
            opacity: 1,
            y: 0,
            duration: 0.52,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }, '+=0.04');

        // 3. Thin orange line appears beneath it (360ms, draws left -> right)
        tl.to(line, {
            width: '100%',
            duration: 0.36,
            ease: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }, '-=0.16');

        // 4. Tagline reveal: CRAFTED TECH. / CURATED DESIGN. (380ms)
        tl.to(taglines, {
            opacity: 1,
            y: 0,
            duration: 0.38,
            stagger: 0.06,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }, '-=0.14');

        // 5. Brief hold on complete composition (160ms)
        tl.to({}, { duration: 0.16 });

        // 6. Signature Transition: Orange line expands & warm off-white canvas expands outward
        tl.to(line, {
            width: '100vw',
            left: '-50vw',
            opacity: 0.75,
            duration: 0.30,
            ease: 'cubic-bezier(0.77, 0, 0.175, 1)'
        });

        tl.to(paperVeil, {
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.38,
            ease: 'cubic-bezier(0.77, 0, 0.175, 1)'
        }, '-=0.26');

        tl.to(stage, {
            opacity: 0,
            y: -10,
            duration: 0.22,
            ease: 'power2.in'
        }, '-=0.32');
    } else {
        // Lightweight Vanilla CSS transition fallback
        wordmark.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        wordmark.style.opacity = '1';
        wordmark.style.transform = 'translateY(0)';

        setTimeout(() => {
            line.style.transition = 'width 0.48s ease';
            line.style.width = '100%';
        }, 500);

        setTimeout(() => {
            taglines.forEach(t => {
                t.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                t.style.opacity = '1';
                t.style.transform = 'translateY(0)';
            });
        }, 800);

        setTimeout(dismissLoader, 1500);
    }
}

/* Live Global Studio Clock */
function initGlobalClock() {
    const clockElements = document.querySelectorAll('.live-studio-time');
    if (clockElements.length === 0) return;

    function updateClocks() {
        const now = new Date();
        // Global UTC studio standard
        const utcHours = String(now.getUTCHours()).padStart(2, '0');
        const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
        const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
        
        const timeString = `${utcHours}:${utcMinutes}:${utcSeconds} UTC`;

        clockElements.forEach((el) => {
            el.textContent = timeString;
        });
    }

    updateClocks();
    setInterval(updateClocks, 1000);
}

/* Mobile Drawer & Editorial Navigation */
function initMobileDrawer() {
    const toggleBtn = document.getElementById('menuToggleBtn') || document.querySelector('.menu-toggle');
    const drawer = document.getElementById('mobileMenuDrawer');
    const closeBtn = document.getElementById('mobileMenuCloseBtn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item, .mobile-start-project-btn, .mobile-menu-logo');
    const navItems = document.querySelectorAll('.mobile-nav-item');
    const nodeDot = document.getElementById('menuNodeDot');
    const nodeRing = document.getElementById('menuNodeRing');

    if (!drawer) return;

    // Technical diagram sector coordinates corresponding to nav items
    const sectorCoords = [
        { cx: 120, cy: 75 },   // 01 WORK (Top)
        { cx: 200, cy: 155 },  // 02 SERVICES (Right)
        { cx: 120, cy: 235 },  // 03 STUDIO (Bottom)
        { cx: 40,  cy: 155 }   // 04 CONTACT (Left)
    ];

    function setSectorNode(idx) {
        if (!nodeDot || !nodeRing || !sectorCoords[idx]) return;
        const target = sectorCoords[idx];
        nodeDot.setAttribute('cx', target.cx);
        nodeDot.setAttribute('cy', target.cy);
        nodeRing.setAttribute('cx', target.cx);
        nodeRing.setAttribute('cy', target.cy);
    }

    // Attach hover and touch interactions to shift the technical orange node
    navItems.forEach((item) => {
        const idx = parseInt(item.getAttribute('data-idx') || '0', 10);
        
        item.addEventListener('mouseenter', () => {
            setSectorNode(idx);
            navItems.forEach((n) => n.classList.remove('is-focused'));
            item.classList.add('is-focused');
        });

        item.addEventListener('touchstart', () => {
            setSectorNode(idx);
            navItems.forEach((n) => n.classList.remove('is-focused'));
            item.classList.add('is-focused');
        }, { passive: true });
    });

    function openMenu() {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        if (toggleBtn) {
            toggleBtn.classList.add('is-active');
            toggleBtn.setAttribute('aria-expanded', 'true');
        }
        document.body.style.overflow = 'hidden';
        if (typeof lenisInstance !== 'undefined' && lenisInstance && typeof lenisInstance.stop === 'function') {
            lenisInstance.stop();
        }
        // Default node to first sector on open
        setSectorNode(0);
    }

    function closeMenu() {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        if (toggleBtn) {
            toggleBtn.classList.remove('is-active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
        if (typeof lenisInstance !== 'undefined' && lenisInstance && typeof lenisInstance.start === 'function') {
            lenisInstance.start();
        }
        navItems.forEach((n) => n.classList.remove('is-focused'));
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = drawer.classList.contains('open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
        });
    }

    mobileLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || !href.startsWith('#')) return;

            let target = null;
            try {
                const id = decodeURIComponent(href.slice(1));
                target = document.getElementById(id) || document.querySelector(href);
            } catch (err) {
                target = null;
            }
            if (!target) return;

            e.preventDefault();
            e.stopPropagation();

            // 1. Instantly unlock page scrolling and dismiss drawer
            closeMenu();

            // 2. Perform smooth scroll to target section
            const targetOffset = (href === '#hero') ? 0 : -20;

            setTimeout(() => {
                const activeLenis = window.lenisInstance || (typeof lenisInstance !== 'undefined' ? lenisInstance : null);
                if (activeLenis && typeof activeLenis.scrollTo === 'function') {
                    activeLenis.scrollTo(target, {
                        offset: targetOffset,
                        duration: 1.1,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 80);
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            closeMenu();
        }
    });
}

/* Email Copy Button with Toast Feedback */
function initEmailCopy() {
    const copyBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('copyToast');
    const email = 'hello@theluxestudio.in';

    if (!copyBtn || !toast) return;

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(email);
            toast.textContent = 'Copied to clipboard: ' + email;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        } catch (err) {
            // Fallback for older browsers
            window.location.href = `mailto:${email}`;
        }
    });
}

/* Smooth Anchors Integration with Lenis & Accessibility */
function initSmoothAnchors() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        // Mobile drawer links manage their own drawer closing + navigation lifecycle
        if (anchor.closest('.mobile-menu-drawer')) return;

        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            let target = null;
            try {
                const id = decodeURIComponent(targetId.slice(1));
                target = document.getElementById(id) || document.querySelector(targetId);
            } catch (err) {
                target = null;
            }
            if (!target) return;

            e.preventDefault();

            if (prefersReducedMotion) {
                target.scrollIntoView({ behavior: 'auto' });
                return;
            }

            const targetOffset = targetId === '#hero' ? 0 : -36;

            const activeLenis = window.lenisInstance || (typeof lenisInstance !== 'undefined' ? lenisInstance : null);
            if (activeLenis && typeof activeLenis.scrollTo === 'function') {
                activeLenis.scrollTo(target, {
                    offset: targetOffset,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* Page Visibility Title Switching */
function initVisibilityListener() {
    const originalTitle = document.title;
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = 'Back to LuxeStudio — Creative Technology';
        } else {
            document.title = originalTitle;
        }
    });
}

/* =========================================================
   MORE WORKS MODAL DRAWER
   ========================================================= */
function initWorkArchiveDrawer() {
    const drawer = document.getElementById('workArchiveDrawer');
    if (!drawer) return;

    const backdrop = document.getElementById('wadBackdrop');
    const closeBtn = document.getElementById('wadCloseBtn');
    const cardOpenBtn = document.getElementById('openArchiveFromCardBtn');
    const filterPills = document.querySelectorAll('.wad-filter-pill');
    const rows = document.querySelectorAll('.wad-row');
    const wadBody = drawer.querySelector('.wad-body');

    function openDrawer() {
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (wadBody) {
            wadBody.scrollTop = 0;
        }
    }

    function closeDrawer() {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    window.openWorkArchiveDrawer = openDrawer;
    window.closeWorkArchiveDrawer = closeDrawer;

    if (cardOpenBtn) cardOpenBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Ensure scrolling events inside the drawer are never swallowed
    if (wadBody) {
        wadBody.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: true });
        wadBody.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeDrawer();
        }
    });

    // Category Filtering Logic
    filterPills.forEach((pill) => {
        pill.addEventListener('click', () => {
            const filter = pill.getAttribute('data-filter') || 'all';

            filterPills.forEach(p => {
                p.classList.remove('is-active');
                p.setAttribute('aria-selected', 'false');
            });
            pill.classList.add('is-active');
            pill.setAttribute('aria-selected', 'true');

            rows.forEach((row) => {
                const cat = row.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
}

/* =========================================================
   BACK TO TOP GLOBAL HANDLER
   ========================================================= */
function initBackToTop() {
    const bttBtn = document.getElementById('backToTopBtn');
    if (!bttBtn) return;

    bttBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeLenis = window.lenisInstance || (typeof lenisInstance !== 'undefined' ? lenisInstance : null);
        if (activeLenis && typeof activeLenis.scrollTo === 'function') {
            activeLenis.scrollTo(0, {
                duration: 1.1,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

/* =========================================================
   AUSTRALIA CONTACT ACTION MODAL (CALL OR WHATSAPP)
   ========================================================= */
function initContactActionModal() {
    let modal = document.getElementById('contactActionModal');

    // If modal container does not exist in DOM, build it dynamically
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'contactActionModal';
        modal.className = 'contact-modal';
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'camTitle');
        modal.innerHTML = `
            <div class="contact-modal-backdrop" id="contactModalBackdrop"></div>
            <div class="contact-modal-dialog">
                <div class="contact-modal-header">
                    <div class="contact-modal-badge">
                        <span class="contact-modal-dot"></span>
                        <span>AUSTRALIA CLIENT DESK</span>
                    </div>
                    <button type="button" class="contact-modal-close" id="contactModalClose" aria-label="Close dialog">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="contact-modal-body">
                    <h3 class="contact-modal-title" id="camTitle">+61 0422 974 003</h3>
                    <p class="contact-modal-desc">
                        Select how you would like to connect with LuxeStudio Australia:
                    </p>

                    <div class="contact-modal-actions">
                        <!-- Direct Voice Call -->
                        <a href="tel:+61422974003" class="contact-modal-btn contact-modal-call" id="camCallBtn">
                            <div class="contact-modal-btn-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                            </div>
                            <div class="contact-modal-btn-text">
                                <span class="contact-modal-btn-title">Voice Call</span>
                                <span class="contact-modal-btn-sub">Direct cellular dialer</span>
                            </div>
                            <span class="contact-modal-btn-arrow" aria-hidden="true">&rarr;</span>
                        </a>

                        <!-- WhatsApp Priority -->
                        <a href="https://wa.me/61422974003" target="_blank" rel="noopener noreferrer" class="contact-modal-btn contact-modal-wa" id="camWaBtn">
                            <div class="contact-modal-btn-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                                </svg>
                            </div>
                            <div class="contact-modal-btn-text">
                                <span class="contact-modal-btn-title">WhatsApp Priority</span>
                                <span class="contact-modal-btn-sub">Instant messaging & chat</span>
                            </div>
                            <span class="contact-modal-btn-arrow" aria-hidden="true">&nearr;</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const closeBtn = modal.querySelector('#contactModalClose');
    const backdrop = modal.querySelector('#contactModalBackdrop');
    const callBtn = modal.querySelector('#camCallBtn');
    const waBtn = modal.querySelector('#camWaBtn');

    function openModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    if (callBtn) {
        callBtn.addEventListener('click', () => {
            setTimeout(closeModal, 250);
        });
    }

    if (waBtn) {
        waBtn.addEventListener('click', () => {
            setTimeout(closeModal, 250);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    // Delegate click to any triggers matching the selector
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.js-australia-contact, [data-contact-action="australia"]');
        if (trigger) {
            openModal(e);
        }
    });

    window.openAustraliaContactModal = openModal;
}
