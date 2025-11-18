// ========================================
// MAGDALENIAN CAVE ART EXPERIENCE
// Visual HTML5 Game
// ========================================
//
// Copyright (c) 2025 Marco Birkedahl Jørgensen
// Licensed under CC BY-NC-ND 4.0
// https://creativecommons.org/licenses/by-nc-nd/4.0/
//
// This work is for educational and non-commercial use only.
// All commercial rights reserved to the creator.
// ========================================

// Game State
const gameState = {
  scene: 'title',
  inventory: {},
  tools: {},
  paints: {},
  selectedPaint: null,
  selectedTool: 'finger',
  selectedTemplate: null,
  hasLight: false,
  xp: 0,
  badges: {
    ochreExpert: false,
    manganesemaster: false,
    woodWhisperer: false,
    charcoalCrafter: false,
    fatRenderer: false,
    boneArtisan: false,
    lampMaster: false,
    brushMaker: false,
    pigmentMaster: false,
    paintMixer: false,
    lightPlanner: false,
    templateMaker: false
  },
  currentGatherMaterial: null,
  currentGatherButton: null
};

// Material Definitions
const materials = {
  redOchre: { name: 'Red Ochre', icon: '🔴', formula: 'Fe₂O₃', color: '#8B4513', info: 'Iron-rich clay from riverbanks, produces warm red-brown pigment' },
  yellowOchre: { name: 'Yellow Ochre', icon: '🟡', formula: 'FeO(OH)', color: '#DAA520', info: 'Weathered limestone deposits, creates golden yellow hues' },
  charcoal: { name: 'Charcoal', icon: '⚫', formula: 'C', color: '#100c08', info: 'Burnt wood rich in carbon, used for deep black pigment' },
  manganese: { name: 'Manganese', icon: '🟤', formula: 'MnO₂', color: '#1B1B1B', info: 'Manganese dioxide ore, produces brown-black tones' },
  kaolin: { name: 'Kaolin', icon: '⚪', formula: 'Al₂Si₂O₅(OH)₄', color: '#F5F5DC', info: 'Ground kaolin clay for white highlights' },
  animalFat: { name: 'Animal Fat', icon: '🥩', info: 'Essential binder from marrow and adipose tissue' },
  bone: { name: 'Hollow Bone', icon: '🦴', info: 'For creating spray tubes and tool handles' },
  wood: { name: 'Wood', icon: '🪵', info: 'For torch construction and handles' },
  stone: { name: 'Grinding Stone', icon: '🪨', info: 'For pulverizing mineral pigments' },
  animalHair: { name: 'Animal Hair', icon: '✂️', info: 'Tail and mane hair for making fine brushes' }
};

// Tool Recipes
const toolRecipes = {
  torch: {
    name: 'Torch',
    icon: '🔥',
    requires: { wood: 10, animalFat: 10 },
    xpCost: 50,
    description: 'Mobile lighting (20-40 min burn time)',
    isLight: true
  },
  lamp: {
    name: 'Stone Lamp',
    icon: '🪔',
    requires: { stone: 8, animalFat: 8 },
    xpCost: 50,
    description: 'Steady lighting (1-3 hours burn time)',
    isLight: true
  },
  brush: {
    name: 'Hair Brush',
    icon: '🖌️',
    requires: { wood: 7, animalHair: 7 },
    xpCost: 50,
    description: 'Fine detail work and flowing lines'
  },
  sprayBone: {
    name: 'Spray Bone',
    icon: '🦴',
    requires: { bone: 10 },
    xpCost: 50,
    description: 'For stenciling and diffuse spray effects'
  },

};

// Paint Recipes
const paintRecipes = {
  redPaint: {
    name: 'Red Paint',
    icon: '🔴',
    requires: { redOchre: 2, animalFat: 2 },
    xpCost: 10,
    color: '#8B4513'
  },
  yellowPaint: {
    name: 'Yellow Paint',
    icon: '🟡',
    requires: { yellowOchre: 2, animalFat: 2 },
    xpCost: 10,
    color: '#DAA520'
  },
  blackPaint: {
    name: 'Charcoal Black',
    icon: '⚫',
    requires: { charcoal: 2, animalFat: 2 },
    xpCost: 10,
    color: '#100c08'
  },
  brownPaint: {
    name: 'Manganese Black',
    icon: '🟤',
    requires: { manganese: 2, animalFat: 2 },
    xpCost: 10,
    color: '#1B1B1B'
  },
  whitePaint: {
    name: 'White Paint',
    icon: '⚪',
    requires: { kaolin: 2, animalFat: 2 },
    xpCost: 10,
    color: '#F5F5DC'
  }
};

// Animal Templates
const animalTemplates = {
  horse: { name: 'Horse', icon: '🐴', count: '90+ at Lascaux' },
  aurochs: { name: 'Aurochs', icon: '🐂', count: '36+ at Lascaux' },
  bison: { name: 'Bison', icon: '🦬', count: '9+ at Lascaux' },
  deer: { name: 'Deer', icon: '🦌', count: '10+ at Lascaux' },
  ibex: { name: 'Ibex', icon: '🐐', count: '5+ at Lascaux' }
};

// Enhanced Mini-Game Definitions (12 Total)
const miniGames = {
  redOchre: {
    name: 'The Riverbank Journey',
    type: 'navigation-enhanced',
    duration: 0, // No time limit - platformer mini-game
    badge: 'ochreExpert',
    fact: 'Archaeological evidence from Lascaux shows ochre procurement from sites 15+ km away. Iron-rich hematite (Fe₂O₃) from riverbanks produces superior red-brown pigments. Quality varies by iron content: 20-40% iron = deep red, 10-20% = rust color.',
    rewardMultiplier: 3,
    scientificData: {
      mineralFormula: 'Fe₂O₃ (Hematite)',
      depositLocations: ['Riverbank clay', 'Weathered rock', 'Iron seams'],
      qualityFactors: ['Iron content %', 'Clay purity', 'Particle size']
    }
  },
  manganese: {
    name: 'The Mountain Expedition',
    type: 'navigation-multiday',
    duration: 0, // No time limit - must complete the journey
    badge: 'manganesemaster',
    fact: 'Manganese dioxide (MnO₂) procurement routes of 50+ km documented at Pech Merle and other Magdalenian sites. Found in limestone caves and surface deposits. Harder than ochre (Mohs 5-6), requires specific grinding. Produces brown-black pigment crucial for outlines.',
    rewardMultiplier: 4,
    scientificData: {
      mineralFormula: 'MnO₂ (Pyrolusite)',
      testMethods: ['Streak test (black)', 'Hardness test', 'Density check'],
      geologicalContext: 'Limestone formations, cave deposits'
    }
  },
  wood: {
    name: 'Forest Wisdom',
    type: 'botanical-identification',
    duration: 45,
    badge: 'woodWhisperer',
    fact: 'Resinous conifers (Pinus sylvestris, Juniperus) were preferred for torches. Resin content: Pine 15-20%, Juniper 10-15%, Oak 2-3%. Experimental archaeology shows pine torches burn 35-45 minutes, oak only 15-20 minutes. Seasonal harvesting: autumn wood has highest resin.',
    rewardMultiplier: 2,
    scientificData: {
      species: ['Pinus sylvestris (Scots Pine)', 'Juniperus communis (Juniper)', 'Betula pendula (Birch)'],
      resinContent: 'Pine 15-20%, Juniper 10-15%',
      burnTime: 'Pine: 35-45 min, Juniper: 30-40 min'
    }
  },
  charcoal: {
    name: 'The Fire Master',
    type: 'pyrolysis-control',
    duration: 60,
    badge: 'charcoalCrafter',
    fact: 'Charcoal production through pyrolysis: 300-500°C drives off volatile compounds, leaving 75-85% pure carbon. Too hot (>600°C) = ash. Too cool (<250°C) = incomplete charring. Archaeological charcoal shows consistent 400-450°C production temperature.',
    rewardMultiplier: 2,
    scientificData: {
      chemistry: 'C + heat (300-500°C) → pure carbon',
      optimalTemp: '400-450°C',
      oxygenLevel: 'Limited (5-10% of normal)',
      timeRequired: '6-12 hours for quality charcoal'
    }
  },
  animalFat: {
    name: 'The Provisioner',
    type: 'anatomical-extraction',
    duration: 50,
    badge: 'fatRenderer',
    fact: 'Bone marrow fat (70-80% lipid content) from long bones of reindeer, horse, aurochs. Rendering at 60-80°C liquefies fat without burning. Archaeological residue analysis identifies marrow fat in pigment samples and lamp bowls. Mixed 1:2 with pigment powder.',
    rewardMultiplier: 2,
    scientificData: {
      sources: ['Long bone marrow (70-80% fat)', 'Subcutaneous fat (60-70%)', 'Visceral fat (50-60%)'],
      renderTemp: '60-80°C optimal',
      usageRatio: '1 part fat : 2 parts pigment',
      burnTime: 'Stone lamp: 1-3 hours per filling'
    }
  },
  bone: {
    name: 'The Tool Maker',
    type: 'osteological-crafting',
    duration: 55,
    badge: 'boneArtisan',
    fact: 'Large bird bones (swan, crane, vulture) ideal for spray tubes: hollow, straight, 8-12mm diameter. Experimental replication shows 15-20 minutes crafting time with flint tools. Airflow testing: 15-25 PSI for effective paint atomization.',
    rewardMultiplier: 2,
    scientificData: {
      species: ['Swan ulna', 'Crane tibiotarsus', 'Vulture radius'],
      dimensions: '8-12mm diameter, 15-25cm length',
      crafting: 'Flint saw, abrade edges, hollow cleaning',
      function: 'Paint atomization 15-25 PSI'
    }
  },
  stone: {
    name: 'Light Bringer',
    type: 'lamp-construction',
    duration: 50,
    badge: 'lampMaster',
    fact: 'Stone lamps carved from limestone or sandstone. Shallow bowl (5-8cm diameter, 2-3cm deep) with fat-soaked moss wick. Archaeological examples from Lascaux, La Mouthe, Font-de-Gaume. Burn time: 1-3 hours. Provides stable, warm light (1800K color temperature) ideal for detailed painting work.',
    rewardMultiplier: 2,
    scientificData: {
      stonTypes: ['Limestone (soft, easy carving)', 'Sandstone (heat resistant)'],
      dimensions: '5-8cm diameter, 2-3cm depth',
      wickMaterial: 'Moss, juniper bark, lichen',
      lightOutput: '15-25 lumens, 1800K color temp',
      fuelEfficiency: '10-15ml fat per hour'
    }
  },
  animalHair: {
    name: 'The Fine Artist',
    type: 'brush-fabrication',
    duration: 45,
    badge: 'brushMaker',
    fact: 'Brushes from horse tail hair (50-80 strands), reindeer fur, or ibex hair. Hair properties: horse = stiff (detailed lines), reindeer = soft (blending), ibex = medium. Bound with sinew or plant fiber to wooden handle. Archaeological use-wear analysis confirms brush use at Lascaux.',
    rewardMultiplier: 2,
    scientificData: {
      hairTypes: ['Horse tail (stiff, 0.15mm)', 'Reindeer (soft, 0.08mm)', 'Ibex (medium, 0.12mm)'],
      bundleSize: '50-80 hairs for fine work',
      binding: 'Sinew, plant fiber, resin adhesive',
      lineWidth: 'Horse: 1-3mm, Reindeer: 3-8mm'
    }
  },
  yellowOchre: {
    name: 'The Alchemist',
    type: 'pigment-grinding',
    duration: 50,
    badge: 'pigmentMaster',
    fact: 'Grinding reduces particle size: 100+ microns (gritty) to 10-20 microns (smooth paint). Sandstone grinding stones show characteristic wear patterns. Grinding time: 15-30 minutes for fine powder. Sieving through leather or woven plant material. Storage in shells, hollow bones, or leather pouches.',
    rewardMultiplier: 2,
    scientificData: {
      particleSize: 'Coarse: 100+ microns, Medium: 30-50 microns, Fine: 10-20 microns',
      grindingTime: '15-30 minutes for fine powder',
      toolWear: 'Sandstone shows 2-3mm depression per year',
      qualityTest: 'Smooth between fingers, no grittiness'
    }
  },
  kaolin: {
    name: 'Color Harmony',
    type: 'paint-formulation',
    duration: 40,
    badge: 'paintMixer',
    fact: 'Paint ratios critical: 2 parts pigment : 1 part binder for thick application, 1:1 for thin washes. Viscosity testing: should flow but not drip. Too thick = flaking, too thin = runs. Experimental archaeology replicates exact ratios from residue analysis of archaeological paint samples.',
    rewardMultiplier: 2,
    scientificData: {
      ratios: ['Thick (outlines): 2:1 pigment:fat', 'Medium (filling): 1:1', 'Wash (shading): 1:2'],
      viscosity: '100-300 cP optimal',
      dryTime: '5-15 minutes depending on thickness',
      longevity: 'Proper mix lasts 17,000+ years!'
    }
  },
  torch: {
    name: 'Illumination Strategy',
    type: 'cave-lighting-planning',
    duration: 0, // No time limit for cave lighting planning (player places lamps at their own pace)
    badge: 'lightPlanner',
    fact: 'Cave lighting engineering: Deep chambers (>100m) require multiple light sources. Torch burn rate: 8-12 minutes per 100g bundle. Lamp fuel: 15ml/hour. Smoke management critical in confined spaces. Archaeological soot analysis shows strategic lamp placement. Light needed for 2-4 hour painting sessions.',
    rewardMultiplier: 3,
    scientificData: {
      lightLevels: 'Minimum 15 lux for detailed work, 5 lux for navigation',
      fuelCalculations: 'Torch: 100g = 10 min, Lamp: 15ml = 60 min',
      smokeProduction: 'Torch: 5-8g CO₂/min, Lamp: 1-2g CO₂/min',
      safetyMargin: 'Always bring 30% extra fuel'
    }
  },
  aurochs: {
    name: 'Pattern Master',
    type: 'template-creation',
    duration: 0,
    badge: 'templateMaker',
    fact: 'Magdalenian artists studied animal anatomy extensively. Proportions: Horse 2.5:1 length:height, Aurochs 2.2:1, Bison 2:1. "Twisted perspective" convention: body profile, horns frontal view. Cave wall relief integrated into compositions. Preliminary sketches with charcoal, then outline, then polychrome fill.',
    rewardMultiplier: 2,
    scientificData: {
      proportions: ['Horse: 2.5:1 L:H', 'Aurochs: 2.2:1 L:H', 'Bison: 2:1 L:H'],
      conventions: ['Twisted perspective', 'Profile bodies', 'Dynamic movement'],
      process: ['1. Sketch outline', '2. Charcoal detail', '3. Paint fill', '4. Highlight'],
      accuracy: '95%+ anatomical accuracy documented'
    }
  }
};

const badgeInfo = {
  ochreExpert: { name: 'Ochre Expert', icon: '🔴' },
  manganesemaster: { name: 'Manganese Master', icon: '🟤' },
  woodWhisperer: { name: 'Wood Whisperer', icon: '🪵' },
  charcoalCrafter: { name: 'Charcoal Crafter', icon: '⚫' },
  fatRenderer: { name: 'Fat Renderer', icon: '🥩' },
  boneArtisan: { name: 'Bone Artisan', icon: '🦴' },
  lampMaster: { name: 'Light Bringer', icon: '🪔' },
  brushMaker: { name: 'Brush Maker', icon: '🖌️' },
  pigmentMaster: { name: 'Pigment Alchemist', icon: '⚗️' },
  paintMixer: { name: 'Paint Master', icon: '🎨' },
  lightPlanner: { name: 'Illumination Strategist', icon: '💡' },
  templateMaker: { name: 'Pattern Master', icon: '📐' }
};

// Application Tools
const applicators = {
  finger: { name: 'Finger', icon: '☝️', size: 12, opacity: 0.7, description: 'Broad strokes and dots' },
  brush: { name: 'Brush', icon: '🖌️', size: 3, opacity: 1, requires: 'brush', description: 'Fine lines and details' },
  spray: { name: 'Spray', icon: '💨', size: 25, opacity: 0.3, requires: 'sprayBone', description: 'Diffuse stenciling' }
};

// Codex Content
const codexData = {
  period: `
    <h3>The Magdalenian Period</h3>
    <p><strong>Date:</strong> ~17,000 - 12,000 years ago</p>
    <p><strong>Lascaux Cave:</strong> Painted approximately 17,000 years ago</p>
    <p><strong>Culture:</strong> Late Upper Paleolithic - the peak of Ice Age art</p>
    <p><strong>Location:</strong> Dordogne region, southwestern France</p>
    <h3>Characteristics</h3>
    <ul>
      <li>Peak of Ice Age artistic achievement with sophisticated painting techniques</li>
      <li>Advanced stone and bone tool technology including microliths</li>
      <li>Complex symbolic and religious systems evidenced by cave sanctuaries</li>
      <li>Seasonal migrations following reindeer and horse herds</li>
      <li>Semi-permanent camps with specialized activity areas for tool-making and art</li>
      <li>Evidence of extensive trade networks for quality flint and marine shells</li>
    </ul>
  `,
  pigments: `
    <h3>Prehistoric Pigments</h3>
    <p><strong>Red Ochre (Hematite)</strong> - <span class="formula">Fe₂O₃</span><br>
    Iron-rich clay found in riverbanks and weathered rock. Produces warm red-brown tones ranging from rust to deep burgundy depending on iron content and heating.</p>
    
    <p><strong>Yellow Ochre (Goethite)</strong> - <span class="formula">FeO(OH)</span><br>
    Weathered limestone deposits and iron hydroxide minerals. Creates golden yellow to tan hues. Can be heated to produce red ochre through dehydration.</p>
    
    <p><strong>Charcoal</strong> - <span class="formula">C</span><br>
    Pure carbon from incompletely burnt wood, especially pine and juniper. Provides deep black for outlines and details. Ground finely for paint or used as drawing stick.</p>
    
    <p><strong>Manganese Dioxide</strong> - <span class="formula">MnO₂</span><br>
    Manganese ore from surface deposits. Produces dark brown to black pigments. Often mixed with charcoal for richer tones.</p>
    
    <p><strong>White Calcite</strong> - <span class="formula">CaCO₃</span><br>
    Ground limestone and cave calcite formations. Used for highlights, mixing to lighten colors, and creating subtle tones on dark surfaces.</p>
    
    <h3>Binders</h3>
    <ul>
      <li><strong>Animal fat and marrow:</strong> Primary binder, helps pigment adhere to rock surface</li>
      <li><strong>Blood:</strong> Protein-rich binder, also adds red tint</li>
      <li><strong>Plant saps and resins:</strong> From pine and other conifers, sticky adhesive quality</li>
      <li><strong>Water:</strong> Simple carrier for quick application, less permanent</li>
      <li><strong>Egg:</strong> Protein binder when available</li>
    </ul>
    
    <h3>Processing Methods</h3>
    <p>Pigments were ground using stone pestles and mortars, often leaving distinctive wear patterns on rocks. The powder was then mixed with binders to create paint, stored in shells, hollow bones, or leather pouches.</p>
  `,
  techniques: `
    <h3>Painting Techniques</h3>
    <ul>
      <li><strong>Direct finger application:</strong> The most basic technique - dots, broad areas, initial sketches. Fingerprints visible in some caves.</li>
      <li><strong>Hair brushes:</strong> Made from animal tail or mane hair tied to wooden handles. Used for fine lines, details, manes and tails. Allows fluid, expressive strokes.</li>
      <li><strong>Stenciling:</strong> Hand placed against wall, paint blown around it creating negative image. Also used with leaf shapes.</li>
      <li><strong>Spray/blow technique:</strong> Paint held in mouth or blown through hollow bird bones for diffuse, airbrushed effects. Creates soft gradients and shading.</li>
      <li><strong>Engraving first:</strong> Scratch outline into rock with sharp flint or antler point, then paint within lines for precision.</li>
      <li><strong>Polychrome layering:</strong> Multiple colors applied in sequence. Black outlines first, then red/yellow infill, creating depth and three-dimensionality.</li>
      <li><strong>Using wall relief:</strong> Natural bulges and contours of cave wall integrated into animal bodies, suggesting volume and movement in flickering lamplight.</li>
      <li><strong>Twisted perspective:</strong> Animal shown in profile but with horns/antlers in frontal view - distinctive Paleolithic convention.</li>
    </ul>
    
    <h3>Lighting Systems</h3>
    <p><strong>Stone Lamps:</strong> Shallow limestone bowls filled with animal fat (bear, reindeer) with moss or juniper wick. Burns steadily for 1-3 hours. Provides stable work light.</p>
    
    <p><strong>Torches:</strong> Bundled wood (pine rich in resin) tied with sinew, dipped in fat. Burns 20-40 minutes depending on size. More mobile but creates soot, flickers more.</p>
    
    <p><strong>Light Quality:</strong> Warm orange-yellow light that flickers, making painted animals appear to move on textured walls - likely intentional effect enhancing ritual experience.</p>
    
    <h3>Preservation</h3>
    <p>These paintings survived 17,000 years because caves were sealed by rockfall, maintaining stable temperature and humidity. Minimal air flow prevented mold growth. Discovery and modern visitation threatened preservation, leading to cave closures and replica construction.</p>
  `,
  animals: `
    <h3>Animals Depicted at Lascaux</h3>
    <p>The Lascaux cave contains approximately 600 paintings and 1,500 engravings, representing a remarkable Ice Age bestiary:</p>
    
    <ul>
      <li><strong>Horses:</strong> 90+ representations - most numerous species. Shown in varied poses including running, rearing, pregnant. Primarily Przewalski's wild horse, stocky build with short manes.</li>
      
      <li><strong>Aurochs (Wild Cattle):</strong> 36+ images - most visually dominant. The famous "Hall of Bulls" features massive aurochs up to 17 feet long, the largest known cave paintings. Extinct since 1627, ancestor of domestic cattle.</li>
      
      <li><strong>Red Deer (Stags):</strong> 10+ - important food source. Famous "swimming deer" scene shows heads held high crossing river, antlers swept back. Remarkable naturalistic observation.</li>
      
      <li><strong>Bison:</strong> 9+ - key prey species. Shown with distinctive humped shoulders and shaggy coats. Some in dynamic poses suggesting movement.</li>
      
      <li><strong>Ibex:</strong> 5+ - mountain goats with curved horns. Generally smaller compositions compared to horses and aurochs.</li>
      
      <li><strong>Felines:</strong> 5+ - likely cave lions (now extinct). Shown in profile with distinctive manes. Predators rarely depicted in cave art.</li>
      
      <li><strong>Bear:</strong> 1 representation - Ursus spelaeus (cave bear), extinct around 24,000 years ago.</li>
      
      <li><strong>Rhinoceros:</strong> 1 - woolly rhinoceros in the mysterious "Shaft Scene" only. Two-horned ice age species, now extinct.</li>
      
      <li><strong>Human figure:</strong> 1 - bird-headed stick figure in Shaft Scene, one of very few human representations. Mysterious ritual scene also featuring wounded bison and rhinoceros.</li>
    </ul>
    
    <h3>Notable Chambers</h3>
    <ul>
      <li><strong>Hall of Bulls (Great Hall of Aurochs):</strong> Massive aurochs compositions, cave's most famous images</li>
      <li><strong>Axial Gallery:</strong> "Sistine Chapel of Prehistory" - horses, aurochs, and deer in elaborate compositions</li>
      <li><strong>The Shaft:</strong> Mysterious scene with wounded bison, bird-headed human, rhinoceros, and bird on stick</li>
      <li><strong>The Nave:</strong> Main corridor with multiple species and overlapping compositions</li>
      <li><strong>Chamber of Felines:</strong> Rare predator depictions</li>
      <li><strong>The Apse:</strong> Dense concentration of over 1,000 overlapping engravings</li>
    </ul>
    
    <h3>Why These Animals?</h3>
    <p>Not simply depicting food sources - carnivores and dangerous animals included. More likely representing symbolic/spiritual significance, shamanic visions, or mythological narratives we can no longer fully understand. The consistent artistic conventions across centuries suggest shared cultural meanings.</p>
  `,
  gallery: `
    <h3>Lascaux Cave - Artistic Masterworks</h3>
    
    <p><strong>Discovery:</strong> September 12, 1940 by four teenagers following their dog into a hole left by a fallen tree. One of the most significant archaeological discoveries of the 20th century.</p>
    
    <h3>The Art</h3>
    <p>Lascaux represents the apex of Paleolithic artistic achievement. The paintings demonstrate:</p>
    <ul>
      <li>Sophisticated understanding of anatomy and movement</li>
      <li>Mastery of perspective and foreshortening</li>
      <li>Complex color blending and shading techniques</li>
      <li>Integration of natural rock features into compositions</li>
      <li>Evidence of preliminary sketching and planning</li>
      <li>Multiple visits and additions over time</li>
    </ul>
    
    <h3>Polychrome Technique</h3>
    <p>Many animals rendered in multiple colors (polychrome):</p>
    <ul>
      <li>Black charcoal outlines defining form</li>
      <li>Red and yellow ochre for body color and shading</li>
      <li>Manganese brown for depth and detail</li>
      <li>White calcite for highlights and modeling</li>
      <li>Colors layered to create three-dimensional effect</li>
    </ul>
    
    <h3>Preservation Crisis</h3>
    <p>Cave opened to public in 1948. By 1955, carbon dioxide from 1,200 daily visitors caused algae and crystal growth - "green sickness" and "white sickness" threatening paintings. Cave closed to public 1963. Climate control systems installed. Lascaux II (1983) and Lascaux IV (2016) are detailed replicas allowing public access while protecting originals.</p>
    
    <h3>Scientific Studies</h3>
    <ul>
      <li><strong>Radiocarbon dating:</strong> Charcoal pigments dated to ~17,000 years ago</li>
      <li><strong>Pigment analysis:</strong> X-ray fluorescence identifies mineral compositions</li>
      <li><strong>Tool marks:</strong> Engraving techniques studied microscopically</li>
      <li><strong>Lamp soot analysis:</strong> Reveals types of fuel used for lighting</li>
      <li><strong>3D scanning:</strong> Modern technology creating detailed digital preservation</li>
    </ul>
    
    <h3>Cultural Significance</h3>
    <p>Lascaux demonstrates that Magdalenian humans possessed:</p>
    <ul>
      <li>Abstract thinking and symbolic representation</li>
      <li>Sophisticated artistic traditions passed through generations</li>
      <li>Complex spiritual or ritual practices</li>
      <li>Specialized roles in society (artists, tool-makers)</li>
      <li>Deep observation of and connection to natural world</li>
    </ul>
  `
};

// ========================================
// INITIALIZATION
// ========================================

window.addEventListener('DOMContentLoaded', () => {
  try {
    initTitleScreen();
    initNavigation();
    initLandscapeScene();
    initWorkshopScene();
    initCaveScene();
    initModals();
    updateBadges();
    createFloatingParticles();
    updateUI();
    loadGameState(); // Load saved progress
    initSoundSystem();
    initKeyboardNavigation(); // Add keyboard shortcuts
  } catch (error) {
    console.error('Initialization error:', error);
    showNotification('⚠️ Error loading game. Please refresh the page.', 5000);
  }
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================

function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Ignore if typing in input or modal is open
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (document.querySelector('.modal-overlay')) return;
    
    switch(e.key) {
      case '1':
        e.preventDefault();
        switchScene('landscape');
        break;
      case '2':
        e.preventDefault();
        switchScene('workshop');
        break;
      case '3':
        e.preventDefault();
        switchScene('cave');
        break;
      case 'h':
      case 'H':
        e.preventDefault();
        document.getElementById('help-btn').click();
        break;
      case 'c':
      case 'C':
        e.preventDefault();
        document.getElementById('codex-btn').click();
        break;
      case 'i':
      case 'I':
        e.preventDefault();
        document.getElementById('inventory-btn').click();
        break;
      case 's':
      case 'S':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          saveGameState();
          showNotification('💾 Game saved!', 2000);
        }
        break;
      case 'Escape':
        e.preventDefault();
        // Close any open modals
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
          activeModal.classList.remove('active');
        }
        break;
    }
  });
}

// ========================================
// SAVE/LOAD SYSTEM
// ========================================

function saveGameState() {
  try {
    const saveData = {
      inventory: gameState.inventory,
      tools: gameState.tools,
      paints: gameState.paints,
      badges: gameState.badges,
      hasLight: gameState.hasLight,
      xp: gameState.xp || 0,
      timestamp: Date.now()
    };
    localStorage.setItem('magdalenianGame', JSON.stringify(saveData));
  } catch (error) {
    console.warn('Could not save game:', error);
  }
}

function loadGameState() {
  try {
    const saved = localStorage.getItem('magdalenianGame');
    if (saved) {
      const data = JSON.parse(saved);
      gameState.inventory = data.inventory || {};
      gameState.tools = data.tools || {};
      gameState.paints = data.paints || {};
      gameState.badges = data.badges || {};
      gameState.hasLight = data.hasLight || false;
      gameState.xp = data.xp || 0;
      
      updateUI();
      updateBadges();
      renderCraftingUI();
      
      // Show notification about loaded progress
      const timeSince = Math.floor((Date.now() - data.timestamp) / 1000 / 60);
      showNotification(`✓ Progress loaded (${timeSince} minutes ago)`, 3000);
      
        // If a developer unlock flag exists, apply it so the dev unlock persists across reloads
        try {
          const devFlag = localStorage.getItem('tmcae_dev_unlock');
          if (devFlag === 'true') {
            // applyDevUnlock will update UI and save state
            applyDevUnlock();
          }
        } catch (e) { /* ignore */ }
    }
  } catch (error) {
    console.warn('Could not load saved game:', error);
  }
}

function resetGameState() {
  if (confirm('Reset all progress? This cannot be undone.')) {
    localStorage.removeItem('magdalenianGame');
    location.reload();
  }
}

// Developer unlock helpers
function applyDevUnlock() {
  try {
    // Grant all badges
    Object.keys(gameState.badges).forEach(k => gameState.badges[k] = true);

    // Grant all tools
    Object.keys(toolRecipes).forEach(k => gameState.tools[k] = true);

    // Grant all paints
    Object.keys(paintRecipes).forEach(k => gameState.paints[k] = Object.assign({ key: k }, paintRecipes[k]));

    // Fill inventory with large counts
    Object.keys(materials).forEach(k => gameState.inventory[k] = Math.max(gameState.inventory[k] || 0, 99));

    // Unlock light and give lots of XP
    gameState.hasLight = true;
    gameState.xp = Math.max(gameState.xp || 0, 9999);

    // Persist a flag so it survives reloads
    try { localStorage.setItem('tmcae_dev_unlock', 'true'); } catch (e) { /* ignore */ }

    // Update UI and save
    updateUI();
    updateBadges();
    renderCraftingUI();
    saveGameState();

    // Show confirmation
    showNotification('🛠️ Developer code accepted — all badges, tools and paints unlocked. Cave access granted.', 4000);

    // Reveal reset button if present
    const resetBtn = document.getElementById('dev-reset-btn');
    if (resetBtn) resetBtn.style.display = 'block';
  } catch (e) {
    console.error('applyDevUnlock error', e);
    showNotification('⚠️ Could not apply developer unlock.', 3000);
  }
}

function removeDevUnlock() {
  try {
    // Clear the developer unlock flag and reset progress to an empty state (but keep localStorage safe)
    try { localStorage.removeItem('tmcae_dev_unlock'); } catch (e) { /* ignore */ }

    // Reset badges/tools/paints/inventory to empty objects (keeps structure)
    Object.keys(gameState.badges).forEach(k => gameState.badges[k] = false);
    Object.keys(gameState.tools).forEach(k => gameState.tools[k] = false);
    gameState.paints = {};
    gameState.inventory = {};
    gameState.hasLight = false;
    gameState.xp = 0;

    saveGameState();
    updateUI();
    updateBadges();
    renderCraftingUI();

    showNotification('🔁 Developer unlock removed. Progress reset (you can load a previous save if available).', 3500);
    const resetBtn = document.getElementById('dev-reset-btn');
    if (resetBtn) resetBtn.style.display = 'none';
  } catch (e) {
    console.error('removeDevUnlock error', e);
    showNotification('⚠️ Could not remove developer unlock.', 3000);
  }
}

// ========================================
// SOUND SYSTEM (Placeholder for future audio)
// ========================================

const sounds = {
  gather: () => playSound('gather'),
  craft: () => playSound('craft'),
  paint: () => playSound('paint'),
  success: () => playSound('success'),
  click: () => playSound('click'),
  ambient: () => playSound('ambient')
};

// Global audio resources
const AudioAssets = {
  click: 'SoundsForTMCAE/General/rockclick.wav',
  ambient: 'SoundsForTMCAE/General/audiotrack.mp3'
};

// Preload click audio (single node to clone for overlapping plays)
let _clickAudio = null;
try {
  _clickAudio = new Audio(AudioAssets.click);
  _clickAudio.preload = 'auto';
  // small volume default
  _clickAudio.volume = 0.7;
} catch (e) {
  console.warn('Could not preload click audio:', e);
}

// Ambient soundtrack (plays outside mini-games)
let _ambientAudio = null;
try {
  _ambientAudio = new Audio(AudioAssets.ambient);
  _ambientAudio.preload = 'auto';
  _ambientAudio.loop = true;
  _ambientAudio.volume = 0.45;
} catch (e) {
  console.warn('Could not preload ambient audio:', e);
}

// Sound settings persisted in localStorage
let soundSettings = {
  master: true,
  soundtrack: false, // default soundtrack disabled per user request
  click: true,
  masterVolume: 1.0,
  soundtrackVolume: 0.45
};

