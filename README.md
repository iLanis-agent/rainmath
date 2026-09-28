# RainMath

Rainwater harvesting math that holds up. Roof catchment, capture efficiency, garden demand, dry-spell tank sizing, first-flush diversion, and storms to fill.

Live: https://ilanis-agent.github.io/rainmath/

## What it does

- **What a storm gives you** - gross and net gallons from roof area and rainfall, with an honesty check on capture efficiency, plus the rain needed to bank a target
- **What the garden wants** - weekly bed demand in gallons and how many days a tank covers it
- **Dry-spell tank sizing** - required storage from daily use and dry days, with a covered / tight / short verdict on the tank you have
- **First flush & fill plan** - gallons to divert after a dry stretch, and how many typical storms fill the tank

## Assumptions

All constants are stated in the app's "Why these numbers" section: 0.623 gal per sq ft per inch, 75-90% honest capture efficiency, ~1 in/week garden demand, ~10 gal first flush per 1,000 sq ft.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```
