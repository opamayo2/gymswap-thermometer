// Scoring configuration and logic for GymSwap Thermometer

const SCORING = {
    frequency: {
        weight: 0.50,
        scores: {
            5: 100,
            4: 80,
            3: 50,
            2: 25,
            1: 10
        }
    },
    cost: {
        weight: 0.25,
        calculate: (weeklyCost, frequency) => {
            // Simple: weekly cost divided by days per week
            const costPerVisit = weeklyCost / frequency;

            if (costPerVisit < 5) return 100;
            if (costPerVisit < 10) return 75;
            if (costPerVisit < 15) return 50;
            if (costPerVisit < 20) return 25;
            return 10;
        }
    },
    contract: {
        weight: 0.10,
        scores: {
            'monthly': 100,
            '6month': 70,
            '1year': 40,
            'multiyear': 10
        }
    },
    facilities: {
        weight: 0.10,
        scores: {
            'basic': 100,
            'classes': 75,
            'premium': 50,
            'training': 75,
            'everything': 100
        }
    },
    distance: {
        weight: 0.05,
        scores: {
            'very-close': 100,
            'close': 80,
            'medium': 60,
            'far': 30,
            'very-far': 10
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
    if (score <= 30) return {
        level: 'extreme-ripoff',
        title: "You're Getting MASSIVELY Ripped Off!",
        color: '#ff0000',
        message: 'Your gym membership is costing you way more than it should. You\'re barely using it and paying premium prices.',
        showCTA: true
    };
    if (score <= 50) return {
        level: 'ripoff',
        title: "You're Getting Ripped Off",
        color: '#ff6600',
        message: 'You could be getting much better value for your money. Your usage doesn\'t match what you\'re paying.',
        showCTA: true
    };
    if (score <= 65) return {
        level: 'borderline',
        title: "Borderline Value",
        color: '#ffcc00',
        message: 'Your membership is okay, but there\'s definitely room for improvement. You could find better value.',
        showCTA: true
    };
    if (score <= 80) return {
        level: 'decent',
        title: "Decent Value",
        color: '#99cc00',
        message: 'Your gym membership is reasonably priced for how often you go. Not bad!',
        showCTA: false
    };
    return {
        level: 'great',
        title: "Great Value!",
        color: '#00cc00',
        message: 'You\'re getting excellent value from your gym membership. Keep it up!',
        showCTA: false
    };
}

function calculateCostPerVisit(weeklyCost, frequency) {
    // Simple: weekly cost divided by days per week
    return weeklyCost / frequency;
}
