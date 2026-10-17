
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio-player");
  const playButton = document.getElementById("play-btn");
  const previousButton = document.getElementById("previous-btn");
  const nextButton = document.getElementById("next-btn");

  const trackTitle = document.getElementById("track-title");
  const trackCaption = document.getElementById("track-caption");
  const musicStatus = document.getElementById("music-status");
  const songPhoto = document.getElementById("song-photo");

  const galleryPhotos = document.querySelectorAll(".photo-card img");
  const photoStatus = document.getElementById("photo-status");

  const surpriseButton = document.getElementById("surprise-btn");
  const surpriseMessage = document.getElementById("surprise-message");

  const lunchButton = document.getElementById("lunch-reveal-btn");
  const lunchReminder = document.getElementById("lunch-reminder");

  // Music order: 3.mp3 -> 2.mp3 -> 1.mp3.
  // Each song displays its matching JPEG photo.
  const playlist = [
    {
      title: "Our First Song 💗",
      src: "./assets/music/3.mp3",
      photo: "./assets/photos/3.jpeg",
      caption: "A little song for my favourite person."
    },
    {
      title: "Our Second Song 🌸",
      src: "./assets/music/2.mp3",
      photo: "./assets/photos/2.jpeg",
      caption: "Another song, another memory with you."
    },
    {
      title: "Our Third Song ♡",
      src: "./assets/music/1.mp3",
      photo: "./assets/photos/1.jpeg",
      caption: "No matter the song, my heart chooses you."
    }
  ];

  let currentTrack = 0;

  // Show a useful message if a gallery photo is missing.
  galleryPhotos.forEach((photo) => {
    photo.addEventListener("error", () => {
      photoStatus.textContent =
        "Photo not found: " + photo.getAttribute("src") +
        ". Check the filename, extension and assets/photos folder.";
    });
  });

  function updateSongPhoto(path, title) {
    songPhoto.classList.add("photo-changing");

    songPhoto.onload = () => {
      songPhoto.classList.remove("photo-changing");
      songPhoto.alt = "Photo for " + title;
    };

    songPhoto.onerror = () => {
      songPhoto.classList.remove("photo-changing");
      songPhoto.alt = "Photo could not be loaded";
      musicStatus.textContent =
        "Photo not found: " + path +
        ". Check the exact filename and extension.";
    };

    songPhoto.src = path;
  }

  function loadTrack(index) {
    currentTrack = (index + playlist.length) % playlist.length;
    const track = playlist[currentTrack];

    audio.src = track.src;
    audio.load();

    trackTitle.textContent = track.title;
    trackCaption.textContent = track.caption;

    updateSongPhoto(track.photo, track.title);

    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play music");
    musicStatus.textContent = "Ready to play 💗";
  }

  async function playMusic() {
    try {
      await audio.play();
    } catch (error) {
      musicStatus.textContent =
        "Couldn't play the song. Check the MP3 filename and assets/music folder.";
    }
  }

  function playTrackAt(index) {
    loadTrack(index);
    playMusic();
  }

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
    }
  });

  previousButton.addEventListener("click", () => {
    playTrackAt(currentTrack - 1);
  });

  nextButton.addEventListener("click", () => {
    playTrackAt(currentTrack + 1);
  });

  // Automatically play the next song and update the photo.
  audio.addEventListener("ended", () => {
    playTrackAt(currentTrack + 1);
  });

  audio.addEventListener("playing", () => {
    playButton.textContent = "❚❚";
    playButton.setAttribute("aria-label", "Pause music");
    musicStatus.textContent = "Playing with love ♡";
  });

  audio.addEventListener("pause", () => {
    if (!audio.ended) {
      playButton.textContent = "▶";
      playButton.setAttribute("aria-label", "Play music");
      musicStatus.textContent = "Music paused 💗";
    }
  });

  audio.addEventListener("error", () => {
    musicStatus.textContent =
      "Music file not found. Check assets/music/ and the exact MP3 names.";
  });

  // Reveal the birthday message.
  surpriseButton.addEventListener("click", () => {
    surpriseMessage.hidden = false;
    surpriseButton.textContent = "Surprise Opened 💖";
    surpriseButton.disabled = true;

    surpriseMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });

  // Toggle the COSO Café lunch reminder.
  lunchButton.addEventListener("click", () => {
    lunchReminder.hidden = !lunchReminder.hidden;

    lunchButton.textContent = lunchReminder.hidden
      ? "One Tiny Reminder 💝"
      : "Reminder Revealed 💗";
  });

  // Load the first song and its photo without autoplay.
  loadTrack(0);
});
