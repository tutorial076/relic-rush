/**
 * RELIC RUSH - Shop Scene
 * In-game shop for purchases
 */

class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ShopScene' });
    }

    create() {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background
        this.add.rectangle(centerX, centerY, width, height, 0x0a0a0a);

        // Title
        this.add.text(centerX, 50, '🛒 SHOP', {
            fontSize: '48px',
            fill: '#ffd700',
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5);

        // Display balance
        const coins = SaveSystem.getCoins();
        const gems = SaveSystem.getGems();
        this.add.text(centerX - 200, 100, `💰 Coins: ${coins}`, {
            fontSize: '20px',
            fill: '#ffd700',
        });
        this.add.text(centerX + 200, 100, `💎 Gems: ${gems}`, {
            fontSize: '20px',
            fill: '#00d4ff',
        }).setOrigin(1, 0);

        // Shop items
        let itemY = 180;
        const itemSpacing = 100;

        // Coin packs
        this.createShopItem(centerX - 200, itemY, '💰 Coins x100', 100, 'coins', () => {
            SaveSystem.addCoins(100);
            this.scene.restart();
        });

        this.createShopItem(centerX + 200, itemY, '💎 Gems x10', 500, 'coins', () => {
            if (coins >= 500) {
                SaveSystem.removeCoins(500);
                SaveSystem.addGems(10);
                this.scene.restart();
            }
        });

        itemY += itemSpacing;

        // Power-ups
        this.createShopItem(centerX - 200, itemY, '🛡 Shield', 50, 'coins', () => {
            if (coins >= 50) {
                SaveSystem.removeCoins(50);
                // Give power-up
                this.scene.restart();
            }
        });

        this.createShopItem(centerX + 200, itemY, '⚡ Speed Boost', 75, 'coins', () => {
            if (coins >= 75) {
                SaveSystem.removeCoins(75);
                this.scene.restart();
            }
        });

        itemY += itemSpacing * 1.5;

        // Back button
        this.createBackButton(centerX, height - 80);
    }

    createShopItem(x, y, text, price, currency, onBuy) {
        const item = this.add.text(x, y, `${text}\n${price} ${currency === 'gems' ? '💎' : '💰'}`, {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 15 },
            align: 'center',
        });
        item.setOrigin(0.5);
        item.setInteractive({ useHandCursor: true });
        item.on('pointerdown', onBuy);
        item.on('pointerover', () => item.setBackgroundColor('#555555'));
        item.on('pointerout', () => item.setBackgroundColor('#333333'));
        return item;
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