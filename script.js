let currentQuestion = 0;
const questions = document.querySelectorAll(".question");
const responses = {};
const introScreen = document.querySelector(".intro-screen");
const questionBox = document.querySelector(".question-box");

function startSurvey() {
    // Fade out the intro screen
    introScreen.style.opacity = "0";
    introScreen.style.transform = "translateY(-20px)";
    
    setTimeout(() => {
        introScreen.style.display = "none";
        questionBox.style.display = "flex"; // Show the question box
        
        // Show the first question
        setTimeout(() => {
            questions[0].classList.add("active");
        }, 100);
    }, 500);
}

function selectAnswer(index, answer) {
    responses[`q${index + 1}`] = answer;

    questions[index].style.opacity = "0";
    questions[index].style.transform = "translateY(20px)";

    setTimeout(() => {
        questions[index].style.display = "none";

        if (index + 1 < questions.length) {
            questions[index + 1].style.display = "block";
            setTimeout(() => {
                questions[index + 1].classList.add("active");
                questions[index + 1].style.opacity = "1";
                questions[index + 1].style.transform = "translateY(0)";
            }, 100);
        } else {
            showEndScreen();
            sendResponses();
        }
    }, 500);
}

function showEndScreen() {
    const endScreen = document.querySelector(".end-screen");
    endScreen.style.display = "block";
    setTimeout(() => {
        endScreen.style.opacity = "1";
    }, 100);
}
