// Shared audio controller with cross-page state synchronization
(function(){
    const MUSIC_KEY = 'bgMusicState';
    const MUSIC_TIME_KEY = 'bgMusicTime';
    let audioEl = null;

    // Save music state and time periodically
    function saveMusicState() {
        if(!audioEl) return;
        const state = {
            paused: audioEl.paused,
            time: audioEl.currentTime,
            timestamp: Date.now()
        };
        localStorage.setItem(MUSIC_KEY, JSON.stringify(state));
    }

    // Load saved music state
    function loadMusicState() {
        try {
            const state = JSON.parse(localStorage.getItem(MUSIC_KEY) || '{}');
            return {
                paused: state.paused === true,
                time: state.time || 0,
                timestamp: state.timestamp || 0
            };
        } catch(e) {
            return { paused: true, time: 0, timestamp: 0 };
        }
    }

    // Create the control button
    function createControl() {
        if(document.getElementById('music-toggle')) return;
        const ctrl = document.createElement('button');
        ctrl.id = 'music-toggle';
        ctrl.title = 'M لتشغيل/إيقاف الموسيقى';
        ctrl.style.position = 'fixed';
        ctrl.style.left = '10px';
        ctrl.style.bottom = '10px';
        ctrl.style.zIndex = 9999;
        ctrl.style.background = 'rgba(0,0,0,0.5)';
        ctrl.style.color = '#fff';
        ctrl.style.border = 'none';
        ctrl.style.padding = '0.6rem 0.8rem';
        ctrl.style.borderRadius = '8px';
        ctrl.style.cursor = 'pointer';
        ctrl.addEventListener('click', () => {
            if(!audioEl) return;
            if(audioEl.paused){
                audioEl.play();
                ctrl.textContent = '🔊';
            } else {
                audioEl.pause();
                ctrl.textContent = '🔇';
            }
            saveMusicState();
        });
        document.body.appendChild(ctrl);
        return ctrl;
    }

    // Show play hint if autoplay is blocked
    function showPlayHint() {
        if(document.getElementById('music-hint')) return;
        const hint = document.createElement('div');
        hint.id = 'music-hint';
        hint.style.position = 'fixed';
        hint.style.left = '50%';
        hint.style.top = '92%';
        hint.style.transform = 'translate(-50%, -50%)';
        hint.style.zIndex = 10000;
        hint.innerHTML = '<button id="music-start-btn" style="padding:0.6rem 1rem;border-radius:8px;border:none;background:#ff4444;color:#fff;">تشغيل الموسيقى</button>';
        document.body.appendChild(hint);
        document.getElementById('music-start-btn').addEventListener('click', () => {
            if(audioEl) {
                audioEl.play().then(() => {
                    hint.remove();
                    saveMusicState();
                    const c = document.getElementById('music-toggle');
                    if(c) c.textContent = '🔊';
                });
            }
        });
    }

    // Initialize music controller
    function initMusic() {
        // Get saved state
        const savedState = loadMusicState();
        
        fetch('info.json')
            .then(r => r.json())
            .then(cfg => {
                const file = cfg && cfg.music && cfg.music.file;
                if(!file) return;

                // Create or get existing audio element
                audioEl = document.getElementById('bg-music') || new Audio(file);
                audioEl.id = 'bg-music';
                audioEl.loop = true; // Always loop
                audioEl.preload = 'auto';
                audioEl.volume = 0.5;
                audioEl.crossOrigin = 'anonymous';

                // Ensure only one audio element exists
                if(!document.getElementById('bg-music')) {
                    document.body.appendChild(audioEl);
                }

                // Create control button
                const ctrl = createControl();

                // Restore playback position if recent
                if(Date.now() - savedState.timestamp < 3600000) { // Within last hour
                    audioEl.currentTime = savedState.time;
                }

                // Handle saved state
                if(savedState.paused) {
                    audioEl.pause();
                    if(ctrl) ctrl.textContent = '🔇';
                } else {
                    audioEl.play()
                        .then(() => { if(ctrl) ctrl.textContent = '🔊'; })
                        .catch(() => {
                            if(ctrl) ctrl.textContent = '🔇';
                            showPlayHint();
                        });
                }

                // Save state periodically
                setInterval(saveMusicState, 1000);

                // Add keyboard control
                window.addEventListener('keydown', (e) => {
                    if(e.key && e.key.toLowerCase() === 'm') {
                        if(audioEl.paused) {
                            audioEl.play();
                            if(ctrl) ctrl.textContent = '🔊';
                        } else {
                            audioEl.pause();
                            if(ctrl) ctrl.textContent = '🔇';
                        }
                        saveMusicState();
                    }
                });

                // Handle page unload
                window.addEventListener('beforeunload', saveMusicState);

                // Handle playback end (shouldn't happen with loop=true, but just in case)
                audioEl.addEventListener('ended', () => {
                    audioEl.currentTime = 0;
                    audioEl.play();
                });
            })
            .catch(err => { console.error('Failed to load music config', err); });
    }

    document.addEventListener('DOMContentLoaded', initMusic);
})();