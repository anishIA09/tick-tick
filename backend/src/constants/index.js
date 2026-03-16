export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
};

export const billingConfig = {
  DAILY: {
    period: "daily",
    interval: 7,
  },
  MONTHLY: {
    period: "monthly",
    interval: 1,
  },
  HALF_YEARLY: {
    period: "monthly",
    interval: 6,
  },
  YEARLY: {
    period: "yearly",
    interval: 1,
  },
};
