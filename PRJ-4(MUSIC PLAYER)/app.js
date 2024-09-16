
console.log("hello");

const playBtn=document.querySelector('#mainPlayBtn');
const audio=document.querySelector('#audio');
const btnPrev=document.querySelector('#btnPrev');
const btnNext=document.querySelector('#btnNext');
const trackTitle=document.querySelector('.track-title');
const artistName=document.querySelector('.artist-name');
const cover=document.querySelector('.cover');
const slider=document.querySelector('.slider');
const thumb=document.querySelector('.slider-thumb');
const progress=document.querySelector('.progress');
const time=document.querySelector('.time');
const fullTime=document.querySelector('.fulltime');
const volumeSlider=document.querySelector('.volume-slider .slider');
const volumeProgress=document.querySelector('.volume-slider .progress');
const volumeIcon=document.querySelector('.volume-icon');

// global variables
let trackPlaying=false;
// is the volume muted
let volumeMuted=false;
// ehich track is currently playing
let trackId=0;

// track names
const tracks=[
    "Akhiyan",
    "Antidote",
    "Be mine",
    "Dildariyan",
    "Suniyan Suniyan"
];

// artist names
const artists=[
"Harkirat Sangha",
"Karan Aujla",
"Shubh",
"Kambi Rajpuriya",
"Juss,Mixsingh"
];

// covers
const covers=[
    "cover1",
    "cover2",
    "cover3",
    "cover4",
    "cover5"
];
// add aclick event on the play button

playBtn.addEventListener('click',playTrack);
// play track function
function playTrack() {
    // if audio is not playing
    if(trackPlaying === false)
    {
        // play audio
        audio.play();
        // add a pause icon inside the button
        playBtn.innerHTML= `<span class="material-symbols-outlined"> pause </span>`;

        trackPlaying=true;
        // otherwise , if it is playing
    }
    else{
    //  add a play button
    audio.pause();
    // add a play icon inside the button
    playBtn.innerHTML=`<span class="material-symbols-outlined">play_arrow</span>`;
    // set trackplaying to false

    trackPlaying = false;

    }
    }

    // switching tracks
    function switchTrack(){
       //if audio is trackPlaying 
       if(trackPlaying===true){
        //keep playing audio
        audio.play();
       } 
    }
    //get the track source

    const trackSrc='tracks/'+tracks[trackId]+ ".mp3";

    function loadTrack(){
        audio.src='tracks/'+tracks[trackId]+".mp3";
        //reload the audio track
        audio.load();
        //set track title
        trackTitle.innerHTML=tracks[trackId];
        //set artist name
        artistName.innerHTML=artists[trackId];
        //set cover image
        cover.src='covers/'+covers[trackId]+".jpg";
        //set timeline slider to beginning
        progress.style.width=0;
        thumb.style.left=0;

        //wait for audio data to load 
        audio.addEventListener('loadeddata',()=>{
            setTime(fullTime,audio.duration);
            //setmax value to slider
            slider.setAttribute("max",audio.duration);

        });

    }

    //initially load the track
    loadTrack();
    //set click event to previous button
    btnPrev.addEventListener('click',()=>{
        //decrement trackid
        trackId--;
        //if trackid goes below 0
        if(trackId<0)
        {
            //go to last track
            trackId=tracks.length-1;

        }
        //load the track
        loadTrack();
        //run switchtrackfunction
        switchTrack();
    });

//set click event to next button

btnNext.addEventListener('click',nextTrack);

//next trackfunction

function nextTrack(){
    //increment of track id
    trackId++;
    if(trackId>tracks.length-1){
      //go to first track
      trackId=0;

    }
    //load the track
    loadTrack();
    //run switchtrackfunction
    switchTrack();

}

audio.addEventListener('ended',nextTrack);


//format the time
function setTime(output,input){
  //calculate minus from input
  const minutes=Math.floor(input/60);
  //calculate seconds from input
  const seconds=Math.floor(input%60);
 
  
  //if seconds are under 10
  if(seconds<10)
  {
//add zero before first number
output.innerHTML=minutes+":0"+seconds;
//if it is over 10
  }else{
    output.innerHTML=minutes+":"+seconds;

  }
}
//output the audio track duration
setTime(fullTime,audio.duration);
//when the time changes on audio track
audio.addEventListener('timeupdate',()=>{
    //get the current sudio time
    const currentAudioTime=Math.floor(audio.currentTime);
    //get the percentage
    const timePercentage=(currentAudioTime/audio.duration)*100+"%";
    //output the current audio time
    setTime(time,currentAudioTime);
    //set the slider progress to the percentage 
    progress.style.width=timePercentage;
    thumb.style.left=timePercentage;

});
//function for handling the slider values
function customSlider(){
    //get the percentage
    const val=(slider.value/audio.duration)*100+"%";
    //set the thumb and progress to the current value 
    progress.style.width=val;
    thumb.style.left=val;
    //output the audio current time
    setTime(time,slider.value);
//set audio current time to slider values
audio.currentTime=slider.value;
}

//call function initially
customSlider();

//repeat the function when the slider is selected

slider.addEventListener("input",customSlider);


