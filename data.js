// Shared data across variants
window.SITE_DATA = {
  name: "Josh Chittick",
  role: "Senior Product Manager",
  company: "Built Technologies",
  location: "New York, NY",
  bio: "Senior PM at Built Technologies. UC Berkeley engineer. Reformed construction-disputes consultant.",

  about: {
    long: "I'm a Senior Product Manager at Built Technologies, where I lead Construction Financials, the end-to-end suite that lenders, owners/developers, and general contractors use to manage budgets, forecasting, commitments, compliance, lien waivers, and embedded payments on real construction projects.",
    long2: "Before Built, I spent four years at Ankura, last as Director of the Construction & Infrastructure practice, working construction litigation and dispute consulting on nine-figure capital projects. I have a B.S. and M.S. in Civil & Environmental Engineering from UC Berkeley, where I also taught Construction Management and MATLAB. I've co-authored peer-reviewed papers on LEED outcomes and concurrent delay in construction.",
    facts: [
      ["Now", "Sr. PM, Built Technologies"],
      ["Based in", "New York, NY"],
      ["Previously", "Director, Ankura"],
      ["Education", "UC Berkeley, BS + MS"],
      ["Cert", "CSPO (Scrum Alliance)"],
      ["Mile PR", "Working on it"],
    ],
  },

  now: {
    updated: "April 2026",
    focus: "Leading Construction Financials at Built: budgeting, forecasting, lien waivers, and embedded payments. Currently shipping commitment-management v2.",
    reading: "Working through a stack of systems-design books and one trashy thriller.",
    listening: "A lot of Caroline Polachek and Khruangbin lately.",
    running: "Building base mileage for a fall half. Also playing beach volleyball in Central Park whenever the weather cooperates.",
    challenges: "2025: Ran all 17 pedestrian-accessible bridges into Manhattan. 2026: Exploring a new NYC neighborhood every month.",
    eating: "Trying every dumpling spot in Flushing. Currently 7 down, ~40 to go.",
  },

  // NYC running routes - SVG coordinates within 1000x800 viewBox
  routes: [
    {
      id: "central-park-loop",
      name: "Central Park Full Loop",
      distance: "6.1 mi",
      pace: "8:14 /mi",
      vibe: "The classic. Varied terrain, good for base miles.",
      color: "var(--accent)",
      d: "M 540 240 L 555 215 L 575 195 L 600 185 L 625 200 L 635 230 L 640 270 L 635 310 L 625 345 L 605 370 L 580 380 L 560 365 L 545 335 L 538 300 L 535 270 Z",
    },
    {
      id: "west-side",
      name: "West Side Highway",
      distance: "8.4 mi",
      pace: "7:58 /mi",
      vibe: "Flat, fast, river on your right.",
      color: "#1a1a1a",
      d: "M 470 180 L 460 220 L 455 270 L 452 320 L 450 380 L 448 440 L 446 500 L 445 560",
    },
    {
      id: "brooklyn-bridge",
      name: "Brooklyn Bridge + Dumbo",
      distance: "4.7 mi",
      pace: "8:32 /mi",
      vibe: "Bridge crossing into Dumbo. Cobblestones through the back streets.",
      color: "#1a1a1a",
      d: "M 520 540 L 555 555 L 595 575 L 635 590 L 670 600 L 700 605 L 730 600",
    },
    {
      id: "east-river",
      name: "East River Park",
      distance: "5.6 mi",
      pace: "8:05 /mi",
      vibe: "Underrated. Empty at 6am except for the ferry wake.",
      color: "#1a1a1a",
      d: "M 660 280 L 670 320 L 678 365 L 680 410 L 678 460 L 670 510 L 655 555",
    },
    {
      id: "prospect-park",
      name: "Prospect Park Loop",
      distance: "3.4 mi",
      pace: "7:48 /mi",
      vibe: "Worth the train ride. Hilly back section.",
      color: "#1a1a1a",
      d: "M 700 640 L 720 645 L 740 660 L 745 680 L 735 695 L 715 695 L 700 680 L 695 660 Z",
    },
  ],

  // Real work + selected projects/publications, framed for product audience
  projects: [
    {
      title: "Construction Financials",
      role: "Sr. PM, Built Technologies",
      year: "2025 to present",
      blurb: "End-to-end financials suite for lenders, owners, and GCs: budgeting, forecasting, commitments, compliance, lien waivers, embedded payments. Multi-persona, money-on-the-line.",
      tags: ["fintech", "construction", "0\u21921 within"],
    },
    {
      title: "Built Ecosystem",
      role: "PM, Built Technologies",
      year: "2024-25",
      blurb: "Owned the integration platform connecting Built to the construction software stack - ERPs, project-management tools, banks. Made data move where it needed to.",
      tags: ["platform", "integrations"],
    },
    {
      title: "Owner & Contractor PS",
      role: "Professional Services Lead",
      year: "2024",
      blurb: "Stood up the implementation function for Owner/Contractor customers - ran configurations, migrations, and the first round of customer success motions before handing off to a permanent team.",
      tags: ["operations", "0\u21921"],
    },
    {
      title: "Concurrency & Pacing",
      role: "Co-author, AACE International",
      year: "2019",
      blurb: "Peer-reviewed paper on concurrent delay theory and whether intent should change how courts evaluate it. Cited in claims practice. Still my favorite dinner-party topic.",
      tags: ["research", "publication"],
    },
    {
      title: "LEED \u00d7 Climate Outcomes",
      role: "Co-author, Energy and Buildings",
      year: "2019",
      blurb: "Showed the delinkage between LEED certification points and actual environmental outcomes via a California case study. Argued for regional weighting.",
      tags: ["research", "Elsevier"],
    },
  ],

  experience: [
    { co: "Built Technologies", role: "Senior Product Manager, Construction Financials", years: "Sep 2025 to present", where: "New York, NY" },
    { co: "Built Technologies", role: "Product Manager, Built Ecosystem", years: "Aug 2024 - Aug 2025", where: "New York, NY" },
    { co: "Built Technologies", role: "Professional Services Lead, Owner & Contractor", years: "Feb 2024 - Jul 2024", where: "New York, NY" },
    { co: "Built Technologies", role: "Business Operations, Owner & Contractor", years: "Jan 2023 - Jan 2024", where: "New York, NY" },
    { co: "Ankura", role: "Director, Construction & Infrastructure", years: "Mar 2021 - Dec 2022", where: "New York, NY" },
    { co: "Ankura", role: "Senior Associate, Construction & Infrastructure", years: "Oct 2019 - Feb 2021", where: "San Francisco, CA" },
    { co: "Ankura", role: "Associate, Construction & Infrastructure", years: "Sep 2018 - Sep 2019", where: "San Francisco, CA" },
    { co: "UC Berkeley", role: "Graduate Student Instructor (CE167, E7)", years: "Aug 2017 - May 2018", where: "Berkeley, CA" },
    { co: "McCarthy Building Companies", role: "Project Engineer Intern", years: "May 2016 - Aug 2016", where: "San Francisco, CA" },
    { co: "UC Berkeley", role: "M.S. Civil & Environmental Engineering", years: "2017 - 2018", where: "Berkeley, CA" },
    { co: "UC Berkeley", role: "B.S. Civil & Environmental Engineering", years: "2013 - 2017", where: "Berkeley, CA" },
  ],

  contact: {
    email: "joshchittick@gmail.com",
    phone: "(805) 722-0538",
    linkedin: "https://www.linkedin.com/in/joshchittick/",
  },
};
