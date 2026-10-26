export const company = {
  name: 'ARISKA',
  tagline: 'Creating Connections, Building Success',
  pillars: ['Supply & Procurement', 'Printing & Packaging', 'Export & Trading', 'Agro'],
  founded: '2024',
  experience: '15+',
  markets: ['Indonesia', 'China', 'Sri Lanka'],
  phone: '+880 1580-899249',
  website: 'www.ariskabd.com',
  registeredAddress: '223 Tejgaon I/A, Dhaka-1208, Bangladesh',
  businessAddress: 'House 126, Road 1, Baridhara DOHS, Dhaka-1206, Bangladesh',
}

export const whatWeDo = [
  {
    title: 'Supply & Procurement',
    description: 'B2B supply chain solutions, institutional procurement, and tender contracting for government and private sector projects.',
  },
  {
    title: 'Printing & Packaging',
    description: 'End-to-end commercial printing, custom packaging, and fine paper imports backed by an expert design team.',
  },
  {
    title: 'Export & Trading',
    description: 'Global commodity export and local wholesale trading of rubber, leather, and raw materials.',
  },
  {
    title: 'Agro & Fresh Produce',
    description: 'Large-scale commercial farming and bulk wholesale supply of premium fruits from Modhupur, Tangail.',
  },
]

export const journey = [
  { value: '15+ Years', label: "Team's combined business experience" },
  { value: '2024', label: 'ARISKA began its journey' },
  { value: '3+ Markets', label: 'Current business connections with Indonesia, China and Sri Lanka' },
  { value: 'Growing Network', label: 'Expanding our international business relationships' },
]

export const mission = {
  heading: 'Connecting Businesses Through Reliable Solutions',
  intro:
    'Our mission is to provide reliable trading, supply, procurement, and export solutions while building strong and lasting relationships with our clients and international business partners.',
  points: [
    "Understanding our clients' requirements",
    'Providing dependable sourcing and supply solutions',
    'Maintaining quality and professional standards',
    'Building transparent and trustworthy relationships',
    'Connecting businesses across international markets',
    'Creating long-term value for our clients and partners',
  ],
}

export const vision = {
  heading: 'Building a Global Business Network from Bangladesh',
  intro:
    'Our vision is to develop ARISKA into a trusted international trading and supply company connecting Bangladesh with businesses and markets around the world.',
  sub: 'We aim to continuously expand our product portfolio, international network, and business partnerships while creating new opportunities for our clients, suppliers, and international partners.',
  future: [
    { title: 'Expand Markets', description: 'Develop business relationships in additional countries.' },
    { title: 'Strengthen Partnerships', description: 'Build long-term relationships with international buyers, suppliers, and businesses.' },
    { title: 'Expand Products', description: 'Introduce new product categories according to market demand.' },
    { title: 'Grow Internationally', description: 'Increase the presence of Bangladeshi products in international markets.' },
  ],
}

export type ServiceListItem = { title: string; description: string }
export type ServiceGroup = { heading: string; items: ServiceListItem[] }
export type ClientGroup = { category: string; names: string[] }

