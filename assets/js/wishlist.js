function generateSearchLinks({  hint, budget }) {
  const keywords = `${hint}  ${budget}`.trim().replace(/\s+/g, "+");

  const links = [
    {
      name: "Flipkart",
      url: `https://www.flipkart.com/search?q=${keywords}`,
      icon: "assets/icons/flipkart.svg",
      note: "Direct Flipkart search"
    },
    {
      name: "Amazon",
      url: `https://www.amazon.in/s?k=${keywords}`,
      icon: "assets/icons/social.png",
      note: "Direct Amazon search"
    },
    {
      name: "Myntra",
      url: `https://www.google.com/search?q=site:myntra.com+${keywords}`,
      icon: "assets/icons/myntra.jpg",
      note: "Google search on Myntra"
    },
    {
      name: "Urbanic",
      url: `https://www.google.com/search?q=site:urbanic.com+${keywords}`,
      icon: "assets/icons/ur.png",
      note: "Google search on Urbanic"
    },
    {
      name: "Ajio",
      url: `https://www.google.com/search?q=site:ajio.com+${keywords}`,
      icon: "assets/icons/ajio.png",
      note: "Google search on Ajio"
    },
    {
      name: "Nykaa",
      url: `https://www.google.com/search?q=site:nykaa.com+${keywords}`,
      icon: "assets/icons/unnamed.png",
      note: "Google search on Nykaa"
    },
    {
      name: "Meesho",
      url: `https://www.google.com/search?q=site:meesho.com+${keywords}`,
      icon: "assets/icons/meesho.png",
      note: "Google search on Meesho"
    }
  ];

  const container = document.getElementById("shoppingLinks");
  container.innerHTML = "<h3>🛍 View Suggestions On:</h3>";

links.forEach(({ name, url, icon, alt }) => {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.className = "shop-link";

  a.innerHTML = `
    <img src="${icon}" alt="${alt}" class="shop-logo" />
    ${name}
  `;

  container.appendChild(a);
});

}

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get("data");

  const infoDiv = document.getElementById("wishlistInfo");
  const suggestionsDiv = document.getElementById("suggestions");

  if (!encodedData) {
    infoDiv.innerHTML = "<p>Invalid link</p>";
    return;
  }

  try {
    const decoded = JSON.parse(decodeURIComponent(encodedData));

    infoDiv.innerHTML = `
      <h2> Surprise Category: ${decoded.category}</h2>
      <p><strong>Hint:</strong> ${decoded.hint || "No hint provided"}</p>
      <p><strong>Budget:</strong> ${decoded.budget || "Not specified"}</p>
      <p><strong>Note:</strong> ${decoded.note || "No note provided"}</p>
    `;

    generateSearchLinks(decoded);
    suggestionsDiv.innerHTML = "<p> AI suggestions not available at this moment.</p>";

  } catch (err) {
    console.error("Error decoding wishlist data:", err);
    infoDiv.innerHTML = "<p>❌ Could not decode surprise details.</p>";
    suggestionsDiv.innerHTML = "";
  }
});
