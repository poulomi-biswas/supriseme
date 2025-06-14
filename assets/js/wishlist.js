function generateSearchLinks({ category, hint, budget }) {
  const keywords = `${hint} ${category} ${budget}`.trim().replace(/\s+/g, "+");

  const links = [
    {
      name: "Flipkart",
      url: `https://www.flipkart.com/search?q=${keywords}`,
      icon: "🛒",
      note: "Direct Flipkart search"
    },
    {
      name: "Amazon ",
      url: `https://www.amazon.in/s?k=${keywords}`,
      icon: "📦",
      note: "Direct Amazon search"
    },
    {
      name: " Myntra ",
      url: `https://www.google.com/search?q=site:myntra.com+${keywords}`,
      icon: "👗",
      note: "Google search on Myntra"
    },
    {
      name: " Urbanic ",
      url: `https://www.google.com/search?q=site:urbanic.com+${keywords}`,
      icon: "✨",
      note: "Google search on Urbanic"
    },

    {
        name: " Ajio ",
        url: `https://www.google.com/search?q=site:ajio.com+${keywords}`,
        icon: "👖",
        note: "Google search on Ajio"
    },

    {
        name:" Nykaa",
        url: `https://www.google.com/search?q=site:nykaa.com+${keywords}`,
        icon: "💄",
        note: "Google search on Nykaa"
    },

    {
        name: "Meesho",
        url: `https://www.google.com/search?q=site:meesho.com+${keywords}`, 
        icon: "🛍️",
        note: "Google search on Meesho"
    }

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
    <p><strong>Budget:</strong> ${decoded.budget || "Not specified"}</p>
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
