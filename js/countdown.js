let timer;
let elapsedTime = 10;
let running = false;
const totalTime = 10;
const circleLength = 565.48;

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
    
    // Update circular progress animation
    let progress = (elapsedTime / totalTime) * circleLength;
    document.getElementById("progressRing").style.strokeDashoffset = progress;
    
    if (elapsedTime <= 0) {
        clearInterval(timer);
        document.querySelector(".stopwatch").textContent = "00:00";
        fillExerciseForm();
        document.getElementById("exerciseForm").style.display = "block";
    }
}

function startStopwatch() {
    if (!running && elapsedTime > 0) {
        running = true;
        timer = setInterval(() => {
            elapsedTime--;
            updateDisplay();
        }, 1000);
    }
}

function stopStopwatch() {
    running = false;
    clearInterval(timer);
}

function resetStopwatch() {
    running = false;
    clearInterval(timer);
    elapsedTime = 10;
    updateDisplay();
    document.getElementById("exerciseForm").style.display = "none";
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

function goBack() {
    window.history.back();
}