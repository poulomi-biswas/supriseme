function generateSearchLinks({ category, hint, budget }) {
  const keywords = `${hint} ${category} ${budget}`.trim().replace(/\s+/g, "+");

  const links = [
    { name: "Flipkart", url: `https://www.flipkart.com/search?q=${keywords}`, icon: "🛒", note: "Flipkart search" },
    { name: "Amazon", url: `https://www.amazon.in/s?k=${keywords}`, icon: "📦", note: "Amazon search" },
    { name: "Myntra", url: `https://www.google.com/search?q=site:myntra.com+${keywords}`, icon: "👗", note: "Myntra via Google" },
    { name: "Urbanic", url: `https://www.google.com/search?q=site:urbanic.com+${keywords}`, icon: "✨", note: "Urbanic via Google" },
    { name: "Ajio", url: `https://www.google.com/search?q=site:ajio.com+${keywords}`, icon: "👖", note: "Ajio via Google" },
    { name: "Nykaa", url: `https://www.google.com/search?q=site:nykaa.com+${keywords}`, icon: "💄", note: "Nykaa via Google" },
    { name: "Meesho", url: `https://www.google.com/search?q=site:meesho.com+${keywords}`, icon: "🛍️", note: "Meesho via Google" }
  ];

  const container = document.getElementById("shoppingLinks");
  container.innerHTML = "<h3>🛍 View Suggestions On:</h3>";

  links.forEach(({ name, url, icon, note }) => {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "shop-link";
    a.title = note;
    a.innerText = `${icon} ${name}`;
    container.appendChild(a);
  });
}

// Handle scroll-based fade-in
function enableScrollAnimations() {
  const fadeInElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeInElements.forEach(el => observer.observe(el));
}

window.addEventListener("DOMContentLoaded", () => {
  enableScrollAnimations();

  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get("data");

  if (!encodedData) {
    document.getElementById("wishlistInfo").innerHTML = "<p>Invalid link</p>";
    return;
  }

  let decoded;
  try {
    decoded = JSON.parse(decodeURIComponent(encodedData));
  } catch (err) {
    console.error("Error decoding wishlist data:", err);
    document.getElementById("wishlistInfo").innerHTML = "<p>❌ Could not decode surprise details.</p>";
    return;
  }

  // Populate wishlist info
  document.getElementById("wishlistInfo").innerHTML = `
    <h2>🎉 Category: ${decoded.category}</h2>
    <p><strong>Hint:</strong> ${decoded.hint || "No hint"}</p>
    <p><strong>Budget:</strong> ${decoded.budget || "Not specified"}</p>
    <p><strong>Note:</strong> ${decoded.note || "No note"}</p>
  `;

  // Fill preview modal content
  document.getElementById("modalContent").innerHTML = `
    <p><strong>Category:</strong> ${decoded.category}</p>
    <p><strong>Hint:</strong> ${decoded.hint || "None"}</p>
    <p><strong>Budget:</strong> ${decoded.budget || "None"}</p>
    <p><strong>Note:</strong> ${decoded.note || "None"}</p>
  `;

  // Attach modal open/close logic
  document.getElementById("openModalBtn").addEventListener("click", () => {
    document.getElementById("previewModal").classList.add("active");
  });

  document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("previewModal").classList.remove("active");
  });

  // Placeholder for suggestions
  document.getElementById("suggestions").innerHTML = `
    <h3>💡 Suggestions coming soon...</h3>
    <p>We’ll show curated <strong>${decoded.category.toLowerCase()}</strong> picks from top sites.</p>
  `;

  generateSearchLinks(decoded);

  // Filter logic placeholder
  document.getElementById("priceFilter").addEventListener("change", (e) => {
    const value = e.target.value;
    alert(`Filter selected: ${value} — implement logic here.`);
  });
});
