# 🎨 The Magdalenian Cave Art Experience

> An educational cave art painting game set 17,000 years ago - Journey to the caves of Lascaux

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-demo-url.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 🌟 Overview

**The Magdalenian Cave Art Experience** is an interactive, historically accurate recreation of Upper Paleolithic cave painting. Travel back 17,000 years to experience the authentic process of creating cave art at Lascaux, France.

### 🎯 Key Features

- **12 Educational Mini-Games** - Learn authentic prehistoric techniques through engaging challenges
- **Historically Accurate** - Based on peer-reviewed archaeological research
- **Beautiful Visuals** - Parallax landscapes, atmospheric lighting, and detailed animations
- **Complete Crafting System** - Gather materials, process pigments, craft tools, create art
- **Achievement System** - Earn badges for mastering each technique
- **No Quick Shortcuts** - Every resource requires authentic gathering methods

## 🎮 How to Play

### Quick Start

1. Open `index.html` in a modern web browser
2. Click "BEGIN YOUR JOURNEY" on the title screen
3. Navigate between three main areas using the top navigation:
   - **🌄 Gathering Area** - Collect raw materials from the landscape
   - **⚒️ Workshop** - Process materials and craft paints/tools
   - **🕳️ Cave** - Create your masterpiece (requires a light source!)

### Game Loop

```
Gather Materials → Process in Workshop → Craft Tools & Paints → Paint in Cave
```

## 🎓 Educational Content

### The Magdalenian Period (17,000 - 12,000 BCE)

- **Peak of Ice Age art** - Most sophisticated prehistoric artistic achievement
- **Lascaux Cave** - Contains ~600 paintings and 1,500 engravings
- **Advanced techniques** - Pigment grinding, paint mixing, brush making, stenciling
- **Scientific accuracy** - All formulas, measurements, and techniques based on archaeological evidence

### Materials & Chemistry

| Material | Formula | Use |
|----------|---------|-----|
| Red Ochre | Fe₂O₃ (Hematite) | Warm red-brown pigment |
| Yellow Ochre | FeO(OH) (Goethite) | Golden yellow hues |
| Charcoal | C (Carbon) | Deep black pigment |
| Manganese | MnO₂ (Pyrolusite) | Brown-black tones |
| Limestone | CaCO₃ (Calcite) | White highlights |

### Techniques Implemented

- **Pigment Grinding**: 100+ microns → 10-20 microns (15-30 min)
- **Paint Mixing**: Ratios of 2:1, 1:1, or 1:2 (pigment:fat)
- **Brush Making**: 50-80 hairs bundled with sinew
- **Torch Crafting**: Resinous wood (15-20% resin content)
- **Stone Lamp**: Burns 1-3 hours with animal fat
- **Spray Tube**: Hollow bird bone for stenciling (15-25 PSI)

## 🎲 Mini-Games

### Resource Gathering (6 Games)

1. **The Riverbank Journey** - Navigate parallax landscape to find quality ochre deposits
2. **The Mountain Expedition** - Multi-day journey with resource management
3. **Forest Wisdom** - Identify resinous trees for torch-making
4. **The Fire Master** - Control pyrolysis temperature for charcoal
5. **The Provisioner** - Extract and render bone marrow fat
6. **The Tool Maker** - Craft hollow bone spray tubes

### Advanced Crafting (6 Games)

7. **Light Bringer** - Carve stone lamp to correct depth
8. **The Fine Artist** - Select quality hair strands for brushes
9. **The Alchemist** - Grind pigments with rhythm matching
10. **Color Harmony** - Mix paint with correct ratios
11. **Illumination Strategy** - Plan cave lighting for painting sessions
12. **Pattern Master** - Study animal proportions (Horse 2.5:1, Aurochs 2.2:1)

## 🛠️ Technical Details

### Technologies Used

- **HTML5 Canvas** - For cave painting functionality
- **Vanilla JavaScript** - No frameworks, pure performance
- **CSS3 Animations** - Parallax effects, particle systems, transitions
- **Web Fonts** - Cinzel (titles), Merriweather (body)

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Mobile browsers (touch optimized but some features may vary)

### Performance Optimizations

- Particle system with automatic cleanup
- Canvas rendering optimizations
- Event listener management
- Efficient DOM manipulation
- Responsive design with media queries

## ♿ Accessibility Features

The game is designed to be accessible to all users:

