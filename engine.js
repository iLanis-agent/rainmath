/* RainMath engine - honest rainwater harvesting math. Pure functions, no DOM. */
var RainEngine = (function () {
  var GAL_PER_SQFT_INCH = 0.623; /* one inch of rain on one square foot */
  var FIRST_FLUSH_PER_SQFT = 0.01; /* divert about 10 gal per 1000 sqft of roof */

  function r2(x) { return Math.round(x * 100) / 100; }
  function r1(x) { return Math.round(x * 10) / 10; }

  /* gross gallons from one rain event on a roof */
  function gallonsFromRain(roofSqft, inches) {
    return r1(roofSqft * inches * GAL_PER_SQFT_INCH);
  }
  /* real capture after losses (gutters, splash, first flush) */
  function capturedGallons(roofSqft, inches, effPct) {
    return r1(roofSqft * inches * GAL_PER_SQFT_INCH * effPct / 100);
  }
  function efficiencyVerdict(effPct) {
    if (effPct >= 90) return 'optimistic - 90%+ assumes clean gutters, smooth roof and no splash loss';
    if (effPct >= 75) return 'honest - 75-90% is where a well-kept catchment actually lands';
    return 'conservative - under 75% you are leaving water on the table; check gutters and screens';
  }
  /* how much rain you need to capture a target amount */
  function rainNeededInches(gallons, roofSqft, effPct) {
    var per = GAL_PER_SQFT_INCH * roofSqft * effPct / 100;
    if (per <= 0) return null;
    return r2(gallons / per);
  }

  /* demand side */
  function gardenWeeklyGallons(gardenSqft, inchesPerWeek) {
    return r1(gardenSqft * inchesPerWeek * GAL_PER_SQFT_INCH);
  }
  function daysOfSupply(tankGallons, dailyUseGallons) {
    if (dailyUseGallons <= 0) return null;
    return Math.floor(tankGallons / dailyUseGallons);
  }
  function tankForDrySpell(dailyUseGallons, dryDays) {
    return Math.ceil(dailyUseGallons * dryDays);
  }
  function tankVerdict(tankGallons, dailyUseGallons, dryDays) {
    var need = tankForDrySpell(dailyUseGallons, dryDays);
    if (tankGallons >= need) return 'covered - ' + tankGallons + ' gal against a ' + need + ' gal dry-spell need';
    if (tankGallons >= need * 0.6) return 'tight - ' + tankGallons + ' gal covers most of a ' + need + ' gal dry spell; ration in the back half';
    return 'short - ' + tankGallons + ' gal against a ' + need + ' gal dry-spell need; you will run dry';
  }
  /* how many rain events to fill a tank */
  function eventsToFill(tankGallons, perEventGallons) {
    if (perEventGallons <= 0) return null;
    return Math.ceil(tankGallons / perEventGallons);
  }
  function firstFlushGallons(roofSqft) {
    return r1(roofSqft * FIRST_FLUSH_PER_SQFT);
  }

  return {
    GAL_PER_SQFT_INCH: GAL_PER_SQFT_INCH,
    gallonsFromRain: gallonsFromRain, capturedGallons: capturedGallons,
    efficiencyVerdict: efficiencyVerdict, rainNeededInches: rainNeededInches,
    gardenWeeklyGallons: gardenWeeklyGallons, daysOfSupply: daysOfSupply,
    tankForDrySpell: tankForDrySpell, tankVerdict: tankVerdict,
    eventsToFill: eventsToFill, firstFlushGallons: firstFlushGallons
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = RainEngine;
