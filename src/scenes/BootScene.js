/**
 * RELIC RUSH - Boot Scene
 * Initial scene for game setup and configuration
 */

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load minimum assets needed
        this.load.image('logo', 'assets/images/ui/logo.png');
    }

    create() {
        // Setup physics
        this.physics.world.setFPS(GameConfig.TARGET_FPS);
        this.physics.world.gravity.y = GameConfig.WORLD.GRAVITY;

        // Disable browser context menu
        this.input.keyboard.on('keydown-DELETE', event => {
            event.preventDefault();
        });

        // Prevent zoom
        this.input.keyboard.enabled = true;
        document.addEventListener('wheel', e => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        }, { passive: false });

        // Go to loading scene
        this.scene.start('LoadingScene');
    }
}