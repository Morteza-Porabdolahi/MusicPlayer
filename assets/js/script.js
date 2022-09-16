const $ = document;
const audioElem = $.querySelector("audio");
const playBtn = $.querySelector(".play");
const root = $.querySelector(":root");
const nextBtn = $.querySelector(".next");
const prevBtn = $.querySelector(".previous");
const timeLine = $.querySelector(".timeline-line");
const volume = $.querySelector(".volume");

const musics = [
  {
    title: "Quiet",
    src: "https://dl.audiok.ir/dl/8/2/581/Camila%20Cabello%20-%20Familia%20%282022%29/06%20-%20Quiet.mp3",
    singer: "Camila Cabello",
    image:
      "https://is2-ssl.mzstatic.com/image/thumb/Features116/v4/fa/9b/ea/fa9beae1-53a4-6b88-562f-83c88bf8cb67/mzl.bbflqfpi.jpg/375x375bb.jpg",
  },
  {
    title: "Boys Don't Cry",
    src: "https://dl.audiok.ir/dl/8/2/581/Camila%20Cabello%20-%20Familia%20%282022%29/07%20-%20Boys%20Don%27t%20Cry.mp3",
    singer: "Camila Cabello",
    image: "https://mupo.ir/StaticFiles/Albums/fullSize/185550204358210456.jpg",
  },
  {
    title: "First Man",
    src: "https://dl.audiok.ir/dl/6/1/586/Camila%20Cabello%20-%20Romance%20%282019%29/14%20-%20First%20Man.mp3",
    singer: "Camila Cabello",
    image:
      "https://cdns-images.dzcdn.net/images/cover/5cdfa4a16540fcc34ec7335e3ad59922/500x500.jpg",
  },
];

// isPlaying or Not
let isPlaying = false;

function playMusic() {
  isPlaying = true;

  audioElem.play();
  playBtn.firstElementChild.className = "bi bi-pause";
}

function pauseMusic() {
  isPlaying = false;

  audioElem.pause();
  playBtn.firstElementChild.className = "bi bi-play";
}

// music Index in musics Array
let musicIndex = 0;

function nextMusic() {
  musicIndex++;

  if (musicIndex > musics.length - 1) {
    musicIndex = 0;
  }

  handleMusicCard(musicIndex);
  playMusic();
}

function prevMusic() {
  musicIndex--;

  if (musicIndex < 0) {
    musicIndex = musics.length - 1;
  }

  handleMusicCard(musicIndex);
  playMusic();
}

// get music Card and play The Music

function handleMusicCard(musicIndex) {
  let { src, singer, title, image } = musics[musicIndex];

  const imageElem = $.querySelector(".image-container img");
  const songNameTag = $.querySelector(".song-name");
  const singerTag = $.querySelector(".singer");

  imageElem.src = image;
  songNameTag.textContent = title;
  singerTag.textContent = singer;
  audioElem.src = src;
}

handleMusicCard(musicIndex);

// set current and Durations

function setTimeLines() {
  const durationElem = $.querySelector(".duration");
  const currentElem = $.querySelector(".current");

  const currentTime = audioElem.currentTime;
  const duration = audioElem.duration;

  // calculate Minutes and Seconds of duration;
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration - durationMinutes * 60);

  // calculate Minutes and Seconds of currentTime;
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime - currentMinutes * 60);

  // check if duration minute or second is a single Number or not
  if (!isNaN(duration)) {
    durationElem.textContent = `${
      durationMinutes < 9 ? `0${durationMinutes}` : durationMinutes
    }:${durationSeconds < 9 ? `0${durationSeconds}` : durationSeconds}`;
  } // check if currentTime minute or second is a single Number or not
  currentElem.textContent = `${
    currentMinutes < 9 ? `0${currentMinutes}` : currentMinutes
  }:${currentSeconds < 9 ? `0${currentSeconds}` : currentSeconds}`;
}

// change timeLine Width on every timeUpdate

function handleProgressBar() {
  const currentTime = audioElem.currentTime;
  const duration = audioElem.duration;

  root.style.setProperty(
    "--timeline-width",
    `${(currentTime / duration) * 100}%`
  );

  setTimeLines();
}

// set Progress Width and currentTime

function setProgress(e) {
  const clickedPos = e.offsetX;
  const calcWidth = (clickedPos / e.target.offsetWidth) * 100;

  root.style.setProperty("--timeline-width", `${calcWidth}%`);
  audioElem.currentTime = (calcWidth / 100) * audioElem.duration;
}

function handleMusicVolume(e) {
  const clickedPos = e.offsetX;
  const calcWidth = (clickedPos / e.target.offsetWidth) * 100;

  root.style.setProperty("--volume-width", `${calcWidth}%`);
  audioElem.volume = calcWidth / 100;
}

function handleMusicStop() {
  nextMusic();
}

audioElem.addEventListener("ended", handleMusicStop);
timeLine.addEventListener("click", setProgress);
prevBtn.addEventListener("click", prevMusic);
nextBtn.addEventListener("click", nextMusic);
audioElem.addEventListener("timeupdate", handleProgressBar);
volume.addEventListener("click", handleMusicVolume);
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});
