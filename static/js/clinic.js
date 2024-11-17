

function toggleNavbar() {
  document.querySelector('.navbar-links').classList.toggle('active');
}

// Placeholder data for clinics
const clinics = [
  { name: 'Juba Health Clinic', address: '123 Main St, Juba', lat: 4.8517, lng: 31.5825 },
  { name: 'Unity Medical Center', address: '456 Unity Ave, Juba', lat: 4.8542, lng: 31.5934 },
  { name: 'Juba General Hospital', address: '789 General Rd, Juba', lat: 4.8485, lng: 31.6100 },
  { name: 'Kator Medical Clinic', address: '123 Kator Rd, Kator', lat: 4.8475, lng: 31.6030 },
  { name: 'Gudele Health Clinic', address: '456 Gudele Ave, Gudele', lat: 4.8432, lng: 31.6022 },
  { name: 'Munuki Medical Center', address: '789 Munuki Rd, Munuki', lat: 4.8578, lng: 31.6009 },
  { name: 'Hai Malakal Medical Clinic', address: '456 Malakal Rd, Malakal', lat: 4.8635, lng: 31.5992 },
  { name: 'Sherikat Health Clinic', address: '789 Sherikat Ave, Sherikat', lat: 4.8564, lng: 31.5905 },
  { name: 'Juba International Clinic', address: '123 International Rd, Juba', lat: 4.8543, lng: 31.5978 },
  { name: 'Rhino Medical Center', address: '456 Rhino Ave, Rhino', lat: 4.8592, lng: 31.6043 },
  { name: 'Mayo Health Clinic', address: '789 Mayo Rd, Mayo', lat: 4.8605, lng: 31.5969 },
  { name: 'Juba Polyclinic', address: '123 Poly St, Juba', lat: 4.8490, lng: 31.6003 },
  { name: 'Juba Modern Medical Clinic', address: '456 Modern Rd, Juba', lat: 4.8611, lng: 31.6025 },
  { name: 'Konyokonyo Medical Clinic', address: '789 Konyokonyo Rd, Konyokonyo', lat: 4.8547, lng: 31.5989 },
  { name: 'Munik South Clinic', address: '123 Munik Rd, Munik', lat: 4.8492, lng: 31.5947 },
  { name: 'Freedom Clinic', address: '456 Freedom Rd, Juba', lat: 4.8584, lng: 31.6035 },
  { name: 'River Nile Medical Clinic', address: '789 Nile Rd, Juba', lat: 4.8521, lng: 31.5979 },
  { name: 'Al Sabah Children’s Hospital', address: '123 Sabah Rd, Juba', lat: 4.8558, lng: 31.6033 },
  { name: 'Bakweto Health Clinic', address: '456 Bakweto St, Bakweto', lat: 4.8468, lng: 31.5954 },
  { name: 'Hai Mauna Medical Center', address: '789 Mauna Rd, Mauna', lat: 4.8593, lng: 31.6122 },
  { name: 'Hai Referendum Clinic', address: '123 Referendum Rd, Referendum', lat: 4.8615, lng: 31.6005 },
  { name: 'Aweil Medical Clinic', address: '456 Aweil Ave, Aweil', lat: 4.8632, lng: 31.6020 },
  { name: 'Hai Cinema Clinic', address: '789 Cinema St, Hai Cinema', lat: 4.8645, lng: 31.6043 },
  { name: 'Kator Specialist Clinic', address: '123 Specialist St, Kator', lat: 4.8524, lng: 31.6101 },
  { name: 'Munuki Block A Clinic', address: '456 Block A Rd, Munuki', lat: 4.8537, lng: 31.6072 },
  { name: 'Juba West Clinic', address: '789 West Ave, Juba', lat: 4.8607, lng: 31.5939 },
  { name: 'Rubkona Health Center', address: '123 Rubkona Rd, Rubkona', lat: 4.8559, lng: 31.6045 },
  { name: 'Hai Game Clinic', address: '456 Game St, Juba', lat: 4.8503, lng: 31.6027 },
  { name: 'Bahr Clinic', address: '789 Bahr Ave, Bahr', lat: 4.8511, lng: 31.6090 },
  { name: 'Peace Health Clinic', address: '123 Peace St, Juba', lat: 4.8514, lng: 31.6049 },
  { name: 'Redemption Clinic', address: '456 Redemption Rd, Juba', lat: 4.8526, lng: 31.6070 },
  { name: 'Hai Jebel Clinic', address: '789 Jebel Rd, Hai Jebel', lat: 4.8538, lng: 31.5985 },
  { name: 'Medheal Healthcare Center', address: '123 Medheal Rd, Juba', lat: 4.8603, lng: 31.6017 },
  { name: 'Bahri Health Clinic', address: '456 Bahri Rd, Bahri', lat: 4.8576, lng: 31.5984 },
  { name: 'Hai Thoura Clinic', address: '789 Thoura Rd, Thoura', lat: 4.8594, lng: 31.6055 },
  { name: 'Safari Health Clinic', address: '123 Safari Rd, Juba', lat: 4.8608, lng: 31.6009 },
  { name: 'Gudele East Clinic', address: '456 Gudele East St, Gudele East', lat: 4.8523, lng: 31.6081 },
  { name: 'Hai Tarawa Medical Clinic', address: '789 Tarawa Rd, Hai Tarawa', lat: 4.8551, lng: 31.6021 },
  { name: 'Ivory Health Clinic', address: '123 Ivory St, Juba', lat: 4.8564, lng: 31.6100 },
  { name: 'Phoenix Medical Clinic', address: '456 Phoenix St, Juba', lat: 4.8521, lng: 31.6112 },
  { name: 'Freedom Health Clinic', address: '789 Freedom Rd, Juba', lat: 4.8542, lng: 31.6029 },
  { name: 'Luri Medical Center', address: '123 Luri Rd, Juba', lat: 4.8620, lng: 31.6024 },
  { name: 'Mangalat Health Clinic', address: '456 Mangalat St, Juba', lat: 4.8581, lng: 31.6095 },
  { name: 'Juba North Clinic', address: '789 North Rd, Juba', lat: 4.8497, lng: 31.6097 },
  { name: 'Hai Bilpam Clinic', address: '123 Bilpam St, Juba', lat: 4.8579, lng: 31.5977 },
  { name: 'Amarat Medical Center', address: '456 Amarat Ave, Juba', lat: 4.8582, lng: 31.6119 },
  { name: 'Rokon Health Clinic', address: '789 Rokon Rd, Rokon', lat: 4.8613, lng: 31.5968 },
  { name: 'Hai Salaam Clinic', address: '123 Salaam Rd, Juba', lat: 4.8609, lng: 31.5989 },
  { name: 'Malakia Medical Center', address: '456 Malakia St, Juba', lat: 4.8530, lng: 31.6108 },
  { name: 'Greenfield Health Clinic', address: '789 Greenfield Ave, Juba', lat: 4.8516, lng: 31.6013 },
  // Add remaining clinics here...
];

