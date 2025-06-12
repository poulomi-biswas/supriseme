document.getElementById("wishlistForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = new FormData(e.target);
  const data = {
    category: form.get("category"),
    hint: form.get("hint"),
    budget: form.get("budget"),
    note: form.get("note"),
  };

  const encoded = encodeURIComponent(JSON.stringify(data));
  const longUrl = `${window.location.origin}/wishlist.html?data=${encoded}`;

  const output = document.getElementById("linkOutput");
  output.innerHTML = "Generating short link...";

  try {
    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `url=${encodeURIComponent(longUrl)}`
    });

    const text = await response.text();

    // Log full response for debugging
    console.log("Raw response:", text);

    const result = JSON.parse(text);

    if (result.result_url) {
      output.innerHTML = `
        <p>Here’s your surprise link:</p>
        <a href="${result.result_url}" target="_blank">${result.result_url}</a>
      `;
    } else {
      output.innerHTML = "Something went wrong. Couldn't shorten the link.";
    }
  } catch (error) {
    output.innerHTML = "Failed to generate link. Please try again.";
    console.error("Error shortening URL:", error);
  }
});
