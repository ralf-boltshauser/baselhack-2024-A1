export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
  }).format(amount);
};

export const formatYear = (year: number) => {
  return `${year} year${year > 1 ? "s" : ""}`;
};

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("fr-CH");
};
