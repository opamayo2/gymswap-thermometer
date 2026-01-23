// Question configuration for GymSwap Thermometer
const QUESTIONS = [
    {
        id: 'frequency',
        text: 'How many days per week do you typically go to the gym?',
        options: [
            { value: 1, label: '1 day per week' },
            { value: 2, label: '2 days per week' },
            { value: 3, label: '3 days per week' },
            { value: 4, label: '4 days per week' },
            { value: 5, label: '5 or more days per week' }
        ]
    },
    {
        id: 'cost',
        text: 'How much do you pay per week for your gym membership?',
        type: 'number',
        placeholder: 'Enter amount (e.g., 35)',
        min: 0,
        max: 500
    },
    {
        id: 'contract',
        text: 'What type of membership contract do you have?',
        options: [
            { value: 'monthly', label: 'Month-to-month (no contract)' },
            { value: '6month', label: '6-month contract' },
            { value: '1year', label: '1-year contract' },
            { value: 'multiyear', label: 'Multi-year contract' }
        ]
    },
    {
        id: 'facilities',
        text: 'Which facilities do you regularly use at your gym?',
        options: [
            { value: 'basic', label: 'Just cardio equipment and weights' },
            { value: 'classes', label: 'Group fitness classes' },
            { value: 'premium', label: 'Pool, sauna, or spa facilities' },
            { value: 'training', label: 'Personal training sessions' },
            { value: 'everything', label: 'I use everything available' }
        ]
    },
    {
        id: 'distance',
        text: 'How far is your gym from your home or work?',
        options: [
            { value: 'very-close', label: 'Under 5 minutes' },
            { value: 'close', label: '5-10 minutes' },
            { value: 'medium', label: '10-20 minutes' },
            { value: 'far', label: '20-30 minutes' },
            { value: 'very-far', label: 'Over 30 minutes' }
        ]
    }
];
