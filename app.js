// ========================================
// MAGDALENIAN CAVE ART EXPERIENCE
// Highly Visual HTML5 Game
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
  charcoal: { name: 'Charcoal', icon: '⚫', formula: 'C', color: '#1C1C1C', info: 'Burnt wood rich in carbon, used for deep black pigment' },
  manganese: { name: 'Manganese', icon: '🟤', formula: 'MnO₂', color: '#3C2418', info: 'Manganese dioxide ore, produces brown-black tones' },
  limestone: { name: 'Limestone', icon: '⚪', formula: 'CaCO₃', color: '#F5F5DC', info: 'Ground cave calcite for white highlights' },
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
    requires: { wood: 1, animalFat: 1 },
    description: 'Mobile lighting (20-40 min burn time)',
    isLight: true
  },
  lamp: {
    name: 'Stone Lamp',
    icon: '🪔',
    requires: { stone: 1, animalFat: 1 },
    description: 'Steady lighting (1-3 hours burn time)',
    isLight: true
  },
  brush: {
    name: 'Hair Brush',
    icon: '🖌️',
    requires: { wood: 1, animalHair: 1 },
    description: 'Fine detail work and flowing lines'
  },
  sprayBone: {
    name: 'Spray Bone',
    icon: '🦴',
    requires: { bone: 1 },
    description: 'For stenciling and diffuse spray effects'
  },
  mossPad: {
    name: 'Moss Pad',
    icon: '🌿',
    requires: { wood: 1 },
    description: 'Textured application for body masses'
  }
};

