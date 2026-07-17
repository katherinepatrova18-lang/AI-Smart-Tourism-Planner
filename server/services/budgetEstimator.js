// Budget Estimator Service
// Calculates and estimates travel budgets

const estimateBudget = (destination, days, travelers, budgetLevel = 'moderate') => {
  const costPerDay = {
    'budget': 50,
    'moderate': 100,
    'luxury': 250
  };

  const baseAmount = costPerDay[budgetLevel] || costPerDay.moderate;
  const totalPerPerson = baseAmount * days;
  const totalBudget = totalPerPerson * travelers;

  const breakdown = {
    accommodation: {
      perNight: Math.round(baseAmount * 0.4),
      nights: days,
      total: Math.round(baseAmount * 0.4 * days * travelers)
    },
    food: {
      perDay: Math.round(baseAmount * 0.3),
      days: days,
      total: Math.round(baseAmount * 0.3 * days * travelers)
    },
    activities: {
      perDay: Math.round(baseAmount * 0.15),
      days: days,
      total: Math.round(baseAmount * 0.15 * days * travelers)
    },
    transport: {
      perDay: Math.round(baseAmount * 0.1),
      days: days,
      total: Math.round(baseAmount * 0.1 * days * travelers)
    },
    miscellaneous: {
      perDay: Math.round(baseAmount * 0.05),
      days: days,
      total: Math.round(baseAmount * 0.05 * days * travelers)
    }
  };

  const savingTips = [
    'Book accommodations 2-3 weeks in advance',
    'Use public transportation instead of private cabs',
    'Eat at local restaurants for authentic experience at lower costs',
    'Look for free attractions like parks and temples',
    'Avoid peak season travel for better prices',
    'Book combo packages for attractions',
    'Use travel cards with no foreign transaction fees',
    'Carry reusable water bottle to save on beverages'
  ];

  return {
    destination,
    days,
    travelers,
    budgetLevel,
    totalBudget: Math.round(totalBudget),
    perPersonBudget: Math.round(totalPerPerson),
    breakdown,
    savingTips: savingTips.slice(0, 5)
  };
};

const calculateCurrencyConversion = (amount, fromCurrency, toCurrency) => {
  // Mock conversion rates
  const rates = {
    'USD': 1,
    'EUR': 0.92,
    'GBP': 0.79,
    'INR': 83.5,
    'JPY': 149.5,
    'CAD': 1.36
  };

  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  const converted = (amount / fromRate) * toRate;

  return {
    original: `${fromCurrency} ${amount}`,
    converted: `${toCurrency} ${converted.toFixed(2)}`,
    rate: `1 ${fromCurrency} = ${(toRate / fromRate).toFixed(2)} ${toCurrency}`
  };
};

module.exports = {
  estimateBudget,
  calculateCurrencyConversion
};
