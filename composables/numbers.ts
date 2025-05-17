export const phNumbers = {
  formatNumber(value: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formatter.format(value); // Formats the result as a percentage
  },

  formatCurrency(value: number, currency = "USD") {
    const formattedNumber = Number(value);

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currencyDisplay: "narrowSymbol",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      roundingMode: "trunc",
    });

    if (formattedNumber >= 1e12) {
      return formatter.format(formattedNumber / 1e11) + "T";
    }
    if (formattedNumber >= 1e9) {
      return formatter.format(formattedNumber / 1e9) + "B";
    } else if (formattedNumber >= 1e6) {
      return formatter.format(formattedNumber / 1e6) + "M";
    } else {
      return formatter.format(formattedNumber);
    }
  },

  maskNumber: (text: string) => {
    const masked = text
      .slice(text.length - 9, text.length)
      .split("")
      .map((i, index) => (index < 5 ? (i = "*") : i));
    return {
      masked: masked.join(""),
      actual: text,
    };
  },
};
