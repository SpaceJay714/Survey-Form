let currentQuestion = 0;
const questions = document.querySelectorAll(".question");
const responses = {}; // Stores user answers
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

    // Hide intro screen and show questions
    introScreen.style.opacity = "0";
    introScreen.style.transform = "translateY(-20px)";

    setTimeout(() => {
        introScreen.style.display = "none";
        questionBox.style.display = "flex";

        // Show the first question smoothly
        setTimeout(() => {
            questions[0].classList.add("active");
        }, 100);
    }, 500);
}

function selectAnswer(index, answer) {
    responses[`Question ${index + 1}`] = answer; // Store the answer

    questions[index].style.opacity = "0";
    questions[index].style.transform = "translateY(20px)";

    setTimeout(() => {
        questions[index].style.display = "none";

        if (index + 1 < questions.length - 1) {
            questions[index + 1].style.display = "block";
            setTimeout(() => {
                questions[index + 1].classList.add("active");
                questions[index + 1].style.opacity = "1";
                questions[index + 1].style.transform = "translateY(0)";
            }, 100);
        } else {
            showEndScreen();
            sendResponses(); // Send data when survey ends
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
        service_id: "service_sd2i50f",  // Replace with your EmailJS service ID
        template_id: "template_lbpl2ou",  // Replace with your EmailJS template ID
        user_id: "Ffng-9gg_t6oBE2zL",  // Replace with your EmailJS public key
        template_params: {
            to_email: "ianjobby72@gmail.com",
            subject: "New message from Grocery Guru!",
            message: `Survey Responses:\n${JSON.stringify(responses, null, 2)}\n\nLocation: ${userLocation}`
        }
    };

    console.log("Email Data:", emailData); // Debugging log

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData)
    })
    .then(response => response.json()) 
    .then(data => {
        console.log("Email sent successfully!", data);
    })
    .catch(error => {
        console.error("Error sending email:", error);
    });
}


