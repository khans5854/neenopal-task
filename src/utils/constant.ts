export const NODE_FONT_SIZES = {
  MIN: 12,
  MAX: 24,
};

export const DEFAULT_NODE_FONT_SIZE = 14;

export const DEFAULT_NODE_COLOR = "#000000";

export const DEFAULT_NODE_BG_COLOR = "#ffffff";

export const DEBOUNCE_DELAY = 300;

export const FORMAT_DATE = (date: Date) => {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
