window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get("data");

  if (!encodedData) {
    document.getElementById("wishlistInfo").innerHTML = "<p>Invalid link</p>";
    return;
  }

  const decoded = JSON.parse(decodeURIComponent(encodedData));

  document.getElementById("wishlistInfo").innerHTML = `
    <h2>🎉 Surprise Category: ${decoded.category}</h2>
    <p><strong>Hint:</strong> ${decoded.hint || "No hint provided"}</p>
    <p><strong>Budget:</strong> ₹${decoded.budget || "Not specified"}</p>
    <p><strong>Note:</strong> ${decoded.note || "No note provided"}</p>
  `;

  // Placeholder: Add suggestions
  document.getElementById("suggestions").innerHTML = `
    <h3>🛍 Suggestions coming soon...</h3>
    <p>We’ll show ${decoded.category.toLowerCase()} from Flipkart/Myntra/etc.</p>
  `;
});
