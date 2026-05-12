document.addEventListener('DOMContentLoaded', function () {

    // --- Live Age Counter ---
    const birthDate = new Date('2007-05-13T00:00:00');
    const countdownElement = document.getElementById('countdown');

    function updateAge() {
        const now = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        countdownElement.innerHTML = `${years}y ${months}m ${days}d <br> ${hours}h ${minutes}m ${seconds}s`;
    }
    setInterval(updateAge, 1000);
    updateAge();

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
    });

    // --- Initialize LightGallery ---
    lightGallery(document.getElementById('lightgallery'), {
        speed: 500,
        download: false,
        selector: 'a'
    });

    // --- Hall of Fame Scroller ---
    const scroller = document.getElementById('hall-of-fame-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        const card = scroller.querySelector('.snap-center');
        const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card.parentElement).gap || '0');

        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    // --- Gallery Scroller ---
    const galleryScroller = document.getElementById('lightgallery-scroller');
    const galleryScrollLeftBtn = document.getElementById('gallery-scroll-left');
    const galleryScrollRightBtn = document.getElementById('gallery-scroll-right');
    if (galleryScroller && galleryScrollLeftBtn && galleryScrollRightBtn) {
        const galleryCard = galleryScroller.querySelector('.snap-center');
        if (galleryCard) {
            const galleryCardWidth = galleryCard.offsetWidth + parseInt(getComputedStyle(galleryCard.parentElement).gap || '0');

            galleryScrollRightBtn.addEventListener('click', () => {
                galleryScroller.scrollBy({ left: galleryCardWidth, behavior: 'smooth' });
            });
            galleryScrollLeftBtn.addEventListener('click', () => {
                galleryScroller.scrollBy({ left: -galleryCardWidth, behavior: 'smooth' });
            });
        }
    }

    // --- Video Uploader ---
    const videoUploadInput = document.getElementById('video-upload');
    const videoPlayer = document.getElementById('video-player');
    const videoUploadLabel = document.getElementById('video-upload-label');

    if (videoUploadInput && videoPlayer && videoUploadLabel) {
        videoUploadLabel.addEventListener('click', () => {
            videoUploadInput.click();
        });

        videoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const videoURL = URL.createObjectURL(file);
                videoPlayer.src = videoURL;
                videoPlayer.classList.remove('hidden');
                videoUploadLabel.classList.add('hidden');
                videoPlayer.play();
            }
        });
    }


    // --- Sakura Petal Animation ---
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        const numPetals = 50;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 25 + Math.random() * 15;
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 40;
            this.flip = Math.random();
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function () {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
                this.xSpeed = 1.5 + Math.random() * 2;
                this.ySpeed = 1 + Math.random() * 1;
                this.flip = Math.random();
            }
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
            ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
            ctx.closePath();
            ctx.fillStyle = '#FFB7C5';
            ctx.fill();
        }

        Petal.prototype.update = function () {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        }

        function createPetals() {
            petals = [];
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => {
                petal.update();
            });
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }

    // --- Cake Interaction Logic ---
    const cakeContainer = document.getElementById('cake-container');
    const cakeLeft = document.getElementById('cake-left');
    const cakeRight = document.getElementById('cake-right');
    const candle = document.getElementById('candle');
    const flame = document.getElementById('flame');
    const cakeInstructions = document.getElementById('cake-instructions');
    const finalMessage = document.getElementById('final-message');

    // Make the cake directly clickable
    if (cakeContainer) {
        cakeContainer.classList.remove('opacity-50', 'pointer-events-none');
        cakeContainer.classList.add('opacity-100', 'cursor-pointer');
        cakeContainer.addEventListener('click', cutCake, { once: true });
    }

    function cutCake() {
        // Cut animation
        cakeLeft.classList.add('cut');
        cakeRight.classList.add('cut');
        candle.style.opacity = '0';

        // Final Message Reveal
        setTimeout(() => {
            cakeInstructions.style.display = 'none';
            finalMessage.classList.remove('hidden');
            // small delay to allow display block to apply before opacity transition
            setTimeout(() => finalMessage.classList.remove('opacity-0'), 50);

            // more confetti
            if (typeof confetti === 'function') {
                var duration = 3 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                var interval = setInterval(function () {
                    var timeLeft = animationEnd - Date.now();
                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }
                    var particleCount = 50 * (timeLeft / duration);
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);
            }
        }, 1000);
    }

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const bgMusic = document.getElementById('bg-music');
    const finaleMusic = document.getElementById('finale-music');
    const muteBtn = document.getElementById('mute-btn');
    const iconUnmuted = document.getElementById('icon-unmuted');
    const iconMuted = document.getElementById('icon-muted');

    if (bgMusic && muteBtn) {
        // Initially set the volume to a comfortable level
        bgMusic.volume = 0.4;
        if (finaleMusic) finaleMusic.volume = 0;

        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent document click from firing
            bgMusic.muted = !bgMusic.muted;
            if (finaleMusic) finaleMusic.muted = bgMusic.muted;

            if (bgMusic.muted) {
                iconUnmuted.classList.add('hidden');
                iconMuted.classList.remove('hidden');
            } else {
                iconUnmuted.classList.remove('hidden');
                iconMuted.classList.add('hidden');
                // Ensure it's playing if it was paused by browser policy
                bgMusic.play().catch(e => console.log('Audio play failed:', e));
                if (finaleMusic && finaleMusicStarted) {
                    finaleMusic.play().catch(e => console.log('Finale audio play failed:', e));
                }
            }
        });

        // Try to play on first user interaction if blocked by browser
        const startAudio = () => {
            if (!bgMusic.muted && !finaleMusicStarted) {
                bgMusic.play().catch(e => console.log('Autoplay prevented:', e));
            }
            document.removeEventListener('click', startAudio);
            document.removeEventListener('touchstart', startAudio);
        };
        document.addEventListener('click', startAudio);
        document.addEventListener('touchstart', startAudio);
    }

    // --- Finale Music Transition ---
    const finaleContainer = document.getElementById('finale-container');
    let finaleMusicStarted = false;

    if (finaleContainer && bgMusic && finaleMusic) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !finaleMusicStarted) {
                    finaleMusicStarted = true;
                    
                    // Fade out bg-music
                    let fadeOutInterval = setInterval(() => {
                        if (bgMusic.volume > 0.05) {
                            bgMusic.volume -= 0.05;
                        } else {
                            bgMusic.pause();
                            bgMusic.volume = 0;
                            clearInterval(fadeOutInterval);
                        }
                    }, 100);

                    // Fade in finale-music
                    if (!bgMusic.muted) {
                        finaleMusic.muted = false;
                        finaleMusic.play().catch(e => console.log('Finale audio play failed:', e));
                        let fadeInInterval = setInterval(() => {
                            if (finaleMusic.volume < 0.35) {
                                finaleMusic.volume += 0.05;
                            } else {
                                clearInterval(fadeInInterval);
                            }
                        }, 100);
                    } else {
                        finaleMusic.muted = true;
                        finaleMusic.play().catch(e => console.log('Finale audio play failed:', e));
                    }
                }
            });
        }, { threshold: 0.1 });

        observer.observe(finaleContainer);
    }

});

