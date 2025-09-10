document.addEventListener("DOMContentLoaded", function () {
    const bg = document.querySelector('.parallax-img');
    const section = document.querySelector('.section-intro');
    const speemeSign = document.querySelector('.speeme-sign');
    const readySign = document.querySelector('.ready-sign');

    const section2 = document.querySelector('.section-explanation');
    const bg2 = document.querySelector('.parallax-bg-2');

    const section3 = document.querySelector('.section-register');
    const bg3 = document.querySelector('.parallax-bg-3');
    const registerSection = document.querySelector('.section-register');
    const registerSticky = document.querySelector('.register-sticky');

    const section4 = document.querySelector('.section-login');
    const bg4 = document.querySelector('.parallax-bg-4');
    const loginForm = document.querySelector('.login-form');
    const loginSection = document.querySelector('.section-login');
    const loginSticky = document.querySelector('.login-sticky');

    const navLinks = document.querySelectorAll('.nav-link');
    const navDot = document.querySelector('.nav-indicator-dot');
    const sections = [
        document.querySelector('.section-intro'),
        document.querySelector('.section-explanation'),
        document.querySelector('.section-register'),
        document.querySelector('.section-login')
    ];

    // Current animated values
    let currentScale = 1;
    let currentTranslateY = 0;
    let currentOpacityBg = 1;
    let currentOpacityBg2 = 0;
    let currentOpacityBg3 = 0;
    let currentScale2 = 1;
    let currentOpacityBg4 = 0;
    let currentScale4 = 1;

    // Target values
    let targetScale = 1;
    let targetTranslateY = 0;
    let targetOpacityBg = 1;
    let targetOpacityBg2 = 0;
    let targetOpacityBg3 = 0;
    let targetScale2 = 1;
    let targetOpacityBg4 = 0;

    // Track the last carousel index globally
    let lastCarouselIndex = 0;
    let carouselItemCount = 5; 

    let locked = false;
    let hasLockedThisVisit = false;
    let loginLocked = false;
    let loginHasLockedThisVisit = false;

    let speemeFadeStart = null;
    const speemeFadeDuration = 2000; 
    speemeFadeStart = performance.now();

    function updateNavDot() {
        if (!navDot || sections.length < 2) return;

        // Get the scroll position
        const scrollY = window.scrollY || window.pageYOffset;

        // Find which section we're currently in
        let sectionIndex = 0;
        for (let i = 0; i < sections.length; i++) {
            if (scrollY >= sections[i].offsetTop) {
                sectionIndex = i;
            }
        }

        // Calculate progress between current and next section
        let nextIndex = Math.min(sectionIndex + 1, sections.length - 1);
        let sectionStart = sections[sectionIndex].offsetTop;
        let sectionEnd = sections[nextIndex].offsetTop;
        let sectionProgress = 0;
        if (sectionEnd !== sectionStart) {
            sectionProgress = (scrollY - sectionStart) / (sectionEnd - sectionStart);
            sectionProgress = Math.max(0, Math.min(sectionProgress, 1));
        }

        // Get nav link centers relative to nav bar
        const navBar = document.querySelector('.nav-bar');
        const navBarRect = navBar.getBoundingClientRect();
        const navCenters = Array.from(navLinks).map(link => {
            const rect = link.getBoundingClientRect();
            return rect.left - navBarRect.left + rect.width / 2 - navDot.offsetWidth / 2;
        });

        // Interpolate dot position between current and next nav link
        const dotLeft = navCenters[sectionIndex] + (navCenters[nextIndex] - navCenters[sectionIndex]) * sectionProgress;
        navDot.style.left = `${dotLeft}px`;
    }

    window.addEventListener('scroll', updateNavDot);
    window.addEventListener('resize', updateNavDot);
    updateNavDot();

    window.addEventListener('carouselItemChange', function(e) {
        lastCarouselIndex = e.detail.itemIndex;
        // Normal zoom for carousel items (except last zoom handled below)
        targetScale2 = 1 + lastCarouselIndex * 0.4;
        carouselItemCount = e.detail.carouselItemCount || carouselItemCount;
    });

    function updateTargets() {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress through section 1
        const scrollDistance = 1500; // px of scroll for full zoom
        let progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);

        // Fade out during the last 20% of section 1
        let fadeOutStart = 1;
        let fadeOutProgress = 0;
        if (progress > fadeOutStart) {
            fadeOutProgress = (progress - fadeOutStart) / (1 - fadeOutStart);
        }
        fadeOutProgress = Math.max(0, Math.min(fadeOutProgress, 1));

        // Parallax/zoom as before
        targetScale = 1 + Math.pow(progress, 2) * 5;

        // Fade out both image and text at the end of section 1
        targetOpacityBg = 1 - fadeOutProgress;

        // Section 2 background fade in as before
        const rect2 = section2.getBoundingClientRect();
        const fadeStart = windowHeight * 0.2;
        const fadeEnd = windowHeight * 0.8;
        let fadeProgress = 0;

        if (rect2.top < fadeEnd && rect2.top > fadeStart) {
            fadeProgress = 1 - (rect2.top - fadeStart) / (fadeEnd - fadeStart);
            fadeProgress = Math.max(0, Math.min(fadeProgress, 1));
        } else if (rect2.top <= fadeStart) {
            fadeProgress = 1;
        }
        targetOpacityBg2 = fadeProgress;

        if (fadeProgress >= 1) {
            targetOpacityBg = 0;
        } else {
            targetOpacityBg = 1 - fadeOutProgress;
        }

        // Section 3 background fade in
        const rect3 = section3.getBoundingClientRect();
        const fadeStart3 = windowHeight * 0.2;
        const fadeEnd3 = windowHeight * 0.8;
        let fadeProgress3 = 0;

        if (rect3.top < fadeEnd3 && rect3.top > fadeStart3) {
            fadeProgress3 = 1 - (rect3.top - fadeStart3) / (fadeEnd3 - fadeStart3);
            fadeProgress3 = Math.max(0, Math.min(fadeProgress3, 1));
        } else if (rect3.top <= fadeStart3) {
            fadeProgress3 = 1;
        }

        targetOpacityBg3 = fadeProgress3;

        // Fade out background 2 as section 3 fades in
        if (fadeProgress3 > 0) {
            targetOpacityBg2 = 1 - fadeProgress3;
        }

        // Section 4 background fade in and zoom
        const rect4 = section4.getBoundingClientRect();
        const fadeStart4 = windowHeight * 0.2;
        const fadeEnd4 = windowHeight * 0.8;
        let fadeProgress4 = 0;

        if (rect4.top < fadeEnd4 && rect4.top > fadeStart4) {
            fadeProgress4 = 1 - (rect4.top - fadeStart4) / (fadeEnd4 - fadeStart4);
            fadeProgress4 = Math.max(0, Math.min(fadeProgress4, 1));
        } else if (rect4.top <= fadeStart4) {
            fadeProgress4 = 1;
        }
        targetOpacityBg4 = fadeProgress4;

        // Fade out background 3 as section 4 fades in
        let targetScale4 = 1;

        if (fadeProgress4 > 0) {
            targetOpacityBg3 = 1 - fadeProgress4;
            targetOpacityBg4 = fadeProgress4;
            targetScale4 = 1;
            const registerForm = document.querySelector('.register-form');
            if (registerForm) registerForm.style.opacity = 1 - fadeProgress4;
            targetOpacityBg2 = 0;
        }

        if (fadeProgress4 > 0) {
            targetOpacityBg3 = 1 - fadeProgress4;
            targetOpacityBg4 = fadeProgress4;
            targetScale4 = 1 + fadeProgress4 * 1.2;
            const registerForm = document.querySelector('.register-form');
            if (registerForm) registerForm.style.opacity = 1 - fadeProgress4;
        }

        // Final zoom at the end of the carousel, synced with section 3 fade in
        if (lastCarouselIndex === carouselItemCount - 1 && fadeProgress3 > 0) {
            targetScale2 = 1 + (carouselItemCount - 1) * 0.9 + fadeProgress3 * 0.8;
        }
    }

    window.addEventListener('scroll', function () {
        // REGISTER LOCK
        if (registerSection && registerSticky) {
            const rect = registerSection.getBoundingClientRect();

            if ((rect.bottom <= 0 || rect.top >= window.innerHeight)) {
                hasLockedThisVisit = false;
            }

            if (
                !locked &&
                !hasLockedThisVisit &&
                (
                    (rect.top <= window.innerHeight * 0.2 && rect.bottom > window.innerHeight * 0.8) ||
                    (rect.bottom >= window.innerHeight * 0.8 && rect.top < window.innerHeight * 0.2)
                )
            ) {
                locked = true;
                hasLockedThisVisit = true;
                registerSticky.style.position = 'fixed';
                registerSticky.style.top = '20vh';
                registerSticky.style.left = '50%';
                registerSticky.style.transform = 'translateX(-50%)';
                document.body.style.overflow = 'hidden';

                setTimeout(() => {
                    const unlock = () => {
                        registerSticky.style.position = 'sticky';
                        registerSticky.style.top = '20vh';
                        registerSticky.style.left = '';
                        registerSticky.style.transform = '';
                        document.body.style.overflow = '';
                        locked = false;
                        window.removeEventListener('wheel', unlock);
                        window.removeEventListener('touchmove', unlock);
                        window.removeEventListener('keydown', unlock);
                    };
                    window.addEventListener('wheel', unlock, { once: true });
                    window.addEventListener('touchmove', unlock, { once: true });
                    window.addEventListener('keydown', unlock, { once: true });
                }, 100);
            }
        }

        // LOGIN LOCK
        if (loginSection && loginSticky) {
            const rect = loginSection.getBoundingClientRect();

            if ((rect.bottom <= 0 || rect.top >= window.innerHeight)) {
                loginHasLockedThisVisit = false;
            }

            if (
                !loginLocked &&
                !loginHasLockedThisVisit &&
                (
                    (rect.top <= window.innerHeight * 0.2 && rect.bottom > window.innerHeight * 0.8) ||
                    (rect.bottom >= window.innerHeight * 0.8 && rect.top < window.innerHeight * 0.2)
                )
            ) {
                loginLocked = true;
                loginHasLockedThisVisit = true;
                loginSticky.style.position = 'fixed';
                loginSticky.style.top = '20vh';
                loginSticky.style.left = '50%';
                loginSticky.style.transform = 'translateX(-50%)';
                document.body.style.overflow = 'hidden';

                setTimeout(() => {
                    const unlock = () => {
                        loginSticky.style.position = 'sticky';
                        loginSticky.style.top = '20vh';
                        loginSticky.style.left = '';
                        loginSticky.style.transform = '';
                        document.body.style.overflow = '';
                        loginLocked = false;
                        window.removeEventListener('wheel', unlock);
                        window.removeEventListener('touchmove', unlock);
                        window.removeEventListener('keydown', unlock);
                    };
                    window.addEventListener('wheel', unlock, { once: true });
                    window.addEventListener('touchmove', unlock, { once: true });
                    window.addEventListener('keydown', unlock, { once: true });
                }, 100);
            }
        }
    });

function animate() {
    const lerp = 0.5;

    currentScale += (targetScale - currentScale) * lerp;
    currentTranslateY += (targetTranslateY - currentTranslateY) * lerp;
    currentOpacityBg += (targetOpacityBg - currentOpacityBg) * lerp;
    currentOpacityBg2 += (targetOpacityBg2 - currentOpacityBg2) * lerp;
    currentOpacityBg3 += (targetOpacityBg3 - currentOpacityBg3) * lerp;
    currentScale2 += (targetScale2 - currentScale2) * lerp;
    currentOpacityBg4 += (targetOpacityBg4 - currentOpacityBg4) * lerp;

    if (bg && speemeSign) {
        const shiftX = 1 * (currentScale - 1);
        const shiftY = 10 * (currentScale - 1);
        speemeSign.style.transform = `scale(${currentScale}) translate(${shiftX}vw, ${shiftY}vw)`;
    }

    if (bg) {
        const shiftX = 1 * (currentScale - 1);
        bg.style.transform = `scale(${currentScale}) translate(${shiftX}vw, ${currentTranslateY}%)`;
    }

    // Timer-based fade-in for speemeSign (1 second)
    if (speemeSign) {
        if (speemeFadeStart === null) {
            speemeFadeStart = performance.now();
        }
        let fadeProgress = 1;
        const now = performance.now();
        fadeProgress = Math.min((now - speemeFadeStart) / speemeFadeDuration, 1);
        speemeSign.style.opacity = fadeProgress;

        // Keep background fully opaque until sign is fully faded in
        if (fadeProgress < 1 && bg) {
            bg.style.opacity = 1;
        }
    }

    // Only handle readySign fade/scale here, NOT speemeSign opacity
    if (readySign) {
        const sectionRect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (sectionRect.bottom < 0 || sectionRect.top > windowHeight) {
            readySign.style.opacity = 0;
        } else {
            const fadeStart = 0.5;
            const fadeEnd = 0.8;
            const minScale = 0.3;
            const maxScale = 1.5;
            let progress = Math.min(Math.max(-sectionRect.top / 1500, 0), 1);
            let readyScale = minScale;

            // Fade in ready
            if (progress < fadeStart) {
                readySign.style.opacity = 0;
            } else if (progress > fadeEnd) {
                readySign.style.opacity = 1;
            } else {
                readySign.style.opacity = (progress - fadeStart) / (fadeEnd - fadeStart);
            }

            // Scale ready
            if (progress < fadeStart) {
                readyScale = minScale;
            } else if (progress > fadeEnd) {
                readyScale = maxScale;
            } else {
                readyScale = minScale + ((progress - fadeStart) / (fadeEnd - fadeStart)) * (maxScale - minScale);
            }
            readySign.style.transform = `translate(-50%, -50%) scale(${readyScale})`;
        }
    }

    if (bg2) {
        const img2 = bg2.querySelector('.parallax-img-2');
        if (img2) {
            const shiftY = -2 * (currentScale2 - 1);
            img2.style.transform = `scale(${currentScale2}) translateY(${shiftY}vw)`;
            img2.style.opacity = currentOpacityBg2;
        }
    }
    if (bg3) {
        const img3 = bg3.querySelector('.parallax-img-3');
        if (img3) {
            const zoomAmount = 1 + (1 - currentOpacityBg3) * 0.5;
            img3.style.opacity = currentOpacityBg3;
            img3.style.transform = `scale(${zoomAmount})`;
        }
        bg3.style.opacity = 1;
    }
    if (bg4) bg4.style.opacity = currentOpacityBg4;
    if (bg4) bg4.querySelector('.parallax-img-4').style.transform = `scale(${currentScale4})`;
    if (registerSticky) registerSticky.style.opacity = currentOpacityBg3;
    if (loginSticky) loginSticky.style.opacity = currentOpacityBg4;
    if (loginForm) loginForm.style.opacity = currentOpacityBg4;

    const carousel = document.querySelector('.scroll-carousel');
    if (carousel) carousel.style.opacity = currentOpacityBg2;

    const registerForm = document.querySelector('.register-form');
    if (registerForm) registerForm.style.opacity = currentOpacityBg3;

    requestAnimationFrame(animate);
}

    window.addEventListener('scroll', updateTargets);
    updateTargets();
    animate();

    // Listen for carousel item change to zoom background 2
    window.addEventListener('carouselItemChange', function(e) {
        const itemIndex = e.detail.itemIndex;
        targetScale2 = 1 + itemIndex * 0.4;
    });
});