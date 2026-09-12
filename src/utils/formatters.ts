export function formatInr(amount: number): string {
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `₹ ${crores.toFixed(2)} Crore`;
  } else if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹ ${lakhs.toFixed(2)} Lakh`;
  } else {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
}

export function formatNumberInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(amount);
}