### Keyboard Navigation

- **1** - Switch to Gathering scene
- **2** - Switch to Workshop scene  
- **3** - Switch to Cave scene
- **H** - Open Help menu
- **C** - Open Codex
- **Ctrl+S** - Save game progress
- **Esc** - Close modals

### Screen Reader Support

- ARIA labels on all interactive elements
- Role attributes for regions and navigation
- Live regions for notifications
- Skip to content link

### Visual Accessibility

- Focus indicators on all interactive elements
- High contrast mode support
- Reduced motion support (respects `prefers-reduced-motion`)
- Semantic HTML structure
- Keyboard shortcuts displayed in Help menu

## 📱 Mobile Support

The game includes touch controls and mobile optimizations:

- Touch drawing on cave canvas
- Responsive layouts for tablets and phones
- Optimized button sizes for touch interaction
- Reduced particle effects on mobile for performance

## 💾 Save System

Your progress is automatically saved:

- **Auto-save** - Progress saved when gathering materials or crafting
- **Manual save** - Click the 💾 button or press Ctrl+S
- **Local storage** - Saves inventory, tools, paints, badges, and light sources
- **Reset option** - 🔄 button to start fresh

## 🎨 Game Mechanics

### Inventory System

- Track all collected materials
- Visual item display with counts
- Automatic updates when crafting

### Crafting System

- **Paints**: Require pigment + animal fat binder
- **Tools**: Various material combinations
- **Light Sources**: Required to enter cave
- Visual feedback on available/completed recipes

### Painting System

- Multiple paint colors (red, yellow, black, brown, white)
- Various applicators (finger, brush, spray, moss pad)
- Animal templates for guidance
- Canvas with undo/clear functionality

### Badge System

12 unique achievements for completing mini-game challenges with high quality

## 📚 Educational Resources

### In-Game Codex

Access detailed information about:
- The Magdalenian Period
- Pigment chemistry and sources  
- Painting techniques and tools
- Animals depicted at Lascaux
- Gallery of cave art masterworks

### Scientific Accuracy

All game mechanics based on:
- Archaeological excavations at Lascaux
- Experimental archaeology studies
- Peer-reviewed research papers
- Museum collections and expert consultations

## 🚀 Development

### File Structure

```
Magdalenian-Artist/
├── index.html          # Main game HTML
├── app.js              # Game logic (3,618 lines)
├── style.css           # Styling (3,375 lines)
└── README.md           # This file
```

### Key Code Sections

- **Lines 1-200**: Game state and data definitions
- **Lines 200-600**: UI initialization and scene management
- **Lines 600-1200**: Landscape, workshop, and cave scenes
- **Lines 1200-2000**: Mini-game implementations
- **Lines 2000-3618**: Workshop crafting games and utilities

## 🎯 Future Enhancements

- [x] Save/load functionality (localStorage) ✅ IMPLEMENTED
- [x] Keyboard navigation shortcuts ✅ IMPLEMENTED
- [x] Accessibility improvements (ARIA, focus states) ✅ IMPLEMENTED
- [ ] Sound effects and ambient audio
- [ ] More animal templates
- [ ] Gallery system for completed paintings
- [ ] Multiplayer collaboration mode
- [ ] VR support for immersive experience
- [ ] Additional prehistoric sites (Chauvet, Altamira)
- [ ] Educational mode with guided tours

## 📖 Credits

### Research Sources

- Lascaux Cave Archaeological Studies
- Experimental Archaeology Research
- Peer-Reviewed Publications on Prehistoric Art
- Museum Expert Consultations

### Development

- Game Design & Programming: Marco Birkedahl Jørgensen
- Historical Research: Archaeological Literature
- Art Direction: Authentic Magdalenian Techniques

### Creator

Created by [Marco Birkedahl Jørgensen](https://marcoj03rgensen.github.io/)

## 📄 License

© 2025 Marco Birkedahl Jørgensen. All rights reserved.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Areas for contribution:
- Bug fixes
- Performance improvements
- Additional mini-games
- Translations
- Accessibility enhancements

## 📞 Contact

- Website: [https://marcoj03rgensen.github.io/](https://marcoj03rgensen.github.io/)
- GitHub: [@marcoj03rgensen](https://github.com/marcoj03rgensen)

---

**The Magdalenian Cave Art Experience** - Made with ❤️ for prehistoric art education and archaeological science

