// global consts
// const clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const PATTERNSIZE = 8;

// global vars
// var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var pattern = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
var mistakes;

// Each step (initially) was 1 second.
// Each subsequent step should 
var clueHoldTime = 1000;

// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
var soundInit = document.getElementById("soundInit");
var soundFlag = true;

// disables google anti-autoplay feature
soundInit.addEventListener("mousedown", initSound, true);

function initSound() {
  if(soundInit && soundFlag)
    {
      context.resume();
      console.log("resume");
      soundFlag = false;
    }
}


g.connect(context.destination);
g.gain.setValueAtTime(0,context.currentTime);
o.connect(g);
o.start(0);


function startGame(){
  // initialize game variables (pattern is done here to refresh pattern)
  for (let j = 0; j < PATTERNSIZE; j++)
  {
    pattern[j] = Math.floor(Math.random() * Math.floor(4) + 1);
  }
  
  mistakes = 0;
  
  progress = 0;
  gamePlaying = true;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  context.resume();
  playClueSequence();
}

function stopGame(){
  gamePlaying = false;
  // swap the Start and Stop buttons
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit");
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit");
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  clueHoldTime = 1000 - 1000 * (progress / 10);
  
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue,delay,pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game Over. You win.");
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  if(btn == pattern[guessCounter])
    {
      if(guessCounter == progress)
        {
          if(progress == pattern.length - 1)
              winGame();
          else
          {
            progress++;
            playClueSequence();
          }
        }
      else
        guessCounter++;
    }
  else
    {
      mistakes++;
      if(mistakes == 3)
        {
          loseGame();
        }
      else
        {
          alert("That's not right, try this sequence again. You have " + (3 - mistakes) + " tries remaining.");
          guessCounter = 0;
          playClueSequence();
        }
    }
}


// Sound Synthesis Functions
const freqMap = {
  1: 250,
  2: 320,
  3: 390,
  4: 425,
  5: 495
}

function playTone(btn,len){ 
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true;
  setTimeout(function(){
    stopTone();
  },len);
}

function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}

function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}
