const products = [
   { id: 1, name: "iPhone", price: 2000 },
   { id: 2, name: "Samsung", price: 1500 },
   { id: 3, name: "Xiaomi", price: 1000 },
   { id: 4, name: "Oppo", price: 1200 },
];
const orders = [
   {
      id: 1,
      items: [
         { productId: 1, quantity: 2 },
         { productId: 2, quantity: 1 },
      ],
   },
   {
      id: 2,
      items: [
         { productId: 1, quantity: 1 },
         { productId: 3, quantity: 3 },
      ],
   },
   {
      id: 3,
      items: [
         { productId: 2, quantity: 2 },
         { productId: 4, quantity: 1 },
      ],
   },
];

const findMostRevenueProducts = (products) => {
   // tạo 1 object chứa quantity dựa vào id
   let quantityProductsbyId = {};

   for (const order of orders) {
      order.items.forEach((item) => {
         if (quantityProductsbyId[item.productId]) {
            quantityProductsbyId[item.productId] += item.quantity;
         } else {
            quantityProductsbyId[item.productId] = item.quantity;
         }
      });
   }

   console.log("Tổng quantity theo productId:", quantityProductsbyId);

   let maxRevenue = 0;
   let topProduct = null;

   products.forEach((product) => {
      const qty = quantityProductsbyId[product.id] || 0;
      const revenue = product.price * qty;

      console.log(`${product.name}: ${qty} cái x $${product.price} = $${revenue}`);
      // tìm max revenue product
      if (revenue > maxRevenue) {
         maxRevenue = revenue;
         topProduct = product;
      }
   });
   console.log(`Product có revenue cao nhất là ${topProduct.name}, với revenue là ${maxRevenue}`)
   return { product: topProduct, revenue: maxRevenue };
};

const result = findMostRevenueProducts(products);
console.log(result);