function loadSoundSettings() {
  try {
    const raw = localStorage.getItem('tmcae_sound_settings');
    if (raw) {
      const s = JSON.parse(raw);
      soundSettings = Object.assign(soundSettings, s);
      // Ensure new fields exist with sane defaults when upgrading older saves
      if (typeof soundSettings.masterVolume !== 'number') soundSettings.masterVolume = 1.0;
      if (typeof soundSettings.soundtrackVolume !== 'number') soundSettings.soundtrackVolume = 0.45;
      if (typeof soundSettings.soundtrack !== 'boolean') soundSettings.soundtrack = false;
    }
  } catch (e) { console.warn('Could not load sound settings', e); }
}

function saveSoundSettings() {
  try { localStorage.setItem('tmcae_sound_settings', JSON.stringify(soundSettings)); } catch (e) { console.warn('Could not save sound settings', e); }
}

function applySoundSettings() {
  try {
    // Ambient track muted if master or soundtrack disabled
    if (_ambientAudio) {
      _ambientAudio.muted = !soundSettings.master || !soundSettings.soundtrack;
      // Set volume according to master * soundtrack volume settings
      try {
        const mv = (typeof soundSettings.masterVolume === 'number') ? soundSettings.masterVolume : 1.0;
        const sv = (typeof soundSettings.soundtrackVolume === 'number') ? soundSettings.soundtrackVolume : 0.45;
        _ambientAudio.volume = Math.max(0, Math.min(1, mv * sv));
      } catch (e) { /* ignore volume set errors */ }
      if (!_ambientAudio.muted && !_ambientAudio.paused && _ambientAudio.currentTime === 0) {
        // ensure it can play
        _ambientAudio.play().catch(() => {});
      }
    }
  } catch (e) { /* swallow */ }
}

function updateAmbientPlayback() {
  // Start ambient if no mini-game active and settings allow it
  try {
    if (!soundSettings.master || !soundSettings.soundtrack) {
      if (_ambientAudio && !_ambientAudio.paused) _ambientAudio.pause();
      return;
    }

    if (miniGameState && miniGameState.active) {
      // pause during mini-games
      if (_ambientAudio && !_ambientAudio.paused) _ambientAudio.pause();
      return;
    }

    // Otherwise, play if available
    if (_ambientAudio) {
      if (_ambientAudio.paused) {
        _ambientAudio.currentTime = 0;
        _ambientAudio.play().catch(() => {});
      }
      _ambientAudio.muted = false;
    }
  } catch (e) { console.warn('Ambient playback error', e); }
}

function pauseAmbient() {
  try { if (_ambientAudio && !_ambientAudio.paused) _ambientAudio.pause(); } catch (e) {}
}

function resumeAmbient() {
  try { if (_ambientAudio && _ambientAudio.paused && soundSettings.master && soundSettings.soundtrack) _ambientAudio.play().catch(() => {}); } catch (e) {}
}

function createSoundSettingsUI() {
  try {
    // Small gear button
    if (document.getElementById('sound-settings-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'sound-settings-btn';
    btn.title = 'Sound Settings';
    // Use the same icon button styling as the other nav icons so it matches visually
    btn.className = 'icon-btn sound-settings';
    // keep only the positioning inline so we don't overwrite the shared icon styles
    btn.style.cssText = 'position: fixed; right: 12px; bottom: 12px; z-index:120;';
    btn.innerHTML = '⚙️';
    document.body.appendChild(btn);

    const panel = document.createElement('div');
    panel.id = 'sound-settings-panel';
    // place panel above the gear button in bottom-right
    panel.style.cssText = 'position: fixed; right: 12px; bottom: 60px; z-index:121; background: rgba(0,0,0,0.9); color: white; padding: 10px; border-radius:8px; min-width:220px; display:none; box-shadow:0 8px 30px rgba(0,0,0,0.6);';
    panel.innerHTML = `
      <div style="font-weight:bold; margin-bottom:8px;">Sound Settings</div>
      <label style="display:block;margin-bottom:6px;"><input type="checkbox" id="ss-master"> Master</label>
      <label style="display:block;margin-bottom:6px;"><input type="checkbox" id="ss-soundtrack"> Soundtrack</label>
      <label style="display:block;margin-bottom:6px;"><input type="checkbox" id="ss-click"> Clicks</label>
      <div style="margin-top:8px;">
        <label style="display:block; font-size:0.9rem; margin-bottom:6px;">Master Volume<br><input type="range" id="ss-master-volume" min="0" max="1" step="0.01" value="1" style="width:100%;"></label>
        <label style="display:block; font-size:0.9rem; margin-bottom:6px;">Soundtrack Volume<br><input type="range" id="ss-soundtrack-volume" min="0" max="1" step="0.01" value="0.45" style="width:100%;"></label>
      </div>
      <div style="margin-top:8px; font-size:0.85rem; color: #ccc;">Settings persist in your browser.</div>

      <div style="margin-top:10px; border-top:1px solid rgba(255,255,255,0.06); padding-top:8px;">
        <div style="font-weight:bold; margin-bottom:6px;">Developer</div>
        <input id="dev-code-input" placeholder="Enter developer code" style="width:100%; padding:6px; margin-bottom:6px; box-sizing:border-box;">
        <button id="dev-apply-btn" style="width:100%; padding:6px; margin-bottom:6px;">Apply Code</button>
        <button id="dev-reset-btn" style="width:100%; padding:6px; margin-bottom:6px; display:none; background:#6a6a6a;">Reset Dev Unlock</button>
        <div id="dev-help" style="font-size:0.8rem; color:#ccc; margin-top:6px;">Enter the developer code to unlock all badges, tools, paints, and the cave.</div>
      </div>
    `;
    document.body.appendChild(panel);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      // sync checkboxes and sliders
      try {
        document.getElementById('ss-master').checked = !!soundSettings.master;
        document.getElementById('ss-soundtrack').checked = !!soundSettings.soundtrack;
        document.getElementById('ss-click').checked = !!soundSettings.click;
        const mvEl = document.getElementById('ss-master-volume');
        const svEl = document.getElementById('ss-soundtrack-volume');
        if (mvEl) mvEl.value = (typeof soundSettings.masterVolume === 'number') ? soundSettings.masterVolume : 1.0;
        if (svEl) svEl.value = (typeof soundSettings.soundtrackVolume === 'number') ? soundSettings.soundtrackVolume : 0.45;
      } catch (e) { /* ignore sync errors */ }
    });

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && e.target !== btn) panel.style.display = 'none';
    });

    document.getElementById('ss-master').addEventListener('change', (e) => {
      soundSettings.master = e.target.checked;
      saveSoundSettings();
      applySoundSettings();
      updateAmbientPlayback();
    });
    document.getElementById('ss-soundtrack').addEventListener('change', (e) => {
      soundSettings.soundtrack = e.target.checked;
      saveSoundSettings();
      applySoundSettings();
      updateAmbientPlayback();
    });
    document.getElementById('ss-click').addEventListener('change', (e) => {
      soundSettings.click = e.target.checked;
      saveSoundSettings();
    });

    // Volume sliders
    const mvEl = document.getElementById('ss-master-volume');
    const svEl = document.getElementById('ss-soundtrack-volume');
    if (mvEl) {
      mvEl.addEventListener('input', (e) => {
        soundSettings.masterVolume = parseFloat(e.target.value);
        saveSoundSettings();
        applySoundSettings();
        updateAmbientPlayback();
      });
    }
    if (svEl) {
      svEl.addEventListener('input', (e) => {
        soundSettings.soundtrackVolume = parseFloat(e.target.value);
        saveSoundSettings();
        applySoundSettings();
        updateAmbientPlayback();
      });
    }
    // Developer code controls
    try {
      const devInput = document.getElementById('dev-code-input');
      const devBtn = document.getElementById('dev-apply-btn');
      const devReset = document.getElementById('dev-reset-btn');

      if (devBtn && devInput) {
        devBtn.addEventListener('click', () => {
          const code = (devInput.value || '').trim();
          if (code === 'Febamse') {
            applyDevUnlock();
          } else {
            showNotification('❌ Invalid developer code.', 2000);
          }
        });
      }

      if (devReset) {
        devReset.addEventListener('click', () => {
          if (confirm('Remove developer unlock and reset progress?')) {
            removeDevUnlock();
          }
        });

        // Show reset button if previously unlocked
        try {
          const unlocked = localStorage.getItem('tmcae_dev_unlock');
          if (unlocked === 'true') devReset.style.display = 'block';
        } catch (e) { /* ignore */ }
      }
    } catch (e) { /* ignore developer UI hookup errors */ }
  } catch (e) { console.warn('Could not create sound settings UI', e); }
}

function initSoundSystem() {
  loadSoundSettings();
  applySoundSettings();
  createSoundSettingsUI();
  // Start ambient if appropriate
  setTimeout(updateAmbientPlayback, 120);
}

function playSound(name) {
  try {
    // Respect master toggle
    if (typeof soundSettings !== 'undefined' && !soundSettings.master) return;

    if (name === 'click') {
      if (typeof soundSettings !== 'undefined' && !soundSettings.click) return;
      if (_clickAudio) {
        // clone to allow overlapping clicks
        const a = _clickAudio.cloneNode();
        // Respect master volume for clicks
        const mv = (typeof soundSettings.masterVolume === 'number') ? soundSettings.masterVolume : 1.0;
        a.volume = 0.7 * mv;
        a.play().catch(() => {});
      }
      return;
    }

    // Other named sounds (future): play if allowed by master
    if (name === 'ambient') {
      // Ambient playback managed separately; keep this a no-op
      return;
    }
    // Fallback: no-op for unregistered sounds
  } catch (e) {
    // ignore audio errors
  }
}

// Delegate clicks to play UI click sound for interactive elements
document.addEventListener('click', (e) => {
  try {
    // don't trigger when interacting with the 3D cave painter iframe
    if (e.target && (e.target.id === 'cave-painter-frame' || e.target.closest && e.target.closest('#cave-painter-frame'))) return;

    const el = e.target;
    // Determine if the clicked element is a UI button/control
    const tag = (el.tagName || '').toUpperCase();
    const isButtonTag = tag === 'BUTTON' || tag === 'INPUT' && (el.type === 'button' || el.type === 'submit');
    const hasBtnClass = el.className && /\b(btn|btn-primary|btn-secondary|gather-btn|craft-card|place-lamp-btn|minigame-fire)\b/.test(el.className);
    const roleButton = el.getAttribute && el.getAttribute('role') === 'button';

    // Also play click sound for any click inside modal dialogs (including the mini-game modal)
    const inModal = e.target.closest && (e.target.closest('#minigame-modal') || e.target.closest('.modal'));

    if (isButtonTag || hasBtnClass || roleButton || inModal) {
      // play click sound
      sounds.click();
    }
  } catch (err) {
    // swallow
  }
}, true);

// Listen for messages from cave painter iframe to handle click sounds
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'caveClickSound') {
    // Only play click sound if allowed by the cave painter
    if (event.data.enabled) {
      sounds.click();
    }
  }
});

// ========================================
// TITLE SCREEN
// ========================================

const tutorialSteps = [
  {
    title: 'Welcome to 17,000 BCE',
    text: 'You are a Magdalenian artist during the peak of Ice Age art. Your mission is to create authentic cave paintings using period-accurate techniques and materials.'
  },
  {
    title: '🌄 Step 1: Gather Materials',
    text: 'Start by gathering raw materials from the landscape. Click on glowing spots to collect ochre, charcoal, wood, and other resources. Some materials trigger educational mini-games!'
  },
  {
    title: '⚒️ Step 2: Craft Tools & Paints',
    text: 'Visit the Workshop to combine materials. Mix pigments with animal fat to create paints. Craft brushes, torches, and lamps from gathered resources.'
  },
  {
    title: '🕳️ Step 3: Paint in the Cave',
    text: 'Enter the sacred cave (requires light!). Select your paints and tools, then create authentic prehistoric art. Use templates to help draw accurate animal figures.'
  },
  {
    title: 'Ready to Begin!',
    text: 'Press H for help, C for the Codex (information library), and Ctrl+S to save. Your progress auto-saves when you gather or craft. Good luck, artist!'
  }
];

let currentTutorialStep = 0;

function initTitleScreen() {
  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', () => {
    // Check if first time playing
    const hasSeenTutorial = localStorage.getItem('magdalenianTutorialSeen');
    
    if (!hasSeenTutorial) {
      showTutorial();
    } else {
      startGame();
    }
  });
}

function showTutorial() {
  const overlay = document.getElementById('tutorial-overlay');
  overlay.style.display = 'flex';
  currentTutorialStep = 0;
  updateTutorialStep();
  
  document.getElementById('tutorial-next').addEventListener('click', nextTutorialStep);
  document.getElementById('tutorial-skip').addEventListener('click', skipTutorial);
}

function updateTutorialStep() {
  const step = tutorialSteps[currentTutorialStep];
  document.getElementById('tutorial-title').textContent = step.title;
  document.getElementById('tutorial-text').textContent = step.text;
  
  const nextBtn = document.getElementById('tutorial-next');
  if (currentTutorialStep === tutorialSteps.length - 1) {
    nextBtn.textContent = 'Start Creating!';
  } else {
    nextBtn.textContent = 'Next';
  }
}

function nextTutorialStep() {
  currentTutorialStep++;
  
  if (currentTutorialStep >= tutorialSteps.length) {
    finishTutorial();
  } else {
    updateTutorialStep();
  }
}

function skipTutorial() {
  finishTutorial();
}

function finishTutorial() {
  localStorage.setItem('magdalenianTutorialSeen', 'true');
  document.getElementById('tutorial-overlay').style.display = 'none';
  startGame();
}

function startGame() {
  showNotification('Welcome to The Magdalenian Cave Art Experience! Gather materials from the landscape.', 4000);
  switchToScene('landscape');
}

function createFloatingParticles() {
  const container = document.getElementById('title-particles');
  if (!container) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.background = ['#DAA520', '#8B4513', '#CD853F'][Math.floor(Math.random() * 3)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(particle);
  }
  
  // Add CSS animation dynamically
  if (!document.getElementById('particle-animation')) {
    const style = document.createElement('style');
    style.id = 'particle-animation';
    style.textContent = `
      @keyframes floatParticle {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-40px) translateX(-10px); }
        75% { transform: translateY(-20px) translateX(5px); }
      }
    `;
    document.head.appendChild(style);
  }
}

// ========================================
// SCENE MANAGEMENT
// ========================================

function switchToScene(sceneName) {
  // Hide title screen
  const titleScreen = document.getElementById('title-screen');
  const gameScreen = document.getElementById('game-screen');
  
  if (sceneName !== 'title') {
    titleScreen.classList.remove('active');
    gameScreen.classList.add('active');
  }
  
  // Update scene
  gameState.scene = sceneName;
  
  // Hide all scenes
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  
  // Show target scene
  const sceneMap = {
    landscape: 'landscape-scene',
    workshop: 'workshop-scene',
    cave: 'cave-scene'
  };
  
  const sceneId = sceneMap[sceneName];
  if (sceneId) {
    document.getElementById(sceneId).classList.add('active');
  }
  
  // Sync state to cave painter when entering cave
  if (sceneName === 'cave') {
    setTimeout(() => syncGameStateToCavePainter(), 100);
  }
  
  // Update nav buttons with ARIA states
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });
  const activeBtn = document.getElementById(`nav-${sceneName}`);
  activeBtn.classList.add('active');
  activeBtn.setAttribute('aria-pressed', 'true');
  
  updateUI();
}

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
  document.getElementById('nav-landscape').addEventListener('click', () => {
    switchToScene('landscape');
    showNotification('Gathering Area - Click glowing spots to collect materials', 2000);
  });
  
  document.getElementById('nav-workshop').addEventListener('click', () => {
    switchToScene('workshop');
    showNotification('Processing Workshop - Combine materials to create paints and tools', 2000);
  });
  
  document.getElementById('nav-cave').addEventListener('click', () => {
    // Check both requirements
    const requiredBadges = [
      'ochreExpert', 'manganesemaster', 'woodWhisperer', 'charcoalCrafter',
      'fatRenderer', 'boneArtisan', 'lampMaster', 'brushMaker',
      'pigmentMaster', 'paintMixer', 'lightPlanner', 'templateMaker'
    ];
    
    const incompleteBadges = requiredBadges.filter(badge => !gameState.badges[badge]);
    const hasLight = gameState.hasLight;
    const allBadgesComplete = incompleteBadges.length === 0;
    
    // Show appropriate message based on what's missing
    if (!hasLight && !allBadgesComplete) {
      const badgeCount = requiredBadges.length - incompleteBadges.length;
      showNotification(`⚠️ To enter the cave you need:\n1. A LIGHT SOURCE (torch/lamp)\n2. All 12 challenges completed (${badgeCount}/12 done)`, 4500);
      document.getElementById('nav-cave').classList.add('shake');
      setTimeout(() => {
        document.getElementById('nav-cave').classList.remove('shake');
      }, 500);
      return;
    }
    
    if (!hasLight) {
      showNotification('⚠️ You need a LIGHT SOURCE (torch or lamp) to enter the cave! Craft one in the Workshop.', 3000);
      document.getElementById('nav-cave').classList.add('shake');
      setTimeout(() => {
        document.getElementById('nav-cave').classList.remove('shake');
      }, 500);
      return;
    }
    
    if (!allBadgesComplete) {
      const badgeNames = incompleteBadges.map(badge => badgeInfo[badge].name).join(', ');
      showNotification(`⚠️ Complete all 12 challenges first! Missing: ${badgeNames}`, 4500);
      document.getElementById('nav-cave').classList.add('shake');
      setTimeout(() => {
        document.getElementById('nav-cave').classList.remove('shake');
      }, 500);
      return;
    }
    
    // All requirements met - enter cave!
    switchToScene('cave');
    showNotification('🎨 3D Cave - Paint on the ancient wall! Use WASD to move, mouse to look around.', 3000);
  });
}

// ========================================
// LANDSCAPE SCENE
// ========================================

function initLandscapeScene() {
  const gatheringSpots = document.querySelector('.gathering-spots');
  
  const materialsList = [
    { key: 'redOchre', label: 'Red Ochre', hasGame: true },
    { key: 'yellowOchre', label: 'Yellow Ochre', hasGame: true },
    { key: 'charcoal', label: 'Charcoal', hasGame: true },
    { key: 'manganese', label: 'Manganese', hasGame: true },
    { key: 'kaolin', label: 'Kaolin', hasGame: true },
    { key: 'animalFat', label: 'Animal Fat', hasGame: true },
    { key: 'bone', label: 'Bone', hasGame: true },
    { key: 'wood', label: 'Wood', hasGame: true },
    { key: 'stone', label: 'Stone', hasGame: true },
    { key: 'animalHair', label: 'Hair', hasGame: true },
    { key: 'torch', label: 'Torch Plan', hasGame: true },
    { key: 'aurochs', label: 'Template', hasGame: true }
  ];
  
  materialsList.forEach(mat => {
    const btn = document.createElement('button');
    btn.className = 'gather-btn pop-in';
    btn.dataset.material = mat.key;
    
    const material = materials[mat.key] || { icon: mat.key === 'torch' ? '💡' : '📐', name: mat.label };
    
    // For charcoal and manganese, render colored circles instead of emojis
    let iconHTML = '';
    if (mat.key === 'charcoal') {
      iconHTML = `<div class="gather-icon" style="display: inline-block; width: 3rem; height: 3rem; background: radial-gradient(circle at 30% 30%, #3a3a38, #100c08 50%, #000000); border-radius: 50%; filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));"></div>`;
    } else if (mat.key === 'manganese') {
      iconHTML = `<div class="gather-icon" style="display: inline-block; width: 3rem; height: 3rem; background: radial-gradient(circle at 30% 30%, #4a4a48, #1B1B1B 50%, #000000); border-radius: 50%; filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));"></div>`;
    } else {
      iconHTML = `<div class="gather-icon">${material.icon}</div>`;
    }
    
    btn.innerHTML = `
      ${iconHTML}
      <div class="gather-label">${mat.label}</div>
    `;
    
    if (mat.hasGame) {
      btn.style.background = 'radial-gradient(circle, rgba(76, 175, 80, 0.3) 0%, transparent 70%)';
      btn.style.borderColor = '#4CAF50';
    }
    
    btn.addEventListener('click', () => {
      gameState.currentGatherMaterial = mat.key;
      gameState.currentGatherButton = btn;
      startMiniGame(mat.key);
    });
    gatheringSpots.appendChild(btn);
  });
  
  // Initialize dynamic landscape effects
  initDynamicLandscape();
}

// ========================================
// DYNAMIC WEATHER & DAY/NIGHT SYSTEM
// ========================================

let weatherInterval;
let dayNightInterval;

function initDynamicLandscape() {
  // Add grass blades
  const grassLayer = document.querySelector('.grass-layer');
  if (grassLayer) {
    for (let i = 0; i < 50; i++) {
      const blade = document.createElement('div');
      blade.className = 'grass-blade';
      blade.style.height = `${15 + Math.random() * 10}px`;
      blade.style.left = `${Math.random() * 100}%`;
      blade.style.animationDelay = `${Math.random() * 3}s`;
      grassLayer.appendChild(blade);
    }
  }

  // Add trees to mid-hill layer

  const treeMidLayer = document.querySelector('.tree-layer-mid');
  if (treeMidLayer) {
    const midTreePositions = [8, 25, 45, 62, 78, 92];
    midTreePositions.forEach(pos => {
      const tree = createTree('distant');
      tree.style.left = `${pos}%`;
      tree.style.bottom = `${10 + Math.random() * 20}%`;
      treeMidLayer.appendChild(tree);
    });
  }

  // Add trees to front layer
  const treeFrontLayer = document.querySelector('.tree-layer-front');
  if (treeFrontLayer) {
    const frontTreePositions = [3, 15, 28, 52, 68, 85, 95];
    frontTreePositions.forEach(pos => {
      const sizes = ['small', 'medium', 'large'];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const tree = createTree(size);
      tree.style.left = `${pos}%`;
      tree.style.bottom = '10%';
      treeFrontLayer.appendChild(tree);
    });
  }

  // Add more stars
  const starsContainer = document.querySelector('.stars');
  if (starsContainer) {
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.textContent = '✦';
      star.style.position = 'absolute';
      star.style.top = `${Math.random() * 50}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.color = 'rgba(255, 255, 255, 0.8)';
      star.style.fontSize = `${8 + Math.random() * 6}px`;
      star.style.animation = `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      starsContainer.appendChild(star);
    }
  }

  // Day/Night cycle (changes every 2 minutes)
  dayNightInterval = setInterval(() => {
    const landscape = document.getElementById('landscape-scene');
    if (landscape && landscape.classList.contains('active')) {
      landscape.classList.toggle('night-mode');
    }
  }, 120000); // 2 minutes

  // Weather system (random weather changes)
  weatherInterval = setInterval(() => {
    const landscape = document.getElementById('landscape-scene');
    if (landscape && landscape.classList.contains('active')) {
      const shouldRain = Math.random() > 0.7;
      
      if (shouldRain && !landscape.classList.contains('rainy-mode')) {
        startRain(landscape);
      } else if (!shouldRain && landscape.classList.contains('rainy-mode')) {
        stopRain(landscape);
      }
    }
  }, 45000); // Check every 45 seconds
}

function createTree(size) {
  const tree = document.createElement('div');
  tree.className = `tree ${size}`;
  
  const trunk = document.createElement('div');
  trunk.className = 'tree-trunk';
  
  const foliage = document.createElement('div');
  foliage.className = 'tree-foliage';
  
  tree.appendChild(trunk);
  tree.appendChild(foliage);
  
  return tree;
}

function startRain(landscape) {
  landscape.classList.add('rainy-mode');
  const rainContainer = landscape.querySelector('.rain-container');
  
  // Create rain drops
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    rainContainer.appendChild(drop);
  }
}

function stopRain(landscape) {
  landscape.classList.remove('rainy-mode');
  const rainContainer = landscape.querySelector('.rain-container');
  rainContainer.innerHTML = '';
}

// Clean up intervals when leaving
function cleanupDynamicLandscape() {
  if (weatherInterval) clearInterval(weatherInterval);
  if (dayNightInterval) clearInterval(dayNightInterval);
}

// Quick gather removed - all gathering now requires mini-games!

function gatherMaterial(materialKey, buttonElement, multiplier = 1) {
  try {
    // Check if this is a failed attempt (multiplier = 0)
    if (multiplier === 0) {
      const material = materials[materialKey];
      showNotification(`❌ Failed! Collected 0 ${material.name}`, 2000);
      return;
    }
    
    // Add to inventory
    if (!gameState.inventory[materialKey]) {
      gameState.inventory[materialKey] = 0;
    }
    gameState.inventory[materialKey] += multiplier;
    
    // Sound effect
    sounds.gather();
    
    // Visual feedback
    const material = materials[materialKey];
    const bonusText = multiplier > 1 ? ` +${multiplier}x BONUS!` : '';
    showNotification(`✅ Collected ${material.name}!${bonusText} (Total: ${gameState.inventory[materialKey]})`, 2000);
    
    // Particle burst
    const rect = buttonElement.getBoundingClientRect();
    createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, material.color || '#DAA520', 15);
    
    // Update UI
    updateUI();
    saveGameState(); // Auto-save
    
    // Helpful hints
    const totalMaterials = Object.keys(gameState.inventory).length;
    if (totalMaterials === 3) {
      setTimeout(() => {
        showNotification('💡 Great start! Visit the Workshop to craft paints and tools.', 3000);
      }, 2000);
    }
  } catch (error) {
    console.error('Error gathering material:', error);
    showNotification('⚠️ Error collecting material. Please try again.', 2000);
  }
}

// ========================================
// WORKSHOP SCENE
// ========================================

function initWorkshopScene() {
  renderCraftingUI();
}

function renderCraftingUI() {
  const paintContainer = document.getElementById('paint-recipes');
  const toolContainer = document.getElementById('tool-recipes');
  
  // Render paint recipes
  paintContainer.innerHTML = '';
  Object.keys(paintRecipes).forEach(key => {
    const recipe = paintRecipes[key];
    const card = createCraftCard(key, recipe, 'paint');
    paintContainer.appendChild(card);
  });
  
  // Render tool recipes
  toolContainer.innerHTML = '';
  Object.keys(toolRecipes).forEach(key => {
    const recipe = toolRecipes[key];
    const card = createCraftCard(key, recipe, 'tool');
    toolContainer.appendChild(card);
  });
}

function createCraftCard(key, recipe, type) {
  const card = document.createElement('div');
  card.className = 'craft-card';
  
  const canCraft = checkRequirements(recipe.requires, recipe.xpCost || 0);
  const alreadyCrafted = type === 'paint' ? gameState.paints[key] : gameState.tools[key];
  
  // Only disable if already crafted OR can't craft
  if (alreadyCrafted) {
    card.classList.add('crafted');
    card.classList.add('disabled');
  } else if (!canCraft) {
    card.classList.add('disabled');
  }
  
  const requirementsText = Object.entries(recipe.requires)
    .map(([mat, count]) => {
      const hasEnough = gameState.inventory[mat] >= count;
      const icon = materials[mat].icon;
      const color = hasEnough ? '#4CAF50' : '#F44336';
      return `<span style="color: ${color};">${icon}×${count}</span>`;
    })
    .join(' ');

  // XP requirement display
  const xpReq = recipe.xpCost || 0;
  const hasXP = gameState.xp >= xpReq;
  const xpHtml = xpReq > 0 ? `<span style="margin-left:8px;color:${hasXP ? '#FFD54F' : '#C00000'};">⚡×${xpReq}</span>` : '';
  
  let statusHtml = '';
  if (alreadyCrafted) {
    statusHtml = '<div class="craft-status crafted">✅ CRAFTED</div>';
  } else if (canCraft) {
    statusHtml = '<div class="craft-status ready">👆 CLICK TO CRAFT</div>';
  } else {
    statusHtml = '<div class="craft-status" style="background: rgba(139, 69, 19, 0.5);">Need Materials</div>';
  }
  
  // For charcoal and manganese paints, render colored circles instead of emojis
  let iconHTML = '';
  if (key === 'blackPaint') {
    // Charcoal - #100c08
    iconHTML = `<div class="craft-icon" style="display: inline-block; width: 2.5rem; height: 2.5rem; background: radial-gradient(circle at 30% 30%, #3a3a38, #100c08 50%, #000000); border-radius: 50%;"></div>`;
  } else if (key === 'brownPaint') {
    // Manganese - #1B1B1B
    iconHTML = `<div class="craft-icon" style="display: inline-block; width: 2.5rem; height: 2.5rem; background: radial-gradient(circle at 30% 30%, #4a4a48, #1B1B1B 50%, #000000); border-radius: 50%;"></div>`;
  } else {
    iconHTML = `<div class="craft-icon">${recipe.icon}</div>`;
  }
  
  card.innerHTML = `
    ${iconHTML}
    <div class="craft-name">${recipe.name}</div>
    <div class="craft-requirements">${requirementsText} ${xpHtml}</div>
    ${statusHtml}
  `;
  
  // Only allow clicking if can craft AND not already crafted
  if (canCraft && !alreadyCrafted) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      sounds.click();
      craftItem(key, recipe, type, card);
    });
  }
  
  return card;
}

function checkRequirements(requires, xpCost = 0) {
  const materialsOk = Object.entries(requires).every(([mat, count]) => {
    const hasAmount = gameState.inventory[mat] || 0;
    const needed = count;
    const hasEnough = hasAmount >= needed;
    
    // Debug logging
    if (!hasEnough) {
      console.log(`Missing: ${mat} - Has ${hasAmount}, needs ${needed}`);
    }
    
    return hasEnough;
  });

  const xpOk = (gameState.xp || 0) >= xpCost;
  if (!xpOk) {
    console.log(`Missing XP: Has ${gameState.xp || 0}, needs ${xpCost}`);
  }

  return materialsOk && xpOk;
}

function craftItem(key, recipe, type, cardElement) {
  // Store crafting context
  gameState.craftingKey = key;
  gameState.craftingRecipe = recipe;
  gameState.craftingType = type;
  gameState.craftingCard = cardElement;
  
  // Launch appropriate workshop mini-game
  startWorkshopMiniGame(key, recipe, type);
}

// ========================================
// CAVE SCENE - 3D PAINTING (cavepainter.html)
// ========================================

function initCaveScene() {
  // The cave scene is now handled by cavepainter.html loaded in an iframe
  // We'll communicate with it via postMessage to sync game state
  
  const iframe = document.getElementById('cave-painter-frame');
  if (!iframe) {
    console.warn('Cave painter iframe not found');
    return;
  }
  
  // Listen for messages from the cave painter
  window.addEventListener('message', (event) => {
    // Security: verify origin if deployed
    if (event.data && event.data.type === 'cavePainterReady') {
      console.log('Cave painter is ready');
      syncGameStateToCavePainter();
    }
  });
  
  // Sync state when entering cave scene
  syncGameStateToCavePainter();
}

function syncGameStateToCavePainter() {
  const iframe = document.getElementById('cave-painter-frame');
  if (!iframe || !iframe.contentWindow) return;
  
  // Send current paints and tools to the cave painter
  const stateData = {
    type: 'gameStateSync',
    paints: gameState.paints,
    tools: gameState.tools,
    selectedPaint: gameState.selectedPaint,
    selectedTool: gameState.selectedTool
  };
  
  try {
    iframe.contentWindow.postMessage(stateData, '*');
  } catch (e) {
    console.warn('Could not sync state to cave painter:', e);
  }
}

// ========================================
// UI UPDATES
// ========================================

// Utility: fit a numeric label into its container by scaling font-size down until it fits
function fitNumberToContainer(el, opts = {}) {
  if (!el) return;
  try {
    const minPx = typeof opts.minPx === 'number' ? opts.minPx : 10; // smallest font-size in px
    const maxPx = typeof opts.maxPx === 'number' ? opts.maxPx : 16; // starting font-size px
    // Reset to max first
    el.style.fontSize = maxPx + 'px';
    el.style.lineHeight = '1';
    // If it already fits, we're done
    // Use a small loop to reduce font size until scrollWidth <= clientWidth or min reached
    let fs = maxPx;
    // Allow a small padding factor so it doesn't touch edges
    const pad = 4;
    while (fs > minPx && el.scrollWidth > el.clientWidth - pad) {
      fs -= 1;
      el.style.fontSize = fs + 'px';
    }
    // If still overflowing, allow text to shrink via transform scale as a last resort
    if (el.scrollWidth > el.clientWidth - pad) {
      const ratio = (el.clientWidth - pad) / el.scrollWidth;
      if (ratio > 0 && ratio < 1) {
        el.style.transformOrigin = 'center';
        el.style.transform = `scale(${ratio})`;
      }
    } else {
      el.style.transform = '';
    }
  } catch (e) { /* ignore fit errors */ }
}

function updateUI() {
  updateInventory();
  updateTools();
  
  // Update workshop crafting cards if we're in the workshop
  const workshopScene = document.getElementById('workshop-scene');
  if (workshopScene && workshopScene.classList.contains('active')) {
    renderCraftingUI();
  }
  // Update XP display in nav
  const xpEl = document.getElementById('xp-count');
  if (xpEl) {
    xpEl.textContent = String(gameState.xp || 0);
    // ensure it visually fits inside the XP circle badge
    // small timeout to allow styles/layout to apply if called during DOM updates
    setTimeout(() => fitNumberToContainer(xpEl, { minPx: 10, maxPx: 14 }), 8);
  }
}

function updateInventory() {
  const container = document.getElementById('inventory-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  Object.keys(gameState.inventory).forEach(key => {
    const count = gameState.inventory[key];
    if (count > 0) {
      const item = document.createElement('div');
      item.className = 'inventory-item pop-in';
      item.innerHTML = `
        <div class="item-icon">${materials[key].icon}</div>
        <div class="item-count">${count}</div>
      `;
      item.title = materials[key].name;
      container.appendChild(item);
    }
  });
}

