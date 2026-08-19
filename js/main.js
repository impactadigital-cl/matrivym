
document.addEventListener('DOMContentLoaded', ()=>{
  // Envelope
  const overlay = document.getElementById('envelopeOverlay');
  const openBtn = document.getElementById('openInvite');
  openBtn.addEventListener('click', ()=>{
    overlay.classList.add('open');
    document.body.style.overflow='auto';
    centeredAudio.src='assets/audio/is-this-love-classical.mp3';
    centeredAudio.volume=0.7;
    document.getElementById('playerVolume').value=70;
    document.getElementById('playerVolumeIcon').textContent='🔊';
    centeredAudio.play();
  });
  document.body.style.overflow='hidden';

  // Reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('active'); });
  },{threshold:0.15});
  reveals.forEach(r=>io.observe(r));

  // Countdown - 17 Oct 2026 19:00 Chile
  const target = new Date('2026-10-17T19:00:00-03:00').getTime();
  function updateCount(){
    const now = Date.now();
    let diff = target - now;
    if(diff<0) diff=0;
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);
    document.getElementById('days').textContent=String(d).padStart(2,'0');
    document.getElementById('hours').textContent=String(h).padStart(2,'0');
    document.getElementById('minutes').textContent=String(m).padStart(2,'0');
    document.getElementById('seconds').textContent=String(s).padStart(2,'0');
  }
  setInterval(updateCount,1000); updateCount();

  // Centered Music Player
  const centeredAudio = document.getElementById('centeredAudio');
  const playPauseBtn = document.getElementById('playerPlayPause');
  const volumeSlider = document.getElementById('playerVolume');
  const volumeIcon = document.getElementById('playerVolumeIcon');
  const progressTrack = document.getElementById('progressTrack');
  const progressFill = document.getElementById('progressFill');
  const progressTime = document.getElementById('progressTime');
  const centeredTracks = document.querySelectorAll('.player-track');

  function formatTime(sec){
    const m = Math.floor(sec/60);
    const s = Math.floor(sec%60);
    return `${m}:${String(s).padStart(2,'0')}`;
  }

  playPauseBtn.addEventListener('click',()=>{
    if(centeredAudio.paused){
      centeredAudio.play();
      playPauseBtn.textContent='❚❚';
    } else {
      centeredAudio.pause();
      playPauseBtn.textContent='▶';
    }
  });

  volumeSlider.addEventListener('input',(e)=>{
    const vol = e.target.value/100;
    centeredAudio.volume = vol;
    volumeIcon.textContent = vol==0 ? '🔇' : vol<0.5 ? '🔉' : '🔊';
  });

  centeredAudio.addEventListener('loadedmetadata',()=>{
    progressTime.textContent = `0:00 / ${formatTime(centeredAudio.duration)}`;
  });
  centeredAudio.addEventListener('timeupdate',()=>{
    const pct = (centeredAudio.currentTime/centeredAudio.duration)*100;
    progressFill.style.width = `${pct}%`;
    progressTime.textContent = `${formatTime(centeredAudio.currentTime)} / ${formatTime(centeredAudio.duration)}`;
  });
  centeredAudio.addEventListener('ended',()=>{
    playPauseBtn.textContent='▶';
  });
  progressTrack.addEventListener('click',(e)=>{
    const rect = progressTrack.getBoundingClientRect();
    const pct = (e.offsetX/rect.width);
    centeredAudio.currentTime = pct * centeredAudio.duration;
  });

  centeredTracks.forEach(t=>{
    t.addEventListener('click',()=>{
      centeredTracks.forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      const id = t.dataset.track;
      if(id==='1') centeredAudio.src='assets/audio/is-this-love-classical.mp3';
      else centeredAudio.src='assets/audio/tan-enamorados-piano.mp3';
      playPauseBtn.textContent='▶';
    });
  });
});
