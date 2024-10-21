export type FarmType = {
  farm_id: number;
  business_name: string;
  business_image: string;
  business_location: string;
  business_contact: number;
  business_email: string;
  farmerAddress: `0x${string}`;
  isRegistered: boolean;
};

export type ProductType = {
  quantity: number;
  product_name: string;
  product_image: string;
  product_description: string;
  product_price: number;
  product_owner: number;
  product_id: number;
  sold: boolean;
};

export type InvestmentType = {
  id: number;
  farmId: number;
  image: string;
  name: string;
  about: string;
  owner: `0x${string}`;
  minAmount: number;
  amountRaised: number;
  startDate: number;
  endDate: number;
  farmInvestorCount: number;
};

export type InvestorsType = {
  id: number;
  farmID: number;
  investorAddress: `0x${string}`;
  amount: number;
};

export type ReviewType = {
  reviewer: `0x${string}`;
  review: string;
};