function updateTools() {
  const container = document.getElementById('tools-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  let hasTools = false;
  
  // Add tools
  Object.keys(gameState.tools).forEach(key => {
    if (gameState.tools[key]) {
      hasTools = true;
      const tool = toolRecipes[key];
      const item = document.createElement('div');
      item.className = 'tool-item pop-in';
      item.innerHTML = `<div class="item-icon">${tool.icon}</div>`;
      item.title = tool.name;
      container.appendChild(item);
    }
  });
  
  // Add paints
  Object.keys(gameState.paints).forEach(key => {
    hasTools = true;
    const paint = gameState.paints[key];
    const item = document.createElement('div');
    item.className = 'tool-item pop-in';
    item.innerHTML = `<div class="item-icon">${paint.icon}</div>`;
    item.title = paint.name;
    container.appendChild(item);
  });
  
  const toolsPanel = document.getElementById('tools-panel');
  if (toolsPanel) {
    toolsPanel.style.display = hasTools ? 'block' : 'none';
  }
}

function renderInventoryModal() {
  // Materials
  const materialsContainer = document.getElementById('inventory-grid-modal');
  materialsContainer.innerHTML = '';
  
  let hasMaterials = false;
  Object.keys(gameState.inventory).forEach(key => {
    const count = gameState.inventory[key];
    if (count > 0) {
      hasMaterials = true;
      const item = document.createElement('div');
      item.className = 'inventory-item';
      item.innerHTML = `
        <div class="item-icon">${materials[key].icon}</div>
        <div class="item-name">${materials[key].name}</div>
        <div class="item-count">${count}</div>
      `;
      materialsContainer.appendChild(item);
    }
  });
  
  if (!hasMaterials) {
    materialsContainer.innerHTML = '<div class="empty-inventory">No materials collected yet. Visit the Gathering area!</div>';
  }
  
  // Paints
  const paintsContainer = document.getElementById('paints-grid-modal');
  paintsContainer.innerHTML = '';
  
  let hasPaints = false;
  Object.keys(gameState.paints).forEach(key => {
    hasPaints = true;
    const paint = gameState.paints[key];
    const item = document.createElement('div');
    item.className = 'paint-item';
    item.style.backgroundColor = paint.color;
    item.innerHTML = `
      <div class="item-icon">${paint.icon}</div>
      <div class="item-name">${paint.name}</div>
    `;
    paintsContainer.appendChild(item);
  });
  
  if (!hasPaints) {
    paintsContainer.innerHTML = '<div class="empty-inventory">No paints crafted yet. Visit the Workshop!</div>';
  }
  
  // Tools
  const toolsContainer = document.getElementById('tools-grid-modal');
  toolsContainer.innerHTML = '';
  
  let hasTools = false;
  Object.keys(gameState.tools).forEach(key => {
    if (gameState.tools[key]) {
      hasTools = true;
      const tool = toolRecipes[key];
      const item = document.createElement('div');
      item.className = 'tool-item';
      item.innerHTML = `
        <div class="item-icon">${tool.icon}</div>
        <div class="item-name">${tool.name}</div>
      `;
      toolsContainer.appendChild(item);
    }
  });
  
  if (!hasTools) {
    toolsContainer.innerHTML = '<div class="empty-inventory">No tools crafted yet. Visit the Workshop!</div>';
  }
}

// ========================================
// PARTICLE EFFECTS
// ========================================

// ========================================
// PARTICLE SYSTEM WITH POOLING
// ========================================

const particlePool = [];
const MAX_PARTICLES = 100;
let activeParticles = 0;

function createParticleBurst(x, y, color, count) {
  const container = document.getElementById('particle-container');
  if (!container) return;
  
  // Limit particle count for performance
  const actualCount = Math.min(count, 20);
  
  for (let i = 0; i < actualCount; i++) {
    // Skip if too many active particles
    if (activeParticles >= MAX_PARTICLES) break;
    
    let particle;
    
    // Reuse particle from pool or create new one
    if (particlePool.length > 0) {
      particle = particlePool.pop();
    } else {
      particle = document.createElement('div');
      particle.className = 'particle';
    }
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.backgroundColor = color;
    particle.style.opacity = '1';
    
    const angle = (Math.PI * 2 * i) / actualCount;
    const velocity = 50 + Math.random() * 50;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity - 50; // Slight upward bias
    
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    container.appendChild(particle);
    activeParticles++;
    
    // Return particle to pool after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
      activeParticles--;
      
      // Add back to pool if not too large
      if (particlePool.length < 50) {
        particlePool.push(particle);
      }
    }, 1000);
  }
}

// ========================================
// MODALS
// ========================================

function initModals() {
  // Inventory
  document.getElementById('inventory-btn').addEventListener('click', () => {
    renderInventoryModal();
    document.getElementById('inventory-modal').classList.add('active');
    sounds.click();
  });
  
  document.getElementById('close-inventory').addEventListener('click', () => {
    document.getElementById('inventory-modal').classList.remove('active');
  });
  
  // Challenges
  document.getElementById('challenges-btn').addEventListener('click', () => {
    renderChallengesModal();
    document.getElementById('challenges-modal').classList.add('active');
    sounds.click();
  });
  
  document.getElementById('close-challenges').addEventListener('click', () => {
    document.getElementById('challenges-modal').classList.remove('active');
  });
  
  // Codex
  document.getElementById('codex-btn').addEventListener('click', () => {
    document.getElementById('codex-modal').classList.add('active');
    showCodexTab('period');
  });
  
  document.getElementById('close-codex').addEventListener('click', () => {
    document.getElementById('codex-modal').classList.remove('active');
  });
  
  // Codex tabs
  document.querySelectorAll('.codex-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      showCodexTab(tabName);
      document.querySelectorAll('.codex-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
  
  // Help
  document.getElementById('help-btn').addEventListener('click', () => {
    document.getElementById('help-modal').classList.add('active');
  });
  
  document.getElementById('close-help').addEventListener('click', () => {
    document.getElementById('help-modal').classList.remove('active');
  });
  
  // Save button
  document.getElementById('save-btn').addEventListener('click', () => {
    saveGameState();
    showNotification('💾 Progress saved!', 2000);
  });
  
  // Reset button
  document.getElementById('reset-btn').addEventListener('click', () => {
    resetGameState();
  });
  
  // Close on background click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

function showCodexTab(tabName) {
  const content = document.getElementById('codex-content');
  content.innerHTML = codexData[tabName] || '<p>Content not available.</p>';
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

let notificationTimeout;

function showNotification(message, duration = 2000) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
  
  clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    notification.classList.remove('show');
  }, duration);
}

// Ensure all event handlers are removed on close
window.handleEnhancedNav = null;
window.handleEnhancedNavStop = null;

// ========================================
// WORKSHOP MINI-GAMES - NEW!
// ========================================

const workshopGames = {
  pigmentGrinding: {
    name: 'The Stone Master',
    triggers: ['redPaint', 'yellowPaint', 'blackPaint', 'brownPaint', 'whitePaint'],
    type: 'grinding'
  },
  paintMixing: {
    name: 'The Color Alchemist', 
    triggers: ['redPaint', 'yellowPaint', 'blackPaint', 'brownPaint', 'whitePaint'],
    type: 'mixing'
  },
  torchCrafting: {
    name: 'Fire Keeper',
    triggers: ['torch'],
    type: 'assembly'
  },
  lampConstruction: {
    name: 'Light Shaper',
    triggers: ['lamp'],
    type: 'carving'
  },
  brushMaking: {
    name: 'Hair Weaver',
    triggers: ['brush'],
    type: 'weaving'
  },
  boneToolCrafting: {
    name: 'Bone Sculptor',
    triggers: ['sprayBone'],
    type: 'sculpting'
  }
};

// ========================================
// BADGES SYSTEM
// ========================================

function updateBadges() {
  const container = document.getElementById('badges-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  // Display in organized groups
  const groups = [
    ['ochreExpert', 'manganesemaster', 'woodWhisperer'],
    ['charcoalCrafter', 'fatRenderer', 'boneArtisan'],
    ['lampMaster', 'brushMaker', 'pigmentMaster'],
    ['paintMixer', 'lightPlanner', 'templateMaker']
  ];
  
  groups.forEach(group => {
    group.forEach(key => {
      if (badgeInfo[key]) {
        const badge = badgeInfo[key];
        const earned = gameState.badges[key];
        
        const item = document.createElement('div');
        item.className = 'badge-item ' + (earned ? 'earned' : 'locked');
        item.innerHTML = badge.icon;
        item.title = badge.name + (earned ? ' ✓ Earned!' : ' - Play challenge to unlock');
        
        if (earned) {
          item.style.animation = 'badgeEarned 0.6s ease-out';
        }
        
        container.appendChild(item);
      }
    });
  });
  
  // Add CSS animation for earned badges
  if (!document.getElementById('badge-animation')) {
    const style = document.createElement('style');
    style.id = 'badge-animation';
    style.textContent = `
      @keyframes badgeEarned {
        0% { transform: scale(0) rotate(-180deg); }
        60% { transform: scale(1.2) rotate(10deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

function renderChallengesModal() {
  const container = document.getElementById('badges-grid-modal');
  container.innerHTML = '';
  
  // All badges with descriptions
  const badgeDescriptions = {
    ochreExpert: 'Master the riverbank journey',
    manganesemaster: 'Complete the mountain expedition',
    woodWhisperer: 'Identify the perfect wood',
    charcoalCrafter: 'Control pyrolysis temperature',
    fatRenderer: 'Extract bone marrow fat',
    boneArtisan: 'Craft hollow bone tool',
    lampMaster: 'Carve the perfect lamp',
    brushMaker: 'Weave fine hair brush',
    pigmentMaster: 'Grind pigments perfectly',
    paintMixer: 'Mix paint with ideal ratios',
    lightPlanner: 'Plan cave illumination',
    templateMaker: 'Study animal proportions'
  };
  
  Object.keys(badgeInfo).forEach(key => {
    const badge = badgeInfo[key];
    const earned = gameState.badges[key];
    
    const item = document.createElement('div');
    item.className = 'badge-item ' + (earned ? 'earned' : 'locked');
    item.innerHTML = `
      <div style="font-size: 3rem;">${badge.icon}</div>
      <div class="badge-name">${badge.name}</div>
      <div class="badge-description">${badgeDescriptions[key] || ''}</div>
    `;
    
    if (earned) {
      const checkmark = document.createElement('div');
      checkmark.style.cssText = 'position: absolute; top: 5px; right: 5px; font-size: 1.2rem;';
      checkmark.textContent = '✓';
      item.appendChild(checkmark);
    }
    
    container.appendChild(item);
  });
}

// ========================================
// MINI-GAME SYSTEM
// ========================================

let miniGameState = {
  active: false,
  type: null,
  materialKey: null,
  timeRemaining: 0,
  timerInterval: null,
  startTime: null,
  duration: 0,
  characterX: 50,
  characterY: 50,
  collected: false,
  temperature: 50,
  treesCollected: 0,
  treesNeeded: 3,
  marrowExtracted: 0,
  boneProgress: 0
};

function startMiniGame(materialKey) {
  const gameData = miniGames[materialKey];
  if (!gameData) return;
  
  miniGameState = {
    active: true,
    type: gameData.type,
    materialKey: materialKey,
    timeRemaining: gameData.duration,
    timerInterval: null,
    characterX: 50,
    characterY: 50,
    collected: false,
    temperature: 50,
    treesCollected: 0,
    treesNeeded: 3,
    marrowExtracted: 0,
    boneProgress: 0
  };
  
  const modal = document.getElementById('minigame-modal');
  const title = document.getElementById('minigame-title');
  const instructions = document.getElementById('minigame-instructions');
  const fact = document.getElementById('minigame-fact');
  
  title.textContent = gameData.name;
  fact.textContent = '💡 ' + gameData.fact;
  
  // Clear previous game
  const container = document.getElementById('minigame-container');
  const controls = document.getElementById('minigame-controls');
  container.innerHTML = '';
  controls.innerHTML = '';
  
  // Setup specific mini-game
  switch (gameData.type) {
    case 'navigation-enhanced':
      setupEnhancedNavigationGame(container, controls, instructions, gameData);
      break;
    case 'navigation-multiday':
      setupMultiDayExpedition(container, controls, instructions, gameData);
      break;
    case 'botanical-identification':
      // Use the newer, more interactive identification implementation
      // (inspect → collect flow, centered tree-field, species reference)
      setupIdentificationGame(container, controls, instructions, gameData);
      break;
    case 'pyrolysis-control':
      setupPyrolysisGame(container, controls, instructions, gameData);
      break;
    case 'anatomical-extraction':
      setupAnatomicalGame(container, controls, instructions, gameData);
      break;
    case 'osteological-crafting':
      setupOsteologicalGame(container, controls, instructions, gameData);
      break;
    case 'lamp-construction':
      setupLampConstructionGame(container, controls, instructions, gameData);
      break;
    case 'brush-fabrication':
      setupBrushMakingGame(container, controls, instructions, gameData);
      break;
    case 'pigment-grinding':
      setupPigmentGrindingGame(container, controls, instructions, gameData);
      break;
    case 'paint-formulation':
      setupPaintMixingGame(container, controls, instructions, gameData);
      break;
    case 'cave-lighting-planning':
      setupCaveLightingGame(container, controls, instructions, gameData);
      break;
    case 'template-creation':
      setupTemplateGame(container, controls, instructions, gameData);
      break;
  }
  
  modal.classList.add('active');
  // Remember whether ambient was playing before the mini-game started
  try {
    miniGameState._ambientWasPlaying = !!(_ambientAudio && !_ambientAudio.paused);
  } catch (e) { miniGameState._ambientWasPlaying = false; }
  // Pause ambient when a mini-game is active
  try { updateAmbientPlayback(); } catch (e) {}
  
  // Start timer only if game has a duration
  if (gameData.duration > 0) {
    startMiniGameTimer();
  }
}

function startMiniGameTimer() {
  clearInterval(miniGameState.timerInterval);
  
  // Store start time and duration for accurate timing
  miniGameState.startTime = Date.now();
  miniGameState.duration = miniGameState.timeRemaining;
  
  miniGameState.timerInterval = setInterval(() => {
    // Calculate actual time elapsed
    const elapsed = Math.floor((Date.now() - miniGameState.startTime) / 1000);
    miniGameState.timeRemaining = Math.max(0, miniGameState.duration - elapsed);
    updateTimerDisplay();
    
    if (miniGameState.timeRemaining <= 0) {
      endMiniGame(false);
    }
  }, 100); // Update more frequently for smoother display
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('minigame-timer');
  if (timerEl) {
    timerEl.textContent = `Time: ${miniGameState.timeRemaining}s`;
  }
}

function endMiniGame(success) {
  clearInterval(miniGameState.timerInterval);
  // clear any mini-game specific intervals created during setup
  try {
    if (miniGameState.slipperySpawnInterval) {
      clearInterval(miniGameState.slipperySpawnInterval);
      delete miniGameState.slipperySpawnInterval;
    }
    if (miniGameState.stabilizeListener) {
      try { document.removeEventListener('keydown', miniGameState.stabilizeListener); } catch (e) {}
      delete miniGameState.stabilizeListener;
    }
  } catch (e) {
    console.warn('Error clearing mini-game intervals', e);
  }
  miniGameState.active = false;
  // Resume ambient only if it was playing before the mini-game started
  try {
    if (miniGameState && miniGameState._ambientWasPlaying) {
      // try to resume if settings still allow it
      resumeAmbient();
    } else {
      // otherwise ensure ambient stays paused
      pauseAmbient();
    }
  } catch (e) { /* ignore ambient resume errors */ }
  // Remove any UI elements appended to document.body by mini-games (like the fixed progress bar)
  try {
    if (miniGameState.staminaContainer) {
      try { miniGameState.staminaContainer.remove(); } catch (e) {}
      delete miniGameState.staminaContainer;
    }
  } catch (e) {}
  // Run any mini-game specific cleanup (e.g., remove cave listeners/lights)
  try {
    if (miniGameState.caveCleanup) {
      try { miniGameState.caveCleanup(); } catch (e) {}
      delete miniGameState.caveCleanup;
    }
  } catch (e) {}
  
  const container = document.getElementById('minigame-container');
  const overlay = document.createElement('div');
  overlay.className = 'result-overlay';
  
  if (success) {
    const gameData = miniGames[miniGameState.materialKey];
    const multiplier = gameData.rewardMultiplier;
    const materialData = materials[miniGameState.materialKey];
    
    // Some games (like template-creation) don't have materials, just badges
    if (!materialData) {
      overlay.innerHTML = `
        <div class="result-icon">🎉</div>
        <div class="result-text">SUCCESS!</div>
        <div class="result-reward">${gameData.name} completed!</div>
        <button class="btn-primary" onclick="closeMiniGame(true)">Continue</button>
      `;
    } else {
      overlay.innerHTML = `
        <div class="result-icon">🎉</div>
        <div class="result-text">SUCCESS!</div>
        <div class="result-reward">Collected ${multiplier}x ${materialData.name}</div>
        <button class="btn-primary" onclick="closeMiniGame(true)">Continue</button>
      `;
    }
    
    // Award badge
    if (gameData.badge) {
      gameState.badges[gameData.badge] = true;
      updateBadges();
    }
    // Award experience points for completing a mini-game
    gameState.xp = (gameState.xp || 0) + 10;
    showNotification('⚡ Earned 10 XP for completing the challenge!', 1800);
    updateUI();
    saveGameState();
  } else {
    // Check if this is a manganese expedition death (no reward)
    const isManganeseExpedition = miniGameState.materialKey === 'manganese';
    const isDeath = miniGameState.stamina !== undefined && (miniGameState.stamina <= 0 || miniGameState.food <= 0 || miniGameState.water <= 0);
    const gameData = miniGames[miniGameState.materialKey];
    const hasTimeLimit = gameData && gameData.duration > 0;
    
    if (isManganeseExpedition && isDeath) {
      overlay.innerHTML = `
        <div class="result-icon">💀</div>
        <div class="result-text">Expedition Failed!</div>
        <div class="result-reward" style="color: #FF6B35;">You died on the journey - collected NOTHING</div>
        <button class="btn-primary" onclick="closeMiniGame(false)">Return Empty-Handed</button>
      `;
    } else if (hasTimeLimit) {
      // Only show "Time's Up!" for games that actually have a time limit
      overlay.innerHTML = `
        <div class="result-icon">⏱️</div>
        <div class="result-text">Time's Up!</div>
        <div class="result-reward" style="color: #FF6B35;">Failed - collected NOTHING</div>
        <button class="btn-primary" onclick="closeMiniGame(false)">Continue</button>
      `;
    } else {
      // For games without time limits that failed for other reasons
      overlay.innerHTML = `
        <div class="result-icon">❌</div>
        <div class="result-text">Failed</div>
        <div class="result-reward" style="color: #FF6B35;">Incomplete - collected NOTHING</div>
        <button class="btn-primary" onclick="closeMiniGame(false)">Continue</button>
      `;
    }
  }
  
  container.appendChild(overlay);
  // Auto-focus the primary button in the overlay so the player can immediately continue
  try {
    const primaryBtn = overlay.querySelector('button');
    if (primaryBtn) {
      primaryBtn.tabIndex = 0;
      setTimeout(() => {
        try {
          primaryBtn.focus();
          primaryBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (e) {
          /* ignore focus errors */
        }
      }, 60);
    }
  } catch (err) {
    console.warn('Could not focus overlay button', err);
  }
}

function closeMiniGame(success) {
  // Check if player died on manganese expedition (should get 0 materials)
  const isManganeseExpedition = miniGameState.materialKey === 'manganese';
  const isDeath = miniGameState.stamina !== undefined && (miniGameState.stamina <= 0 || miniGameState.food <= 0 || miniGameState.water <= 0);
  
  let multiplier;
  if (!success) {
    // Failed minigame = no reward
    multiplier = 0;
  } else if (isManganeseExpedition && isDeath) {
    // Death on expedition = no reward (shouldn't happen with success=true, but just in case)
    multiplier = 0;
  } else {
    // Success = full reward
    multiplier = miniGameState.totalMultiplier || miniGames[miniGameState.materialKey].rewardMultiplier;
  }
  
  // Only gather material if this game has an associated material
  if (materials[miniGameState.materialKey]) {
    gatherMaterial(miniGameState.materialKey, gameState.currentGatherButton, multiplier);
  }
  
  document.getElementById('minigame-modal').classList.remove('active');
  // If this was the manganese expedition, return focus to the expedition controls
  try {
    if (miniGameState.materialKey === 'manganese' && success) {
      // Ensure the landscape/expedition scene is visible
      switchToScene('landscape');

      const continueBtn = document.getElementById('continue-journey-btn');
      if (continueBtn) {
        // Unhide (some flows hide the button while expedition in-progress)
        continueBtn.style.display = '';
        // Move focus so keyboard users land on the Continue button
        setTimeout(() => {
          try {
            continueBtn.focus();
            continueBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } catch (e) {
            /* ignore focus errors */
          }
        }, 120);
      }
    }
  } catch (err) {
    console.warn('Error restoring expedition focus:', err);
  }

    // Clean up the minigame container DOM to avoid leftover elements when the modal is closed
    try {
      const mgc = document.getElementById('minigame-container');
      if (mgc) mgc.innerHTML = '';
    } catch (e) {}
}

// Add handler for close button
function initMiniGameCloseHandler() {
  document.getElementById('close-minigame').addEventListener('click', () => {
    if (miniGameState.active) {
      const isTemplateGame = miniGameState.materialKey === 'aurochs';
      
      let message;
      if (isTemplateGame && miniGameState.animalProgress) {
        // Show how many templates collected
        const completed = Object.values(miniGameState.animalProgress).filter(a => a.completed).length;
        message = completed > 0 
          ? `Exit Pattern Master? You've studied ${completed}/5 animals but won't get the badge unless you complete all 5.`
          : 'Exit Pattern Master? You haven\'t studied any animals yet!';
      } else {
        message = 'Exit mini-game? You\'ll get nothing and fail the challenge.';
      }
      
      if (confirm(message)) {
        // For template game, award partial progress
        if (isTemplateGame && miniGameState.animalProgress) {
          const completed = Object.values(miniGameState.animalProgress).filter(a => a.completed).length;
          if (completed > 0) {
            showTemplateExitReward(completed);
            return;
          }
        }
        endMiniGame(false);
      }
    } else {
      document.getElementById('minigame-modal').classList.remove('active');
    }
  });
}

function showTemplateExitReward(templatesCollected) {
  clearInterval(miniGameState.timerInterval);
  miniGameState.active = false;
  
  const container = document.getElementById('minigame-container');
  const overlay = document.createElement('div');
  overlay.className = 'result-overlay';
  
  // Get the animals that were completed
  const completedAnimals = Object.entries(miniGameState.animalProgress)
    .filter(([key, data]) => data.completed)
    .map(([key]) => key);
  
  const animalEmojis = {
    horse: '🐴',
    aurochs: '🐂',
    bison: '🦬',
    deer: '🦌',
    ibex: '🐐'
  };
  
  const animalNames = {
    horse: 'Horse',
    aurochs: 'Aurochs',
    bison: 'Bison',
    deer: 'Deer',
    ibex: 'Ibex'
  };
  
  const collectedEmojis = completedAnimals.map(animal => animalEmojis[animal]).join(' ');
  const collectedNames = completedAnimals.map(animal => animalNames[animal]).join(', ');
  
  overlay.innerHTML = `
    <div class="result-icon">📋</div>
    <div class="result-text">Templates Collected!</div>
    <div style="font-size: 2.5rem; margin: 15px 0;">${collectedEmojis}</div>
    <div class="result-reward">You studied ${templatesCollected}/5 animals:<br>${collectedNames}</div>
    <div style="color: rgba(255,255,255,0.7); margin-top: 15px; font-size: 0.9rem;">
      Progress saved! Continue next time to master all 5 templates.
    </div>
    <button class="btn-primary" onclick="closeMiniGame(true)">Continue</button>
  `;
  
  container.appendChild(overlay);
  
  // Award partial badge credit if they got at least 3
  if (templatesCollected >= 3) {
    gameState.badges.templateMaker = true;
    updateBadges();
  }
}

// Call during initialization
window.addEventListener('DOMContentLoaded', () => {
  initMiniGameCloseHandler();
});

// ========================================
// ENHANCED NAVIGATION GAME - THE RIVERBANK JOURNEY
// Parallax landscape, stamina system, quality deposits
// ========================================

function setupEnhancedNavigationGame(container, controls, instructions, gameData) {
  // Disable the global timer for this platformer game (no time limit)
  clearInterval(miniGameState.timerInterval);
  miniGameState.timeRemaining = 999; // Set high value to prevent timer display issues
  
  instructions.innerHTML = `
    <strong>🏞️ The Ochre Expedition</strong><br>
    Navigate the terrain to collect ochre. Use <kbd>← →</kbd> to move, <kbd>Space</kbd> to jump!
  `;
  
  // Create beautiful layered landscape
  container.innerHTML = '';
  container.style.background = 'linear-gradient(180deg, #87CEEB 0%, #D4A574 70%, #8B7355 100%)';
  
  // Remove parallax layers - they're blocking the view
  // Sky, mountains, and ground will be handled by stage backgrounds instead
  
  // Progress bar - fixed position at top of screen (follows camera)
  const staminaContainer = document.createElement('div');
  staminaContainer.className = 'stat-bar-container';
  staminaContainer.style.cssText = `
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    pointer-events: none;
  `;
  staminaContainer.innerHTML = `
    <div class="stat-bar">
      <div class="stat-bar-label">Progress</div>
      <div style="background: rgba(0,0,0,0.7); border-radius: 4px; padding: 8px; color: white; font-weight: bold; text-align: center; min-width: 250px;" id="collected-count">0 / 0 deposits (Stage 1/5)</div>
    </div>
  `;
  document.body.appendChild(staminaContainer);
  // Remember this element so we can clean it up when the mini-game ends
  miniGameState.staminaContainer = staminaContainer;
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer" style="display: none;">No Time Limit</div>
    </div>
  `;
  
  // Character - use pixel positioning like manganese game
  const character = document.createElement('div');
  character.className = 'character-sprite landscape-explorer';
  character.style.left = '50px';
  character.style.bottom = '120px'; // Start on ground
  character.style.zIndex = '25';
  container.appendChild(character);

  // Add an image child so the decorative wrapper background is hidden (CSS :has() rule)
  // Use the same image selection logic as other scenes so user's selection is respected.
  try {
    const img = document.createElement('img');
    img.className = 'character-img';
    const chosen = (miniGameState && miniGameState.selectedCharacter && typeof miniGameState.selectedCharacter === 'string' && miniGameState.selectedCharacter.toLowerCase().endsWith('.png')) ? miniGameState.selectedCharacter : './cha1.png';
    img.src = chosen;
    img.alt = 'Explorer';
    img.style.width = '36px';
    img.style.height = '44px';
    img.style.objectFit = 'contain';
    img.style.display = 'block';
    img.style.pointerEvents = 'none';
    img.style.zIndex = '26';
    img.addEventListener('error', () => {
      try { if (img.parentElement) img.remove(); } catch (e) {}
      try {
        const emoji = document.createElement('div');
        emoji.style.fontSize = '18px';
        emoji.textContent = '🚶';
        emoji.style.display = 'flex';
        emoji.style.alignItems = 'center';
        emoji.style.justifyContent = 'center';
        emoji.style.width = '100%';
        emoji.style.height = '100%';
        character.appendChild(emoji);
      } catch (e) {}
    });
    img.addEventListener('load', () => {
      try {
        // remove any tiny emoji child left over
        Array.from(character.children).forEach(c => {
          if (c !== img && c.tagName && c.tagName.toLowerCase() === 'div' && c.textContent && c.textContent.trim().length <= 2) {
            try { c.remove(); } catch (e) {}
          }
        });
      } catch (e) {}
    });
    character.appendChild(img);
  } catch (e) {}

  // 5-STAGE PLATFORMER WITH VARIED TERRAIN
  
  // Multi-stage deposit system with platforms and hazards
  const deposits = [];
  const rivers = [];
  const platforms = [];
  let goalArea = null;
  
  const stages = [
    { 
      name: 'Riverbank Crossing', 
      deposits: 3,
      theme: { sky: '#87CEEB', ground: '#D4A574', accent: '#4682B4' },
      platforms: [
        { x: 0, y: 50, width: 250, height: 60, color: 'linear-gradient(180deg, #C19A6B 0%, #8B7355 100%)' },
        { x: 450, y: 50, width: 350, height: 60, color: 'linear-gradient(180deg, #C19A6B 0%, #8B7355 100%)' },
      ],
      rivers: [
        { x: 250, y: 50, width: 200, height: 60 } // River gap
      ],
      palette: ['#CD853F','#A0714A','#8B6442']
    },
    { 
      name: 'Forest Path', 
      deposits: 4,
      theme: { sky: '#87CEEB', ground: '#5C8A3D', accent: '#228B22' },
      platforms: [
        { x: 0, y: 50, width: 200, height: 60, color: 'linear-gradient(180deg, #6B8E23 0%, #556B2F 100%)', decoration: '🌲' },
        { x: 250, y: 90, width: 150, height: 40, color: 'linear-gradient(180deg, #8FBC8F 0%, #6B8E23 100%)', decoration: '🌳' },
        { x: 420, y: 130, width: 180, height: 40, color: 'linear-gradient(180deg, #90EE90 0%, #6B8E23 100%)', decoration: '🌲' },
        { x: 620, y: 70, width: 180, height: 80, color: 'linear-gradient(180deg, #9ACD32 0%, #6B8E23 100%)', decoration: '🌿' },
      ],
      rivers: [],
      palette: ['#8B4513','#CD853F','#D2691E']
    },
    { 
      name: 'Rocky Cliffs', 
      deposits: 4,
      theme: { sky: '#B0C4DE', ground: '#A9A9A9', accent: '#778899' },
      platforms: [
        { x: 0, y: 50, width: 150, height: 60, color: 'linear-gradient(180deg, #A9A9A9 0%, #696969 100%)' },
        { x: 200, y: 110, width: 120, height: 30, color: 'linear-gradient(180deg, #D3D3D3 0%, #A9A9A9 100%)', decoration: '🪨' },
        { x: 370, y: 50, width: 100, height: 60, color: 'linear-gradient(180deg, #C0C0C0 0%, #808080 100%)' },
        { x: 520, y: 50, width: 280, height: 60, color: 'linear-gradient(180deg, #BEBEBE 0%, #808080 100%)' },
      ],
      rivers: [
        { x: 470, y: 50, width: 50, height: 60 } // Small gap
      ],
      palette: ['#8B0000','#CD5C5C','#A0522D']
    },
    { 
      name: 'Rolling Hills', 
      deposits: 5,
      theme: { sky: '#87CEEB', ground: '#9ACD32', accent: '#6B8E23' },
      platforms: [
        { x: 0, y: 50, width: 150, height: 60, color: 'linear-gradient(180deg, #ADFF2F 0%, #7CFC00 100%)', decoration: '🌾' },
        { x: 160, y: 90, width: 140, height: 100, color: 'linear-gradient(180deg, #9ACD32 0%, #6B8E23 100%)', decoration: '🌻' },
        { x: 310, y: 50, width: 100, height: 60, color: 'linear-gradient(180deg, #ADFF2F 0%, #7CFC00 100%)' },
        { x: 440, y: 110, width: 160, height: 120, color: 'linear-gradient(180deg, #7CFC00 0%, #6B8E23 100%)', decoration: '🌳' },
        { x: 610, y: 70, width: 190, height: 80, color: 'linear-gradient(180deg, #9ACD32 0%, #6B8E23 100%)', decoration: '🌿' },
      ],
      rivers: [],
      palette: ['#CD853F','#DEB887','#F4A460']
    },
    { 
      name: 'Mountain Pass', 
      deposits: 4,
      theme: { sky: '#4682B4', ground: '#8B7355', accent: '#A0522D' },
      platforms: [
        { x: 0, y: 50, width: 180, height: 60, color: 'linear-gradient(180deg, #BC8F8F 0%, #8B7355 100%)' },
        { x: 230, y: 110, width: 140, height: 30, color: 'linear-gradient(180deg, #D2B48C 0%, #A0826D 100%)', decoration: '⛰️' },
        { x: 420, y: 50, width: 120, height: 60, color: 'linear-gradient(180deg, #C19A6B 0%, #8B7355 100%)' },
        { x: 590, y: 50, width: 210, height: 60, color: 'linear-gradient(180deg, #D2B48C 0%, #8B7355 100%)' },
      ],
      rivers: [
        { x: 180, y: 50, width: 50, height: 60 }, // Gap 1
        { x: 540, y: 50, width: 50, height: 60 }  // Gap 2
      ],
      palette: ['#B8860B','#DAA520','#FFD700']
    }
  ];

  miniGameState.depositsCollected = 0;
  miniGameState.totalMultiplier = 0;
  miniGameState.stageIndex = 0;
  miniGameState.stageDeposits = 0;
  miniGameState.totalDepositsNeeded = stages.reduce((sum, s) => sum + s.deposits, 0);

  function clearDeposits() {
    deposits.forEach(d => { try { d.el.remove(); } catch(e){} });
    deposits.length = 0;
  }
  
  function clearPlatforms() {
    platforms.forEach(p => { 
      try { 
        p.el.remove(); 
        // Also remove decorations
        if (p.decorations) {
          p.decorations.forEach(d => { try { d.remove(); } catch(e){} });
        }
      } catch(e){} 
    });
    platforms.length = 0;
  }
  
  function clearRivers() {
    rivers.forEach(r => { try { r.el.remove(); } catch(e){} });
    rivers.length = 0;
  }

  function clearGoalArea() {
    try { if (goalArea && goalArea.parentNode) goalArea.parentNode.removeChild(goalArea); } catch(e) {}
    goalArea = null;
  }

  function createDeposit(x, y, palette) {
    const el = document.createElement('div');
    const qualityRoll = Math.random();
    const quality = qualityRoll > 0.7 ? 'high' : (qualityRoll > 0.4 ? 'medium' : 'low');
    const multiplier = quality === 'high' ? 3 : (quality === 'medium' ? 2 : 1);
    const icon = quality === 'high' ? '🔴' : (quality === 'medium' ? '🟠' : '🟤');
    
    el.className = `resource-deposit deposit-ochre`;
    el.innerHTML = icon;
    el.style.left = x + 'px';
    el.style.bottom = y + 'px';
    el.style.background = palette[Math.floor(Math.random()*palette.length)];
    el.style.zIndex = '20';
    el.dataset.multiplier = multiplier;
    el.dataset.quality = quality === 'high' ? 'Excellent' : (quality === 'medium' ? 'Good' : 'Fair');
    el.dataset.collected = 'false';
    container.appendChild(el);
    
    // Pop-in animation
    el.style.transform = 'scale(0)';
    el.style.transition = 'transform 220ms ease, opacity 220ms ease';
    setTimeout(() => { el.style.transform = 'scale(1)'; el.style.opacity = '1'; }, 40);
    
    deposits.push({ el, x, y, multiplier });
    return el;
  }
  
  function createPlatform(platData) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      left: ${platData.x}px;
      bottom: ${platData.y}px;
      width: ${platData.width}px;
      height: ${platData.height}px;
      background: ${platData.color || 'linear-gradient(180deg, #A0825A 0%, #8B7355 100%)'};
      z-index: 5;
      border-radius: 4px 4px 0 0;
      box-shadow: 0 3px 8px rgba(0,0,0,0.3);
    `;
    container.appendChild(el);
    // Create a platform object we can mutate (store decorations on it for reliable cleanup)
    const platformObj = { ...platData, el, decorations: [] };
    platforms.push(platformObj);

    // Add decorations (grass, trees, rocks) on top of platforms
    if (platData.decoration) {
      const decor = platData.decoration;
      const isTree = decor.includes('🌲') || decor.includes('🌳') || decor.includes('🌻') || decor.includes('🌾');
      const isRock = decor.includes('🪨') || decor.includes('⛰️');

      // Only place vegetation decorations (trees/plants) on near-ground platforms to avoid floating foliage
      const groundThreshold = 80; // platforms above this are considered elevated cliffs
      if (isTree && platformObj.y > groundThreshold) {
        // skip placing trees on high platforms
      } else {
        const decorEl = document.createElement('div');
        // Place decoration somewhere across the platform (not off its edges)
        const decorX = Math.floor(platformObj.x + 8 + Math.random() * Math.max(0, platformObj.width - 16));
        // Position decoration base at platform top
        const decorBottom = platformObj.y + platformObj.height;
        decorEl.style.cssText = `
          position: absolute;
          left: ${decorX}px;
          bottom: ${decorBottom}px;
          font-size: ${isTree ? '3rem' : '1.4rem'};
          z-index: 6;
          line-height: 1;
          pointer-events: none;
          transform: translateY(-6%);
        `;
        decorEl.innerHTML = decor;
        container.appendChild(decorEl);
        platformObj.decorations.push(decorEl);
      }
    }
  }
  
  function createRiver(riverData) {
    // Before adding, check if river overlaps platforms (with safety margin)
    function overlapsPlatform(x, w, safetyMargin = 30) {
      for (const p of platforms) {
        // River needs at least safetyMargin px of clearance from platform edges
        if (x - safetyMargin < p.x + p.width && x + w + safetyMargin > p.x) return true;
      }
      return false;
    }

    let rx = riverData.x;
    let rw = riverData.width;
    // Try to shift or shrink river until it doesn't overlap a platform (with 30px safety margin)
    let attempts = 0;
    const maxAttempts = 8;
    while (attempts < maxAttempts && overlapsPlatform(rx, rw)) {
      // First try shifting right a bit
      rx += 40 + Math.floor(Math.random() * 50);
      attempts++;
    }
    attempts = 0;
    // If still overlapping, try shifting left
    while (attempts < maxAttempts && overlapsPlatform(rx, rw)) {
      rx -= 40 + Math.floor(Math.random() * 50);
      attempts++;
    }
    // If still overlapping, try reducing width to fit between nearest platform gaps
    if (overlapsPlatform(rx, rw)) {
      // find a gap large enough between platforms near the desired area (with safety margin)
      const sorted = platforms.slice().sort((a,b) => a.x - b.x);
      let found = false;
      const minGap = 30; // Minimum gap between platform edge and river edge
      for (let i = 0; i < sorted.length - 1; i++) {
        const gapStart = sorted[i].x + sorted[i].width + minGap;
        const gapEnd = sorted[i+1].x - minGap;
        if (gapEnd - gapStart > 80) { // Need at least 80px for a narrow river
          rx = gapStart + 10;
          rw = Math.min(rw, gapEnd - gapStart - 20);
          found = true;
          break;
        }
      }
      if (!found) {
        // As a last resort, don't create the river to avoid covering platforms
        console.warn('Skipping river: cannot place without overlapping platforms', riverData);
        return;
      }
    }

    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      left: ${rx}px;
      bottom: ${riverData.y}px;
      width: ${rw}px;
      height: ${riverData.height}px;
      background: linear-gradient(180deg, #4682B4 0%, #1E90FF 50%, #4169E1 100%);
      z-index: 4;
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.4);
    `;
    el.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:2rem;opacity:0.6;">🌊</div>';
    container.appendChild(el);
    rivers.push({ ...riverData, x: rx, width: rw, el });

    // If the river is wide, add a couple of stepping-stone platforms to make it crossable
    try {
      const minStoneGap = 120; // river widths above this may need stones
      if (rw > minStoneGap) {
        const stones = 1 + Math.floor(rw / 240); // 1-2 stones for wide rivers
        for (let i = 0; i < stones; i++) {
          const stoneW = 28 + Math.floor(Math.random() * 48);
          // Spread stones evenly across the river width
          const t = (i + 1) / (stones + 1);
          const stoneX = Math.floor(rx + t * rw - stoneW / 2 + (Math.random() * 12 - 6));
          // Place stone slightly above river surface so it's standable
          const stoneY = riverData.y + riverData.height + 6;
          const plat = { x: stoneX, y: stoneY, width: stoneW, height: 10, color: '#6b6b6b', decoration: null };
          // Create as a platform and register it on platforms so collisions work
          createPlatform(plat);
        }
      }
    } catch (e) { console.warn('Failed to add stepping stones:', e); }
  }

  function createGoalArea(stage) {
    clearGoalArea();
    try {
      const goalW = 120;
      const goalH = 140;
      let left = (stage.maxX || (stage.nextX + 800)) - goalW;

      // Try to place the goal on an existing platform near the right edge so player won't fall into water
      let placedOnPlatform = false;
      const goalCenter = left + goalW / 2;

      // Search current platforms for one that covers the goal center
      for (const p of platforms) {
        const pLeft = p.x;
        const pRight = p.x + p.width;
        if (goalCenter >= pLeft && goalCenter <= pRight) {
          // Place the goal sitting on top of this platform
          const platformTop = p.y + p.height;
          // Center goal on the platform if possible
          left = Math.max(pLeft, Math.min(left, pRight - goalW));
          const el = document.createElement('div');
          el.className = 'stage-goal';
          el.style.cssText = `
            position: absolute;
            left: ${left}px;
            bottom: ${platformTop}px;
            width: ${goalW}px;
            height: ${goalH}px;
            background: linear-gradient(180deg, rgba(255,215,0,0.2), rgba(255,215,0,0.05));
            border: 3px solid rgba(255,215,0,0.6);
            border-radius: 8px;
            z-index: 30;
            display:flex;align-items:center;justify-content:center;font-size:1.6rem;pointer-events:none;
          `;
          el.innerHTML = '<div style="text-align:center; font-weight:bold; color:#FFD700;">🏁 Goal</div>';
          container.appendChild(el);
          goalArea = el;
          placedOnPlatform = true;
          break;
        }
      }

      if (!placedOnPlatform) {
        // Find nearest platform to the right edge and place goal on it
        let nearest = null;
        let bestDist = Infinity;
        for (const p of platforms) {
          const pxCenter = p.x + p.width / 2;
          const dist = Math.abs(pxCenter - goalCenter);
          if (dist < bestDist) { bestDist = dist; nearest = p; }
        }
        if (nearest && bestDist < 240) {
          const platformTop = nearest.y + nearest.height;
          left = Math.max(nearest.x, Math.min(left, nearest.x + nearest.width - goalW));
          const el = document.createElement('div');
          el.className = 'stage-goal';
          el.style.cssText = `
            position: absolute;
            left: ${left}px;
            bottom: ${platformTop}px;
            width: ${goalW}px;
            height: ${goalH}px;
            background: linear-gradient(180deg, rgba(255,215,0,0.2), rgba(255,215,0,0.05));
            border: 3px solid rgba(255,215,0,0.6);
            border-radius: 8px;
            z-index: 30;
            display:flex;align-items:center;justify-content:center;font-size:1.6rem;pointer-events:none;
          `;
          el.innerHTML = '<div style="text-align:center; font-weight:bold; color:#FFD700;">🏁 Goal</div>';
          container.appendChild(el);
          goalArea = el;
          placedOnPlatform = true;
        }
      }

      if (!placedOnPlatform) {
        // No nearby platform found: create a small support platform so the goal is safe
        const supportX = Math.max(10, left - 10);
        const support = { x: supportX, y: 50, width: goalW + 20, height: 12, color: 'linear-gradient(180deg,#8B7355 0%,#6B4F3A 100%)' };
        createPlatform(support);
        const platformTop = support.y + support.height;
        const el = document.createElement('div');
        el.className = 'stage-goal';
        el.style.cssText = `
          position: absolute;
          left: ${supportX + 10}px;
          bottom: ${platformTop}px;
          width: ${goalW}px;
          height: ${goalH}px;
          background: linear-gradient(180deg, rgba(255,215,0,0.2), rgba(255,215,0,0.05));
          border: 3px solid rgba(255,215,0,0.6);
          border-radius: 8px;
          z-index: 30;
          display:flex;align-items:center;justify-content:center;font-size:1.6rem;pointer-events:none;
        `;
        el.innerHTML = '<div style="text-align:center; font-weight:bold; color:#FFD700;">🏁 Goal</div>';
        container.appendChild(el);
        goalArea = el;
      }
    } catch (e) {
      console.warn('Could not create goal area', e);
    }
  }

  function enterStage(index) {
    // Validate stage index - avoid crashes if called with invalid index
    if (!Array.isArray(stages) || typeof index !== 'number' || index < 0 || index >= stages.length) {
      console.warn('enterStage called with invalid index:', index);
      return;
    }
    miniGameState.stageIndex = index;
    miniGameState.stageDeposits = 0;
    const stage = stages[index];
    
    // Clear old elements
    clearDeposits();
    clearPlatforms();
    clearRivers();
    
    // Update theme
    container.style.background = `linear-gradient(180deg, ${stage.theme.sky} 0%, ${stage.theme.ground} 100%)`;
    
    // Update instructions
    instructions.innerHTML = `
      <strong>🏞️ ${stage.name} (Stage ${index + 1}/5)</strong><br>
      Jump over rivers! Falling in = Game Over. Collect ${stage.deposits} deposits.
    `;
    
    // Create platforms
    stage.platforms.forEach(platData => createPlatform(platData));

    // Create rivers (hazards)
    stage.rivers.forEach(riverData => createRiver(riverData));

    // Initialize dynamic terrain pointers so we can extend this stage when player moves right
    stage.nextX = (stage.platforms && stage.platforms.length)
      ? (Math.max(...stage.platforms.map(p => p.x + p.width)) + 120)
      : 800;
    stage.maxX = stage.maxX || (stage.nextX + 2400); // allow generous extension

    // Create (or move) goal area at the far right of this stage BEFORE spawning the player
    createGoalArea(stage);

  // Reset character position - spawn on first platform AFTER platforms and goal/support platforms are created
    const firstPlat = stage.platforms[0];
    if (firstPlat) {
      charX = firstPlat.x + Math.min(60, Math.floor(firstPlat.width / 3)); // keep spawn well inside platform
      // Place spawn slightly above platform so gravity brings player down naturally
      charY = firstPlat.y + firstPlat.height + 30;
    } else {
      // Fallback spawn
      charX = 60;
      charY = 120;
    }
    velocityX = 0;
    velocityY = 0;
    isGrounded = false;
    // Update character DOM immediately so deposits aren't placed overlapping the player
    try {
      character.style.left = charX + 'px';
      character.style.bottom = charY + 'px';
    } catch (e) {}

    // Center camera on spawn immediately so the character appears in view
    try {
      const contRect = container.getBoundingClientRect();
      const containerWidth = contRect.width || 800;
      cameraX = Math.max(0, charX - containerWidth * 0.45);
      container.scrollLeft = Math.floor(cameraX);
    } catch (e) {}

    // Give a short transition grace so the player doesn't immediately collide with hazards on stage load
    miniGameState.transitionGraceUntil = Date.now() + 800; // ms

    // Place deposits on platforms - spread them out across different platforms and away from spawn AND rivers
    const usedPositions = [];
    for (let i = 0; i < stage.deposits; i++) {
      // Pick a platform index: try to distribute one-per-platform first
      let platIndex;
      if (i < stage.platforms.length) {
        platIndex = i;
      } else {
        platIndex = Math.floor(Math.random() * stage.platforms.length);
      }
      const plat = stage.platforms[platIndex];

      // Generate position with spacing to avoid overlap, keep away from spawn, AND avoid rivers
      let x, attempts = 0;
      let isSafeFromRivers = false;
      do {
        const minX = plat.x + 10;
        const maxX = plat.x + Math.max(plat.width - 10, 40);
        x = minX + Math.random() * (maxX - minX);
        
        // Check if this deposit would be too close to any river (horizontally)
        isSafeFromRivers = true;
        for (const river of rivers) {
          // Deposit needs to be at least 60px away from river edges horizontally
          if (x >= river.x - 60 && x <= river.x + river.width + 60) {
            isSafeFromRivers = false;
            break;
          }
        }
        
        attempts++;
      } while ((usedPositions.some(pos => Math.abs(pos.x - x) < 100 && pos.platIndex === platIndex) || Math.abs(x - charX) < 120 || !isSafeFromRivers) && attempts < 60);

      // Position deposit so it sits on top of platform (bottom coordinate)
      const y = plat.y + plat.height;
      usedPositions.push({ x, platIndex });
      createDeposit(x, y, stage.palette);
    }
    
    // Initialize dynamic terrain pointers so we can extend this stage when player moves right
    stage.nextX = (stage.platforms && stage.platforms.length)
      ? (Math.max(...stage.platforms.map(p => p.x + p.width)) + 120)
      : 800;
    stage.maxX = stage.maxX || (stage.nextX + 2400); // allow generous extension

    // Reset game start time to prevent instant river collision
    gameStartTime = Date.now();

  // Create (or move) goal area at the far right of this stage
  createGoalArea(stage);

    showNotification(`🏞️ ${stage.name} — Collect ${stage.deposits} deposits!`, 1800);
  }

  function collectDeposit(dep) {
    if (!dep || dep.el.dataset.collected === 'true') return;
    
    dep.el.dataset.collected = 'true';
    const mult = parseInt(dep.el.dataset.multiplier) || 1;
    // Prefer explicit dataset quality, fall back to a label based on multiplier
    const qualFromData = (dep.el.dataset.quality || '').trim();
    const qual = qualFromData || (mult >= 3 ? 'High-quality' : (mult === 2 ? 'Good' : 'Fair'));
    // Log for debugging in case notifications are not visible in the UI
    try { console.log('collectDeposit triggered:', { x: dep.x, y: dep.y, multiplier: mult, quality: qual }); } catch (e) {}
    miniGameState.depositsCollected++;
    miniGameState.totalMultiplier += mult;
    miniGameState.stageDeposits++;
    
    // Visual collect cue
    dep.el.classList.add('collected');
    dep.el.style.transform = 'scale(1.3)';
    dep.el.style.opacity = '0.3';
    setTimeout(() => { try { dep.el.remove(); } catch(e) {} }, 300);
    
    document.getElementById('collected-count').textContent = 
      `${miniGameState.stageDeposits} / ${stage.deposits} deposits (Stage ${miniGameState.stageIndex + 1}/5)`;

    // Always show a quality + multiplier notification. Use a slightly longer duration so players see it.
    try {
      showNotification(`✓ ${qual} ochre (+${mult}x)`, 1200);
    } catch (e) {
      // Fallback: ensure at least a console message if showing the UI fails
      try { console.log(`Collected ochre: ${qual} (+${mult}x)`); } catch (e) {}
    }

    // Stage progression: do NOT auto-advance here. Player must reach the goal area to finish the stage.
    // We intentionally do not notify here when the required deposits are collected to avoid implying auto-advance.
    // The goal area handles advancement when the player reaches it.
  }

  function checkPickups() {
    if (!deposits.length) return;
    const charRect = character.getBoundingClientRect();
    deposits.forEach(dep => {
      try {
        if (dep.el.dataset.collected === 'true') return;
        const depRect = dep.el.getBoundingClientRect();
        if (rectsOverlap(charRect, depRect)) {
          collectDeposit(dep);
        }
      } catch (e) {}
    });
  }
  
  function checkRiverCollision() {
    // Don't check river collision in first 500ms to prevent instant death at spawn
    if (Date.now() - gameStartTime < 500) return false;
    // Also respect explicit stage-transition grace set during enterStage()
    if (miniGameState.transitionGraceUntil && Date.now() < miniGameState.transitionGraceUntil) return false;
    
    const charRect = character.getBoundingClientRect();
    for (const river of rivers) {
      const riverRect = river.el.getBoundingClientRect();
      if (rectsOverlap(charRect, riverRect)) {
        // Fell in river - game over!
        showNotification('💀 You fell in the river!', 1500);
        setTimeout(() => endMiniGame(false), 800);
        return true;
      }
    }
    return false;
  }

  function rectsOverlap(a, b) {
    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
  }

  // Dynamically extend stage terrain (platforms, occasional rivers, and deposits)
  function spawnExtraTerrain(stage) {
    // Don't exceed maxX
    if (!stage || stage.nextX >= stage.maxX) return;

    // If a goal area exists, avoid generating new terrain that lies at or beyond it
    try {
      if (goalArea) {
        const goalLeft = parseFloat(goalArea.style.left) || stage.maxX;
        if (stage.nextX >= goalLeft - 60) return; // already near or past goal
      }
    } catch (e) {}

    // Create a few new platforms ahead of nextX
    const pieces = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < pieces && stage.nextX < stage.maxX; i++) {
      const w = 80 + Math.floor(Math.random() * 220);
      // Vary height but keep mostly ground-level
      const y = 40 + Math.floor(Math.random() * 120);
      const plat = { x: stage.nextX, y: y, width: w, height: 12, decoration: Math.random() > 0.6 ? (Math.random()>0.5? '🌳':'🌿') : null };

      // If placing this platform would put it beyond the goal area, skip
      if (goalArea) {
        try {
          const goalLeft = parseFloat(goalArea.style.left) || stage.maxX;
          if (plat.x >= goalLeft - 40) {
            // do not create platforms past the goal
            break;
          }
          if (plat.x + plat.width >= goalLeft - 8) {
            // shrink platform so it doesn't cross into the goal zone
            plat.width = Math.max(24, Math.floor(goalLeft - 12 - plat.x));
          }
        } catch (e) {}
      }

      stage.platforms.push(plat);
      createPlatform(plat);

      // Occasionally insert a short river gap between pieces
      if (Math.random() > 0.7 && stage.nextX > 200) {
        const gapW = 80 + Math.floor(Math.random() * 160);
        const river = { x: stage.nextX + Math.floor(Math.random() * Math.max(10, w - 20)), y: 0, width: gapW, height: 60 };
        // Don't place a river that would overlap the goal
        if (goalArea) {
          try {
            const goalLeft = parseFloat(goalArea.style.left) || stage.maxX;
            if (river.x >= goalLeft - 40) {
              // skip river
            } else {
              stage.rivers.push(river);
              createRiver(river);
            }
          } catch (e) { stage.rivers.push(river); createRiver(river); }
        } else {
          stage.rivers.push(river);
          createRiver(river);
        }
      }

      // Place a deposit with a good chance on this new platform
      if (Math.random() > 0.3) {
        const depX = plat.x + 20 + Math.random() * Math.max(10, plat.width - 40);
        const depY = plat.y + plat.height;
        // ensure deposit isn't placed beyond the goal area
        if (goalArea) {
          try {
            const goalLeft = parseFloat(goalArea.style.left) || stage.maxX;
            if (depX < goalLeft - 40) {
              createDeposit(depX, depY, stage.palette);
              miniGameState.totalDepositsNeeded = (miniGameState.totalDepositsNeeded || 0) + 1;
            }
          } catch (e) { createDeposit(depX, depY, stage.palette); miniGameState.totalDepositsNeeded = (miniGameState.totalDepositsNeeded || 0) + 1; }
        } else {
          createDeposit(depX, depY, stage.palette);
          miniGameState.totalDepositsNeeded = (miniGameState.totalDepositsNeeded || 0) + 1;
        }
      }

      stage.nextX += w + 80 + Math.floor(Math.random() * 120);
    }
  }

  // Physics state - must be declared BEFORE enterStage is called
  let charX = 80;
  let charY = 300;
  let velocityX = 0;
  let velocityY = 0;
  const GRAVITY = 0.6;
  const JUMP_STRENGTH = -16; // increased so rivers are more jumpable
  const MOVE_SPEED = 5; // slightly faster movement for better traversal
  const MAX_FALL_SPEED = 15;
  let isGrounded = false;
  let canJump = true;
  let gameStartTime = 0; // Track when game starts to prevent instant river collision
  let cameraX = 0; // horizontal camera offset
  
  // Input state  
  const keys = { left: false, right: false, jump: false };

  // Start the first stage
  gameStartTime = Date.now();
  enterStage(0);

  
  // Movement - simplified, no stamina drain or complex hazards
  let moveInterval = null;
  
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  
  function handleKeyDown(e) {
    if (!miniGameState.active) return;
    if (e.key === 'ArrowLeft' || e.key === 'a') { keys.left = true; e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key === 'd') { keys.right = true; e.preventDefault(); }
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') { keys.jump = true; e.preventDefault(); }
  }
  
  function handleKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') { keys.jump = false; canJump = true; }
  }
  
  // Game loop with gravity and physics
  function gameLoop() {
    if (!miniGameState.active) return;
    
    const rect = container.getBoundingClientRect();
    const containerHeight = rect.height || 400;
    const containerWidth = rect.width || 800;
    
    // Apply gravity
    velocityY += GRAVITY;
    if (velocityY > MAX_FALL_SPEED) velocityY = MAX_FALL_SPEED;
    
    // Horizontal movement - use CSS classes for mirroring/animation instead of inline transforms
    if (keys.left) {
      velocityX = -MOVE_SPEED;
      character.classList.add('facing-left');
      character.classList.add('running');
      // ensure we don't leave inline transforms from older code
      character.style.transform = '';
    } else if (keys.right) {
      velocityX = MOVE_SPEED;
      character.classList.remove('facing-left');
      character.classList.add('running');
      character.style.transform = '';
    } else {
      velocityX = 0;
      character.classList.remove('running');
    }
    
    // Jump
    if (keys.jump && canJump && isGrounded) {
      velocityY = JUMP_STRENGTH;
      isGrounded = false;
      canJump = false;
    }
    
    // Update position (charY is distance from bottom, increases upward)
    charX += velocityX;
    charY -= velocityY; // Subtract because velocityY increases downward but charY is from bottom
    
    // Bounds
    if (charX < 0) charX = 0;
    // Allow charX to move beyond the visible container so camera can follow.
    // Clamp to stage bounds if available to prevent running past the goal.
    try {
      const stage = stages[miniGameState.stageIndex];
      if (stage && stage.maxX) {
        const maxCharX = Math.max(stage.maxX - 32, (stage.nextX || 0) - 32);
        if (charX > maxCharX) charX = maxCharX;
      }
    } catch (e) {}
    if (charY < 0) charY = 0; // Don't fall below bottom
    
    // Platform collision detection (charY is distance from bottom)
    isGrounded = false;
    const charLeft = charX;
    const charRight = charX + 28;
    
    for (const plat of platforms) {
      const platTop = plat.y + plat.height;
      
      // Check if character is landing on platform from above
      if (velocityY >= 0 && 
          charY >= plat.y && charY <= platTop + 10 &&
          charRight > plat.x + 5 && charLeft < plat.x + plat.width - 5) {
        charY = platTop; // Land on top of platform
        velocityY = 0;
        isGrounded = true;
        canJump = true;
        break;
      }
    }
    
    // Check if fell off screen or fell too far without landing
    if (charY < -50 || (velocityY > 8 && !isGrounded && charY < 50)) {
      showNotification('💀 You fell!', 1200);
      setTimeout(() => endMiniGame(false), 600);
      return;
    }
    
    // Update visuals (CSS bottom property)
    character.style.left = charX + 'px';
    character.style.bottom = charY + 'px';

    // Camera follow: move cameraX to keep character toward right side as they progress
    try {
      const contRect = container.getBoundingClientRect();
      const containerWidth = contRect.width || 800;
      // keep camera a bit ahead of center so player sees upcoming terrain
      const desired = Math.max(0, charX - containerWidth * 0.45);
      // Smooth follow
      cameraX += (desired - cameraX) * 0.18;
      container.scrollLeft = Math.floor(cameraX);

      // If player approaches the right side of currently generated terrain, spawn more
      const stage = stages[miniGameState.stageIndex];
      if (stage && charX + container.scrollLeft > (stage.nextX - containerWidth * 0.6)) {
        spawnExtraTerrain(stage);
      }
    } catch (e) {}

    // Extra fall-death check using DOM rects (if character falls below visible container)
    try {
      const charRect = character.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();
      // Skip this check during the short transition grace period
      if (!(miniGameState.transitionGraceUntil && Date.now() < miniGameState.transitionGraceUntil)) {
        if (charRect.top > contRect.bottom + 40) {
          showNotification('💀 You fell!', 1200);
          setTimeout(() => endMiniGame(false), 600);
          return;
        }
      }
    } catch (e) {}

    // Check collisions with a short grace period after stage spawn
    if (Date.now() - gameStartTime > 300) {
      try { checkPickups(); } catch (e) {}
    }
    if (Date.now() - gameStartTime > 500) {
      if (checkRiverCollision()) return; // Stop if fell in river
    }
    
    // Goal area check: if player reaches the goal and has all deposits, advance
    try {
      if (goalArea && !miniGameState.goalTriggered) {
        const charRect = character.getBoundingClientRect();
        const goalRect = goalArea.getBoundingClientRect();
        if (rectsOverlap(charRect, goalRect)) {
          const stage = stages[miniGameState.stageIndex];
          const remaining = (stage.deposits || 0) - (miniGameState.stageDeposits || 0);
          if (remaining <= 0) {
            // Capture the next stage index and set flag to prevent multiple triggers
            const nextStageIndex = miniGameState.stageIndex + 1;
            miniGameState.goalTriggered = true; // prevent repeat triggers
            if (nextStageIndex < stages.length) {
              showNotification('✅ Goal reached! Proceeding to next stage...', 1200);
              setTimeout(() => {
                miniGameState.goalTriggered = false; // reset for next stage
                enterStage(nextStageIndex);
              }, 700);
            } else {
              showNotification('🏁 You completed all stages!', 1400);
              setTimeout(() => endMiniGame(true), 800);
            }
          } else {
            showNotification(`🔒 You need ${remaining} more deposit(s) to unlock the next stage.`, 1400);
          }
        }
      }
    } catch (e) {}
    
    requestAnimationFrame(gameLoop);
  }
  
  // Start game loop
  gameLoop();
}

