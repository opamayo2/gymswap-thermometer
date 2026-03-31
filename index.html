// Yearly Gym Loss Calculator - Focus on annual waste from skipping gym

let billingPeriod = 'weekly'; // default

// Screen management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Convert membership cost to weekly
function convertToWeeklyCost(cost, period) {
    switch(period) {
        case 'weekly':
            return cost;
        case 'monthly':
            return cost / 4.33; // Average weeks per month
        case 'yearly':
            return cost / 52;
        default:
            return cost;
    }
}

// Number selector handlers
function setupNumberSelectors() {
    document.querySelectorAll('.increment').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const input = document.getElementById(targetId);
            const max = parseInt(input.max);
            const current = parseInt(input.value);
            if (current < max) {
                input.value = current + 1;
            }
        });
    });

    document.querySelectorAll('.decrement').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const input = document.getElementById(targetId);
            const min = parseInt(input.min);
            const current = parseInt(input.value);
            if (current > min) {
                input.value = current - 1;
            }
        });
    });
}

// No validation needed anymore since we removed planned visits

// Billing period selector
function setupBillingPeriod() {
    document.querySelectorAll('.billing-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            document.querySelectorAll('.billing-btn').forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            // Update billing period
            billingPeriod = btn.dataset.period;
            // Update suffix text
            const suffixMap = {
                'weekly': '/ week',
                'monthly': '/ month',
                'yearly': '/ year'
            };
            document.getElementById('billing-suffix').textContent = suffixMap[billingPeriod];
        });
    });
}

// Calculate yearly losses
function calculateYearlyLoss() {
    const membershipCost = parseFloat(document.getElementById('membership-cost').value);
    const actualVisits = parseInt(document.getElementById('actual-visits').value);

    // Validate inputs
    if (!membershipCost || membershipCost <= 0 || isNaN(actualVisits)) {
        alert('Please fill in all fields with valid values');
        return;
    }

    // Convert to weekly cost
    const weeklyCost = convertToWeeklyCost(membershipCost, billingPeriod);

    // Assume membership gives access to 7 days per week
    const totalAvailableDays = 7;
    const skippedDays = totalAvailableDays - actualVisits;

    // Calculate cost per day (dividing weekly cost by 7 days)
    const costPerDay = weeklyCost / totalAvailableDays;

    // Calculate waste from unused days
    const weeklyWaste = costPerDay * skippedDays;
    const monthlyWaste = weeklyWaste * 4.33;
    const yearlyLoss = weeklyWaste * 52;
    const fiveYearLoss = yearlyLoss * 5;

    // Calculate what they're actually paying per visit
    const actualCostPerVisit = actualVisits > 0 ? weeklyCost / actualVisits : weeklyCost;

    // Display results
    displayResults({
        yearlyLoss,
        skippedDays,
        costPerDay,
        actualCostPerVisit,
        weeklyWaste,
        monthlyWaste,
        fiveYearLoss,
        actualVisits,
        currentWeeklyCost: weeklyCost,
        skippedDaysPerYear: skippedDays * 52
    });

    // Show results screen
    showScreen('results-screen');
}

// Display results
function displayResults(data) {
    // Hero section - show the annual loss
    document.getElementById('yearly-loss-display').textContent = `$${Math.round(data.yearlyLoss).toLocaleString()}`;

    // Breakdown
    document.getElementById('weekly-cost').textContent = `$${data.currentWeeklyCost.toFixed(2)}`;
    document.getElementById('skipped-days').textContent = `${data.skippedDays}`;
    document.getElementById('cost-per-day').textContent = `$${data.costPerDay.toFixed(2)}`;
    document.getElementById('weekly-waste').textContent = `$${data.weeklyWaste.toFixed(2)}`;
    document.getElementById('monthly-waste').textContent = `$${data.monthlyWaste.toFixed(2)}`;

    // 5-year projection
    document.getElementById('five-year-loss').textContent = `$${Math.round(data.fiveYearLoss).toLocaleString()}`;

    // Generate comparisons
    generateComparisons(data.yearlyLoss);

    // Generate chart
    generateChart(data.yearlyLoss, data.fiveYearLoss);
}

// Generate what you could buy comparisons
function generateComparisons(yearlyLoss) {
    const comparisons = [];
    const roundedLoss = Math.round(yearlyLoss);

    if (roundedLoss >= 2000) {
        comparisons.push({
            icon: '✈️',
            item: 'International Flight',
            quantity: Math.floor(roundedLoss / 800),
            unit: 'flights'
        });
    }

    if (roundedLoss >= 1000) {
        comparisons.push({
            icon: '🏖️',
            item: 'Weekend Getaway',
            quantity: Math.floor(roundedLoss / 500),
            unit: 'trips'
        });
    }

    if (roundedLoss >= 500) {
        comparisons.push({
            icon: '📱',
            item: 'New Smartphone',
            quantity: Math.floor(roundedLoss / 1000),
            unit: roundedLoss >= 1000 ? 'phones' : 'or half a phone'
        });
    }

    comparisons.push({
        icon: '🍕',
        item: 'Pizza Dinners',
        quantity: Math.floor(roundedLoss / 25),
        unit: 'dinners'
    });

    comparisons.push({
        icon: '☕',
        item: 'Coffee',
        quantity: Math.floor(roundedLoss / 5),
        unit: 'cups'
    });

    comparisons.push({
        icon: '🎬',
        item: 'Movie Tickets',
        quantity: Math.floor(roundedLoss / 15),
        unit: 'tickets'
    });

    // Display comparisons
    const grid = document.getElementById('comparison-grid');
    grid.innerHTML = comparisons.map(comp => `
        <div class="comparison-card">
            <div class="comparison-icon">${comp.icon}</div>
            <div class="comparison-quantity">${comp.quantity}</div>
            <div class="comparison-item">${comp.item}</div>
        </div>
    `).join('');
}

// Generate 5-year projection chart
function generateChart(yearlyLoss, fiveYearLoss) {
    const chartBars = document.getElementById('chart-bars');
    const maxHeight = 200; // pixels

    let cumulativeLoss = 0;
    const bars = [];

    for (let year = 1; year <= 5; year++) {
        cumulativeLoss += yearlyLoss;
        const heightPercent = (cumulativeLoss / fiveYearLoss) * 100;

        bars.push(`
            <div class="chart-bar-container">
                <div class="chart-bar" style="height: ${heightPercent}%">
                    <div class="chart-bar-value">$${Math.round(cumulativeLoss).toLocaleString()}</div>
                </div>
                <div class="chart-bar-label">Year ${year}</div>
            </div>
        `);
    }

    chartBars.innerHTML = bars.join('');
}

// Event Listeners

// Start button
document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('input-screen');
});

// Calculate button
document.getElementById('calculate-btn').addEventListener('click', () => {
    calculateYearlyLoss();
});

// Recalculate button
document.getElementById('recalculate-btn').addEventListener('click', () => {
    showScreen('input-screen');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    showScreen('landing-screen');
    setupNumberSelectors();
    setupBillingPeriod();
});
