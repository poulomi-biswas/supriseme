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

// assets/js/particles.js
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particlesArray;

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];

  const numParticles = 40;
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 182, 193, 0.7)";
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    // bounce logic
    if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
    if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", initParticles);
initParticles();
animateParticles();

