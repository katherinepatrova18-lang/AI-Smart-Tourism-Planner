// Route Optimizer Service
// Generates optimized travel routes

const optimizeRoute = (startPoint, endPoints, transportMode = 'car') => {
  // Mock route optimization
  const distances = {
    'car': 1.5,
    'bus': 1.8,
    'train': 2.0,
    'flight': 0.5
  };

  const speeds = {
    'car': 60,
    'bus': 50,
    'train': 80,
    'flight': 500
  };

  const multiplier = distances[transportMode] || 1.5;
  const speed = speeds[transportMode] || 60;

  const routes = endPoints.map((point, index) => {
    const distance = Math.floor(Math.random() * 100 + 50) * multiplier;
    const time = Math.round(distance / speed * 60); // in minutes

    return {
      from: index === 0 ? startPoint : endPoints[index - 1],
      to: point,
      distance: `${distance} km`,
      duration: `${Math.floor(time / 60)}h ${time % 60}m`,
      transportMode,
      cost: Math.round(distance * 2)
    };
  });

  const totalDistance = routes.reduce((sum, route) => {
    const dist = parseInt(route.distance);
    return sum + dist;
  }, 0);

  const totalTime = routes.reduce((sum, route) => {
    const match = route.duration.match(/\d+/);
    return sum + (match ? parseInt(match[0]) : 0);
  }, 0);

  return {
    routes,
    totalDistance: `${totalDistance} km`,
    totalTime: `${totalTime} hours`,
    totalCost: routes.reduce((sum, route) => sum + route.cost, 0),
    efficiency: 'Optimized for time and cost'
  };
};

module.exports = {
  optimizeRoute
};