// ========================================
// MULTI-DAY EXPEDITION - THE MOUNTAIN JOURNEY
// Enhanced with beautiful multi-stage journey system
// ========================================
// MOUNTAIN EXPEDITION - CHARACTER PICKER
// ========================================

function showCharacterPicker(container, controls, instructions, gameData) {
  const characters = [
    { image: 'horse.png', name: 'Horse' },
    { image: 'ox.png', name: 'Ox' }
  ];
  
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 2rem;">
      <h2 style="color: var(--ochre-yellow); font-family: var(--font-title); font-size: 2rem; margin-bottom: 1rem; text-align: center;">
        Choose Your Character
      </h2>
      <p style="color: var(--limestone); text-align: center; margin-bottom: 2rem; font-size: 1.1rem;">
        Select the icon that will represent you on this perilous journey
      </p>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 400px;">
        ${characters.map((char, i) => `
          <div class="character-option" data-image="${char.image}" style="
            background: rgba(139, 69, 19, 0.4);
            border: 3px solid var(--stone-gray);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
          " onmouseover="this.style.transform='scale(1.1)'; this.style.borderColor='var(--ochre-yellow)'"
             onmouseout="this.style.transform='scale(1)'; this.style.borderColor='var(--stone-gray)'">
            <img src="${char.image}" alt="${char.name}" style="width: 80px; height: 80px; object-fit: contain;">
            <div style="color: var(--ochre-yellow); font-weight: bold; font-size: 0.9rem; margin-top: 0.5rem;">${char.name}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // Add click handlers
  container.querySelectorAll('.character-option').forEach(option => {
    option.addEventListener('click', () => {
      miniGameState.selectedCharacter = option.dataset.image;
      setupMultiDayExpedition(container, controls, instructions, gameData);
    });
  });
  
  controls.innerHTML = '';
}

// ========================================
// MOUNTAIN EXPEDITION - MULTI-DAY JOURNEY
// ========================================

function setupMultiDayExpedition(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>🏔️ The Mountain Expedition</strong> - A 50+ km Journey for Manganese - Travel through valleys, forests, and mountains to find rare manganese deposits
  `;
  
  container.innerHTML = '';
  container.style.background = 'linear-gradient(180deg, #87CEEB 0%, #6B8E23 50%, #3C2A1E 100%)';
  
  // Show character picker first
  if (!miniGameState.selectedCharacter) {
    showCharacterPicker(container, controls, instructions, gameData);
    return;
  }
  
  // Enhanced state
  miniGameState.stage = 0; // 0=valley, 1=foothills, 2=forest, 3=mountain, 4=deposit site
  miniGameState.progress = 0; // Progress through current stage
  miniGameState.stamina = 100;
  miniGameState.food = 100;
  miniGameState.water = 100;
  miniGameState.foundManganese = false;
  miniGameState.rocksTested = 0;
  miniGameState.journeyDistance = 0;
  miniGameState.daysPassed = 1;
  miniGameState.weatherCondition = 'clear'; // clear, rain, wind, storm
  miniGameState.encounterLog = [];
  miniGameState.campsitesVisited = 0;
  
  const stages = [
    { 
      name: 'River Valley', 
      distance: 12, 
      bg: 'linear-gradient(180deg, #87CEEB 0%, #6B8E23 70%, #8B7355 100%)', 
      icon: '🌾', 
      hazards: ['Swollen river crossing', 'Muddy banks', 'Hidden sinkholes'],
      features: ['Wild berry bushes', 'Fresh water source', 'Deer tracks'],
      description: 'Lush valley with a winding river. The landscape is beautiful but treacherous.'
    },
    { 
      name: 'Rolling Foothills', 
      distance: 16, 
      bg: 'linear-gradient(180deg, #87CEEB 0%, #8B7355 50%, #1B1B1B 100%)', 
      icon: '⛰️', 
      hazards: ['Loose scree slopes', 'Twisted ankle risk', 'Steep inclines'],
      features: ['Sheltered caves', 'Edible roots', 'Mountain springs'],
      description: 'Rocky hills rise before you. The path grows steeper with each step.'
    },
    { 
      name: 'Dense Pine Forest', 
      distance: 14, 
      bg: 'linear-gradient(180deg, #4A90E2 0%, #2d5016 60%, #1a3010 100%)', 
      icon: '🌲', 
      hazards: ['Easy to get lost', 'Thorny undergrowth', 'Predator territory'],
      features: ['Pine nuts', 'Medicinal herbs', 'Natural shelter'],
      description: 'Ancient pines block the sun. Sounds echo strangely in the gloom.'
    },
    { 
      name: 'Mountain Ascent', 
      distance: 13, 
      bg: 'linear-gradient(180deg, #6B7B8C 0%, #4A5568 50%, #2C3540 100%)', 
      icon: '🏔️', 
      hazards: ['Thin air exhaustion', 'Extreme weather', 'Cliff edges'],
      features: ['Snow melt water', 'Mountain goat paths', 'Windbreak rocks'],
      description: 'The air grows thin. Each breath is a battle. The summit calls.'
    },
    { 
      name: 'Limestone Plateau', 
      distance: 10, 
      bg: 'linear-gradient(180deg, #3C3C3C 0%, #2C2418 50%, #1a1410 100%)', 
      icon: '🕳️', 
      hazards: ['Hidden cave shafts', 'Disorienting darkness', 'Unstable ground'],
      features: ['Cave systems', 'Mineral deposits', 'Underground streams'],
      description: 'Weathered limestone riddled with caves. Manganese deposits await below.'
    }
  ];
  
  // Create enhanced UI
  const journeyUI = document.createElement('div');
  journeyUI.className = 'mountain-journey-ui';
  journeyUI.style.cssText = `
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.92);
    padding: 6px 12px;
    border-radius: 8px;
    border: 2px solid var(--ochre-yellow);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8);
    z-index: 100;
    max-width: 95%;
    font-size: 0.75rem;
  `;
  
  journeyUI.innerHTML = `
    <div style="text-align: center; margin-bottom: 4px;">
      <div style="font-size: 0.9rem; font-weight: bold; color: var(--ochre-yellow); margin-bottom: 2px;">
        <span id="stage-icon">${stages[0].icon}</span> <span id="stage-name">${stages[0].name}</span>
      </div>
      <div style="color: var(--limestone); font-size: 0.65rem;">
        Day <span id="day-counter">1</span> | Distance: <span id="total-distance">0</span>/65 km | 
        <span id="weather-display">🌤️ Clear</span>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 4px;">
      <div class="stat-panel" style="padding: 3px;">
        <div class="stat-label" style="font-size: 0.65rem; margin-bottom: 1px;">💪 Stamina</div>
        <div class="stat-bar-bg" style="height: 8px; margin-bottom: 1px;">
          <div class="stat-bar-fill stamina-bar" id="stamina-bar" style="width: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A);"></div>
        </div>
        <div class="stat-value" style="font-size: 0.6rem;" id="stamina-value">100%</div>
      </div>
      <div class="stat-panel" style="padding: 3px;">
        <div class="stat-label" style="font-size: 0.65rem; margin-bottom: 1px;">🍖 Food</div>
        <div class="stat-bar-bg" style="height: 8px; margin-bottom: 1px;">
          <div class="stat-bar-fill food-bar" id="food-bar" style="width: 100%; background: linear-gradient(90deg, #FF6B35, #FDB813);"></div>
        </div>
        <div class="stat-value" style="font-size: 0.6rem;" id="food-value">100%</div>
      </div>
      <div class="stat-panel" style="padding: 3px;">
        <div class="stat-label" style="font-size: 0.65rem; margin-bottom: 1px;">💧 Water</div>
        <div class="stat-bar-bg" style="height: 8px; margin-bottom: 1px;">
          <div class="stat-bar-fill water-bar" id="water-bar" style="width: 100%; background: linear-gradient(90deg, #2196F3, #03A9F4);"></div>
        </div>
        <div class="stat-value" style="font-size: 0.6rem;" id="water-value">100%</div>
      </div>
    </div>
    
    <div style="background: rgba(139, 69, 19, 0.3); padding: 3px 6px; border-radius: 4px; margin-bottom: 4px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
        <span style="color: var(--limestone); font-weight: bold; font-size: 0.65rem;">Stage Progress</span>
        <span style="color: var(--ochre-yellow); font-size: 0.65rem;" id="stage-progress-text">0 / ${stages[0].distance} km</span>
      </div>
      <div style="background: rgba(0,0,0,0.5); border-radius: 3px; overflow: hidden; height: 8px;">
        <div id="stage-progress-bar" style="height: 100%; background: linear-gradient(90deg, #DAA520, #FFD700); width: 0%; transition: width 0.5s ease;"></div>
      </div>
    </div>
    
    <div id="biome-description" style="background: rgba(0, 0, 0, 0.5); padding: 3px; border-radius: 4px; margin-bottom: 3px; font-size: 0.65rem; color: var(--limestone); text-align: center; font-style: italic;">
      ${stages[0].description}
    </div>
    
    <div id="event-log" style="background: rgba(0, 0, 0, 0.6); padding: 3px; border-radius: 4px; max-height: 35px; overflow-y: auto; font-size: 0.65rem; color: var(--limestone);">
      <div class="log-entry">🚶 Journey begins from the settlement...</div>
    </div>
  `;
  container.appendChild(journeyUI);
  
  // Create landscape layers with parallax
  const landscapeContainer = document.createElement('div');
  landscapeContainer.className = 'expedition-landscape';
  landscapeContainer.style.cssText = `
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
  `;
  
  // Sky layer with moving clouds
  const skyLayer = document.createElement('div');
  skyLayer.className = 'expedition-sky';
  skyLayer.style.cssText = `
    position: absolute;
    width: 100%;
    height: 60%;
    top: 0;
    left: 0;
    z-index: 1;
  `;
  
  // Add animated clouds
  for (let i = 0; i < 4; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'expedition-cloud';
    cloud.style.cssText = `
      position: absolute;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 100px;
      width: ${80 + Math.random() * 60}px;
      height: ${30 + Math.random() * 20}px;
      top: ${10 + Math.random() * 30}%;
      left: ${-20 + Math.random() * 120}%;
      animation: cloudDrift ${40 + Math.random() * 30}s linear infinite;
      animation-delay: ${-Math.random() * 20}s;
    `;
    skyLayer.appendChild(cloud);
  }
  
  // Add sun/moon based on day
  const celestial = document.createElement('div');
  celestial.id = 'expedition-celestial';
  celestial.className = 'expedition-sun';
  celestial.style.cssText = `
    position: absolute;
    top: 15%;
    right: 15%;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, #FDB813 0%, #FF8C00 70%);
    border-radius: 50%;
    box-shadow: 0 0 40px rgba(253, 184, 19, 0.8);
    transition: all 1s ease;
  `;
  skyLayer.appendChild(celestial);
  
  // Weather layer (for rain/snow effects)
  const weatherLayer = document.createElement('div');
  weatherLayer.id = 'expedition-weather-layer';
  weatherLayer.style.cssText = `
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 25;
  `;
  skyLayer.appendChild(weatherLayer);
  
  landscapeContainer.appendChild(skyLayer);
  
  // Far mountains
  const farMountains = document.createElement('div');
  farMountains.className = 'expedition-far-mountains';
  farMountains.style.cssText = `
    position: absolute;
    bottom: 30%;
    width: 100%;
    height: 25%;
    background: linear-gradient(to bottom, transparent 0%, rgba(107, 123, 140, 0.6) 40%, rgba(74, 85, 104, 0.8) 100%);
    clip-path: polygon(0 70%, 15% 45%, 30% 60%, 50% 30%, 70% 55%, 85% 40%, 100% 65%, 100% 100%, 0 100%);
    z-index: 2;
  `;
  landscapeContainer.appendChild(farMountains);
  
  // Mid-layer (changes based on biome)
  const midLayer = document.createElement('div');
  midLayer.id = 'expedition-mid-layer';
  midLayer.className = 'expedition-mid-layer';
  midLayer.style.cssText = `
    position: absolute;
    bottom: 15%;
    width: 100%;
    height: 30%;
    z-index: 3;
  `;
  landscapeContainer.appendChild(midLayer);
  
  // Ground layer
  const groundLayer = document.createElement('div');
  groundLayer.className = 'expedition-ground';
  groundLayer.style.cssText = `
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25%;
    background: linear-gradient(180deg, var(--earth-brown) 0%, #3C2A1E 100%);
    z-index: 4;
  `;
  landscapeContainer.appendChild(groundLayer);
  
  // Character sprite (image-based with CSS animation + graceful fallback)
  const character = document.createElement('div');
  character.className = 'expedition-character character-sprite';
  character.id = 'journey-character';
  character.style.cssText = `
    position: absolute;
    bottom: 25%;
    left: 15%;
    z-index: 10;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8));
    transition: left 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // Use provided PNG sprite if available (cha1.png) — fallback to emoji if loading fails
  const charImg = document.createElement('img');
  // Prefer user-selected character if it's a PNG, otherwise default to cha1.png
  charImg.src = (miniGameState.selectedCharacter && miniGameState.selectedCharacter.endsWith('.png')) ? miniGameState.selectedCharacter : 'cha1.png';
  charImg.alt = 'Explorer';
  charImg.className = 'character-img';
  charImg.style.cssText = 'width: 36px; height: 46px; object-fit: contain; display: block;';
  // If image fails to load, remove it and show a simple emoji fallback
  charImg.onerror = function() {
    try { charImg.remove(); } catch(e) {}
    character.textContent = '🚶';
    character.style.fontSize = '2.8rem';
  };
  character.appendChild(charImg);
  landscapeContainer.appendChild(character);
  
  container.appendChild(landscapeContainer);
  
  // Journey controls
  controls.innerHTML = `
    <div style="display: flex; gap: 10px; align-items: flex-start; justify-content: space-between; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 250px; background: rgba(0,0,0,0.5); padding: 6px 10px; border-radius: 6px; font-size: 0.7rem; line-height: 1.3;">
        <div style="color: #FFD700; margin-bottom: 2px;">⭐ Manage stamina, food, and water</div>
        <div style="color: #4CAF50; margin-bottom: 2px;">✓ No time limit - only success matters!</div>
        <div style="color: #FF6B35;">⚠️ Death means failure - you get NOTHING!</div>
      </div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <button class="btn-primary expedition-action-btn" id="continue-journey-btn" style="font-size: 1rem; padding: 10px 20px;">
          🚶 Continue Journey
        </button>
        <button class="btn-secondary expedition-action-btn" id="rest-btn" style="padding: 10px 20px;">
          😴 Rest
        </button>
        <button class="btn-secondary expedition-action-btn" id="forage-btn" style="padding: 10px 20px;">
          🔍 Forage
        </button>
      </div>
    </div>
    <div id="rock-testing-area" style="display: none; margin-top: 20px;">
      <div style="background: rgba(0, 0, 0, 0.8); padding: 20px; border-radius: 12px; border: 3px solid var(--ochre-yellow);">
        <h3 style="color: var(--ochre-yellow); text-align: center; margin-bottom: 15px;">🪨 Test Rock Samples - Streak Method</h3>
        <p style="color: var(--limestone); text-align: center; margin-bottom: 15px; font-style: italic;">
          Rub each rock on unglazed ceramic. <strong>Black streak = Manganese (MnO₂)</strong>
        </p>
        <div id="rock-samples-container" style="display: flex; gap: 15px; justify-center; flex-wrap: wrap;">
        </div>
      </div>
    </div>
  `;
  
  // Weather system
  function updateWeather() {
    const weatherConditions = [
      { type: 'clear', icon: '🌤️', text: 'Clear skies', drainMultiplier: 1.0 },
      { type: 'cloudy', icon: '☁️', text: 'Overcast', drainMultiplier: 1.1 },
      { type: 'rain', icon: '🌧️', text: 'Heavy rain', drainMultiplier: 1.5 },
      { type: 'wind', icon: '💨', text: 'Strong winds', drainMultiplier: 1.3 },
      { type: 'storm', icon: '⛈️', text: 'Thunderstorm', drainMultiplier: 2.0 }
    ];
    
    // Random weather changes
    if (Math.random() > 0.7) {
      const newWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      miniGameState.weatherCondition = newWeather.type;
      miniGameState.weatherMultiplier = newWeather.drainMultiplier;
      
      document.getElementById('weather-display').textContent = `${newWeather.icon} ${newWeather.text}`;
      
      // Add visual weather effects
      const weatherLayer = document.getElementById('expedition-weather-layer');
      weatherLayer.innerHTML = '';
      
      if (newWeather.type === 'rain' || newWeather.type === 'storm') {
        // Add rain drops
        for (let i = 0; i < 30; i++) {
          const raindrop = document.createElement('div');
          raindrop.className = 'raindrop';
          raindrop.style.left = Math.random() * 100 + '%';
          raindrop.style.animationDelay = Math.random() * 1 + 's';
          raindrop.style.animationDuration = (0.3 + Math.random() * 0.3) + 's';
          weatherLayer.appendChild(raindrop);
        }
        
        // Darken sky for storm
        if (newWeather.type === 'storm') {
          const skyLayer = weatherLayer.parentElement;
          skyLayer.style.filter = 'brightness(0.6)';
          
          // Lightning effect
          setTimeout(() => {
            weatherLayer.style.background = 'rgba(255, 255, 255, 0.8)';
            setTimeout(() => {
              weatherLayer.style.background = 'transparent';
            }, 100);
          }, 2000 + Math.random() * 3000);
        }
      } else if (newWeather.type === 'wind') {
        // Faster cloud movement
        document.querySelectorAll('.expedition-cloud').forEach(cloud => {
          cloud.style.animationDuration = '15s';
        });
      }
      
      addLogEntry(`${newWeather.icon} Weather changed: ${newWeather.text}`);
    }
  }
  
  // Log entry system
  function addLogEntry(message) {
    const eventLog = document.getElementById('event-log');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = message;
    entry.style.animation = 'fadeIn 0.5s ease-out';
    eventLog.insertBefore(entry, eventLog.firstChild);
    
    // Keep only last 5 entries
    while (eventLog.children.length > 5) {
      eventLog.removeChild(eventLog.lastChild);
    }
  }
  
  // Update biome visuals
  function updateBiomeVisuals(stageIndex) {
    const stage = stages[stageIndex];
    container.style.background = stage.bg;
    
    // Update description
    document.getElementById('biome-description').textContent = stage.description;
    
    // Update mid-layer based on biome
    const midLayer = document.getElementById('expedition-mid-layer');
    midLayer.innerHTML = '';
    
    switch(stageIndex) {
      case 0: // Valley - Add grass and flowers
        for (let i = 0; i < 8; i++) {
          const grass = document.createElement('div');
          grass.style.cssText = `
            position: absolute;
            bottom: 0;
            left: ${i * 12}%;
            width: 80px;
            height: 60px;
            background: linear-gradient(to top, transparent, rgba(107, 142, 35, 0.6));
            clip-path: polygon(40% 100%, 45% 20%, 50% 0%, 55% 20%, 60% 100%);
          `;
          midLayer.appendChild(grass);
        }
        break;
      case 1: // Foothills - Add rocks
        for (let i = 0; i < 6; i++) {
          const rock = document.createElement('div');
          rock.style.cssText = `
            position: absolute;
            bottom: ${Math.random() * 40}%;
            left: ${10 + i * 15}%;
            width: ${30 + Math.random() * 30}px;
            height: ${25 + Math.random() * 25}px;
            background: linear-gradient(135deg, #8B8680 0%, #1B1B1B 100%);
            border-radius: ${Math.random() * 10}px;
            box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.6);
          `;
          midLayer.appendChild(rock);
        }
        break;
      case 2: // Forest - Add trees
        for (let i = 0; i < 7; i++) {
          const tree = document.createElement('div');
          const treeSize = 60 + Math.random() * 40;
          tree.style.cssText = `
            position: absolute;
            bottom: 0;
            left: ${5 + i * 14}%;
            font-size: ${treeSize}px;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
            opacity: 0.8;
          `;
          tree.textContent = '🌲';
          midLayer.appendChild(tree);
        }
        break;
      case 3: // Mountains - Add peaks
        midLayer.style.background = 'linear-gradient(to bottom, transparent 0%, rgba(139, 134, 128, 0.7) 50%, rgba(92, 64, 51, 0.9) 100%)';
        midLayer.style.clipPath = 'polygon(0 80%, 20% 40%, 40% 60%, 60% 20%, 80% 50%, 100% 70%, 100% 100%, 0 100%)';
        break;
      case 4: // Cave - Add cave entrance
        const caveEntrance = document.createElement('div');
        caveEntrance.style.cssText = `
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 100px;
          background: radial-gradient(ellipse at center, #0a0806 0%, #1a1410 60%, transparent 100%);
          border-radius: 50% 50% 0 0;
          box-shadow: inset 0 -20px 40px rgba(0, 0, 0, 0.9);
        `;
        midLayer.appendChild(caveEntrance);
        
        const caveGlow = document.createElement('div');
        caveGlow.style.cssText = `
          position: absolute;
          bottom: 15%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 3rem;
          animation: gatherPulse 2s ease-in-out infinite;
        `;
        caveGlow.textContent = '✨';
        midLayer.appendChild(caveGlow);
        break;
    }
  }
  
  updateBiomeVisuals(0);
  
  // Journey mechanics
  let resourceDrainInterval = setInterval(() => {
    if (!miniGameState.active || miniGameState.stage >= 5) {
      clearInterval(resourceDrainInterval);
      return;
    }
    
    // Natural resource drain (affected by weather)
    const weatherMult = miniGameState.weatherMultiplier || 1.0;
    miniGameState.stamina = Math.max(0, miniGameState.stamina - (0.4 * weatherMult));
    miniGameState.food = Math.max(0, miniGameState.food - (0.25 * weatherMult));
    miniGameState.water = Math.max(0, miniGameState.water - (0.4 * weatherMult));
    
    updateResourceDisplay();
    
    // Check failure conditions
    if (miniGameState.stamina <= 0) {
      clearInterval(resourceDrainInterval);
      addLogEntry('💀 Collapsed from exhaustion...');
      showNotification('💀 EXPEDITION FAILED - Exhausted! You receive NOTHING.', 4000);
      setTimeout(() => endMiniGame(false), 3000);
    } else if (miniGameState.food <= 0) {
      clearInterval(resourceDrainInterval);
      addLogEntry('💀 Starved to death...');
      showNotification('� EXPEDITION FAILED - Starvation! You receive NOTHING.', 4000);
      setTimeout(() => endMiniGame(false), 3000);
    } else if (miniGameState.water <= 0) {
      clearInterval(resourceDrainInterval);
      addLogEntry('💀 Died of thirst...');
      showNotification('💀 EXPEDITION FAILED - Dehydration! You receive NOTHING.', 4000);
      setTimeout(() => endMiniGame(false), 3000);
    }
  }, 600);
  
  function updateResourceDisplay() {
    const staminaBar = document.getElementById('stamina-bar');
    const foodBar = document.getElementById('food-bar');
    const waterBar = document.getElementById('water-bar');
    const staminaValue = document.getElementById('stamina-value');
    const foodValue = document.getElementById('food-value');
    const waterValue = document.getElementById('water-value');
    
    if (!staminaBar) return;
    
    staminaBar.style.width = miniGameState.stamina + '%';
    foodBar.style.width = miniGameState.food + '%';
    waterBar.style.width = miniGameState.water + '%';
    
    staminaValue.textContent = Math.round(miniGameState.stamina) + '%';
    foodValue.textContent = Math.round(miniGameState.food) + '%';
    waterValue.textContent = Math.round(miniGameState.water) + '%';
    
    // Color warnings
    if (miniGameState.stamina < 30) staminaBar.style.background = 'linear-gradient(90deg, #F44336, #E91E63)';
    if (miniGameState.food < 30) foodBar.style.background = 'linear-gradient(90deg, #F44336, #E91E63)';
    if (miniGameState.water < 30) waterBar.style.background = 'linear-gradient(90deg, #F44336, #E91E63)';
  }
  
  // Continue journey button
  document.getElementById('continue-journey-btn').addEventListener('click', () => {
    if (miniGameState.stamina < 12) {
      showNotification('⚠️ Too exhausted! Rest before continuing.', 2000);
      return;
    }
    
    const stage = stages[miniGameState.stage];
    
    // Advance progress
    const baseProgress = 1.5 + Math.random() * 1.5;
    const weatherMult = miniGameState.weatherMultiplier || 1.0;
    const progressIncrement = baseProgress / weatherMult; // Slower in bad weather
    miniGameState.progress += progressIncrement;
    miniGameState.journeyDistance += progressIncrement;
    
    // Consume resources (affected by weather)
    const staminaDrain = (8 + Math.random() * 7) * weatherMult;
    const foodDrain = (3 + Math.random() * 3) * weatherMult;
    const waterDrain = (4 + Math.random() * 4) * weatherMult;
    
    miniGameState.stamina -= staminaDrain;
    miniGameState.food -= foodDrain;
    miniGameState.water -= waterDrain;
    
    // Animate character
    const journeyCharacter = document.getElementById('journey-character');
    if (journeyCharacter) {
      journeyCharacter.style.transform = 'translateX(20px)';
      setTimeout(() => journeyCharacter.style.transform = 'translateX(0)', 300);
    }
    
    addLogEntry(`🚶 Traveled ${progressIncrement.toFixed(1)} km through ${stage.name}`);
    
    // Update progress bar
    const progressPercent = Math.min(100, (miniGameState.progress / stage.distance) * 100);
    document.getElementById('stage-progress-bar').style.width = progressPercent + '%';
    document.getElementById('stage-progress-text').textContent = `${miniGameState.progress.toFixed(1)} / ${stage.distance} km`;
    document.getElementById('total-distance').textContent = miniGameState.journeyDistance.toFixed(1);
    
    // Move character along with progress
    if (journeyCharacter) {
      const characterPosition = 15 + (progressPercent * 0.7); // Move from 15% to 85% of the screen
      journeyCharacter.style.left = characterPosition + '%';
    }
    
    // Random hazard events
    if (Math.random() > 0.65) {
      const hazard = stage.hazards[Math.floor(Math.random() * stage.hazards.length)];
      const hazardWarning = document.getElementById('hazard-warning');
      const hazardText = document.getElementById('hazard-text');
      hazardText.textContent = hazard + '!';
      hazardWarning.style.display = 'block';
      
      const hazardDamage = 8 + Math.random() * 12;
      miniGameState.stamina -= hazardDamage;
      addLogEntry(`⚠️ ${hazard} - Lost ${hazardDamage.toFixed(0)} stamina!`);
      
      setTimeout(() => hazardWarning.style.display = 'none', 4000);
    }
    
    // Random beneficial events
    if (Math.random() > 0.8) {
      const feature = stage.features[Math.floor(Math.random() * stage.features.length)];
      const benefit = Math.floor(Math.random() * 3);
      
      if (benefit === 0) {
        miniGameState.food = Math.min(100, miniGameState.food + 10);
        addLogEntry(`✨ Found ${feature}! +10 food`);
        showNotification(`✨ Discovered ${feature}!`, 2000);
      } else if (benefit === 1) {
        miniGameState.water = Math.min(100, miniGameState.water + 15);
        addLogEntry(`✨ Found ${feature}! +15 water`);
        showNotification(`✨ Discovered ${feature}!`, 2000);
      } else {
        miniGameState.stamina = Math.min(100, miniGameState.stamina + 8);
        addLogEntry(`✨ Found ${feature}! +8 stamina`);
        showNotification(`✨ Discovered ${feature}!`, 2000);
      }
    }
    
    // Weather updates
    updateWeather();
    
    updateResourceDisplay();
    
    // Check if stage complete
    if (miniGameState.progress >= stage.distance) {
      miniGameState.stage++;
      miniGameState.progress = 0;
      miniGameState.campsitesVisited++;
      
      if (miniGameState.stage < stages.length) {
        // New stage - rest at campsite
        const newStage = stages[miniGameState.stage];
        
        // Campsite rest
        showNotification(`🏕️ Setting up camp before entering ${newStage.name}...`, 2500);
        addLogEntry(`🏕️ Made camp at the edge of ${newStage.name}`);
        
        setTimeout(() => {
          // Partial recovery during camp
          miniGameState.stamina = Math.min(100, miniGameState.stamina + 30);
          miniGameState.food = Math.max(0, miniGameState.food - 10); // Consume food
          miniGameState.water = Math.max(0, miniGameState.water - 10);
          
          addLogEntry(`😴 Rested at camp. Stamina restored, supplies consumed.`);
          
          document.getElementById('stage-name').textContent = newStage.name;
          document.getElementById('stage-icon').textContent = newStage.icon;
          document.getElementById('stage-progress-text').textContent = `0 / ${newStage.distance} km`;
          document.getElementById('stage-progress-bar').style.width = '0%';
          
          // Reset character position for new stage
          const journeyCharacter = document.getElementById('journey-character');
          if (journeyCharacter) {
            journeyCharacter.style.left = '15%';
          }
          
          updateBiomeVisuals(miniGameState.stage);
          updateResourceDisplay();
          
          const remainingKm = 65 - miniGameState.journeyDistance.toFixed(0);
          showNotification(`🗺️ Entering ${newStage.name}... ${remainingKm} km to manganese deposits.`, 3000);
          
          // Advance day if past midpoint
          if (miniGameState.stage % 2 === 0) {
            miniGameState.daysPassed++;
            document.getElementById('day-counter').textContent = miniGameState.daysPassed;
            addLogEntry(`🌅 Day ${miniGameState.daysPassed} begins`);
            
            // Change sun position for new day
            const celestial = document.getElementById('expedition-celestial');
            celestial.style.top = '15%';
            celestial.style.right = (10 + miniGameState.daysPassed * 5) + '%';
          }
          
          // Reached deposit site!
          if (miniGameState.stage === 4) {
            addLogEntry(`🎯 ARRIVED at the limestone plateau!`);
            showNotification('🎉 Finally reached the manganese deposits! Now to identify the right rocks...', 4000);
            
            // STOP resource drain when rock testing begins
            clearInterval(resourceDrainInterval);
            
            setTimeout(() => {
              // Remove the expedition character and any leftover sprites so UI testing area is clean
              try {
                const jc = document.getElementById('journey-character');
                if (jc) jc.remove();
                // Also remove any stray .character-sprite elements inside the modal/container
                const stray = container.querySelectorAll('.character-sprite');
                stray.forEach(n => { if (n && n.parentElement) try { n.remove(); } catch (e) {} });
                // Remove the (possible) spawn debug marker if it exists
                const dbg = document.getElementById('spawn-debug-marker');
                if (dbg) try { dbg.remove(); } catch (e) {}
              } catch (e) {}

              document.getElementById('continue-journey-btn').style.display = 'none';
              document.getElementById('rest-btn').style.display = 'none';
              document.getElementById('forage-btn').style.display = 'none';
              document.getElementById('rock-testing-area').style.display = 'block';
              setupRockTesting();
            }, 4000);
          }
        }, 2500);
      }
    }
  });
  
  // Rest button
  document.getElementById('rest-btn').addEventListener('click', () => {
    const staminaGain = 30 + Math.random() * 15;
    miniGameState.stamina = Math.min(100, miniGameState.stamina + staminaGain);
    miniGameState.food -= 10;
    miniGameState.water -= 8;
    
    updateResourceDisplay();
    addLogEntry(`😴 Rested. +${staminaGain.toFixed(0)} stamina, consumed supplies.`);
    showNotification(`😴 Brief rest... +${staminaGain.toFixed(0)} stamina`, 2000);
    
    // Small weather check during rest
    if (Math.random() > 0.6) {
      updateWeather();
    }
  });
  
  // Forage button
  document.getElementById('forage-btn').addEventListener('click', () => {
    const stage = stages[miniGameState.stage];
    const foodGain = 12 + Math.random() * 18;
    const waterGain = 8 + Math.random() * 17;
    const staminaCost = 12 + Math.random() * 8;
    
    miniGameState.food = Math.min(100, miniGameState.food + foodGain);
    miniGameState.water = Math.min(100, miniGameState.water + waterGain);
    miniGameState.stamina -= staminaCost;
    
    // Random forage encounters
    const forageResults = [
      `wild berries and nuts`,
      `edible roots and tubers`,
      `fresh water from a stream`,
      `${stage.features[0].toLowerCase()}`,
      `medicinal herbs and clean water`
    ];
    
    const result = forageResults[Math.floor(Math.random() * forageResults.length)];
    
    updateResourceDisplay();
    addLogEntry(`🔍 Foraged ${result}. +${foodGain.toFixed(0)} food, +${waterGain.toFixed(0)} water`);
    showNotification(`🔍 Found ${result}!`, 2500);
  });
  
  // Rock testing at final stage - ENHANCED DIFFICULTY
  function setupRockTesting() {
    const rocksContainer = document.getElementById('rock-samples-container');
    
    // Many more rock types - harder to find manganese!
    const rockTypes = [
      { type: 'limestone', correct: false, icon: '⚪', streak: 'white', hardness: 3, name: 'Limestone (CaCO₃)', weight: 'light', fizzes: true },
      { type: 'calcite', correct: false, icon: '⚪', streak: 'white', hardness: 3, name: 'Calcite', weight: 'light', fizzes: true },
      { type: 'hematite', correct: false, icon: '🔴', streak: 'red-brown', hardness: 6, name: 'Hematite (Fe₂O₃)', weight: 'heavy', fizzes: false },
      { type: 'magnetite', correct: false, icon: '⚫', streak: 'black', hardness: 6, name: 'Magnetite (Fe₃O₄)', weight: 'very heavy', fizzes: false },
      { type: 'sandstone', correct: false, icon: '🟡', streak: 'tan', hardness: 4, name: 'Sandstone', weight: 'medium', fizzes: false },
      { type: 'granite', correct: false, icon: '⚫', streak: 'none', hardness: 7, name: 'Granite', weight: 'heavy', fizzes: false },
      { type: 'basalt', correct: false, icon: '⚫', streak: 'gray', hardness: 6, name: 'Basalt', weight: 'heavy', fizzes: false },
      { type: 'coal', correct: false, icon: '⚫', streak: 'black', hardness: 2, name: 'Coal (C)', weight: 'light', fizzes: false },
      { type: 'shale', correct: false, icon: '🟫', streak: 'brown', hardness: 3, name: 'Shale', weight: 'light', fizzes: false },
      { type: 'manganese1', correct: true, icon: '🟤', streak: 'black', hardness: 5, name: 'Unknown Dark Rock', weight: 'medium-heavy', fizzes: false },
      { type: 'limonite', correct: false, icon: '🟤', streak: 'yellow-brown', hardness: 4, name: 'Limonite', weight: 'medium', fizzes: false },
      { type: 'manganese2', correct: true, icon: '🟤', streak: 'black', hardness: 6, name: 'Unknown Dark Rock', weight: 'medium-heavy', fizzes: false }
    ];
    
    rockTypes.sort(() => Math.random() - 0.5);
    
    // Testing tools available
    let hasStreakPlate = false;
    let hasAcid = false;
    let correctManganeseFound = 0;
    let wrongRocksPenalty = 0;
    
    // Add testing instruction
    const testingGuide = document.createElement('div');
    testingGuide.style.cssText = `
      background: rgba(139, 69, 19, 0.4);
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 15px;
      border: 2px solid var(--ochre-yellow);
      text-align: left;
      font-size: 0.85rem;
      color: var(--limestone);
    `;
    testingGuide.innerHTML = `
      <strong style="color: var(--ochre-yellow);">⚗️ Geological Testing Protocol:</strong><br>
      <span style="color: #4CAF50;">✓ Manganese (MnO₂):</span> BLACK streak + Hard (5-6) + Medium-heavy weight<br>
      <span style="color: #F44336;">✗ Magnetite (Fe₃O₄):</span> Black streak BUT very heavy + magnetic<br>
      <span style="color: #F44336;">✗ Coal:</span> Black streak BUT very soft (2) + light weight<br>
      <em style="color: var(--ochre-orange);">⚠️ Must test MULTIPLE properties! 2 manganese samples exist.</em><br>
      <strong style="color: #FF6B35;">❌ Each wrong identification drains 15% stamina!</strong>
    `;
    rocksContainer.parentElement.insertBefore(testingGuide, rocksContainer);
    
    rockTypes.forEach(rock => {
      const sample = document.createElement('div');
      sample.className = 'rock-sample-card';
      sample.style.cssText = `
        background: rgba(60, 50, 40, 0.9);
        border: 3px solid var(--stone-gray);
        border-radius: 12px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
        min-width: 140px;
        position: relative;
      `;
      
      sample.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 8px;">${rock.icon}</div>
        <div class="rock-name-label" style="color: var(--limestone); font-size: 0.8rem; font-weight: bold; margin-bottom: 8px;">Unknown Rock</div>
        
        <div class="test-results" style="font-size: 0.7rem; text-align: left; color: var(--ochre-yellow); line-height: 1.6;">
          <div class="test-streak" style="opacity: 0; margin: 3px 0;">
            🧪 Streak: <span class="streak-value">?</span>
          </div>
          <div class="test-hardness" style="opacity: 0; margin: 3px 0;">
            💎 Hardness: <span class="hardness-value">?</span>
          </div>
          <div class="test-weight" style="opacity: 0; margin: 3px 0;">
            ⚖️ Weight: <span class="weight-value">?</span>
          </div>
          <div class="test-acid" style="opacity: 0; margin: 3px 0;">
            🧪 Acid: <span class="acid-value">?</span>
          </div>
        </div>
        
        <div class="test-buttons" style="display: flex; flex-direction: column; gap: 5px; margin-top: 10px;">
          <button class="btn-test-small streak-test-btn" style="font-size: 0.7rem; padding: 4px 8px;">Streak Test</button>
          <button class="btn-test-small hardness-test-btn" style="font-size: 0.7rem; padding: 4px 8px;">Hardness Test</button>
          <button class="btn-test-small weight-test-btn" style="font-size: 0.7rem; padding: 4px 8px;">Weight Test</button>
        </div>
        
        <button class="btn-identify" style="margin-top: 10px; font-size: 0.75rem; padding: 6px 12px; background: rgba(76, 175, 80, 0.3); border: 2px solid #4CAF50; border-radius: 6px; color: white; cursor: pointer; width: 100%; font-weight: bold; display: none;">
          ✓ IDENTIFY AS MANGANESE
        </button>
      `;
      
      let testsCompleted = 0;
      
      // Streak test
      sample.querySelector('.streak-test-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        if (sample.querySelector('.test-streak').style.opacity === '1') return;
        
        sample.querySelector('.test-streak').style.opacity = '1';
        sample.querySelector('.streak-value').textContent = rock.streak;
        testsCompleted++;
        this.disabled = true;
        this.style.opacity = '0.5';
        
        addLogEntry(`🧪 Streak test: ${rock.streak}`);
        
        if (testsCompleted >= 3) {
          sample.querySelector('.btn-identify').style.display = 'block';
        }
      });
      
      // Hardness test
      sample.querySelector('.hardness-test-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        if (sample.querySelector('.test-hardness').style.opacity === '1') return;
        
        sample.querySelector('.test-hardness').style.opacity = '1';
        sample.querySelector('.hardness-value').textContent = rock.hardness + ' (Mohs)';
        testsCompleted++;
        this.disabled = true;
        this.style.opacity = '0.5';
        
        addLogEntry(`💎 Hardness test: ${rock.hardness} on Mohs scale`);
        
        if (testsCompleted >= 3) {
          sample.querySelector('.btn-identify').style.display = 'block';
        }
      });
      
      // Weight test
      sample.querySelector('.weight-test-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        if (sample.querySelector('.test-weight').style.opacity === '1') return;
        
        sample.querySelector('.test-weight').style.opacity = '1';
        sample.querySelector('.weight-value').textContent = rock.weight;
        testsCompleted++;
        this.disabled = true;
        this.style.opacity = '0.5';
        
        addLogEntry(`⚖️ Weight test: ${rock.weight}`);
        
        if (testsCompleted >= 3) {
          sample.querySelector('.btn-identify').style.display = 'block';
        }
      });
      
      // Final identification
      sample.querySelector('.btn-identify').addEventListener('click', function(e) {
        e.stopPropagation();
        if (sample.classList.contains('identified')) return;
        
        sample.classList.add('identified');
        sample.classList.add('tested'); // Prevent further interaction
        miniGameState.rocksTested++;
        
        if (rock.correct) {
          sample.style.borderColor = '#4CAF50';
          sample.style.background = 'rgba(76, 175, 80, 0.3)';
          sample.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.6)';
          correctManganeseFound++;
          
          addLogEntry(`✅ MANGANESE (MnO₂) CONFIRMED! Sample ${correctManganeseFound}/2`);
          showNotification(`✅ MANGANESE IDENTIFIED! Black streak + Hardness 5-6 + Medium-heavy. ${correctManganeseFound}/2 found!`, 3500);
          
          // Need to find BOTH manganese samples
          if (correctManganeseFound >= 2) {
            setTimeout(() => {
              const distanceBonus = Math.floor(miniGameState.journeyDistance / 12);
              const survivalBonus = Math.floor((miniGameState.stamina + miniGameState.food + miniGameState.water) / 60);
              const accuracyBonus = wrongRocksPenalty === 0 ? 2 : (wrongRocksPenalty === 1 ? 1 : 0);
              miniGameState.totalMultiplier = gameData.rewardMultiplier + distanceBonus + survivalBonus + accuracyBonus;
              
              addLogEntry(`🎉 BOTH MANGANESE SAMPLES FOUND! Expedition complete!`);
              showNotification(
                `🎉 EXPEDITION SUCCESSFUL!\n` +
                `Collected ${miniGameState.totalMultiplier}x manganese after ${miniGameState.daysPassed} days ` +
                `and ${miniGameState.journeyDistance.toFixed(1)} km!\n` +
                `Distance: +${distanceBonus} | Survival: +${survivalBonus} | Accuracy: +${accuracyBonus}`,
                5000
              );
              setTimeout(() => endMiniGame(true), 4000);
            }, 2500);
          }
        } else {
          // Wrong identification - PENALTY!
          sample.style.borderColor = '#F44336';
          sample.style.background = 'rgba(244, 67, 54, 0.3)';
          sample.style.opacity = '0.6';
          wrongRocksPenalty++;
          
          // Reveal the actual rock name when wrong
          sample.querySelector('.rock-name-label').textContent = rock.name;
          sample.querySelector('.rock-name-label').style.color = '#F44336';
          
          miniGameState.stamina -= 15;
          updateResourceDisplay();
          
          addLogEntry(`❌ WRONG! ${rock.name} identified as manganese. -15% stamina!`);
          showNotification(`❌ INCORRECT! That's ${rock.name}, not manganese!\nStreak: ${rock.streak} | Hardness: ${rock.hardness} | Weight: ${rock.weight}\n-15% stamina penalty!`, 4000);
          
          // Check if stamina depletion causes failure
          if (miniGameState.stamina <= 0) {
            addLogEntry(`💀 Exhausted from too many failed tests...`);
            showNotification('💀 EXPEDITION FAILED - Too many wrong identifications! You receive NOTHING.', 4000);
            setTimeout(() => endMiniGame(false), 3000);
          }
        }
      });
      
      sample.addEventListener('mouseenter', function() {
        if (!this.classList.contains('identified')) {
          this.style.borderColor = 'var(--ochre-yellow)';
          this.style.transform = 'translateY(-5px) scale(1.02)';
        }
      });
      
      sample.addEventListener('mouseleave', function() {
        if (!this.classList.contains('identified')) {
          this.style.borderColor = 'var(--stone-gray)';
          this.style.transform = 'translateY(0) scale(1)';
        }
      });
      
      rocksContainer.appendChild(sample);
    });
  }
}

