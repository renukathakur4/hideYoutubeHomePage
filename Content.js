// Create the overlay
const overlay = document.createElement('div');
overlay.id = 'youtube-overlay';
document.body.appendChild(overlay);

// Hide the overlay if on a video page
function hideOverlayOnVideoPage() {
  const isVideoPage = location.href.includes('/watch?v=');
  if (isVideoPage) {
    overlay.remove();  // Remove the overlay if the user is watching a video
  }
}

// Hide the recommended videos (YouTube homepage)
function hideRecommendedVideos() {
  const recommendedSection = document.getElementById('contents'); // YouTube's recommended section
  const isHomepage = location.pathname === '/' || location.pathname === '/feed/trending';
  
  if (recommendedSection && isHomepage) {
    recommendedSection.style.display = 'none';
  }
}

// Listen for URL changes (to detect a new search or navigation)
function monitorUrlChanges() {
  let lastUrl = location.href;

  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;

      // If the user has navigated away from the homepage (e.g., performed a search or opened a video), remove the overlay
      if (currentUrl.includes('results') || currentUrl.includes('/watch?v=')) {
        overlay.remove();
      }
    }
  }).observe(document.body, { subtree: true, childList: true });
}

// Initialize the extension on page load
hideRecommendedVideos();
monitorUrlChanges();
hideOverlayOnVideoPage();

// Hide recommended videos on navigation changes (for SPA behavior on YouTube)
const observer = new MutationObserver(hideRecommendedVideos);
observer.observe(document.body, { childList: true, subtree: true });
