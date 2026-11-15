/**
 * LUXESTUDIO — Motion Engine (Lenis + GSAP ScrollTrigger)
 * Kinetic Strikethrough, Dynamic Story Color Scrub, Ambient Mood Lighting & Guaranteed Counters
 */

let lenisInstance = null;

function initMotionEngine() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Initialize Lenis Smooth Scroll
    if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
        lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 1.8,
            infinite: false
        });
        window.lenisInstance = lenisInstance;
        lenisInstance.scrollTo(0, { immediate: true });

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            lenisInstance.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenisInstance.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        }
    }

    // 2. Header Background State on Scroll
    const nav = document.querySelector('.nav');
    if (nav && typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            start: 'top -40',
            onUpdate: (self) => {
                if (self.scroll() > 40) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }
        });
    }

    // 3. Ambient Dynamic Mood Lighting Layer
    initAmbientMoodLighting();

    // 4. Section 2: Ethos Scroll-Driven Editorial Storytelling
    initEthosScrollStory();

    // 4b. Marquee Transition Strip
    initMarqueeStrip();

    // 5. Dynamic Color Scrub for "Focused thinking. Measured execution."
    initStoryColorScrub();

    // 6. Pinned Horizontal Work Exhibition Track
    initHorizontalWork();

    // 7. Key Facts Scroll-Driven Architectural Timeline
    initKeyFactsScrollSystem();

    // 8. Process Section: Scroll-Driven Progression System
    initProcessProgression();

    // 9. Studio Section: Identity & Integrated Model Timeline
    initStudioIdentityTimeline();

    // 10. General Scroll Reveal Triggers
    initScrollReveals();

    // 11. Interactive Service Card Spotlight
    initServiceSpotlights();

    // 12. Signature Footer Restrained Interactions & Back to Top
    initFooterInteractions();
}

/* 3. Dynamic Ambient Mood Lighting Transition */
function initAmbientMoodLighting() {
    const moodGlow = document.getElementById('ambientMoodGlow');
    if (!moodGlow || typeof ScrollTrigger === 'undefined') return;

    // Hero: Travertine warm morning glow
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setGlow('radial-gradient(circle at 75% 25%, rgba(255, 230, 215, 0.65) 0%, transparent 65%)'),
        onEnterBack: () => setGlow('radial-gradient(circle at 75% 25%, rgba(255, 230, 215, 0.65) 0%, transparent 65%)')
    });

    // Intro / Services: Architectural cool stone
    ScrollTrigger.create({
        trigger: '.services',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setGlow('radial-gradient(circle at 25% 45%, rgba(230, 226, 216, 0.75) 0%, transparent 60%)'),
        onEnterBack: () => setGlow('radial-gradient(circle at 25% 45%, rgba(230, 226, 216, 0.75) 0%, transparent 60%)')
    });

    // Dark Story: Radiant amber/coral core in deep obsidian
    ScrollTrigger.create({
        trigger: '#story-section',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setGlow('radial-gradient(circle at 50% 40%, rgba(255, 69, 34, 0.16) 0%, rgba(12, 12, 12, 0.95) 70%)'),
        onEnterBack: () => setGlow('radial-gradient(circle at 50% 40%, rgba(255, 69, 34, 0.16) 0%, rgba(12, 12, 12, 0.95) 70%)')
    });

    // Facts: Warm travertine
    ScrollTrigger.create({
        trigger: '#facts-section',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setGlow('radial-gradient(circle at 50% 50%, rgba(235, 230, 220, 0.8) 0%, transparent 65%)'),
        onEnterBack: () => setGlow('radial-gradient(circle at 50% 50%, rgba(235, 230, 220, 0.8) 0%, transparent 65%)')
    });

    function setGlow(bgString) {
        moodGlow.style.background = bgString;
    }
}

