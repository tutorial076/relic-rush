/**
 * RELIC RUSH - Obstacle Class
 * Base obstacle that damages the player on collision
 */

class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        const config = GameConfig.OBSTACLES[type] || GameConfig.OBSTACLES.ROCK;
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.obstacleType = type;
        this.scene = scene;
        this.config = config;
        this.damage = 1;
        this.speed = config.speed;
        this.hasHitPlayer = false;

        // Physics setup
        this.body.setVelocityY(-200);
        this.body.setImmovable(true);
        this.body.setCollideWorldBounds(true);

        // Create animation if exists
        this.createAnimation();
    }

    /**
     * Create obstacle animation
     */
    createAnimation() {
        // Different animations for different obstacle types
        switch (this.obstacleType) {
            case 'AXE':
                this.play('axe_spin');
                break;
            case 'ROCK':
                this.play('rock_roll');
                break;
            case 'FIRE_TRAP':
                this.play('fire_loop');
                break;
        }
    }

    /**
     * Update obstacle
     */
    update() {
        // Check if obstacle is out of bounds
        if (this.y > this.scene.sys.game.canvas.height + 100) {
            this.destroy();
        }
    }

    /**
     * Handle collision with player
     */
    onCollidePlayer(player) {
        if (!this.hasHitPlayer) {
            this.hasHitPlayer = true;
            player.takeDamage(this.damage);
            this.scene.audioManager.playExplosion();

            // Create impact effect
            this.scene.particleManager.createImpact(this.x, this.y);
        }
    }

    /**
     * Static obstacle that doesn't move
     */
    static create(scene, x, y, type) {
        return new Obstacle(scene, x, y, type);
    }
}

/**
 * Rolling Rock Obstacle
 */
class RockObstacle extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, 'ROCK');
        this.rotationSpeed = 0.1;
    }

    update() {
        super.update();
        this.rotation += this.rotationSpeed;
    }
}

/**
 * Fire Trap Obstacle
 */
class FireTrapObstacle extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, 'FIRE_TRAP');
        this.damage = 1;
        this.isActive = true;
    }

    update() {
        super.update();
        // Pulsing effect
        const scale = 1 + Math.sin(Date.now() / 300) * 0.1;
        this.setScale(scale);
    }
}

/**
 * Swinging Axe Obstacle
 */
class AxeObstacle extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, 'AXE');
        this.damage = 2;
        this.swingAmount = 30;
        this.swingSpeed = 5;
    }

    update() {
        super.update();
        // Swing effect
        this.rotation = Math.sin(Date.now() / 500) * 0.5;
    }
}

/**
 * Spike Obstacle
 */
class SpikeObstacle extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, 'SPIKE');
        this.damage = 2;
    }
}

/**
 * Lava Pool Obstacle
 */
classLavaObstacle extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, 'LAVA');
        this.damage = 2;
    }

    update() {
        super.update();
        // Wave animation
        const wave = Math.sin(Date.now() / 400) * 5;
        this.y += wave * 0.01;
    }
}

/**
 * Poison Dart Obstacle
 */
class DartObstacle extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, 'DART');
        this.damage = 1;
        this.speed = 300;
    }
}

/**
 * Pillar Obstacle
 */
class PillarObstacle extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, 'PILLAR');
        this.damage = 2;
        this.isStatic = true;
    }
}

/**
 * Bridge Obstacle
 */
class BridgeObstacle extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, 'BRIDGE');
        this.damage = 3;
        this.isCollapsing = false;
    }

    onCollidePlayer(player) {
        if (!this.isCollapsing) {
            this.isCollapsing = true;
            this.setTint(0xff0000);
            this.scene.time.delayedCall(500, () => {
                this.destroy();
            });
        }
        super.onCollidePlayer(player);
    }
}