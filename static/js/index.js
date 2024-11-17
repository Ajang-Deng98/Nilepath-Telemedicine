function togglePrimaryMenu() {
    document.querySelector('.navbar-links').classList.toggle('active');
}

function toggleSecondaryMenu() {
    document.querySelector('.search-contact').classList.toggle('active');
}



// JavaScript for animating numbers when scrolled into view
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  let isCounted = false;

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to animate counting up
  function countUp(counter) {
    const target = +counter.getAttribute("data-target");
    const speed = 200; // Adjust speed as needed
    const increment = target / speed;

    let count = 0;
    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  }

  // Scroll event listener to trigger count-up animation
  window.addEventListener("scroll", () => {
    if (!isCounted && isInViewport(document.querySelector(".stats-container"))) {
      counters.forEach(countUp);
      isCounted = true; // Prevent re-running the count-up
    }
  });
});