/* 4. Section 2: Ethos Scroll-Driven Editorial Storytelling */
function initEthosScrollStory() {
    const section = document.getElementById('ethos-section');
    const stage = document.getElementById('ethosPinnedStage');
    if (!section || !stage || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Elements
    const slot1 = document.getElementById('cutSlot1');
    const slot2 = document.getElementById('cutSlot2');
    const slot3 = document.getElementById('cutSlot3');

    const neg1 = document.getElementById('negWord1');
    const neg2 = document.getElementById('negWord2');
    const neg3 = document.getElementById('negWord3');

    const topHalf1 = neg1 ? neg1.querySelector('.half-top') : null;
    const botHalf1 = neg1 ? neg1.querySelector('.half-bottom') : null;
    const blade1 = document.getElementById('blade1');
    const pos1 = document.getElementById('posWord1');

    const topHalf2 = neg2 ? neg2.querySelector('.half-top') : null;
    const botHalf2 = neg2 ? neg2.querySelector('.half-bottom') : null;
    const blade2 = document.getElementById('blade2');
    const pos2 = document.getElementById('posWord2');

    const topHalf3 = neg3 ? neg3.querySelector('.half-top') : null;
    const botHalf3 = neg3 ? neg3.querySelector('.half-bottom') : null;
    const blade3 = document.getElementById('blade3');
    const pos3 = document.getElementById('posWord3');

    const copy = document.getElementById('ethosSupportingCopy');
    const horizonBlade = document.querySelector('.horizon-blade-line');

    if (prefersReducedMotion) {
        // Fallback for reduced motion: display the resolved positive statement directly
        if (slot1 && pos1) { pos1.style.opacity = '1'; pos1.style.transform = 'none'; pos1.style.position = 'relative'; }
        if (slot2 && pos2) { slot2.style.opacity = '1'; pos2.style.opacity = '1'; pos2.style.transform = 'none'; pos2.style.position = 'relative'; }
        if (slot3 && pos3) { slot3.style.opacity = '1'; pos3.style.opacity = '1'; pos3.style.transform = 'none'; pos3.style.position = 'relative'; }
        if (neg1) neg1.style.display = 'none';
        if (neg2) neg2.style.display = 'none';
        if (neg3) neg3.style.display = 'none';
        if (copy) { copy.style.opacity = '1'; copy.style.transform = 'none'; }
        return;
    }

    // Set initial layout states
    gsap.set(slot1, { opacity: 1, y: 0 });
    gsap.set([slot2, slot3], { opacity: 0, y: 14 });
    gsap.set([pos1, pos2, pos3], { opacity: 0, y: 14 });
    gsap.set([blade1, blade2, blade3], { scaleX: 0, opacity: 1 });
    gsap.set(copy, { opacity: 0, y: 16 });
    if (horizonBlade) gsap.set(horizonBlade, { scaleX: 0 });

    // Master Pinned Scrub Timeline with generous inertial damping
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin: stage,
            scrub: 1.4,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    // -------------------------------------------------------------
    // DWELL 0 (0.00 – 0.12): Visitor arrives, stage locks, absorbs:
    // "We make technology feel complicated."
    // -------------------------------------------------------------

    // -------------------------------------------------------------
    // STAGE 1 & 2 (0.12 – 0.28): "complicated." -> surgical cut -> "simple,"
    // -------------------------------------------------------------
    // Blade 1 sweeps across "complicated."
    tl.to(blade1, {
        scaleX: 1,
        duration: 0.08,
        ease: 'power2.inOut'
    }, 0.12);

    // Halves split along incision and dissolve
    tl.to(topHalf1, {
        x: -10,
        y: -6,
        opacity: 0,
        filter: 'blur(3px)',
        duration: 0.08,
        ease: 'power2.out'
    }, 0.18);

    tl.to(botHalf1, {
        x: 10,
        y: 6,
        opacity: 0,
        filter: 'blur(3px)',
        duration: 0.08,
        ease: 'power2.out'
    }, 0.18);

    tl.to(blade1, {
        opacity: 0,
        duration: 0.04,
        ease: 'power1.out'
    }, 0.24);

    // "simple," emerges in LuxeStudio coral and settles
    tl.to(pos1, {
        opacity: 1,
        y: 0,
        duration: 0.08,
        ease: 'power3.out'
    }, 0.22);

    // Supporting copy quietly enters
    tl.to(copy, {
        opacity: 0.9,
        y: 0,
        duration: 0.08,
        ease: 'power2.out'
    }, 0.24);

    // -------------------------------------------------------------
    // DWELL 1 (0.28 – 0.44): Paced reading hold for "simple,"
    // -------------------------------------------------------------

    // -------------------------------------------------------------
    // STAGE 3 (0.44 – 0.60): "invisible." -> surgical cut -> "meaningful,"
    // -------------------------------------------------------------
    // Introduce slot 2 line ("invisible.")
    tl.to(slot2, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        ease: 'power2.out'
    }, 0.44);

    // Blade 2 sweeps across
    tl.to(blade2, {
        scaleX: 1,
        duration: 0.08,
        ease: 'power2.inOut'
    }, 0.49);

    // Halves split
    tl.to(topHalf2, {
        x: -10,
        y: -6,
        opacity: 0,
        filter: 'blur(3px)',
        duration: 0.07,
        ease: 'power2.out'
    }, 0.54);

    tl.to(botHalf2, {
        x: 10,
        y: 6,
        opacity: 0,
        filter: 'blur(3px)',
        duration: 0.07,
        ease: 'power2.out'
    }, 0.54);

    tl.to(blade2, {
        opacity: 0,
        duration: 0.04,
        ease: 'power1.out'
    }, 0.58);

    // "meaningful," emerges in LuxeStudio coral
    tl.to(pos2, {
        opacity: 1,
        y: 0,
        duration: 0.08,
        ease: 'power3.out'
    }, 0.56);

    // -------------------------------------------------------------
    // DWELL 2 (0.60 – 0.74): Paced reading hold for "simple, meaningful,"
    // -------------------------------------------------------------

    // -------------------------------------------------------------
    // STAGE 4 (0.74 – 0.88): "ordinary." -> strongest incision -> "and impossible to ignore."
    // -------------------------------------------------------------
    // Introduce slot 3 line ("ordinary.")
    tl.to(slot3, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        ease: 'power2.out'
    }, 0.74);

    // Blade 3 sweeps across with surgical speed
    tl.to(blade3, {
        scaleX: 1,
        duration: 0.08,
        ease: 'power2.inOut'
    }, 0.78);

    // Halves split apart
    tl.to(topHalf3, {
        x: -12,
        y: -7,
        opacity: 0,
        filter: 'blur(4px)',
        duration: 0.07,
        ease: 'power2.out'
    }, 0.83);

    tl.to(botHalf3, {
        x: 12,
        y: 7,
        opacity: 0,
        filter: 'blur(4px)',
        duration: 0.07,
        ease: 'power2.out'
    }, 0.83);

    tl.to(blade3, {
        opacity: 0,
        duration: 0.04,
        ease: 'power1.out'
    }, 0.86);

    // "and impossible to ignore." emerges with commanding authority
    tl.to(pos3, {
        opacity: 1,
        y: 0,
        duration: 0.08,
        ease: 'power3.out'
    }, 0.84);

    // -------------------------------------------------------------
    // DWELL 3 (0.88 – 0.94): Grand finale hold — the full manifesto
    // "We make technology feel simple, meaningful, and impossible to ignore."
    // -------------------------------------------------------------

    // -------------------------------------------------------------
    // STAGE 5 (0.94 – 1.00): HORIZON RAZOR TRANSITION
    // -------------------------------------------------------------
    if (horizonBlade) {
        tl.to(horizonBlade, {
            scaleX: 1,
            duration: 0.06,
            ease: 'power2.inOut'
        }, 0.94);
    }
}

