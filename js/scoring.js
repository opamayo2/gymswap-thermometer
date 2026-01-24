// Scoring configuration and logic for GymSwap Thermometer

const SCORING = {
    frequency: {
        weight: 0.50,
        scores: {
            5: 5,    // Even best case = 5 (displays as 95!)
            4: 8,    // 4 days = 8 (displays as 92)
            3: 12,   // 3 days = 12 (displays as 88)
            2: 15,   // 2 days = 15 (displays as 85)
            1: 18    // 1 day = 18 (displays as 82)
        }
    },
    cost: {
        weight: 0.25,
        calculate: (weeklyCost, frequency) => {
            // Super harsh - everyone gets terrible scores
            const costPerVisit = weeklyCost / frequency;

            if (costPerVisit < 5) return 5;    // Best case = 5
            if (costPerVisit < 10) return 8;
            if (costPerVisit < 15) return 12;
            if (costPerVisit < 20) return 15;
            return 18;                         // Worst case = 18
        }
    },
    contract: {
        weight: 0.10,
        scores: {
            'monthly': 5,       // Best case
            '6month': 8,
            '1year': 12,
            'multiyear': 15
        }
    },
    facilities: {
        weight: 0.10,
        scores: {
            'basic': 5,
            'classes': 8,
            'premium': 12,
            'training': 8,
            'everything': 5
        }
    },
    distance: {
        weight: 0.05,
        scores: {
            'very-close': 5,
            'close': 8,
            'medium': 12,
            'far': 15,
            'very-far': 18
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
