const categories = {
  expense: [
    {
      name: "Food & Groceries",
      icon: "ShoppingCart",
      color: "#FF8FAB",
      type: "expense",
    },
    {
      name: "Transportation",
      icon: "DirectionsCar",
      color: "#3A86FF",
      type: "expense",
    },
    {
      name: "Utilities",
      icon: "Bolt",
      color: "#FFD166",
      type: "expense",
    },
    {
      name: "Rent",
      icon: "Home",
      color: "#EF476F",
      type: "expense",
    },
    {
      name: "Health",
      icon: "LocalHospital",
      color: "#06D6A0",
      type: "expense",
    },
    {
      name: "Entertainment",
      icon: "Movie",
      color: "#9B5DE5",
      type: "expense",
    },
    {
      name: "Dining Out",
      icon: "Restaurant",
      color: "#FB8500",
      type: "expense",
    },
    {
      name: "Subscriptions",
      icon: "Subscriptions",
      color: "#8338EC",
      type: "expense",
    },
    {
      name: "Travel",
      icon: "Flight",
      color: "#F15BB5",
      type: "expense",
    },
    {
      name: "Clothing",
      icon: "Checkroom",
      color: "#F4A261",
      type: "expense",
    },
    {
      name: "Gifts",
      icon: "CardGiftcard",
      color: "#FF006E",
      type: "expense",
    },
    {
      name: "Insurance",
      icon: "Shield",
      color: "#B5179E",
      type: "expense",
    },
    {
      name: "Other",
      icon: "MoreHoriz",
      color: "#D00000",
      type: "expense",
    },
  ],
  income: [
    {
      name: "Salary",
      icon: "AttachMoney",
      color: "#80FF72",
      type: "income",
    },
    {
      name: "Freelance",
      icon: "WorkOutline",
      color: "#72EFDD",
      type: "income",
    },
    {
      name: "Investments",
      icon: "TrendingUp",
      color: "#AACC00",
      type: "income",
    },
    {
      name: "Refunds",
      icon: "Replay",
      color: "#F72585",
      type: "income",
    },
    {
      name: "Rental Income",
      icon: "Business",
      color: "#FFBE0B",
      type: "income",
    },
  ],
};

export async function seedCategories(prisma) {
  const all = [...categories.expense, ...categories.income];

  for (const category of all) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log("🌿 Seeded categories");
}