/* 4b. Marquee Transition Strip: Infinite Editorial Stream with Viscous Scroll Coupling */
function initMarqueeStrip() {
    const marquee = document.getElementById('marqueeStrip');
    const track = document.getElementById('marqueeTrack');
    if (!marquee || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const groups = track.querySelectorAll('.marquee-group');
    if (groups.length === 0) return;

    // Single group width determines the exact seamless repeat point
    let groupWidth = groups[0].getBoundingClientRect().width;

    const updateDimensions = () => {
        if (groups[0]) {
            const rect = groups[0].getBoundingClientRect();
            if (rect.width > 0) {
                groupWidth = rect.width;
            }
        }
    };

    window.addEventListener('resize', updateDimensions, { passive: true });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(updateDimensions);
    }
    setTimeout(updateDimensions, 400);

    // Editorial baseline speed: ~50-55px per second (~0.85px per 60fps frame)
    const baseSpeed = 0.85;
    let currentSpeed = baseSpeed;
    let targetSpeed = baseSpeed;
    let currentX = -48; // Initial offset so the first word is cleanly clipped at the left edge

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    // ONE source of truth: GSAP ticker drives the track transformation
    if (typeof gsap !== 'undefined' && gsap.ticker) {
        gsap.ticker.add(() => {
            // Retrieve real-time scroll velocity
            let scrollVel = 0;
            if (window.lenisInstance && typeof window.lenisInstance.velocity === 'number') {
                scrollVel = window.lenisInstance.velocity;
            } else if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.getVelocity) {
                scrollVel = ScrollTrigger.getVelocity() / 60;
            } else {
                const nowY = window.pageYOffset || document.documentElement.scrollTop;
                scrollVel = nowY - lastScrollY;
                lastScrollY = nowY;
            }

            // Calculate subtle scroll influence:
            // - Normal downward scroll slightly accelerates marquee velocity (max 2.2x baseSpeed)
            // - Upward reverse scroll subtly decelerates marquee velocity (down to ~0.2x baseSpeed)
            // - When scroll pauses or stops, velocity smoothly returns to baseline
            // - Never creates an abrupt or jarring spike
            const scrollInfluence = scrollVel * 0.04;
            const clampedInfluence = Math.max(-0.65, Math.min(1.2, scrollInfluence));
            targetSpeed = baseSpeed + clampedInfluence;

            // Fluid physical easing back to baseline or towards target speed
            currentSpeed += (targetSpeed - currentSpeed) * 0.055;

            // Move track from right to left
            currentX -= currentSpeed;

            // Mathematical infinite loop across the duplicated group track
            if (groupWidth > 0) {
                while (currentX <= -groupWidth) {
                    currentX += groupWidth;
                }
                while (currentX > 0) {
                    currentX -= groupWidth;
                }
            }

            // GPU-accelerated translate3d
            track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
        });
    }
}

/* 5. Dynamic Color Scrub for "Focused thinking. Measured execution." */
function initStoryColorScrub() {
    const storySection = document.getElementById('story-section');
    if (!storySection) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const line2     = document.getElementById('storyLine2');
    const storyCopy = document.getElementById('storyCopy');
    const row1      = document.getElementById('manifestoRow1');
    const row2      = document.getElementById('manifestoRow2');
    const row3      = document.getElementById('manifestoRow3');

    // ── Reduced motion: show final state immediately ──────────────
    if (prefersReducedMotion) {
        if (line2) line2.classList.add('resolved');
        if (storyCopy) storyCopy.classList.add('is-visible');
        if (row1) row1.classList.add('is-visible');
        if (row2) row2.classList.add('is-visible');
        if (row3) row3.classList.add('is-visible');
        return;
    }

    if (typeof ScrollTrigger === 'undefined') return;

    // ── "thinking." — two-stage solidification tied to scroll progress ──
    // Stage 1: when section top hits 70% of viewport → start solidifying
    ScrollTrigger.create({
        trigger: storySection,
        start: 'top 68%',
        end: 'top 30%',
        onEnter: () => {
            if (line2) {
                line2.classList.remove('resolved');
                line2.classList.add('solidifying');
            }
        },
        onLeaveBack: () => {
            if (line2) {
                line2.classList.remove('solidifying', 'resolved');
            }
        }
    });

    // Stage 2: fully resolved when section is well in view
    ScrollTrigger.create({
        trigger: storySection,
        start: 'top 30%',
        end: 'bottom bottom',
        onEnter: () => {
            if (line2) {
                line2.classList.add('resolved');
            }
        },
        onLeaveBack: () => {
            if (line2) {
                line2.classList.remove('resolved');
                // Back to solidifying state since we're still within stage 1
                line2.classList.add('solidifying');
            }
        }
    });

    // ── Supporting copy — reveals when section enters view ──
    ScrollTrigger.create({
        trigger: storySection,
        start: 'top 60%',
        onEnter: () => {
            if (storyCopy) storyCopy.classList.add('is-visible');
        },
        onLeaveBack: () => {
            if (storyCopy) storyCopy.classList.remove('is-visible');
        }
    });

    // ── Manifesto rows — staggered sequential reveal ──
    const rowDelay = 120; // ms between each row

    const revealRows = (reverse = false) => {
        if (!reverse) {
            if (row1) setTimeout(() => row1.classList.add('is-visible'), 0);
            if (row2) setTimeout(() => row2.classList.add('is-visible'), rowDelay);
            if (row3) setTimeout(() => row3.classList.add('is-visible'), rowDelay * 2);
        } else {
            if (row3) row3.classList.remove('is-visible');
            if (row2) setTimeout(() => row2.classList.remove('is-visible'), rowDelay);
            if (row1) setTimeout(() => row1.classList.remove('is-visible'), rowDelay * 2);
        }
    };

    ScrollTrigger.create({
        trigger: storySection,
        start: 'top 52%',
        onEnter: () => revealRows(false),
        onLeaveBack: () => revealRows(true)
    });

    // Keyboard and click accessibility for manifesto rows
    const rows = [row1, row2, row3].filter(Boolean);
    rows.forEach(row => {
        row.addEventListener('click', () => {
            const alreadyActive = row.classList.contains('is-active');
            rows.forEach(r => r.classList.remove('is-active'));
            if (!alreadyActive) row.classList.add('is-active');
        });
        row.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                row.click();
            }
        });
    });
}


