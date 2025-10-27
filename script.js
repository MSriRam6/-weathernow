document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const locationElement = document.getElementById('location');
    const dateElement = document.getElementById('date');
    const temperatureElement = document.getElementById('temperature');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDescription = document.getElementById('weather-description');
    const windSpeedElement = document.getElementById('wind-speed');
    const humidityElement = document.getElementById('humidity');
    const feelsLikeElement = document.getElementById('feels-like');
    const visibilityElement = document.getElementById('visibility');
    const loadingElement = document.getElementById('loading');
    const errorMessageElement = document.getElementById('error-message');
    const weatherInfoElement = document.getElementById('weather-info');
    
    // Format today's date
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
    
    // Search button click event
    searchBtn.addEventListener('click', fetchWeatherData);
    
    // Enter key event for input
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            fetchWeatherData();
        }
    });
    
    // Initial load with default city
    fetchWeatherData();
    
    function fetchWeatherData() {
        const city = cityInput.value.trim();
        if (!city) return;
        
        // Show loading state
        loadingElement.style.display = 'block';
        weatherInfoElement.style.display = 'none';
        errorMessageElement.style.display = 'none';
        
        // In a real implementation, we would fetch from Open-Meteo API
        // For this demo, we'll simulate API call with setTimeout
        setTimeout(() => {
            // Simulate successful response
            if (Math.random() > 0.1) { // 90% success rate for demo
                updateWeatherUI(city);
            } else {
                // Simulate error
                showError("Unable to fetch weather data for " + city);
            }
        }, 1500);
    }
    
    function updateWeatherUI(city) {
        // Hide loading, show weather info
        loadingElement.style.display = 'none';
        weatherInfoElement.style.display = 'block';
        
        // Update location
        locationElement.textContent = city + ", " + getCountry(city);
        
        // Generate random weather data for demo
        const temp = getRandomTemp(city);
        const weatherCondition = getRandomWeatherCondition();
        
        // Update temperature
        temperatureElement.innerHTML = `${temp}<span>°C</span>`;
        
        // Update weather description and icon
        weatherDescription.textContent = weatherCondition.description;
        weatherIcon.className = `fas ${weatherCondition.icon} weather-icon`;
        
        // Update details
        windSpeedElement.textContent = `${getRandomInt(5, 25)} km/h`;
        humidityElement.textContent = `${getRandomInt(30, 90)}%`;
        feelsLikeElement.textContent = `${temp - getRandomInt(1, 3)}°C`;
        visibilityElement.textContent = `${getRandomInt(5, 20)} km`;
    }
    
    function showError(message) {
        loadingElement.style.display = 'none';
        weatherInfoElement.style.display = 'none';
        errorMessageElement.style.display = 'block';
        document.getElementById('error-text').textContent = message;
    }
    
    // Helper functions for demo data
    function getCountry(city) {
        const countries = {
            'London': 'United Kingdom',
            'New York': 'United States',
            'Tokyo': 'Japan',
            'Paris': 'France',
            'Sydney': 'Australia',
            'Berlin': 'Germany',
            'Mumbai': 'India',
            'Toronto': 'Canada'
        };
        return countries[city] || 'Country';
    }
    
    function getRandomTemp(city) {
        // Give different temperature ranges based on city for realism
        const tempRanges = {
            'London': [5, 25],
            'New York': [-5, 35],
            'Tokyo': [0, 30],
            'Paris': [0, 28],
            'Sydney': [10, 40],
            'Berlin': [-10, 30],
            'Mumbai': [15, 45],
            'Toronto': [-20, 30]
        };
        
        const range = tempRanges[city] || [0, 30];
        return getRandomInt(range[0], range[1]);
    }
    
    function getRandomWeatherCondition() {
        const conditions = [
            { description: 'Sunny', icon: 'fa-sun' },
            { description: 'Partly Cloudy', icon: 'fa-cloud-sun' },
            { description: 'Cloudy', icon: 'fa-cloud' },
            { description: 'Rainy', icon: 'fa-cloud-rain' },
            { description: 'Light Rain', icon: 'fa-cloud-sun-rain' },
            { description: 'Snow', icon: 'fa-snowflake' },
            { description: 'Foggy', icon: 'fa-smog' }
        ];
        return conditions[getRandomInt(0, conditions.length - 1)];
    }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});