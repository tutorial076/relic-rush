/**
 * RELIC RUSH - Game Over Scene
 * Game over screen with stats
 */

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.gameData = data || {};
    }

    create() {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background
        this.add.rectangle(centerX, centerY, width, height, 0x0a0a0a);

        // Title
        this.add.text(centerX, centerY - 250, 'GAME OVER', {
            fontSize: '56px',
            fill: '#ff4444',
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5);

        // Stats
        const statsY = centerY - 150;
        const lineHeight = 50;

        this.add.text(centerX, statsY, `Distance: ${Math.floor(this.gameData.distance || 0)}m`, {
            fontSize: '24px',
            fill: '#ffd700',
            align: 'center',
        }).setOrigin(0.5);

        this.add.text(centerX, statsY + lineHeight, `Score: ${this.gameData.score || 0}`, {
            fontSize: '24px',
            fill: '#00ff44',
            align: 'center',
        }).setOrigin(0.5);

        this.add.text(centerX, statsY + lineHeight * 2, `Coins: ${this.gameData.coins || 0}`, {
            fontSize: '24px',
            fill: '#ffd700',
            align: 'center',
        }).setOrigin(0.5);

        this.add.text(centerX, statsY + lineHeight * 3, `Gems: ${this.gameData.gems || 0}`, {
            fontSize: '24px',
            fill: '#00d4ff',
            align: 'center',
        }).setOrigin(0.5);

        // High score
        const highScore = SaveSystem.getHighScore();
        this.add.text(centerX, statsY + lineHeight * 5, `Best Score: ${highScore}`, {
            fontSize: '28px',
            fill: '#ff00ff',
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5);

        // Buttons
        this.createButton(centerX, centerY + 200, '🔄 PLAY AGAIN', () => {
            this.scene.start('GameScene');
        });

        this.createButton(centerX, centerY + 280, '🏠 MAIN MENU', () => {
            this.scene.start('MainMenuScene');
        });

        // Play game over music
        this.sound.add('gameover_music').play({ volume: 0.7 });
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
        button.on('pointerover', () => button.setBackgroundColor('#555555'));
        button.on('pointerout', () => button.setBackgroundColor('#333333'));
        return button;
    }
}