/**
 * RELIC RUSH - Main Menu Scene
 * Main menu with navigation buttons
 */

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background
        this.add.rectangle(centerX, centerY, width, height, 0x0a0a0a);

        // Logo
        this.add.text(centerX, centerY - 200, GameConfig.GAME_TITLE, {
            fontSize: '64px',
            fill: '#ffd700',
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5);

        // Studio name
        this.add.text(centerX, centerY - 120, GameConfig.STUDIO_NAME, {
            fontSize: '18px',
            fill: '#aaaaaa',
            align: 'center',
        }).setOrigin(0.5);

        // Buttons
        this.createButton(centerX, centerY, '▶ PLAY', () => {
            this.scene.start('GameScene');
        });

        this.createButton(centerX, centerY + 80, '👤 CHARACTERS', () => {
            this.scene.start('CharacterSelectScene');
        });

        this.createButton(centerX, centerY + 160, '🛒 SHOP', () => {
            this.scene.start('ShopScene');
        });

        this.createButton(centerX, centerY + 240, '🏆 LEADERBOARD', () => {
            this.scene.start('LeaderboardScene');
        });

        this.createButton(centerX, centerY + 320, '⚙ SETTINGS', () => {
            this.scene.start('SettingsScene');
        });

        this.createButton(centerX, centerY + 400, '❓ ABOUT', () => {
            this.showAbout();
        });

        // Play ambient music
        this.sound.add('menu_music').play({ loop: true, volume: 0.7 });
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
        button.setInteractive({ useHandCursor: true });
        button.on('pointerdown', callback);
        button.on('pointerover', () => {
            button.setBackgroundColor('#555555');
        });
        button.on('pointerout', () => {
            button.setBackgroundColor('#333333');
        });
        return button;
    }

    showAbout() {
        const aboutText = this.add.text(
            this.sys.game.canvas.width / 2,
            this.sys.game.canvas.height / 2,
            `RELIC RUSH\nAn Endless Runner Game\n\nDeveloped by ${GameConfig.STUDIO_NAME}\n\nCreated with Phaser 3\nHTML5 & JavaScript`,
            {
                fontSize: '20px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#1a1a1a',
                padding: { x: 30, y: 30 },
            }
        );
        aboutText.setOrigin(0.5);
        aboutText.setDepth(100);

        this.time.delayedCall(4000, () => {
            aboutText.destroy();
        });
    }
}