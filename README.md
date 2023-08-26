# KaraokeApp
The exciting karaoke experience to elevate your singing and unleash your inner star.
## Inspiration

Seeing the impact of quarantine linger on to today’s youth, we wanted to craft a remedy for those who are struggling with mental health challenges and feelings of loneliness. Fun is often the best way to vent out our negative emotions and what better than to merge it with singing, an activity that has proven to release stress, improve confidence, and be a great outlet for creativity and artistic expression. We also recognize that gaming is a remarkable platform to motivate people to actively pursue specific goals. Our aspiration to merge technology and gaming with the art of singing led to the creation of Harmony Haven, an app that seamlessly intertwines wellbeing, entertainment and learning, making karaoke an immersive and enriching experience for all.

## What it does

Harmony Haven is a versatile platform designed to transform any song into an engaging karaoke experience. It takes in the name of any song and generates a complete karaoke track featuring an instrumental accompaniment and lyrics for the user to sing along. As the user sings, Harmony Haven analyzes their pitch and compares it with the correct pitch in real time, giving a dynamic assessment with a live display of score, accuracy, and combo. There are 5 ranks based on the user’s singing accuracy: SS, S, A, B, C, and D, from best to worst, and you gain more score by maintaining a higher rank as well as achieving an impressive combo. Furthermore, a synchronized graph illustrates the user's vocal pitches in parallel with the intended pitches. This visual feedback empowers users to seamlessly improve their singing in real-time.

## How we built it

We used **React** and **Node.js** to create a full-stack web app, using **MongoDB** for our storage, the **Web Audio API** for collecting and analyzing pitch from a live audio stream, and the **Youtube API** to search for and create karaoke tracks for any song.

## Challenges we ran into

Debugging and going through trial and error for audio configuration (ex. min and max decibels, ACF2+ algorithm, time delay) to optimize the accuracy of our pitch analysis.

Cold air conditioning at George Vari Engineering Centre. 🥶

Merging our separate sections of code together into a functional application.

## Accomplishments that we're proud of

We are proud of creating a genuinely fun product that we could see ourselves and others playing. 

## What we learned

We learned how to work with various APIs and pick up new languages/frameworks in a limited timeframe while maintaining clear communication with the entire team.

## What's next for Harmony Haven

Implementing Google Cloud API products like Speech-To-Text to evaluate the user’s pronunciation, pace, etc. while singing.

Adding mods such as “Flashlight” or “Blind” which limits the user’s vision of the lyrics, and a tempo changer so the user can practice at their own comfortable pace, especially for faster songs.

Improving the audio quality of our AI generated instrumental tracks.

Adding leaderboards and multiplayer to make a more interactive experience.