// NOTE: `setupBotanicalGame` removed — replaced by `setupIdentificationGame` which
// provides a richer inspect→collect flow, visible centered tree field and species
// reference panel. The dispatcher now calls `setupIdentificationGame`.

// ========================================
// PYROLYSIS CONTROL - THE FIRE MASTER
// ========================================

function setupPyrolysisGame(container, controls, instructions, gameData) {
  // Intermediate Pyrolysis / Fire Master expansion
  instructions.innerHTML = `
    <strong>The Fire Master - Pyrolysis Control</strong><br>
    Manage wood, airflow and coverings to produce high-quality charcoal.<br>
    Aim for 400–450°C and steady conditions. Avoid overheating (>600°C) or cooling (<250°C).
    <em>Use wood selection, airflow slider, cover toggle and stir to control the burn.</em>
  `;

  container.style.background = 'linear-gradient(180deg,#3b3b3b, #1f1f1f)';
  container.innerHTML = '';

  // Visual fire area
  const fireArea = document.createElement('div');
  fireArea.style.cssText = 'position: absolute; top: 18%; left: 50%; transform: translateX(-50%); width: 420px; height: 320px; text-align: center;';

  const fireEmoji = document.createElement('div');
  fireEmoji.style.cssText = 'font-size: 6rem; margin-bottom: 6px;';
  fireEmoji.textContent = '🔥';
  fireArea.appendChild(fireEmoji);

  const tempDisplay = document.createElement('div');
  tempDisplay.id = 'temp-display';
  tempDisplay.style.cssText = 'font-size: 1.6rem; font-weight: 700; color: #fff; margin-bottom: 6px;';
  tempDisplay.textContent = '400°C';
  fireArea.appendChild(tempDisplay);

  const infoRow = document.createElement('div');
  infoRow.style.cssText = 'display:flex;gap:12px;justify-content:center;align-items:center;margin-bottom:10px;';
  infoRow.innerHTML = `
    <div id="zone-display" style="font-weight:700;color:#4CAF50;">🟢 PERFECT ZONE</div>
    <div id="pyro-volatiles" style="color:#FFD700;font-weight:700;">Volatiles: 0%</div>
    <div id="pyro-carbon" style="color:#DAA520;font-weight:700;">Carbon: 0%</div>
  `;
  fireArea.appendChild(infoRow);

  // smoke and ember visuals
  const smoke = document.createElement('div');
  smoke.className = 'pyro-smoke';
  smoke.style.cssText = 'position:absolute;left:50%;top:8%;transform:translateX(-50%);width:260px;height:260px;pointer-events:none;z-index:5;';
  fireArea.appendChild(smoke);

  const ember = document.createElement('div');
  ember.className = 'pyro-ember';
  ember.style.cssText = 'position:absolute;left:50%;bottom:28%;transform:translateX(-50%);width:18px;height:18px;border-radius:50%;pointer-events:none;z-index:6;';
  fireArea.appendChild(ember);

  container.appendChild(fireArea);

  // Controls area
  controls.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px;">
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <label style="color:white;font-weight:700;">Wood:</label>
        <button class="btn-secondary wood-type" data-type="hardwood">Hardwood</button>
        <button class="btn-secondary wood-type" data-type="softwood">Softwood</button>
        <button class="btn-secondary wood-type" data-type="kindling">Kindling</button>
        <button class="btn-primary" id="add-wood-btn">➕ Add Piece</button>
      </div>
      <div style="display:flex;gap:12px;align-items:center;">
        <label style="color:white;font-weight:700;">Airflow</label>
        <input id="airflow-slider" type="range" min="0" max="1" step="0.01" value="0.6" style="width:220px;">
        <label style="color:white;font-weight:700;">Cover</label>
        <input id="cover-toggle" type="checkbox">
        <button class="btn-secondary" id="stir-btn">🫙 Stir</button>
        <button class="btn-primary" id="finish-pyro-btn">Finish Batch</button>
      </div>
      <div style="display:flex;gap:12px;align-items:center;justify-content:center;">
        <div id="pyro-quality" style="color:#FFD700;font-weight:800;">Quality: 0%</div>
        <div id="pyro-ash" style="color:#F44336;font-weight:700;">Ash: 0%</div>
      </div>
    </div>
  `;

  // Internal pyro state
  miniGameState.pyro = {
    temperature: 400,
    woodStack: 0,
    woodEnergy: 0,
    moisture: 0,
    volatiles: 0,
    carbonization: 0,
    ash: 0,
    incomplete: 0,
    airflow: 0.6,
    cover: 0,
    timeInBand: 0,
    lastTick: performance.now(),
  };

  // Wood type properties
  const woodTypes = {
    hardwood: { energy: 1.2, moisture: 0.12, label: 'Hardwood' },
    softwood: { energy: 1.0, moisture: 0.20, label: 'Softwood' },
    kindling: { energy: 0.6, moisture: 0.05, label: 'Kindling' }
  };

  // helpers
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  // Event wiring
  let selectedWood = 'hardwood';
  controls.querySelectorAll('.wood-type').forEach(b => {
    b.addEventListener('click', function() {
      controls.querySelectorAll('.wood-type').forEach(x => x.classList.remove('active'));
      this.classList.add('active');
      selectedWood = this.dataset.type;
      playSound && typeof playSound === 'function' && playSound('click');
    });
  });

  const addWoodBtn = document.getElementById('add-wood-btn');
  const airflowSlider = document.getElementById('airflow-slider');
  const coverToggle = document.getElementById('cover-toggle');
  const stirBtn = document.getElementById('stir-btn');
  const finishBtn = document.getElementById('finish-pyro-btn');

  addWoodBtn.addEventListener('click', () => {
    const wt = woodTypes[selectedWood] || woodTypes.hardwood;
    miniGameState.pyro.woodStack += 1;
    miniGameState.pyro.woodEnergy += wt.energy * 30; // energy units
    miniGameState.pyro.moisture = clamp(miniGameState.pyro.moisture + wt.moisture * 15, 0, 100);
    playSound && typeof playSound === 'function' && playSound('click');
  });

  airflowSlider.addEventListener('input', () => {
    miniGameState.pyro.airflow = parseFloat(airflowSlider.value);
  });

  coverToggle.addEventListener('change', () => {
    miniGameState.pyro.cover = coverToggle.checked ? 1 : 0;
  });

  stirBtn.addEventListener('click', () => {
    // even out temperature and release some volatiles faster
    miniGameState.pyro.temperature = Math.max(200, miniGameState.pyro.temperature - 8);
    miniGameState.pyro.timeInBand += 0.8; // small bonus for careful tending
    playSound && typeof playSound === 'function' && playSound('click');
  });

  finishBtn.addEventListener('click', () => {
    evaluatePyro();
  });

  // RAF update loop
  let rafId = null;
  let last = performance.now();

  function pyroStep(now) {
    if (!miniGameState.active) return;
    const dt = Math.min(0.1, (now - last) / 1000); // clamp dt
    last = now;

    const p = miniGameState.pyro;

    // Heating: wood and airflow drive temperature; cover reduces oxygen
    const fuelPower = p.woodEnergy * 0.8; // available energy reservoir
    const airFactor = p.airflow * (1 - p.cover * 0.6);
    const heatGain = (fuelPower * airFactor) * dt * 0.06; // tuned constant
    const cooling = (20 + (p.temperature - 300) * 0.02) * dt;
    p.temperature += heatGain - cooling;

    // Volatile release accelerates above 300C
    if (p.temperature > 300 && p.woodEnergy > 0) {
      const release = (p.temperature - 300) * 0.02 * dt * (1 + p.airflow);
      p.volatiles = clamp(p.volatiles + release, 0, 200);
      // consume a little wood energy as volatiles form
      p.woodEnergy = Math.max(0, p.woodEnergy - release * 0.6);
    }

    // Carbonization progress when in target band
    if (p.temperature >= 400 && p.temperature <= 450) {
      p.timeInBand += dt;
      p.carbonization = clamp((p.timeInBand / 8) * 100, 0, 100); // ~8 seconds for full carbonization
    }

    // Ash formation when overheating
    if (p.temperature > 600) {
      p.ash = clamp(p.ash + (p.temperature - 600) * 0.05 * dt, 0, 100);
    }

    // Incomplete char when too cool
    if (p.temperature < 250) {
      p.incomplete = clamp(p.incomplete + (250 - p.temperature) * 0.02 * dt, 0, 100);
    }

    // Gradually reduce volatiles (they escape as smoke)
    p.volatiles = Math.max(0, p.volatiles - (5 + p.airflow * 10) * dt);

    // Natural decay of wood stack -> energy slowly decreases
    p.woodEnergy = Math.max(0, p.woodEnergy - 2 * dt);

    // Visual updates
    try {
      document.getElementById('temp-display').textContent = Math.round(p.temperature) + '°C';
      const zoneEl = document.getElementById('zone-display');
      if (p.temperature >= 400 && p.temperature <= 450) {
        zoneEl.textContent = '🟢 PERFECT ZONE';
        zoneEl.style.color = '#4CAF50';
      } else if (p.temperature >= 350 && p.temperature <= 500) {
        zoneEl.textContent = '🟡 GOOD ZONE';
        zoneEl.style.color = '#FFD700';
      } else if (p.temperature > 600) {
        zoneEl.textContent = '🔴 TOO HOT';
        zoneEl.style.color = '#F44336';
      } else if (p.temperature < 250) {
        zoneEl.textContent = '🔵 TOO COOL';
        zoneEl.style.color = '#2196F3';
      } else {
        zoneEl.textContent = '⚪ ACCEPTABLE';
        zoneEl.style.color = '#9E9E9E';
      }

      document.getElementById('pyro-volatiles').textContent = `Volatiles: ${Math.round(p.volatiles)}%`;
      document.getElementById('pyro-carbon').textContent = `Carbon: ${Math.round(p.carbonization)}%`;
      document.getElementById('pyro-quality').textContent = `Quality: ${Math.round(computeQuality())}%`;
      document.getElementById('pyro-ash').textContent = `Ash: ${Math.round(p.ash)}%`;

      // smoke & ember visuals
      const smokeOpacity = clamp(p.volatiles / 120, 0, 1);
      smoke.style.opacity = smokeOpacity;
      smoke.style.transform = `scale(${1 + smokeOpacity * 0.6}) translateY(${-20 - smokeOpacity * 40}px)`;
      ember.style.boxShadow = `0 0 ${8 + p.carbonization * 0.2}px rgba(255,${120 - p.carbonization},0,${0.6 + p.carbonization * 0.004})`;
      ember.style.background = p.carbonization > 50 ? 'rgba(255,120,40,1)' : 'rgba(255,200,120,1)';
    } catch (e) {}

    // Random gust events
    if (Math.random() < 0.002) {
      // gust briefly increases airflow
      const old = p.airflow;
      p.airflow = clamp(p.airflow + 0.15, 0, 1);
      setTimeout(() => { p.airflow = old; }, 800 + Math.random() * 1600);
    }

    rafId = requestAnimationFrame(pyroStep);
  }

  function computeQuality() {
    const p = miniGameState.pyro;
    // base from carbonization
    const base = p.carbonization;
    // penalties
    const penalty = clamp((p.ash * 1.2 + p.incomplete * 1.1) / 200, 0, 0.9);
    const q = clamp(base * (1 - penalty), 0, 100);
    return Math.round(q);
  }

  function evaluatePyro() {
    const q = computeQuality();
    if (q >= 70 && miniGameState.pyro.carbonization >= 60) {
      // success
      miniGameState.totalMultiplier = gameData.rewardMultiplier || 1;
      showNotification(`✓ Charcoal batch good (${q}%)!`, 1800);
      cleanupPyro();
      setTimeout(() => endMiniGame(true), 900);
    } else {
      showNotification(`✗ Batch failed (${q}%). Try to hold the temperature and reduce ash.`, 2200);
      cleanupPyro();
      setTimeout(() => endMiniGame(false), 1200);
    }
  }

  function cleanupPyro() {
    try { cancelAnimationFrame(rafId); } catch (e) {}
    // remove listeners added (we used elements referenced above)
    try { addWoodBtn.removeEventListener('click', () => {}); } catch (e) {}
    try { airflowSlider.removeEventListener('input', () => {}); } catch (e) {}
    try { coverToggle.removeEventListener('change', () => {}); } catch (e) {}
    try { stirBtn.removeEventListener('click', () => {}); } catch (e) {}
  }

  // store cleanup so endMiniGame can call it as part of general cleanup
  miniGameState.pyroCleanup = cleanupPyro;

  // Start
  last = performance.now();
  rafId = requestAnimationFrame(pyroStep);
}

// ========================================
// IDENTIFICATION MINI-GAME (Wood)
// ========================================

function setupAnatomicalGame(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>The Provisioner - Anatomical Extraction</strong><br>
    Extract marrow fat from long bones. Click rapidly to extract!<br>
    Then heat carefully to render pure fat (60-80°C optimal).<br>
    <em>Marrow fat: 70-80% lipid content. Mixed 1:2 with pigment.</em>
  `;
  setupExtractionGame(container, controls, instructions);
}

