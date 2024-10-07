export type ProductType = {
  id: number;
  name: string;
  priceInEth: number;
  image: string;
  description: string;
};

export type FarmType = {
  farmName: string;
  fundsTarget: string;
  investors: number;
  amountRaised: string;
  balance: string;
  status: string;
};

export const farmProducts: ProductType[] = [
  {
    id: 1,
    name: "Cassava",
    priceInEth: 0.02,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/ezptdsphjxnsbt9yhivf.jpg",
    description:
      "A versatile root vegetable that is a staple food in many African countries. Used to make products like garri and fufu.",
  },
  {
    id: 2,
    name: "Coco Yam",
    priceInEth: 0.03,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/o5vkkoec30vmkitttaw3.jpg",
    description:
      "A tuber crop that is widely consumed in Africa, especially in West Africa, often boiled, fried, or pounded into fufu.",
  },
  {
    id: 3,
    name: "Maize",
    priceInEth: 0.015,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/thkmjd7yr5awsfjfcqw0.jpg",
    description:
      "A staple cereal grain that is used in various forms, including cornmeal, flour, and as a vegetable.",
  },
  {
    id: 4,
    name: "Plantain",
    priceInEth: 0.025,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/qya5lp1njplhtuzaugbl.jpg",
    description:
      "A starchy banana variety that is commonly fried, boiled, or roasted in many African dishes.",
  },
  {
    id: 5,
    name: "Groundnuts",
    priceInEth: 0.01,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010650/qur0mhjjoi6eja2plwwg.jpg",
    description:
      "Also known as peanuts, groundnuts are widely grown in Africa and used for making oil, snacks, and sauces.",
  },
  {
    id: 6,
    name: "Palm Oil",
    priceInEth: 0.04,
    image:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725010653/jx8pbz3o1yaoo8ulamrf.jpg",
    description:
      "A highly versatile oil extracted from the fruit of the oil palm, used in cooking and as an ingredient in various products.",
  },
];

export const farmInvestments: FarmType[] = [
  {
    farmName: "GreenField Farms",
    fundsTarget: "$10,000",
    investors: 35,
    amountRaised: "$8,500",
    balance: "$1,500",
    status: "Ongoing",
  },
  {
    farmName: "Harvest Hills",
    fundsTarget: "$15,000",
    investors: 50,
    amountRaised: "$12,000",
    balance: "$3,000",
    status: "Ongoing",
  },
  {
    farmName: "Sunrise Orchards",
    fundsTarget: "$8,000",
    investors: 20,
    amountRaised: "$8,000",
    balance: "$0",
    status: "Completed",
  },
  {
    farmName: "EcoGrow Farm",
    fundsTarget: "$25,000",
    investors: 60,
    amountRaised: "$20,000",
    balance: "$5,000",
    status: "Ongoing",
  },
  {
    farmName: "Green Acres",
    fundsTarget: "$5,000",
    investors: 15,
    amountRaised: "$4,500",
    balance: "$500",
    status: "Ongoing",
  },
  {
    farmName: "Harvest Valley",
    fundsTarget: "$18,000",
    investors: 40,
    amountRaised: "$14,000",
    balance: "$4,000",
    status: "Ongoing",
  },
  {
    farmName: "Bloom Farms",
    fundsTarget: "$12,000",
    investors: 25,
    amountRaised: "$12,000",
    balance: "$0",
    status: "Completed",
  },
  {
    farmName: "Clear Sky Farm",
    fundsTarget: "$20,000",
    investors: 45,
    amountRaised: "$18,000",
    balance: "$2,000",
    status: "Ongoing",
  },
  {
    farmName: "Golden Harvest",
    fundsTarget: "$30,000",
    investors: 80,
    amountRaised: "$25,000",
    balance: "$5,000",
    status: "Ongoing",
  },
  {
    farmName: "Silver Spring Farm",
    fundsTarget: "$7,000",
    investors: 12,
    amountRaised: "$7,000",
    balance: "$0",
    status: "Completed",
  },
];

export type FarmDataType = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  altText: string;
  address: string;
  phoneNumber: string;
  email: string;
  fundsTarget: string;
  amountRaised: string;
  investors: number;
  fundingDetails: {
    farmName: string;
    fundsTarget: string;
    investors: number;
    amountRaised: string;
    balance: string;
    status: string;
  }[];
};

export const farmData: FarmDataType[] = [
  {
    id: 1,
    name: "Ashers Fishery Farm",
    description:
      "A premium fishery farm offering investment opportunities in aquaculture, allowing investors to participate in the growing fish farming industry.",
    imageUrl:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725027529/hv0dkqebklrenv7aeoye.png",
    altText: "farm produce",
    address: "123 Riverbank Avenue, Lagos, Nigeria",
    phoneNumber: "+234 812 345 6789",
    email: "ashersfishery@example.com",
    fundsTarget: "$10,000",
    amountRaised: "$8,500",
    investors: 35,
    fundingDetails: [
      {
        farmName: "Ashers Fishery Farm",
        fundsTarget: "$10,000",
        investors: 35,
        amountRaised: "$8,500",
        balance: "$1,500",
        status: "Ongoing",
      },
    ],
  },
  {
    id: 2,
    name: "Butch Lane",
    description:
      "A promising investment venture focused on livestock farming, providing a chance for investors to support and benefit from sustainable meat production.",
    imageUrl:
      "https://res.cloudinary.com/dad1drjht/image/upload/v1725027532/wr1rkyiv3npb2gy0wjyl.png",
    altText: "farm produce",
    address: "456 Livestock Road, Abuja, Nigeria",
    phoneNumber: "+234 902 876 5432",
    email: "butchlane@example.com",
    fundsTarget: "$15,000",
    amountRaised: "$12,000",
    investors: 50,
    fundingDetails: [
      {
        farmName: "Butch Lane",
        fundsTarget: "$15,000",
        investors: 50,
        amountRaised: "$12,000",
        balance: "$3,000",
        status: "Ongoing",
      },
    ],
  },
];
