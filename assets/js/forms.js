// Show/hide custom amount input when "Custom" is selected



// Handle form submission
document.getElementById("wishlistForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = new FormData(e.target);
  let budgetValue = form.get("budget");

  // Use custom amount if selected
  if (budgetValue === "custom") {
    const customAmount = document.getElementById("customAmount").value;
    budgetValue = customAmount || "Not specified";
  }

  const data = {
    category: form.get("category"),
    hint: form.get("hint"),
    budget: budgetValue,
    note: form.get("note"),
  };

  const encoded = encodeURIComponent(JSON.stringify(data));
  const longUrl = `${window.location.origin}/wishlist.html?data=${encoded}`;
  console.log("Long URL before shortening:", longUrl);

  const output = document.getElementById("linkOutput");
  output.innerHTML = "Generating short link...";

  try {
    const response = await fetch(`https://api.tinyurl.com/create`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer Fd5koGBYQie0SE5PgXoVjGxfjJo6N1wIkNyfHNceIRH6EPpkISe8bUdgCMyT",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: longUrl,
        domain: "tinyurl.com"
      })
    });

    const result = await response.json();

    if (result.data && result.data.tiny_url) {
      output.innerHTML = `
        <p>Here’s your surprise link:</p>
        <a href="${result.data.tiny_url}" target="_blank">${result.data.tiny_url}</a>
      `;
    } else {
      output.innerHTML = "Something went wrong with TinyURL.";
      console.error(result);
    }

  } catch (err) {
    output.innerHTML = "Failed to generate link. Please try again.";
    console.error("TinyURL Error:", err);
  }
});
const budgetSelect = document.getElementById('budget');
const customAmountInput = document.getElementById('customAmount');

budgetSelect.addEventListener('change', function () {
  if (this.value === 'custom') {
    customAmountInput.style.display = 'block';
  } else {
    customAmountInput.style.display = 'none';
    customAmountInput.value = '';
  }
});