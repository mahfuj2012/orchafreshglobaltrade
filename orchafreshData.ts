export interface Product {
  id: string;
  n: string; // name
  t: 'fruit' | 'veg'; // type
  s: string; // season
  y: number; // 1 = year-round, 0 = seasonal
  k: string; // shape/icon key
  c: [string, string]; // gradient colors
  d: string; // description
  featured?: boolean;
  ownFarm?: boolean;
  moq?: string;
  packing?: string;
  varieties?: string[];
  temp?: string;
  priceRange?: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  category: 'farm' | 'sourcing' | 'processing' | 'packaging' | 'logistics';
  title: string;
  caption: string;
  description: string;
  alt: string;
  src: string;
  illustrative: boolean;
}

export interface TeamMember {
  name: string;
  title: string;
  photo: string;
  bio: string;
  phone?: string;
}

export interface FaqItem {
  q: string;
  a: string;
  category?: string;
}

export interface BuyerReview {
  id: string;
  name: string;
  title: string;
  company: string;
  country: string;
  rating: number; // 4 or 5
  consignment: string;
  date: string;
  review: string;
  photo: string;
  verifiedTag: string;
}

export const CONTACT_INFO = {
  company: "OrchaFresh Global Trade",
  tagline: "Good food, better tomorrow.",
  slogan: "We grow it. We source it. We ship it.",
  subtext: "Sourced with care, delivered with trust.",
  email: "orchafreshofficial@gmail.com",
  phone: "+880 1628-267511",
  whatsappNumber: "8801628267511",
  address: "Bazar Road, Jatrabari, Dhaka-1204, Bangladesh",
  socials: {
    facebook: "https://www.facebook.com/orchafreshglobaltrade",
    linkedin: "https://www.linkedin.com/company/orchafreshglobaltrade",
  },
  ports: {
    air: "Hazrat Shahjalal International Airport (DAC), Dhaka",
    sea: "Chattogram Port (CGP), Chittagong",
  }
};

