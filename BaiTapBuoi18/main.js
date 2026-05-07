// ----------------------- Bài 1-----------------------------
// const student = {
//    name: "hoang",
//    parent: {
//       name: "bo hoang",
//    },
// };

// const mentor = { ...student };

// mentor.name = "bang";
// mentor.parent.name = "bo bang";

// console.log(student);
// console.log(mentor);

// Câu hỏi:

// student.name có bị đổi không? -> không vì mentor là 1 object riêng với reference khác

// student.parent.name có bị đổi không? -> có

// Giải thích vì sao? vì spread chỉ shallow copy

// ----------------------- Bài 2-----------------------------
const student = {
   name: "hoang",
   parent: {
      name: "bo hoang",
   },
};

const mentor = JSON.parse(JSON.stringify(student));

mentor.parent.name = "bo bang";

console.log(student);
console.log(mentor);

// Câu hỏi:

// student.parent.name có bị ảnh hưởng không? Không vì mentor đã được deep copy với tất cả key có reference riêng biệt

// Vì sao cách này khác spread (const mentor = { ...student })  -> vì kết hợp JSON.parse + JSON.stringify sẽ tạo ra được deep copy

// ----------------------- Bài 3-----------------------------

const students = [{ name: "a" }, { name: "b" }];

const newStudents = [...students];

newStudents[0].name = "z";

console.log(students);
console.log(newStudents);

// Câu hỏi:

// Mảng có bị thay đổi không? Không vì là 2 mảng riêng biệt, chỉ copy reference của các phần tử con qua spread operator

// Phần tử bên trong có bị không?  Có. Mỗi phần tử là object — spread chỉ copy reference của từng phần tử, students[0] và newStudents[0] vẫn trỏ về cùng 1 object.

// ----------------------- Bài 4-----------------------------

const user = {
   name: "hoang",
   address: {
      city: "HN",
      location: {
         lat: 123,
      },
   },
};

const newUser = { ...user };

newUser.address.location.lat = 999;

console.log(user.address.location.lat);

// Câu hỏi: Kết quả là bao nhiêu? Vì sao? -> 999 vì newUser ko được deep copy nên nó trỏ về cùng 1 địa chỉ