function setupOsteologicalGame(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>The Tool Maker - Osteological Crafting</strong><br>
    Craft bone spray tube from hollow bird bone.<br>
    Follow steps: Clean → Hollow → Smooth edges → Test airflow<br>
    <em>Best species: Swan ulna, Crane tibiotarsus (8-12mm diameter)</em>
  `;
  setupCraftingGame(container, controls, instructions);
}

// ========================================
// NEW MINI-GAMES (6 Additional Games)
// ========================================

function setupLampConstructionGame(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>Light Bringer - Stone Lamp Construction</strong><br>
    Carve limestone into shallow lamp bowl (5-8cm diameter, 2-3cm deep).<br>
    Click to carve, then add fat and wick.<br>
    <em>Burn time: 1-3 hours | Light output: 15-25 lumens @ 1800K</em>
  `;
  
  container.innerHTML = '';
  container.style.background = 'linear-gradient(135deg, #3C2A1E 0%, #2C1810 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <button class="btn-primary" id="carve-btn">Carve Bowl (0%)</button>
    <button class="btn-secondary" id="add-fat-btn" disabled>Add Fat &amp; Wick</button>
    <button class="btn-secondary" id="test-lamp-btn" disabled>Test Lamp</button>
  `;
  
  const lampContainer = document.createElement('div');
  lampContainer.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);';
  lampContainer.innerHTML = `
    <div class="stone-lamp" style="width: 180px; height: 100px;">
      <div id="lamp-light" style="display: none;"></div>
    </div>
    <div class="progress-bar" style="margin-top: 20px; width: 200px;">
      <div class="progress-fill" id="carve-progress" style="width: 0%; background: #696969;">Carving...</div>
    </div>
  `;
  container.appendChild(lampContainer);
  
  let carveProgress = 0;
  let carved = false;
  
  document.getElementById('carve-btn').addEventListener('click', function() {
    carveProgress += 20;
    document.getElementById('carve-progress').style.width = carveProgress + '%';
    document.getElementById('carve-progress').textContent = `Carving ${carveProgress}%`;
    this.textContent = `Carve Bowl (${carveProgress}%)`;
    
    if (carveProgress >= 100) {
      carved = true;
      this.disabled = true;
      document.getElementById('add-fat-btn').disabled = false;
      showNotification('✓ Bowl carved! Now add fat and wick.', 1500);
    }
  });
  
  document.getElementById('add-fat-btn').addEventListener('click', function() {
    const lampLight = document.getElementById('lamp-light');
    lampLight.className = 'lamp-flame';
    lampLight.style.display = 'block';
    this.disabled = true;
    document.getElementById('test-lamp-btn').disabled = false;
    showNotification('✓ Fat and wick added!', 1500);
  });
  
  document.getElementById('test-lamp-btn').addEventListener('click', () => {
    showNotification('🔥 Lamp lit! Provides 1-3 hours of steady light.', 2000);
    setTimeout(() => endMiniGame(true), 1500);
  });
}

function setupBrushMakingGame(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>The Fine Artist - Brush Fabrication</strong><br>
    Select hair type, bundle strands, bind to handle.<br>
    Horse tail = stiff (1-3mm lines) | Reindeer = soft (3-8mm blending)<br>
    <em>Bundle size: 50-80 hairs | Binding: sinew or plant fiber</em>
  `;
  
  container.innerHTML = '';
  container.style.background = 'linear-gradient(135deg, #3C2A1E 0%, #2C1810 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <div style="display: flex; gap: 10px; margin-top: 10px;">
      <button class="btn-secondary hair-select" data-type="horse">Horse Tail</button>
      <button class="btn-secondary hair-select" data-type="reindeer">Reindeer Fur</button>
      <button class="btn-secondary hair-select" data-type="ibex">Ibex Hair</button>
    </div>
    <button class="btn-primary" id="bind-brush-btn" disabled style="margin-top: 10px;">Bind to Handle</button>
  `;
  
  const brushViz = document.createElement('div');
  brushViz.className = 'brush-construction';
  brushViz.innerHTML = `
    <div class="brush-handle"></div>
    <div class="brush-bristles" id="brush-bristles"></div>
  `;
  brushViz.style.position = 'absolute';
  brushViz.style.top = '40%';
  brushViz.style.left = '50%';
  brushViz.style.transform = 'translate(-50%, -50%)';
  container.appendChild(brushViz);
  
  let hairSelected = false;
  let selectedType = '';
  
  document.querySelectorAll('.hair-select').forEach(btn => {
    btn.addEventListener('click', function() {
      selectedType = this.dataset.type;
      hairSelected = true;
      document.querySelectorAll('.hair-select').forEach(b => b.classList.remove('active'));
      this.style.borderColor = '#4CAF50';
      document.getElementById('brush-bristles').classList.add('visible');
      document.getElementById('bind-brush-btn').disabled = false;
      
      const properties = {
        horse: 'Stiff, 0.15mm thickness, fine lines',
        reindeer: 'Soft, 0.08mm thickness, blending',
        ibex: 'Medium, 0.12mm thickness, versatile'
      };
      showNotification(`✓ ${selectedType} hair: ${properties[selectedType]}`, 2000);
    });
  });
  
  document.getElementById('bind-brush-btn').addEventListener('click', () => {
    showNotification(`🖌️ ${selectedType} brush complete! Ready for detailed painting.`, 2000);
    setTimeout(() => endMiniGame(true), 1500);
  });
}

function setupPigmentGrindingGame(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>The Alchemist - Pigment Grinding</strong><br>
    Grind pigment from coarse (100+ microns) to fine (10-20 microns).<br>
    Click rapidly to grind. Smooth between fingers = perfect!<br>
    <em>Grinding time: 15-30 minutes for fine powder</em>
  `;
  
  container.innerHTML = '';
  container.style.background = 'linear-gradient(135deg, #3C2A1E 0%, #2C1810 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <button class="btn-primary" id="grind-btn">Grind Pigment</button>
  `;
  
  const grindViz = document.createElement('div');
  grindViz.className = 'grinding-visualization';
  grindViz.innerHTML = `
    <div class="grinding-base"></div>
    <div class="grinding-stone" id="grinding-stone"></div>
    <div class="pigment-pile" id="pigment-pile" style="background: ${materials[gameData.materialKey] && materials[gameData.materialKey].color ? materials[gameData.materialKey].color : '#8B4513'}; opacity: 0.3;"></div>
  `;
  grindViz.style.position = 'absolute';
  grindViz.style.top = '40%';
  grindViz.style.left = '50%';
  grindViz.style.transform = 'translate(-50%, -50%)';
  container.appendChild(grindViz);
  
  const qualityDisplay = document.createElement('div');
  qualityDisplay.style.cssText = 'position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); color: white; font-weight: bold; text-align: center;';
  qualityDisplay.innerHTML = `
    <div>Particle Size: <span id="particle-size">100+</span> microns</div>
    <div class="progress-bar" style="margin-top: 10px; width: 250px;">
      <div class="progress-fill" id="grind-progress" style="width: 0%;">Coarse</div>
    </div>
  `;
  container.appendChild(qualityDisplay);
  
  let grindProgress = 0;
  const stone = document.getElementById('grinding-stone');
  const pile = document.getElementById('pigment-pile');
  
  document.getElementById('grind-btn').addEventListener('click', () => {
    grindProgress += 10;
    stone.classList.add('active');
    
    setTimeout(() => stone.classList.remove('active'), 500);
    
    const particleSize = Math.max(10, 100 - grindProgress);
    document.getElementById('particle-size').textContent = particleSize;
    document.getElementById('grind-progress').style.width = grindProgress + '%';
    
    if (grindProgress < 40) {
      document.getElementById('grind-progress').textContent = 'Coarse';
    } else if (grindProgress < 70) {
      document.getElementById('grind-progress').textContent = 'Medium';
    } else {
      document.getElementById('grind-progress').textContent = 'Fine';
      document.getElementById('grind-progress').classList.add('high');
    }
    
    pile.style.opacity = 0.3 + (grindProgress / 100) * 0.7;
    pile.style.width = (40 + grindProgress / 2) + 'px';
    
    // Create grinding particles
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'grinding-particle';
      particle.style.background = '#8B4513';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.setProperty('--px', (Math.random() * 60 - 30) + 'px');
      particle.style.setProperty('--py', (Math.random() * 60 - 30) + 'px');
      grindViz.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
    
    if (grindProgress >= 100) {
      showNotification('✓ Perfect! Smooth fine powder, 10-20 microns. Ready for paint!', 2000);
      setTimeout(() => endMiniGame(true), 1500);
    }
  });
}

function setupPaintMixingGame(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>Color Harmony - Paint Formulation</strong><br>
    Mix pigment and fat in correct ratio.<br>
    Thick (outlines): 2:1 | Medium (filling): 1:1 | Wash (shading): 1:2<br>
    <em>Viscosity: 100-300 cP optimal | Proper mix lasts 17,000+ years!</em>
  `;
  
  container.innerHTML = '';
  container.style.background = 'linear-gradient(135deg, #3C2A1E 0%, #2C1810 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <div style="margin-top: 10px; display: flex; gap: 10px; flex-wrap: wrap;">
      <button class="btn-secondary ratio-btn" data-ratio="2:1">Thick (2:1)</button>
      <button class="btn-secondary ratio-btn" data-ratio="1:1">Medium (1:1)</button>
      <button class="btn-secondary ratio-btn" data-ratio="1:2">Wash (1:2)</button>
      <button class="btn-primary" id="mix-btn" disabled>Mix Paint</button>
    </div>
  `;
  
  const mixViz = document.createElement('div');
  mixViz.className = 'mixing-bowl';
  mixViz.innerHTML = `
    <div class="paint-mixture" id="paint-mixture" style="background: #8B4513;"></div>
    <div class="mixing-stick" id="mixing-stick"></div>
  `;
  mixViz.style.position = 'absolute';
  mixViz.style.top = '35%';
  mixViz.style.left = '50%';
  mixViz.style.transform = 'translate(-50%, -50%)';
  container.appendChild(mixViz);
  
  const infoDisplay = document.createElement('div');
  infoDisplay.style.cssText = 'position: absolute; bottom: 60px; left: 50%; transform: translateX(-50%); color: white; text-align: center; width: 80%;';
  infoDisplay.innerHTML = `
    <div style="font-size: 1.1rem; font-weight: bold; margin-bottom: 10px;" id="ratio-info">Select a ratio...</div>
    <div class="quality-badge poor" id="quality-badge" style="display: none; margin: 0 auto;">Testing...</div>
  `;
  container.appendChild(infoDisplay);
  
  let selectedRatio = '';
  const targetRatio = ['2:1', '1:1', '1:2'][Math.floor(Math.random() * 3)];
  
  setTimeout(() => {
    document.getElementById('ratio-info').innerHTML = `Goal: Create <strong>${targetRatio}</strong> ratio paint`;
  }, 500);
  
  document.querySelectorAll('.ratio-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      selectedRatio = this.dataset.ratio;
      document.querySelectorAll('.ratio-btn').forEach(b => b.style.borderColor = '');
      this.style.borderColor = '#4CAF50';
      document.getElementById('mix-btn').disabled = false;
      
      const uses = {
        '2:1': 'Thick - for outlines and details',
        '1:1': 'Medium - for filling areas',
        '1:2': 'Wash - for shading and blending'
      };
      showNotification(uses[selectedRatio], 1500);
    });
  });
  
  document.getElementById('mix-btn').addEventListener('click', () => {
    const stick = document.getElementById('mixing-stick');
    stick.classList.add('active');
    
    setTimeout(() => {
      stick.classList.remove('active');
      // Update the paint mixture color to reflect the material being mixed
      try {
        const mixture = document.getElementById('paint-mixture');
        const matColor = (materials[gameData.materialKey] && materials[gameData.materialKey].color) || '#8B4513';
        if (mixture) mixture.style.background = matColor;
      } catch (e) {}

      const badge = document.getElementById('quality-badge');
      badge.style.display = 'inline-block';
      
      if (selectedRatio === targetRatio) {
        badge.className = 'quality-badge excellent';
        badge.textContent = '✓ PERFECT!';
        showNotification(`🎨 Excellent! ${selectedRatio} ratio is correct for this application!`, 2000);
        setTimeout(() => endMiniGame(true), 1500);
      } else {
        badge.className = 'quality-badge poor';
        badge.textContent = '✗ Wrong Ratio';
        showNotification(`Try again! Need ${targetRatio}, not ${selectedRatio}`, 2000);
        miniGameState.timeRemaining -= 8;
        setTimeout(() => badge.style.display = 'none', 2000);
      }
    }, 2000);
  });
}

function setupCaveLightingGame(container, controls, instructions, gameData) {
  // 3D Cave Exploration Lighting minigame
  miniGameState.active = true;
  instructions.innerHTML = `
    <strong>Illumination Strategy - Cave Lighting</strong><br>
    Navigate the dark limestone cave and place three lamps to illuminate the ancient chambers.
    Use <kbd>WASD</kbd> to move, <kbd>Space</kbd> to jump, mouse to look around, and click to place lamps at marked locations.
  `;

  container.innerHTML = '';
  container.style.background = '#000';
  container.style.overflow = 'hidden';
  container.style.position = 'relative';

  controls.innerHTML = `
    <div style="display:flex;gap:10px;align-items:center;justify-content:center;">
      <div class="progress-fill" style="color:var(--ochre-yellow); font-weight:bold;">Place all 3 lamps to complete</div>
    </div>
  `;

  // Create iframe for the 3D cave experience
  const iframe = document.createElement('iframe');
  iframe.src = 'caveilluminate.html';
  iframe.style.width = '100%';
  iframe.style.height = '520px';
  iframe.style.border = 'none';
  iframe.style.display = 'block';
  iframe.style.background = '#000';
  container.appendChild(iframe);

  // Listen for completion message from iframe
  function handleMessage(event) {
    // Check if message is from our cave game
    if (event.data && event.data.type === 'caveGameComplete') {
      window.removeEventListener('message', handleMessage);
      // Success - all 3 lamps placed
      setTimeout(() => endMiniGame(true), 1000);
    }
  }
  window.addEventListener('message', handleMessage);

  // Store cleanup function
  miniGameState.caveCleanup = () => {
    window.removeEventListener('message', handleMessage);
  };
}

function setupTemplateGame(container, controls, instructions, gameData) {
  // Initialize tracking for all animals
  if (!miniGameState.animalProgress) {
    miniGameState.animalProgress = {
      horse: { completed: false },
      aurochs: { completed: false },
      bison: { completed: false },
      deer: { completed: false },
      ibex: { completed: false }
    };
    miniGameState.currentAnimal = null;
  }
  
  // Animal data with proportions
  const animalData = {
    horse: { name: 'Horse', emoji: '🐴', ratio: 2.5, color: '#8B4513' },
    aurochs: { name: 'Aurochs', emoji: '🐂', ratio: 2.2, color: '#654321' },
    bison: { name: 'Bison', emoji: '🦬', ratio: 2.0, color: '#704214' },
    deer: { name: 'Deer', emoji: '🦌', ratio: 2.3, color: '#A0522D' },
    ibex: { name: 'Ibex', emoji: '🐐', ratio: 1.8, color: '#8B7355' }
  };
  
  // Exercise types - randomly assigned
  const exerciseTypes = ['proportions', 'skeleton', 'movement'];
  
  container.innerHTML = '';
  container.style.background = 'linear-gradient(135deg, #2C1810 0%, #1a1410 100%)';
  
  // Check if all animals completed
  const completed = Object.values(miniGameState.animalProgress).filter(a => a.completed).length;
  const total = Object.keys(animalData).length;
  
  if (completed === total) {
    // All animals studied - show final success
    container.innerHTML = `
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 20px;">🐴 🐂 🦬 🦌 🐐</div>
        <div style="color: #4CAF50; font-size: 2.5rem; margin: 20px 0;">✓ All Templates Mastered!</div>
        <div style="color: white; font-size: 1.3rem; margin: 15px 0;">
          You've studied all 5 Lascaux animals!
        </div>
        <div style="color: #FFD700; font-size: 1.1rem; margin: 10px 0;">
          🐴 Horse (2.5:1) • 🐂 Aurochs (2.2:1) • 🦬 Bison (2.0:1)<br>
          🦌 Deer (2.3:1) • 🐐 Ibex (1.8:1)
        </div>
        <div style="color: rgba(255,255,255,0.7); margin-top: 25px; max-width: 500px; font-size: 0.95rem;">
          Magdalenian artists memorized these proportions perfectly,<br>
          creating anatomically accurate cave art without modern references!
        </div>
      </div>
    `;
    controls.innerHTML = '<button class="btn-primary" id="final-continue-btn" style="width: 100%; font-size: 1.2rem;">Collect Templates! 🎨</button>';
    
    document.getElementById('final-continue-btn').addEventListener('click', () => {
      endMiniGame(true);
    });
    
    return;
  }
  
  // Select next animal to study
  if (!miniGameState.currentAnimal) {
    const incomplete = Object.keys(animalData).filter(key => !miniGameState.animalProgress[key].completed);
    miniGameState.currentAnimal = incomplete[0];
    miniGameState.currentExercise = exerciseTypes[Math.floor(Math.random() * exerciseTypes.length)];
  }
  
  const animal = animalData[miniGameState.currentAnimal];
  const exercise = miniGameState.currentExercise;
  
  instructions.innerHTML = `
    <strong>Pattern Master - Template Study (${completed}/${total} completed)</strong><br>
    Study the ${animal.emoji} ${animal.name} anatomy and proportions<br>
    <em>Master all 5 animals to complete your template collection!</em>
  `;
  
  // Render appropriate exercise
  if (exercise === 'proportions') {
    setupProportionExercise(container, controls, animal);
  } else if (exercise === 'skeleton') {
    setupSkeletonExercise(container, controls, animal);
  } else if (exercise === 'movement') {
    setupMovementExercise(container, controls, animal);
  }
}

function setupProportionExercise(container, controls, animal) {
  const targetLength = 300;
  const targetHeight = targetLength / animal.ratio;
  
  miniGameState.currentLength = 200;
  miniGameState.currentHeight = 150;
  
  controls.innerHTML = `
    <div style="color: white; text-align: center; margin-bottom: 15px;">
      <h3 style="margin: 0; color: #FFA500; font-size: 1.5rem;">${animal.emoji} ${animal.name} Proportions</h3>
      <p style="margin: 5px 0; font-size: 0.9rem; color: #FFD700;">Target Ratio: ${animal.ratio}:1 (Length:Height)</p>
      <p style="margin: 5px 0; font-size: 1.1rem; font-weight: bold;" id="current-ratio">Your Ratio: 1.33:1</p>
      <p style="margin: 5px 0; font-size: 0.9rem; color: #90EE90;" id="accuracy-feedback">Adjust sliders to match!</p>
    </div>
    <div style="background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px;">
      <div style="margin-bottom: 15px;">
        <label style="color: white; display: block; margin-bottom: 5px;">Length: <span id="length-value">200</span>px</label>
        <input type="range" id="length-slider" min="150" max="450" value="200" step="10" style="width: 100%;">
      </div>
      <div style="margin-bottom: 15px;">
        <label style="color: white; display: block; margin-bottom: 5px;">Height: <span id="height-value">150</span>px</label>
        <input type="range" id="height-slider" min="80" max="250" value="150" step="10" style="width: 100%;">
      </div>
      <button class="btn-primary" id="verify-btn" style="width: 100%;">Lock In Template</button>
    </div>
  `;
  
  const canvas = document.createElement('div');
  canvas.style.cssText = 'position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); text-align: center;';
  canvas.innerHTML = `
    <div style="color: white; margin-bottom: 15px; font-size: 1.1rem;">
      Match your <span style="color: #4CAF50;">green template</span> to the <span style="color: #FFD700;">golden reference</span>
    </div>
    <div style="position: relative; display: inline-block;">
      <div id="reference-animal" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(255, 165, 0, 0.4)); border: 3px dashed #FFD700; border-radius: 25px 60px 25px 15px; width: ${targetLength}px; height: ${targetHeight}px; z-index: 1;">
        <div style="position: absolute; top: 10px; left: 20%; width: 30px; height: 30px; background: rgba(255, 215, 0, 0.6); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: 5px; left: 15%; width: 20px; height: 40px; background: rgba(255, 215, 0, 0.5); border-radius: 5px;"></div>
        <div style="position: absolute; bottom: 5px; left: 35%; width: 20px; height: 40px; background: rgba(255, 215, 0, 0.5); border-radius: 5px;"></div>
        <div style="position: absolute; bottom: 5px; right: 35%; width: 20px; height: 40px; background: rgba(255, 215, 0, 0.5); border-radius: 5px;"></div>
        <div style="position: absolute; bottom: 5px; right: 15%; width: 20px; height: 40px; background: rgba(255, 215, 0, 0.5); border-radius: 5px;"></div>
      </div>
      <div id="player-template" style="position: relative; background: linear-gradient(135deg, rgba(76, 175, 80, 0.6), rgba(46, 125, 50, 0.6)); border: 3px solid #4CAF50; border-radius: 25px 60px 25px 15px; width: 200px; height: 150px; z-index: 2; transition: all 0.2s ease;">
        <div style="position: absolute; top: 10px; left: 20%; width: 30px; height: 30px; background: rgba(76, 175, 80, 0.7); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: 5px; left: 15%; width: 20px; height: 40px; background: rgba(76, 175, 80, 0.6); border-radius: 5px;"></div>
        <div style="position: absolute; bottom: 5px; left: 35%; width: 20px; height: 40px; background: rgba(76, 175, 80, 0.6); border-radius: 5px;"></div>
        <div style="position: absolute; bottom: 5px; right: 35%; width: 20px; height: 40px; background: rgba(76, 175, 80, 0.6); border-radius: 5px;"></div>
        <div style="position: absolute; bottom: 5px; right: 15%; width: 20px; height: 40px; background: rgba(76, 175, 80, 0.6); border-radius: 5px;"></div>
      </div>
    </div>
  `;
  container.appendChild(canvas);
  
  const playerTemplate = document.getElementById('player-template');
  
  function updateTemplate() {
    const ratio = miniGameState.currentLength / miniGameState.currentHeight;
    playerTemplate.style.width = miniGameState.currentLength + 'px';
    playerTemplate.style.height = miniGameState.currentHeight + 'px';
    document.getElementById('current-ratio').textContent = `Your Ratio: ${ratio.toFixed(2)}:1`;
    
    const diff = Math.abs(ratio - animal.ratio);
    if (diff <= 0.1) {
      document.getElementById('current-ratio').style.color = '#4CAF50';
      document.getElementById('accuracy-feedback').textContent = '✓ Perfect match! Lock it in!';
      playerTemplate.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.8)';
    } else if (diff <= 0.2) {
      document.getElementById('current-ratio').style.color = '#90EE90';
      document.getElementById('accuracy-feedback').textContent = 'Very close!';
      playerTemplate.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.5)';
    } else {
      document.getElementById('current-ratio').style.color = '#FFA500';
      document.getElementById('accuracy-feedback').textContent = 'Keep adjusting...';
      playerTemplate.style.boxShadow = 'none';
    }
  }
  
  document.getElementById('length-slider').addEventListener('input', function() {
    miniGameState.currentLength = parseInt(this.value);
    document.getElementById('length-value').textContent = this.value;
    updateTemplate();
  });
  
  document.getElementById('height-slider').addEventListener('input', function() {
    miniGameState.currentHeight = parseInt(this.value);
    document.getElementById('height-value').textContent = this.value;
    updateTemplate();
  });
  
  updateTemplate();
  
  document.getElementById('verify-btn').addEventListener('click', () => {
    const ratio = miniGameState.currentLength / miniGameState.currentHeight;
    const diff = Math.abs(ratio - animal.ratio);
    
    if (diff <= 0.15) {
      completeAnimalStudy(container, controls, animal);
    } else {
      showNotification(`Not accurate enough! Target: ${animal.ratio}:1, Current: ${ratio.toFixed(2)}:1`, 3000);
    }
  });
}

function setupSkeletonExercise(container, controls, animal) {
  controls.innerHTML = `
    <div style="color: white; text-align: center; margin-bottom: 15px;">
      <h3 style="margin: 0; color: #FFA500; font-size: 1.5rem;">${animal.emoji} ${animal.name} Skeleton Study</h3>
      <p style="margin: 5px 0; font-size: 0.9rem;">Click the <span style="color: #4CAF50;">3 key skeletal landmarks</span></p>
      <p style="margin: 5px 0; font-size: 1.1rem;" id="points-found">Found: <span style="color: #FFD700;">0/3</span></p>
    </div>
    <button class="btn-primary" id="verify-btn" disabled style="width: 100%; margin-top: 10px;">Confirm Study</button>
  `;
  
  miniGameState.pointsFound = 0;
  
  const canvas = document.createElement('div');
  canvas.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;';
  canvas.innerHTML = `
    <div style="color: white; margin-bottom: 15px;">Identify key anatomical points:</div>
    <div style="position: relative; display: inline-block; background: ${animal.color}; opacity: 0.4; border: 3px solid #FFD700; border-radius: 25px 60px 25px 15px; width: 300px; height: ${300/animal.ratio}px;">
      <div class="skeleton-point" style="position: absolute; top: 15%; left: 25%; width: 40px; height: 40px; border: 3px dashed white; border-radius: 50%; cursor: pointer;"></div>
      <div class="skeleton-point" style="position: absolute; top: 50%; left: 50%; width: 40px; height: 40px; border: 3px dashed white; border-radius: 50%; cursor: pointer;"></div>
      <div class="skeleton-point" style="position: absolute; bottom: 15%; left: 70%; width: 40px; height: 40px; border: 3px dashed white; border-radius: 50%; cursor: pointer;"></div>
    </div>
    <div style="color: rgba(255,255,255,0.6); margin-top: 15px;">Head, Shoulder, Hip</div>
  `;
  container.appendChild(canvas);
  
  document.querySelectorAll('.skeleton-point').forEach(point => {
    point.addEventListener('click', function() {
      if (this.classList.contains('found')) return;
      this.classList.add('found');
      this.style.background = '#4CAF50';
      this.style.borderColor = '#4CAF50';
      miniGameState.pointsFound++;
      document.getElementById('points-found').innerHTML = `Found: <span style="color: #FFD700;">${miniGameState.pointsFound}/3</span>`;
      
      if (miniGameState.pointsFound >= 3) {
        document.getElementById('verify-btn').disabled = false;
      }
    });
  });
  
  document.getElementById('verify-btn').addEventListener('click', () => {
    completeAnimalStudy(container, controls, animal);
  });
}

function setupMovementExercise(container, controls, animal) {
  controls.innerHTML = `
    <div style="color: white; text-align: center; margin-bottom: 15px;">
      <h3 style="margin: 0; color: #FFA500; font-size: 1.5rem;">${animal.emoji} ${animal.name} Movement Study</h3>
      <p style="margin: 5px 0; font-size: 0.9rem;">Select the <span style="color: #4CAF50;">running ${animal.name}</span> posture</p>
    </div>
  `;
  
  const canvas = document.createElement('div');
  canvas.style.cssText = 'position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); text-align: center;';
  canvas.innerHTML = `
    <div style="color: white; margin-bottom: 20px; font-size: 1.1rem;">Which posture shows running motion?</div>
    <div style="display: flex; gap: 30px; justify-content: center;">
      <div class="movement-option" data-correct="false" style="cursor: pointer; padding: 20px; background: rgba(0,0,0,0.5); border: 3px solid #666; border-radius: 10px;">
        <div style="font-size: 4rem;">${animal.emoji}</div>
        <div style="color: white; margin-top: 10px;">Standing</div>
      </div>
      <div class="movement-option" data-correct="true" style="cursor: pointer; padding: 20px; background: rgba(0,0,0,0.5); border: 3px solid #666; border-radius: 10px;">
        <div style="font-size: 4rem; transform: skewX(-10deg);">${animal.emoji}</div>
        <div style="color: white; margin-top: 10px;">Running</div>
      </div>
      <div class="movement-option" data-correct="false" style="cursor: pointer; padding: 20px; background: rgba(0,0,0,0.5); border: 3px solid #666; border-radius: 10px;">
        <div style="font-size: 4rem; transform: scaleX(-1);">${animal.emoji}</div>
        <div style="color: white; margin-top: 10px;">Grazing</div>
      </div>
    </div>
  `;
  container.appendChild(canvas);
  
  document.querySelectorAll('.movement-option').forEach(option => {
    option.addEventListener('click', function() {
      const correct = this.dataset.correct === 'true';
      if (correct) {
        this.style.borderColor = '#4CAF50';
        this.style.background = 'rgba(76, 175, 80, 0.2)';
        showNotification('✓ Correct! Running pose identified!', 2000);
        setTimeout(() => completeAnimalStudy(container, controls, animal), 1500);
      } else {
        this.style.borderColor = '#FF6B6B';
        this.style.background = 'rgba(255, 107, 107, 0.2)';
        showNotification('✗ Not quite - try another pose!', 2000);
        setTimeout(() => {
          this.style.borderColor = '#666';
          this.style.background = 'rgba(0,0,0,0.5)';
        }, 1000);
      }
    });
  });
}

function completeAnimalStudy(container, controls, animal) {
  miniGameState.animalProgress[miniGameState.currentAnimal].completed = true;
  
  container.innerHTML = '';
  controls.innerHTML = '';
  
  const successDiv = document.createElement('div');
  successDiv.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;';
  successDiv.innerHTML = `
    <div style="font-size: 5rem;">${animal.emoji}</div>
    <div style="color: #4CAF50; font-size: 2rem; margin: 20px 0;">✓ ${animal.name} Mastered!</div>
    <div style="color: white; font-size: 1.2rem; margin: 10px 0;">
      Proportions: ${animal.ratio}:1 memorized
    </div>
  `;
  container.appendChild(successDiv);
  
  miniGameState.currentAnimal = null;
  miniGameState.currentExercise = null;
  
  setTimeout(() => {
    setupTemplateGame(container, controls, document.querySelector('.minigame-instructions'));
  }, 2000);
}

function setupIdentificationGame(container, controls, instructions) {
  // Make the identification game more interactive:
  // - Two-stage: inspect (reveals a hint) then collect
  // - Hover/idle animation to make the scene feel alive
  // - Particle/resin effect on successful collect
  instructions.innerHTML = `
    <strong>Forest Wisdom - Botanical Identification</strong><br>
    Inspect trees first (click once) to reveal clues, then click again to collect resinous wood.<br>
    Look for resinous bark and sticky sap. Incorrect picks cost time.
  `;

  container.style.background = 'linear-gradient(180deg, #87CEEB 0%, #6B8E23 50%, #1B1B1B 100%)';
  container.innerHTML = '';

  controls.innerHTML = `
    <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
      <div class="progress-bar" style="width: 300px;">
        <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
      </div>
      <div style="color: white; font-weight: bold; font-size: 1.1rem;">Resinous Wood Collected: <span id="trees-collected">0</span> / ${miniGameState.treesNeeded}</div>
    </div>
    <div style="color: rgba(255,255,255,0.9); font-size: 0.9rem; margin-top:8px;">Tip: Inspect to reveal smell/appearance clues before collecting.</div>
  `;

  // Create a visible tree field so all trees are visible (centered) and not clipped
  const field = document.createElement('div');
  field.className = 'tree-field';
  field.style.cssText = 'position: relative; width: 980px; height: 440px; margin: 12px auto; background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.03)); border-radius: 10px; border: 2px solid rgba(255,255,255,0.03); overflow: hidden;';
  container.appendChild(field);

  // Make container scrollable if needed, but keep field centered/visible
  container.style.overflow = 'auto';

  // Small species reference overlay (hidden by default)
  const refPanel = document.createElement('div');
  refPanel.className = 'species-ref';
  refPanel.style.cssText = 'position: absolute; right: 18px; top: 12px; width: 360px; max-height: 420px; overflow: auto; background: rgba(10,10,10,0.88); color: var(--limestone); border: 2px solid rgba(218,165,32,0.5); padding: 12px; border-radius: 10px; display: none; z-index: 250;';
  refPanel.innerHTML = `<strong>Species Reference</strong><div style="font-size:0.9rem;margin-top:8px;line-height:1.25;">Use these clues when inspecting trees: bark texture, leaves/needles, scent, sap/resin presence.</div>`;
  refPanel.innerHTML += `
    <ul style="margin-top:8px;font-size:0.9rem;line-height:1.3;padding-left:18px;">
      <li><strong>Pine</strong> — needle clusters, sticky resin on bark, aromatic scent; good for torches.</li>
      <li><strong>Juniper</strong> — small needle-like leaves, resinous berries, aromatic; good for torches and scent.</li>
      <li><strong>Oak</strong> — deep furrowed bark, hard wood, low resin content.</li>
      <li><strong>Birch</strong> — papery, light-colored bark; not resinous.</li>
      <li><strong>Willow</strong> — flexible, smooth bark and high moisture; poor resin.
      <li><strong>Ash</strong> — straight trunk, compound leaves, low-resin hardwood.</li>
    </ul>
  `;
  container.appendChild(refPanel);

  // Reference toggle button
  const refToggle = document.createElement('button');
  refToggle.className = 'icon-btn';
  refToggle.style.cssText = 'position: absolute; right: 18px; bottom: 18px; z-index: 260;';
  refToggle.title = 'Toggle species reference';
  refToggle.innerHTML = 'ℹ️';
  refToggle.addEventListener('click', () => {
    refPanel.style.display = refPanel.style.display === 'none' ? 'block' : 'none';
    try { playSound && playSound('click'); } catch(e){}
  });
  container.appendChild(refToggle);

  // Create trees with a more dynamic interaction model
  const treeTypes = [
    { type: 'pine', correct: true, hint: 'Aromatic resin on bark; sticky sap.' },
    { type: 'juniper', correct: true, hint: 'Needle clusters and resinous scent.' },
    { type: 'pine', correct: true, hint: 'Thick bark with sticky sap.' },
    { type: 'oak', correct: false, hint: 'Hard wood, low resin.' },
    { type: 'birch', correct: false, hint: 'Papery bark, low resin.' },
    { type: 'willow', correct: false, hint: 'Flexible, watery wood.' },
    { type: 'ash', correct: false, hint: 'Dry, non-resinous.' },
    { type: 'juniper', correct: true, hint: 'Juniper berries and resinous smell.' }
  ];

  // Shuffle
  treeTypes.sort(() => Math.random() - 0.5);

  treeTypes.forEach((treeData, index) => {
    const tree = document.createElement('div');
    tree.className = 'tree ' + treeData.type + ' interactive';
    tree.innerHTML = `
      <div class="tree-canopy"></div>
      <div class="tree-trunk"></div>
    `;

  const row = Math.floor(index / 4);
  const col = index % 4;
  // place tree inside the field (absolute coordinates relative to field)
  tree.style.position = 'absolute';
  tree.style.left = (40 + col * 220 + Math.random() * 30 - 15) + 'px';
  tree.style.top = (20 + row * 180 + Math.random() * 20 - 10) + 'px';

    // metadata
    tree.dataset.correct = treeData.correct ? '1' : '0';
    tree.dataset.inspected = '0';

    tree.addEventListener('click', () => {
      if (tree.classList.contains('collected') || tree.classList.contains('wrong')) return;

      // First click: inspect
      if (tree.dataset.inspected === '0') {
        tree.dataset.inspected = '1';
        // small hint tooltip
  const tip = document.createElement('div');
  tip.className = 'tree-tip';
  tip.textContent = treeData.hint || (treeData.correct ? 'Resinous scent' : 'Low resin');
  tip.style.position = 'absolute';
  // tip position relative to field
  tip.style.left = (parseFloat(tree.style.left) + 20) + 'px';
  tip.style.top = (parseFloat(tree.style.top) - 36) + 'px';
        tip.style.padding = '6px 10px';
        tip.style.background = 'rgba(20,20,20,0.85)';
        tip.style.color = 'white';
        tip.style.border = '2px solid rgba(218,165,32,0.6)';
        tip.style.borderRadius = '8px';
        tip.style.zIndex = 100;
  field.appendChild(tip);
        setTimeout(() => { try { tip.remove(); } catch (e) {} }, 1600);
        // small highlight and sound
        tree.classList.add('inspected');
        try { playSound && playSound('click'); } catch(e){}
        return;
      }

      // Second click: attempt to collect
      if (tree.dataset.correct === '1') {
        tree.classList.add('collected');
        miniGameState.treesCollected = (miniGameState.treesCollected || 0) + 1;
        const display = document.getElementById('trees-collected');
        if (display) display.textContent = miniGameState.treesCollected;
        showNotification('✓ Resinous! Collected.', 1200);
        try { playSound && playSound('click'); } catch(e){}

        // particle/resin burst at tree center
        try {
          try {
            const rect = tree.getBoundingClientRect();
            createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#FFD166', 14);
          } catch (e) {}
        } catch (e) {}

        if (miniGameState.treesCollected >= miniGameState.treesNeeded) {
          setTimeout(() => endMiniGame(true), 700);
        }
      } else {
        tree.classList.add('wrong');
        showNotification('✗ Not resinous — wrong tree!', 1200);
        miniGameState.timeRemaining = Math.max(0, (miniGameState.timeRemaining || 0) - 6);
        // shake animation for feedback
        try {
          tree.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
          ], { duration: 450 });
        } catch (e) {}
        try { playSound && playSound('click'); } catch(e){}
      }
    });

    field.appendChild(tree);
  });

  // Auto-scroll + highlight so the tree field is immediately visible to the player
  // (helps when modal layout/scrolling hides the field). Briefly open the reference
  // and play a click so it's obvious something changed.
  setTimeout(() => {
    try {
      // Scroll field into view (centered in modal)
      field.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Brief visual highlight
      field.style.outline = '4px solid rgba(255,200,60,0.95)';
      field.style.boxShadow = '0 6px 30px rgba(255,200,60,0.12)';
      // Temporarily show the species reference panel so users notice the new info
      try { refPanel.style.display = 'block'; } catch (e) {}
      // play a gentle click so audio users notice the change
      try { playSound && typeof playSound === 'function' && playSound('click'); } catch(e){}
      // Remove temporary highlights after a short delay
      setTimeout(() => {
        try { field.style.outline = ''; field.style.boxShadow = ''; } catch (e) {}
        try { refPanel.style.display = 'none'; } catch (e) {}
      }, 3000);
    } catch (e) {}
  }, 140);
}

// ========================================
// TEMPERATURE MINI-GAME (Charcoal)
// ========================================

function setupTemperatureGame(container, controls, instructions) {
  instructions.textContent = 'Control the fire temperature (keep in green zone) to create quality charcoal!';
  
  container.style.background = 'linear-gradient(180deg, #2C1810 0%, #1a1410 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <button class="btn-secondary" id="add-wood-btn">Add Wood 🪵</button>
    <button class="btn-secondary" id="reduce-air-btn">Reduce Airflow 💨</button>
  `;
  
  // Temperature gauge
  const gaugeContainer = document.createElement('div');
  gaugeContainer.innerHTML = `
    <div class="temperature-gauge">
      <div class="temp-indicator" id="temp-indicator" style="left: 50%;"></div>
    </div>
    <div style="color: white; text-align: center; margin-top: 10px; font-weight: bold;">
      Temperature: <span id="temp-display">Medium</span>
    </div>
    <div class="progress-bar" style="margin-top: 20px;">
      <div class="progress-fill" id="charcoal-progress" style="width: 0%;">Charcoal: 0%</div>
    </div>
  `;
  gaugeContainer.style.position = 'absolute';
  gaugeContainer.style.top = '50px';
  gaugeContainer.style.left = '50%';
  gaugeContainer.style.transform = 'translateX(-50%)';
  gaugeContainer.style.width = '80%';
  container.appendChild(gaugeContainer);
  
  // Fire visualization
  const fire = document.createElement('div');
  fire.className = 'minigame-fire';
  fire.innerHTML = `
    <div class="flames">
      <div class="flame flame-1"></div>
      <div class="flame flame-2"></div>
      <div class="flame flame-3"></div>
    </div>
  `;
  container.appendChild(fire);
  
  // Game logic
  let charcoalProgress = 0;
  miniGameState.temperature = 50;
  
  const updateDisplay = () => {
    const indicator = document.getElementById('temp-indicator');
    const display = document.getElementById('temp-display');
    const progressBar = document.getElementById('charcoal-progress');
    
    indicator.style.left = miniGameState.temperature + '%';
    
    if (miniGameState.temperature < 25) display.textContent = 'Too Cold ❄️';
    else if (miniGameState.temperature < 40) display.textContent = 'Low 🔵';
    else if (miniGameState.temperature < 60) display.textContent = 'Perfect! 🟢';
    else if (miniGameState.temperature < 75) display.textContent = 'High 🟡';
    else display.textContent = 'Too Hot! 🔥';
    
    progressBar.style.width = charcoalProgress + '%';
    progressBar.textContent = `Charcoal: ${Math.floor(charcoalProgress)}%`;
  };
  
  // Temperature naturally cools
  const tempInterval = setInterval(() => {
    if (!miniGameState.active) {
      clearInterval(tempInterval);
      return;
    }
    
    miniGameState.temperature = Math.max(0, miniGameState.temperature - 1);
    
    // Progress increases in optimal range
    if (miniGameState.temperature >= 40 && miniGameState.temperature <= 60) {
      charcoalProgress += 2;
    } else {
      charcoalProgress += 0.5;
    }
    
    updateDisplay();
    
    if (charcoalProgress >= 100) {
      clearInterval(tempInterval);
      endMiniGame(true);
    }
  }, 500);
  
  document.getElementById('add-wood-btn').addEventListener('click', () => {
    miniGameState.temperature = Math.min(100, miniGameState.temperature + 15);
    updateDisplay();
    showNotification('Added wood +15°', 800);
  });
  
  document.getElementById('reduce-air-btn').addEventListener('click', () => {
    miniGameState.temperature = Math.max(0, miniGameState.temperature - 10);
    updateDisplay();
    showNotification('Reduced airflow -10°', 800);
  });
  
  updateDisplay();
}