export const FEATURED_PRODUCE = [
  {
    id: "mango",
    name: "Mango",
    type: "fruit" as const,
    season: "May to August",
    tag: "Own Farm",
    badgeColor: "bg-emerald-800 text-white",
    description: "Tree-ripened on our own land and picked at export maturity, so the fruit travels well and still tastes rich and sweet when it reaches your customers.",
    spec: [
      { label: "Season", val: "May to August" },
      { label: "Varieties", val: "Amrapali, Himsagar, Haribhanga, Fazli, Langra" },
      { label: "Packing", val: "Export cartons (2kg, 4kg, 5kg), sized to order" },
      { label: "Storage Temp", val: "+10°C to +13°C" },
      { label: "Transit Mode", val: "Air Freight (recommended) or Sea Reefer" }
    ],
    image: "/images/mango.jpg",
    accent: "from-amber-500 to-orange-500"
  },
  {
    id: "tomato",
    name: "Tomato",
    type: "veg" as const,
    season: "Peak December to March",
    tag: "Own Farm",
    badgeColor: "bg-emerald-800 text-white",
    description: "Firm, evenly coloured tomatoes from our own garden, graded for size and colour and packed to survive the journey without bruising.",
    spec: [
      { label: "Season", val: "Peak December to March" },
      { label: "Grading", val: "By size, firmness and colour breaker stage" },
      { label: "Packing", val: "Perforated crates or corrugated export cartons" },
      { label: "Storage Temp", val: "+12°C to +15°C" },
      { label: "Transit Mode", val: "Air or Sea Reefer" }
    ],
    image: "/images/tomato.jpg",
    accent: "from-red-500 to-rose-600"
  },
  {
    id: "mixed-veg",
    name: "Fresh Vegetables",
    type: "veg" as const,
    season: "Year-round & Seasonal",
    tag: "Sourced Direct",
    badgeColor: "bg-amber-700 text-white",
    description: "Peppers, carrots, leafy greens, gourds and more, bought directly from trusted contract growers and checked thoroughly before they join your shipment.",
    spec: [
      { label: "Range", val: "15+ varieties available, others on custom request" },
      { label: "Source", val: "Trusted contract growers across Bangladesh" },
      { label: "Packing", val: "Customized per product & destination climate" },
      { label: "Quality Checks", val: "100% inspected at sorting facility" },
      { label: "Transit Mode", val: "Air freight & Sea Reefer container" }
    ],
    image: "/images/veg.jpg",
    accent: "from-green-600 to-emerald-700"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'banana',
    n: 'Banana',
    t: 'fruit',
    s: 'Year-round',
    y: 1,
    k: 'curve',
    c: ['#F5CE3B', '#E2A91B'],
    d: 'Sweet, evenly sized hands, cut mature green so they ripen on arrival.',
    moq: '500 kg air / 1 FCL sea',
    packing: '13.5 kg / 18 kg telescopic export cartons',
    temp: '+13°C to +14°C',
    varieties: ['Sagor', 'Sabri', 'Champa']
  },
  {
    id: 'pineapple',
    n: 'Pineapple',
    t: 'fruit',
    s: 'Jun – Sep',
    y: 0,
    k: 'pine',
    c: ['#F2B22A', '#D98616'],
    d: 'Juicy, golden fruit with a crisp crown, graded strictly by size and brix.',
    moq: '500 kg air / Reefer',
    packing: '10 kg / 12 kg cartons with internal dividers',
    temp: '+8°C to +10°C',
    varieties: ['Giant Kew', 'Honey Queen']
  },
  {
    id: 'guava',
    n: 'Guava',
    t: 'fruit',
    s: 'Peak Jul – Dec',
    y: 0,
    k: 'round',
    c: ['#B6D95A', '#7FAE2E'],
    d: 'Firm, fragrant guava picked at the right stage for international shipping.',
    moq: '300 kg air',
    packing: '4 kg / 5 kg foam-net wrapped cartons',
    temp: '+8°C to +10°C',
    varieties: ['Thai 7', 'Kazi Guava']
  },
  {
    id: 'litchi',
    n: 'Litchi',
    t: 'fruit',
    s: 'May – Jun',
    y: 0,
    k: 'bumpy',
    c: ['#E4506A', '#C42B49'],
    d: 'Sweet, juicy litchi with bright red skin. Short season, book in advance.',
    moq: '300 kg air freight',
    packing: '2 kg / 5 kg vented cartons with ice packs',
    temp: '+2°C to +4°C',
    varieties: ['Bedana', 'Bombay', 'China-3']
  },
  {
    id: 'jackfruit',
    n: 'Jackfruit',
    t: 'fruit',
    s: 'May – Aug',
    y: 0,
    k: 'jack',
    c: ['#A9C24A', '#7B9A26'],
    d: 'Large, aromatic national fruit, whole or segmented, for fresh retail and processing use.',
    moq: '500 kg air / sea',
    packing: 'Individual heavy cartons or pre-cut vacuum packs',
    temp: '+11°C to +13°C'
  },
  {
    id: 'papaya',
    n: 'Papaya',
    t: 'fruit',
    s: 'Year-round',
    y: 1,
    k: 'oval',
    c: ['#F6A23B', '#E0791B'],
    d: 'Smooth-skinned papaya with sweet orange flesh, packed with foam netting to avoid bruising.',
    moq: '400 kg air',
    packing: '5 kg / 6 kg cartons',
    temp: '+10°C to +12°C',
    varieties: ['Red Lady', 'Shahi']
  },
  {
    id: 'watermelon',
    n: 'Watermelon',
    t: 'fruit',
    s: 'Feb – Jun',
    y: 0,
    k: 'melon',
    c: ['#2F8F4B', '#1C6B35'],
    d: 'Crisp, sweet melons with a dark sturdy rind and excellent shelf life during transport.',
    moq: '1 ton / container',
    packing: 'Corrugated cartons or wooden bins',
    temp: '+10°C to +12°C'
  },
  {
    id: 'pomelo',
    n: 'Pomelo (Jambura)',
    t: 'fruit',
    s: 'Oct – Jan',
    y: 0,
    k: 'pome',
    c: ['#CFD73A', '#9BAE1B'],
    d: 'Large citrus with thick protective peel and a mild, refreshingly sweet taste.',
    moq: '500 kg',
    packing: '10 kg / 12 kg cartons',
    temp: '+10°C to +12°C'
  },
  {
    id: 'lemon-lime',
    n: 'Lemon and Lime',
    t: 'fruit',
    s: 'Year-round',
    y: 1,
    k: 'drop',
    c: ['#88C934', '#5A9C16'],
    d: 'Thin-skinned, highly aromatic citrus sorted by caliber for wholesale and supermarkets.',
    moq: '300 kg air',
    packing: '5 kg / 10 kg cartons',
    temp: '+10°C to +12°C',
    varieties: ['Kagzi Lebu', 'Seedless Lemon', 'Zara Lebu']
  },
  {
    id: 'coconut',
    n: 'Coconut',
    t: 'fruit',
    s: 'Year-round',
    y: 1,
    k: 'nut',
    c: ['#8A6240', '#5A3C23'],
    d: 'Green tender coconuts or semi-husked mature coconuts, packed for long ocean transit.',
    moq: '1 FCL container',
    packing: 'Mesh sacks (25 pieces) or cartons',
    temp: 'Ambient / +12°C'
  },
  {
    id: 'green-chilli',
    n: 'Green Chilli',
    t: 'veg',
    s: 'Year-round',
    y: 1,
    k: 'chilli',
    c: ['#2D8C3C', '#176624'],
    d: 'Bright, pungent chillies, washed, dried, and graded by length and heat level.',
    moq: '250 kg air',
    packing: '3 kg / 5 kg corrugated cartons with air vents',
    temp: '+7°C to +10°C'
  },
  {
    id: 'brinjal',
    n: 'Brinjal (Eggplant)',
    t: 'veg',
    s: 'Year-round',
    y: 1,
    k: 'egg',
    c: ['#4E2E69', '#2E1542'],
    d: 'Glossy eggplant in long purple and round green varieties, firm and blemish-free.',
    moq: '300 kg',
    packing: '5 kg / 6 kg cartons',
    temp: '+10°C to +12°C'
  },
  {
    id: 'cucumber',
    n: 'Cucumber',
    t: 'veg',
    s: 'Peak Mar – Sep',
    y: 0,
    k: 'cuc',
    c: ['#3A9448', '#22692D'],
    d: 'Crisp, dark-green cucumbers, straight and uniform, protected from moisture loss.',
    moq: '400 kg',
    packing: '5 kg / 10 kg cartons',
    temp: '+10°C to +12°C'
  },
  {
    id: 'bitter-gourd',
    n: 'Bitter Gourd (Karela)',
    t: 'veg',
    s: 'Mar – Sep',
    y: 0,
    k: 'ridge',
    c: ['#2E7D32', '#1B5E20'],
    d: 'Fresh, deeply ridged karela picked young and tender for prime culinary value.',
    moq: '250 kg air',
    packing: '5 kg vented cartons',
    temp: '+10°C to +12°C'
  },
  {
    id: 'bottle-gourd',
    n: 'Bottle Gourd (Lau)',
    t: 'veg',
    s: 'Dec – Apr',
    y: 0,
    k: 'gourd',
    c: ['#9CCC65', '#7CB342'],
    d: 'Smooth, pale-green lau with tender flesh and long shelf life in cold storage.',
    moq: '300 kg air / sea',
    packing: 'Individual paper wrap in 10 kg cartons',
    temp: '+10°C to +12°C'
  },
  {
    id: 'okra',
    n: 'Okra (Ladyfinger / Dherosh)',
    t: 'veg',
    s: 'Mar – Sep',
    y: 0,
    k: 'finger',
    c: ['#4CAF50', '#2E7D32'],
    d: 'Tender green pods, picked small (under 9cm) and packed completely dry to prevent darkening.',
    moq: '200 kg air freight',
    packing: '3 kg / 5 kg corrugated boxes with cooling holes',
    temp: '+7°C to +10°C'
  },
  {
    id: 'pointed-gourd',
    n: 'Pointed Gourd (Potal)',
    t: 'veg',
    s: 'Mar – Sep',
    y: 0,
    k: 'potal',
    c: ['#689F38', '#33691E'],
    d: 'Small, firm patal, widely demanded across South Asian and Middle Eastern diaspora markets.',
    moq: '250 kg air',
    packing: '5 kg cartons',
    temp: '+10°C to +12°C'
  },
  {
    id: 'cauliflower',
    n: 'Cauliflower',
    t: 'veg',
    s: 'Nov – Feb',
    y: 0,
    k: 'cauli',
    c: ['#AED581', '#7CB342'],
    d: 'Compact snow-white curds harvested with protective jacket leaves intact.',
    moq: '500 kg',
    packing: 'Cartons or plastic crates with 6-8 heads',
    temp: '0°C to +2°C'
  },
  {
    id: 'cabbage',
    n: 'Cabbage',
    t: 'veg',
    s: 'Nov – Feb',
    y: 0,
    k: 'cabb',
    c: ['#66BB6A', '#388E3C'],
    d: 'Dense, solid heads, trimmed of loose outer leaves and graded precisely by weight.',
    moq: '1 ton / container',
    packing: 'Mesh sacks (20 kg) or cartons',
    temp: '0°C to +2°C'
  },
  {
    id: 'carrot',
    n: 'Carrot',
    t: 'veg',
    s: 'Dec – Mar',
    y: 0,
    k: 'carr',
    c: ['#FF7043', '#D84315'],
    d: 'Sweet, crunchy carrots, thoroughly hydro-cooled, washed and sized without soil.',
    moq: '1 ton / container',
    packing: '10 kg / 20 kg poly bags in export cartons',
    temp: '0°C to +2°C'
  },
  {
    id: 'potato',
    n: 'Potato (Diamond / Granola)',
    t: 'veg',
    s: 'Harvest Feb – Apr (Store Year-round)',
    y: 0,
    k: 'spud',
    c: ['#BCAAA4', '#8D6E63'],
    d: 'Clean, firm potatoes graded by caliber (40mm+, 55mm+) for table retail and processing.',
    moq: '1 FCL container (24 MT)',
    packing: '10 kg, 25 kg, 50 kg breathable mesh bags',
    temp: '+8°C to +10°C',
    varieties: ['Diamond', 'Granola', 'Cardinal', 'Lady Rosetta']
  },
  {
    id: 'onion',
    n: 'Red Onion (Deshi / Taherpuri)',
    t: 'veg',
    s: 'Harvest Mar – Jun',
    y: 0,
    k: 'bulb',
    c: ['#AB47BC', '#7B1FA2'],
    d: 'Dry, well-cured onions with tight burgundy skin and sharp pungent aroma.',
    moq: '1 FCL container',
    packing: '10 kg, 20 kg mesh bags',
    temp: '+2°C to +5°C / Dry ventilated',
    varieties: ['Taherpuri', 'Faridpur Red']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "mango-orchard",
    category: "farm",
    title: "Mango sourcing from our own orchard",
    caption: "Hand-picked mangoes collected beneath the trees",
    description: "Growers pick mature mangoes by hand and place them into woven baskets right beside the trees. Harvesting in the cool morning protects the fruit from direct sunlight and preserves firmness.",
    alt: "Mango sourcing from our own orchard - Hand-picked mangoes collected beneath the trees",
    src: "/images/gallery/mango-orchard.webp",
    illustrative: false
  },
  {
    id: "tomato-farm",
    category: "farm",
    title: "Tomato harvest from our own farm",
    caption: "Ripe tomatoes picked along drip-irrigated rows",
    description: "Workers harvest red, firm tomatoes from well-managed rows irrigated by drip lines. Picking into baskets without tipping keeps delicate fruit skin smooth and free of bruising.",
    alt: "Tomato harvest from our own farm - Ripe tomatoes picked along drip-irrigated rows",
    src: "/images/gallery/tomato-farm.webp",
    illustrative: false
  },
  {
    id: "guava-farm",
    category: "farm",
    title: "Fresh guava sourcing from the farm",
    caption: "Crisp guavas hand-picked and basketed on the path",
    description: "Farmers carefully select ripe green guavas directly from branches into deep baskets. Sorting starts right at the orchard edge before fruit is transferred to the packing line.",
    alt: "Fresh guava sourcing from the farm - Crisp guavas hand-picked and basketed",
    src: "/images/gallery/guava-farm.webp",
    illustrative: false
  },
  {
    id: "papaya-farm",
    category: "farm",
    title: "Papaya sourcing from the farm",
    caption: "Papayas selected at the right stage of ripeness",
    description: "Growers harvest papayas from fruit-laden trees, separating green and colour-breaking fruit into different baskets. Choosing the ripening stage matches each shipment to the buyer's transit time.",
    alt: "Papaya sourcing from the farm - Papayas selected at the right stage of ripeness",
    src: "/images/gallery/papaya-farm.webp",
    illustrative: false
  },
  {
    id: "pineapple-farm",
    category: "farm",
    title: "Pineapple sourcing in the field",
    caption: "Whole pineapples collected between the planted rows",
    description: "Farmers cut mature pineapples with their crowns intact and gather them in baskets between rows. The fruit is selected for size, shell colour and firmness before leaving the field.",
    alt: "Pineapple sourcing in the field - Whole pineapples collected between the planted rows",
    src: "/images/gallery/pineapple-farm.webp",
    illustrative: false
  },
  {
    id: "lemon-farm",
    category: "farm",
    title: "Lemon farming and sourcing",
    caption: "Juicy lemons hand-picked in the citrus orchard",
    description: "Growers pick green and yellow lemons by hand and sort them into baskets along the orchard path. Separating fruit by colour and caliber gives buyers consistent lots for juice or retail.",
    alt: "Lemon farming and sourcing - Juicy lemons hand-picked in the citrus orchard",
    src: "/images/gallery/lemon-farm.webp",
    illustrative: false
  },
  {
    id: "watermelon-farm",
    category: "farm",
    title: "Watermelon sourcing from the farm",
    caption: "Flesh quality checked before the melons are packed",
    description: "A farmer cuts open a sample watermelon to check red flesh, brix sweetness, and rind thickness next to the freshly harvested crop. Only lots passing this field check move to onward packaging.",
    alt: "Watermelon sourcing from the farm - Flesh quality checked before the melons are packed",
    src: "/images/gallery/watermelon-farm.webp",
    illustrative: false
  },
  {
    id: "cauliflower-cabbage-farm",
    category: "farm",
    title: "Cauliflower and cabbage sourcing",
    caption: "Compact heads harvested with protective leaves",
    description: "Harvesters cut cauliflower and cabbage heads in the field, keeping the outer leaves on to protect the curd from damage. Heads are gathered in baskets and taken straight to cool collection points.",
    alt: "Cauliflower and cabbage sourcing - Compact heads harvested with protective leaves",
    src: "/images/gallery/cauliflower-cabbage-farm.webp",
    illustrative: false
  },
  {
    id: "onion-farm",
    category: "sourcing",
    title: "Onion sourcing from the farm",
    caption: "Our team inspects freshly lifted red onions",
    description: "OrchaFresh sourcing officers check bulb size, skin colour and dryness while farmers sort and bag onions in the field. Working directly with growers ensures traceable lots and steady export supply.",
    alt: "Onion sourcing from the farm - Our team inspects freshly lifted red onions",
    src: "/images/gallery/onion-farm.webp",
    illustrative: false
  },
  {
    id: "potato-farm",
    category: "sourcing",
    title: "Potato sourcing with the growers",
    caption: "Sample checking and recording at the farm",
    description: "Our team examines potato samples with farmers, noting size, skin finish and any defects before the lot is approved. Every purchase is recorded on site so each bag can be traced back to its plot.",
    alt: "Potato sourcing with the growers - Sample checking and recording at the farm",
    src: "/images/gallery/potato-farm.webp",
    illustrative: false
  },
  {
    id: "garlic-sourcing",
    category: "sourcing",
    title: "Garlic sourcing at the collection point",
    caption: "Garlic bulbs reviewed in large woven baskets",
    description: "Our buyer and grower review dry, well-cured garlic bulbs at the farm collection shed, with loaded transport ready nearby. Bulbs are selected for size, firmness and clean skins before processing.",
    alt: "Garlic sourcing at the collection point - Garlic bulbs reviewed in large woven baskets",
    src: "/images/gallery/garlic-sourcing.webp",
    illustrative: false
  },
  {
    id: "potato-grading",
    category: "processing",
    title: "Potato cleaning and grading",
    caption: "Machine cleaning and hand grading by size",
    description: "In our cleaning and grading division, potatoes run along conveyors where they are cleaned and graded by size, then checked by hand by trained, hygienically attired staff.",
    alt: "Potato cleaning and grading - Machine cleaning and hand grading by size",
    src: "/images/gallery/potato-grading.webp",
    illustrative: false
  },
  {
    id: "quality-control",
    category: "processing",
    title: "Processing and quality control division",
    caption: "Every lot is weighed, inspected and recorded",
    description: "Quality staff inspect, weigh and record vegetables and fruits on stainless-steel tables before packing. Checks for size, colour, defects and weight ensure consigment matches buyer specifications.",
    alt: "Processing and quality control division - Every lot is weighed, inspected and recorded",
    src: "/images/gallery/quality-control.webp",
    illustrative: false
  },
  {
    id: "vegetable-packing",
    category: "packaging",
    title: "Fresh vegetable packing line",
    caption: "Beans and greens packed in branded export cartons",
    description: "Workers in hairnets and gloves pack green beans and other vegetables into labelled pouches and OrchaFresh export cartons on a clean packing line.",
    alt: "Fresh vegetable packing line - Beans and greens packed in branded export cartons",
    src: "/images/gallery/vegetable-packing.webp",
    illustrative: false
  },
  {
    id: "storage-inventory",
    category: "packaging",
    title: "Final storage and inventory management",
    caption: "Packed cartons stored, scanned and tracked",
    description: "Packed cartons are palletised and placed on racks in our warehouse, where staff scan and record every box. Organised storage and FIFO stock rotation keep produce fresh and ready for dispatch.",
    alt: "Final storage and inventory management - Packed cartons stored, scanned and tracked",
    src: "/images/gallery/storage-inventory.webp",
    illustrative: false
  },
  {
    id: "final-dispatch",
    category: "logistics",
    title: "Final distribution and export dispatch",
    caption: "Containers and lorries loaded for export and wholesale",
    description: "At the dispatch bay, checked cartons and crates are loaded into export containers and wholesale transport with forklift support. Final documents are verified before vehicles depart for airport or seaport.",
    alt: "Final distribution and export dispatch - Containers and lorries loaded for export and wholesale",
    src: "/images/gallery/final-dispatch.webp",
    illustrative: false
  },
  {
    id: "wholesale-market",
    category: "logistics",
    title: "Vegetable wholesale market supply",
    caption: "Fresh produce reaching the wholesale market",
    description: "A busy wholesale market filled with fresh vegetables and fruits, where OrchaFresh also supplies regional traders. Our market presence keeps us close to daily prices and real-time seasonal availability.",
    alt: "Vegetable wholesale market supply - Fresh produce reaching the wholesale market",
    src: "/images/gallery/wholesale-market.webp",
    illustrative: false
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Mahfuj Ahmed',
    title: 'Founder of OrchaFresh Global Trade',
    photo: '/images/mahfuj.jpg',
    bio: 'Oversees company vision, farm operations, grower partnerships, and direct international buyer relations.',
    phone: '+880 1628-267511'
  },
  {
    name: 'MD Jamal',
    title: 'CEO',
    photo: '/images/jamal.jpg',
    bio: 'Leads global trade operations, commercial logistics, port clearance, and customer fulfillment.',
  },
  {
    name: 'MD Junaiyet Khalifa',
    title: 'MD (Managing Director)',
    photo: '/images/junaiyet.jpg',
    bio: 'Directs supply chain management, quality assurance standards, and cold-chain infrastructure.',
  }
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Our Farm",
    desc: "Mango and tomato grow on our own land, so we decide the harvest date, control crop management, and guarantee pure origin traceability.",
    image: "/images/mango.jpg",
    alt: "Mango orchard in Bangladesh"
  },
  {
    num: "02",
    title: "Sourcing",
    desc: "For everything else we buy straight from trusted contract growers. Field officers check crops before harvest so only quality lots enter our queue.",
    image: "/images/sourcing.jpg",
    alt: "Grower harvesting vegetables in field"
  },
  {
    num: "03",
    title: "Sorting and Grading",
    desc: "Produce is sorted by caliber, colour, firmness, and ripeness. Only export-grade produce advances, reducing rejection rates at buyer destination.",
    image: "/images/veg.jpg",
    alt: "Sorted fresh vegetables"
  },
  {
    num: "04",
    title: "Cleaning and Packing",
    desc: "Fruit and vegetables are cleaned, hydro-cooled or air-dried, and packed into vented cartons or crates matched to buyer transit specs.",
    image: "/images/packing.jpg",
    alt: "Team washing and packing produce"
  },
  {
    num: "05",
    title: "Warehouse & Cold Staging",
    desc: "Packed cartons are staged safely in cold staging areas, scanned, barcoded, and kept pre-cooled ready for immediate dispatch.",
    image: "/images/warehouse.jpg",
    alt: "Packed cartons staged in warehouse"
  },
  {
    num: "06",
    title: "Logistics & Clearance",
    desc: "We book air freight from Dhaka (DAC) or sea freight from Chattogram (CGP), handle customs, and furnish complete phytosanitary paperwork.",
    image: "/images/logistics.jpg",
    alt: "Truck loading beside cargo terminal"
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Our own farm, our own control",
    desc: "Mango and tomato come from our own land. We decide the harvest, so quality never depends on a middleman and you know exactly where your fruit was grown.",
    badge: "Direct Ownership"
  },
  {
    title: "One supplier, a wide range",
    desc: "Seasonal and year-round fruit and vegetables consolidated in one order, one invoice, and one coordinated shipment.",
    badge: "Consolidated Supply"
  },
  {
    title: "Competitive farm-direct pricing",
    desc: "Direct farm ownership and direct grower sourcing eliminate excessive trading layers, keeping pricing attractive and margins healthy.",
    badge: "Direct Value"
  },
  {
    title: "Packed to your spec",
    desc: "Grading caliber, carton size, gross/net weight, inner poly-liners, and private label branding are fully customized to your market.",
    badge: "Custom Packaging"
  },
  {
    title: "Export paperwork handled",
    desc: "Phytosanitary certificate from Plant Quarantine, Certificate of Origin, Form C, Commercial Invoice, and Packing List prepared accurately.",
    badge: "Full Compliance"
  },
  {
    title: "A direct line to the founder",
    desc: "You talk directly with founder Mahfuj Ahmed and our executive directors. Fast answers, clear commitments, no bureaucratic delay.",
    badge: "Founder Contact"
  }
];

