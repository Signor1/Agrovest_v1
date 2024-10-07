export type CartItem = {
  id: number;
  name: string;
  priceInEth: number;
  quantity: number;
  image: string;
  total: number;
};

export const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Cassava",
    priceInEth: 0.02,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/ezptdsphjxnsbt9yhivf.jpg",
    total: 0.02 * 1, // 0.02 ETH
  },
  {
    id: 2,
    name: "Coco Yam",
    priceInEth: 0.03,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/o5vkkoec30vmkitttaw3.jpg",
    total: 0.03 * 1, // 0.03 ETH
  },
  {
    id: 4,
    name: "Plantain",
    priceInEth: 0.025,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/qya5lp1njplhtuzaugbl.jpg",
    total: 0.025 * 1, // 0.025 ETH
  },
  {
    id: 6,
    name: "Palm Oil",
    priceInEth: 0.04,
    quantity: 1,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010653/jx8pbz3o1yaoo8ulamrf.jpg",
    total: 0.04 * 1, // 0.04 ETH
  },
];
