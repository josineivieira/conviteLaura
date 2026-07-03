const partyDate = new Date("2026-07-05T09:00:00-04:00");
const timeParts = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const distance = Math.max(0, partyDate.getTime() - now.getTime());
  const totalSeconds = Math.floor(distance / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  timeParts.days.textContent = pad(days);
  timeParts.hours.textContent = pad(hours);
  timeParts.minutes.textContent = pad(minutes);
  timeParts.seconds.textContent = pad(seconds);
}

function buildConfetti() {
  const layer = document.querySelector(".confetti-layer");
  const colors = ["#38bdf8", "#c9a5ff", "#ffb6d5", "#fff0a8", "#ffffff"];
  const isSmallScreen = window.matchMedia("(max-width: 560px)").matches;
  const amount = isSmallScreen ? 12 : 24;

  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("span");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 9}s`;
    piece.style.animationDuration = `${7 + Math.random() * 8}s`;
    piece.style.background = colors[index % colors.length];
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    layer.appendChild(piece);
  }
}

function setupMusic() {
  const button = document.getElementById("musicToggle");
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let context;
  let melodyTimer;
  let isPlaying = false;

  const melody = [
    ["G4", 0.28], ["G4", 0.28], ["A4", 0.55], ["G4", 0.55], ["C5", 0.55], ["B4", 0.9],
    ["G4", 0.28], ["G4", 0.28], ["A4", 0.55], ["G4", 0.55], ["D5", 0.55], ["C5", 0.9],
    ["G4", 0.28], ["G4", 0.28], ["G5", 0.55], ["E5", 0.55], ["C5", 0.55], ["B4", 0.55], ["A4", 0.9],
    ["F5", 0.28], ["F5", 0.28], ["E5", 0.55], ["C5", 0.55], ["D5", 0.55], ["C5", 1.1]
  ];

  const notes = {
    A4: 440,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
    G4: 392,
    G5: 783.99
  };

  function playNote(frequency, start, duration) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.18, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.04);
  }

  function playMelody() {
    window.clearTimeout(melodyTimer);
    let cursor = context.currentTime + 0.05;
    melody.forEach(([note, duration]) => {
      playNote(notes[note], cursor, duration);
      cursor += duration + 0.07;
    });
    melodyTimer = window.setTimeout(playMelody, Math.max(1000, (cursor - context.currentTime + 0.6) * 1000));
  }

  async function startMusic() {
    if (!AudioContext) {
      button.textContent = "Música indisponível";
      return false;
    }

    if (!context) {
      context = new AudioContext();
    }

    if (context.state === "suspended") {
      await context.resume();
    }

    isPlaying = true;
    button.textContent = "⏸️ Pausar Parabéns";
    playMelody();
    return true;
  }

  function stopMusic() {
    isPlaying = false;
    window.clearTimeout(melodyTimer);
    button.textContent = "🎵 Tocar Parabéns";
  }

  button.addEventListener("click", async () => {
    if (!isPlaying) {
      await startMusic();
      return;
    }

    stopMusic();
  });

  window.addEventListener("load", () => {
    window.setTimeout(async () => {
      try {
        await startMusic();
      } catch {
        button.textContent = "🎵 Tocar Parabéns";
      }
    }, 700);
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);
buildConfetti();
setupMusic();
