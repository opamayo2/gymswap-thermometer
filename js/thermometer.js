// Thermometer visualization and animation logic

function animateThermometer(score) {
    const fill = document.querySelector('.thermometer-fill');
    const bulb = document.querySelector('.thermometer-bulb');
    const scoreLabel = document.querySelector('.score-label');
    const category = getScoreCategory(score);

    // Reset states
    fill.style.height = '0%';
    scoreLabel.style.opacity = '0';

    // Animate fill from bottom to score level
    setTimeout(() => {
        fill.style.height = `${score}%`;
        fill.style.background = category.color;
    }, 100);

    // Update bulb color based on score
    setTimeout(() => {
        bulb.style.background = category.color;
        bulb.style.boxShadow = `0 0 20px ${category.color}`;
    }, 1500);

    // Show score label with animation
    setTimeout(() => {
        scoreLabel.textContent = `${score}/100`;
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