export const HOW_ORDERING_WORKS = [
  {
    step: "1",
    title: "Send your inquiry",
    desc: "Tell us the product, target volume (KG or MT), packaging type, and destination port or airport."
  },
  {
    step: "2",
    title: "Get your quote",
    desc: "We provide competitive pricing per Incoterm (FOB DAC/CGP, CIF, CFR) with photo proofs and sample arrangements."
  },
  {
    step: "3",
    title: "Confirm the order",
    desc: "We issue the formal Proforma Invoice (PI) detailing bank details, payment terms, and harvest scheduling."
  },
  {
    step: "4",
    title: "Pack and inspect",
    desc: "Field harvesting, washing, grading, and packing with real-time video/photo inspection shared before staging."
  },
  {
    step: "5",
    title: "Ship and document",
    desc: "Cargo handed to air or ocean carrier, phytosanitary clearance completed, tracking and bill of lading transmitted."
  }
];

export const FAQS: FaqItem[] = [
  {
    q: "Which products can you supply?",
    a: "We export Mango and Tomato from our own farms in Bangladesh, plus over 20 lines of fresh vegetables (green chillies, pointed gourd, bitter gourd, eggplants, okra, potatoes, onions) and seasonal tropical fruits (jackfruit, litchi, guava, pineapple, bananas, papayas, lemons)."
  },
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "For air freight shipments from Dhaka Airport (DAC), the minimum order is typically 300 kg to 500 kg (which can be a consolidated mix of several fruits and vegetables). For ocean sea reefer shipments from Chattogram Port, the MOQ is 1 twenty-foot (20ft) or forty-foot (40ft) container (approx. 12 to 24 metric tons)."
  },
  {
    q: "How do you ship, and from where?",
    a: "We ship by air freight via Hazrat Shahjalal International Airport (DAC) in Dhaka for urgent, perishable produce (arrival within 12-36 hours across Middle East, UK, and Europe). For volume bulk orders, we ship in temperature-controlled 20ft and 40ft reefer ocean containers via Chattogram Seaport (CGP)."
  },
  {
    q: "Do you supply official Phytosanitary certificates and export documents?",
    a: "Yes. Every export shipment is inspected and certified by the Plant Quarantine Wing of the Department of Agricultural Extension (DAE), Ministry of Agriculture Bangladesh. We provide the original Phytosanitary Certificate, Certificate of Origin (EPB/Chamber of Commerce), Commercial Invoice, Packing List, and Bill of Lading (Airway Bill or Ocean B/L)."
  },
  {
    q: "What payment terms do you accept?",
    a: "For international trade, we work with Letter of Credit (L/C at sight) from reputable banks, as well as Telegraphic Transfer (T/T advance deposit and balance upon copy of Bill of Lading)."
  },
  {
    q: "Can you pack under our private supermarket or wholesale brand?",
    a: "Yes. We offer OEM/private label packing. We can print your company logo, barcodes, country-specific language labels, and carton branding according to your specifications."
  },
  {
    q: "Can we visit your farm and sorting facility?",
    a: "Absolutely! We welcome prospective importers, distributors, and buyers to visit our orchard, tomato farms, and packhouse facilities in Bangladesh. You can meet our founder Mahfuj Ahmed and tour the operations firsthand."
  },
  {
    q: "How fast do you provide quotations?",
    a: "We typically respond with comprehensive FOB or CIF quotations within 2 to 4 hours of receiving your inquiry with target volumes and destination port."
  }
];

