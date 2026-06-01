const employees = [
   { id: 1, name: "Alice", age: 23, status: "working" },
   { id: 3, name: "Bob", age: 25, status: "working" },
   { id: 6, name: "John", age: 27, status: "working" },
   { id: 8, name: "David", age: 23, status: "quit_job" },
   { id: 10, name: "Eve", age: 20, status: "working" },
];

const products = [
   { id: 1, name: "Phone", price: 1200 },
   { id: 2, name: "Laptop", price: 3000 },
   { id: 3, name: "Tab", price: 2000 },
   { id: 4, name: "PC", price: 800 },
   { id: 5, name: "Monitor", price: 1500 },
];

const orders = [
   { id: 1, employeeId: 1, productId: 4, quantity: 1 },
   { id: 2, employeeId: 3, productId: 2, quantity: 4 },
   { id: 3, employeeId: 1, productId: 5, quantity: 3 },
   { id: 4, employeeId: 6, productId: 1, quantity: 2 },
   { id: 5, employeeId: 3, productId: 5, quantity: 3 },
   { id: 6, employeeId: 8, productId: 1, quantity: 1 },
   { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];

/*
Yeu cau viet ham
lam dung 80%
comment code: bang tieng anh (neu co comment)
ten bien: tuan thu quy tac
toi uu 20%
toc do
code (ham dung chung thi viet chung)chung


Bai: 1
Lay ra ds nhan vien dang lam viec

Bai 2:
Lay ra nhan vien lon tuoi nhat
Bai 3:
Lay ra san phan gia re nhat
Bai 4:
Tìm ra sản phẩm bán chạy nhất ( bán nhiều nhất về mặt số lượng )
Bai 5:
Tim ra san phan doanh thu cao nhat ( nhiều tiền nhất )
Bai 6:
Tim ra nhan vien ban nhieu hang nhat
Bai 7:
Tim ra nhan vien co doanh thu cao nhat
Bai 8:
Tim ra san pham ban co doanh thu nhat cua moi nhan vien


Bai 9:
Gia su nhan vien se nhan duoc hoa hong la 3%
-> tim hoa hong cho moi nhan vien


Bai 10:
Sap xep nhan vien theo thu tu giam dan theo doanh thu
* */

// Sort by attribute function helper
const sortArrByAttribute = (array, attribute) => {
   return [...array].sort((a, b) => a[attribute] - b[attribute]);
};

// Bài 1: Lấy tên employee vẫn đang làm việc

// loop each
const getEmployeeLists = (employees) => {
   employees.forEach((employee) => {
      if (employee.status !== "quit_job") console.log(employee.name);
   });
};

const getWorkingEmployees = (employees) => {
   workingEmployees = employees.filter((employee) => employee.status === "working");
   return workingEmployees
};

console.log("Kết quả bài 1:");
console.log(getWorkingEmployees(employees));

// -------------------------------------------------

// Bai 2: Lay ra nhan vien lon tuoi nhat
// const sortEmployeesByAge = function (employees) {
//    return [...employees].sort((a, b) => a.age - b.age);
// };

// console.log(sortEmployeesByAge(employees));

const getOldestEmployee = () => {
   console.log(sortArrByAttribute(employees, "age")[employees.length - 1]);
   return;
};
console.log("Kết quả bài 2:");
getOldestEmployee();

// ----------------------------------------------
// Bai 3: Lay ra san phan gia re nhat
const getCheapestProduct = () => {
   console.log(sortArrByAttribute(products, "price")[0]);
   return;
};
console.log("Kết quả bài 3:");
getCheapestProduct(products);

// ----------------------------------------------
// Bai 4: Tìm ra sản phẩm bán chạy nhất ( bán nhiều nhất về mặt số lượng )
const soldProductsByQuantity = (orders) => {
   // create object to store quantity
   const soldProductByQuantity = {};

   orders.forEach((order) => {
      if (soldProductByQuantity[order.productId]) {
         soldProductByQuantity[order.productId] += order.quantity;
      } else {
         soldProductByQuantity[order.productId] = order.quantity;
      }
   });

   // Convert { 4: 1, 2: 4, 5: 6, ... } to [ { productId: 4, quantity: 1 }, ... ]
   // console.log(Object.entries(soldProductByQuantity));
   const result = Object.entries(soldProductByQuantity).map(([productId, quantity]) => ({
      productId: Number(productId),
      quantity: quantity,
   }));
   return sortArrByAttribute(result, "quantity");
};

const findBestSellingProductsByQuantity = (orders) => {
   const sorted = soldProductsByQuantity(orders);
   const top = sorted[sorted.length - 1];
   console.log(
      `The most selling product is productId ${top.productId} with quantity ${top.quantity}`,
   );
   return top;
};
console.log("Kết quả bài 4:");
findBestSellingProductsByQuantity(orders);

// ----------------------------------------------
// Bai 5: Tim ra san phan doanh thu cao nhat ( nhiều tiền nhất )
const getProductRevenue = (soldProducts, products) => {
   return soldProducts.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      return {
         ...item, // copy productId & quantity
         price: product.price,
         revenue: item.quantity * product.price,
         name: product.name,
      };
   });
};

