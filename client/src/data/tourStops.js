export const AGREEMENTS = [
  'Respect the land and each other — stay on paths, avoid harvesting without invitation, always leave some plants',
  'Curiosity over judgment — questions welcome, this is a safe space for all',
  'Listen deeply — to each other, to the soil, and to this place',
  'Leave space for all voices — we learn better together, let\'s listen more than we talk',
  'Take only photos, leave only footprints — this is a single-use plastic-free zone',
];

export const SILENCE_PROMPT =
  'Let\'s start with a moment of silence to witness this space, sensing it with each and every sense. Anyone else want to add an agreement for this tour? Can everyone agree to these?';

export const TOUR_STOPS = [
  {
    id: 1,
    icon: '🌿',
    title: 'Welcome & Luíseño Land Recognition',
    location: 'TEK Entry Garden',
    body: [
      'Welcome to Barron Creek Farm. We begin by acknowledging that we live and work here on the ancestral and unceded lands of the Luíseño people. Those who came before us understood this land through centuries of careful observation and relationship — what is often called Traditional Ecological Knowledge (TEK). TEK teaches us to see the living world as a relationship, not resource; reciprocity, not extraction.',
      'As we move through this farm today, I invite you to notice what the land gives us: air, water, shade, soil, plants — and how we respond with care and gratitude.',
      'This is sacred space. Please take a moment of silence and simply say thank you to the stewards, the indigenous people.',
      'Can you imagine if your mom couldn\'t share the word carrot? That is what is happening today — indigenous words are being lost, and they are critical to our biocultural diversity. Without it we have less resilience. So we want to practice keeping the language strong.',
    ],
    prompts: [
      'Invite a moment of silence',
      'Read from the "Say Their Names" signs — explain the use of pollinators and native species working in harmony',
      'Invite guests to smell and read the placards',
    ],
  },
  {
    id: 2,
    icon: '🌀',
    title: 'Farm Mission & History',
    location: 'Herb Spiral',
    body: [
      'Barron Creek Farm is a nonprofit, community-centered farm where all produce grown is donated into the community. It exists to build community through sustainable farming, education, and food accessibility.',
      'Our mission is simple but vital: fresh, healthy food is a basic human right, and local, regenerative farming can be a path toward that.',
      'In 2017, our earliest beginnings emerged from an idea of growing food with excess shared with neighbors. Over time, that grew into real farm production, weekly produce shares, and in 2023, Barron Creek Farm became its own nonprofit, focused on donation-based farming and community education.',
      'In 2024, we donated over 10,000 pounds of fresh, culturally appropriate produce to food banks and partners, strengthening food access where it\'s most needed.',
      'This herb spiral symbolizes part of how we think about design: interconnected diversity, where different plants support each other, where form follows function, and where every plant has a role.',
    ],
    prompts: [
      'Invite guests to smell herbs — basil, rosemary, mint',
      'Explain how herbs attract beneficial insects, support soil health, and uplift community meals',
    ],
  },
  {
    id: 3,
    icon: '🤝',
    title: 'Partnerships & Community Roots',
    location: 'Left Path',
    body: [
      'Barron Creek Farm is not a standalone project. We grow community as much as we grow food. We are guided by partnerships that expand access, soil stewardship, and opportunity.',
      'This includes collaboration with local partners like North Coast United Methodist Church, providing land and community connection as we transition into this region.',
      'We work with nonprofits, food banks, food pantries, and distribution partners who already serve our neighbors most impacted by food insecurity.',
      'Each partnership reflects our shared belief that many hands, many histories, many skills make a more just food system.',
    ],
    prompts: [
      'Pause for questions about local partnerships',
    ],
  },
  {
    id: 4,
    icon: '🥬',
    title: 'Mixed Vegetable Row Crops',
    location: 'Beds',
    body: [
      'As we walk down this left side, you\'ll see our beds of mixed vegetables — not monocropped rows, but intentional interplanting and rotation based on regenerative principles.',
      'Instead of single crops planted over long runs, we mix varieties. Why?\n• Diversity builds resilience\n• Pests stay in balance\n• Soil life thrives\n• Pollinators find habitat',
      'We rotate crops and plant cover crops in off seasons to build soil health and reduce erosion, honoring the land rather than pushing it past its limits.',
    ],
    prompts: [
      'Ask visitors if anyone recognizes specific vegetables or flowers',
      'Pick something for everyone to taste',
    ],
  },
  {
    id: 5,
    icon: '🌵',
    title: 'Cactus Garden & Exotic Fruit Trees',
    location: 'Back of the Farm',
    body: [
      'At the back, you\'ll notice more drought-tolerant plants like cacti. Climate variation matters — native and adapted plants are part of how we grow with changing conditions.',
      'Here are also some exotic fruit trees and unusual crops that expand access to diverse flavors for our community.',
      'These trees remind us of food heritage and food futures — the ways people have moved crops across continents, creating global food cultures.',
    ],
    prompts: [
      'Ask visitors to guess what some of these trees are',
      'Explain the regions for the agroforest',
    ],
  },
  {
    id: 6,
    icon: '🍅',
    title: 'Tomato House: Nightshades & Regenerative Practices',
    location: 'Tomato House',
    body: [
      'As we move up toward this exit gate and into the tomato house, we\'re entering an area dominated by nightshades — tomatoes, peppers, eggplants — families that love warmth and rich soil.',
      'Here we use regenerative techniques:\n• Soil-building cover crops\n• Compost nutrients, not chemicals\n• Minimum disturbance to soil life\n• Crop rotation: to break pest cycles and replenish nutrients',
      'These practices are not about perfection but care — to improve soil health season after season.',
    ],
    prompts: [
      'Ask guests what "regenerative" means to them and what it might mean in farming',
      'Invite guests to notice leaf structure, blossoms, and how spacing supports airflow and pollination',
    ],
  },
  {
    id: 7,
    icon: '🌱',
    title: 'Nursery: Organic Starts',
    location: 'Nursery',
    body: [
      'Here in the nursery is where it begins — where seeds become starts, and starts become community food.',
      'Everything you see here is grown organically — meaning no synthetic pesticides, no herbicides, no chemical fertilizers. What we do use is soil biology, compost, rotation, biodiversity, and observation.',
      'This makes the plants more resilient, the soil richer, and the food healthier — because people and ecosystems are connected.',
    ],
    prompts: [],
  },
  {
    id: 8,
    icon: '🌳',
    title: 'Distribution & Food Access',
    location: 'Agroforest',
    body: [
      'The food grown here at Barron Creek Farm is donated into the community through trusted partners: food banks, pantries, and distribution networks.',
    ],
    prompts: [
      'Flesh this section out when the forest is better planted',
    ],
  },
  {
    id: 9,
    icon: '🙏',
    title: 'Closing Circle',
    location: 'End of Tour',
    body: [
      'This work reminds us that food is fundamentally a shared resource — not a commodity separated from community life. We share produce because access to good food supports health, dignity, culture, and connection.',
      'Thank you for walking with us today. May you leave inspired to think about where your food comes from, whose land we stand on, and how much power we have when we grow not just crops, but relationships.',
      'Please join us for Growing Good Saturdays — the first Saturday of each month, 10am–1pm. We have fun with community, eat some food, and get a good workout doing some wholesome farm labor that helps feed our neighbors!',
    ],
    prompts: [],
  },
];
