/**
 * RELIC RUSH - Pause Menu Scene
 * Pause menu overlay
 */

class PauseMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseMenuScene' });
    }

    create() {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Semi-transparent overlay
        this.add.rectangle(centerX, centerY, width, height, 0x000000, 0.7).setScrollFactor(0);

        // Title
        this.add.text(centerX, centerY - 150, 'PAUSED', {
            fontSize: '48px',
            fill: '#ffd700',
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5).setScrollFactor(0);

        // Buttons
        this.createButton(centerX, centerY, '▶ RESUME', () => {
            this.scene.get('GameScene').resumeGame();
        });

        this.createButton(centerX, centerY + 80, '🔄 RESTART', () => {
            this.scene.stop('GameScene');
            this.scene.start('GameScene');
        });

        this.createButton(centerX, centerY + 160, '⚙ SETTINGS', () => {
            this.scene.start('SettingsScene');
        });

        this.createButton(centerX, centerY + 240, '🏠 MAIN MENU', () => {
            this.scene.stop('GameScene');
            this.scene.start('MainMenuScene');
        });
    }

    createButton(x, y, text, callback) {
        const button = this.add.text(x, y, text, {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 40, y: 15 },
            fontStyle: 'bold',
        });
        button.setOrigin(0.5);
        button.setScrollFactor(0);
        button.setInteractive({ useHandCursor: true });
        button.on('pointerdown', callback);
        button.on('pointerover', () => button.setBackgroundColor('#555555'));
        button.on('pointerout', () => button.setBackgroundColor('#333333'));
        return button;
    }
}