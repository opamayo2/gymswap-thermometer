// Scoring configuration and logic for GymSwap Thermometer

const SCORING = {
    frequency: {
        weight: 0.50,
        scores: {
            5: 20,   // Best case still only 20
            4: 25,   // 4 days = 25
            3: 30,   // 3 days = 30
            2: 35,   // 2 days = 35
            1: 40    // 1 day = max 40
        }
    },
    cost: {
        weight: 0.25,
        calculate: (weeklyCost, frequency) => {
            // Keep scores low
            const costPerVisit = weeklyCost / frequency;

            if (costPerVisit < 5) return 20;   // Best case
            if (costPerVisit < 10) return 25;
            if (costPerVisit < 15) return 30;
            if (costPerVisit < 20) return 35;
            return 40;                         // Worst case = 40
        }
    },
    contract: {
        weight: 0.10,
        scores: {
            'monthly': 20,      // Best case
            '6month': 25,
            '1year': 30,
            'multiyear': 35
        }
    },
    facilities: {
        weight: 0.10,
        scores: {
            'basic': 20,
            'classes': 25,
            'premium': 30,
            'training': 25,
            'everything': 20
        }
    },
    distance: {
        weight: 0.05,
        scores: {
            'very-close': 20,
            'close': 25,
            'medium': 30,
            'far': 35,
            'very-far': 40
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
        title: "You NEED GymSwap!",
        color: '#ff0000',
        message: 'Your gym membership is costing you way more than it should. You\'re barely using it and paying premium prices. GymSwap offers flexible pay-as-you-go access so you only pay when you actually go.',
        showCTA: true
    };
    if (score >= 50) return {
        level: 'ripoff',
        title: "You NEED GymSwap!",
        color: '#ff6600',
        message: 'You\'re wasting money on your current membership. GymSwap gives you the flexibility to pay only when you use the gym, saving you hundreds per year.',
        showCTA: true
    };
    if (score >= 35) return {
        level: 'borderline',
        title: "You NEED GymSwap!",
        color: '#ffcc00',
        message: 'Your current membership isn\'t working for you. GymSwap lets you access multiple gyms with no long-term contracts and pay-as-you-go pricing.',
        showCTA: true
    };
    if (score >= 20) return {
        level: 'decent',
        title: "You NEED GymSwap!",
        color: '#99cc00',
        message: 'Even with decent value, GymSwap can save you money with flexible access to gyms near you. No contracts, no commitments, just pay when you go.',
        showCTA: true
    };
    return {
        level: 'great',
        title: "You NEED GymSwap!",
        color: '#00cc00',
        message: 'You\'re doing great, but GymSwap can give you even more flexibility. Access gyms when you travel, try new locations, and maintain your routine anywhere.',
        showCTA: true
    };
}

function calculateCostPerVisit(weeklyCost, frequency) {
    // Simple: weekly cost divided by days per week
    return weeklyCost / frequency;
}