//volume slider current value
let val;
//volume slider
function customVolumeSlider(){
    //get max attribute value from slider
    const maxVal=volumeSlider.getAttribute("max");
    //get percentage
    val=(volumeSlider.value/maxVal)*100+"%";
    //set the thumb and progress to the current value
    volumeProgress.style.width=val;
    //set the audio volumen to current value
    audio.volume=volumeSlider.value/100;
    //change value icons
    //If the volume is high 
    if(audio.volume > 0.5){
        //set the volume up icon
        volumeIcon.innerHTML=`<span class="material-symbols-outlined">volume_up </span>`;

    }else if(audio.volume===0)
    {
        //set the mute icon
        volumeIcon.innerHTML=`<span class="material-symbols-outlined">volume_off</span>`;
        //if volume is low
    }
    else{
        volumeIcon.innerHTML=`<span class="material-symbols-outlined">volume_down</span>`; 
    }

    }
    //Run the volume slider function

    customVolumeSlider();
    //run the function again when the volume slider is selected
    volumeSlider.addEventListener(
        "input",customVolumeSlider);


//add a click event to volume icon
volumeIcon.addEventListener('click',()=>{
//if volume is muted
if(volumeMuted===false)
{

    //set the muted volume icon
    volumeIcon.innerHTML=`<span class="material-symbols-outlined">volume_off</span>`;
    //mute the audio
    audio.volume=0;
    //set the volume slider to zero
    volumeProgress.style.width=0;
    //set volume muted to true beacuse volume is muted
    volumeMuted=true;
    //if volume is muted
}else{
    //set the volume down icon
    volumeIcon.innerHTML=`<span class="material-symbols-outlined">volume_down</span>`;
    audio.volume=0.5;
    volumeProgress.style.width=val;

volumeMuted=false;
}
}

);










// console.log("Initializing Music Player");

// // Select DOM elements
// const playBtn = document.querySelector('#mainPlayBtn');
// const audio = document.querySelector('#audio');
// const btnPrev = document.querySelector('#btnPrev');
// const btnNext = document.querySelector('#btnNext');
// const trackTitle = document.querySelector('.track-title');
// const artistName = document.querySelector('.artist-name');
// const cover = document.querySelector('.cover');
// const slider = document.querySelector('.slider');
// const progress = document.querySelector('.progress');
// const time = document.querySelector('.time');
// const fullTime = document.querySelector('.fulltime');
// const volumeSlider = document.querySelector('.volume-slider .slider');
// const volumeProgress = document.querySelector('.volume-slider .progress');
// const volumeIcon = document.querySelector('.volume-icon');

// // Global variables
// let trackPlaying = false;
// let trackId = 0;

// // Track data
// const tracks = ["Akhiyan", "Antidote", "Be mine", "Dildariyan", "Suniyan Suniyan"];
// const artists = ["Harkirat Sangha", "Karan Aujla", "Shubh", "Kambi Rajpuriya", "Juss, Mixsingh"];
// const covers = ["cover1", "cover2", "cover3", "cover4", "cover5"];

// // Event Listeners
// playBtn.addEventListener('click', playTrack);
// audio.addEventListener('loadeddata', () => {
//     console.log('Audio data loaded successfully.');
// });
// audio.addEventListener('error', (e) => {
//     console.log('Error loading audio file:', e);
// });

// btnNext.addEventListener('click', nextTrack);
// btnPrev.addEventListener('click', prevTrack);

// function playTrack() {
//     if (!trackPlaying) {
//         audio.play().then(() => {
//             console.log("Audio playing");
//             playBtn.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
//             trackPlaying = true;
//         }).catch(error => {
//             console.error("Error trying to play audio:", error);
//         });
//     } else {
//         audio.pause();
//         playBtn.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
//         trackPlaying = false;
//         console.log("Audio paused");
//     }
// }

// // Track Control Functions
// function nextTrack() {
//     trackId = (trackId + 1) % tracks.length;
//     updateTrack();
// }

// function prevTrack() {
//     trackId = (trackId - 1 + tracks.length) % tracks.length;
//     updateTrack();
// }

// function updateTrack() {
//     trackTitle.innerHTML = tracks[trackId];
//     artistName.innerHTML = artists[trackId];
//     cover.src = `covers/${covers[trackId]}.jpg`;
//     audio.src = `tracks/${tracks[trackId]}.mp3`;
//     playBtn.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
//     trackPlaying = false;
//     console.log("Track updated to:", tracks[trackId]);
// }

// // Volume Control
// volumeSlider.addEventListener('input', (e) => {
//     const volume = e.target.value / 100;
//     audio.volume = volume;
//     volumeProgress.style.width = `${volume * 100}%`;
//     console.log("Volume updated to:", volume);
// });

// // Handle audio time update for slider
// audio.addEventListener('timeupdate', () => {
//     const currentTime = audio.currentTime;
//     const duration = audio.duration;
//     if (!isNaN(duration)) {
//         const progressPercent = (currentTime / duration) * 100;
//         progress.style.width = `${progressPercent}%`;
//         time.innerHTML = formatTime(currentTime);
//     }
// });

// function formatTime(seconds) {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
// }

// // Error Handling
// audio.addEventListener('error', (e) => {
//     console.error("Error with audio playback:", e);
// });
