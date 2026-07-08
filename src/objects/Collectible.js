/**
 * RELIC RUSH - Collectible Class
 * Objects that player can collect for coins, gems, or bonuses
 */

class Collectible extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.collectibleType = type;
        this.scene = scene;
        this.config = GameConfig.COLLECTIBLES[type] || GameConfig.COLLECTIBLES.COIN;
        this.isCollected = false;
        this.value = this.config.value;
        this.floatDistance = 0;
        this.floatSpeed = 2;
        this.rotationSpeed = 0.05;

        // Physics
        this.body.setVelocityY(-150);
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        // Animation
        this.createAnimation();
        this.startFloatAnimation();
    }

    /**
     * Create collectible animation
     */
    createAnimation() {
        if (this.scene.anims.exists(`collect_${this.collectibleType}`)) {
            this.play(`collect_${this.collectibleType}`);
        }
    }

    /**
     * Start float animation
     */
    startFloatAnimation() {
        this.floatTween = this.scene.tweens.add({
            targets: this,
            y: this.y - 50,
            duration: 1000,
            ease: 'Quad.easeInOut',
            repeat: -1,
            yoyo: true,
        });
    }

    /**
     * Update collectible each frame
     */
    update() {
        // Rotate
        this.rotation += this.rotationSpeed;

        // Check if out of bounds
        if (this.y > this.scene.sys.game.canvas.height + 200) {
            this.destroy();
        }

        // Pulse scale
        const scale = 1 + Math.sin(Date.now() / 300) * 0.05;
        this.setScale(scale);
    }

    /**
     * Handle collection
     */
    collect(player) {
        if (this.isCollected) return;
        this.isCollected = true;

        // Award player
        switch (this.collectibleType) {
            case 'COIN':
                player.collectCoin(this.value);
                break;
            case 'GEM':
                player.collectGem(this.value);
                break;
            case 'RELIC':
                player.collectCoin(this.value);
                break;
            case 'KEY':
                player.collectCoin(this.value);
                break;
            case 'CHEST':
                player.collectCoin(this.value);
                break;
        }

        // Create collection effect
        this.scene.particleManager.createCollection(this.x, this.y);

        // Destroy
        this.destroy();
    }
}

/**
 * Coin Collectible
 */
class Coin extends Collectible {
    constructor(scene, x, y) {
        super(scene, x, y, 'COIN');
        this.value = 10;
    }
}

/**
 * Gem Collectible
 */
class Gem extends Collectible {
    constructor(scene, x, y) {
        super(scene, x, y, 'GEM');
        this.value = 50;
        this.setTint(0x00d4ff);
    }
}

/**
 * Ancient Relic Collectible
 */
class Relic extends Collectible {
    constructor(scene, x, y) {
        super(scene, x, y, 'RELIC');
        this.value = 100;
        this.setTint(0xffd700);
        this.glowEffect();
    }

    glowEffect() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0.6,
            duration: 500,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
        });
    }
}

/**
 * Treasure Key Collectible
 */
class TreasureKey extends Collectible {
    constructor(scene, x, y) {
        super(scene, x, y, 'KEY');
        this.value = 25;
    }
}

/**
 * Mystery Chest Collectible
 */
class MysteryChest extends Collectible {
    constructor(scene, x, y) {
        super(scene, x, y, 'CHEST');
        this.value = 200;
        this.isOpen = false;
    }

    collect(player) {
        if (!this.isOpen) {
            this.isOpen = true;
            this.play('chest_open');
            // Spawn coins around chest
            for (let i = 0; i < 10; i++) {
                const angle = (Math.PI * 2 / 10) * i;
                const coin = new Coin(this.scene, this.x, this.y);
                coin.body.setVelocity(
                    Math.cos(angle) * 200,
                    Math.sin(angle) * 200
                );
            }
        }
        super.collect(player);
    }
}