export const services: {
  slug: string
  title: string
  tagline: string
  intro: string
  groups: ServiceGroup[]
  clientGroups?: ClientGroup[]
}[] = [
  {
    slug: 'supply-procurement',
    title: 'Supply & Corporate Procurement',
    tagline: 'B2B Supply Chain & Institutional Procurement',
    intro:
      'Specializing in B2B supply chain solutions, institutional procurement, and selective participation in government and private sector tenders.',
    groups: [
      {
        heading: 'Services',
        items: [
          {
            title: 'Government & Private Tender Contracting',
            description: 'Turnkey procurement and supply services for public and private sector projects.',
          },
          {
            title: 'Corporate & Industrial Supply Solutions',
            description: 'Institutional bulk supply for manufacturing, beverage, pharmaceutical, and construction industries.',
          },
          {
            title: 'Residential & Institutional Community Supplies',
            description: 'Direct procurement services for key residential defense societies.',
          },
        ],
      },
    ],
    clientGroups: [
      { category: 'Beverage & Pharmaceuticals', names: ['Globe Soft Drinks Ltd.', 'AST Beverage Ltd.', 'Globe Pharmaceuticals Ltd.'] },
      { category: 'Real Estate & Building Materials', names: ['Concord Real Estate', 'Mirpur Ceramics', 'Khadim Ceramics'] },
      { category: 'Institutional Projects', names: ['Baridhara DOHS', 'Mirpur DOHS'] },
    ],
  },
  {
    slug: 'printing-packaging',
    title: 'Printing, Packaging & Paper Solutions',
    tagline: 'End-to-End Commercial Printing & Packaging',
    intro:
      'End-to-end commercial printing, high-volume custom packaging, and raw material imports backed by advanced machinery and an expert design team.',
    groups: [
      {
        heading: 'Industrial & Commercial Packaging',
        items: [
          {
            title: 'Custom Packaging Boxes',
            description: 'Corrugated boxes, rigid gift boxes, product cartons, and industrial packaging solutions.',
          },
          {
            title: 'Custom Premium Shopping Bags',
            description: 'Branded paper shopping bags and customized carry bags.',
          },
        ],
      },
      {
        heading: 'Corporate & Commercial Printing Services',
        items: [
          { title: 'Corporate Publications', description: 'Annual reports, corporate directories, souvenirs, and books.' },
          {
            title: 'Promotional & Marketing Materials',
            description: 'High-impact banners, posters, brochures, and marketing displays.',
          },
          {
            title: 'Business Stationery',
            description: 'Customized name cards/business cards, letterheads, and corporate presentation folders.',
          },
        ],
      },
      {
        heading: 'Paper Import & Raw Material Trading',
        items: [
          {
            title: 'Direct Fine Paper Imports',
            description: 'Premium grade paper sourced and imported directly from Indonesia and China.',
          },
        ],
      },
    ],
  },
  {
    slug: 'export-trading',
    title: 'Export & Commodity Trading',
    tagline: 'Global Commodity Export & Local Trade',
    intro: 'Global commodity export, international trade distribution, and local wholesale market operations.',
    groups: [
      {
        heading: 'Commodity Exports',
        items: [
          {
            title: 'Raw Rubber Export',
            description: 'High-grade raw natural rubber exported directly to Sri Lanka and international markets.',
          },
          {
            title: 'Leather Goods Export',
            description: 'Export-quality finished leather products and materials for global trade.',
          },
        ],
      },
      {
        heading: 'Local Trading & Wholesale',
        items: [
          {
            title: 'Local Leather Trade',
            description: 'Finished leather supply and distribution for the domestic wholesale market.',
          },
          {
            title: 'Raw Material Trading',
            description: 'Industrial materials and commodity sourcing for local enterprises.',
          },
        ],
      },
    ],
  },
  {
    slug: 'agro',
    title: 'Agro & Fresh Produce',
    tagline: 'Large-Scale Farming & Bulk Wholesale Supply',
    intro:
      'Large-scale commercial farming and bulk wholesale supply operating across 100+ acres of agricultural land in Modhupur, Tangail — the Pineapple Capital of Bangladesh.',
    groups: [
      {
        heading: 'Fresh Produce Portfolio',
        items: [
          { title: 'Premium Modhupur Pineapples', description: 'Fresh, high-grade bulk pineapple supply.' },
          { title: 'Fresh Dragon Fruit', description: 'Commercial plantation-yield dragon fruit.' },
          { title: 'Commercial Bananas', description: 'High-volume wholesale banana crops.' },
          { title: 'Farm-Fresh Papayas', description: 'Fresh harvest distribution for markets and corporate clients.' },
          { title: 'Guavas', description: 'Bulk high-yield guava crops.' },
        ],
      },
      {
        heading: 'Agro Services',
        items: [
          {
            title: 'Bulk Seasonal Fruit Supply',
            description: 'Mass distribution of seasonal fruits directly from farms to national wholesale markets and corporate clients.',
          },
          {
            title: 'Contract Farming & Large-Scale Agro Supply',
            description: 'Targeted crop production and bulk supply contracts for large enterprises.',
          },
        ],
      },
    ],
  },
]

export const internationalMarkets = [
  { country: 'Indonesia', description: 'Business relationships and trading activities with partners in Indonesia.' },
  { country: 'China', description: 'Business connections supporting sourcing and international trade activities.' },
  { country: 'Sri Lanka', description: 'Business relationships supporting cross-border commercial opportunities.' },
]

export const clientGroups: ClientGroup[] = [
  { category: 'Beverage & Pharmaceuticals', names: ['Globe Soft Drinks Ltd.', 'AST Beverage Ltd.', 'Globe Pharmaceuticals Ltd.'] },
  { category: 'Real Estate & Building Materials', names: ['Concord Real Estate', 'Mirpur Ceramics', 'Khadim Ceramics'] },
  { category: 'Institutional Projects', names: ['Baridhara DOHS', 'Mirpur DOHS'] },
]

export const clients = clientGroups.flatMap((group) => group.names.map((name) => ({ name, category: group.category })))

export const teamValues = [
  { title: 'Integrity', description: 'We believe in honest and transparent business.' },
  { title: 'Reliability', description: 'We strive to be a dependable business partner.' },
  { title: 'Professionalism', description: 'We maintain professional standards in every business relationship.' },
  { title: 'Commitment', description: 'We take responsibility for our commitments and client requirements.' },
  { title: 'Partnership', description: 'We believe long-term success is built through strong relationships.' },
]

export const whyAriska = [
  { title: 'Experience', description: 'Our team brings more than 15 years of business experience.' },
  { title: 'Growing International Network', description: 'We currently have business connections with Indonesia, China, and Sri Lanka, with plans for further expansion.' },
  { title: 'Reliable Supply', description: 'We focus on dependable sourcing and supply according to client requirements.' },
  { title: 'Diverse Capabilities', description: 'Our activities cover supply & procurement, printing and packaging, export & trading, and agro production.' },
  { title: 'Business Relationships', description: 'We focus on developing long-term relationships with clients, suppliers, and international partners.' },
  { title: 'Bangladesh Advantage', description: 'Our local market knowledge and supplier network help connect international businesses with opportunities and products from Bangladesh.' },
]

export const businessValues = [
  { title: 'Integrity', description: 'Honesty and transparency are at the heart of our business relationships.' },
  { title: 'Quality', description: 'We aim to provide products and solutions that meet agreed requirements.' },
  { title: 'Reliability', description: 'We strive to deliver dependable service and maintain our commitments.' },
  { title: 'Partnership', description: 'We believe successful business is built through mutual trust and long-term cooperation.' },
  { title: 'Growth', description: 'We continuously seek opportunities to improve, expand, and create greater value.' },
]

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/global', label: 'Global Network' },
  { to: '/clients', label: 'Clients' },
  { to: '/contact', label: 'Contact' },
]
