/* ========================================
   CYBERDREADX — Landing Page Scripts
   Matrix Rain, Terminal Boot, Glitch FX,
   Scroll Reveals, Mobile Menu
   ======================================== */

(function () {
    'use strict';

    // ========================================
    // MATRIX RAIN (Katakana + Latin)
    // ========================================
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');

    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    const chars = katakana + latin;

    let fontSize = 14;
    let columns;
    let drops;

    function initMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = new Array(columns).fill(1).map(() => Math.random() * -100);
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px JetBrains Mono, monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Color variation — mostly green, occasional purple/cyan
            const rng = Math.random();
            if (rng > 0.98) {
                ctx.fillStyle = '#a855f7'; // purple
            } else if (rng > 0.96) {
                ctx.fillStyle = '#00f0ff'; // cyan
            } else if (rng > 0.94) {
                ctx.fillStyle = '#ff00aa'; // magenta
            } else {
                ctx.fillStyle = '#22c55e'; // green
            }

            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    initMatrix();
    setInterval(drawMatrix, 50);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initMatrix, 200);
    });

    // ========================================
    // TERMINAL BOOT SEQUENCE
    // ========================================
    const terminalBody = document.getElementById('terminal-body');
    const bootLines = [
        { text: '> Initializing CYBERDREADX kernel...', cls: 'line--muted', delay: 300 },
        { text: '> Loading neural subsystems.......... [OK]', cls: 'line--green', delay: 600 },
        { text: '> Mounting encrypted volumes......... [OK]', cls: 'line--green', delay: 900 },
        { text: '> Establishing quantum-safe tunnel... [OK]', cls: 'line--green', delay: 1200 },
        { text: '> Scanning network nodes............ 6 found', cls: 'line--cyan', delay: 1500 },
        { text: '> ACCESS GRANTED.', cls: 'line--magenta', delay: 1900 },
        { text: '> Welcome, Operator.', cls: 'line--magenta', delay: 2200 },
    ];

    let bootStarted = false;

    function runBootSequence() {
        if (bootStarted) return;
        bootStarted = true;

        bootLines.forEach((lineData, index) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = `line ${lineData.cls}`;
                line.textContent = lineData.text;
                line.style.animationDelay = '0s';
                terminalBody.appendChild(line);
            }, lineData.delay);
        });
    }

    // Start boot after short delay
    setTimeout(runBootSequence, 500);

    // ========================================
    // TYPED TEXT EFFECT
    // ========================================
    const typedElement = document.getElementById('typed-text');
    const phrases = [
        'Building autonomous agents.',
        'Engineering neural render pipelines.',
        'Designing post-quantum cryptography.',
        'Crafting multi-agent battle arenas.',
        'Creating the future, one node at a time.',
        'Full-stack. AI-native. Cyberpunk.',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 25;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50 + Math.random() * 40;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 300;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 2500);

    // ========================================
    // SCROLL REVEAL (IntersectionObserver)
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger reveals
                const el = entry.target;
                const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
                const staggerIndex = siblings.indexOf(el);
                const delay = staggerIndex * 100;

                setTimeout(() => {
                    el.classList.add('visible');
                }, delay);

                revealObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile nav
                mobileNav.classList.remove('open');
                menuBtn.classList.remove('active');
            }
        });
    });

    // ========================================
    // MOBILE MENU
    // ========================================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileNav.classList.toggle('open');
    });

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const sysHeader = document.getElementById('sys-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            sysHeader.style.borderBottomColor = 'rgba(168, 85, 247, 0.3)';
        } else {
            sysHeader.style.borderBottomColor = 'rgba(168, 85, 247, 0.15)';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ========================================
    // RANDOM GLITCH FLICKER
    // ========================================
    const glitchTitle = document.querySelector('.glitch');
    
    function triggerGlitch() {
        glitchTitle.style.animation = 'none';
        glitchTitle.offsetHeight; // force reflow
        
        // Random subtle text distortion
        const skewX = (Math.random() - 0.5) * 2;
        const translateX = (Math.random() - 0.5) * 4;
        glitchTitle.style.transform = `skewX(${skewX}deg) translateX(${translateX}px)`;
        
        setTimeout(() => {
            glitchTitle.style.transform = '';
        }, 100);
        
        // Schedule next glitch
        const nextGlitch = 3000 + Math.random() * 5000;
        setTimeout(triggerGlitch, nextGlitch);
    }

    setTimeout(triggerGlitch, 4000);

    // ========================================
    // NODE CARD — HOVER GLOW FOLLOW
    // ========================================
    document.querySelectorAll('.node-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Subtle radial glow that follows cursor
            card.style.background = `radial-gradient(
                300px circle at ${x}px ${y}px,
                rgba(168, 85, 247, 0.08),
                rgba(10, 10, 15, 1) 70%
            )`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // ========================================
    // AMBIENT PARTICLE CONNECTIONS (optional subtle effect)
    // ========================================
    // Keeping this minimal — the matrix rain is the hero

})();
