const getProducts = async () => {
   const response = await fetch("https://fakestoreapi.com/products");
   const productData = await response.json();
   return productData;
};


const renderProducts = async () => {
   const products = await getProducts();
   const productsElement = document.querySelector(".products");

   const html = products
      .map((product) => {
         return `
            <div class="product-card">
               <img src="${product.image}" alt="${product.title}" />
               <h2>${product.title}</h2>
               <p class="product-price">$${product.price}</p>
            </div>
         `;
      })
      .join("");

   productsElement.innerHTML = html;
};

renderProducts();
