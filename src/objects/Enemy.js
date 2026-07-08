/**
 * RELIC RUSH - Enemy Class
 * AI-controlled enemies that chase and attack the player
 */

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, `enemy_${type.toLowerCase()}`);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.enemyType = type;
        this.scene = scene;
        this.config = GameConfig.ENEMIES[type] || GameConfig.ENEMIES.GOLEM;
        this.health = this.config.health;
        this.maxHealth = this.config.health;
        this.speed = this.config.speed;
        this.damage = this.config.damage;
        this.detectionRange = 300;
        this.lastAttackTime = 0;
        this.attackCooldown = 1000;
        this.hasAttacked = false;

        // Physics
        this.body.setVelocityY(-100);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.2);

        // AI
        this.targetPlayer = null;
        this.state = 'patrol'; // patrol, chase, attack

        // Create health bar
        this.createHealthBar();
    }

    /**
     * Create health bar
     */
    createHealthBar() {
        this.healthBar = this.scene.add.graphics();
        this.drawHealthBar();
    }

    /**
     * Draw health bar
     */
    drawHealthBar() {
        this.healthBar.clear();
        this.healthBar.fillStyle(0x00ff00, 1);
        this.healthBar.fillRect(this.x - 30, this.y - 40, (this.health / this.maxHealth) * 60, 5);
        this.healthBar.lineStyle(1, 0xffffff, 1);
        this.healthBar.strokeRect(this.x - 30, this.y - 40, 60, 5);
    }

    /**
     * Update enemy each frame
     */
    update(player) {
        this.targetPlayer = player;

        // Check distance to player
        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        if (distance < this.detectionRange) {
            this.state = 'chase';
            this.chasePlayer(player);
        } else {
            this.state = 'patrol';
            this.patrol();
        }

        // Update health bar
        this.drawHealthBar();

        // Check if out of bounds
        if (this.y > this.scene.sys.game.canvas.height + 200) {
            this.destroy();
            this.healthBar.destroy();
        }
    }

    /**
     * Patrol behavior
     */
    patrol() {
        // Wander left and right
        this.body.setVelocityX(this.speed * Math.cos(Date.now() / 1000));
    }

    /**
     * Chase player
     */
    chasePlayer(player) {
        const direction = Phaser.Math.Between(-1, 1);
        this.body.setVelocityX(direction * this.speed);

        // Face player
        if (player.x < this.x) {
            this.setFlipX(true);
        } else {
            this.setFlipX(false);
        }
    }

    /**
     * Take damage
     */
    takeDamage(amount) {
        this.health -= amount;
        this.scene.audioManager.playHit();

        // Knockback
        this.body.setVelocityX(Phaser.Math.Between(-200, 200));

        if (this.health <= 0) {
            this.die();
        }
    }

    /**
     * Die
     */
    die() {
        this.targetPlayer.enemiesDefeated++;
        this.scene.particleManager.createExplosion(this.x, this.y);
        this.scene.audioManager.playExplosion();
        this.destroy();
        this.healthBar.destroy();
    }

    /**
     * Handle collision with player
     */
    onCollidePlayer(player) {
        if (!this.hasAttacked) {
            this.hasAttacked = true;
            player.takeDamage(this.damage);
            this.lastAttackTime = Date.now();

            // Reset attack after cooldown
            this.scene.time.delayedCall(this.attackCooldown, () => {
                this.hasAttacked = false;
            });
        }
    }
}

/**
 * Stone Golem Enemy
 */
class StoneGolem extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'GOLEM');
        this.speed = 80;
    }

    chasePlayer(player) {
        super.chasePlayer(player);
        // Slower but tankier
        this.body.setVelocityX(this.body.velocity.x * 0.7);
    }
}

/**
 * Temple Guardian Enemy
 */
class TempleGuardian extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'GUARDIAN');
        this.speed = 150;
    }
}

/**
 * Ghost Spirit Enemy
 */
class GhostSpirit extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'GHOST');
        this.speed = 200;
        this.setAlpha(0.7);
    }

    update(player) {
        super.update(player);
        // Phasing effect
        this.setAlpha(0.5 + Math.sin(Date.now() / 500) * 0.2);
    }
}

/**
 * Fire Beast Enemy
 */
class FireBeast extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'FIRE');
        this.speed = 120;
        this.damage = 2;
        this.setTint(0xff4500);
    }
}

/**
 * Ancient Snake Enemy
 */
class AncientSnake extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'SNAKE');
        this.speed = 180;
    }

    chasePlayer(player) {
        super.chasePlayer(player);
        // Weaving motion
        this.y += Math.sin(Date.now() / 300) * 2;
    }
}

/**
 * Shadow Monster Enemy
 */
class ShadowMonster extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'SHADOW');
        this.speed = 160;
        this.setTint(0x1a1a2e);
    }
}