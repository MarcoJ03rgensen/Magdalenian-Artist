# 🎨 The Magdalenian Cave Art Experience

> An educational cave art painting game set 17,000 years ago

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://marcoj03rgensen.github.io/The-Magdalenian-Cave-Art-Experience/)
[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

## 🌟 Overview

**The Magdalenian Cave Art Experience** is an interactive, historically accurate recreation of Upper Paleolithic cave painting. Travel back 17,000 years to experience the authentic process of creating cave art the way the Magdalenians did

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
- ⚠️ Mobile browsers, touch optimized, but not functional as of now

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
- Gallery of cave art masterworks

## 🎯 Future Enhancements

- [x] Save/load functionality (localStorage) ✅ IMPLEMENTED
- [x] Keyboard navigation shortcuts ✅ IMPLEMENTED
- [x] Accessibility improvements (ARIA, focus states) ✅ IMPLEMENTED
- [ ] Modes - Language and game style adapted to specific groups. For instance simpler words in the "Child" mode
- [ ] Authentic sound effects
- [ ] Google Drive/browser history based gallery system for completed paintings
- [ ] Multiplayer collaboration mode
- [ ] VR support for immersive experience
- [ ] Specific sites
- [ ] Educational mode (dissemination guide)

## 📖 Credits

### Development

Game Design & Programming: Marco Birkedahl Jørgensen
  
### Research Sources

Chalmin, E., Menu, M. and Vignaud, C., 2003. Analysis of rock art painting and technology of Palaeolithic painters. Measurement Science and Technology, 14, pp. 1590–1597.

Cuenca-Solana, D., Gutiérrez-Zugasti, I., Ruiz-Redondo, A., González-Morales, M.R., Setién, J., Ruiz-Martínez, E., Palacio-Pérez, E., de las Heras-Martín, C., Prada-Freixedo, A. and Lasheras-Corruchaga, J.A. (2016) 'Painting Altamira Cave? Shell tools for ochre-processing in the Upper Palaeolithic in northern Iberia', Journal of Archaeological Science, 74, pp. 135–151

Garate, D., Rivero, O., Rios Garaizar, J., Medina Alcaide, M.Á., Arriolabengoa, M., Intxaurbe, I., Ruiz López, J.F., Marín Arroyo, A.B., Rofes, J., García Bustos, P., Torres, A. and Salazar, S., (2023). 
Unravelling the skills and motivations of Magdalenian artists in the depths of Atxurra Cave (Northern Spain). Scientific Reports, 13

Hughes, F., (2021). Relief and the Structure of Intentions in Late Palaeolithic Cave Art. The Journal of Aesthetics and Art Criticism, 79, pp. 285–300.

Leroi-Gourhan, Arl., (1982). The Archaeology of Lascaux Cave. Scientific American, 246(6), pp. 104-113.

Medina-Alcaide, M.Á., Garate, D., Intxaurbe, I., Sanchidrián, J.L., Rivero, O., Ferrier, C., Mesa, M.D., Pereña, J. and Lı́bano, I. (2021) 'The conquest of the dark spaces: An experimental approach to lighting systems in Paleolithic caves', PLOS ONE, 16(6).

Pomiès, M.-P., Menu, M. and Vignaud, C., (1999). Red Palaeolithic pigments: natural hematite or heated goethite? Archaeometry, 41(2), pp. 275-285.

Salomon, H., Vignaud, C., Lahlil, S. and Menguy, N., (2015). Solutrean and Magdalenian ferruginous rocks heat-treatment: accidental and/or deliberate action? Journal of Archaeological Science, 55, pp. 100-112.

Vignaud, C., Salomon, H., Chalmin, E., Geneste, J.M. and Menu, M. (2006) 'Le groupe des « bisons adossés » de Lascaux. Étude de la technique de l’artiste par analyse des pigments', L’anthropologie, 110, pp. 482–499.

Wisher, I., Pettitt, P. and Kentridge, R. (2023) ‘Conversations with Caves: The Role of Pareidolia in the Upper Palaeolithic Figurative Art of Las Monedas and La Pasiega (Cantabria, Spain)’, Cambridge Archaeological Journal, pp. 1–24. doi: 10.1017/S0959774323000288

### Creator

Created by [Marco Birkedahl Jørgensen](https://marcoj03rgensen.github.io/)

## 📄 License

**Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)**

© 2025 Marco Birkedahl Jørgensen. All rights reserved.

### ✓ Permitted Uses (Non-Commercial Only)
- Educational and academic use
- Personal learning and study
- Non-commercial research
- Classroom demonstrations
- Museum exhibitions (non-profit)

### ✗ Prohibited Without Permission
- Commercial exploitation or use
- Selling or licensing the software
- Using in commercial products or services
- Creating and distributing derivative works
- Removing attribution to the creator

### Attribution Required
When sharing or using this work, you must:
1. Give appropriate credit to **Marco Birkedahl Jørgensen**
2. Provide a link to the license
3. Indicate if any changes were made
4. Not suggest the creator endorses your use

### Commercial Licensing
All commercial rights are reserved exclusively to Marco Birkedahl Jørgensen.

For commercial use, licensing inquiries, or permission to create derivative works, please contact the creator directly.

**Full License**: See [LICENSE](LICENSE) file or visit [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)

## 🤝 Contributing

**Note**: This project is licensed under CC BY-NC-ND 4.0, which does not permit distribution of derivative works without express permission. However, you may:

- Report bugs and issues
- Suggest improvements and features
- Contribute bug fixes (requires permission to merge)
- Help with documentation and translations
- Share educational use cases

For any contributions that modify the codebase, please:
1. Open an issue first to discuss the proposed changes
2. Request permission for derivative work
3. Fork the repository (for personal study only)
4. Contact the creator about contribution terms

Areas where input is welcome:
- Bug reports and fixes
- Performance optimization suggestions
- Accessibility improvement ideas
- Translation contributions
- Educational feedback

## 📞 Contact

- Website: [https://marcoj03rgensen.github.io/](https://marcoj03rgensen.github.io/)
- GitHub: [@marcoj03rgensen](https://github.com/marcoj03rgensen)

---


