/**
 * RELIC RUSH - Leaderboard Scene
 * Display high scores and achievements
 */

class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LeaderboardScene' });
    }

    create() {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background
        this.add.rectangle(centerX, centerY, width, height, 0x0a0a0a);

        // Title
        this.add.text(centerX, 50, '🏆 LEADERBOARD', {
            fontSize: '48px',
            fill: '#ffd700',
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5);

        // Stats
        const highScore = SaveSystem.getHighScore();
        const totalDistance = SaveSystem.getTotalDistance();
        const coins = SaveSystem.getCoins();

        let statsY = 130;
        const statSpacing = 50;

        this.add.text(centerX, statsY, `High Score: ${highScore}`, {
            fontSize: '24px',
            fill: '#ffd700',
            align: 'center',
        }).setOrigin(0.5);

        this.add.text(centerX, statsY + statSpacing, `Total Distance: ${Math.floor(totalDistance)}m`, {
            fontSize: '24px',
            fill: '#00ff44',
            align: 'center',
        }).setOrigin(0.5);

        this.add.text(centerX, statsY + statSpacing * 2, `Total Coins: ${coins}`, {
            fontSize: '24px',
            fill: '#ffd700',
            align: 'center',
        }).setOrigin(0.5);

        // Achievements
        const achievements = SaveSystem.getAchievements();
        const unlockedCount = achievements.filter(a => a.unlocked).length;

        this.add.text(centerX, statsY + statSpacing * 4, `Achievements: ${unlockedCount}/${achievements.length}`, {
            fontSize: '24px',
            fill: '#ff00ff',
            align: 'center',
        }).setOrigin(0.5);

        // Progress bar
        const progressPercent = (unlockedCount / achievements.length) * 100;
        const barWidth = 200;
        const barHeight = 20;
        const barX = centerX - barWidth / 2;
        const barY = statsY + statSpacing * 5;

        this.add.rectangle(barX + barWidth / 2, barY, barWidth, barHeight, 0x333333);
        this.add.rectangle(
            barX + (progressPercent / 100) * barWidth / 2,
            barY,
            (progressPercent / 100) * barWidth,
            barHeight,
            0x00ff44
        );

        // Back button
        this.createBackButton(centerX, height - 80);
    }

    createBackButton(x, y) {
        const button = this.add.text(x, y, '← BACK', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 30, y: 12 },
            fontStyle: 'bold',
        });
        button.setOrigin(0.5);
        button.setInteractive({ useHandCursor: true });
        button.on('pointerdown', () => this.scene.start('MainMenuScene'));
        button.on('pointerover', () => button.setBackgroundColor('#555555'));
        button.on('pointerout', () => button.setBackgroundColor('#333333'));
        return button;
    }
}