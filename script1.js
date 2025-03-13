
const cityCoordinates = {
  "Mumbai": [19.0760, 72.8777],
  "Pune": [18.5204, 73.8567],
  "Ahmedabad": [23.0225, 72.5714],
  "Hyderabad": [17.3850, 78.4867],
  "Jaipur": [26.9124, 75.7873],
  "Delhi": [28.7041, 77.1025],
  "Bangalore": [12.9716, 77.5946],
  "Chennai": [13.0827, 80.2707],
  "Kolkata": [22.5726, 88.3639],
  "Surat": [21.1702, 72.8311],
  "Nagpur": [21.1458, 79.0882],
  "Lucknow": [26.8467, 80.9462],
  "Chandigarh": [30.7333, 76.7794],
  "Mysore": [12.2958, 76.6394],
  "Coimbatore": [11.0168, 76.9558],
  "Patna": [25.5941, 85.1376],
  "Bhubaneswar": [20.2961, 85.8245],
  "Ranchi": [23.3441, 85.3096],
  "Raipur": [21.2514, 81.6296],
  "Vadodara": [22.3072, 73.1812],
  "Indore": [22.7196, 75.8577],
  "Bhopal": [23.2599, 77.4126],
  "Agra": [27.1767, 78.0081],
  "Amritsar": [31.6340, 74.8723],
  "Shimla": [31.1048, 77.1734],
  "Jalandhar": [31.3260, 75.5762]
};
  // Populate Dropdowns
  const citySelect1 = document.getElementById("city1");
  const citySelect2 = document.getElementById("city2");
  Object.keys(cityCoordinates).forEach(city => {
    citySelect1.innerHTML += `<option value="${city}">${city}</option>`;
    citySelect2.innerHTML += `<option value="${city}">${city}</option>`;
  });
  