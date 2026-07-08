/**
 * RELIC RUSH - PowerUp Class
 * Special items that grant temporary abilities or bonuses
 */

class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, `powerup_${type.toLowerCase()}`);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.powerUpType = type;
        this.scene = scene;
        this.config = GameConfig.POWERUPS[type] || GameConfig.POWERUPS.MAGNET;
        this.isCollected = false;
        this.duration = this.config.duration;

        // Physics
        this.body.setVelocityY(-200);
        this.body.setBounce(0.3);
        this.body.setCollideWorldBounds(true);

        // Visual
        this.setTint(this.config.color);
        this.startAnimation();
    }

    /**
     * Start power-up animation
     */
    startAnimation() {
        // Spinning animation
        this.scene.tweens.add({
            targets: this,
            rotation: Math.PI * 2,
            duration: 1000,
            repeat: -1,
        });

        // Floating animation
        this.scene.tweens.add({
            targets: this,
            y: this.y - 30,
            duration: 800,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
        });
    }

    /**
     * Update power-up each frame
     */
    update() {
        // Pulsing glow
        const scale = 1 + Math.sin(Date.now() / 200) * 0.1;
        this.setScale(scale);

        // Check if out of bounds
        if (this.y > this.scene.sys.game.canvas.height + 200) {
            this.destroy();
        }
    }

    /**
     * Collect power-up
     */
    collect(player) {
        if (this.isCollected) return;
        this.isCollected = true;

        // Apply power-up effect
        player.activatePowerUp(this.powerUpType, this.duration * 1000);

        // Visual effect
        this.scene.particleManager.createPowerUpEffect(this.x, this.y, this.config.color);
        this.scene.audioManager.playSFX('powerup');

        // Destroy
        this.destroy();
    }
}

/**
 * Coin Magnet Power-Up
 */
class MagnetPowerUp extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'MAGNET');
    }
}

/**
 * Double Coins Power-Up
 */
class DoubleCoinsPowerUp extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'DOUBLE_COINS');
    }
}

/**
 * Shield Power-Up
 */
class ShieldPowerUp extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'SHIELD');
    }

    collect(player) {
        if (this.isCollected) return;
        this.isCollected = true;

        // Apply shield
        player.hasShield = true;

        // Create shield visual
        const shield = this.scene.add.circle(player.x, player.y, 60, 0x00d4ff);
        shield.setAlpha(0.3);
        this.scene.physics.add.existing(shield);
        shield.body.setVelocityY(-200);

        // Follow player
        this.scene.tweens.add({
            targets: shield,
            alpha: 0,
            duration: 5000,
            onComplete: () => {
                shield.destroy();
            },
        });

        // Destroy power-up
        this.destroy();
    }
}

/**
 * Speed Boost Power-Up
 */
class SpeedBoostPowerUp extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'SPEED_BOOST');
    }
}

/**
 * Slow Motion Power-Up
 */
class SlowMotionPowerUp extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'SLOW_MOTION');
    }
}

/**
 * Extra Life Power-Up
 */
class ExtraLifePowerUp extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'EXTRA_LIFE');
    }

    collect(player) {
        if (this.isCollected) return;
        this.isCollected = true;

        // Add life
        player.addLife();

        // Visual effect
        this.scene.particleManager.createCollectionEffect(this.x, this.y, 0xff0000);

        // Destroy
        this.destroy();
    }
}

/**
 * Flying Boots Power-Up
 */
class FlyingBootsPowerUp extends PowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'FLYING_BOOTS');
    }
}