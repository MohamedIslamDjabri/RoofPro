import { LocationInfo, LocationSlug, Project, Review, ServiceItem } from '@/types';

export const SITE_CONFIG = {
  name: "RoofPro USA",
  legalName: "RoofPro USA Inc.",
  tagline: "National Reach. Local Roofing Experts.",
  license: "Texas Roofing License #48192-TX",
  phone: "(800) 555-ROOF",
  phoneRaw: "8005557663",
  email: "hello@roofprousa.com",
  operatingHours: "Monday – Saturday: 7:00 AM – 7:00 PM | 24/7 Emergency Storm Dispatch",
  logoUrl: "https://lh3.googleusercontent.com/aida/AEtjO1WL58_WUH2UQLhazrp9VCQo0ggQ943F1jOu2WMg3zu-l8_MLj8xAuM7GTJM6j0gcMx3BkG2Xj8SMkporFraFiQjxr0qSEut885ed0f3LE9TT2UXceLwGP_PZkXZKzNiPQs2sQvieus0758T-yIaRWsawwAP8_qMft716xX0vwjhJSsGpkVyrfB3asL0YDUqhwQKVvJOF3XZq5oXmaQdfH0btBgXNLts4l0wobyyvVjfVWuxRlrMEd-CO4c",
  heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9kQi4mkcvSSDQWiDY_ipovRZiZqGhBt8xC0R4x8bJ5jxAH9CCEmeXZUhMGGIGPRuRpjpe_M023gDi26QfLskvhX14AGqoZgUUJ65DFKXYu21qUDze7v1MFISaS47KJV2US2m414C79INz169Zlr7UpLZpFHuEE8x7xUyMb2rSeBKCfcxWHyx_Ht4FE7fgOsYIWwLYdVNY1BANwr6ksYa_sZpYKEXov-YaPNap_ncen5fOZKkDGApd",
  caseStudyImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxiCUv4K5jROLcxzg45gdoimI-voVwuTU8oNgWdaUHHBFKvhva2ALCWu3VjfrWteSwwKSAcVOOTxiSqc-xNyWbGvPrG2X6RhxXVJ9sXcB-zkAHUYeMx47Jm27esFl-HicmFlK2b7vnICHptGxTjafJpNchCWUaggDJ6u55_QF6C4h2qHzHXJ-rpLIJ-mlGzvNjDx91fSAj91bjkcMeEoVCqgdJ5o0WE2tTS7Vv3VDf05oOIw6mQsqr"
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Projects", href: "/projects" },
  { label: "Reviews", href: "/reviews", badge: "4.9★" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const LOCATIONS: Record<LocationSlug, LocationInfo> = {
  dallas: {
    slug: "dallas",
    city: "Dallas",
    state: "TX",
    displayName: "Dallas-Fort Worth",
    regionalTag: "DFW REGIONAL HUB #1",
    phone: "(214) 555-0148",
    email: "dallas@roofprousa.com",
    address: "14241 Dallas Pkwy, Dallas, TX 75254",
    hours: "Mon-Sat: 7am - 7pm (24/7 Storm Response)",
    headline: "Serving Dallas & Collin, Denton, Tarrant Counties",
    heroDescription: "North Texas homeowners face severe hailstorms, high spring winds, and blistering summer heat. Our Dallas regional hub provides rapid 24-hour dispatch, drone thermal damage mapping, and expert insurance restoration across the Metroplex.",
    localSuburbsText: "Serving Dallas and nearby communities including Plano, Frisco, Irving, Garland, Richardson, McKinney, and Arlington.",
    nearbyAreas: ["Plano", "Frisco", "Irving", "Garland", "Richardson", "McKinney", "Arlington", "Carrollton", "Grand Prairie"],
    stats: {
      completedProjects: "3,450+ Homes",
      activeCrews: 8,
      rating: "4.9",
      reviewCount: 940
    },
    services: [
      "Roof Repair & Leak Detection",
      "Class 4 Hail Impact Shingle Reroof",
      "Storm & Wind Damage Insurance Restoration",
      "Attic Ventilation & Thermal Inspections",
      "24/7 Emergency Tarping Service"
    ],
    localAlert: "Active Hail Alert: Collin & Denton Counties",
    mapCoords: {
      lat: 32.9431,
      lng: -96.8222,
      zoom: 11
    },
    seoTitle: "Roofing Contractor in Dallas, TX | RoofPro USA",
    seoDescription: "Leading residential roofing contractor in Dallas-Fort Worth. Roof repair, replacement, hail damage insurance claims, and 24/7 emergency response. Call (214) 555-0148."
  },
  houston: {
    slug: "houston",
    city: "Houston",
    state: "TX",
    displayName: "Greater Houston",
    regionalTag: "GULF COAST REGIONAL HUB #2",
    phone: "(713) 555-0192",
    email: "houston@roofprousa.com",
    address: "2800 Post Oak Blvd, Houston, TX 77056",
    hours: "Mon-Sat: 7am - 7pm (24/7 Hurricane & Storm Response)",
    headline: "Serving Greater Houston & Gulf Coast Communities",
    heroDescription: "Houston roofing demands hurricane-strength wind ratings, mold-resistant algae barriers, and heavy tropical rain drainage. Our Houston hub brings certified 130 MPH wind-rated architectural roofing with factory-certified lifetime warranties.",
    localSuburbsText: "Serving Houston and surrounding metro communities including Katy, The Woodlands, Sugar Land, Pearland, Spring, and Cypress.",
    nearbyAreas: ["Katy", "Sugar Land", "Pearland", "The Woodlands", "Cypress", "Spring", "Pasadena", "League City", "Conroe"],
    stats: {
      completedProjects: "3,120+ Homes",
      activeCrews: 9,
      rating: "4.9",
      reviewCount: 880
    },
    services: [
      "Hurricane Wind-Resistant Roof Replacements",
      "Tropical Storm Emergency Tarping & Extraction",
      "Algae-Resistant Scotchgard Shingle Systems",
      "Commercial & Residential Leak Diagnosis",
      "Flashing & Valley Sealing Upgrades"
    ],
    localAlert: "High Humidity & Coastal Wind Advisories Active",
    mapCoords: {
      lat: 29.7402,
      lng: -95.4632,
      zoom: 11
    },
    seoTitle: "Roofing Contractor in Houston, TX | RoofPro USA",
    seoDescription: "Houston's premier roofing contractor. High-wind hurricane rated roof replacements, leak repairs, storm restoration. Licensed & insured. Call (713) 555-0192."
  },
  austin: {
    slug: "austin",
    city: "Austin",
    state: "TX",
    displayName: "Austin & Hills",
    regionalTag: "CENTRAL TEXAS REGIONAL HUB #3",
    phone: "(512) 555-0176",
    email: "austin@roofprousa.com",
    address: "111 Congress Ave, Austin, TX 78701",
    hours: "Mon-Sat: 7am - 7pm (24/7 Storm Response)",
    headline: "Serving Austin & Travis, Williamson Counties",
    heroDescription: "From modern standing-seam metal roofs in Central Austin to energy-efficient cool roofing in Round Rock and the Hill Country, RoofPro delivers top-tier craftsmanship tailored to Central Texas sun exposure and sudden storm fronts.",
    localSuburbsText: "Serving Austin and the Hill Country including Round Rock, Cedar Park, Buda, Kyle, Georgetown, and Lakeway.",
    nearbyAreas: ["Round Rock", "Cedar Park", "Pflugerville", "Georgetown", "Buda", "Kyle", "Lakeway", "Leander", "Bee Cave"],
    stats: {
      completedProjects: "2,180+ Homes",
      activeCrews: 6,
      rating: "4.9",
      reviewCount: 620
    },
    services: [
      "Standing Seam Metal Roofing & Accents",
      "Cool-Roof Energy Efficient Granule Shingles",
      "Hill Country Hail Repair & Insurance Claims",
      "Solar-Ready Roof Decking Reinforcement",
      "Attic Heat Dissipation & Ridge Venting"
    ],
    localAlert: "Seasonal UV Alert: Ask about Cool-Roof Rebates",
    mapCoords: {
      lat: 30.2642,
      lng: -97.7431,
      zoom: 11
    },
    seoTitle: "Roofing Contractor in Austin, TX | RoofPro USA",
    seoDescription: "Expert Austin roofing contractors for standing seam metal, architectural shingles, and storm repair. Round Rock, Cedar Park, Lakeway. Call (512) 555-0176."
  },
  "san-antonio": {
    slug: "san-antonio",
    city: "San Antonio",
    state: "TX",
    displayName: "San Antonio",
    regionalTag: "SOUTH TEXAS REGIONAL HUB #4",
    phone: "(210) 555-0134",
    email: "sanantonio@roofprousa.com",
    address: "300 Convent St, San Antonio, TX 78205",
    hours: "Mon-Sat: 7am - 7pm (24/7 Storm Response)",
    headline: "Serving San Antonio & Bexar, Comal Counties",
    heroDescription: "Preserving the architectural beauty of South Texas homes—from Spanish barrel clay tile repairs to durable architectural shingles that withstand Texas heat cycles and spring squalls. Master Elite certified roofing team.",
    localSuburbsText: "Serving San Antonio, Boerne, New Braunfels, Schertz, Cibolo, Alamo Heights, and surrounding South Texas cities.",
    nearbyAreas: ["Boerne", "Schertz", "Live Oak", "New Braunfels", "Converse", "Cibolo", "Alamo Heights", "Helotes", "Universal City"],
    stats: {
      completedProjects: "1,890+ Homes",
      activeCrews: 5,
      rating: "4.9",
      reviewCount: 490
    },
    services: [
      "Spanish Clay & Concrete Tile Restoration",
      "Architectural Shingle Replacement",
      "Chimney & Valley Waterproof Flashing",
      "South Texas Extreme Heat Decking Upgrades",
      "Insurance Claim Storm Damage Inspections"
    ],
    localAlert: "Local Dispatch Crews Available in Bexar & Comal",
    mapCoords: {
      lat: 29.4285,
      lng: -98.4928,
      zoom: 11
    },
    seoTitle: "Roofing Contractor in San Antonio, TX | RoofPro USA",
    seoDescription: "Top-rated San Antonio roofing company. Tile roof repairs, architectural reroofing, hail claims in Boerne, New Braunfels, Alamo Heights. Call (210) 555-0134."
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: "roof-repair",
    title: "Roof Repair & Leak Stopping",
    slug: "roof-repair",
    shortDesc: "Targeted fixes for chimney leaks, damaged pipe flashing collars, broken shingles, and soffit ventilation gaps. Rapid local dispatch within 24 hours.",
    fullDesc: "Water intrusion causes structural rot, drywall staining, and toxic mold growth within 48 hours. Our licensed repair technicians pinpoint the exact vulnerability—whether cracked flashing, missing shingles from high winds, or dried rubber pipe boots—and execute durable, code-compliant repairs backed by a 2-year leak-free warranty.",
    icon: "home_repair_service",
    priceStarting: "From $299",
    warrantyInfo: "2-Year Workmanship Guarantee",
    features: [
      "Precision infrared leak detection",
      "Pipe boot and flashing collar replacement",
      "Wind-blown shingle replacement and color matching",
      "Chimney cricket and valley waterproof flashing repair",
      "Attic moisture inspection and ventilation balancing"
    ],
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "roof-replacement",
    title: "Roof Replacement & Reroof",
    slug: "roof-replacement",
    shortDesc: "Full tear-off and installation featuring lifetime architectural shingles, Class 4 impact resistance, synthetic underlayment, and ridge ventilation upgrades.",
    fullDesc: "When a roof reaches 18–25 years or has sustained irreparable storm deterioration, a complete engineered replacement restores full structural protection and enhances your home's curb appeal and energy efficiency. We install premium multilayer architectural systems from GAF, Owens Corning, and CertainTeed with transferable 50-year non-prorated warranties.",
    icon: "roofing",
    priceStarting: "50-Yr Warranty",
    warrantyInfo: "Lifetime Material & Workmanship",
    features: [
      "Complete clean tear-off down to original wood decking",
      "Damaged plywood replacement and code-standard re-nailing",
      "Ice & water shield membranes in all critical valleys",
      "Heavy-duty synthetic breathable deck underlayment",
      "High-definition ridge caps with Cobra continuous ventilation",
      "$0 down flexible financing with low monthly payments"
    ],
    image: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "storm-damage",
    title: "Storm & Hail Damage Restoration",
    slug: "storm-damage",
    shortDesc: "Fast hail impact assessment, granular loss analysis, emergency weather tarping, and complete insurance claim handling with zero out-of-pocket surprise.",
    fullDesc: "Texas leads the nation in destructive hailstorms and severe thunderstorms. RoofPro USA provides licensed public adjuster collaboration, Xactimate digital estimating, and direct insurance carrier representation to guarantee your roof replacement is approved at fair replacement value, covering only your deductible.",
    icon: "thunderstorm",
    priceStarting: "Direct Claim Filing",
    warrantyInfo: "Insurance Approved Lifetime Systems",
    features: [
      "4K drone aerial hail impact photographic mapping",
      "Granule loss and hidden shingle fracture diagnosis",
      "Same-day emergency tarping to safeguard home contents",
      "On-site adjuster walkthrough with RoofPro field managers",
      "Zero out-of-pocket costs beyond your insurance deductible"
    ],
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "roof-inspection",
    title: "Roof Inspection & Drone Scans",
    slug: "services#inspection",
    shortDesc: "21-point comprehensive physical attic inspection coupled with 4K drone photography to uncover hidden decking rot, loose fasteners, and storm bruising.",
    fullDesc: "Don't wait for water to drip through your ceiling. Our certified Texas inspectors conduct a rigorous 21-point structural assessment, including attic rafters, insulation thermal moisture readings, roof penetrations, gutters, and high-altitude drone captures.",
    icon: "radar",
    priceStarting: "100% Free Initial",
    warrantyInfo: "Complimentary Certified Report",
    features: [
      "Attic moisture and thermal camera inspection",
      "Drone high-resolution 4K shingle surface photography",
      "Gutter gradient and fascia board integrity check",
      "Comprehensive digital PDF report with annotated photos",
      "Accurate estimated remaining service life calculation"
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "emergency-tarping",
    title: "24/7 Emergency Tarping",
    slug: "services#emergency",
    shortDesc: "Immediate response for active interior water intrusion, structural punctures from fallen oak limbs, and torn membrane barriers during severe weather.",
    fullDesc: "When disaster strikes in the middle of the night or during a heavy Texas squall, our rapid response emergency units arrive on scene with industrial-grade waterproof tarps, heavy furring strips, and water-diversion equipment to secure your home instantly.",
    icon: "emergency",
    priceStarting: "2-Hr Target Arrival",
    warrantyInfo: "Weather-Tight Securing Guarantee",
    features: [
      "24/7 live operator dispatch across all 4 regional hubs",
      "Heavy-duty reinforced UV-resistant securing tarps",
      "Temporary branch removal and structural clearing",
      "Water diversion barriers to stop active ceiling collapse",
      "Direct claim documentation for your insurance provider"
    ],
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "specialty-roofing",
    title: "Residential Specialty Roofing",
    slug: "services#specialty",
    shortDesc: "Standing seam metal roofing accents, Spanish clay tile repairs, designer cedar shake substitutes, and energy-efficient cool-roof granule shingles.",
    fullDesc: "For Texas homeowners seeking architectural distinction and multi-generational durability, RoofPro crafts custom standing seam steel roofs, concrete and terracotta tile installations, and designer composite slate that elevate home aesthetics while cutting summer cooling bills.",
    icon: "shield",
    priceStarting: "Premium Finishes",
    warrantyInfo: "Up to 50+ Year System Warranties",
    features: [
      "24-gauge standing seam concealed fastener metal panels",
      "Spanish barrel clay and concrete interlocking tile systems",
      "Impact-resistant synthetic composite cedar shake",
      "Reflective cool-roof granules eligible for energy rebates",
      "Custom on-site architectural sheet metal fabrication"
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "project-dfw-1",
    title: "Dallas Residential Architectural Shingle Replacement",
    city: "Dallas",
    state: "TX",
    locationSlug: "dallas",
    service: "Roof Replacement",
    projectType: "Full Tear-Off & Architectural System",
    description: "Following severe 2.25-inch April hail in Preston Hollow, RoofPro completed a complete 4,800 sq ft reroof with GAF Timberline HDZ Class 4 shingles and Cobra Snow Country ridge vents in 48 hours.",
    image: SITE_CONFIG.caseStudyImage,
    imageAlt: "Dallas luxury home architectural shingle roof installation with immaculate step flashing",
    areaSqFt: "4,800 Sq Ft",
    completionTime: "2 Working Days",
    warranty: "50-Yr Lifetime",
    systemDetails: "GAF Timberline HDZ with Class 4 Impact Resistance & Cobra Snow Country Ridge Vents",
    featured: true
  },
  {
    id: "project-dfw-2",
    title: "Frisco Heritage Wind & Leak Restoration",
    city: "Frisco",
    state: "TX",
    locationSlug: "dallas",
    service: "Roof Repair",
    projectType: "Emergency Wind Repair & Flashing",
    description: "Repaired 60 mph gust damage on two-story brick residence in Frisco. Replaced torn hip shingles, replaced rusted valley flashing, and sealed chimney shoulders against interior moisture.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Frisco suburban home roof repair completed with matching shingles",
    areaSqFt: "3,200 Sq Ft",
    completionTime: "1 Day",
    warranty: "2-Yr Leak-Free",
    systemDetails: "Owens Corning Duration TrueDefinition with SureNail strip reinforcement",
    featured: false
  },
  {
    id: "project-houston-1",
    title: "The Woodlands High-Wind Hurricane Shield Reroof",
    city: "The Woodlands",
    state: "TX",
    locationSlug: "houston",
    service: "Roof Replacement",
    projectType: "130-MPH Hurricane Wind System",
    description: "Upgraded heavy wooded canopy residence to high-wind rated CertainTeed Landmark shingles with enhanced algae-resistant granules and peel-and-stick waterproof synthetic membrane.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "The Woodlands custom home newly installed roofing system surrounded by trees",
    areaSqFt: "5,400 Sq Ft",
    completionTime: "3 Working Days",
    warranty: "50-Yr Non-Prorated",
    systemDetails: "CertainTeed Landmark Pro Max Def Weathered Wood with WinterGuard Valley Protection",
    featured: true
  },
  {
    id: "project-houston-2",
    title: "Katy Storm Emergency Tarping & Claim Replacement",
    city: "Katy",
    state: "TX",
    locationSlug: "houston",
    service: "Storm Damage",
    projectType: "Insurance Hail Restoration",
    description: "Assisted homeowner with severe hail puncturing and water intrusion. Emergency tarped within 2 hours of call, handled insurance adjuster negotiations, and restored roof to 100% code compliance.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Katy Texas suburban residence with new roofing and seamless gutters",
    areaSqFt: "3,600 Sq Ft",
    completionTime: "2 Days",
    warranty: "Lifetime Workmanship",
    systemDetails: "GAF ArmorShield II Class 4 Impact Resistant Shingles",
    featured: false
  },
  {
    id: "project-austin-1",
    title: "Round Rock Modern Standing Seam Metal & Cool Shingle Hybrid",
    city: "Round Rock",
    state: "TX",
    locationSlug: "austin",
    service: "Roof Replacement",
    projectType: "Specialty Metal & Cool-Roof System",
    description: "Installed 24-gauge charcoal standing seam metal panels on front porch and lower gables with reflective cool-roof architectural shingles across the main roof decks.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern Austin home with combination standing seam metal and architectural shingles",
    areaSqFt: "4,100 Sq Ft",
    completionTime: "3 Days",
    warranty: "Lifetime Manufacturer + 10-Yr Workmanship",
    systemDetails: "Standing Seam 1.5” Mechanical Lock panels & Owens Corning Cool Roof Shingles",
    featured: true
  },
  {
    id: "project-austin-2",
    title: "Lakeway Hill Country Leak & Valley Flashing Overhaul",
    city: "Lakeway",
    state: "TX",
    locationSlug: "austin",
    service: "Roof Repair",
    projectType: "Flashing & Leak Repair",
    description: "Repaired chronic stone veneer step flashing leaks and replaced decomposed rubber plumbing collar boots on Lake Travis view residence.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Lakeway Texas residence with stone accents and pristine roof valley flashing",
    areaSqFt: "2,900 Sq Ft",
    completionTime: "1 Day",
    warranty: "3-Yr Leak-Free",
    systemDetails: "Custom heavy-gauge aluminum counter-flashing into limestone mortar joints",
    featured: false
  },
  {
    id: "project-sa-1",
    title: "Boerne Concrete Tile Repair & Underlayment Renewal",
    city: "Boerne",
    state: "TX",
    locationSlug: "san-antonio",
    service: "Roof Repair",
    projectType: "Tile Lift & Underlayment Reset",
    description: "Carefully lifted Spanish flat concrete tiles, replaced deteriorated 20-year organic felt with dual-layer modified bitumen underlayment, and re-laid tiles with stainless steel clips.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Boerne Texas home with restored tile roofing and courtyard styling",
    areaSqFt: "4,600 Sq Ft",
    completionTime: "4 Days",
    warranty: "25-Yr System Warranty",
    systemDetails: "Eagle Roofing Products Dual-Layer Underlayment System",
    featured: true
  },
  {
    id: "project-sa-2",
    title: "Alamo Heights Hail Restoration & Gutter System",
    city: "Alamo Heights",
    state: "TX",
    locationSlug: "san-antonio",
    service: "Storm Damage",
    projectType: "Complete Storm Restoration",
    description: "Full insurance claim replacement for historic Alamo Heights home damaged by baseball-sized hail. Installed Class 4 impact shingles and 6-inch seamless aluminum gutters with leaf guards.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Alamo Heights renovated historic home with fresh architectural shingles",
    areaSqFt: "3,850 Sq Ft",
    completionTime: "2 Days",
    warranty: "50-Yr Lifetime",
    systemDetails: "CertainTeed Landmark IR Shingles & Heavy Gauge Seamless Gutters",
    featured: false
  }
];

export const REVIEWS: Review[] = [
  {
    id: "review-dfw-1",
    name: "David M.",
    city: "Plano",
    state: "TX",
    locationSlug: "dallas",
    service: "Complete Architectural Reroof",
    rating: 5,
    text: "We had hail damage after the spring storms. The Dallas hub dispatched an inspector the same afternoon. Their drone scan found leaks we couldn't see from ground level. Total roof replacement was done quickly and professionally! Left the property spotless.",
    verified: true,
    date: "March 2025"
  },
  {
    id: "review-houston-1",
    name: "Elena R.",
    city: "Katy",
    state: "TX",
    locationSlug: "houston",
    service: "Storm Restoration & Claim",
    rating: 5,
    text: "Living on the Gulf coast, hurricane wind resistance is crucial. The Houston RoofPro team handled our insurance claim with zero stress, providing high-wind rated shingles and emergency tarping when we needed it.",
    verified: true,
    date: "April 2025"
  },
  {
    id: "review-austin-1",
    name: "Marcus T.",
    city: "Round Rock",
    state: "TX",
    locationSlug: "austin",
    service: "Flashing & Valley Repair",
    rating: 5,
    text: "Honest contractors are rare. RoofPro's inspector showed me the photos and told me honestly that I only needed minor valley flashing maintenance rather than a full replacement. Saved me thousands. Customer for life!",
    verified: true,
    date: "May 2025"
  },
  {
    id: "review-sa-1",
    name: "Carlos & Maria G.",
    city: "Boerne",
    state: "TX",
    locationSlug: "san-antonio",
    service: "Tile Roof Re-felting & Repair",
    rating: 5,
    text: "Our tile roof was leaking in two spots after 18 years. The San Antonio team carefully lifted the tiles, replaced the rotten underlayment, and re-laid every tile without breaking a single piece. Exceptional craftsmanship.",
    verified: true,
    date: "February 2025"
  },
  {
    id: "review-dfw-2",
    name: "Jennifer K.",
    city: "Frisco",
    state: "TX",
    locationSlug: "dallas",
    service: "Hail Damage Insurance Claim",
    rating: 5,
    text: "RoofPro's project manager met my insurance adjuster in my driveway. Having a contractor who understands the exact Xactimate software guidelines made the difference between a partial patch and a 100% full replacement approval.",
    verified: true,
    date: "May 2025"
  },
  {
    id: "review-houston-2",
    name: "Robert S.",
    city: "Sugar Land",
    state: "TX",
    locationSlug: "houston",
    service: "Architectural Shingle Replacement",
    rating: 5,
    text: "Huge 5,000 sq ft roof completed in 2 days. The magnet sweeps caught all nails, the crew was polite, and the new charcoal shingles look fantastic. Their 50-year warranty gives our family total peace of mind.",
    verified: true,
    date: "June 2025"
  },
  {
    id: "review-austin-2",
    name: "Sarah W.",
    city: "Cedar Park",
    state: "TX",
    locationSlug: "austin",
    service: "Emergency Leak Repair",
    rating: 5,
    text: "Water was dripping through our master bedroom ceiling during a Sunday night downpour. RoofPro had an emergency crew out in under 90 minutes. They tarped the leak, diagnosed the cracked pipe collar, and repaired it permanently the next day.",
    verified: true,
    date: "April 2025"
  },
  {
    id: "review-sa-2",
    name: "Gregory L.",
    city: "San Antonio",
    state: "TX",
    locationSlug: "san-antonio",
    service: "Roof Inspection & Maintenance",
    rating: 5,
    text: "The drone inspection video was eye-opening. Detailed breakdown of shingle wear, clear honest pricing, and zero sales pressure. RoofPro is the gold standard in San Antonio.",
    verified: true,
    date: "July 2025"
  }
];

export const COMPANY_STATS = [
  {
    label: "Statewide Presence",
    value: "4 Major Hubs",
    desc: "Dallas, Houston, Austin & San Antonio dedicated offices"
  },
  {
    label: "Proven Track Record",
    value: "10,000+",
    desc: "Roofing projects completed with architectural systems"
  },
  {
    label: "Weather Expertise",
    value: "15+ Years",
    desc: "Texas hail, hurricane & extreme heat mitigation specialists"
  },
  {
    label: "Homeowner Trust",
    value: "4.9 / 5.0",
    desc: "Over 2,800 verified homeowner reviews across Texas",
    icon: "star"
  }
];

export const VALUE_PROPS = [
  {
    title: "Lifetime Warranty",
    desc: "Non-prorated workmanship",
    icon: "verified_user"
  },
  {
    title: "$0 Down Financing",
    desc: "Plans from 0% APR available",
    icon: "payments"
  },
  {
    title: "Insurance Specialists",
    desc: "Xactimate certified estimates",
    icon: "receipt_long"
  },
  {
    title: "Drone Aerial Scans",
    desc: "High-res damage mapping",
    icon: "flight"
  }
];

export const FAQS = [
  {
    q: "How fast can RoofPro inspect my roof after a Texas storm?",
    a: "We maintain dedicated local hubs in Dallas, Houston, Austin, and San Antonio with on-call drone teams. In most cases, we provide same-day or 24-hour inspections following major weather events."
  },
  {
    q: "Will RoofPro meet my insurance adjuster on-site?",
    a: "Yes! Having an experienced, certified roofing manager present during the adjuster's inspection ensures all hail impacts, ridge damage, drip edge dents, and gutter trauma are thoroughly documented."
  },
  {
    q: "How long does a typical residential roof replacement take?",
    a: "Most single-family homes (2,500 to 4,500 sq ft) are stripped and completed in 1 to 2 working days. We utilize full magnetic sweeps to collect every loose nail before departure."
  },
  {
    q: "What warranties do you provide on new roof installations?",
    a: "Because we are Master Elite certified, our installations come with up to 50-year non-prorated manufacturer system warranties and a comprehensive RoofPro workmanship warranty."
  },
  {
    q: "Do you offer financing options?",
    a: "Yes. We offer multiple convenient financing options including 0% APR promotional periods and low-monthly payment plans with $0 down."
  }
];
