function toggleNavbar() {
    document.querySelector('.navbar-links').classList.toggle('active');
}

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const diseaseCards = document.querySelectorAll('.disease');

    // Function to filter diseases based on the search input
    function filterDiseases() {
        const searchTerm = searchInput.value.toLowerCase(); // Convert search input to lowercase

        diseaseCards.forEach(card => {
            const diseaseName = card.querySelector('h3').textContent.toLowerCase(); // Convert disease name to lowercase
            if (diseaseName.includes(searchTerm)) {
                card.style.display = 'block'; // Show matching disease card
            } else {
                card.style.display = 'none'; // Hide non-matching disease cards
            }
        });
    }

    // Event listener for the search button
    searchButton.addEventListener('click', filterDiseases);

    // Allow filtering by pressing "Enter" key
    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            filterDiseases();
        }
    });
});