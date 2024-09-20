type NavLink = {
  name: string;
  href: string;
};

export const navLinks: NavLink[] = [
  {
    name: "Market Place",
    href: "/marketplace",
  },
  {
    name: "Investment",
    href: "/investment",
  },
  {
    name: "Explore",
    href: "/explore",
  },
];

export const navDashboardLinks: NavLink[] = [
  {
    name: "Dashboard",
    href: "/user",
  },
  {
    name: "Market Place",
    href: "/user/marketplace",
  },
  {
    name: "Portfolio",
    href: "/user/portfolio",
  },
  {
    name: "Explore",
    href: "/user/explore",
  },
  {
    name: "Governance",
    href: "/user/governance",
  },
  {
    name: "Transactions",
    href: "/user/transactions",
  },
];
