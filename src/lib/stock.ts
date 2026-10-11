export type StockState = "in-stock" | "low-stock" | "sold-out";

const LOW_STOCK_THRESHOLD = 3;

export function getStockState(quantity: number): StockState {
  if (quantity <= 0) return "sold-out";
  if (quantity <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}

export function getStockLabel(quantity: number) {
  switch (getStockState(quantity)) {
    case "sold-out":
      return "Sold out";
    case "low-stock":
      return `Only ${quantity} left`;
    default:
      return "In stock";
  }
}
