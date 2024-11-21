export default {
    async fetch(request, env, ctx) {
      const html = `<!DOCTYPE html>
  <html lang="zh">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CRYCHIC Official Site</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
      <style>
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            opacity: 0;
            animation: fadeIn 2s ease forwards;
        }
  
          html, body {
              width: 100%;
              height: 100vh;
              overflow: hidden;
              background: #000;
              position: relative;
          }
  
          body {
              font-family: 'Poppins', sans-serif;
          }
  
          .comparison {
              width: 100vw;
              height: 100vh;
              position: fixed;
              top: 0;
              left: 0;
              overflow: hidden;
              cursor: col-resize;
              opacity: 0;
              transform: scale(0.95);
              transition: all 0.5s ease-out;
              display: none;
          }
  
          .comparison.active {
              display: block;
              opacity: 1;
              transform: scale(1);
          }
  
          .image-a, .image-b {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          }
  
          .image-a {
              z-index: 2;
              clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
          }
  
          .divider {
              position: absolute;
              width: 3px;
              height: 100%;
              background: #fff;
              left: 50%;
              transform: translateX(-50%);
              z-index: 3;
              pointer-events: none;
          }
  
          .divider::before {
              content: '';
              position: absolute;
              width: 50px;
              height: 50px;
              background: rgba(255, 255, 255, 0.9);
              border: 3px solid #333;
              border-radius: 50%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              backdrop-filter: blur(5px);
              box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }
  
          .divider::after {
              content: '↔';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #333;
              font-size: 20px;
              font-weight: bold;
          }
  
          .switch-btn {
              position: fixed;
              bottom: 30px;
              right: 30px;
              width: 60px;
              height: 60px;
              background: #333;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(0,0,0,0.2);
              z-index: 100;
          }
  
          .switch-btn:hover {
              transform: scale(1.1);
              background: #444;
          }
  
          .title {
              position: absolute;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 8px 20px;
              border-radius: 30px;
              font-size: 14px;
              z-index: 10;
              backdrop-filter: blur(5px);
          }
  
          .progress {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 3px;
              background: rgba(255,255,255,0.3);
              z-index: 1000;
          }
  
          .progress-bar {
              height: 100%;
              background: #333;
              transition: width 0.3s ease;
          }
  
          /* 音乐播放器样式 */
          .music-controller {
              position: fixed;
              bottom: 30px;
              left: 30px;
              z-index: 1000;
          }
  
          .music-btn {
              width: 60px;
              height: 60px;
              background: #333;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }
  
          .music-btn:hover {
              transform: scale(1.1);
              background: #444;
          }
  
          .music-btn.playing {
              background: #4CAF50;
          }
  
          .music-panel {
              position: absolute;
              bottom: 70px;
              left: 0;
              width: 300px;
              background: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(10px);
              border-radius: 15px;
              padding: 15px;
              display: none;
              color: white;
              box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          }
  
          .track-info {
              margin-bottom: 10px;
          }
  
          .track-title {
              font-weight: 500;
              font-size: 14px;
              margin-bottom: 5px;
          }
  
          .track-artist {
              font-size: 12px;
              color: #aaa;
          }
  
          .progress-container {
              width: 100%;
              height: 4px;
              background: rgba(255,255,255,0.1);
              border-radius: 2px;
              margin: 10px 0;
              cursor: pointer;
          }
  
          .music-progress {
              height: 100%;
              background: #4CAF50;
              border-radius: 2px;
              transition: width 0.1s linear;
          }
  
          .controls {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 10px;
          }
  
          .control-btn {
              background: none;
              border: none;
              color: white;
              cursor: pointer;
              padding: 5px;
              transition: all 0.3s ease;
          }
  
          .control-btn:hover {
              color: #4CAF50;
          }
  
          .playlist {
              margin-top: 15px;
              max-height: 150px;
              overflow-y: auto;
          }
  
          .playlist-item {
              padding: 8px;
              cursor: pointer;
              border-radius: 5px;
              transition: all 0.3s ease;
          }
  
          .playlist-item:hover {
              background: rgba(255,255,255,0.1);
          }
  
          .playlist-item.active {
              background: rgba(76, 175, 80, 0.3);
          }
      </style>
  </head>
  <body class="min-h-screen">
      <div class="progress">
          <div class="progress-bar" id="progressBar"></div>
      </div>
  
      <div id="comparisons" class="relative w-full h-full">
          <!-- 对比组会通过JavaScript动态生成 -->
      </div>
  
      <button class="switch-btn" id="switchBtn">
          <i class="fas fa-sync-alt"></i>
      </button>
  
      <div class="music-controller">
          <div class="music-btn" id="musicBtn">
              <i class="fas fa-music"></i>
          </div>
          <div class="music-panel">
              <div class="track-info">
                  <div class="track-title" id="trackTitle">未播放</div>
                  <div class="track-artist" id="trackArtist">未知艺术家</div>
              </div>
              <div class="progress-container" id="progressContainer">
                  <div class="music-progress" id="musicProgress"></div>
              </div>
              <div class="controls">
                  <button class="control-btn" id="prevBtn"><i class="fas fa-backward"></i></button>
                  <button class="control-btn" id="playBtn"><i class="fas fa-play"></i></button>
                  <button class="control-btn" id="nextBtn"><i class="fas fa-forward"></i></button>
                  <button class="control-btn" id="volumeBtn"><i class="fas fa-volume-up"></i></button>
              </div>
              <div class="playlist" id="playlist">
                  <!-- 播放列表项会通过JavaScript动态生成 -->
              </div>
          </div>
      </div>
  `;
  
    const scriptContent = `
    <script>
        const imageGroups = [
            {
                id: 1,
                title: "Soyo 1",
                imageA: "https://cdn-fusion.imgcdn.store/i/2024/cc812763c75bcd6d.png",
                imageB: "https://cdn-fusion.imgcdn.store/i/2024/4efb31ad6ae92cf2.png"
            }
        ];

        const musicList = [
            {
                title: "春日影",
                artist: "Crychic",
                url: "https://raw.githubusercontent.com/yuygfgg/crychic-music/main/%E6%98%A5%E6%97%A5%E5%BD%B1.m4a",
                cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/91/a3/ef/91a3efba-22f1-5599-e38d-0042a2d7c2f1/4562494356767.png/460x460bb.jpg"
            },
            {
                title: "人間になりたいうた",
                artist: "Crychic",
                url: "https://raw.githubusercontent.com/yuygfgg/crychic-music/main/%E4%BA%BA%E9%96%93%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%9F%E3%81%84%E3%81%86%E3%81%9F.m4a",
                cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/91/a3/ef/91a3efba-22f1-5599-e38d-0042a2d7c2f1/4562494356767.png/460x460bb.jpg"
            }
            // 添加更多音乐
        ];

        let currentGroupIndex = 0;

        function createComparisons() {
            const comparisonsContainer = document.getElementById('comparisons');
            
            imageGroups.forEach((group, index) => {
                const comparison = document.createElement('div');
                comparison.className = \`comparison \${index === 0 ? 'active' : ''}\`;
                comparison.id = \`comparison-\${group.id}\`;
                comparison.innerHTML = \`
                    <div class="title">\${group.title}</div>
                    <img class="image-b" src="\${group.imageB}" alt="\${group.title} B">
                    <img class="image-a" src="\${group.imageA}" alt="\${group.title} A">
                    <div class="divider"></div>
                \`;

                comparisonsContainer.appendChild(comparison);
                
                comparison.addEventListener('mousemove', handleMove);
                comparison.addEventListener('touchmove', handleTouchMove);
                comparison.addEventListener('dragstart', (e) => e.preventDefault());
            });

            updateProgressBar();
        }

        function switchGroup() {
            const comparisons = document.querySelectorAll('.comparison');
            comparisons[currentGroupIndex].classList.remove('active');
            
            currentGroupIndex = (currentGroupIndex + 1) % imageGroups.length;
            
            comparisons[currentGroupIndex].classList.add('active');
            updateProgressBar();

            const btn = document.getElementById('switchBtn');
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = 'scale(1)', 200);
        }

        function updateProgressBar() {
            const progress = ((currentGroupIndex + 1) / imageGroups.length) * 100;
            document.getElementById('progressBar').style.width = \`\${progress}%\`;
        }

        function handleMove(e) {
            const container = e.currentTarget;
            const imageA = container.querySelector('.image-a');
            const divider = container.querySelector('.divider');
            
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = (x / rect.width) * 100;
            
            const limitedPercent = Math.max(0, Math.min(100, percent));
            
            divider.style.left = \`\${limitedPercent}%\`;
            imageA.style.clipPath = \`polygon(0 0, \${limitedPercent}% 0, \${limitedPercent}% 100%, 0 100%)\`;
        }

        function handleTouchMove(e) {
            const container = e.currentTarget;
            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            handleMove({currentTarget: container, clientX: x});
            e.preventDefault();
        }

        class MusicPlayer {
            constructor(musicList) {
                this.musicList = musicList;
                this.currentIndex = 0;
                this.isPlaying = false;
                this.sound = null;
                this.isPanelVisible = false;
                this.initializePlayer();
                this.setupMediaSession();
                this.setupPanelControl();
                this.setupAutoplay();
            }

            initializePlayer() {
                this.setupEventListeners();
                this.loadCurrentTrack();
                this.renderPlaylist();
            }

            setupEventListeners() {
                document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
                document.getElementById('nextBtn').addEventListener('click', () => this.next());
                document.getElementById('prevBtn').addEventListener('click', () => this.prev());
                document.getElementById('progressContainer').addEventListener('click', (e) => this.seekTo(e));
                document.getElementById('volumeBtn').addEventListener('click', () => this.toggleMute());
                const musicBtn = document.getElementById('musicBtn');
                musicBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.isPanelVisible && this.isPlaying) {
                        this.togglePlay();
                    }
                });
            }

            setupPanelControl() {
                const musicBtn = document.getElementById('musicBtn');
                const musicPanel = document.querySelector('.music-panel');
                
                musicBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.isPanelVisible = !this.isPanelVisible;
                    musicPanel.style.display = this.isPanelVisible ? 'block' : 'none';
                });
            
                musicPanel.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            
                document.addEventListener('click', () => {
                    if (this.isPanelVisible) {
                        this.isPanelVisible = false;
                        musicPanel.style.display = 'none';
                    }
                });
            
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.isPanelVisible) {
                        this.isPanelVisible = false;
                        musicPanel.style.display = 'none';
                    }
                });
            }

            setupAutoplay() {
                const startPlayback = () => {
                    if (!this.isPlaying) {
                        this.sound.play();
                        
                        ['click', 'touchstart', 'keydown', 'mousemove', 'mouseenter', 'scroll', 'wheel', 'load'].forEach(event => {
                            document.removeEventListener(event, startPlayback);
                        });
                    }
                };
        
                ['click', 'touchstart', 'keydown', 'mousemove', 'mouseenter', 'scroll', 'wheel', 'load'].forEach(event => {
                    document.addEventListener(event, startPlayback, { once: true });
                });
        
                this.sound.once('load', () => {
                    this.sound.play().catch(() => {
                        console.log('Autoplay prevented - waiting for user interaction');
                    });
                });
            }
        
            loadCurrentTrack() {
                if (this.sound) {
                    this.sound.unload();
                }
        
                const currentTrack = this.musicList[this.currentIndex];
                this.sound = new Howl({
                    src: [currentTrack.url],
                    format: ['m4a'],
                    html5: true,
                    autoplay: false,
                    preload: true,
                    onplay: () => this.onPlay(),
                    onpause: () => this.onPause(),
                    onend: () => this.next(),
                    onseek: () => this.updateProgress(),
                    onload: () => {
                        console.log('Audio loaded successfully');
                    },
                    onloaderror: (id, error) => {
                        console.error('Audio loading error:', error);
                    }
                });
        
                this.updateTrackInfo();
                this.updateMediaSessionMetadata();
            }

            togglePlay() {
                if (!this.sound.playing()) {
                    this.sound.play();
                } else {
                    this.sound.pause();
                }
            }

            next() {
                this.currentIndex = (this.currentIndex + 1) % this.musicList.length;
                this.loadCurrentTrack();
                if (this.isPlaying) {
                    this.sound.play();
                }
            }

            prev() {
                this.currentIndex = (this.currentIndex - 1 + this.musicList.length) % this.musicList.length;
                this.loadCurrentTrack();
                if (this.isPlaying) {
                    this.sound.play();
                }
            }

            seekTo(e) {
                const container = document.getElementById('progressContainer');
                const percent = e.offsetX / container.offsetWidth;
                const duration = this.sound.duration();
                this.sound.seek(duration * percent);
            }

            updateProgress() {
                const progress = document.getElementById('musicProgress');
                const seek = this.sound.seek() || 0;
                const duration = this.sound.duration();
                const percent = (seek / duration) * 100 || 0;
                progress.style.width = percent + '%';

                if (this.isPlaying) {
                    requestAnimationFrame(() => this.updateProgress());
                }
            }

            updateTrackInfo() {
                const currentTrack = this.musicList[this.currentIndex];
                document.getElementById('trackTitle').textContent = currentTrack.title;
                document.getElementById('trackArtist').textContent = currentTrack.artist;
                this.updatePlaylistActive();
            }

            renderPlaylist() {
                const playlist = document.getElementById('playlist');
                playlist.innerHTML = this.musicList.map((track, index) => \`
                    <div class="playlist-item \${index === this.currentIndex ? 'active' : ''}" 
                        onclick="musicPlayer.playTrack(\${index})">
                        \${track.title} - \${track.artist}
                    </div>
                \`).join('');
            }

            updatePlaylistActive() {
                document.querySelectorAll('.playlist-item').forEach((item, index) => {
                    item.classList.toggle('active', index === this.currentIndex);
                });
            }

            playTrack(index) {
                this.currentIndex = index;
                this.loadCurrentTrack();
                this.sound.play();
            }

            onPlay() {
                this.isPlaying = true;
                document.getElementById('playBtn').innerHTML = '<i class="fas fa-pause"></i>';
                document.getElementById('musicBtn').classList.add('playing');
                this.updateProgress();
            }

            onPause() {
                this.isPlaying = false;
                document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i>';
                document.getElementById('musicBtn').classList.remove('playing');
            }

            toggleMute() {
                const volumeBtn = document.getElementById('volumeBtn');
                if (this.sound.volume() === 0) {
                    this.sound.volume(1);
                    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                } else {
                    this.sound.volume(0);
                    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            }

            setupMediaSession() {
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.setActionHandler('play', () => this.togglePlay());
                    navigator.mediaSession.setActionHandler('pause', () => this.togglePlay());
                    navigator.mediaSession.setActionHandler('previoustrack', () => this.prev());
                    navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
                }
            }

            updateMediaSessionMetadata() {
                if ('mediaSession' in navigator) {
                    const currentTrack = this.musicList[this.currentIndex];
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: currentTrack.title,
                        artist: currentTrack.artist,
                        artwork: [
                            { src: currentTrack.cover || '', sizes: '512x512', type: 'image/jpeg' }
                        ]
                    });
                }
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            createComparisons();
            document.getElementById('switchBtn').addEventListener('click', switchGroup);
            window.musicPlayer = new MusicPlayer(musicList);
        });
    </script>
    `;

    const fullHtml = html + scriptContent;

    return new Response(fullHtml, {
        headers: {
        'content-type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
        },
    });
    },
};
