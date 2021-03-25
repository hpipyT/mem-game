# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **NAME**

Time spent: **#** hours spent in total

Link to project: (insert your link here, should start with https://glitch.com...)

## Required Functionality

The following **required** functionality is complete:

- [+] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [+] "Start" button toggles between "Start" and "Stop" when clicked.
- [+] Game buttons each light up and play a sound when clicked.
- [+] Computer plays back sequence of clues including sound and visual cue for each button
- [+] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [+] User wins the game after guessing a complete pattern
- [+] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [+] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [+] Buttons use a pitch (frequency) other than the ones in the tutorial
- [+] More than 4 functional game buttons
- [+] Playback speeds up on each turn
- [+] Computer picks a different pattern each time the game is played
- [+] Player only loses after 3 mistakes (instead of on the first mistake)
- [ ] Game button appearance change goes beyond color (e.g. add an image)
- [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [+] If a mistake is made the sequence is played again

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![](http://g.recordit.co/7mkj1FVm1D.gif)

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.
   AutoPlay policy changes: https://goo.gl/7K7WLu
   https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume
   for randomized num in a range: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)

During development I noticed the sound behavior of the buttons was inconsistent. 
Sometimes the sound would play on click while other times it would not. I opened 
my browser’s developer console and saw the warning:
“The AudioContext was not allowed to start. It must be resumed (or created)
after a user gesture on the page. https://goo.gl/7K7WLu”. So I followed the link
and discovered the Google has essentially an anti-auto play feature to keep audio
from playing before a user interacts with the page. The documentation suggested adding
an EventListener to toggle the .suspend() method to .resume(). I'm vaguely familiar with
the idea of event listeners but haven't used them in code. At first I used the 
event “onmouseenter” but this didn’t work so I switched it to “click.” 
The problem with this option though is the first button a user clicks will call .resume() 
meaning if the first button on the page the user clicks is a sound button, they won’t hear 
a sound for that first click. addEventLister has a parameter ‘userCapture’ that 
handles the order of its execution in the DOM (thank you StackOverflow for explaining simply
what capturing and bubbling is). Switching this from “false” to “true” (capturing because 
the EventListener is not as nested as the sound playback within guess()) and changing 
the event from “click” to “onmousedown” worked a charm. I recognize this isn’t a super 
elegant solution as the warning still exists. I could possibly initialize audioContext objects 
within a function not initialized on page load. Though, in this case the user isn't affected.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
   While learning about EventListeners I kept seeing the word/phrase DOM (Document Object Model). 
   I learned it lets JavaScript edit a live page by creating and displaying an instance 
   of the HTML file. I’m glad I learned obj.oriented programming last semester because 
   now document.addEventListener() makes a whole lot of sense to me. I feel I have a decent 
   understanding of the front-end side of development and I have no experience with the back-end. 
   I’d like to learn more about the DOM and the idea of actual physical events like clicking; 
   I haven’t coded gesture inputs until this project. I also want to learn how to store changes 
   made to my sites on servers/databases; ie if this memory game had a high score system. Is 
   there an optimal database service?. Coincidentally I also want to know how sites use a 
   “data stream” to retrieve from these servers. 

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
   There was a bug I didn’t fix. When the player click and drags off of a button the sound stays on and keeps other sounds from playing. 
   The player can click it again to continue the game but it’s annoying for sure. In terms of features I would add a checkbox system so 
   the user has a choice to play with sped up intonations or with mistakes on. On game loss I’d like to give the user the choice to either
   play again with the same pattern or use a newly generated one. And lastly, I would initialize the AudioContext object inside a function 
   not called on startup. It doesn’t affect the game but the warning could be annoying in the future.

## License

    Copyright Christopher Lee

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
