(function () {
  "use strict";

  var ICONS = {
    home:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/></svg>',
    garage:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2.7-2.7 2.5-2.5z"/></svg>',
    shop:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.25 10.5V6a3.75 3.75 0 1 1 7.5 0v4.5"/><path d="M6.66 8.25h10.68a1 1 0 0 1 .996.9l1.07 10.65a1.6 1.6 0 0 1-1.592 1.76H6.186a1.6 1.6 0 0 1-1.592-1.76l1.07-10.65a1 1 0 0 1 .996-.9Z"/></svg>',
    academy:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8 9-4 9 4-9 4-9-4Z"/><path d="M7 10.4V15c0 1.4 2.2 2.6 5 2.6s5-1.2 5-2.6v-4.6"/><path d="M20 8v6"/></svg>',
    marketplace:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.3 3.3H5.6A2.3 2.3 0 0 0 3.3 5.6v3.7c0 .6.24 1.2.67 1.63l8.4 8.4a1.9 1.9 0 0 0 2.7 0l4.3-4.3a1.9 1.9 0 0 0 0-2.7l-8.4-8.4a2.3 2.3 0 0 0-1.63-.67Z"/><path d="M7 7.5h.01"/></svg>'
  };

  window.DIRTSHACK_ECOSYSTEM_PORTALS = [
    {
      id: "brand",
      label: "Home",
      shortLabel: "Home",
      icon: ICONS.home,
      description: "Main brand portal",
      url: "https://dirtshack.in",
      hostnames: ["dirtshack.in", "www.dirtshack.in"]
    },
    {
      id: "garage",
      label: "Garage",
      shortLabel: "Garage",
      icon: ICONS.garage,
      description: "Service, Repair, DIY & Consultation",
      url: "https://garage.dirtshack.in",
      hostnames: ["garage.dirtshack.in"]
    },
    {
      id: "shop",
      label: "Shop",
      shortLabel: "Shop",
      icon: ICONS.shop,
      description: "Parts, Accessories",
      url: "https://shop.dirtshack.in",
      hostnames: ["shop.dirtshack.in"]
    },
    {
      id: "academy",
      label: "Academy",
      shortLabel: "Academy",
      icon: ICONS.academy,
      description: "Training Courses",
      url: "https://academy.dirtshack.in",
      hostnames: ["academy.dirtshack.in"]
    },
    {
      id: "marketplace",
      label: "Marketplace",
      shortLabel: "Market",
      icon: ICONS.marketplace,
      description: "Buy & Sell Pre-Owned Parts and Gear",
      url: "https://market.dirtshack.in",
      hostnames: ["market.dirtshack.in"]
    }
  ];

  window.DIRTSHACK_ECOSYSTEM_META = {
    title: "DirtShack Ecosystem",
    subtitle: "Everything for India's Dirt Bike Community"
  };
})();
