export type ProductType = {
  name: string;
  priceInEth: number;
  image: string;
  description: string;
};

export const farmProducts: ProductType[] = [
  {
    name: "Cassava",
    priceInEth: 0.02,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/ezptdsphjxnsbt9yhivf.jpg",
    description:
      "A versatile root vegetable that is a staple food in many African countries. Used to make products like garri and fufu.",
  },
  {
    name: "Coco Yam",
    priceInEth: 0.03,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/o5vkkoec30vmkitttaw3.jpg",
    description:
      "A tuber crop that is widely consumed in Africa, especially in West Africa, often boiled, fried, or pounded into fufu.",
  },
  {
    name: "Maize",
    priceInEth: 0.015,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/thkmjd7yr5awsfjfcqw0.jpg",
    description:
      "A staple cereal grain that is used in various forms, including cornmeal, flour, and as a vegetable.",
  },
  {
    name: "Plantain",
    priceInEth: 0.025,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/qya5lp1njplhtuzaugbl.jpg",
    description:
      "A starchy banana variety that is commonly fried, boiled, or roasted in many African dishes.",
  },
  {
    name: "Groundnuts",
    priceInEth: 0.01,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/qur0mhjjoi6eja2plwwg.jpg",
    description:
      "Also known as peanuts, groundnuts are widely grown in Africa and used for making oil, snacks, and sauces.",
  },
  {
    name: "Palm Oil",
    priceInEth: 0.04,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010653/jx8pbz3o1yaoo8ulamrf.jpg",
    description:
      "A highly versatile oil extracted from the fruit of the oil palm, used in cooking and as an ingredient in various products.",
  },
];