// ========================================
// EXTRACTION MINI-GAME (Fat)
// ========================================

function setupExtractionGame(container, controls, instructions) {
  instructions.textContent = 'Click rapidly to extract marrow, then heat carefully to render fat!';
  
  container.style.background = 'linear-gradient(180deg, #3C2A1E 0%, #2C1810 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
  `;
  
  // Bone extraction phase
  const bone = document.createElement('div');
  bone.innerHTML = '🦴';
  bone.style.position = 'absolute';
  bone.style.fontSize = '8rem';
  bone.style.top = '50%';
  bone.style.left = '50%';
  bone.style.transform = 'translate(-50%, -50%)';
  bone.style.cursor = 'pointer';
  bone.style.transition = 'transform 0.1s';
  
  const extractBar = document.createElement('div');
  extractBar.innerHTML = '<div class="progress-bar"><div class="progress-fill" id="extract-progress" style="width: 0%;">Extract Marrow: 0%</div></div>';
  extractBar.style.position = 'absolute';
  extractBar.style.top = '30px';
  extractBar.style.left = '50%';
  extractBar.style.transform = 'translateX(-50%)';
  extractBar.style.width = '80%';
  
  container.appendChild(bone);
  container.appendChild(extractBar);
  
  bone.addEventListener('click', () => {
    miniGameState.marrowExtracted += 5;
    const progress = Math.min(100, miniGameState.marrowExtracted);
    document.getElementById('extract-progress').style.width = progress + '%';
    document.getElementById('extract-progress').textContent = `Extract Marrow: ${progress}%`;
    
    bone.style.transform = 'translate(-50%, -50%) scale(0.95)';
    setTimeout(() => {
      bone.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
    
    if (miniGameState.marrowExtracted >= 100) {
      bone.remove();
      extractBar.remove();
      startHeatingPhase(container);
    }
  });
}

function startHeatingPhase(container) {
  showNotification('Marrow extracted! Now heat carefully...', 2000);
  
  const fire = document.createElement('div');
  fire.className = 'minigame-fire';
  fire.innerHTML = `
    <div class="flames">
      <div class="flame flame-1"></div>
      <div class="flame flame-2"></div>
      <div class="flame flame-3"></div>
    </div>
  `;
  container.appendChild(fire);
  
  const pot = document.createElement('div');
  pot.innerHTML = '🍯';
  pot.style.position = 'absolute';
  pot.style.fontSize = '4rem';
  pot.style.bottom = '120px';
  pot.style.left = '50%';
  pot.style.transform = 'translateX(-50%)';
  container.appendChild(pot);
  
  const heatBar = document.createElement('div');
  heatBar.innerHTML = '<div class="progress-bar"><div class="progress-fill" id="heat-progress" style="width: 0%; background: linear-gradient(90deg, #FDB813 0%, #FF6B35 100%);">Rendering: 0%</div></div>';
  heatBar.style.position = 'absolute';
  heatBar.style.top = '30px';
  heatBar.style.left = '50%';
  heatBar.style.transform = 'translateX(-50%)';
  heatBar.style.width = '80%';
  container.appendChild(heatBar);
  
  let heatProgress = 0;
  const heatInterval = setInterval(() => {
    if (!miniGameState.active) {
      clearInterval(heatInterval);
      return;
    }
    
    heatProgress += 3;
    document.getElementById('heat-progress').style.width = heatProgress + '%';
    document.getElementById('heat-progress').textContent = `Rendering: ${heatProgress}%`;
    
    if (heatProgress >= 100) {
      clearInterval(heatInterval);
      endMiniGame(true);
    }
  }, 500);
}

// ========================================
// CRAFTING MINI-GAME (Bone)
// ========================================

function setupCraftingGame(container, controls, instructions) {
  instructions.textContent = 'Follow the steps to craft a bone spray tube for cave painting!';
  
  container.style.background = 'linear-gradient(180deg, #3C2A1E 0%, #2C1810 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <button class="btn-primary" id="craft-action-btn">Clean Bone</button>
  `;
  
  const bone = document.createElement('div');
  bone.innerHTML = '🦴';
  bone.style.position = 'absolute';
  bone.style.fontSize = '8rem';
  bone.style.top = '50%';
  bone.style.left = '50%';
  bone.style.transform = 'translate(-50%, -50%)';
  container.appendChild(bone);
  
  const progressBar = document.createElement('div');
  progressBar.innerHTML = '<div class="progress-bar"><div class="progress-fill" id="craft-progress" style="width: 0%;">Step 1: Clean</div></div>';
  progressBar.style.position = 'absolute';
  progressBar.style.top = '30px';
  progressBar.style.left = '50%';
  progressBar.style.transform = 'translateX(-50%)';
  progressBar.style.width = '80%';
  container.appendChild(progressBar);
  
  let step = 1;
  const steps = ['Clean Bone', 'Hollow It Out', 'Test Airflow'];
  
  document.getElementById('craft-action-btn').addEventListener('click', () => {
    miniGameState.boneProgress += 33.3;
    const progress = Math.min(100, miniGameState.boneProgress);
    document.getElementById('craft-progress').style.width = progress + '%';
    
    if (step < 3) {
      step++;
      document.getElementById('craft-action-btn').textContent = steps[step - 1];
      document.getElementById('craft-progress').textContent = `Step ${step}: ${steps[step - 1].split(' ')[0]}`;
      showNotification(`Step ${step - 1} complete!`, 1000);
    } else {
      showNotification('Testing airflow...', 1000);
      setTimeout(() => {
        endMiniGame(true);
      }, 1000);
    }
  });
}

// Make functions accessible globally
window.endMiniGame = endMiniGame;
window.closeMiniGame = closeMiniGame;
window.completeWorkshopCraft = completeWorkshopCraft;

// Cleanup function for event listeners
function cleanupEventListeners() {
  // Remove global event listeners for mini-games
  document.removeEventListener('keydown', handleNavKeyDown);
  document.removeEventListener('keyup', handleNavKeyUp);
  document.removeEventListener('keydown', handleEnhancedNav);
  document.removeEventListener('keyup', handleEnhancedNavStop);
}

// Store references to event handlers for proper cleanup
let handleNavKeyDown = null;
let handleNavKeyUp = null;
let handleEnhancedNav = null;
let handleEnhancedNavStop = null;

// ========================================
// WORKSHOP MINI-GAME LAUNCHER
// ========================================

function startWorkshopMiniGame(key, recipe, type) {
  const modal = document.getElementById('minigame-modal');
  const title = document.getElementById('minigame-title');
  const instructions = document.getElementById('minigame-instructions');
  const container = document.getElementById('minigame-container');
  const controls = document.getElementById('minigame-controls');
  const fact = document.getElementById('minigame-fact');
  
  container.innerHTML = '';
  controls.innerHTML = '';
  
  miniGameState = {
    active: true,
    workshopMode: true,
    craftKey: key,
    craftRecipe: recipe,
    craftType: type
  };
  
  // Route to appropriate workshop game
  if (type === 'paint') {
    // Two-stage: Grinding then Mixing
    setupPigmentGrindingWorkshop(container, controls, instructions, fact, title, recipe);
  } else if (key === 'torch') {
    setupTorchCraftingWorkshop(container, controls, instructions, fact, title);
  } else if (key === 'lamp') {
    setupLampCarvingWorkshop(container, controls, instructions, fact, title);
  } else if (key === 'brush') {
    setupBrushWeavingWorkshop(container, controls, instructions, fact, title);
  } else if (key === 'sprayBone') {
    setupBoneSculptingWorkshop(container, controls, instructions, fact, title);
  }
  
  modal.classList.add('active');
}

function completeWorkshopCraft() {
  try {
    const { craftingKey, craftingRecipe, craftingType, craftingCard } = gameState;
    
    // Consume materials
    Object.entries(craftingRecipe.requires).forEach(([mat, count]) => {
      gameState.inventory[mat] -= count;
    });
    // Consume XP if required
    const xpCost = craftingRecipe.xpCost || 0;
    if (xpCost > 0) {
      gameState.xp = Math.max(0, (gameState.xp || 0) - xpCost);
      showNotification(`⚡ Spent ${xpCost} XP on crafting`, 1800);
    }
    
    // Add to appropriate storage
    if (craftingType === 'paint') {
      gameState.paints[craftingKey] = craftingRecipe;
      if (!gameState.selectedPaint) {
        gameState.selectedPaint = craftingKey;
      }
      showNotification(`🎨 Created ${craftingRecipe.name}! Use it in the Cave to paint.`, 2500);
    } else {
      gameState.tools[craftingKey] = true;
      if (craftingRecipe.isLight) {
        gameState.hasLight = true;
        showNotification(`✨ Created ${craftingRecipe.name}! This is 1 of 2 requirements to enter the cave.`, 3000);
      } else {
        showNotification(`🛠️ Created ${craftingRecipe.name}!`, 2000);
      }
    }
    
    // Visual feedback
    if (craftingCard) {
      craftingCard.classList.add('pop-in');
      const rect = craftingCard.getBoundingClientRect();
      createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#4CAF50', 20);
    }
    
    // Update UI
    updateUI();
    renderCraftingUI();
    saveGameState(); // Auto-save
    
    // Close modal
    document.getElementById('minigame-modal').classList.remove('active');
  } catch (error) {
    console.error('Error completing craft:', error);
    showNotification('⚠️ Error crafting item. Please try again.', 2000);
  }
}