/* 6. Pinned Horizontal Work Exhibition */
function initHorizontalWork() {
    const workSection   = document.querySelector('.work-horizontal-section');
    const workTrack     = document.querySelector('.work-horizontal-track');
    const progressFills = [
        document.getElementById('workProgressFill1'),
        document.getElementById('workProgressFill2'),
        document.getElementById('workProgressFill3'),
        document.getElementById('workProgressFill4')
    ];
    const progressItems = document.querySelectorAll('.work-progress-item');
    const cards         = document.querySelectorAll('.work-card-horizontal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!workSection || !workTrack) return;

    // Keyboard accessibility & click feedback for project cards
    cards.forEach((card) => {
        card.addEventListener('click', (e) => {
            // If click was inside a link or button, allow native navigation
            if (e.target.closest('a') || e.target.closest('button')) return;

            const url = card.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else if (card.id === 'workCardArchive' || card.classList.contains('card-archive')) {
                if (typeof window.openWorkArchiveDrawer === 'function') {
                    window.openWorkArchiveDrawer();
                }
            }
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    if (prefersReducedMotion || typeof ScrollTrigger === 'undefined') {
        cards.forEach(c => c.classList.add('is-active'));
        return;
    }

    const mm = gsap.matchMedia();

    // Mobile: Natural vertical stack without pinning
    mm.add("(max-width: 800px)", () => {
        cards.forEach(c => c.classList.add('is-active'));
        gsap.set(workTrack, { clearProps: "transform,x" });
    });

    // Desktop: Pinned horizontal exhibition track
    mm.add("(min-width: 801px)", () => {
        const getScrollDistance = () => Math.max(0, workTrack.scrollWidth - window.innerWidth + 40);

        const getMilestones = () => {
            const totalDist = getScrollDistance();
            const n = cards.length;
            if (totalDist <= 0 || n < 2) return [0, 0.25, 0.5, 0.75, 1];

            const ms = new Array(n);
            ms[0] = 0;
            ms[n - 1] = 1;

            for (let i = 1; i < n - 1; i++) {
                const card = cards[i];
                const cardCenterInTrack = card.offsetLeft + card.offsetWidth * 0.5;
                const neededShift = cardCenterInTrack - window.innerWidth * 0.5;
                const rawP = neededShift / totalDist;
                ms[i] = Math.min(0.85, Math.max(0.08, rawP));
            }

            // Ensure strictly increasing progression
            for (let i = 1; i < n - 1; i++) {
                if (ms[i] <= ms[i - 1] + 0.05) {
                    ms[i] = ms[i - 1] + 0.08;
                }
            }
            if (ms[n - 2] >= 0.88) {
                ms[n - 2] = 0.82;
            }

            return ms;
        };

        const masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: workSection,
                pin: true,
                start: 'top top',
                end: () => `+=${getScrollDistance()}`,
                scrub: 1.1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (cards.length > 1) {
                        const p = self.progress;
                        const ms = getMilestones();
                        const n = cards.length;

                        // Calculate progress across each fill bar segment
                        for (let i = 0; i < progressFills.length; i++) {
                            const fill = progressFills[i];
                            if (fill) {
                                const startM = ms[i];
                                const endM = ms[i + 1] !== undefined ? ms[i + 1] : 1;
                                let segP = 0;
                                if (p >= endM || p >= 0.98) {
                                    segP = 1;
                                } else if (p <= startM) {
                                    segP = 0;
                                } else {
                                    segP = (p - startM) / (endM - startM);
                                }
                                fill.style.width = `${(Math.min(1, Math.max(0, segP)) * 100).toFixed(1)}%`;
                            }
                        }

                        // Determine active card based on scroll milestones
                        let activeIdx = 0;
                        if (p >= 0.88) {
                            activeIdx = n - 1;
                        } else {
                            for (let i = 0; i < n - 1; i++) {
                                const threshold = (ms[i] + ms[i + 1]) * 0.5;
                                if (p < threshold) {
                                    activeIdx = i;
                                    break;
                                }
                                activeIdx = i + 1;
                            }
                        }

                        cards.forEach((card, idx) => {
                            if (idx === activeIdx) {
                                card.classList.add('is-active');
                            } else {
                                card.classList.remove('is-active');
                            }
                        });

                        progressItems.forEach((item, idx) => {
                            if (idx === activeIdx) {
                                item.classList.add('is-active');
                            } else {
                                item.classList.remove('is-active');
                            }
                        });
                    }
                }
            }
        });

        // Horizontal track translation: moves RIGHT → LEFT smoothly
        masterTimeline.to(workTrack, {
            x: () => -getScrollDistance(),
            ease: 'none'
        });

        // Click on progress step navigates directly to project
        progressItems.forEach((item, idx) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                if (!masterTimeline.scrollTrigger) return;
                const st = masterTimeline.scrollTrigger;
                const ms = getMilestones();
                const targetRatio = ms[idx] !== undefined ? ms[idx] : (idx / (cards.length - 1));
                const targetScroll = st.start + targetRatio * (st.end - st.start);
                if (typeof lenisInstance !== 'undefined' && lenisInstance) {
                    lenisInstance.scrollTo(targetScroll, { duration: 1.2 });
                } else {
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
            });
        });

        // Subtle internal image parallax
        const projectImgs = workTrack.querySelectorAll('.project-img');
        if (projectImgs.length) {
            masterTimeline.fromTo(projectImgs,
                { xPercent: -5 },
                { xPercent: 5, ease: 'none' },
                0
            );
        }
    });
}

