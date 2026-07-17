// AI Trip Planner Service
// This service generates AI-powered itineraries based on user preferences

const generateAIItinerary = (destination, days, preferences) => {
  const activities = {
    'adventure': ['Rock Climbing', 'Trekking', 'Paragliding', 'Mountain Biking', 'Zip-lining'],
    'cultural': ['Museum Tours', 'Temple Visits', 'Local Markets', 'Heritage Walks', 'Cultural Performances'],
    'relaxation': ['Spa', 'Beach', 'Yoga', 'Meditation', 'Hot Springs'],
    'food': ['Food Tour', 'Cooking Class', 'Street Food Tour', 'Fine Dining', 'Market Visit'],
    'nature': ['Hiking', 'Bird Watching', 'Waterfall Visit', 'Forest Walk', 'Photography'],
    'entertainment': ['Nightlife', 'Shopping', 'Amusement Parks', 'Shows', 'Gaming']
  };

  const itinerary = [];
  const activitiesPerDay = Math.ceil(6 / days); // Distribute activities

  for (let day = 1; day <= days; day++) {
    const dayActivities = [];
    const times = ['08:00 AM', '11:00 AM', '02:00 PM', '05:00 PM', '08:00 PM'];

    for (let i = 0; i < activitiesPerDay && i < times.length; i++) {
      const preferenceType = preferences[i % preferences.length];
      const activityList = activities[preferenceType] || activities.cultural;
      const randomActivity = activityList[Math.floor(Math.random() * activityList.length)];

      dayActivities.push({
        time: times[i],
        activity: randomActivity,
        duration: '2 hours',
        cost: Math.floor(Math.random() * 100) + 20
      });
    }

    itinerary.push({
      day,
      title: `Day ${day} - ${destination}`,
      activities: dayActivities,
      foodRecommendations: ['Local Restaurant', 'Street Food', 'Cafe'],
      accommodations: ['Hotel A', 'Hotel B', 'Hostel']
    });
  }

  return itinerary;
};

// Calculate total estimated cost
const calculateTripCost = (days, numberOfTravelers, budgetType) => {
  const costPerDay = {
    'budget': 50,
    'moderate': 100,
    'luxury': 200
  };

  const perDayAmount = costPerDay[budgetType] || costPerDay.moderate;
  const accommodationCost = perDayAmount * 0.4 * days * numberOfTravelers;
  const foodCost = perDayAmount * 0.3 * days * numberOfTravelers;
  const activitiesCost = perDayAmount * 0.2 * days * numberOfTravelers;
  const transportCost = perDayAmount * 0.1 * days * numberOfTravelers;

  return {
    accommodation: Math.round(accommodationCost),
    food: Math.round(foodCost),
    activities: Math.round(activitiesCost),
    transport: Math.round(transportCost),
    total: Math.round(accommodationCost + foodCost + activitiesCost + transportCost)
  };
};

module.exports = {
  generateAIItinerary,
  calculateTripCost
};
