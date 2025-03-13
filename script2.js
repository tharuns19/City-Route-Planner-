// Import city graph and coordinates
const cityGraph = {
  "Mumbai": { "Pune": 149, "Ahmedabad": 523, "Surat": 284 },
  "Pune": { "Mumbai": 149, "Hyderabad": 548, "Bangalore": 842 },
  "Ahmedabad": { "Mumbai": 523, "Surat": 267, "Jaipur": 648, "Vadodara": 112 },
  "Hyderabad": { "Pune": 548, "Bangalore": 576, "Chennai": 626, "Nagpur": 501 },
  "Jaipur": { "Ahmedabad": 648, "Delhi": 281, "Lucknow": 531 },
  "Delhi": { "Jaipur": 281, "Lucknow": 558, "Agra": 233, "Chandigarh": 243 },
  "Bangalore": { "Pune": 842, "Hyderabad": 576, "Chennai": 347, "Mysore": 144 },
  "Chennai": { "Bangalore": 347, "Hyderabad": 626, "Pondicherry": 162 },
  "Kolkata": { "Ranchi": 403, "Bhubaneswar": 441, "Patna": 581 },
  "Surat": { "Mumbai": 284, "Ahmedabad": 267, "Vadodara": 153 },
  "Nagpur": { "Hyderabad": 501, "Bhopal": 352, "Raipur": 287 },
  "Lucknow": { "Jaipur": 531, "Delhi": 558, "Patna": 506 },
  "Chandigarh": { "Delhi": 243, "Amritsar": 226, "Shimla": 112 },
  "Mysore": { "Bangalore": 144, "Coimbatore": 369 },
  "Coimbatore": { "Mysore": 369, "Chennai": 495 },
  "Patna": { "Lucknow": 506, "Ranchi": 333, "Kolkata": 581 },
  "Bhubaneswar": { "Kolkata": 441, "Visakhapatnam": 444 },
  "Ranchi": { "Patna": 333, "Kolkata": 403, "Raipur": 342 },
  "Raipur": { "Nagpur": 287, "Ranchi": 342, "Bhubaneswar": 417 },
  "Vadodara": { "Ahmedabad": 112, "Surat": 153, "Indore": 340 },
  "Indore": { "Vadodara": 340, "Bhopal": 191 },
  "Bhopal": { "Indore": 191, "Nagpur": 352 },
  "Agra": { "Delhi": 233, "Lucknow": 334 },
  "Amritsar": { "Chandigarh": 226, "Jalandhar": 82 },
  "Shimla": { "Chandigarh": 112 }
};

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

// Dijkstra's Algorithm
/*const dijkstra = (graph, start) => {
  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));

  for (const city of unvisited) {
    distances[city] = Infinity;
    previous[city] = null;
  }
  distances[start] = 0;

  while (unvisited.size) {
    let currentCity = [...unvisited].reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );
    unvisited.delete(currentCity);

    for (const [neighbor, distance] of Object.entries(graph[currentCity] || {})) {
      if (unvisited.has(neighbor)) {
        const newDist = distances[currentCity] + distance;
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = currentCity;
        }
      }
    }
  }

  return { distances, previous };
};*/

class MinHeap {
  constructor() {
    this.heap = [];
  }

  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  leftChildIndex(index) {
    return 2 * index + 1;
  }

  rightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  insert(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0 && this.heap[index].priority < this.heap[this.parentIndex(index)].priority) {
      this.swap(index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  heapifyDown() {
    let index = 0;
    while (this.leftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.leftChildIndex(index);
      if (
        this.rightChildIndex(index) < this.heap.length &&
        this.heap[this.rightChildIndex(index)].priority < this.heap[smallerChildIndex].priority
      ) {
        smallerChildIndex = this.rightChildIndex(index);
      }

      if (this.heap[index].priority <= this.heap[smallerChildIndex].priority) break;

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const dijkstra = (graph, start) => {
  const distances = {};
  const previous = {};
  const pq = new MinHeap();

  // Initialize distances and priority queue
  for (const city in graph) {
    distances[city] = Infinity;
    previous[city] = null;
  }
  distances[start] = 0;
  pq.insert({ element: start, priority: 0 });

  while (!pq.isEmpty()) {
    const { element: currentCity } = pq.extractMin();

    for (const [neighbor, distance] of Object.entries(graph[currentCity] || {})) {
      const newDist = distances[currentCity] + distance;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = currentCity;
        pq.insert({ element: neighbor, priority: newDist });
      }
    }
  }

  return { distances, previous };
};




// URL Params
const urlParams = new URLSearchParams(window.location.search);
const city1 = urlParams.get("city1");
const city2 = urlParams.get("city2");

if (city1 && city2 && city1 !== city2) {
  if (cityGraph[city1] && cityGraph[city2]) {
    const { distances, previous } = dijkstra(cityGraph, city1);

    // Path reconstruction
    const path = [];
    let current = city2;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    const distance = distances[city2];
    const intermediateCities = path.slice(1, -1);

    // Display Results
    document.getElementById("result").innerHTML = `
      <p>The total distance between <b>${city1}</b> and <b>${city2}</b> is <b>${distance} km</b>.</p>
      <br>
      <br>
      <p>Path is as follows:
      <br>
      <b>${city1} →</b> <b>${intermediateCities.length > 0 ? intermediateCities.join(" → ") : "None"}</b> → <b>${city2}</b></p>
    `;

    // MAP REPRESENTATION
    const map = L.map("map").setView(cityCoordinates[city1], 6);

    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom : 18
    }).addTo(map);

   
    const latlngs = path.map(city => cityCoordinates[city]);
    latlngs.forEach((coords, index) => {
      if (!coords) {
        console.error(`Coordinates missing for ${path[index]}`);
      }
    });

    
    const polyline = L.polyline(latlngs, {
      color: "blue",
      weight: 4,
      opacity: 0.7,
    }).addTo(map);

    
path.forEach((city, index) => {
  const marker = L.marker(cityCoordinates[city]).addTo(map);

  
  marker.bindPopup(`<b>${city}</b>${index === 0 ? " (Start)" : index === path.length - 1 ? " (End)" : ""}`);

  
  marker.on('mouseover', function (e) {
    const tooltip = L.tooltip({
      permanent: false,
      direction: 'top',
      offset: [0, -10]
    }).setContent(`<b>${city}</b>`);
    
    marker.bindTooltip(tooltip).openTooltip();
  });

  
  marker.on('mouseout', function (e) {
    marker.closeTooltip();
  });
});


   
    map.fitBounds(polyline.getBounds());
  } else {
    document.getElementById("result").textContent = "One or both selected cities are not in the database.";
  }
} else {
  document.getElementById("result").textContent ="Invalid city selection. Please select two different cities.";
  document.getElementById("map").textContent ="Invalid city selection.";
}

setTimeout(() => {
  map.invalidateSize();
}, 0);