/* 7. Key Facts Enter-Triggered Play-Once Architectural System */
function initKeyFactsScrollSystem() {
    const factsSection = document.getElementById('facts-section');
    if (!factsSection) return;

    const factsTitle = document.getElementById('facts-title');
    const lineTop    = factsSection.querySelector('.fact-grid-line-h.line-top');
    const lineMid    = factsSection.querySelector('.fact-grid-line-h.line-mid');
    const lineBottom = factsSection.querySelector('.fact-grid-line-h.line-bottom');
    const lineVert   = factsSection.querySelector('.fact-grid-line-v.line-vert');

    const card1 = document.getElementById('factCard1');
    const card2 = document.getElementById('factCard2');
    const card3 = document.getElementById('factCard3');
    const card4 = document.getElementById('factCard4');

    const counter1 = document.getElementById('factCounter1');
    const counter2 = document.getElementById('factCounter2');
    const counter3 = document.getElementById('factCounter3');
    const counter4 = document.getElementById('factCounter4');

    const suffix1 = document.getElementById('factSuffix1');
    const suffix2 = document.getElementById('factSuffix2');
    const suffix3 = document.getElementById('factSuffix3');
    const suffix4 = document.getElementById('factSuffix4');

    const target1 = counter1 ? (parseInt(counter1.dataset.target, 10) || 50) : 50;
    const target2 = counter2 ? (parseInt(counter2.dataset.target, 10) || 12) : 12;
    const target3 = counter3 ? (parseInt(counter3.dataset.target, 10) || 10) : 10;
    const target4 = counter4 ? (parseInt(counter4.dataset.target, 10) || 83) : 83;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|prerender|lighthouse|headless|facebookexternalhit|bingbot|slurp|duckduckbot|baiduspider|yandexbot|applebot|semrush|ahrefs/i.test(navigator.userAgent) || Boolean(window.navigator.webdriver);

    // Helper: set final static state immediately (for reduced motion, bots, or fallback)
    function setFinalState() {
        if (counter1) counter1.textContent = target1;
        if (counter2) counter2.textContent = target2;
        if (counter3) counter3.textContent = target3;
        if (counter4) counter4.textContent = target4;
        [suffix1, suffix2, suffix3, suffix4].forEach(s => {
            if (s) { s.style.opacity = '1'; s.style.transform = 'none'; }
        });
        [card1, card2, card3, card4].forEach(c => {
            if (c) { c.style.opacity = '1'; c.style.transform = 'none'; }
        });
        if (factsTitle) { factsTitle.style.opacity = '1'; factsTitle.style.transform = 'none'; }
        [lineTop, lineMid, lineBottom].forEach(l => { if (l) l.style.transform = 'scaleX(1)'; });
        if (lineVert) lineVert.style.transform = 'scaleY(1)';
    }

    if (prefersReducedMotion || isBot) {
        setFinalState();
        return;
    }

    // Play-once state flag: once triggered, never reverses, scrubs, or restarts
    let hasAnimated = false;

    function startKeyFactsAnimation() {
        if (hasAnimated) return;
        hasAnimated = true;

        if (typeof gsap === 'undefined') {
            setFinalState();
            return;
        }

        // Autonomous master timeline (NOT tied to scroll progress)
        const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            onComplete: () => {
                // Lock exact final values & state
                if (counter1) counter1.textContent = target1;
                if (counter2) counter2.textContent = target2;
                if (counter3) counter3.textContent = target3;
                if (counter4) counter4.textContent = target4;
                [suffix1, suffix2, suffix3, suffix4].forEach(s => {
                    if (s) { s.style.opacity = '1'; s.style.transform = 'none'; }
                });
            }
        });

        // STEP 1: Headline softly fades upward (0.75s)
        if (factsTitle) {
            tl.to(factsTitle, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: 'power2.out'
            }, 0);
        }

        // STEP 1b: Reset counters to 0 while cards are still invisible (before 0.2s stagger reveal)
        tl.add(() => {
            if (counter1) counter1.textContent = '0';
            if (counter2) counter2.textContent = '0';
            if (counter3) counter3.textContent = '0';
            if (counter4) counter4.textContent = '0';
        }, 0.1);

        // STEP 2: Hairline divider lines reveal subtly (desktop)
        const isMobile = window.innerWidth <= 800;
        if (!isMobile) {
            if (lineTop) {
                tl.to(lineTop, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, 0.1);
            }
            if (lineMid) {
                tl.to(lineMid, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, 0.2);
            }
            if (lineBottom) {
                tl.to(lineBottom, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, 0.3);
            }
            if (lineVert) {
                tl.to(lineVert, { scaleY: 1, duration: 0.9, ease: 'power2.out' }, 0.25);
            }
        }

        // STEP 3 & 4: Cards appear with subtle stagger
        const cards = [card1, card2, card3, card4].filter(Boolean);
        if (cards.length) {
            tl.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power2.out'
            }, 0.2);
        }

        // STEP 5: Controlled number count to final values with 0.15s stagger
        // Duration: ~1.9s with smooth power2.out easing (no bounce, no overshoot)
        const countersData = [
            { el: counter1, target: target1, suffix: suffix1, startDelay: 0.25 },
            { el: counter2, target: target2, suffix: suffix2, startDelay: 0.40 },
            { el: counter3, target: target3, suffix: suffix3, startDelay: 0.55 },
            { el: counter4, target: target4, suffix: suffix4, startDelay: 0.70 }
        ];

        countersData.forEach(({ el, target, suffix, startDelay }) => {
            if (!el) return;
            const obj = { val: 0 };
            tl.to(obj, {
                val: target,
                duration: 1.9,
                ease: 'power2.out',
                onUpdate: () => {
                    el.textContent = Math.round(obj.val);
                },
                onComplete: () => {
                    el.textContent = target;
                    if (suffix) {
                        gsap.to(suffix, { opacity: 1, duration: 0.35, ease: 'power2.out' });
                    }
                }
            }, startDelay);

            // Subtle opacity reveal for suffix as counter nears completion
            if (suffix) {
                tl.to(suffix, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                }, startDelay + 1.2);
            }
        });
    }

    // Set clean initial state so elements don't flash
    if (typeof gsap !== 'undefined') {
        if (factsTitle) gsap.set(factsTitle, { opacity: 0, y: 20 });
        [card1, card2, card3, card4].forEach(c => {
            if (c) gsap.set(c, { opacity: 0, y: 18 });
        });
        [suffix1, suffix2, suffix3, suffix4].forEach(s => {
            if (s) gsap.set(s, { opacity: 0 });
        });
        if (lineTop) gsap.set(lineTop, { scaleX: 0 });
        if (lineMid) gsap.set(lineMid, { scaleX: 0 });
        if (lineBottom) gsap.set(lineBottom, { scaleX: 0 });
        if (lineVert) gsap.set(lineVert, { scaleY: 0 });
    }

    // IntersectionObserver: Trigger once when ~20–30% of the section enters the viewport
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    observer.unobserve(factsSection);
                    startKeyFactsAnimation();
                }
            });
        }, {
            threshold: 0.22,
            rootMargin: '0px 0px -5% 0px'
        });

        observer.observe(factsSection);

        // Immediate check in case page is already loaded at or past Key Facts
        const rect = factsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            observer.unobserve(factsSection);
            startKeyFactsAnimation();
        }
    } else {
        startKeyFactsAnimation();
    }
}