// Initialize map
function initMap() {
  const defaultLocation = { lat: 4.8517, lng: 31.5825 }; // Center of Juba
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: defaultLocation
  });

  // Add marker for each clinic
  clinics.forEach(clinic => {
    const marker = new google.maps.Marker({
      position: { lat: clinic.lat, lng: clinic.lng },
      map: map,
      title: clinic.name
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h4>${clinic.name}</h4><p>${clinic.address}</p>`
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });
}

// Handle clinic search form submission
const clinicForm = document.getElementById('clinicForm');
const clinicList = document.getElementById('clinicList');

clinicForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const location = document.getElementById('location').value.toLowerCase();

  // Clear previous results
  clinicList.innerHTML = '';

  // Filter clinics based on user location input
  const filteredClinics = clinics.filter(clinic => clinic.address.toLowerCase().includes(location));

  // Display filtered clinic information with clickable Google Maps link
  if (filteredClinics.length > 0) {
    filteredClinics.forEach(clinic => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = `${clinic.name} - ${clinic.address}`;
      link.href = `https://www.google.com/maps/search/?api=1&query=${clinic.lat},${clinic.lng}`;
      link.target = "_blank";  // Open in a new tab
      li.appendChild(link);
      clinicList.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'No clinics found for this location.';
    clinicList.appendChild(li);
  }
});

// Load the Google Maps script dynamically with your API key
function loadGoogleMaps() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAYYfFab9QsbDCbla4ge5zWN_JsNbnYo8U&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

// Load the map when the page loads
window.onload = loadGoogleMaps;