const findMostRevenueProducts = () => {
   const soldArr = soldProductsByQuantity(orders);
   const revenueArr = getProductRevenue(soldArr, products);
   return sortArrByAttribute(revenueArr, "revenue")[revenueArr.length - 1];
};

console.log("Kết quả bài 5:");
console.log(findMostRevenueProducts());
// ----------------------------------------------

// bài 6: Tim ra nhan vien ban nhieu hang nhat
const soldQuantityByEmployee = (orders) => {
   const quantityByEmp = {};

   orders.forEach((order) => {
      if (quantityByEmp[order.employeeId]) {
         quantityByEmp[order.employeeId] += order.quantity;
      } else {
         quantityByEmp[order.employeeId] = order.quantity;
      }
   });

   return Object.entries(quantityByEmp).map(([employeeId, quantity]) => ({
      employeeId: Number(employeeId),
      quantity: quantity,
   }));
};

const findTopSellingEmployee = () => {
   const soldArr = soldQuantityByEmployee(orders);
   console.log(soldArr);

   // Join với employees để có name
   const enriched = soldArr.map((item) => {
      const emp = employees.find((e) => e.id === item.employeeId);
      return { ...item, name: emp.name };
   });

   return sortArrByAttribute(enriched, "quantity")[enriched.length - 1];
};

console.log("Kết quả bài 6:");
console.log(findTopSellingEmployee());
// ----------------------------------------------

// Bài 7: Tim ra nhan vien co doanh thu cao nhat
// Helper: trả về array revenue theo từng nhân viên
const getRevenueByEmployee = () => {
   // Tính revenue per order
   const revenuePerOrder = orders.map((order) => {
      const product = products.find((p) => p.id === order.productId);
      return {
         employeeId: order.employeeId,
         revenue: order.quantity * product.price,
      };
   });

   // Gom revenue theo employeeId
   const revenueByEmp = {};
   revenuePerOrder.forEach((item) => {
      if (revenueByEmp[item.employeeId]) {
         revenueByEmp[item.employeeId] += item.revenue;
      } else {
         revenueByEmp[item.employeeId] = item.revenue;
      }
   });

   // Convert + join với employees để có name
   return Object.entries(revenueByEmp).map(([employeeId, revenue]) => {
      const emp = employees.find((e) => e.id === Number(employeeId));
      return {
         employeeId: Number(employeeId),
         name: emp.name,
         revenue: revenue,
      };
   });
};

const findTopRevenueEmployee = () => {
   return sortArrByAttribute(getRevenueByEmployee(), "revenue").at(-1);
};

console.log("Kết quả bài 7:");
console.log(findTopRevenueEmployee());
// ----------------------------------------------

// Bai 8: Tim ra san pham ban co doanh thu nhat cua moi nhan vien
const findTopProductPerEmployee = () => {
   // Bước 1: gom revenue theo cặp [employeeId, productId]
   const revenueByEmpProduct = {};

   orders.forEach((order) => {
      const product = products.find((p) => p.id === order.productId);
      const revenue = order.quantity * product.price;

      // Khởi tạo object con nếu employeeId chưa tồn tại
      if (!revenueByEmpProduct[order.employeeId]) {
         revenueByEmpProduct[order.employeeId] = {};
      }

      // Cộng dồn vào key [employeeId][productId]
      if (revenueByEmpProduct[order.employeeId][order.productId]) {
         revenueByEmpProduct[order.employeeId][order.productId] += revenue;
      } else {
         revenueByEmpProduct[order.employeeId][order.productId] = revenue;
      }
   });

   // console.log(revenueByEmpProduct);

   // Bước 2: với mỗi employee, tìm productId có revenue cao nhất
   const result = Object.entries(revenueByEmpProduct).map(([employeeId, productsRevenue]) => {
      // Convert object con thành array để dùng sort helper
      const productArr = Object.entries(productsRevenue).map(([productId, revenue]) => ({
         productId: Number(productId),
         revenue: revenue,
      }));

      // Sort tăng dần, lấy phần tử cuối
      const topProduct = sortArrByAttribute(productArr, "revenue").at(-1);

      // Join để lấy tên nhân viên và tên sản phẩm
      const emp = employees.find((e) => e.id === Number(employeeId));
      const prod = products.find((p) => p.id === topProduct.productId);

      return {
         employeeId: Number(employeeId),
         employeeName: emp.name,
         topProductId: topProduct.productId,
         topProductName: prod.name,
         revenue: topProduct.revenue,
      };
   });

   return result;
};

console.log("Kết quả bài 8:");
console.log(findTopProductPerEmployee());

// ----------------------------------------------

// Bai 9: Gia su nhan vien se nhan duoc hoa hong la 3% -> tim hoa hong cho moi nhan vien

const calculateCommissions = (rate = 0.03) => {
   return getRevenueByEmployee().map((item) => ({
      ...item,
      commission: item.revenue * rate,
   }));
};

console.log("Kết quả bài 9:");
console.log(calculateCommissions());
// Bai 10: Sap xep nhan vien theo thu tu giam dan theo doanh thu

const sortEmployeesByRevenueDesc = () => {
   const sortedAsc = sortArrByAttribute(getRevenueByEmployee(), "revenue");
   return [...sortedAsc].reverse();
};
console.log("Kết quả bài 10:");
console.log(sortEmployeesByRevenueDesc());