/* 8. Scroll Reveal Triggers */
function initScrollReveals() {
    if (typeof ScrollTrigger === 'undefined') return;

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            onEnter: () => el.classList.add('is-visible'),
            once: true
        });
    });

    // Hero title gentle parallax
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        gsap.to(heroTitle, {
            y: 100,
            opacity: 0.15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
}

/* 9. Capability Row Interaction + Floating Preview */
function initServiceSpotlights() {
    initCapabilityInteraction();
}

function initCapabilityInteraction() {
    const items = document.querySelectorAll('.service-item');
    const preview = document.getElementById('capPreview');
    const panels = document.querySelectorAll('.cap-panel');
    const isMobile = () => window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!items.length) return;

    // ── DESKTOP: FLOATING PREVIEW ─────────────────────────────────
    if (preview && !prefersReducedMotion) {
        // Position target with inertia
        let mouseX = 0, mouseY = 0;
        let previewX = 0, previewY = 0;
        let targetX = 0, targetY = 0;
        let isVisible = false;
        let activePanel = null;
        const OFFSET_X = 40;   // offset from cursor rightward
        const OFFSET_Y = -100; // offset upward
        const PREVIEW_W = 240;
        const PREVIEW_H = 200;

        // Inertia loop (always running, only updates position when visible)
        if (typeof gsap !== 'undefined') {
            gsap.ticker.add(() => {
                if (!isVisible) return;
                // Smooth follow
                previewX += (targetX - previewX) * 0.10;
                previewY += (targetY - previewY) * 0.10;
                gsap.set(preview, {
                    x: previewX,
                    y: previewY
                });
            });
        }

        // Track mouse across the whole document
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Clamp so preview never exits viewport
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            let tx = mouseX + OFFSET_X;
            let ty = mouseY + OFFSET_Y;
            if (tx + PREVIEW_W > vw - 16) tx = mouseX - PREVIEW_W - 16;
            if (ty < 16) ty = 16;
            if (ty + PREVIEW_H > vh - 16) ty = vh - PREVIEW_H - 16;

            targetX = tx;
            targetY = ty;
        }, { passive: true });

        const showPreview = (capability) => {
            if (isMobile()) return;

            // Switch active panel (crossfade)
            const nextPanel = preview.querySelector(`[data-panel="${capability}"]`);
            if (nextPanel && nextPanel !== activePanel) {
                panels.forEach(p => p.classList.remove('is-active'));
                nextPanel.classList.add('is-active');
                activePanel = nextPanel;
            }

            if (!isVisible) {
                isVisible = true;
                // Snap position before fade-in to avoid swooping from 0,0
                previewX = targetX;
                previewY = targetY;
                gsap.set(preview, { x: previewX, y: previewY });
                gsap.to(preview, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.45,
                    ease: 'power2.out'
                });
            }
        };

        const hidePreview = () => {
            if (!isVisible) return;
            isVisible = false;
            gsap.to(preview, {
                opacity: 0,
                scale: 0.94,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    panels.forEach(p => p.classList.remove('is-active'));
                    activePanel = null;
                }
            });
        };

        items.forEach(item => {
            const cap = item.dataset.capability;

            item.addEventListener('mouseenter', () => {
                if (isMobile()) return;
                showPreview(cap);
            });

            item.addEventListener('mouseleave', () => {
                if (isMobile()) return;
                // Small delay before hiding to allow moving between rows gracefully
                item._leaveTimer = setTimeout(() => {
                    // Check if another item is currently hovered
                    const anyHovered = [...items].some(i => i.matches(':hover'));
                    if (!anyHovered) hidePreview();
                }, 80);
            });

            item.addEventListener('mouseenter', () => {
                // Cancel pending leave hide if re-entering quickly
                if (item._leaveTimer) clearTimeout(item._leaveTimer);
            });
        });

        // Hide preview on scroll
        let scrollHideTimer;
        window.addEventListener('scroll', () => {
            if (!isVisible) return;
            clearTimeout(scrollHideTimer);
            scrollHideTimer = setTimeout(hidePreview, 200);
        }, { passive: true });
    }

    // ── MOBILE: TAP TO EXPAND ─────────────────────────────────────
    let activeMobileItem = null;

    items.forEach(item => {
        item.addEventListener('click', () => {
            if (!isMobile()) return;

            if (activeMobileItem && activeMobileItem !== item) {
                activeMobileItem.classList.remove('mob-active');
            }

            item.classList.toggle('mob-active');
            activeMobileItem = item.classList.contains('mob-active') ? item : null;
        });

        // Keyboard accessibility
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // ── REDUCED MOTION: simple highlight only ─────────────────────
    if (prefersReducedMotion) {
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = 'rgba(17,17,17,0.04)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = '';
            });
        });
    }
}

/* =========================================================
   10. Process Section: Scroll-Driven Progression System
   ========================================================= */
