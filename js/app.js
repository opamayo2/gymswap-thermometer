// Main application logic for GymSwap Thermometer

let currentQuestion = 0;
let answers = {};

// Screen management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Question rendering
function renderQuestion(questionIndex) {
    const question = QUESTIONS[questionIndex];

    // Update question text and counter
    document.getElementById('question-text').textContent = question.text;
    document.querySelector('.question-counter').textContent =
        `Question ${questionIndex + 1} of ${QUESTIONS.length}`;

    // Update progress bar
    const progress = ((questionIndex + 1) / QUESTIONS.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;

    // Render options container
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Check if this is a number input question
    if (question.type === 'number') {
        // Create number input for cost question
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'number-input-wrapper';

        const inputLabel = document.createElement('label');
        inputLabel.textContent = '$';
        inputLabel.className = 'input-prefix';
        inputLabel.htmlFor = 'number-input';

        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'number-input';
        input.name = 'answer';
        input.className = 'number-input';
        input.placeholder = question.placeholder;
        input.min = question.min;
        input.max = question.max;
        input.step = '0.01';

        inputWrapper.appendChild(inputLabel);
        inputWrapper.appendChild(input);
        optionsContainer.appendChild(inputWrapper);

        // Enable next button when valid number is entered
        input.addEventListener('input', () => {
            const value = parseFloat(input.value);
            document.getElementById('next-btn').disabled =
                !input.value || isNaN(value) || value <= 0;
        });
    } else {
        // Render radio button options for other questions
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = option.value;
            input.id = `option-${index}`;

            const label = document.createElement('label');
            label.htmlFor = `option-${index}`;
            label.textContent = option.label;

            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            optionsContainer.appendChild(optionDiv);
        });

        // Enable next button when option is selected
        document.querySelectorAll('input[name="answer"]').forEach(input => {
            input.addEventListener('change', () => {
                document.getElementById('next-btn').disabled = false;
            });
        });
    }

    // Disable next button initially
    document.getElementById('next-btn').disabled = true;
}

// Results display
function showResults() {
    const score = calculateScore(answers);
    const category = getScoreCategory(score);

    // Calculate cost per visit for display
    const costPerVisit = calculateCostPerVisit(answers.cost, answers.frequency);

    // Update results title
    document.getElementById('results-title').textContent = category.title;

    // Display results message and cost breakdown
    document.getElementById('results-details').innerHTML = `
        <p class="results-message">${category.message}</p>
        <div class="cost-breakdown">
            <div class="cost-stat">
                <span class="cost-label">Cost per visit:</span>
                <span class="cost-value">$${costPerVisit.toFixed(2)}</span>
            </div>
            <p class="cost-detail">Based on ${answers.frequency} visit${answers.frequency > 1 ? 's' : ''} per week at $${parseFloat(answers.cost).toFixed(2)}/week</p>
        </div>
    `;

    // Show GymSwap CTA if getting ripped off
    const ctaSection = document.getElementById('cta-section');
    if (category.showCTA) {
        ctaSection.innerHTML = `
            <div class="cta-box">
                <h3>There's a Better Way</h3>
                <p>GymSwap lets you access gyms near you with flexible, pay-as-you-go pricing. No long-term contracts, no wasted money on unused memberships.</p>
                <p class="cta-search-text">Search for <strong>gymswap.com.au</strong> to join the waitlist</p>
            </div>
        `;
    } else {
        ctaSection.innerHTML = '';
    }

    // Animate thermometer
    animateThermometer(score);

    // Show results screen
    showScreen('results-screen');
}

// Event Listeners

// Start quiz button
document.getElementById('start-btn').addEventListener('click', () => {
    currentQuestion = 0;
    answers = {};
    showScreen('question-screen');
    renderQuestion(currentQuestion);
});

// Next button
document.getElementById('next-btn').addEventListener('click', () => {
    // Save the answer
    const currentQ = QUESTIONS[currentQuestion];
    let answerValue;

    // Check if this is a number input or radio button
    if (currentQ.type === 'number') {
        const numberInput = document.getElementById('number-input');
        answerValue = parseFloat(numberInput.value);
    } else {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        answerValue = selectedOption.value;
        // Parse numeric values, keep string values as-is
        answerValue = isNaN(answerValue) ? answerValue : parseFloat(answerValue);
    }

    answers[currentQ.id] = answerValue;
    currentQuestion++;

    if (currentQuestion < QUESTIONS.length) {
        // Render next question
        renderQuestion(currentQuestion);
    } else {
        // Show results
        showResults();
    }
});

// Retake quiz button
document.getElementById('retake-btn').addEventListener('click', () => {
    currentQuestion = 0;
    answers = {};
    resetThermometer();
    showScreen('landing-screen');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure landing screen is shown initially
    showScreen('landing-screen');
});
