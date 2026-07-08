/**
 * RELIC RUSH - Asset Manager
 * Handles loading and managing all game assets
 */

class AssetManager {
    constructor(scene) {
        this.scene = scene;
        this.loadedAssets = {};
    }

    /**
     * Load all game assets
     */
    loadAllAssets() {
        this.loadImages();
        this.loadSpritesheets();
        this.loadAudio();
        this.loadFonts();
    }

    /**
     * Load image assets
     */
    loadImages() {
        // Background images for each environment
        GameConfig.ENVIRONMENTS.forEach(env => {
            this.scene.load.image(`bg_${env.name}`, `assets/images/environments/${env.name}.png`);
        });

        // UI assets
        this.scene.load.image('btn_play', 'assets/images/ui/button_play.png');
        this.scene.load.image('btn_settings', 'assets/images/ui/button_settings.png');
        this.scene.load.image('btn_shop', 'assets/images/ui/button_shop.png');
        this.scene.load.image('btn_leaderboard', 'assets/images/ui/button_leaderboard.png');
        this.scene.load.image('btn_characters', 'assets/images/ui/button_characters.png');
        this.scene.load.image('btn_about', 'assets/images/ui/button_about.png');
        this.scene.load.image('btn_reward', 'assets/images/ui/button_reward.png');

        // Collectible assets
        this.scene.load.image('coin', 'assets/images/collectibles/coin.png');
        this.scene.load.image('gem', 'assets/images/collectibles/gem.png');
        this.scene.load.image('relic', 'assets/images/collectibles/relic.png');
        this.scene.load.image('key', 'assets/images/collectibles/key.png');
        this.scene.load.image('chest', 'assets/images/collectibles/chest.png');

        // Obstacle assets
        this.scene.load.image('rock', 'assets/images/obstacles/rock.png');
        this.scene.load.image('fire_trap', 'assets/images/obstacles/fire_trap.png');
        this.scene.load.image('bridge', 'assets/images/obstacles/bridge.png');
        this.scene.load.image('axe', 'assets/images/obstacles/axe.png');
        this.scene.load.image('pillar', 'assets/images/obstacles/pillar.png');
        this.scene.load.image('spike', 'assets/images/obstacles/spike.png');
        this.scene.load.image('dart', 'assets/images/obstacles/dart.png');
        this.scene.load.image('lava', 'assets/images/obstacles/lava.png');
        this.scene.load.image('wall', 'assets/images/obstacles/wall.png');

        // Power-up assets
        this.scene.load.image('powerup_magnet', 'assets/images/powerups/magnet.png');
        this.scene.load.image('powerup_double', 'assets/images/powerups/double_coins.png');
        this.scene.load.image('powerup_shield', 'assets/images/powerups/shield.png');
        this.scene.load.image('powerup_speed', 'assets/images/powerups/speed_boost.png');
        this.scene.load.image('powerup_slow', 'assets/images/powerups/slow_motion.png');
        this.scene.load.image('powerup_life', 'assets/images/powerups/extra_life.png');
        this.scene.load.image('powerup_radar', 'assets/images/powerups/radar.png');
        this.scene.load.image('powerup_boots', 'assets/images/powerups/flying_boots.png');

        // Logo and branding
        this.scene.load.image('logo', 'assets/images/ui/logo.png');
        this.scene.load.image('studio_logo', 'assets/images/ui/smiley_studios.png');
    }