export const BUYER_REVIEWS: BuyerReview[] = [
  {
    id: "rev-khalid",
    name: "Khalid Al-Nuaimi",
    title: "Managing Director",
    company: "Al-Mansoori Fresh Produce LLC",
    country: "Dubai, United Arab Emirates",
    rating: 5,
    consignment: "4.5 MT Fresh Mangoes (Amrapali & Himsagar) • Air Cargo DAC to DXB",
    date: "July 2026",
    review: "We booked 4,500 kg of Amrapali mangoes through Mahfuj for our supermarket distribution chain in Dubai. The fruit arrived with uniform skin firmness, average brix around 19°, and zero pest damage on quarantine clearance. Direct WhatsApp communication with the founder makes tracking smooth and transparent.",
    photo: "/images/buyers/khalid.jpg",
    verifiedTag: "Verified Air Cargo Consignment • UAE"
  },
  {
    id: "rev-david",
    name: "David Jenkins",
    title: "Procurement Director",
    company: "Smithfield & Spitalfields Produce Ltd",
    country: "London, United Kingdom",
    rating: 4,
    consignment: "2.8 MT Green Chillies & Pointed Gourd • Air Cargo DAC to LHR",
    date: "August 2026",
    review: "The pungent aroma and grading consistency of the green chillies were top notch. We had a minor 8-hour flight schedule adjustment at Dhaka cargo terminal due to monsoon weather, but Jamal from the logistics desk kept our clearing agent in Heathrow fully updated with revised documents before touchdown. Produce arrived crisp with no moisture buildup.",
    photo: "/images/buyers/david.jpg",
    verifiedTag: "Verified Importer • United Kingdom"
  },
  {
    id: "rev-jason",
    name: "Jason Lim",
    title: "Head of Fresh Procurement",
    company: "Straits Fresh Logistics Pte Ltd",
    country: "Singapore",
    rating: 5,
    consignment: "Consolidated Shipment: Papayas, Guavas & Okra • Air Cargo DAC to SIN",
    date: "September 2026",
    review: "Consolidating 3 separate items into one air shipment is often where suppliers make mistakes, but OrchaFresh packed each line with appropriate ventilation and individual foam netting for the Red Lady papayas. Shelf-life in our cold room has exceeded expectations. Highly dependable team.",
    photo: "/images/buyers/jason.jpg",
    verifiedTag: "Verified Consignment • Singapore"
  },
  {
    id: "rev-elena",
    name: "Elena Rostova",
    title: "Senior Logistics Coordinator",
    company: "EuroFresh Imports B.V.",
    country: "Rotterdam, Netherlands",
    rating: 4,
    consignment: "Trial 40ft Reefer Container: Field Tomatoes • Chattogram Port to Rotterdam",
    date: "January 2026",
    review: "We ran a trial sea container of winter field tomatoes under 12°C reefer settings. Caliber sizing (55–65mm) and colour breaker stage were strictly followed. We recommended slightly reinforced edge protectors on the bottom pallets, which their packing team accommodated for our subsequent orders. Solid, transparent partners.",
    photo: "/images/buyers/elena.jpg",
    verifiedTag: "Verified Ocean Reefer • Netherlands"
  }
];