// Paint Recipes
const paintRecipes = {
  redPaint: {
    name: 'Red Paint',
    icon: '🔴',
    requires: { redOchre: 1, animalFat: 1 },
    color: '#8B4513'
  },
  yellowPaint: {
    name: 'Yellow Paint',
    icon: '🟡',
    requires: { yellowOchre: 1, animalFat: 1 },
    color: '#DAA520'
  },
  blackPaint: {
    name: 'Black Paint',
    icon: '⚫',
    requires: { charcoal: 1, animalFat: 1 },
    color: '#1C1C1C'
  },
  brownPaint: {
    name: 'Brown Paint',
    icon: '🟤',
    requires: { manganese: 1, animalFat: 1 },
    color: '#5C4033'
  },
  whitePaint: {
    name: 'White Paint',
    icon: '⚪',
    requires: { limestone: 1, animalFat: 1 },
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
    duration: 50,
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
  limestone: {
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
    duration: 65,
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
    duration: 55,
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
  spray: { name: 'Spray', icon: '💨', size: 25, opacity: 0.3, requires: 'sprayBone', description: 'Diffuse stenciling' },
  moss: { name: 'Moss Pad', icon: '🌿', size: 15, opacity: 0.6, requires: 'mossPad', description: 'Textured effects' }
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
      <li><strong>Moss pads:</strong> Absorbent moss wrapped in leather or bark, used for dabbing and texturing large body masses.</li>
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
      
      updateUI();
      updateBadges();
      renderCraftingUI();
      renderPaintingToolbar();
      
      // Show notification about loaded progress
      const timeSince = Math.floor((Date.now() - data.timestamp) / 1000 / 60);
      showNotification(`✓ Progress loaded (${timeSince} minutes ago)`, 3000);
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

// ========================================
// SOUND SYSTEM (Placeholder for future audio)
// ========================================

const sounds = {
  gather: () => console.log('🔊 Sound: Material gathered'),
  craft: () => console.log('🔊 Sound: Item crafted'),
  paint: () => console.log('🔊 Sound: Brush stroke'),
  success: () => console.log('🔊 Sound: Success chime'),
  click: () => console.log('🔊 Sound: UI click'),
  ambient: () => console.log('🔊 Sound: Cave ambience')
};

// To add real sounds later, replace console.log with:
// new Audio('sounds/gather.mp3').play();

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
    if (gameState.hasLight) {
      switchToScene('cave');
      showNotification('Cave Painting - Select paint and tool, then draw on the wall', 2000);
    } else {
      showNotification('⚠️ You need a LIGHT SOURCE (torch or lamp) to enter the cave! Craft one in the Workshop.', 3000);
      document.getElementById('nav-cave').classList.add('shake');
      setTimeout(() => {
        document.getElementById('nav-cave').classList.remove('shake');
      }, 500);
    }
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
    { key: 'limestone', label: 'Limestone', hasGame: true },
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
    
    const material = materials[mat.key] || { icon: mat.key === 'torch' ? '💡' : '📐', name: mat.label };
    
    btn.innerHTML = `
      <div class="gather-icon">${material.icon}</div>
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
}

// Quick gather removed - all gathering now requires mini-games!

function gatherMaterial(materialKey, buttonElement, multiplier = 1) {
  try {
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
  
  const canCraft = checkRequirements(recipe.requires);
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
  
  let statusHtml = '';
  if (alreadyCrafted) {
    statusHtml = '<div class="craft-status crafted">✅ CRAFTED</div>';
  } else if (canCraft) {
    statusHtml = '<div class="craft-status ready">👆 CLICK TO CRAFT</div>';
  } else {
    statusHtml = '<div class="craft-status" style="background: rgba(139, 69, 19, 0.5);">Need Materials</div>';
  }
  
  card.innerHTML = `
    <div class="craft-icon">${recipe.icon}</div>
    <div class="craft-name">${recipe.name}</div>
    <div class="craft-requirements">${requirementsText}</div>
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

function checkRequirements(requires) {
  const canCraft = Object.entries(requires).every(([mat, count]) => {
    const hasAmount = gameState.inventory[mat] || 0;
    const needed = count;
    const hasEnough = hasAmount >= needed;
    
    // Debug logging
    if (!hasEnough) {
      console.log(`Missing: ${mat} - Has ${hasAmount}, needs ${needed}`);
    }
    
    return hasEnough;
  });
  
  return canCraft;
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
// CAVE SCENE - PAINTING
// ========================================

let canvas, ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Canvas history for undo/redo
let canvasHistory = [];
let historyStep = -1;
const MAX_HISTORY = 20;

function initCaveScene() {
  canvas = document.getElementById('painting-canvas');
  ctx = canvas.getContext('2d');
  
  // Set up canvas
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Save initial blank state
  saveCanvasState();
  
  // Drawing events
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);
  
  // Touch events
  canvas.addEventListener('touchstart', handleTouchStart);
  canvas.addEventListener('touchmove', handleTouchMove);
  canvas.addEventListener('touchend', stopDrawing);
  
  // Toolbar
  renderPaintingToolbar();
  
  // Buttons
  document.getElementById('undo-canvas').addEventListener('click', undoCanvas);
  document.getElementById('redo-canvas').addEventListener('click', redoCanvas);
  
  document.getElementById('clear-canvas').addEventListener('click', () => {
    if (confirm('Clear your painting?')) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveCanvasState();
      document.getElementById('cave-instruction').style.display = 'block';
      showNotification('Canvas cleared', 1500);
    }
  });
  
  document.getElementById('step-back').addEventListener('click', () => {
    const instruction = document.getElementById('cave-instruction');
    instruction.style.display = instruction.style.display === 'none' ? 'block' : 'none';
  });
  
  updateUndoRedoButtons();
}

function saveCanvasState() {
  // Remove any states after current step
  canvasHistory = canvasHistory.slice(0, historyStep + 1);
  
  // Save current state
  canvasHistory.push(canvas.toDataURL());
  historyStep++;
  
  // Limit history size
  if (canvasHistory.length > MAX_HISTORY) {
    canvasHistory.shift();
    historyStep--;
  }
  
  updateUndoRedoButtons();
}

function undoCanvas() {
  if (historyStep > 0) {
    historyStep--;
    restoreCanvasState();
    showNotification('↶ Undo', 1000);
  }
}

function redoCanvas() {
  if (historyStep < canvasHistory.length - 1) {
    historyStep++;
    restoreCanvasState();
    showNotification('↷ Redo', 1000);
  }
}

function restoreCanvasState() {
  const img = new Image();
  img.src = canvasHistory[historyStep];
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    updateUndoRedoButtons();
  };
}

function updateUndoRedoButtons() {
  const undoBtn = document.getElementById('undo-canvas');
  const redoBtn = document.getElementById('redo-canvas');
  
  if (undoBtn) undoBtn.disabled = historyStep <= 0;
  if (redoBtn) redoBtn.disabled = historyStep >= canvasHistory.length - 1;
}

function renderPaintingToolbar() {
  // Paint palette
  const paletteContainer = document.getElementById('paint-palette');
  paletteContainer.innerHTML = '';
  
  if (Object.keys(gameState.paints).length === 0) {
    paletteContainer.innerHTML = '<div style="color: #DAA520; font-size: 0.9rem; padding: 0.5rem;">No paints crafted yet!</div>';
  } else {
    Object.keys(gameState.paints).forEach(key => {
      const paint = gameState.paints[key];
      const swatch = document.createElement('div');
      swatch.className = 'paint-swatch';
      if (gameState.selectedPaint === key) swatch.classList.add('active');
      swatch.style.backgroundColor = paint.color;
      swatch.title = paint.name;
      swatch.addEventListener('click', () => {
        gameState.selectedPaint = key;
        renderPaintingToolbar();
        showNotification(`Selected ${paint.name}`, 1000);
      });
      paletteContainer.appendChild(swatch);
    });
  }
  
  // Applicator tools
  const toolsContainer = document.getElementById('applicator-tools');
  toolsContainer.innerHTML = '';
  
  Object.keys(applicators).forEach(key => {
    const app = applicators[key];
    const canUse = !app.requires || gameState.tools[app.requires];
    
    const swatch = document.createElement('div');
    swatch.className = 'tool-swatch';
    if (!canUse) swatch.classList.add('disabled');
    if (gameState.selectedTool === key) swatch.classList.add('active');
    swatch.innerHTML = app.icon;
    swatch.title = app.name;
    
    if (canUse) {
      swatch.addEventListener('click', () => {
        gameState.selectedTool = key;
        renderPaintingToolbar();
        showNotification(`Selected ${app.name}`, 1000);
      });
    }
    
    toolsContainer.appendChild(swatch);
  });
  
  // Animal templates
  const templatesContainer = document.getElementById('animal-templates');
  templatesContainer.innerHTML = '';
  
  Object.keys(animalTemplates).forEach(key => {
    const template = animalTemplates[key];
    const swatch = document.createElement('div');
    swatch.className = 'template-swatch';
    if (gameState.selectedTemplate === key) swatch.classList.add('active');
    swatch.innerHTML = template.icon;
    swatch.title = template.name;
    swatch.addEventListener('click', () => {
      gameState.selectedTemplate = gameState.selectedTemplate === key ? null : key;
      renderPaintingToolbar();
      if (gameState.selectedTemplate) {
        showNotification(`Template: ${template.name} - ${template.count}`, 2000);
      }
    });
    templatesContainer.appendChild(swatch);
  });
}

function startDrawing(e) {
  if (!gameState.selectedPaint) {
    showNotification('⚠️ Select a paint color first!', 2000);
    return;
  }
  
  isDrawing = true;
  const pos = getCanvasPosition(e);
  lastX = pos.x;
  lastY = pos.y;
  
  // Hide instruction on first paint
  document.getElementById('cave-instruction').style.display = 'none';
}

function draw(e) {
  if (!isDrawing || !gameState.selectedPaint) return;
  
  e.preventDefault();
  const pos = getCanvasPosition(e);
  
  const paint = gameState.paints[gameState.selectedPaint];
  const tool = applicators[gameState.selectedTool];
  
  ctx.strokeStyle = paint.color;
  ctx.lineWidth = tool.size;
  ctx.globalAlpha = tool.opacity;
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  
  // Small particles while drawing
  if (Math.random() > 0.7) {
    const canvasRect = canvas.getBoundingClientRect();
    createParticleBurst(
      canvasRect.left + pos.x,
      canvasRect.top + pos.y,
      paint.color,
      1
    );
  }
  
  lastX = pos.x;
  lastY = pos.y;
}

function stopDrawing() {
  if (isDrawing) {
    isDrawing = false;
    // Save canvas state after completing a stroke
    saveCanvasState();
  }
}

function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}

function handleTouchMove(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}

function getCanvasPosition(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height)
  };
}

// ========================================
// UI UPDATES
// ========================================

