const API_BASE_URL = 'http://localhost:3000/api/products';

let currentCategory = null; // Keep track of the currently shown category

// Function to fetch products from backend
async function fetchProductsByCategory(category) {
  try {
    console.log(`Fetching products for category: ${category}`);
    const response = await fetch(`${API_BASE_URL}/category/${category}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    console.log(`Received ${products.length} products:`, products);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Function to display products
async function showProducts(category) {
  const container = document.getElementById('product-container');

  // Toggle category (click same category again = hide)
  if (currentCategory === category) {
    container.innerHTML = '';
    currentCategory = null;
    return;
  }

  currentCategory = category;

  // Loading state
  container.innerHTML = `
    <div class="col-span-full text-center py-10 text-[#FF8C42] text-lg font-semibold animate-pulse">
      Loading products...
    </div>
  `;

  try {
    const products = await fetchProductsByCategory(category);
    container.innerHTML = '';

    if (!products || products.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-10 text-[#FF8C42] font-medium">
          No products found in this category.
        </div>
      `;
      return;
    }

    // Display product cards
    products.forEach(product => {
      const productCard = `
        <div class="bg-gradient-to-b from-[#FFE5D4] to-[#FFDAB9] rounded-3xl shadow-lg p-5 transition-all hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-[#FF8C42]/60 flex flex-col justify-between">
          
          <div class="h-48 w-full mb-3 rounded-2xl overflow-hidden relative group">
            <img src="${product.image || 'https://via.placeholder.com/150'}"
                 alt="${product.name}"
                 class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-[#FF8C42]/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>

          <h3 class="font-semibold text-lg text-[#FF8C42] mb-1 truncate">${product.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${product.description || ''}</p>

          ${product.brand ? `<p class="text-xs text-gray-500 mb-2 italic">Brand: ${product.brand}</p>` : ''}

          <div class="flex items-center justify-between mb-3">
            <span class="text-[#FF8C42] font-bold text-lg">₹${product.price}</span>
            ${product.rating ? `<span class="text-yellow-500 text-sm font-medium">⭐ ${product.rating}</span>` : ''}
          </div>

          ${product.amount ? `<p class="text-xs text-gray-500 mb-2">In Stock: ${product.amount}</p>` : ''}

          <button onclick="addToCart('${product._id}')"
            class="mt-auto bg-[#FF8C42] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#FFCBA4] hover:text-[#FF8C42] transition-colors duration-300 w-full">
            🛒 Add to Cart
          </button>
        </div>
      `;
      container.innerHTML += productCard;
    });
  } catch (error) {
    container.innerHTML = `
      <div class="col-span-full text-center py-10">
        <p class="text-red-600 mb-2 font-semibold">Failed to fetch products</p>
        <p class="text-sm text-gray-600">${error.message}</p>
        <button onclick="showProducts('${category}')"
          class="mt-4 bg-[#FF8C42] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#FFCBA4] hover:text-[#FF8C42] transition-colors duration-300">
          Try Again
        </button>
      </div>
    `;
  }
}

// Placeholder for add-to-cart functionality
function addToCart(productId) {
  console.log('Adding product to cart:', productId);
  alert('🧺 Product added to cart! (Implement cart functionality)');
}

// Export globally
window.showProducts = showProducts;
window.addToCart = addToCart;

export default showProducts;
