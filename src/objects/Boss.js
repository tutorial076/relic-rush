/**
 * RELIC RUSH - Boss Class
 * Major enemies that appear at milestones and require strategy to defeat
 */

class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, `boss_${type.toLowerCase()}`);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.bossType = type;
        this.scene = scene;
        this.config = GameConfig.BOSSES.find(b => b.name.toLowerCase().includes(type.toLowerCase()));
        this.health = this.config.health;
        this.maxHealth = this.config.health;
        this.speed = this.config.speed;
        this.pattern = this.config.pattern;
        this.attackCooldown = 1500;
        this.lastAttackTime = 0;
        this.phaseTransitions = [this.maxHealth * 0.66, this.maxHealth * 0.33];
        this.currentPhase = 1;

        // Physics
        this.body.setVelocityY(-100);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.1);

        // Boss arena
        this.bossArena = null;
        this.createBossArena();

        // Health bar
        this.createBossHealthBar();

        // Spawn warning
        this.showBossWarning();
    }

    /**
     * Create boss arena
     */
    createBossArena() {
        // Dark overlay for boss fight
        this.bossArena = this.scene.add.rectangle(
            this.scene.sys.game.canvas.width / 2,
            this.scene.sys.game.canvas.height / 2,
            this.scene.sys.game.canvas.width,
            this.scene.sys.game.canvas.height,
            0x000000,
            0.3
        );
    }

    /**
     * Create boss health bar
     */
    createBossHealthBar() {
        const screenWidth = this.scene.sys.game.canvas.width;
        const barWidth = 300;
        const barHeight = 20;
        const x = screenWidth / 2 - barWidth / 2;
        const y = 50;

        // Background
        this.healthBarBg = this.scene.add.rectangle(x + barWidth / 2, y, barWidth, barHeight, 0x333333);
        this.healthBarBg.setScrollFactor(0);
        this.healthBarBg.setDepth(100);

        // Health bar
        this.healthBarFill = this.scene.add.rectangle(x + barWidth / 2, y, barWidth, barHeight, 0xff0000);
        this.healthBarFill.setScrollFactor(0);
        this.healthBarFill.setDepth(101);

        // Boss name
        this.bossNameText = this.scene.add.text(x + barWidth / 2, y - 30, this.bossType, {
            fontSize: '24px',
            fill: '#ff0000',
            fontStyle: 'bold',
        });
        this.bossNameText.setScrollFactor(0);
        this.bossNameText.setDepth(102);
        this.bossNameText.setOrigin(0.5);
    }

    /**
     * Show boss warning
     */
    showBossWarning() {
        const warning = this.scene.add.text(
            this.scene.sys.game.canvas.width / 2,
            this.scene.sys.game.canvas.height / 2,
            `BOSS ENCOUNTERED\n${this.bossType}`,
            {
                fontSize: '48px',
                fill: '#ff0000',
                fontStyle: 'bold',
                align: 'center',
            }
        );
        warning.setOrigin(0.5);
        warning.setScrollFactor(0);
        warning.setDepth(200);

        // Fade out
        this.scene.tweens.add({
            targets: warning,
            alpha: 0,
            duration: 2000,
            delay: 1000,
            onComplete: () => {
                warning.destroy();
            },
        });

        // Play boss music
        this.scene.audioManager.playBossMusic();
    }

    /**
     * Update boss each frame
     */
    update(player) {
        // Update health bar
        const healthPercent = this.health / this.maxHealth;
        this.healthBarFill.setScale(healthPercent, 1);

        // Attack pattern
        if (Date.now() - this.lastAttackTime > this.attackCooldown) {
            this.performAttack(player);
            this.lastAttackTime = Date.now();
        }

        // Movement pattern
        this.performMovement();

        // Check phase transitions
        this.checkPhaseTransition();
    }

    /**
     * Perform attack based on pattern
     */
    performAttack(player) {
        switch (this.pattern) {
            case 'chase':
                this.chaseAttack(player);
                break;
            case 'ranged':
                this.rangedAttack(player);
                break;
            case 'multi':
                this.multiAttack(player);
                break;
        }
    }

    /**
     * Chase attack
     */
    chaseAttack(player) {
        const direction = Phaser.Math.Between(-1, 1);
        this.body.setVelocityX(direction * this.speed);
    }

    /**
     * Ranged attack
     */
    rangedAttack(player) {
        // Spawn projectiles
        for (let i = 0; i < 3; i++) {
            const angle = (Math.PI * 2 / 3) * i;
            const projectile = this.scene.add.circle(
                this.x,
                this.y,
                8,
                0xff4500
            );
            this.scene.physics.add.existing(projectile);
            projectile.body.setVelocity(
                Math.cos(angle) * 200,
                Math.sin(angle) * 200 - 200
            );
        }
    }

    /**
     * Multi attack
     */
    multiAttack(player) {
        this.chaseAttack(player);
        this.rangedAttack(player);
    }

    /**
     * Perform movement
     */
    performMovement() {
        // Wander
        this.body.setVelocityX(
            Math.sin(Date.now() / 1000) * this.speed * 0.5
        );
    }

    /**
     * Check phase transitions
     */
    checkPhaseTransition() {
        if (this.health <= this.phaseTransitions[1] && this.currentPhase === 1) {
            this.currentPhase = 2;
            this.speed *= 1.2;
            this.attackCooldown *= 0.8;
        }
        if (this.health <= this.phaseTransitions[0] && this.currentPhase === 2) {
            this.currentPhase = 3;
            this.speed *= 1.3;
            this.attackCooldown *= 0.7;
        }
    }

    /**
     * Take damage
     */
    takeDamage(amount) {
        this.health -= amount;
        this.scene.audioManager.playHit();

        // Knockback
        this.body.setVelocityX(Phaser.Math.Between(-300, 300));

        if (this.health <= 0) {
            this.die();
        }
    }

    /**
     * Die
     */
    die() {
        this.scene.particleManager.createExplosion(this.x, this.y, 50);
        this.scene.audioManager.playVictoryMusic();

        // Cleanup
        this.healthBarBg.destroy();
        this.healthBarFill.destroy();
        this.bossNameText.destroy();
        this.bossArena.destroy();

        // Delay destruction
        this.scene.time.delayedCall(500, () => {
            this.destroy();
        });
    }
}