function updateUI() {
  updateInventory();
  updateTools();
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
      setupBotanicalGame(container, controls, instructions, gameData);
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
  miniGameState.active = false;
  
  const container = document.getElementById('minigame-container');
  const overlay = document.createElement('div');
  overlay.className = 'result-overlay';
  
  if (success) {
    const gameData = miniGames[miniGameState.materialKey];
    const multiplier = gameData.rewardMultiplier;
    
    overlay.innerHTML = `
      <div class="result-icon">🎉</div>
      <div class="result-text">SUCCESS!</div>
      <div class="result-reward">Collected ${multiplier}x ${materials[miniGameState.materialKey].name}</div>
      <button class="btn-primary" onclick="closeMiniGame(true)">Continue</button>
    `;
    
    // Award badge
    if (gameData.badge) {
      gameState.badges[gameData.badge] = true;
      updateBadges();
    }
  } else {
    // Check if this is a manganese expedition death (no reward)
    const isManganeseExpedition = miniGameState.materialKey === 'manganese';
    const isDeath = miniGameState.stamina !== undefined && (miniGameState.stamina <= 0 || miniGameState.food <= 0 || miniGameState.water <= 0);
    
    if (isManganeseExpedition && isDeath) {
      overlay.innerHTML = `
        <div class="result-icon">💀</div>
        <div class="result-text">Expedition Failed!</div>
        <div class="result-reward" style="color: #FF6B35;">You died on the journey - collected NOTHING</div>
        <button class="btn-primary" onclick="closeMiniGame(false)">Return Empty-Handed</button>
      `;
    } else {
      overlay.innerHTML = `
        <div class="result-icon">⏱️</div>
        <div class="result-text">Time's Up!</div>
        <div class="result-reward">Collected 1x ${materials[miniGameState.materialKey].name}</div>
        <button class="btn-primary" onclick="closeMiniGame(false)">Continue</button>
      `;
    }
  }
  
  container.appendChild(overlay);
}

function closeMiniGame(success) {
  // Check if player died on manganese expedition (should get 0 materials)
  const isManganeseExpedition = miniGameState.materialKey === 'manganese';
  const isDeath = miniGameState.stamina !== undefined && (miniGameState.stamina <= 0 || miniGameState.food <= 0 || miniGameState.water <= 0);
  
  let multiplier;
  if (isManganeseExpedition && isDeath) {
    multiplier = 0; // Death on expedition = no reward
  } else {
    multiplier = success ? (miniGameState.totalMultiplier || miniGames[miniGameState.materialKey].rewardMultiplier) : 1;
  }
  
  gatherMaterial(miniGameState.materialKey, gameState.currentGatherButton, multiplier);
  document.getElementById('minigame-modal').classList.remove('active');
}

