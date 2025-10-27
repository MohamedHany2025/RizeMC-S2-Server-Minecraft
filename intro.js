// Intro video controller
(function(){
    // Only run on index page
    if (!document.body.classList.contains('index-page')) return;

    // Check if video was already shown
    const introShown = localStorage.getItem('introShown');
    const currentDate = new Date().toDateString();

    // Show intro once per day
    if (introShown === currentDate) {
        return;
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'intro-overlay';
    
    // Create YouTube video container
    const videoContainer = document.createElement('div');
    videoContainer.className = 'intro-container';
    videoContainer.innerHTML = `
        <div class="video-message">
            <h2 style="color: #ff4444; margin-bottom: 1rem; font-size: 2rem;">🎮 مرحباً بك في سيرفر RizeMC! 🎮</h2>
            <p style="color: white; margin-bottom: 2rem; font-size: 1.2rem;">شاهد الفيديو التشويقي للسيرفر</p>
            <a href="https://www.youtube.com/watch?v=m4KKTjUilDY" target="_blank" class="watch-youtube-btn">
                <i class="fab fa-youtube"></i> شاهد الفيديو على يوتيوب
            </a>
            <p style="color: #aaa; margin-top: 1rem; font-size: 0.9rem;">سيتم فتح الفيديو في نافذة جديدة</p>
        </div>
    `;
    
    // Add custom styles for the new elements
    const style = document.createElement('style');
    style.textContent = `
        .video-message {
            text-align: center;
            padding: 2rem;
        }
        .watch-youtube-btn {
            display: inline-block;
            background: #ff0000;
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
        }
        .watch-youtube-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(255, 0, 0, 0.4);
            background: #ff1a1a;
        }
        .watch-youtube-btn i {
            margin-right: 0.5rem;
        }
    `;
    document.head.appendChild(style);
    
    // Create skip button
    const skipBtn = document.createElement('button');
    skipBtn.className = 'skip-button';
    skipBtn.textContent = 'تخطي المقدمة ⏭️';
    
    // Create container for iframe
    const container = document.createElement('div');
    container.className = 'intro-container';
    container.appendChild(iframe);
    
    // Add elements to overlay
    overlay.appendChild(container);
    overlay.appendChild(skipBtn);
    document.body.appendChild(overlay);

    // Function to remove intro
    function removeIntro() {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);
        localStorage.setItem('introShown', currentDate);
        
        // Start background music after intro
        const audioEl = document.getElementById('bg-music');
        if (audioEl) {
            audioEl.play().catch(() => {
                // Show play hint if autoplay blocked
                const musicHint = document.getElementById('music-hint');
                if (musicHint) musicHint.style.display = 'block';
            });
        }
    }

    // Remove intro when video ends
    // Remove intro when skip clicked
    skipBtn.addEventListener('click', removeIntro);
    
    // Remove intro when ESC pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') removeIntro();
    });
    
    // Style overlay fade-in
    overlay.style.transition = 'opacity 0.5s ease';
    
    // Show skip button after 3 seconds
    setTimeout(() => {
        skipBtn.classList.add('visible');
    }, 3000);
    
    // Optional: pause background music during intro
    const audioEl = document.getElementById('bg-music');
    if (audioEl) audioEl.pause();
})();