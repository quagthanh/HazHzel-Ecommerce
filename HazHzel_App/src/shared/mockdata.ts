// data.ts
import imgExam from "@/../public/assets/Boston_Clogs_in_Antique_White_test.jpg"; // Dùng ảnh tạm của bạn
import imgTest from "@/../public/assets/fortune_cardigan.webp";

export const MOCK_PRODUCTS = [
  {
    id: 1,
    brand: "OAS",
    name: "VISCOSE SHIRT - FLOWER SHOP",
    price: "3.582.000₫",
    image: imgExam,
  },
  {
    id: 2,
    brand: "OAS",
    name: "T-SHIRT - LAUREL",
    price: "2.502.000₫",
    image: imgTest,
  },
  {
    id: 3,
    brand: "OAS",
    name: "CUBA WAFFLE SHIRT - NEARLY BLACK",
    price: "4.122.000₫",
    image: imgExam,
  },
  {
    id: 4,
    brand: "OAS",
    name: "CUBA TERRY SHIRT - NIGHT",
    price: "3.582.000₫",
    image: imgTest,
  },
  {
    id: 5,
    brand: "OAS",
    name: "LINEN SHIRT - WHITE",
    price: "3.100.000₫",
    image: imgExam,
  }, // Sản phẩm thứ 5 để test nút View All
];

export const MOCK_SUGGESTIONS = [
  "denim shirt",
  "crochet shirt",
  "bodega canvas shirt",
  "shirt",
  "viscose shirt",
  "terry shirt",
  "cuba terry shirt",
  "cuba linen shirt",
];

export const MOCK_COLLECTIONS = [
  { id: 1, title: "Summer Shirts", count: 12 },
  { id: 2, title: "Linen Collection", count: 8 },
  { id: 3, title: "New Arrivals", count: 24 },
];
