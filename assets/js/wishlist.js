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
      name: "Amazon",
      url: `https://www.amazon.in/s?k=${keywords}`,
      icon: "📦",
      note: "Direct Amazon search"
    },
    {
      name: "Myntra",
      url: `https://www.google.com/search?q=site:myntra.com+${keywords}`,
      icon: "👗",
      note: "Google search on Myntra"
    },
    {
      name: "Urbanic",
      url: `https://www.google.com/search?q=site:urbanic.com+${keywords}`,
      icon: "✨",
      note: "Google search on Urbanic"
    },
    {
      name: "Ajio",
      url: `https://www.google.com/search?q=site:ajio.com+${keywords}`,
      icon: "👖",
      note: "Google search on Ajio"
    },
    {
      name: "Nykaa",
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

async function fetchAISuggestions({ category, hint, budget }) {
  try {
    const res = await fetch("https://supriseme-backend.onrender.com/api/suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category, hint, budget })
    });

    const data = await res.json();
    return data.suggestions;
  } catch (err) {
    console.error("Error fetching AI suggestions:", err);
    return "❌ AI failed to generate suggestions. Please try again later.";
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get("data");

  const infoDiv = document.getElementById("wishlistInfo");
  const suggestionsDiv = document.getElementById("suggestions");

  if (!encodedData) {
    infoDiv.innerHTML = "<p>Invalid link</p>";
    return;
  }

  let decoded;
  try {
    decoded = JSON.parse(decodeURIComponent(encodedData));

    // Show wishlist info
    infoDiv.innerHTML = `
      <h2>🎉 Surprise Category: ${decoded.category}</h2>
      <p><strong>Hint:</strong> ${decoded.hint || "No hint provided"}</p>
      <p><strong>Budget:</strong> ${decoded.budget || "Not specified"}</p>
      <p><strong>Note:</strong> ${decoded.note || "No note provided"}</p>
    `;

    generateSearchLinks(decoded);

    // Show loading while AI is generating
    suggestionsDiv.innerHTML = `<p>💡 Generating surprise ideas...</p>`;

    const aiText = await fetchAISuggestions(decoded);

    suggestionsDiv.innerHTML = `
      <h3>✨ AI-Powered Suggestions:</h3>
      <div class="ai-suggestions">${aiText.replace(/\n/g, "<br>")}</div>
    `;
  } catch (err) {
    console.error("Error decoding wishlist data:", err);
    infoDiv.innerHTML = "<p>❌ Could not decode surprise details.</p>";
    suggestionsDiv.innerHTML = "";
  }
});
