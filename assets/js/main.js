let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let track_text = document.querySelector(".track-text");
let track_album = document.querySelector(".track-album");


let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    id: 0,
    img: "/assets/img/albums/caos_lama.png",
    name: "Monólogo ao Pé do Ouvido",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/01. Monólogo ao Pé do Ouvido.mp3",
    description: "teste",
  },
  {
    id: 1,
    img: "/assets/img/albums/caos_lama.png",
    name: "Banditismo por Uma Questão de Classe",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/02. Banditismo por Uma Questão de Classe.mp3",
    description: "teste",
  },
  {
    id: 2,
    img: "/assets/img/albums/caos_lama.png",
    name: "Rios, Pontes e Overdrives",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/03. Rios, Pontes & Overdrives.mp3",
    description: "teste1",
  },
  {
    id: 3,
    img: "/assets/img/albums/caos_lama.png",
    name: "A Cidade",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/04. A Cidade - Boa Noite do Velho Faceta (Amor de Criança).mp3",
    description: "teste1",
  },
  {
    id: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "A Praieira",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/05. A Praieira.mp3",
    description: "teste1",
  },
  {
    id: 5,
    img: "/assets/img/albums/caos_lama.png",
    name: "Samba Makossa",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/06. Samba Makossa.mp3",
    description: "teste1",
  },
  {
    id: 6,
    img: "/assets/img/albums/caos_lama.png",
    name: "Da Lama ao Caos",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/07. Da Lama Ao Caos.mp3",
    description: "teste1",
  },
  {
    id: 7,
    img: "/assets/img/albums/caos_lama.png",
    name: "Maracatu de Tiro Certeiro",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/08. Maracatu de Tiro Certeiro.mp3",
    description: "teste1",
  },
  {
    id: 8,
    img: "/assets/img/albums/caos_lama.png",
    name: "Salustiano Song",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/09. Salustiano Song.mp3",
    description: "teste1",
  },
  {
    id: 9,
    img: "/assets/img/albums/caos_lama.png",
    name: "Antene-se",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/10. Antene-Se.mp3",
    description: "teste1",
  },
  {
    id: 10,
    img: "/assets/img/albums/caos_lama.png",
    name: "Risoflora",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/11. Risoflora.mp3",
    description: "teste1",
  },
  {
    id: 11,
    img: "/assets/img/albums/caos_lama.png",
    name: "Lixo do Mangue",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/12. Lixo do Mangue.mp3",
    description: "teste1",
  },
  {
    id: 12,
    img: "/assets/img/albums/caos_lama.png",
    name: "Computadores Fazem Arte",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/13. Computadores Fazem Arte.mp3",
    description: "teste1",
  },
  {
    id: 13,
    img: "/assets/img/albums/caos_lama.png",
    name: "Coco Dub (Bônus)",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/14. Côco Dub (Afrociberdelia).mp3",
    description: "teste1",
  },

];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  track_text.textContent = music_list[track_index].description;


  track_album.textContent = music_list[track_index].album;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

listarMusicas();

function listarMusicas() {
  const listaOrdenada = document.getElementById("lista_musica");

  music_list.forEach((music_list) => {
    const li = document.createElement("li");

    li.addEventListener("click", function handleClick() {
      track_index = music_list.id;
      loadTrack(track_index);
      if (isPlaying) {
        playTrack();
      }
    });

    const nome = document.createElement("h3");
    nome.innerHTML = music_list.name;
    li.appendChild(nome);

    const album = document.createElement("h5");
    album.innerHTML = music_list.artist;
    li.appendChild(album);

    listaOrdenada.appendChild(li);
  });
}
