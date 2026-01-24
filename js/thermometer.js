// Thermometer visualization and animation logic

function animateThermometer(score) {
    const fill = document.querySelector('.thermometer-fill');
    const bulb = document.querySelector('.thermometer-bulb');
    const scoreLabel = document.querySelector('.score-label');
    const category = getScoreCategory(score);

    // Invert the display score - low actual scores (20-40) should display as high (60-80)
    // This makes everyone appear to NEED GymSwap (showing red/orange)
    const displayScore = 100 - score;

    // Reset states
    fill.style.height = '0%';
    scoreLabel.style.opacity = '0';

    // Animate fill from bottom to INVERTED score level (so it shows high)
    setTimeout(() => {
        fill.style.height = `${displayScore}%`;
        fill.style.background = category.color;
    }, 100);

    // Update bulb color based on score
    setTimeout(() => {
        bulb.style.background = category.color;
        bulb.style.boxShadow = `0 0 20px ${category.color}`;
    }, 1500);

    // Show INVERTED score label with animation
    setTimeout(() => {
        scoreLabel.textContent = `${displayScore}/100`;
        scoreLabel.style.opacity = '1';
        scoreLabel.style.color = category.color;
    }, 2000);
}

function resetThermometer() {
    const fill = document.querySelector('.thermometer-fill');
    const bulb = document.querySelector('.thermometer-bulb');
    const scoreLabel = document.querySelector('.score-label');

    fill.style.height = '0%';
    fill.style.background = '#ccc';
    bulb.style.background = '#ccc';
    bulb.style.boxShadow = 'none';
    scoreLabel.style.opacity = '0';
    scoreLabel.textContent = '0/100';
}
