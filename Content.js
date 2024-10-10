// Create the overlay
const overlay = document.createElement('div');
overlay.id = 'youtube-overlay';
document.body.appendChild(overlay);

// Hide the recommended videos (YouTube homepage)
function hideRecommendedVideos() {
  const recommendedSection = document.getElementById('contents'); // YouTube's recommended section
  if (recommendedSection) {
    recommendedSection.style.display = 'none';
  }
}

// Listen for URL changes (to detect a new search)
function monitorUrlChanges() {
  let lastUrl = location.href;

  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      // If the user has navigated away from the homepage (performed a search), remove the overlay
      if (currentUrl.includes('results')) {
        overlay.remove();
      }
    }
  }).observe(document.body, { subtree: true, childList: true });
}

// Initialize the extension on page load
hideRecommendedVideos();
monitorUrlChanges();

// Hide recommended videos on navigation changes (for SPA behavior on YouTube)
const observer = new MutationObserver(hideRecommendedVideos);
observer.observe(document.body, { childList: true, subtree: true });
