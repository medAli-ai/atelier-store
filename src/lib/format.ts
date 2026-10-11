const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  trailingZeroDisplay: "stripIfInteger",
});

/** Formats a price held in US cents. */
export function formatPrice(cents: number) {
  return priceFormat.format(cents / 100);
}
