# 🎮 RELIC RUSH - Endless Runner Game

**RELIC RUSH** is a fast-paced, endless runner game built with **Phaser 3** and **HTML5/JavaScript**. Developed by **SMILEY STUDIOS ツ**

![Game Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Phaser](https://img.shields.io/badge/phaser-3.55.2-orange)

---

## 🎯 Game Overview

Navigate through ancient temples and mysterious ruins collecting treasures while avoiding obstacles and defeating enemies. How far can you run?

### Key Features

✨ **Endless Gameplay** - Procedurally generated levels with increasing difficulty  
🎨 **8+ Unique Environments** - Temple Jungle, Lost City, Ice Temple, Volcano, and more  
👤 **5 Playable Characters** - Unlock new heroes with different abilities  
💎 **Collectibles System** - Coins, Gems, and Relics with varying values  
⚡ **8 Power-ups** - Magnet, Shield, Speed Boost, Flying Boots, and more  
👹 **Dynamic Enemies & Bosses** - AI-controlled enemies with multiple difficulty levels  
🎯 **Daily Missions** - Earn rewards by completing daily challenges  
🏆 **Achievement System** - Unlock 100+ achievements  
📊 **Leaderboards** - Track your best scores and distances  
🛒 **In-Game Shop** - Purchase character skins and power-ups  
📱 **Mobile Optimized** - Touch and keyboard controls  
🔊 **Full Audio** - Background music and sound effects  

---

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Game Controls](#game-controls)
- [Project Structure](#project-structure)
- [Game Mechanics](#game-mechanics)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)
- [Credits](#credits)

---

## 💻 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for local server)
- Text editor (VS Code recommended)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/tutorial076/relic-rush.git
cd relic-rush
```

2. **Start a local server** (optional but recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using VS Code Live Server
# Install extension and right-click index.html > "Open with Live Server"
```

3. **Open in browser**
```
http://localhost:8000
```

---

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Click **PLAY** to start the game
3. Use controls to navigate and collect treasures
4. Reach milestones to unlock bosses
5. Complete daily missions for bonus coins

---

## 🎮 Game Controls

### Desktop (Keyboard)
| Action | Key |
|--------|-----|
| Move Left | `A` or `←` |
| Move Right | `D` or `→` |
| Jump | `SPACE` |
| Slide | `S` |
| Pause | ESC or Pause Button |

### Mobile (Touch)
| Action | Gesture |
|--------|----------|
| Move Left | Tap Left Side |
| Move Right | Tap Right Side |
| Jump | Tap Top Half |
| Slide | Tap Center/Bottom |
| Pause | Pause Button |

---

## 📁 Project Structure

```
relic-rush/
├── index.html                 # Main entry point
├── assets/
│   ├── css/
│   │   └── style.css         # Game styles
│   ├── images/
│   │   ├── environments/     # Background images
│   │   ├── ui/              # UI assets
│   │   ├── collectibles/    # Coin, gem assets
│   │   ├── obstacles/       # Obstacle sprites
│   │   └── powerups/        # Power-up icons
│   ├── spritesheets/
│   │   ├── characters/      # Player character animations
│   │   ├── enemies/         # Enemy animations
│   │   ├── bosses/          # Boss animations
│   │   └── particles.png    # Particle effects
│   └── audio/
│       ├── music/           # Background music
│       └── sfx/             # Sound effects
├── src/
│   ├── Game.js              # Main game initialization
│   ├── utils/
│   │   ├── Config.js        # Game configuration
│   │   ├── InputManager.js  # Input handling
│   │   ├── AudioManager.js  # Audio management
│   │   ├── SaveManager.js   # Save/load system
│   │   └── AssetManager.js  # Asset loading
│   ├── objects/
│   │   ├── Player.js        # Player character
│   │   ├── Obstacle.js      # Obstacles
│   │   ├── Collectible.js   # Collectibles
│   │   ├── PowerUp.js       # Power-ups
│   │   ├── Enemy.js         # Enemies
│   │   └── Boss.js          # Boss enemies
│   ├── systems/
│   │   ├── LevelGenerator.js    # Level generation
│   │   ├── UIManager.js         # UI rendering
│   │   ├── ParticleManager.js   # Particle effects
│   │   ├── MissionSystem.js     # Daily missions
│   │   └── AchievementSystem.js # Achievements
│   └── scenes/
│       ├── BootScene.js             # Initialization
│       ├── LoadingScene.js          # Asset loading
│       ├── MainMenuScene.js         # Main menu
│       ├── GameScene.js             # Main gameplay
│       ├── PauseMenuScene.js        # Pause menu
│       ├── GameOverScene.js         # Game over screen
│       ├── SettingsScene.js         # Settings menu
│       ├── ShopScene.js             # In-game shop
│       ├── CharacterSelectScene.js  # Character selection
│       └── LeaderboardScene.js      # Leaderboard
└── README.md                # This file
```

---

## 🎯 Game Mechanics

### Scoring System
- **Distance**: 1 point per meter
- **Coins**: 10 points each
- **Gems**: 50 points each
- **Relics**: 100 points each
- **Enemy Defeat**: 100 points

### Player Lives
- Start with **3 lives**
- Lose 1 life on obstacle collision
- Gain 1 life with Extra Life power-up
- Game over when lives reach 0

### Difficulty Progression
- Difficulty increases every 5,000 meters
- Obstacle spawn rate increases
- Enemy count increases
- Boss encounters every 5,000 meters

### Collectibles
- **Coin** (💛): 10 points
- **Gem** (💎): 50 points
- **Relic** (✨): 100 points
- **Key**: 25 points
- **Chest** (🎁): 200 points + spawns bonus coins

### Power-ups
- **Magnet** - Attracts nearby coins (10s)
- **Double Coins** - 2x coin value (15s)
- **Shield** - Block one hit (20s)
- **Speed Boost** - Increase movement speed (8s)
- **Slow Motion** - Slow game speed (5s)
- **Extra Life** - Gain 1 life
- **Radar** - See upcoming obstacles (15s)
- **Flying Boots** - Ignore gravity (12s)

### Obstacles
- **Rock** - Rolling rock
- **Fire Trap** - Damaging flame
- **Bridge** - Collapsing platform
- **Axe** - Swinging blade
- **Pillar** - Stationary obstacle
- **Spike** - Sharp hazard
- **Dart** - Fast projectile
- **Lava** - Damaging pool
- **Wall** - Large barrier

### Enemies
| Enemy | Health | Speed | Damage |
|-------|--------|-------|--------|
| Stone Golem | 3 | 80 | 1 |
| Temple Guardian | 2 | 150 | 1 |
| Ghost Spirit | 1 | 200 | 1 |
| Fire Beast | 4 | 120 | 2 |
| Ancient Snake | 2 | 180 | 1 |
| Shadow Monster | 3 | 160 | 1 |

### Bosses
- **Stone Golem** (10 HP) - Chase pattern
- **Fire Dragon** (15 HP) - Ranged attacks
- **Temple King** (12 HP) - Multi-attack
- **Crystal Guardian** (8 HP) - Chase pattern

---

## ⚙️ Configuration

Edit `src/utils/Config.js` to customize game settings:

```javascript
// Game Window
GameConfig.GAME_WIDTH = 1080;
GameConfig.GAME_HEIGHT = 1920;

// Player Settings
GameConfig.PLAYER.SPEED = 200;
GameConfig.PLAYER.MAX_SPEED = 300;
GameConfig.PLAYER.JUMP_VELOCITY = -500;

// Difficulty
GameConfig.DIFFICULTY = {
    EASY: { multiplier: 0.8, enemyCount: 2 },
    NORMAL: { multiplier: 1.0, enemyCount: 3 },
    HARD: { multiplier: 1.3, enemyCount: 5 }
};

// And more...
```

---

## 🔧 Development

### Adding New Features

1. **New Collectible Type**
```javascript
// In src/utils/Config.js
GameConfig.COLLECTIBLES.NEW_ITEM = { value: 75, size: 25 };

// Create class in src/objects/Collectible.js
class NewItemCollectible extends Collectible {
    constructor(scene, x, y) {
        super(scene, x, y, 'NEW_ITEM');
        this.value = 75;
    }
}
```

2. **New Enemy Type**
```javascript
// In src/utils/Config.js
GameConfig.ENEMIES.NEW_ENEMY = { health: 3, speed: 140, damage: 1 };

// Create class in src/objects/Enemy.js
class NewEnemy extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'NEW_ENEMY');
    }
}
```

3. **New Scene**
```javascript
// Create src/scenes/NewScene.js
class NewScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NewScene' });
    }
    
    create() {
        // Scene setup
    }
}

// Add to phaser_config in src/Game.js
```

---

## 🎓 Game Design

### Core Loop
1. Player moves through lanes to avoid obstacles
2. Collect coins, gems, and power-ups
3. Defeat enemies and bosses
4. Increase distance to earn points
5. Complete daily missions for bonuses
6. Unlock achievements and characters

---

## 🐛 Troubleshooting

### Game Won't Load
- Clear browser cache
- Try a different browser
- Check console for errors (F12)
- Ensure all assets are in correct paths

### Audio Not Playing
- Check browser audio settings
- Verify audio files are in `assets/audio/`
- Check browser console for errors

### Performance Issues
- Reduce particle effects in Settings
- Lower graphics quality
- Close other browser tabs
- Update GPU drivers

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙏 Credits

**SMILEY STUDIOS ツ**
- Phaser 3 - Game Engine
- HTML5 Canvas - Rendering
- Web Audio API - Sound

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

---

## ⭐ Show Your Support

If you enjoyed RELIC RUSH:
- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features
- 📢 Share with friends

---

**Made with ❤️ and Phaser 3**

Happy Gaming! 🎮✨