function initProcessProgression() {
    const processSection = document.getElementById('process-section');
    const processTitle = document.getElementById('process-title');
    const items = document.querySelectorAll('.process-item');
    if (!processSection || !items.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        items.forEach(item => item.classList.remove('is-active'));
        if (items[0]) items[0].classList.add('is-active');
        return;
    }

    if (typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined') return;

    // 1. Subtle headline anchor movement (20-35px upward, slight opacity shift)
    if (processTitle) {
        gsap.to(processTitle, {
            y: -30,
            opacity: 0.88,
            ease: 'none',
            scrollTrigger: {
                trigger: processSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
            }
        });
    }

    // 2. Row entrance reveals (architectural upward rise as each row approaches)
    items.forEach((item) => {
        gsap.fromTo(item, 
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    once: true
                }
            }
        );
    });

    // 3. Scroll-Driven Active Step Detection (Closest to viewport visual center)
    let currentActiveIdx = -1;

    const updateActiveRow = () => {
        const viewportCenter = window.innerHeight * 0.48;
        let closestIdx = -1;
        let minDistance = Infinity;

        items.forEach((item, idx) => {
            const rect = item.getBoundingClientRect();
            if (rect.bottom > 60 && rect.top < window.innerHeight - 60) {
                const itemCenter = rect.top + (rect.height * 0.5);
                const distance = Math.abs(itemCenter - viewportCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIdx = idx;
                }
            }
        });

        if (closestIdx !== currentActiveIdx) {
            currentActiveIdx = closestIdx;
            items.forEach((item, idx) => {
                if (idx === currentActiveIdx) {
                    item.classList.add('is-active');
                } else {
                    item.classList.remove('is-active');
                }
            });
        }
    };

    // Single section-level ScrollTrigger for high performance
    ScrollTrigger.create({
        trigger: processSection,
        start: 'top 80%',
        end: 'bottom 20%',
        onUpdate: updateActiveRow,
        onEnter: updateActiveRow,
        onEnterBack: updateActiveRow,
        onLeaveBack: () => {
            items.forEach(item => item.classList.remove('is-active'));
            currentActiveIdx = -1;
        }
    });

    window.addEventListener('resize', updateActiveRow, { passive: true });
    // Initial check
    setTimeout(updateActiveRow, 300);
}

/* =========================================================
   11. Studio Section: Identity & Integrated Model Timeline
   ========================================================= */
