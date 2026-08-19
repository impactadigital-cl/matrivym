document.addEventListener('DOMContentLoaded', ()=>{
  // Variables del reproductor (declaradas antes de usarlas)
  const centeredAudio = document.getElementById('centeredAudio');
  const playPauseBtn = document.getElementById('playerPlayPause');
  const volumeSlider = document.getElementById('playerVolume');
  const volumeIcon = document.getElementById('playerVolumeIcon');
  const progressTrack = document.getElementById('progressTrack');
  const progressFill = document.getElementById('progressFill');
  const progressTime = document.getElementById('progressTime');

  function formatTime(sec){
    const m = Math.floor(sec/60);
    const s = Math.floor(sec%60);
    return `${m}:${String(s).padStart(2,'0')}`;
  }

  // Envelope
  const overlay = document.getElementById('envelopeOverlay');
  const openBtn = document.getElementById('openInvite');
  openBtn.addEventListener('click', ()=>{
    overlay.classList.add('open');
    document.body.style.overflow='auto';
    centeredAudio.src='assets/audio/YTDown.com_YouTube_Whitesnake-Is-This-Love-Official-Music-V_Media_GOJk0HW_hJw_007_128k.mp3';
    centeredAudio.volume=0.5;
    volumeSlider.value=50;
    volumeIcon.textContent='🔉';
    centeredAudio.currentTime=15;
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

  // Player controls
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

  // RSVP Confirm Form - Formspree
  const confirmForm = document.getElementById('rsvpConfirmForm');
  const formConfirmSuccess = document.getElementById('formConfirmSuccess');
  
  if (confirmForm) {
    confirmForm.addEventListener('submit', function(e){
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {'Accept': 'application/json'}
      }).then(() => {
        formConfirmSuccess.textContent = '¡Asistencia confirmada! Te esperamos.';
        formConfirmSuccess.classList.add('show');
        form.reset();
      }).catch(() => {
        formConfirmSuccess.textContent = 'Error al enviar. Intenta nuevamente.';
        formConfirmSuccess.classList.add('show');
      });
    });
  }
});
