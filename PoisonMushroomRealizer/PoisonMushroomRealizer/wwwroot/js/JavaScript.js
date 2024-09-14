const URL = "./model/";

let model, webcam, labelContainer, countdownContainer, maxPredictions, shouldStop = false, countdownInterval;
let highestPrediction = null;  // Variable to store the highest prediction

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup webcam
    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    // Append elements to DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);

    // Initialize labelContainer and countdownContainer
    labelContainer = document.getElementById("label-container");
    countdownContainer = document.getElementById("countdown-container");

    countdownContainer.innerHTML = "<div>Đang nhận diện, hãy chờ 10s...</div>";

    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    // Start the 10-second countdown and prediction
    startCountdown(10);
}

function startCountdown(seconds) {
    let countdown = seconds - 1;  // Start from 9
    countdownContainer.innerHTML = `Đang nhận diện, hãy chờ ${seconds}s...`;

    countdownInterval = setInterval(() => {
        countdownContainer.innerHTML = `Đang nhận diện, hãy chờ ${countdown}s...`;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            shouldStop = true;
            webcam.stop();
            alertHighestPrediction();
        }
    }, 1000);  // 1 second interval for countdown
}

async function loop() {
    if (shouldStop) return;
    webcam.update(); // Update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// Prediction function
async function predict() {
    const prediction = await model.predict(webcam.canvas);
    
    for (let i = 0; i < maxPredictions; i++) {
        const probability = prediction[i].probability.toFixed(2);
        const classPrediction = prediction[i].className + ": " + probability;
        labelContainer.childNodes[i].innerHTML = classPrediction;

        // Find the prediction with the highest probability greater than 0.9
        if (probability > 0.9 && (!highestPrediction || probability > highestPrediction.probability)) {
            highestPrediction = {
                className: prediction[i].className,
                probability: probability
            };
        }
    }
}

// Function to alert the highest prediction
function alertHighestPrediction() {
    if (highestPrediction) {
        alert("Tên nấm - " + highestPrediction.className + " .Độ chính xác khoảng:" + highestPrediction.probability*100+"%");
    } else {
        alert("Không nhận diện được loại nấm");
    }

    // Reload the page
    window.location.reload();
}
