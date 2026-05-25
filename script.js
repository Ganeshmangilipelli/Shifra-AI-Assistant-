let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// TEXT TO SPEECH
function speak(text) {

    let textSpeak = new SpeechSynthesisUtterance(text);

    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    textSpeak.lang = "en-US";

    window.speechSynthesis.speak(textSpeak);
}

// WISH USER
function wishMe() {

    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    }
    else if (hours >= 12 && hours < 17) {
        speak("Good Afternoon Sir");
    }
    else {
        speak("Good Evening Sir");
    }
}

// AUTO GREETING
window.addEventListener("load", () => {
    wishMe();
});

// SPEECH RECOGNITION
let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = "en-US";

// START LISTENING
btn.addEventListener("click", () => {

    recognition.start();

    voice.style.display = "block";
    btn.style.display = "none";
    content.innerText = "Listening...";
});

// WHEN SPEECH IS DETECTED
recognition.onresult = (event) => {

    let currentIndex = event.resultIndex;

    let transcript =
        event.results[currentIndex][0].transcript;

    content.innerText = transcript;

    takeCommand(transcript.toLowerCase());
};

// WHEN LISTENING ENDS
recognition.onend = () => {

    voice.style.display = "none";
    btn.style.display = "flex";
};

// MAIN COMMAND FUNCTION
function takeCommand(message) {

    voice.style.display = "none";
    btn.style.display = "flex";

    // GREETING
    if (
        message.includes("hello") ||
        message.includes("hey") ||
        message.includes("hi")
    ) {

        speak("Hello Sir, what can I help you with?");
    }

    // ABOUT ASSISTANT
    else if (message.includes("who are you") || message.includes("what is your name")) {

        speak("I am Shifra, your virtual assistant.");
    }

    // TIME
    else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak("The current time is " + time);
    }

    // DATE
    else if (message.includes("date") || message.includes("day")) {
        let date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    }

    // OPEN WEBSITES
    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://google.com");
    }

    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://youtube.com");
    }

    else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://facebook.com");
    }

    // SEARCH
    else if (message.includes("search for")) {
        let query = message.replace("search for", "").trim();
        speak("Searching for " + query);
        window.open("https://www.google.com/search?q=" + encodeURIComponent(query));
    }

    // JOKE
    else if (message.includes("tell me a joke") || message.includes("joke")) {
        let jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "What do you call fake spaghetti? An impasta!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!"
        ];
        let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(randomJoke);
    }

    // WEATHER (basic, since no API)
    else if (message.includes("weather")) {
        speak("I'm sorry, I can't check the weather right now. Please check a weather app.");
    }

    // CALCULATE SIMPLE MATH
    else if (message.includes("calculate") || message.includes("what is")) {
        let expression = message.replace("calculate", "").replace("what is", "").trim();
        try {
            let result = eval(expression);
            speak("The result is " + result);
        } catch (e) {
            speak("Sorry, I can't calculate that.");
        }
    }

    // GOODBYE
    else if (message.includes("bye") || message.includes("goodbye")) {
        speak("Goodbye Sir, have a nice day!");
    }

    // DEFAULT
    else {
        speak("I'm sorry, I didn't understand that. Can you please repeat?");
    }
}

    // OPEN YOUTUBE
    else if (message.includes("open youtube")) {

        speak("Opening YouTube");

        window.open(
            "https://www.youtube.com/",
            "_blank"
        );
    }

    // OPEN GOOGLE
    else if (message.includes("open google")) {

        speak("Opening Google");

        window.open(
            "https://www.google.com/",
            "_blank"
        );
    }

    // OPEN FACEBOOK
    else if (message.includes("open facebook")) {

        speak("Opening Facebook");

        window.open(
            "https://www.facebook.com/",
            "_blank"
        );
    }

    // OPEN INSTAGRAM
    else if (message.includes("open instagram")) {

        speak("Opening Instagram");

        window.open(
            "https://www.instagram.com/",
            "_blank"
        );
    }

    // OPEN GITHUB
    else if (message.includes("open github")) {

        speak("Opening GitHub");

        window.open(
            "https://github.com/",
            "_blank"
        );
    }

    // TIME
    else if (message.includes("time")) {

        let time = new Date().toLocaleTimeString(
            undefined,
            {
                hour: "numeric",
                minute: "numeric"
            }
        );

        speak("The time is " + time);
    }

    // DATE
    else if (message.includes("date")) {

        let date = new Date().toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

        speak("Today's date is " + date);
    }

    // CALCULATOR
    else if (message.includes("open calculator")) {

        speak("Opening calculator");

        window.open("calculator://");
    }

    // WHATSAPP
    else if (message.includes("open whatsapp")) {

        speak("Opening WhatsApp");

        window.open("https://web.whatsapp.com/");
    }

    // DEFAULT GOOGLE SEARCH
    else {

        message = message.replace("assistant", "");

        let finalText =
            "This is what I found on the internet regarding " +
            message;

        speak(finalText);

        window.open(
            `https://www.google.com/search?q=${message}`,
            "_blank"
        );
    }
