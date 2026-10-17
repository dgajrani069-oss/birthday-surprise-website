
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

  // Files are stored in the main GitHub repository.
  // Playlist order: 3.mp3, 2.mp3, 1.mp3.
  const playlist = [
    {
      title: "Our First Song 💗",
      src: "./3.mp3",
      photo: "./3.jpeg",
      caption: "A little song for my favourite person."
    },
    {
      title: "Our Second Song 🌸",
      src: "./2.mp3",
      photo: "./2.jpeg",
      caption: "Another song, another memory with you."
    },
    {
      title: "Our Third Song ♡",
      src: "./1.mp3",
      photo: "./1.jpeg",
      caption: "No matter the song, my heart chooses you."
    }
  ];

  let currentTrack = 0;

  // Fix the gallery image paths.
  const galleryPaths = [
    "./3.jpeg",
    "./2.jpeg",
    "./1.jpeg"
  ];

  galleryPhotos.forEach((photo, index) => {
    photo.addEventListener("error", () => {
      if (photoStatus) {
        photoStatus.textContent =
          "Photo could not load: " + photo.src +
          ". Check the image file in GitHub.";
      }
    });

    if (galleryPaths[index]) {
      photo.src = galleryPaths[index];
    }
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
        "Photo could not load: " + path +
        ". Check the filename in GitHub.";
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
    musicStatus.textContent = "Tap play to start our playlist 💗";
  }

  async function playMusic() {
    try {
      await audio.play();
    } catch (error) {
      musicStatus.textContent =
        "Music could not play. Check the MP3 file and try again.";
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
      "Music file could not load. Check that 1.mp3, 2.mp3 and 3.mp3 exist in GitHub.";
  });

  // Reveal the birthday surprise.
  surpriseButton.addEventListener("click", () => {
    surpriseMessage.hidden = false;
    surpriseButton.textContent = "Surprise Opened 💖";
    surpriseButton.disabled = true;

    surpriseMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });

  // Toggle the lunch reminder.
  lunchButton.addEventListener("click", () => {
    lunchReminder.hidden = !lunchReminder.hidden;

    lunchButton.textContent = lunchReminder.hidden
      ? "One Tiny Reminder 💝"
      : "Reminder Revealed 💗";
  });

  // Load the first song without autoplay.
  loadTrack(0);
});
