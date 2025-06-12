// assets/js/wishlist.js

const params = new URLSearchParams(window.location.search);
const data = JSON.parse(decodeURIComponent(params.get("data")));

document.getElementById("wishlistInfo").innerHTML = `
  <p><strong>Category:</strong> ${data.category}</p>
  <p><strong>Hint:</strong> ${data.hint}</p>
  <p><strong>Budget:</strong> ${data.budget}</p>
  <p><strong>Note:</strong> ${data.note || "No note."}</p>
`;

const products = [
  { name: "Red Summer Dress", price: "₹999", site: "Myntra", link: "#" },
  { name: "Elegant Red Gown", price: "₹1999", site: "Flipkart", link: "#" },
  { name: "Trendy Red Kurti", price: "₹599", site: "Amazon", link: "#" },
];

const suggestionDiv = document.getElementById("suggestions");
products.forEach(p => {
  suggestionDiv.innerHTML += `
    <div class="product">
      <p><strong>${p.name}</strong></p>
      <p>${p.price} - ${p.site}</p>
      <a href="${p.link}" target="_blank">View</a>
    </div>
  `;
});
