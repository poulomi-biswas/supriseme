
// Add this function at the top or just above DOMContentLoaded

function generateSearchLinks({ category, hint, budget }) {
  const keywords = `${category} ${hint}  ${category}  ${budget}`.replace(/\s+/g, "+");

  const links = {
    Flipkart: `https://www.flipkart.com/search?q=${keywords}`,
    Amazon: `https://www.amazon.in/s?k=${keywords}`,
    Myntra: `https://www.myntra.com/${keywords}`,
    Urbanic: `https://www.urbanic.com/search?q=${keywords}`,
    Ajio: `https://www.ajio.com/search/${keywords}`,
    TataCliq: `https://www.tatacliq.com/search/?text=${keywords}`,
    
  };

  const container = document.getElementById("shoppingLinks");
  container.innerHTML = "<h3>🛍 View Suggestions On:</h3>";

  for (const [site, url] of Object.entries(links)) {
    const button = document.createElement("a");
    button.href = url;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.className = "shop-link";
    button.innerText = site;
    container.appendChild(button);
  }
}
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get("data");

  if (!encodedData) {
    document.getElementById("wishlistInfo").innerHTML = "<p>Invalid link</p>";
    return;
  }
try{
  const decoded = JSON.parse(decodeURIComponent(encodedData));

  document.getElementById("wishlistInfo").innerHTML = `
    <h2>🎉 Surprise Category: ${decoded.category}</h2>
    <p><strong>Hint:</strong> ${decoded.hint || "No hint provided"}</p>
    <p><strong>Budget:</strong> ₹${decoded.budget || "Not specified"}</p>
    <p><strong>Note:</strong> ${decoded.note || "No note provided"}</p>
  `;
  generateSearchLinks(decoded);
}catch (err) {
    console.error("Error decoding wishlist data:", err);
    outputDiv.innerHTML = "<p>❌ Could not decode surprise details. Something went wrong.</p>";
  }

  // Placeholder: Add suggestions
  document.getElementById("suggestions").innerHTML = `
    <h3>🛍 Suggestions coming soon...</h3>
    <p>We’ll show ${decoded.category.toLowerCase()} from Flipkart/Myntra/etc.</p>
  `;
});