function initStudioIdentityTimeline() {
    const studioSection = document.getElementById('studio');
    const pinnedWrap = document.getElementById('studioPinnedWrap');
    const studioLine1 = document.getElementById('studioLine1');
    const studioLine2 = document.getElementById('studioLine2');
    const studioLine3 = document.getElementById('studioLine3');
    const layerA = document.getElementById('disciplinesLayerA');
    const layerB = document.getElementById('disciplinesLayerB');
    const layerC = document.getElementById('disciplinesLayerC');
    const studioCopy = document.getElementById('studioCopy');
    const railLine = document.getElementById('studioRailLine');
    const principles = document.querySelectorAll('.studio-principle-item');
    const branchLines = document.querySelectorAll('.studio-branch-line');

    if (!studioSection || !pinnedWrap) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = () => window.innerWidth <= 800;

    // Reduced motion or Mobile: graceful static layout
    if (prefersReducedMotion || isMobile()) {
        if (layerA) layerA.style.display = 'none';
        if (layerB) layerB.style.display = 'none';
        if (layerC) layerC.style.display = 'none';
        if (railLine) railLine.style.transform = 'scaleY(1)';
        branchLines.forEach(b => { b.style.transform = 'scaleX(1)'; });
        principles.forEach(p => { p.style.opacity = '1'; p.style.transform = 'none'; });
        if (studioLine3) {
            studioLine3.style.opacity = '1';
            studioLine3.style.color = '#ffffff';
        }
        const orangeSpan = studioSection.querySelector('.studio-orange-accent');
        if (orangeSpan) orangeSpan.style.opacity = '1';
        return;
    }

    if (typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined') return;

    // Desktop: Single Section-Level ScrollTrigger Timeline (75% scroll distance)
    const studioTL = gsap.timeline({
        scrollTrigger: {
            trigger: studioSection,
            pin: pinnedWrap,
            start: 'top top',
            end: '+=75%',
            scrub: 1.1,
            invalidateOnRefresh: true
        }
    });

    // ── Phase 1: Intro State (0 – 18%) ──
    // "One studio." is established; "Many disciplines." and "One standard." meet WCAG AA contrast (>= 0.78 opacity)
    gsap.set(studioLine1, { opacity: 1, y: 0 });
    gsap.set(studioLine2, { opacity: 0.78 });
    gsap.set(studioLine3, { opacity: 0.85, y: 6 });
    gsap.set(studioCopy, { opacity: 0, y: 15 });
    gsap.set(railLine, { scaleY: 0 });
    gsap.set(branchLines, { scaleX: 0 });
    gsap.set(principles, { opacity: 0, y: 18 });

    // Supporting copy softly emerges
    studioTL.to(studioCopy, {
        opacity: 1,
        y: 0,
        duration: 16,
        ease: 'power1.out'
    }, 0);

    // ── Phase 2: Divergence / Separation (18 – 52%) ──
    // "Many disciplines." subtly separates horizontally into 3 architectural offset layers
    // The layers represent distinct capabilities (strategy, design, development) existing within the studio
    if (layerA && layerB && layerC) {
        studioTL.to(layerA, {
            x: -16,
            opacity: 0.32,
            duration: 28,
            ease: 'power1.inOut'
        }, 18);

        studioTL.to(layerB, {
            x: 16,
            opacity: 0.32,
            duration: 28,
            ease: 'power1.inOut'
        }, 18);

        studioTL.to(layerC, {
            x: -30,
            opacity: 0.22,
            duration: 28,
            ease: 'power1.inOut'
        }, 18);
    }

    // Orange connector rail line begins extending downward
    if (railLine) {
        studioTL.to(railLine, {
            scaleY: 0.5,
            duration: 28,
            ease: 'power1.out'
        }, 22);
    }

    // ── Phase 3: Convergence into "One Standard" & Principle Establishment (52 – 82%) ──
    // Offset layers converge back smoothly into the single aligned word
    if (layerA && layerB && layerC) {
        studioTL.to([layerA, layerB, layerC], {
            x: 0,
            opacity: 0,
            duration: 24,
            ease: 'power2.inOut'
        }, 50);
    }

    // "Many disciplines." base line gains clearer solid presence
    studioTL.to(studioLine2, {
        opacity: 0.85,
        duration: 24,
        ease: 'power1.out'
    }, 50);

    // "One standard." becomes the strongest, most commanding visual statement
    const orangeSpan = studioSection.querySelector('.studio-orange-accent');
    studioTL.to(studioLine3, {
        opacity: 1,
        y: 0,
        color: '#ffffff',
        duration: 26,
        ease: 'power2.out'
    }, 52);

    if (orangeSpan) {
        studioTL.to(orangeSpan, {
            opacity: 1,
            color: '#ff4522',
            duration: 22,
            ease: 'power1.out'
        }, 56);
    }

    // Rail line extends to 100%
    if (railLine) {
        studioTL.to(railLine, {
            scaleY: 1,
            duration: 26,
            ease: 'power1.out'
        }, 52);
    }

    // Branch lines extend
    if (branchLines.length) {
        studioTL.to(branchLines, {
            scaleX: 1,
            duration: 18,
            stagger: 4,
            ease: 'power1.out'
        }, 60);
    }

    // Right-side principles reveal with subtle upward glide
    if (principles.length) {
        studioTL.to(principles, {
            opacity: 1,
            y: 0,
            duration: 20,
            stagger: 5,
            ease: 'power2.out'
        }, 62);
    }

    // ── Phase 4: Settle & Hold (82 – 100%) ──
    // Holds the resolved identity state before releasing naturally into contact
    studioTL.to({}, { duration: 18 }, 82);
}

/* =========================================================
   12. The Last Frame: Editorial Closing Signature & Pulse
   ========================================================= */
function initFooterInteractions() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const bttBtn = document.getElementById('backToTopBtn');
    const pulseRail = document.getElementById('footerPulseRail');
    const pulsePoint = document.getElementById('footerPulsePoint');
    const wordmark = document.getElementById('footerWordmark');
    const letters = wordmark ? wordmark.querySelectorAll('.sig-letter') : [];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── 1. Semantic Back to Top Handler ──
    if (bttBtn) {
        bttBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (prefersReducedMotion) {
                window.scrollTo(0, 0);
            } else if (typeof lenisInstance !== 'undefined' && lenisInstance) {
                lenisInstance.scrollTo(0, {
                    duration: 1.1,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (prefersReducedMotion) return;

    // ── 2. Restrained Entrance Animation (<600ms) ──
    const statement = footer.querySelector('.footer-statement-wrap');
    const sigWrap = footer.querySelector('.footer-signature-wrap');
    const metaContainer = footer.querySelector('.footer-metadata-container');
    const pulseLine = footer.querySelector('.footer-pulse-line');

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const footerTL = gsap.timeline({
            scrollTrigger: {
                trigger: footer,
                start: 'top 92%',
                toggleActions: 'play none none none'
            }
        });

        if (pulseLine) {
            footerTL.fromTo(pulseLine,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 0.85, duration: 0.42, ease: 'power2.out', transformOrigin: 'center center' },
                0
            );
        }

        if (statement) {
            footerTL.fromTo(statement,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' },
                0.08
            );
        }

        if (sigWrap) {
            footerTL.fromTo(sigWrap,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                0.12
            );
        }

        if (metaContainer) {
            footerTL.fromTo(metaContainer,
                { opacity: 0 },
                { opacity: 1, duration: 0.38, ease: 'power2.out' },
                0.18
            );
        }
    }

    // ── 3. Traveling Pulse Point Physics ──
    let cursorX = -9999;
    let cursorY = -9999;
    let animFrame = null;

    // Pulse trigger from wordmark hover
    function triggerPulseBump() {
        if (!pulsePoint) return;
        pulsePoint.classList.add('is-pulsing');
        setTimeout(() => {
            pulsePoint.classList.remove('is-pulsing');
        }, 360);
    }

    // Render loop for pulse point along the line
    function updatePulsePoint(time) {
        if (!pulsePoint || !pulseRail) return;
        const railRect = pulseRail.getBoundingClientRect();
        const railWidth = railRect.width || window.innerWidth;

        // Base subtle autonomous sinusoidal movement
        const baseNormX = 0.5 + 0.36 * Math.sin(time * 0.00042);

        // Distance from cursor to the pulse line
        const dy = Math.abs(cursorY - railRect.top);
        let currentTargetX = baseNormX * railWidth;

        if (dy < 80 && cursorX >= 0 && cursorX <= railWidth) {
            // Cursor proximity influence: gently biases the point toward cursor X
            const proxFactor = Math.max(0, 1 - (dy / 80));
            currentTargetX = (baseNormX * (1 - proxFactor * 0.35)) + (cursorX * proxFactor * 0.35);
        }

        pulsePoint.style.transform = `translateX(${Math.max(4, Math.min(railWidth - 10, currentTargetX - 3))}px)`;
        animFrame = requestAnimationFrame(updatePulsePoint);
    }

    animFrame = requestAnimationFrame(updatePulsePoint);

    // Track mouse on footer for rail interaction
    footer.addEventListener('mousemove', (e) => {
        const railRect = pulseRail ? pulseRail.getBoundingClientRect() : footer.getBoundingClientRect();
        cursorX = e.clientX - railRect.left;
        cursorY = e.clientY;
    }, { passive: true });

    footer.addEventListener('mouseleave', () => {
        cursorX = -9999;
        cursorY = -9999;
    });

    // ── 4. Subtle Wordmark Letter Hover Interaction ──
    if (wordmark && letters.length) {
        let activeLetter = null;

        wordmark.addEventListener('mousemove', (e) => {
            let closestLetter = null;
            let minDistance = Infinity;

            letters.forEach((span) => {
                const rect = span.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const dist = Math.abs(e.clientX - centerX);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestLetter = span;
                }
            });

            if (closestLetter && closestLetter !== activeLetter) {
                if (activeLetter) activeLetter.classList.remove('is-active');
                closestLetter.classList.add('is-active');
                activeLetter = closestLetter;
                triggerPulseBump();
            }
        });

        wordmark.addEventListener('mouseleave', () => {
            if (activeLetter) {
                activeLetter.classList.remove('is-active');
                activeLetter = null;
            }
        });
    }
}