    /**
     * Load spritesheet assets
     */
    loadSpritesheets() {
        // Player spritesheets for each character
        GameConfig.CHARACTERS.forEach(char => {
            this.scene.load.spritesheet(
                `player_${char.id}`,
                `assets/spritesheets/characters/${char.id}.png`,
                { frameWidth: 40, frameHeight: 60 }
            );
        });

        // Enemy spritesheets
        this.scene.load.spritesheet('enemy_golem', 'assets/spritesheets/enemies/golem.png', { frameWidth: 60, frameHeight: 60 });
        this.scene.load.spritesheet('enemy_guardian', 'assets/spritesheets/enemies/guardian.png', { frameWidth: 60, frameHeight: 80 });
        this.scene.load.spritesheet('enemy_ghost', 'assets/spritesheets/enemies/ghost.png', { frameWidth: 50, frameHeight: 60 });
        this.scene.load.spritesheet('enemy_fire', 'assets/spritesheets/enemies/fire_beast.png', { frameWidth: 70, frameHeight: 70 });
        this.scene.load.spritesheet('enemy_snake', 'assets/spritesheets/enemies/snake.png', { frameWidth: 80, frameHeight: 40 });
        this.scene.load.spritesheet('enemy_shadow', 'assets/spritesheets/enemies/shadow.png', { frameWidth: 50, frameHeight: 50 });

        // Boss spritesheets
        this.scene.load.spritesheet('boss_golem', 'assets/spritesheets/bosses/stone_golem.png', { frameWidth: 120, frameHeight: 120 });
        this.scene.load.spritesheet('boss_dragon', 'assets/spritesheets/bosses/fire_dragon.png', { frameWidth: 150, frameHeight: 120 });
        this.scene.load.spritesheet('boss_king', 'assets/spritesheets/bosses/temple_king.png', { frameWidth: 100, frameHeight: 140 });
        this.scene.load.spritesheet('boss_crystal', 'assets/spritesheets/bosses/crystal_guardian.png', { frameWidth: 110, frameHeight: 110 });

        // Particle spritesheets
        this.scene.load.spritesheet('particles', 'assets/spritesheets/particles.png', { frameWidth: 8, frameHeight: 8 });
    }

    /**
     * Load audio assets
     */
    loadAudio() {
        // Background music for each environment
        GameConfig.ENVIRONMENTS.forEach(env => {
            this.scene.load.audio(`music_${env.name}`, `assets/audio/music/${env.name}.mp3`);
        });

        // Special music
        this.scene.load.audio('menu_music', 'assets/audio/music/menu.mp3');
        this.scene.load.audio('boss_music', 'assets/audio/music/boss.mp3');
        this.scene.load.audio('victory_music', 'assets/audio/music/victory.mp3');
        this.scene.load.audio('gameover_music', 'assets/audio/music/gameover.mp3');

        // Sound effects
        this.scene.load.audio('footstep_1', 'assets/audio/sfx/footstep_1.mp3');
        this.scene.load.audio('footstep_2', 'assets/audio/sfx/footstep_2.mp3');
        this.scene.load.audio('footstep_3', 'assets/audio/sfx/footstep_3.mp3');
        this.scene.load.audio('jump', 'assets/audio/sfx/jump.mp3');
        this.scene.load.audio('slide', 'assets/audio/sfx/slide.mp3');
        this.scene.load.audio('coin', 'assets/audio/sfx/coin.mp3');
        this.scene.load.audio('gem', 'assets/audio/sfx/gem.mp3');
        this.scene.load.audio('explosion', 'assets/audio/sfx/explosion.mp3');
        this.scene.load.audio('damage', 'assets/audio/sfx/damage.mp3');
        this.scene.load.audio('powerup', 'assets/audio/sfx/powerup.mp3');
        this.scene.load.audio('hit', 'assets/audio/sfx/hit.mp3');
        this.scene.load.audio('collect', 'assets/audio/sfx/collect.mp3');
    }

    /**
     * Load custom fonts
     */
    loadFonts() {
        // Load web fonts if using custom fonts
        // This can be done via CSS @import or dynamically
    }

    /**
     * Cache asset
     */
    cacheAsset(key, asset) {
        this.loadedAssets[key] = asset;
    }

    /**
     * Get cached asset
     */
    getAsset(key) {
        return this.loadedAssets[key] || null;
    }

    /**
     * Check if asset is loaded
     */
    isAssetLoaded(key) {
        return key in this.loadedAssets;
    }

    /**
     * Preload critical assets
     */
    preloadCriticalAssets() {
        // Load only essential assets for faster initial load
        const criticalAssets = [
            'logo',
            'btn_play',
            'player_explorer',
            'coin',
            'gem',
        ];

        return Promise.all(
            criticalAssets.map(asset => {
                return new Promise((resolve) => {
                    if (this.scene.textures.exists(asset)) {
                        resolve(true);
                    } else {
                        setTimeout(() => resolve(false), 5000);
                    }
                });
            })
        );
    }
}
