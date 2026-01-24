// Scoring configuration and logic for GymSwap Thermometer

const SCORING = {
    frequency: {
        weight: 0.50,
        scores: {
            5: 10,   // 5+ days = good value = low ripoff score
            4: 20,   // 4 days = decent value
            3: 50,   // 3 days = borderline
            2: 75,   // 2 days = getting ripped off
            1: 90    // 1 day = extreme ripoff
        }
    },
    cost: {
        weight: 0.25,
        calculate: (weeklyCost, frequency) => {
            // Simple: weekly cost divided by days per week
            const costPerVisit = weeklyCost / frequency;

            if (costPerVisit < 5) return 10;   // Under $5 = great value = low ripoff
            if (costPerVisit < 10) return 25;  // $5-10 = good value
            if (costPerVisit < 15) return 50;  // $10-15 = average
            if (costPerVisit < 20) return 75;  // $15-20 = poor value
            return 90;                         // Over $20 = extreme ripoff
        }
    },
    contract: {
        weight: 0.10,
        scores: {
            'monthly': 10,      // No commitment = good = low ripoff
            '6month': 30,       // 6-month = some commitment
            '1year': 60,        // 1-year = less flexible
            'multiyear': 90     // Multi-year = worst flexibility = high ripoff
        }
    },
    facilities: {
        weight: 0.10,
        scores: {
            'basic': 10,        // Using what you pay for = efficient = low ripoff
            'classes': 25,      // Classes are good value
            'premium': 50,      // Premium might be overpaying
            'training': 25,     // Personal training is valuable
            'everything': 10    // Using everything = great value = low ripoff
        }
    },
    distance: {
        weight: 0.05,
        scores: {
            'very-close': 10,   // Under 5 min = convenient = low ripoff
            'close': 20,        // 5-10 min = still convenient
            'medium': 40,       // 10-20 min = acceptable
            'far': 70,          // 20-30 min = inconvenient = higher ripoff
            'very-far': 90      // Over 30 min = barrier = high ripoff
        }
    }
};

function calculateScore(answers) {
    let totalScore = 0;

    // Frequency score (50% weight)
    const freqScore = SCORING.frequency.scores[answers.frequency];
    totalScore += freqScore * SCORING.frequency.weight;

    // Cost score (25% weight) - depends on frequency
    const costScore = SCORING.cost.calculate(answers.cost, answers.frequency);
    totalScore += costScore * SCORING.cost.weight;

    // Contract score (10% weight)
    const contractScore = SCORING.contract.scores[answers.contract];
    totalScore += contractScore * SCORING.contract.weight;

    // Facilities score (10% weight)
    const facilitiesScore = SCORING.facilities.scores[answers.facilities];
    totalScore += facilitiesScore * SCORING.facilities.weight;

    // Distance score (5% weight)
    const distanceScore = SCORING.distance.scores[answers.distance];
    totalScore += distanceScore * SCORING.distance.weight;

    return Math.round(totalScore);
}

function getScoreCategory(score) {
    // Inverted scale: Higher score = worse value = more need for GymSwap
    if (score >= 70) return {
        level: 'extreme-ripoff',
        title: "You're Getting MASSIVELY Ripped Off!",
        color: '#ff0000',
        message: 'Your gym membership is costing you way more than it should. You\'re barely using it and paying premium prices.',
        showCTA: true
    };
    if (score >= 50) return {
        level: 'ripoff',
        title: "You're Getting Ripped Off",
        color: '#ff6600',
        message: 'You could be getting much better value for your money. Your usage doesn\'t match what you\'re paying.',
        showCTA: true
    };
    if (score >= 35) return {
        level: 'borderline',
        title: "Borderline Value",
        color: '#ffcc00',
        message: 'Your membership is okay, but there\'s definitely room for improvement. You could find better value.',
        showCTA: true
    };
    if (score >= 20) return {
        level: 'decent',
        title: "Decent Value",
        color: '#99cc00',
        message: 'Your gym membership is reasonably priced for how often you go, but GymSwap could still save you money with flexible pay-as-you-go options.',
        showCTA: true
    };
    return {
        level: 'great',
        title: "Great Value!",
        color: '#00cc00',
        message: 'You\'re getting excellent value from your gym membership. GymSwap can help you maintain this flexibility when you travel or want to try new gyms.',
        showCTA: true
    };
}

function calculateCostPerVisit(weeklyCost, frequency) {
    // Simple: weekly cost divided by days per week
    return weeklyCost / frequency;
}
