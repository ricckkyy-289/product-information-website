// Central Product Database shared across all pages
const products = [
  {
    id: "sw-pro",
    sku: "IS-SW100",
    name: "PulseTrack Smart Watch S1",
    category: "Electronics",
    price: "$199",
    color: "linear-gradient(135deg, #0f766e, #115e59)",
    summary: "AMOLED health & fitness smartwatch with dual-band GPS, 14-day battery endurance, and 5ATM swim-proof rating.",
    specs: {
      "Display": "1.43-inch AMOLED (466 x 466 px, 1000 nits)",
      "Battery Life": "Up to 14 days typical use / 36 hrs GPS active",
      "Water Resistance": "5 ATM (50 meters swim-proof)",
      "Sensors": "Optical Heart Rate, SpO2, Skin Temp, Barometer",
      "Compatibility": "Android 9.0+ and iOS 14.0+",
      "Weight": "38 g (without strap)"
    },
    inBox: [
      "PulseTrack Smart Watch S1",
      "Magnetic USB-C Charging Dock",
      "Fluoroelastomer Sport Strap",
      "Quick Start & Safety Manual"
    ]
  },
  {
    id: "cam-4k",
    sku: "IS-CM400",
    name: "VisionGuard 4K Security Camera",
    category: "Home & Lifestyle",
    price: "$129",
    color: "linear-gradient(135deg, #0369a1, #075985)",
    summary: "Weatherproof 4K UHD indoor/outdoor camera with color night vision, AI person detection, and local microSD recording.",
    specs: {
      "Resolution": "3840 x 2160 (4K UHD) at 30 fps",
      "Field of View": "135° Wide-Angle Glass Lens",
      "Night Vision": "Full-Color Spotlight + Infrared up to 30m",
      "Weather Rating": "IP66 Dust & Heavy Rain Proof",
      "Storage": "microSD up to 256 GB + Encrypted Cloud",
      "Power Input": "12V DC Adapter or PoE"
    },
    inBox: [
      "VisionGuard 4K Camera Unit",
      "Adjustable Wall Mount & Anchor Screws",
      "3m Weatherproof Power Cable",
      "Installation Guide & Window Decal"
    ]
  },
  {
    id: "hub-usb",
    sku: "IS-HB700",
    name: "ProDock 8-in-1 USB-C Workstation Hub",
    category: "Accessories",
    price: "$79",
    color: "linear-gradient(135deg, #334155, #1e293b)",
    summary: "CNC-machined aluminum USB-C adapter offering 100W Power Delivery, 4K 60Hz HDMI, Gigabit Ethernet, and 10Gbps USB ports.",
    specs: {
      "Video Output": "1x HDMI 2.0 (4K @ 60Hz HDR)",
      "Power Delivery": "Up to 100W USB-C Pass-Through Charging",
      "Data Ports": "2x USB-A 3.2 (10Gbps), 1x USB-C Data",
      "Card Readers": "SD 4.0 & microSD UHS-II Slots",
      "Ethernet": "RJ45 Gigabit Ethernet (1000 Mbps)",
      "Dimensions": "122 x 48 x 14 mm (95 g)"
    },
    inBox: [
      "ProDock 8-in-1 USB-C Hub",
      "Protective Velvet Travel Pouch",
      "24-Month Warranty Card"
    ]
  },
  {
    id: "purifier-air",
    sku: "IS-AP250",
    name: "PureBreeze H13 HEPA Air Purifier",
    category: "Home & Lifestyle",
    price: "$169",
    color: "linear-gradient(135deg, #047857, #065f46)",
    summary: "3-stage True HEPA filtration system capturing 99.97% of airborne allergens and PM2.5 particles in rooms up to 550 sq ft.",
    specs: {
      "Filtration": "Pre-Filter + True H13 HEPA + Activated Carbon",
      "Coverage Area": "Up to 550 sq ft (51 m²)",
      "Noise Level": "22 dB (Sleep Mode) – 48 dB (Turbo)",
      "Air Quality Sensor": "Real-time PM2.5 Laser Sensor with LED Ring",
      "Filter Lifespan": "6 – 8 Months (Replaceable Cartridge)",
      "Power Consumption": "35W Max (Energy Star Certified)"
    },
    inBox: [
      "PureBreeze Air Purifier",
      "Pre-installed H13 HEPA Filter Cartridge",
      "AC Power Cord",
      "User & Filter Maintenance Manual"
    ]
  }
];
