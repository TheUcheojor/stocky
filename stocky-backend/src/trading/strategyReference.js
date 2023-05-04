import LongShort from "./strategies/long-short.js";
import MeanReversion from "./strategies/mean-reversion.js";

const STRATEGIES = {
  LONG_SHORT: {
    key: "LONG_SHORT",
    name: "Long Short",
    strategyClass: LongShort,
  },
  MEAN_REVERSION: {
    key: "MEAN_REVERSION",
    name: "Mean Reverison",
    strategyClass: MeanReversion,
  },
};

export default STRATEGIES;
