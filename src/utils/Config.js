/**
 * RELIC RUSH - Game Configuration
 * Central configuration for all game settings
 */

const GameConfig = {
    // Game Window Configuration
    GAME_WIDTH: 1080,
    GAME_HEIGHT: 1920,
    ASPECT_RATIO: 9 / 16,
    TARGET_FPS: 60,

    // Player Configuration
    PLAYER: {
        SPEED: 200,
        MAX_SPEED: 300,
        ACCELERATION: 5,
        JUMP_VELOCITY: -500,
        GRAVITY: 1000,
        WIDTH: 40,
        HEIGHT: 60,
        LANE_WIDTH: 100,
        LANE_COUNT: 3,
        SLIDE_DURATION: 0.5,
        SLIDE_HEIGHT_REDUCTION: 0.5,
    },

    // World Configuration
    WORLD: {
        GRAVITY: 1000,
        SCROLL_SPEED: 200,
        SPAWN_DISTANCE: 2000,
        DESPAWN_DISTANCE: 500,
        LANE_WIDTH: 100,
        LANE_COUNT: 3,
    },

    // Obstacle Configuration
    OBSTACLES: {
        ROCK: { width: 80, height: 60, speed: 150 },
        FIRE_TRAP: { width: 100, height: 40, speed: 0 },
        BRIDGE: { width: 300, height: 30, speed: 0 },
        AXE: { width: 60, height: 60, speed: 200 },
        PILLAR: { width: 80, height: 200, speed: 0 },
        SPIKE: { width: 40, height: 40, speed: 0 },
        DART: { width: 20, height: 20, speed: 300 },
        LAVA: { width: 200, height: 60, speed: 0 },
        WALL: { width: 400, height: 150, speed: 150 },
    },

    // Collectible Configuration
    COLLECTIBLES: {
        COIN: { value: 10, size: 20 },
        GEM: { value: 50, size: 25 },
        RELIC: { value: 100, size: 30 },
        KEY: { value: 25, size: 20 },
        CHEST: { value: 200, size: 40 },
    },

    // Power-Up Configuration
    POWERUPS: {
        MAGNET: { duration: 10, color: 0xff6b6b },
        DOUBLE_COINS: { duration: 15, color: 0xffd700 },
        SHIELD: { duration: 20, color: 0x00d4ff },
        SPEED_BOOST: { duration: 8, color: 0xff00ff },
        SLOW_MOTION: { duration: 5, color: 0x00ff00 },
        EXTRA_LIFE: { duration: 0, color: 0xff0000 },
        RADAR: { duration: 15, color: 0xffaa00 },
        FLYING_BOOTS: { duration: 12, color: 0x00ffaa },
    },

    // Environment Configuration
    ENVIRONMENTS: [
        { name: 'temple_jungle', color: 0x2d5016, music: 'temple_jungle' },
        { name: 'lost_city', color: 0x8b7355, music: 'lost_city' },
        { name: 'ice_temple', color: 0xb4d7ff, music: 'ice_temple' },
        { name: 'volcano', color: 0xff4500, music: 'volcano' },
        { name: 'desert_ruins', color: 0xd4a574, music: 'desert_ruins' },
        { name: 'sky_temple', color: 0x87ceeb, music: 'sky_temple' },
        { name: 'crystal_caverns', color: 0x9370db, music: 'crystal_caverns' },
        { name: 'dark_forest', color: 0x1a1a2e, music: 'dark_forest' },
    ],

    // Character Configuration
    CHARACTERS: [
        { id: 'explorer', name: 'Explorer', unlocked: true, cost: 0 },
        { id: 'treasure_hunter', name: 'Treasure Hunter', unlocked: false, cost: 1000 },
        { id: 'archaeologist', name: 'Archaeologist', unlocked: false, cost: 1500 },
        { id: 'guardian', name: 'Temple Guardian', unlocked: false, cost: 2000 },
        { id: 'ninja', name: 'Ninja Explorer', unlocked: false, cost: 2500 },
    ],

    // Enemy Configuration
    ENEMIES: {
        GOLEM: { health: 3, speed: 100, damage: 1 },
        GUARDIAN: { health: 2, speed: 150, damage: 1 },
        GHOST: { health: 1, speed: 200, damage: 1 },
        FIRE_BEAST: { health: 4, speed: 120, damage: 2 },
        SNAKE: { health: 2, speed: 180, damage: 1 },
        SHADOW: { health: 3, speed: 160, damage: 1 },
    },

    // Boss Configuration
    BOSSES: [
        { name: 'Giant Stone Golem', health: 10, speed: 80, pattern: 'chase' },
        { name: 'Fire Dragon', health: 15, speed: 120, pattern: 'ranged' },
        { name: 'Temple King', health: 12, speed: 100, pattern: 'multi' },
        { name: 'Crystal Guardian', health: 8, speed: 140, pattern: 'chase' },
    ],

    // UI Configuration
    UI: {
        FONT_FAMILY: 'Arial',
        FONT_SIZE: 24,
        SMALL_FONT_SIZE: 16,
        COLOR_PRIMARY: '#ffd700',
        COLOR_SECONDARY: '#ffffff',
        COLOR_DANGER: '#ff4444',
        COLOR_SUCCESS: '#00ff44',
        PADDING: 16,
        BORDER_RADIUS: 8,
    },

    // Audio Configuration
    AUDIO: {
        MASTER_VOLUME: 1.0,
        MUSIC_VOLUME: 0.7,
        EFFECTS_VOLUME: 0.8,
    },

    // Difficulty Configuration
    DIFFICULTY: {
        EASY: { multiplier: 0.8, enemyCount: 2 },
        NORMAL: { multiplier: 1.0, enemyCount: 3 },
        HARD: { multiplier: 1.3, enemyCount: 5 },
    },

    // Distance Milestones
    MILESTONES: [1000, 2500, 5000, 10000, 25000, 50000],

    // Daily Mission Targets
    DAILY_MISSIONS: [
        { id: 'coins', name: 'Collect 500 Coins', target: 500, reward: 100 },
        { id: 'distance', name: 'Run 3000 meters', target: 3000, reward: 150 },
        { id: 'chest', name: 'Open Treasure Chest', target: 1, reward: 200 },
        { id: 'jumps', name: 'Jump 100 times', target: 100, reward: 50 },
        { id: 'slides', name: 'Slide 50 times', target: 50, reward: 50 },
        { id: 'boss', name: 'Beat Boss', target: 1, reward: 300 },
    ],

    // Achievements
    ACHIEVEMENT_COUNT: 100,

    // Scoring
    SCORE: {
        COIN: 10,
        GEM: 50,
        RELIC: 100,
        DISTANCE_PER_METER: 1,
        OBSTACLE_DODGE: 25,
        ENEMY_DEFEAT: 100,
    },

    // Animation Timings (in milliseconds)
    ANIMATIONS: {
        IDLE: 600,
        RUN: 400,
        JUMP: 500,
        SLIDE: 500,
        TURN: 300,
        COLLECT: 300,
        CELEBRATE: 800,
        HIT: 300,
        FALL: 600,
    },

    // Physics
    PHYSICS: {
        DEBUG: false,
        DEFAULT_FRICTION: 0.1,
        BOUNCE: 0.2,
    },

    // Storage Keys
    STORAGE: {
        COINS: 'relic_rush_coins',
        GEMS: 'relic_rush_gems',
        HIGH_SCORE: 'relic_rush_high_score',
        SETTINGS: 'relic_rush_settings',
        ACHIEVEMENTS: 'relic_rush_achievements',
        CHARACTERS: 'relic_rush_characters',
        DAILY_REWARDS: 'relic_rush_daily_rewards',
        MISSIONS: 'relic_rush_missions',
        PLAYER_DATA: 'relic_rush_player_data',
    },

    // Branding
    STUDIO_NAME: 'SMILEY STUDIOS ツ',
    GAME_TITLE: 'RELIC RUSH',
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameConfig;
}
