/**
 * RELIC RUSH - Main Game Initialization
 * Entry point and game configuration
 */

const phaser_config = {
    type: Phaser.AUTO,
    canvas: document.getElementById('game-container'),
    width: GameConfig.GAME_WIDTH,
    height: GameConfig.GAME_HEIGHT,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GameConfig.GAME_WIDTH,
        height: GameConfig.GAME_HEIGHT,
    },
    render: {
        pixelArt: false,
        antialias: true,
        fps: GameConfig.TARGET_FPS,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GameConfig.WORLD.GRAVITY },
            debug: GameConfig.PHYSICS.DEBUG,
            fps: GameConfig.TARGET_FPS,
        },
    },
    scene: [
        BootScene,
        LoadingScene,
        MainMenuScene,
        GameScene,
        PauseMenuScene,
        GameOverScene,
        SettingsScene,
        ShopScene,
        CharacterSelectScene,
        LeaderboardScene,
    ],
};

// Create game instance
const game = new Phaser.Game(phaser_config);

// Handle window resize
window.addEventListener('resize', () => {
    game.scale.resize(
        Math.max(GameConfig.GAME_WIDTH, window.innerWidth),
        Math.max(GameConfig.GAME_HEIGHT, window.innerHeight)
    );
});

// Prevent zoom on mobile
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Prevent context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
