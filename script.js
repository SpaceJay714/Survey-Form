let currentQuestion = 0;
const questions = document.querySelectorAll(".question");
const responses = {};
const introScreen = document.querySelector(".intro-screen");
const questionBox = document.querySelector(".question-box");
let userLocation = "Not Provided";

function startSurvey() {
    // Ask for location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
            },
            (error) => {
                userLocation = "Location access denied";
            }
        );
    } else {
        userLocation = "Geolocation not supported";
    }

    // Fade out the intro screen
    introScreen.style.opacity = "0";
    introScreen.style.transform = "translateY(-20px)";

    setTimeout(() => {
        introScreen.style.display = "none";
        questionBox.style.display = "flex"; // Show the question box

        // Show the first question smoothly
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

function sendResponses() {
    const emailData = {
        service_id: "service_2euvlxd",  // Replace with your actual service ID
        template_id: "template_lbpl2ou",  // Replace with your actual template ID
        user_id: "JK_eRj6N_9Y7SIVpi",  // Replace with your actual public key
        template_params: {
            to_email: "ianjobby72@gmail.com",
            subject: "New Survey Response",
            message: `Survey Responses:\n${JSON.stringify(responses, null, 2)}\n\nLocation: ${userLocation}`
        }
    };

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData)
    })
    .then(response => response.json())  // Convert response to JSON
    .then(data => {
        console.log("Email sent successfully!", data);
    })
    .catch(error => {
        console.error("Error sending email:", error);
    });
}