// ========================================
// WORKSHOP MINI-GAME IMPLEMENTATIONS
// ========================================

function setupPigmentGrindingWorkshop(container, controls, instructions, fact, title, recipe) {
  title.textContent = '🧪 The Stone Master - Pigment Grinding';
  instructions.innerHTML = `
    <strong>Grind ${recipe.name} Pigment</strong><br>
    Click and drag in circular motions on the grinding stone.<br>
    Match the rhythm beats for quality bonus!<br>
    <span style="color: #FFD700;">⭐ Perfect rhythm = Superior pigment quality</span>
  `;
  fact.textContent = '💡 Archaeological evidence: Grinding reduces particle size from 100+ microns (gritty) to 10-20 microns (smooth paint). Takes 15-30 minutes of grinding. Perfect fineness creates paint that lasts 17,000+ years!';
  
  container.style.background = 'linear-gradient(135deg, #3C2A1E 0%, #2C1810 100%)';
  container.innerHTML = '';
  
  const grindingArea = document.createElement('div');
  grindingArea.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);';
  
  const grindingCircle = document.createElement('div');
  grindingCircle.className = 'grinding-circle';
  grindingCircle.style.cssText = 'position: relative; width: 300px; height: 300px; border: 4px solid #696969; border-radius: 50%; background: radial-gradient(circle, #696969 0%, #505050 100%); box-shadow: inset 0 20px 40px rgba(0, 0, 0, 0.6);';
  
  const pigmentColor = recipe.color || '#8B4513';
  
  // Add pigment chunks
  for (let i = 0; i < 12; i++) {
    const chunk = document.createElement('div');
    chunk.className = 'pigment-chunk';
    const angle = (Math.PI * 2 * i) / 12;
    const radius = 80 + Math.random() * 40;
    chunk.style.cssText = `
      position: absolute;
      width: ${15 + Math.random() * 15}px;
      height: ${15 + Math.random() * 15}px;
      background: ${pigmentColor};
      border-radius: 30%;
      left: ${150 + Math.cos(angle) * radius}px;
      top: ${150 + Math.sin(angle) * radius}px;
      transform: translate(-50%, -50%);
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);
      transition: all 0.3s;
    `;
    chunk.dataset.size = 'large';
    grindingCircle.appendChild(chunk);
  }
  
  // Grinding stone (pestle)
  const pestle = document.createElement('div');
  pestle.className = 'grinding-motion';
  pestle.style.cssText = 'position: absolute; width: 80px; height: 80px; background: radial-gradient(circle, #808080 0%, #606060 100%); border-radius: 50%; left: 110px; top: 110px; cursor: move; box-shadow: 0 8px 20px rgba(0,0,0,0.6); z-index: 10;';
  grindingCircle.appendChild(pestle);
  
  grindingArea.appendChild(grindingCircle);
  container.appendChild(grindingArea);
  
  // Progress and rhythm
  const progressDiv = document.createElement('div');
  progressDiv.style.cssText = 'position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%); width: 80%; text-align: center;';
  progressDiv.innerHTML = `
    <div style="color: white; font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">Fineness: <span id="grind-fineness">0</span>%</div>
    <div class="progress-bar"><div class="progress-fill" id="grind-progress" style="width: 0%;">Coarse</div></div>
    <div class="rhythm-indicator" id="rhythm-beats" style="margin-top: 15px;"></div>
  `;
  container.appendChild(progressDiv);
  
  // Create rhythm beats
  const rhythmContainer = document.getElementById('rhythm-beats');
  for (let i = 0; i < 5; i++) {
    const beat = document.createElement('div');
    beat.className = 'rhythm-beat';
    beat.style.cssText = 'width: 40px; height: 40px; border-radius: 50%; border: 3px solid var(--ochre-yellow); background: rgba(218, 165, 32, 0.2);';
    rhythmContainer.appendChild(beat);
  }
  
  controls.innerHTML = `
    <button class="btn-secondary" id="show-rhythm-btn">Show Rhythm Pattern</button>
    <button class="btn-primary" id="finish-grind-btn" disabled>Finish Grinding</button>
  `;
  
  let grindProgress = 0;
  let rhythmScore = 0;
  let isDragging = false;
  let lastAngle = 0;
  let rotations = 0;
  let rhythmShown = false;
  
  pestle.addEventListener('mousedown', () => { isDragging = true; });
  document.addEventListener('mouseup', () => { isDragging = false; });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const rect = grindingCircle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    
    const radius = 110;
    const x = 150 + Math.cos(angle) * radius - 40;
    const y = 150 + Math.sin(angle) * radius - 40;
    pestle.style.left = x + 'px';
    pestle.style.top = y + 'px';
    
    // Detect rotation
    const angleDiff = angle - lastAngle;
    if (Math.abs(angleDiff) > 0.1) {
      rotations += Math.abs(angleDiff);
      if (rotations > Math.PI * 2) {
        rotations = 0;
        grindProgress = Math.min(100, grindProgress + 5);
        
        // Update chunks
        document.querySelectorAll('.pigment-chunk').forEach(chunk => {
          if (grindProgress > 30 && chunk.dataset.size === 'large') {
            const w = parseInt(chunk.style.width) * 0.7;
            chunk.style.width = w + 'px';
            chunk.style.height = w + 'px';
            chunk.dataset.size = 'medium';
          } else if (grindProgress > 70 && chunk.dataset.size === 'medium') {
            chunk.style.opacity = '0.5';
            const w = parseInt(chunk.style.width) * 0.5;
            chunk.style.width = w + 'px';
            chunk.style.height = w + 'px';
            chunk.dataset.size = 'small';
          }
        });
        
        document.getElementById('grind-progress').style.width = grindProgress + '%';
        document.getElementById('grind-fineness').textContent = grindProgress;
        
        if (grindProgress < 40) {
          document.getElementById('grind-progress').textContent = 'Coarse';
        } else if (grindProgress < 70) {
          document.getElementById('grind-progress').textContent = 'Medium';
          document.getElementById('grind-progress').style.background = 'linear-gradient(90deg, #DAA520 0%, #CD853F 100%)';
        } else {
          document.getElementById('grind-progress').textContent = 'Fine';
          document.getElementById('grind-progress').style.background = 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)';
        }
        
        if (grindProgress >= 100) {
          document.getElementById('finish-grind-btn').disabled = false;
          isDragging = false;
          showNotification('✓ Perfect fineness achieved!', 2000);
        }
      }
    }
    lastAngle = angle;
  });
  
  document.getElementById('show-rhythm-btn').addEventListener('click', function() {
    if (rhythmShown) return;
    rhythmShown = true;
    this.disabled = true;
    
    const beats = document.querySelectorAll('.rhythm-beat');
    let beatIndex = 0;
    const rhythmInterval = setInterval(() => {
      if (beatIndex < beats.length) {
        beats[beatIndex].style.background = 'var(--ochre-yellow)';
        beats[beatIndex].style.transform = 'scale(1.2)';
        beats[beatIndex].style.boxShadow = '0 0 20px var(--ochre-yellow)';
        setTimeout(() => {
          beats[beatIndex].style.background = 'rgba(218, 165, 32, 0.2)';
          beats[beatIndex].style.transform = 'scale(1)';
          beats[beatIndex].style.boxShadow = 'none';
        }, 400);
        beatIndex++;
      } else {
        clearInterval(rhythmInterval);
      }
    }, 500);
  });
  
  document.getElementById('finish-grind-btn').addEventListener('click', () => {
    showNotification('✓ Pigment ground perfectly! Now mixing with binder...', 2000);
    setTimeout(() => {
      setupPaintMixingWorkshop(container, controls, instructions, fact, title, recipe);
    }, 2000);
  });
}

function setupPaintMixingWorkshop(container, controls, instructions, fact, title, recipe) {
  title.textContent = '🧪 The Color Alchemist - Paint Mixing';
  instructions.innerHTML = `
    <strong>Mix ${recipe.name}</strong><br>
    Add precise amounts of animal fat binder to the pigment powder.<br>
    Stir thoroughly for smooth consistency!<br>
    <span style="color: #FFD700;">Perfect ratio: 1 part fat : 2 parts pigment</span>
  `;
  
  container.innerHTML = '';
  
  const mixingArea = document.createElement('div');
  mixingArea.style.cssText = 'position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);';
  
  const bowl = document.createElement('div');
  bowl.style.cssText = `
    position: relative;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #8B7355 0%, #1B1B1B 100%);
    box-shadow: inset 0 20px 50px rgba(0, 0, 0, 0.7), 0 15px 40px rgba(0, 0, 0, 0.6);
  `;
  
  const mixture = document.createElement('div');
  mixture.id = 'paint-mixture';
  mixture.style.cssText = `
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    border-radius: 50%;
    background: ${recipe.color || '#8B4513'};
    box-shadow: inset 0 -15px 30px rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
    opacity: 0.3;
  `;
  bowl.appendChild(mixture);
  
  const stick = document.createElement('div');
  stick.id = 'mixing-stick';
  stick.style.cssText = `
    position: absolute;
    top: 10%;
    left: 50%;
    width: 10px;
    height: 70%;
    background: linear-gradient(90deg, #4A3526 0%, #1B1B1B 50%, #4A3526 100%);
    border-radius: 5px;
    transform-origin: top center;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
  `;
  bowl.appendChild(stick);
  
  mixingArea.appendChild(bowl);
  container.appendChild(mixingArea);
  
  const progressDiv = document.createElement('div');
  progressDiv.style.cssText = 'position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); width: 80%; text-align: center;';
  progressDiv.innerHTML = `
    <div style="color: white; font-size: 1.1rem; font-weight: bold; margin-bottom: 10px;">Fat Added: <span id="fat-amount">0</span>ml / 50ml</div>
    <div style="color: white; font-size: 1.1rem; font-weight: bold; margin-bottom: 10px;">Consistency: <span id="consistency">Too Dry</span></div>
    <div class="progress-bar"><div class="progress-fill" id="mix-progress" style="width: 0%; background: #CD853F;">Not Mixed</div></div>
  `;
  container.appendChild(progressDiv);
  
  controls.innerHTML = `
    <button class="btn-secondary" id="add-fat-btn">Add Fat (10ml)</button>
    <button class="btn-primary" id="stir-btn" disabled>Stir Paint</button>
    <button class="btn-primary" id="test-paint-btn" disabled>Test Paint Quality</button>
  `;
  
  let fatAmount = 0;
  let stirProgress = 0;
  let fatAdded = false;
  
  document.getElementById('add-fat-btn').addEventListener('click', function() {
    if (fatAmount >= 50) {
      showNotification('⚠️ Too much fat! Paint will be too thin.', 2000);
      return;
    }
    
    fatAmount += 10;
    document.getElementById('fat-amount').textContent = fatAmount;
    mixture.style.opacity = 0.3 + (fatAmount / 50) * 0.7;
    
    if (fatAmount < 30) {
      document.getElementById('consistency').textContent = 'Too Dry';
      document.getElementById('consistency').style.color = '#C00000';
    } else if (fatAmount <= 50) {
      document.getElementById('consistency').textContent = 'Good';
      document.getElementById('consistency').style.color = '#4CAF50';
      document.getElementById('stir-btn').disabled = false;
      fatAdded = true;
    } else {
      document.getElementById('consistency').textContent = 'Too Thin';
      document.getElementById('consistency').style.color = '#FF8C00';
    }
  });
  
  document.getElementById('stir-btn').addEventListener('click', function() {
    if (!fatAdded) return;
    
    this.disabled = true;
    let rotation = 0;
    const stirInterval = setInterval(() => {
      rotation += 30;
      stick.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
      stirProgress += 2;
      
      document.getElementById('mix-progress').style.width = stirProgress + '%';
      document.getElementById('mix-progress').textContent = `Mixing ${stirProgress}%`;
      
      if (stirProgress >= 100) {
        clearInterval(stirInterval);
        document.getElementById('test-paint-btn').disabled = false;
        document.getElementById('mix-progress').style.background = '#4CAF50';
        document.getElementById('mix-progress').textContent = 'Well Mixed';
        showNotification('✓ Paint thoroughly mixed!', 2000);
      }
    }, 50);
  });
  
  document.getElementById('test-paint-btn').addEventListener('click', () => {
    if (fatAmount >= 40 && fatAmount <= 50 && stirProgress >= 100) {
      showNotification(`🎨 Perfect! ${recipe.name} is ready for cave painting!`, 2500);
      setTimeout(() => completeWorkshopCraft(), 1500);
    } else {
      showNotification('⚠️ Not quite right. Adjust fat amount and stir more.', 2000);
    }
  });
}

function setupTorchCraftingWorkshop(container, controls, instructions, fact, title) {
  title.textContent = '🔥 Fire Keeper - Torch Crafting';
  instructions.innerHTML = `
    <strong>Craft a Resinous Torch</strong><br>
    Step 1: Bundle resinous wood pieces<br>
    Step 2: Wrap with plant fiber binding<br>
    Step 3: Dip in animal fat for extended burn<br>
    <span style="color: #FFD700;">Burn time: 35-45 minutes with proper technique</span>
  `;
  fact.textContent = '💡 Experimental archaeology: Pine torches with 15-20% resin burn 35-45 minutes. Proper bundling and fat-dipping increases burn time by 40%!';
  
  container.style.background = 'linear-gradient(135deg, #3C2A1E 0%, #2C1810 100%)';
  container.innerHTML = '';
  
  const workbench = document.createElement('div');
  workbench.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;';
  
  const torchViz = document.createElement('div');
  torchViz.id = 'torch-visual';
  torchViz.style.cssText = 'font-size: 8rem; margin-bottom: 20px; filter: grayscale(100%); opacity: 0.3;';
  torchViz.textContent = '🔥';
  workbench.appendChild(torchViz);
  
  const stepsDiv = document.createElement('div');
  stepsDiv.style.cssText = 'color: white; font-size: 1.1rem;';
  stepsDiv.innerHTML = `
    <div id="step-1" style="margin: 10px 0; padding: 10px; background: rgba(139, 69, 19, 0.3); border-radius: 8px;">⬜ Step 1: Bundle Wood</div>
    <div id="step-2" style="margin: 10px 0; padding: 10px; background: rgba(139, 69, 19, 0.3); border-radius: 8px;">⬜ Step 2: Wrap Fibers</div>
    <div id="step-3" style="margin: 10px 0; padding: 10px; background: rgba(139, 69, 19, 0.3); border-radius: 8px;">⬜ Step 3: Dip in Fat</div>
  `;
  workbench.appendChild(stepsDiv);
  
  container.appendChild(workbench);
  
  controls.innerHTML = `
    <button class="btn-primary" id="bundle-btn">Bundle Wood Pieces</button>
    <button class="btn-secondary" id="wrap-btn" disabled>Wrap with Fiber</button>
    <button class="btn-secondary" id="dip-btn" disabled>Dip in Fat</button>
    <button class="btn-primary" id="test-torch-btn" disabled>Test Torch</button>
  `;
  
  let step = 0;
  
  document.getElementById('bundle-btn').addEventListener('click', function() {
    this.disabled = true;
    document.getElementById('step-1').innerHTML = '✅ Step 1: Bundle Wood';
    document.getElementById('step-1').style.background = 'rgba(76, 175, 80, 0.3)';
    torchViz.style.filter = 'grayscale(70%)';
    torchViz.style.opacity = '0.5';
    document.getElementById('wrap-btn').disabled = false;
    showNotification('✓ Wood bundled!', 1500);
    step = 1;
  });
  
  document.getElementById('wrap-btn').addEventListener('click', function() {
    this.disabled = true;
    document.getElementById('step-2').innerHTML = '✅ Step 2: Wrap Fibers';
    document.getElementById('step-2').style.background = 'rgba(76, 175, 80, 0.3)';
    torchViz.style.filter = 'grayscale(30%)';
    torchViz.style.opacity = '0.7';
    document.getElementById('dip-btn').disabled = false;
    showNotification('✓ Fibers wrapped tightly!', 1500);
    step = 2;
  });
  
  document.getElementById('dip-btn').addEventListener('click', function() {
    this.disabled = true;
    document.getElementById('step-3').innerHTML = '✅ Step 3: Dip in Fat';
    document.getElementById('step-3').style.background = 'rgba(76, 175, 80, 0.3)';
    torchViz.style.filter = 'none';
    torchViz.style.opacity = '1';
    torchViz.style.textShadow = '0 0 30px rgba(255, 140, 0, 0.8)';
    document.getElementById('test-torch-btn').disabled = false;
    showNotification('✓ Fat applied for extended burn!', 1500);
    step = 3;
  });
  
  document.getElementById('test-torch-btn').addEventListener('click', () => {
    showNotification('🔥 Torch lit! 35-45 minute burn time. Cave access granted!', 2500);
    setTimeout(() => completeWorkshopCraft(), 2000);
  });
}

function setupLampCarvingWorkshop(container, controls, instructions, fact, title) {
  title.textContent = '🧪 Light Shaper - Stone Lamp Construction';
  instructions.innerHTML = `
    <strong>Carve a Stone Lamp</strong><br>
    Click repeatedly to carve the bowl (5-8cm diameter, 2-3cm deep).<br>
    Too shallow = oil spills | Too deep = poor wick placement<br>
    <span style="color: #FFD700;">Perfect depth provides 1-3 hours steady light</span>
  `;
  fact.textContent = '💡 Archaeological lamps from Lascaux show precise carving. Provides stable 1800K warm light ideal for detailed painting. Fuel efficiency: 10-15ml fat per hour.';
  
  container.style.background = 'linear-gradient(135deg, #2C1810 0%, #1a1410 100%)';
  container.innerHTML = '';
  
  const carvingArea = document.createElement('div');
  carvingArea.style.cssText = 'position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);';
  
  const stone = document.createElement('div');
  stone.id = 'lamp-stone';
  stone.style.cssText = `
    width: 250px;
    height: 150px;
    background: linear-gradient(135deg, #696969 0%, #505050 100%);
    border-radius: 50% 50% 40% 40%;
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5), 0 15px 40px rgba(0, 0, 0, 0.7);
    cursor: pointer;
    position: relative;
    transition: all 0.1s;
  `;
  
  const depression = document.createElement('div');
  depression.id = 'lamp-depression';
  depression.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, #505050 0%, #3C3C3C 100%);
    box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.8);
    transition: all 0.3s;
  `;
  stone.appendChild(depression);
  
  carvingArea.appendChild(stone);
  container.appendChild(carvingArea);
  
  const progressDiv = document.createElement('div');
  progressDiv.style.cssText = 'position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%); width: 80%; text-align: center;';
  progressDiv.innerHTML = `
    <div style="color: white; font-size: 1.1rem; font-weight: bold; margin-bottom: 10px;">Depth: <span id="carve-depth">0</span>mm / 25mm</div>
    <div class="progress-bar"><div class="progress-fill" id="carve-progress" style="width: 0%;">Not Carved</div></div>
    <div id="depth-feedback" style="margin-top: 10px; color: white; font-weight: bold;"></div>
  `;
  container.appendChild(progressDiv);
  
  controls.innerHTML = `
    <button class="btn-primary" id="add-wick-btn" disabled>Add Wick &amp; Fat</button>
    <button class="btn-primary" id="light-lamp-btn" disabled>Light Lamp</button>
  `;
  
  let depth = 0;
  let carved = false;
  
  stone.addEventListener('click', function() {
    if (depth >= 25) return;
    
    depth += 3;
    const widthPercent = Math.min(80, depth * 3);
    depression.style.width = widthPercent + '%';
    depression.style.height = (widthPercent * 0.6) + '%';
    
    document.getElementById('carve-depth').textContent = depth;
    document.getElementById('carve-progress').style.width = (depth / 25 * 100) + '%';
    
    const feedback = document.getElementById('depth-feedback');
    if (depth < 15) {
      feedback.textContent = 'Too shallow - oil will spill';
      feedback.style.color = '#FF8C00';
      document.getElementById('carve-progress').textContent = 'Too Shallow';
      document.getElementById('carve-progress').style.background = '#FF8C00';
    } else if (depth <= 25) {
      feedback.textContent = 'Perfect depth!';
      feedback.style.color = '#4CAF50';
      document.getElementById('carve-progress').textContent = 'Optimal';
      document.getElementById('carve-progress').style.background = '#4CAF50';
      document.getElementById('add-wick-btn').disabled = false;
      carved = true;
    } else {
      feedback.textContent = 'Too deep - wick placement issues';
      feedback.style.color = '#C00000';
    }
    
    this.style.transform = 'translate(-50%, -50%) scale(0.98)';
    setTimeout(() => {
      this.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
  });
  
  document.getElementById('add-wick-btn').addEventListener('click', function() {
    this.disabled = true;
    const wick = document.createElement('div');
    wick.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 4px;
      height: 20px;
      background: #8B7355;
      border-radius: 2px;
    `;
    depression.appendChild(wick);
    showNotification('✓ Wick and fat added!', 1500);
    document.getElementById('light-lamp-btn').disabled = false;
  });
  
  document.getElementById('light-lamp-btn').addEventListener('click', () => {
    const flame = document.createElement('div');
    flame.style.cssText = `
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 40px;
      background: linear-gradient(to top, #FF6B35 0%, #FDB813 70%, transparent 100%);
      border-radius: 50% 50% 0 0;
      filter: blur(3px);
      animation: flicker1 0.3s ease-in-out infinite;
    `;
    depression.appendChild(flame);
    
    depression.style.boxShadow = 'inset 0 10px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 140, 0, 0.6)';
    showNotification('🔥 Lamp lit! 1-3 hours steady burn. Perfect for cave painting!', 2500);
    setTimeout(() => completeWorkshopCraft(), 2000);
  });
}

function setupBrushWeavingWorkshop(container, controls, instructions, fact, title) {
  title.textContent = '✂️ Hair Weaver - Brush Making';
  instructions.innerHTML = `
    <strong>Craft a Fine Hair Brush</strong><br>
    Select quality hair strands (reject damaged ones).<br>
    Bundle 50-80 hairs with perfect tip alignment.<br>
    Bind tightly with sinew to wooden handle.<br>
    <span style="color: #FFD700;">Horse tail = stiff (1-3mm lines) | Reindeer = soft (blending)</span>
  `;
  fact.textContent = '💡 Archaeological use-wear analysis confirms brush use at Lascaux. Horse tail hair (0.15mm thick) perfect for detailed lines. Bundle of 60-80 hairs optimal.';
  
  container.style.background = 'linear-gradient(135deg, #3C2A1E 0%, #2C1810 100%)';
  container.innerHTML = '';
  
  const workArea = document.createElement('div');
  workArea.style.cssText = 'position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); width: 90%;';
  
  // Hair selection phase
  const hairGrid = document.createElement('div');
  // Make the hair grid larger and scrollable so players can select up to 80 hairs
  hairGrid.style.cssText = 'display: grid; grid-template-columns: repeat(12, 1fr); gap: 8px; margin-bottom: 18px; max-height: 260px; overflow-y: auto; padding-right: 8px;';

  // Provide enough selectable hair items to reach bundle thresholds (50-80)
  for (let i = 0; i < 80; i++) {
    const hair = document.createElement('div');
    const quality = Math.random() > 0.3 ? 'good' : 'bad';
    hair.dataset.quality = quality;
    hair.style.cssText = `
      width: 60px;
      height: 80px;
      background: ${quality === 'good' ? '#8B7355' : '#6B5844'};
      border: 2px solid ${quality === 'good' ? '#4CAF50' : '#C00000'};
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      transition: all 0.2s;
      opacity: ${quality === 'good' ? '1' : '0.6'};
    `;
    hair.textContent = quality === 'good' ? '✓' : '✗';
    
    hair.addEventListener('click', function() {
      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        this.style.background = quality === 'good' ? '#8B7355' : '#6B5844';
        hairsSelected--;
      } else {
        this.classList.add('selected');
        this.style.background = quality === 'good' ? '#4CAF50' : '#8B0000';
        hairsSelected++;
        if (quality === 'bad') badHairsSelected++;
      }
      document.getElementById('hair-count').textContent = hairsSelected;
    });
    
    hairGrid.appendChild(hair);
  }
  workArea.appendChild(hairGrid);
  
  const brushViz = document.createElement('div');
  brushViz.style.cssText = 'text-align: center;';
  brushViz.innerHTML = `
    <div style="font-size: 6rem; filter: grayscale(100%); opacity: 0.3;" id="brush-icon">🖌️</div>
    <div style="color: white; font-size: 1.1rem; margin-top: 10px;">Hairs Selected: <span id="hair-count">0</span> / 60</div>
  `;
  workArea.appendChild(brushViz);
  
  container.appendChild(workArea);
  
  controls.innerHTML = `
    <button class="btn-primary" id="bundle-hair-btn" disabled>Bundle Selected Hairs</button>
    <button class="btn-secondary" id="bind-handle-btn" disabled>Bind to Handle</button>
    <button class="btn-primary" id="test-brush-btn" disabled>Test Brush Quality</button>
  `;
  
  let hairsSelected = 0;
  let badHairsSelected = 0;
  
  setInterval(() => {
    if (hairsSelected >= 50 && hairsSelected <= 80) {
      document.getElementById('bundle-hair-btn').disabled = false;
    } else {
      document.getElementById('bundle-hair-btn').disabled = true;
    }
  }, 500);
  
  document.getElementById('bundle-hair-btn').addEventListener('click', function() {
    this.disabled = true;
    document.getElementById('brush-icon').style.filter = 'grayscale(50%)';
    document.getElementById('brush-icon').style.opacity = '0.6';
    document.getElementById('bind-handle-btn').disabled = false;
    showNotification(`✓ ${hairsSelected} hairs bundled!`, 1500);
  });
  
  document.getElementById('bind-handle-btn').addEventListener('click', function() {
    this.disabled = true;
    document.getElementById('brush-icon').style.filter = 'none';
    document.getElementById('brush-icon').style.opacity = '1';
    document.getElementById('test-brush-btn').disabled = false;
    showNotification('✓ Bound to handle with sinew!', 1500);
  });
  
  document.getElementById('test-brush-btn').addEventListener('click', () => {
    if (badHairsSelected > 5) {
      showNotification('⚠️ Too many damaged hairs! Brush quality compromised. Lines will be uneven.', 3000);
      setTimeout(() => completeWorkshopCraft(), 2000);
    } else if (hairsSelected < 50) {
      showNotification('⚠️ Too few hairs. Brush won\'t hold enough paint.', 2000);
    } else {
      showNotification('🖌️ Perfect brush! Hair alignment excellent. Ready for detailed cave painting!', 2500);
      setTimeout(() => completeWorkshopCraft(), 2000);
    }
  });
}

function setupBoneSculptingWorkshop(container, controls, instructions, fact, title) {
  title.textContent = '🦴 Bone Sculptor - Spray Tube Crafting';
  instructions.innerHTML = `
    <strong>Craft Bone Spray Tube</strong><br>
    Carefully cut hollow bird bone without breaking thin walls.<br>
    Remove marrow, smooth interior for airflow.<br>
    Test spray pattern - should atomize paint effectively.<br>
    <span style="color: #FFD700;">Perfect tube: 8-12mm diameter, 15-25cm length</span>
  `;
  fact.textContent = '💡 Large bird bones (swan, crane, vulture) ideal. Experimental replication shows 15-25 PSI for effective paint atomization. Used for stenciling and diffuse effects.';
  
  container.style.background = 'linear-gradient(135deg, #2C1810 0%, #1a1410 100%)';
  container.innerHTML = '';
  
  const workArea = document.createElement('div');
  workArea.style.cssText = 'position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);';
  
  const bone = document.createElement('div');
  bone.id = 'craft-bone';
  bone.style.cssText = `
    font-size: 8rem;
    filter: brightness(0.8);
    margin-bottom: 20px;
    text-align: center;
  `;
  bone.textContent = '🦴';
  workArea.appendChild(bone);
  
  const progressDiv = document.createElement('div');
  progressDiv.style.cssText = 'text-align: center;';
  progressDiv.innerHTML = `
    <div style="color: white; font-size: 1.1rem; margin: 10px 0;">
      <div id="step-display" style="font-weight: bold; margin-bottom: 15px;">Step 1: Cut Bone Carefully</div>
      <div class="progress-bar"><div class="progress-fill" id="bone-progress" style="width: 0%;">0%</div></div>
    </div>
  `;
  workArea.appendChild(progressDiv);
  
  container.appendChild(workArea);
  
  controls.innerHTML = `
    <button class="btn-primary" id="cut-bone-btn">Cut Bone (Click Carefully!)</button>
    <button class="btn-secondary" id="hollow-btn" disabled>Remove Marrow</button>
    <button class="btn-secondary" id="smooth-btn" disabled>Smooth Interior</button>
    <button class="btn-primary" id="test-spray-btn" disabled>Test Spray Pattern</button>
  `;
  
  let cutProgress = 0;
  let cutSuccess = true;
  
  document.getElementById('cut-bone-btn').addEventListener('click', function() {
    cutProgress += 20;
    
    // Random chance of breaking if clicking too fast
    if (Math.random() < 0.15 && cutProgress < 100) {
      bone.style.filter = 'brightness(0.4) grayscale(100%)';
      showNotification('✗ Bone cracked! You cut too aggressively.', 2000);
      cutSuccess = false;
      this.disabled = true;
      setTimeout(() => {
        showNotification('Starting over with new bone...', 1500);
        cutProgress = 0;
        cutSuccess = true;
        bone.style.filter = 'brightness(0.8)';
        this.disabled = false;
        document.getElementById('bone-progress').style.width = '0%';
      }, 2000);
      return;
    }
    
    document.getElementById('bone-progress').style.width = cutProgress + '%';
    document.getElementById('bone-progress').textContent = cutProgress + '%';
    
    if (cutProgress >= 100) {
      this.disabled = true;
      document.getElementById('hollow-btn').disabled = false;
      document.getElementById('step-display').textContent = 'Step 2: Remove Marrow';
      bone.style.filter = 'brightness(1)';
      showNotification('✓ Bone cut successfully!', 1500);
    }
  });
  
  document.getElementById('hollow-btn').addEventListener('click', function() {
    this.disabled = true;
    document.getElementById('step-display').textContent = 'Step 3: Smooth Interior';
    document.getElementById('smooth-btn').disabled = false;
    bone.style.filter = 'brightness(1.1)';
    showNotification('✓ Marrow removed!', 1500);
  });
  
  document.getElementById('smooth-btn').addEventListener('click', function() {
    this.disabled = true;
    document.getElementById('step-display').textContent = 'Step 4: Test Airflow';
    document.getElementById('test-spray-btn').disabled = false;
    bone.style.filter = 'brightness(1.2) drop-shadow(0 0 20px rgba(76, 175, 80, 0.6))';
    showNotification('✓ Interior smoothed for optimal airflow!', 1500);
  });
  
  document.getElementById('test-spray-btn').addEventListener('click', () => {
    // Create spray visualization
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: rgba(139, 69, 19, 0.6);
        border-radius: 50%;
        left: 50%;
        top: 30%;
      `;
      container.appendChild(particle);
      
      const angle = (Math.PI / 6) * (Math.random() - 0.5);
      const velocity = 100 + Math.random() * 100;
      const tx = Math.sin(angle) * velocity;
      const ty = -Math.cos(angle) * velocity;
      
      particle.style.transition = 'all 0.8s ease-out';
      setTimeout(() => {
        particle.style.transform = `translate(${tx}px, ${ty}px)`;
        particle.style.opacity = '0';
      }, 50);
      
      setTimeout(() => particle.remove(), 1000);
    }
    
    showNotification('💨 Perfect spray pattern! 15-25 PSI atomization. Ready for stenciling!', 2500);
    setTimeout(() => completeWorkshopCraft(), 2000);
  });
}

console.log('\n🎨 ========================================');
console.log('   MAGDALENIAN CAVE ART EXPERIENCE');
console.log('   12 Enhanced Academic Mini-Games');
console.log('========================================');
console.log('\n🌿 Resource Gathering:');
console.log('  1. The Riverbank Journey - Enhanced ochre expedition');
console.log('  2. The Mountain Expedition - Multi-day manganese quest');
console.log('  3. Forest Wisdom - Botanical identification');
console.log('  4. The Fire Master - Pyrolysis control');
console.log('  5. The Provisioner - Anatomical extraction');
console.log('  6. The Tool Maker - Osteological crafting');
console.log('\n✨ Advanced Crafting:');
console.log('  7. Light Bringer - Stone lamp construction');
console.log('  8. The Fine Artist - Brush fabrication');
console.log('  9. The Alchemist - Pigment grinding');
console.log('  10. Color Harmony - Paint formulation');
console.log('  11. Illumination Strategy - Cave lighting planning');
console.log('  12. Pattern Master - Template creation');
console.log('\n🔧 WORKSHOP CRAFTING MINI-GAMES:');
console.log('  • Pigment Grinding - Circular motion rhythm matching');
console.log('  • Paint Mixing - Precise fat ratios and stirring');
console.log('  • Torch Crafting - Multi-step assembly process');
console.log('  • Lamp Construction - Careful depth carving');
console.log('  • Brush Making - Hair quality selection');
console.log('  • Bone Tool - Precision cutting without breaking');
console.log('\n✅ Features:');
console.log('  • Parallax landscapes & weather effects');
console.log('  • Peer-reviewed archaeological data');
console.log('  • Scientific formulas & measurements');
console.log('  • Unique mechanics for each game');
console.log('  • Stunning visual design');
console.log('  • Quality-based reward multipliers');
console.log('\n🎮 NO QUICK GATHER - All resources require mini-games!');
console.log('========================================\n');