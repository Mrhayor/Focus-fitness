let timer;
let elapsedTime = 60;
let running = false;
const totalTime = 60;
const circleLength = 565.48;
let slideshowInterval;
let speech;

const exerciseWriteUps = {
    "Push-ups": "Push-ups are a classic upper body exercise that target your chest, shoulders, and triceps. Maintain a straight body line and lower yourself until your chest nearly touches the ground.",
    "Squats": "Squats strengthen your lower body, focusing on quads, hamstrings, and glutes. Keep your back straight and knees over your toes as you lower your hips.",
    "Jumping Jacks": "Jumping Jacks are a full-body cardio exercise that boost heart rate and coordination. Jump your feet out while raising your arms overhead, then return to the starting position.",
    "Sit-ups": "Sit-ups target your core muscles, particularly the abdominals. Lie on your back, bend your knees, and lift your torso toward your thighs."
};

function showStopwatch() {
    if (document.getElementById("exerciseSelection").value) {
        document.getElementById("stopwatchContainer").style.display = "block";
    }
}

function updateDisplay() {
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;
    document.querySelector(".stopwatch").textContent = 
        String(minutes).padStart(2, '0') + ":" + 
        String(seconds).padStart(2, '0');
    document.getElementById("elapsedTime").value = document.querySelector(".stopwatch").textContent;
    
    let progress = (elapsedTime / totalTime) * circleLength;
    document.getElementById("progressRing").style.strokeDashoffset = progress;
    
    if (elapsedTime <= 0) {
        clearInterval(timer);
        clearInterval(slideshowInterval);
        speechSynthesis.cancel();
        document.querySelector(".stopwatch").textContent = "00:00";
        fillExerciseForm();
        document.getElementById("exerciseForm").style.display = "block";
        running = false;
    }
}

function startStopwatch() {
    if (!running && elapsedTime > 0) {
        running = true;
        
        timer = setInterval(() => {
            elapsedTime--;
            updateDisplay();
        }, 1000);

        const selectedExercise = document.getElementById("exerciseSelection").value;
        const images = document.querySelectorAll(`.slideshow.${selectedExercise.toLowerCase().replace(" ", "-")}`);
        let index = 0;
        
        function showNextImage() {
            images.forEach(img => img.style.display = 'none');
            images[index].style.display = 'block';
            index = (index + 1) % images.length;
        }
        
        showNextImage();
        slideshowInterval = setInterval(showNextImage, 1500);

        // Update title and write-up
        document.getElementById("exerciseTitle").textContent = selectedExercise;
        document.getElementById("textToRead").textContent = exerciseWriteUps[selectedExercise];
        document.getElementById("textToRead").style.display = "block";

        if ('speechSynthesis' in window) {
            const text = document.getElementById("textToRead").innerText;
            speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-US';
            speechSynthesis.speak(speech);
        } else {
            alert("Your browser does not support speech synthesis.");
        }
    }
}

function stopStopwatch() {
    if (running) {
        running = false;
        clearInterval(timer);
        clearInterval(slideshowInterval);
        speechSynthesis.cancel();
    }
}

function resetStopwatch() {
    running = false;
    clearInterval(timer);
    clearInterval(slideshowInterval);
    speechSynthesis.cancel();
    elapsedTime = 60;
    updateDisplay();
    document.getElementById("exerciseForm").style.display = "none";
    const images = document.querySelectorAll(".slideshow");
    images.forEach(img => img.style.display = 'none');
    document.getElementById("exerciseTitle").textContent = "";
 
}

function fillExerciseForm() {
    let selectedExercise = document.getElementById("exerciseSelection").value;
    let exerciseData = {
        "Push-ups": { sets: 3, reps: 15, meal: "Protein shake with banana" },
        "Squats": { sets: 4, reps: 20, meal: "Grilled chicken with rice" },
        "Jumping Jacks": { sets: 2, reps: 30, meal: "Oatmeal with nuts" },
        "Sit-ups": { sets: 3, reps: 25, meal: "Greek yogurt with honey" }
    };
    
    document.getElementById("day").value = "Monday";
    document.getElementById("exercise").value = selectedExercise;
    document.getElementById("sets").value = exerciseData[selectedExercise].sets;
    document.getElementById("reps").value = exerciseData[selectedExercise].reps;
    document.getElementById("meal").value = exerciseData[selectedExercise].meal;
}