// Add handler for close button
function initMiniGameCloseHandler() {
  document.getElementById('close-minigame').addEventListener('click', () => {
    if (miniGameState.active) {
      if (confirm('Exit mini-game? You\'ll get 1x material instead.')) {
        endMiniGame(false);
      }
    } else {
      document.getElementById('minigame-modal').classList.remove('active');
    }
  });
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
  instructions.innerHTML = `
    <strong>The Riverbank Journey</strong><br>
    Travel to find high-quality ochre deposits. Use arrow keys to move.<br>
    <span style="color: #FFD700;">⭐ Golden deposits = Excellent quality (3x reward)</span><br>
    <span style="color: #4CAF50;">🟢 Green deposits = Good quality (2x reward)</span><br>
    Manage your stamina - rest when tired!
  `;
  
  // Create parallax background
  container.innerHTML = '';
  container.style.background = 'none';
  
  const sky = document.createElement('div');
  sky.className = 'minigame-parallax minigame-sky';
  container.appendChild(sky);
  
  const mountains = document.createElement('div');
  mountains.className = 'minigame-parallax minigame-mountains';
  container.appendChild(mountains);
  
  const forest = document.createElement('div');
  forest.className = 'minigame-parallax minigame-forest';
  container.appendChild(forest);
  
  const ground = document.createElement('div');
  ground.className = 'minigame-parallax minigame-ground';
  container.appendChild(ground);
  
  // Add weather
  if (Math.random() > 0.6) {
    const clouds = document.createElement('div');
    clouds.className = 'weather-clouds';
    clouds.style.top = (50 + Math.random() * 80) + 'px';
    sky.appendChild(clouds);
  }
  
  // Stamina bar
  const staminaContainer = document.createElement('div');
  staminaContainer.className = 'stat-bar-container';
  staminaContainer.innerHTML = `
    <div class="stat-bar">
      <div class="stat-bar-label">Stamina</div>
      <div style="background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden;">
        <div class="stat-bar-fill" id="stamina-bar" style="width: 100%;">100%</div>
      </div>
    </div>
    <div class="stat-bar">
      <div class="stat-bar-label">Collected</div>
      <div style="background: rgba(0,0,0,0.5); border-radius: 4px; padding: 8px; color: white; font-weight: bold; text-align: center;" id="collected-count">0 deposits</div>
    </div>
  `;
  container.appendChild(staminaContainer);
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <button class="btn-secondary" id="rest-btn">Rest (Restore Stamina)</button>
  `;
  
  // Character
  const character = document.createElement('div');
  character.className = 'character-sprite';
  character.style.left = '50px';
  character.style.bottom = '80px';
  character.style.zIndex = '20';
  container.appendChild(character);
  
  // Create multiple ochre deposits with varying quality
  const depositQualities = [
    { quality: 'high', multiplier: 3, icon: '🔴', color: '#8B0000', label: 'Excellent' },
    { quality: 'high', multiplier: 3, icon: '🔴', color: '#8B0000', label: 'Excellent' },
    { quality: 'medium', multiplier: 2, icon: '🟠', color: '#CD853F', label: 'Good' },
    { quality: 'medium', multiplier: 2, icon: '🟠', color: '#CD853F', label: 'Good' },
    { quality: 'low', multiplier: 1, icon: '🟤', color: '#8B7355', label: 'Poor' }
  ];
  
  miniGameState.depositsCollected = 0;
  miniGameState.totalMultiplier = 0;
  miniGameState.stamina = 100;
  
  depositQualities.forEach((dep, i) => {
    const deposit = document.createElement('div');
    deposit.className = `resource-deposit quality-${dep.quality}`;
    deposit.innerHTML = dep.icon;
    deposit.style.left = (200 + i * 150) + 'px';
    deposit.style.bottom = (60 + Math.random() * 80) + 'px';
    deposit.style.background = dep.color;
    deposit.style.zIndex = '15';
    deposit.dataset.multiplier = dep.multiplier;
    deposit.dataset.quality = dep.label;
    
    deposit.addEventListener('click', function() {
      if (miniGameState.stamina < 10) {
        showNotification('⚠️ Too tired! Rest first.', 1500);
        return;
      }
      
      const mult = parseInt(this.dataset.multiplier);
      const qual = this.dataset.quality;
      miniGameState.depositsCollected++;
      miniGameState.totalMultiplier += mult;
      miniGameState.stamina -= 15;
      
      showNotification(`✓ Collected ${qual} ochre! (+${mult}x)`, 1500);
      this.remove();
      
      document.getElementById('collected-count').textContent = `${miniGameState.depositsCollected} deposits (+${miniGameState.totalMultiplier}x)`;
      updateStaminaDisplay();
      
      if (miniGameState.depositsCollected >= 3) {
        setTimeout(() => endMiniGame(true), 500);
      }
    });
    
    container.appendChild(deposit);
  });
  
  function updateStaminaDisplay() {
    const bar = document.getElementById('stamina-bar');
    bar.style.width = miniGameState.stamina + '%';
    bar.textContent = Math.floor(miniGameState.stamina) + '%';
    if (miniGameState.stamina < 30) {
      bar.classList.add('low');
    } else {
      bar.classList.remove('low');
    }
  }
  
  document.getElementById('rest-btn').addEventListener('click', () => {
    miniGameState.stamina = Math.min(100, miniGameState.stamina + 40);
    updateStaminaDisplay();
    showNotification('Resting... Stamina restored!', 1500);
  });
  
  // Movement with stamina drain
  let moveInterval = null;
  let lastMove = Date.now();
  
  document.addEventListener('keydown', handleEnhancedNav);
  document.addEventListener('keyup', handleEnhancedNavStop);
  
  function handleEnhancedNav(e) {
    if (!miniGameState.active) return;
    const key = e.key;
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'a', 'd', 'w', 's'].includes(key)) {
      e.preventDefault();
      character.classList.add('walking');
      
      if (!moveInterval) {
        moveInterval = setInterval(() => {
          moveCharacterEnhanced(key);
          // Drain stamina while moving
          if (Date.now() - lastMove > 200) {
            miniGameState.stamina = Math.max(0, miniGameState.stamina - 0.5);
            updateStaminaDisplay();
            lastMove = Date.now();
          }
        }, 50);
      }
    }
  }
  
  function handleEnhancedNavStop(e) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'a', 'd', 'w', 's'].includes(e.key)) {
      character.classList.remove('walking');
      clearInterval(moveInterval);
      moveInterval = null;
    }
  }
  
  function moveCharacterEnhanced(key) {
    const rect = container.getBoundingClientRect();
    let currentLeft = parseInt(character.style.left);
    let currentBottom = parseInt(character.style.bottom);
    const moveSpeed = miniGameState.stamina < 20 ? 2 : 4;
    
    if (key === 'ArrowLeft' || key === 'a') currentLeft -= moveSpeed;
    if (key === 'ArrowRight' || key === 'd') currentLeft += moveSpeed;
    if (key === 'ArrowUp' || key === 'w') currentBottom += moveSpeed;
    if (key === 'ArrowDown' || key === 's') currentBottom -= moveSpeed;
    
    currentLeft = Math.max(0, Math.min(currentLeft, rect.width - 32));
    currentBottom = Math.max(50, Math.min(currentBottom, rect.height - 48));
    
    character.style.left = currentLeft + 'px';
    character.style.bottom = currentBottom + 'px';
    
    // Parallax effect
    const scrollPercent = currentLeft / rect.width;
    mountains.style.transform = `translateX(${-scrollPercent * 50}px)`;
    forest.style.transform = `translateX(${-scrollPercent * 100}px)`;
  }
}

// ========================================
// MULTI-DAY EXPEDITION - THE MOUNTAIN JOURNEY
// Enhanced with beautiful multi-stage journey system
// ========================================
// MOUNTAIN EXPEDITION - CHARACTER PICKER
// ========================================

function showCharacterPicker(container, controls, instructions, gameData) {
  const characters = [
    { emoji: '�', name: 'Horse' },
    { emoji: '�', name: 'Ox' },
    { emoji: '�', name: 'Elk' }
  ];
  
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 2rem;">
      <h2 style="color: var(--ochre-yellow); font-family: var(--font-title); font-size: 2rem; margin-bottom: 1rem; text-align: center;">
        Choose Your Character
      </h2>
      <p style="color: var(--limestone); text-align: center; margin-bottom: 2rem; font-size: 1.1rem;">
        Select the icon that will represent you on this perilous journey
      </p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 500px;">
        ${characters.map((char, i) => `
          <div class="character-option" data-emoji="${char.emoji}" style="
            background: rgba(139, 69, 19, 0.4);
            border: 3px solid var(--stone-gray);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
          " onmouseover="this.style.transform='scale(1.1)'; this.style.borderColor='var(--ochre-yellow)'"
             onmouseout="this.style.transform='scale(1)'; this.style.borderColor='var(--stone-gray)'">
            <div style="font-size: 3.5rem;">${char.emoji}</div>
            <div style="color: var(--ochre-yellow); font-weight: bold; font-size: 0.9rem; margin-top: 0.5rem;">${char.name}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // Add click handlers
  container.querySelectorAll('.character-option').forEach(option => {
    option.addEventListener('click', () => {
      miniGameState.selectedCharacter = option.dataset.emoji;
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
    <strong>🏔️ The Mountain Expedition - A 50+ km Journey for Manganese</strong><br>
    Travel through valleys, forests, and mountains to find rare manganese deposits.<br>
    <span style="color: #FFD700;">⭐ Survive the journey - manage stamina, food, and water</span><br>
    <span style="color: #4CAF50;">✓ No time limit - only success matters! Complete the journey or fail.</span><br>
    <span style="color: #FF6B35;">⚠️ Death means failure - you get NOTHING if you don't reach the deposits!</span>
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
      bg: 'linear-gradient(180deg, #87CEEB 0%, #8B7355 50%, #5C4033 100%)', 
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
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    padding: 12px 20px;
    border-radius: 12px;
    border: 2px solid var(--ochre-yellow);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8);
    z-index: 100;
    max-width: 90%;
    font-size: 0.9rem;
  `;
  
  journeyUI.innerHTML = `
    <div style="text-align: center; margin-bottom: 10px;">
      <div style="font-size: 1.2rem; font-weight: bold; color: var(--ochre-yellow); margin-bottom: 3px;">
        <span id="stage-icon">${stages[0].icon}</span> <span id="stage-name">${stages[0].name}</span>
      </div>
      <div style="color: var(--limestone); font-size: 0.8rem;">
        Day <span id="day-counter">1</span> | Distance: <span id="total-distance">0</span>/65 km | 
        <span id="weather-display">🌤️ Clear</span>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 10px;">
      <div class="stat-panel" style="padding: 6px;">
        <div class="stat-label" style="font-size: 0.75rem; margin-bottom: 3px;">💪 Stamina</div>
        <div class="stat-bar-bg" style="height: 12px; margin-bottom: 3px;">
          <div class="stat-bar-fill stamina-bar" id="stamina-bar" style="width: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A);"></div>
        </div>
        <div class="stat-value" style="font-size: 0.7rem;" id="stamina-value">100%</div>
      </div>
      <div class="stat-panel" style="padding: 6px;">
        <div class="stat-label" style="font-size: 0.75rem; margin-bottom: 3px;">🍖 Food</div>
        <div class="stat-bar-bg" style="height: 12px; margin-bottom: 3px;">
          <div class="stat-bar-fill food-bar" id="food-bar" style="width: 100%; background: linear-gradient(90deg, #FF6B35, #FDB813);"></div>
        </div>
        <div class="stat-value" style="font-size: 0.7rem;" id="food-value">100%</div>
      </div>
      <div class="stat-panel" style="padding: 6px;">
        <div class="stat-label" style="font-size: 0.75rem; margin-bottom: 3px;">💧 Water</div>
        <div class="stat-bar-bg" style="height: 12px; margin-bottom: 3px;">
          <div class="stat-bar-fill water-bar" id="water-bar" style="width: 100%; background: linear-gradient(90deg, #2196F3, #03A9F4);"></div>
        </div>
        <div class="stat-value" style="font-size: 0.7rem;" id="water-value">100%</div>
      </div>
    </div>
    
    <div style="background: rgba(139, 69, 19, 0.3); padding: 6px 10px; border-radius: 6px; margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
        <span style="color: var(--limestone); font-weight: bold; font-size: 0.8rem;">Stage Progress</span>
        <span style="color: var(--ochre-yellow); font-size: 0.8rem;" id="stage-progress-text">0 / ${stages[0].distance} km</span>
      </div>
      <div style="background: rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; height: 14px;">
        <div id="stage-progress-bar" style="height: 100%; background: linear-gradient(90deg, #DAA520, #FFD700); width: 0%; transition: width 0.5s ease;"></div>
      </div>
    </div>
    
    <div id="hazard-warning" style="display: none; background: rgba(255, 107, 53, 0.9); padding: 8px; border-radius: 6px; margin-bottom: 8px; text-align: center; font-weight: bold; color: white; border: 2px solid #FF6B35;">
      <span id="hazard-text">Hazard!</span>
    </div>
    
    <div id="biome-description" style="background: rgba(0, 0, 0, 0.5); padding: 6px; border-radius: 6px; margin-bottom: 8px; font-size: 0.75rem; color: var(--limestone); text-align: center; font-style: italic;">
      ${stages[0].description}
    </div>
    
    <div id="event-log" style="background: rgba(0, 0, 0, 0.6); padding: 6px; border-radius: 6px; max-height: 50px; overflow-y: auto; font-size: 0.75rem; color: var(--limestone);">
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
  
  // Character sprite
  const character = document.createElement('div');
  character.className = 'expedition-character';
  character.style.cssText = `
    position: absolute;
    bottom: 25%;
    left: 15%;
    font-size: 4rem;
    z-index: 10;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8));
    transition: transform 0.3s ease;
  `;
  character.textContent = miniGameState.selectedCharacter || '🚶';
  landscapeContainer.appendChild(character);
  
  container.appendChild(landscapeContainer);
  
  // Journey controls
  controls.innerHTML = `
    <div style="display: flex; gap: 10px; align-items: center; justify-content: center; flex-wrap: wrap;">
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
    <div id="rock-testing-area" style="display: none; margin-top: 20px;">
      <div style="background: rgba(0, 0, 0, 0.8); padding: 20px; border-radius: 12px; border: 3px solid var(--ochre-yellow);">
        <h3 style="color: var(--ochre-yellow); text-align: center; margin-bottom: 15px;">🪨 Test Rock Samples - Streak Method</h3>
        <p style="color: var(--limestone); text-align: center; margin-bottom: 15px; font-style: italic;">
          Rub each rock on unglazed ceramic. <strong>Black streak = Manganese (MnO₂)</strong>
        </p>
        <div id="rock-samples-container" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
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
            background: linear-gradient(135deg, #8B8680 0%, #5C4033 100%);
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
    character.style.transform = 'translateX(20px)';
    setTimeout(() => character.style.transform = 'translateX(0)', 300);
    
    addLogEntry(`🚶 Traveled ${progressIncrement.toFixed(1)} km through ${stage.name}`);
    
    // Update progress bar
    const progressPercent = Math.min(100, (miniGameState.progress / stage.distance) * 100);
    document.getElementById('stage-progress-bar').style.width = progressPercent + '%';
    document.getElementById('stage-progress-text').textContent = `${miniGameState.progress.toFixed(1)} / ${stage.distance} km`;
    document.getElementById('total-distance').textContent = miniGameState.journeyDistance.toFixed(1);
    
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
            addLogEntry(`� ARRIVED at the limestone plateau!`);
            showNotification('🎉 Finally reached the manganese deposits! Now to identify the right rocks...', 4000);
            setTimeout(() => {
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
        <div style="color: var(--limestone); font-size: 0.8rem; font-weight: bold; margin-bottom: 8px;">${rock.name}</div>
        
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

// ========================================
// BOTANICAL IDENTIFICATION - FOREST WISDOM
// ========================================

function setupBotanicalGame(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>Forest Wisdom - Botanical Identification</strong><br>
    Identify resinous trees for torch-making.<br>
    <span style="color: #4CAF50;">✓ Correct: Pine (Pinus sylvestris), Juniper (Juniperus)</span><br>
    <span style="color: #C00000;">✗ Wrong: Oak, Birch, Willow (low resin content)</span><br>
    <em>Scientific fact: Pine has 15-20% resin, Oak only 2-3%</em>
  `;
  
  container.innerHTML = '';
  container.style.background = 'linear-gradient(180deg, #87CEEB 0%, #6B8E23 50%, #5C4033 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <div style="color: white; font-weight: bold; font-size: 1.1rem; margin-top: 10px;">
      Resinous Wood Collected: <span id="trees-collected">0</span> / ${miniGameState.treesNeeded}
    </div>
  `;
  
  const treeTypes = [
    { species: 'pine', className: 'pine', correct: true, name: 'Scots Pine', resin: '15-20%' },
    { species: 'pine', className: 'pine', correct: true, name: 'Scots Pine', resin: '15-20%' },
    { species: 'juniper', className: 'juniper', correct: true, name: 'Juniper', resin: '10-15%' },
    { species: 'oak', className: 'oak', correct: false, name: 'Oak', resin: '2-3%' },
    { species: 'oak', className: 'oak', correct: false, name: 'Oak', resin: '2-3%' },
    { species: 'birch', className: 'oak', correct: false, name: 'Birch', resin: '3-5%' },
    { species: 'willow', className: 'willow', correct: false, name: 'Willow', resin: '1-2%' },
    { species: 'willow', className: 'willow', correct: false, name: 'Willow', resin: '1-2%' }
  ];
  
  treeTypes.sort(() => Math.random() - 0.5);
  
  treeTypes.forEach((treeData, index) => {
    const tree = document.createElement('div');
    tree.className = 'tree ' + treeData.className;
    tree.innerHTML = `
      <div class="tree-canopy"></div>
      <div class="tree-trunk"></div>
    `;
    
    const row = Math.floor(index / 4);
    const col = index % 4;
    tree.style.left = (80 + col * 180) + 'px';
    tree.style.bottom = (120 + row * 150) + 'px';
    tree.title = `${treeData.name} (${treeData.resin} resin)`;
    
    tree.addEventListener('click', function() {
      if (this.classList.contains('correct') || this.classList.contains('wrong')) return;
      
      if (treeData.correct) {
        this.classList.add('correct');
        miniGameState.treesCollected++;
        document.getElementById('trees-collected').textContent = miniGameState.treesCollected;
        showNotification(`✓ ${treeData.name}: ${treeData.resin} resin. Excellent for torches!`, 2000);
        
        if (miniGameState.treesCollected >= miniGameState.treesNeeded) {
          setTimeout(() => endMiniGame(true), 800);
        }
      } else {
        this.classList.add('wrong');
        showNotification(`✗ ${treeData.name}: Only ${treeData.resin} resin. Too low!`, 2000);
        miniGameState.timeRemaining -= 5;
      }
    });
    
    container.appendChild(tree);
  });
}

// ========================================
// PYROLYSIS CONTROL - THE FIRE MASTER
// ========================================

function setupPyrolysisGame(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>The Fire Master - Pyrolysis Control</strong><br>
    Maintain temperature 400-450°C for optimal charcoal production.<br>
    <span style="color: #4CAF50;">🟢 Green zone = Perfect charcoal (75-85% carbon)</span><br>
    Too hot (&gt;600°C) = ash | Too cool (&lt;250°C) = incomplete<br>
    <em>Chemistry: Wood + Heat (300-500°C) → Pure Carbon</em>
  `;
  
  container.style.background = 'linear-gradient(180deg, #4A4A4A 0%, #2C2C2C 50%, #1A1A1A 100%)';
  container.innerHTML = '';
  
  // Create fire pit visual
  const firePit = document.createElement('div');
  firePit.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    text-align: center;
  `;
  
  const fireDisplay = document.createElement('div');
  fireDisplay.style.cssText = `
    font-size: 6rem;
    margin-bottom: 20px;
  `;
  fireDisplay.textContent = '🔥';
  firePit.appendChild(fireDisplay);
  
  const tempDisplay = document.createElement('div');
  tempDisplay.id = 'temp-display';
  tempDisplay.style.cssText = `
    font-size: 2rem;
    font-weight: bold;
    color: white;
    margin-bottom: 20px;
  `;
  tempDisplay.textContent = '400°C';
  firePit.appendChild(tempDisplay);
  
  const zoneDisplay = document.createElement('div');
  zoneDisplay.id = 'zone-display';
  zoneDisplay.style.cssText = `
    font-size: 1.2rem;
    font-weight: bold;
    color: #4CAF50;
    margin-bottom: 30px;
  `;
  zoneDisplay.textContent = '🟢 PERFECT ZONE';
  firePit.appendChild(zoneDisplay);
  
  container.appendChild(firePit);
  
  // Timer display
  controls.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div id="minigame-timer" style="font-size: 1.5rem; color: white; font-weight: bold;">Time: ${miniGameState.timeRemaining}s</div>
      <div id="quality-score" style="font-size: 1.2rem; color: #FFD700; margin-top: 10px;">Quality: 0%</div>
    </div>
    <div style="display: flex; justify-content: center; gap: 1rem;">
      <button class="btn-primary" id="add-wood-btn">🪵 Add Wood (+Heat)</button>
      <button class="btn-secondary" id="reduce-air-btn">💨 Reduce Air (-Heat)</button>
    </div>
  `;
  
  // Game state
  let temperature = 400;
  let qualityScore = 0;
  let timeInPerfectZone = 0;
  
  // Temperature drift
  const tempDrift = setInterval(() => {
    if (!miniGameState.active) {
      clearInterval(tempDrift);
      return;
    }
    
    // Temperature naturally decreases
    temperature -= 5 + Math.random() * 5;
    temperature = Math.max(200, Math.min(700, temperature));
    updateDisplay();
  }, 1000);
  
  // Control buttons
  document.getElementById('add-wood-btn').addEventListener('click', () => {
    temperature += 30 + Math.random() * 20;
    temperature = Math.min(700, temperature);
    sounds.click();
    updateDisplay();
  });
  
  document.getElementById('reduce-air-btn').addEventListener('click', () => {
    temperature -= 20 + Math.random() * 15;
    temperature = Math.max(200, temperature);
    sounds.click();
    updateDisplay();
  });
  
  function updateDisplay() {
    const tempEl = document.getElementById('temp-display');
    const zoneEl = document.getElementById('zone-display');
    const qualityEl = document.getElementById('quality-score');
    
    if (!tempEl) return;
    
    tempEl.textContent = Math.round(temperature) + '°C';
    
    // Determine zone
    if (temperature >= 400 && temperature <= 450) {
      zoneEl.textContent = '🟢 PERFECT ZONE!';
      zoneEl.style.color = '#4CAF50';
      fireDisplay.textContent = '🔥';
      timeInPerfectZone++;
      qualityScore = Math.min(100, (timeInPerfectZone / 20) * 100);
    } else if (temperature >= 350 && temperature <= 500) {
      zoneEl.textContent = '🟡 GOOD ZONE';
      zoneEl.style.color = '#FFD700';
      fireDisplay.textContent = '🔥';
      qualityScore = Math.min(100, (timeInPerfectZone / 25) * 100);
    } else if (temperature > 600) {
      zoneEl.textContent = '🔴 TOO HOT - BURNING TO ASH!';
      zoneEl.style.color = '#F44336';
      fireDisplay.textContent = '💥';
      qualityScore = Math.max(0, qualityScore - 5);
    } else if (temperature < 250) {
      zoneEl.textContent = '🔵 TOO COOL - INCOMPLETE';
      zoneEl.style.color = '#2196F3';
      fireDisplay.textContent = '💨';
      qualityScore = Math.max(0, qualityScore - 3);
    } else {
      zoneEl.textContent = '⚪ ACCEPTABLE';
      zoneEl.style.color = '#9E9E9E';
      fireDisplay.textContent = '🔥';
    }
    
    qualityEl.textContent = `Quality: ${Math.round(qualityScore)}%`;
    
    // Win condition
    if (qualityScore >= 80) {
      clearInterval(tempDrift);
      miniGameState.totalMultiplier = gameData.rewardMultiplier;
      setTimeout(() => endMiniGame(true), 500);
    }
  }
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
    <div class="pigment-pile" id="pigment-pile" style="background: #8B4513; opacity: 0.3;"></div>
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
  instructions.innerHTML = `
    <strong>Illumination Strategy - Cave Lighting Planning</strong><br>
    Plan lighting for deep cave painting session (2-4 hours).<br>
    Place torches and lamps strategically. Calculate fuel needs!<br>
    <em>Torch: 10 min per 100g | Lamp: 60 min per 15ml | Smoke management critical</em>
  `;
  
  container.innerHTML = '';
  container.style.background = 'linear-gradient(135deg, #0a0806 0%, #1a1410 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <div style="margin-top: 10px; display: flex; gap: 10px;">
      <button class="btn-secondary" id="place-torch-btn">🔥 Place Torch</button>
      <button class="btn-secondary" id="place-lamp-btn">🪔 Place Lamp</button>
      <button class="btn-primary" id="calculate-btn">Calculate Fuel Needs</button>
    </div>
    <div style="color: white; margin-top: 10px; text-align: center;" id="fuel-display"></div>
  `;
  
  const caveMap = document.createElement('div');
  caveMap.className = 'cave-map';
  
  // Create cave passages
  const passages = [
    { x: '10%', y: '10%', w: '30%', h: '20%', name: 'Entrance' },
    { x: '40%', y: '15%', w: '25%', h: '25%', name: 'Main Chamber' },
    { x: '65%', y: '20%', w: '25%', h: '30%', name: 'Gallery' },
    { x: '30%', y: '50%', w: '40%', h: '35%', name: 'Deep Chamber' }
  ];
  
  passages.forEach(passage => {
    const div = document.createElement('div');
    div.className = 'cave-passage';
    div.style.left = passage.x;
    div.style.top = passage.y;
    div.style.width = passage.w;
    div.style.height = passage.h;
    div.innerHTML = `<div style="color: var(--ochre-yellow); font-size: 0.8rem; padding: 5px;">${passage.name}</div>`;
    div.dataset.lit = 'false';
    
    div.addEventListener('click', function() {
      if (miniGameState.placingLight) {
        const icon = document.createElement('div');
        icon.className = 'light-source-icon';
        icon.textContent = miniGameState.placingLight;
        icon.style.left = '50%';
        icon.style.top = '50%';
        icon.style.transform = 'translate(-50%, -50%)';
        this.appendChild(icon);
        this.classList.add('lit');
        this.dataset.lit = 'true';
        miniGameState.placingLight = null;
        miniGameState.lightsPlaced++;
        showNotification(`✓ Light placed in ${passage.name}`, 1500);
      }
    });
    
    caveMap.appendChild(div);
  });
  
  caveMap.style.position = 'absolute';
  caveMap.style.top = '50%';
  caveMap.style.left = '50%';
  caveMap.style.transform = 'translate(-50%, -50%)';
  container.appendChild(caveMap);
  
  miniGameState.lightsPlaced = 0;
  miniGameState.placingLight = null;
  
  document.getElementById('place-torch-btn').addEventListener('click', () => {
    miniGameState.placingLight = '🔥';
    showNotification('Click a chamber to place torch', 1500);
  });
  
  document.getElementById('place-lamp-btn').addEventListener('click', () => {
    miniGameState.placingLight = '🪔';
    showNotification('Click a chamber to place lamp', 1500);
  });
  
  document.getElementById('calculate-btn').addEventListener('click', () => {
    if (miniGameState.lightsPlaced >= 3) {
      const fuelDisplay = document.getElementById('fuel-display');
      fuelDisplay.innerHTML = `
        <div style="background: rgba(76, 175, 80, 0.3); padding: 15px; border-radius: 10px; border: 2px solid #4CAF50;">
          <strong>✓ Lighting Plan Complete!</strong><br>
          ${miniGameState.lightsPlaced} light sources placed<br>
          Estimated fuel: 300g wood + 60ml fat<br>
          Duration: 2-4 hours work session
        </div>
      `;
      setTimeout(() => endMiniGame(true), 2000);
    } else {
      showNotification('⚠️ Need at least 3 light sources for deep cave work!', 2000);
    }
  });
}

function setupTemplateGame(container, controls, instructions, gameData) {
  instructions.innerHTML = `
    <strong>Pattern Master - Template Creation</strong><br>
    Study animal proportions and create accurate template.<br>
    Horse: 2.5:1 L:H | Aurochs: 2.2:1 | Bison: 2:1<br>
    <em>95%+ anatomical accuracy in Magdalenian art!</em>
  `;
  
  container.innerHTML = '';
  container.style.background = 'linear-gradient(135deg, #2C1810 0%, #1a1410 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <div style="margin-top: 10px; display: flex; gap: 10px; flex-wrap: wrap;">
      <button class="btn-secondary animal-select" data-animal="🐴" data-ratio="2.5">Horse (2.5:1)</button>
      <button class="btn-secondary animal-select" data-animal="🐂" data-ratio="2.2">Aurochs (2.2:1)</button>
      <button class="btn-secondary animal-select" data-animal="🦬" data-ratio="2.0">Bison (2:1)</button>
    </div>
    <button class="btn-primary" id="verify-btn" disabled style="margin-top: 10px;">Verify Proportions</button>
  `;
  
  const canvas = document.createElement('div');
  canvas.className = 'template-canvas';
  canvas.innerHTML = `
    <div class="template-grid"></div>
    <div class="animal-reference" id="animal-ref" style="opacity: 0;"></div>
    <div class="drawing-overlay" id="drawing-overlay"></div>
  `;
  canvas.style.position = 'absolute';
  canvas.style.top = '35%';
  canvas.style.left = '50%';
  canvas.style.transform = 'translate(-50%, -50%)';
  container.appendChild(canvas);
  
  const infoBox = document.createElement('div');
  infoBox.style.cssText = 'position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%); color: white; text-align: center; font-size: 0.9rem;';
  infoBox.textContent = 'Select an animal to study...';
  container.appendChild(infoBox);
  
  let selectedAnimal = '';
  let selectedRatio = 0;
  
  document.querySelectorAll('.animal-select').forEach(btn => {
    btn.addEventListener('click', function() {
      selectedAnimal = this.dataset.animal;
      selectedRatio = parseFloat(this.dataset.ratio);
      document.getElementById('animal-ref').textContent = selectedAnimal;
      document.getElementById('animal-ref').style.opacity = '0.3';
      document.querySelectorAll('.animal-select').forEach(b => b.style.borderColor = '');
      this.style.borderColor = '#4CAF50';
      document.getElementById('verify-btn').disabled = false;
      
      const names = { '🐴': 'Horse', '🐂': 'Aurochs', '🦬': 'Bison' };
      infoBox.textContent = `Studying ${names[selectedAnimal]} anatomy (${selectedRatio}:1 length:height ratio)`;
    });
  });
  
  document.getElementById('verify-btn').addEventListener('click', () => {
    const names = { '🐴': 'Horse', '🐂': 'Aurochs', '🦬': 'Bison' };
    showNotification(`✓ ${names[selectedAnimal]} template verified! Proportions accurate: ${selectedRatio}:1`, 2500);
    setTimeout(() => endMiniGame(true), 2000);
  });
}

function setupIdentificationGame(container, controls, instructions) {
  instructions.textContent = 'Click on resinous trees (pine, juniper) for torch-making. Avoid wrong trees!';
  
  container.style.background = 'linear-gradient(180deg, #87CEEB 0%, #6B8E23 50%, #5C4033 100%)';
  
  controls.innerHTML = `
    <div class="progress-bar" style="width: 300px;">
      <div class="progress-fill" id="minigame-timer">Time: ${miniGameState.timeRemaining}s</div>
    </div>
    <div style="color: white; font-weight: bold; font-size: 1.1rem;">Collected: <span id="trees-collected">0</span> / ${miniGameState.treesNeeded}</div>
  `;
  
  // Create trees
  const treeTypes = [
    { type: 'pine', correct: true },
    { type: 'pine', correct: true },
    { type: 'pine', correct: true },
    { type: 'oak', correct: false },
    { type: 'oak', correct: false },
    { type: 'oak', correct: false },
    { type: 'willow', correct: false },
    { type: 'willow', correct: false }
  ];
  
  // Shuffle trees
  treeTypes.sort(() => Math.random() - 0.5);
  
  treeTypes.forEach((treeData, index) => {
    const tree = document.createElement('div');
    tree.className = 'tree ' + treeData.type;
    tree.innerHTML = `
      <div class="tree-canopy"></div>
      <div class="tree-trunk"></div>
    `;
    
    const row = Math.floor(index / 4);
    const col = index % 4;
    tree.style.left = (100 + col * 180) + 'px';
    tree.style.bottom = (100 + row * 150) + 'px';
    
    tree.addEventListener('click', () => {
      if (tree.classList.contains('correct') || tree.classList.contains('wrong')) return;
      
      if (treeData.correct) {
        tree.classList.add('correct');
        miniGameState.treesCollected++;
        document.getElementById('trees-collected').textContent = miniGameState.treesCollected;
        showNotification('✓ Good choice! Resinous wood.', 1000);
        
        if (miniGameState.treesCollected >= miniGameState.treesNeeded) {
          setTimeout(() => endMiniGame(true), 500);
        }
      } else {
        tree.classList.add('wrong');
        showNotification('✗ Wrong tree type!', 1000);
        miniGameState.timeRemaining -= 5; // Penalty
      }
    });
    
    container.appendChild(tree);
  });
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
        showNotification(`✨ Created ${craftingRecipe.name}! You can now enter the CAVE!`, 3000);
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
    background: radial-gradient(circle at 30% 30%, #8B7355 0%, #5C4033 100%);
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
    background: linear-gradient(90deg, #4A3526 0%, #5C4033 50%, #4A3526 100%);
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
  hairGrid.style.cssText = 'display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 30px;';
  
  for (let i = 0; i < 18; i++) {
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