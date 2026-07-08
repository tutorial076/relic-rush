/**
 * RELIC RUSH - Player Class
 * Main player character with movement, jumping, and collision detection
 */

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, character = 'explorer') {
        super(scene, x, y, `player_${character}`);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.character = character;
        this.scene = scene;
        this.currentLane = 1; // 0 = left, 1 = center, 2 = right
        this.isJumping = false;
        this.isSliding = false;
        this.canJump = true;
        this.lives = 3;
        this.isInvulnerable = false;
        this.invulnerabilityDuration = 2000;
        this.hasShield = false;
        this.isSpeedBoosted = false;
        this.isSlowMotion = false;
        this.isMagnetActive = false;
        this.hasFlying = false;

        // Physics
        this.body.setGravityY(0);
        this.body.setBounce(0);
        this.body.setDrag(0);
        this.body.setMaxVelocity(GameConfig.PLAYER.MAX_SPEED, 500);
        this.body.setCollideWorldBounds(false);

        // Animations
        this.createAnimations();
        this.play('run');

        // Stats
        this.distance = 0;
        this.coinsCollected = 0;
        this.gemsCollected = 0;
        this.jumps = 0;
        this.slides = 0;
        this.enemiesDefeated = 0;
    }

    /**
     * Create player animations
     */
    createAnimations() {
        const charId = this.character;

        if (!this.scene.anims.exists('idle')) {
            this.scene.anims.create({
                key: 'idle',
                frames: this.scene.anims.generateFrameNumbers(`player_${charId}`, { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1,
            });
        }

        if (!this.scene.anims.exists('run')) {
            this.scene.anims.create({
                key: 'run',
                frames: this.scene.anims.generateFrameNumbers(`player_${charId}`, { start: 4, end: 11 }),
                frameRate: 12,
                repeat: -1,
            });
        }

        if (!this.scene.anims.exists('jump')) {
            this.scene.anims.create({
                key: 'jump',
                frames: this.scene.anims.generateFrameNumbers(`player_${charId}`, { start: 12, end: 15 }),
                frameRate: 10,
                repeat: 0,
            });
        }

        if (!this.scene.anims.exists('slide')) {
            this.scene.anims.create({
                key: 'slide',
                frames: this.scene.anims.generateFrameNumbers(`player_${charId}`, { start: 16, end: 18 }),
                frameRate: 10,
                repeat: 0,
            });
        }

        if (!this.scene.anims.exists('hit')) {
            this.scene.anims.create({
                key: 'hit',
                frames: this.scene.anims.generateFrameNumbers(`player_${charId}`, { start: 19, end: 21 }),
                frameRate: 15,
                repeat: 0,
            });
        }
    }

    /**
     * Update player each frame
     */
    update(inputState) {
        if (!inputState) return;

        // Handle movement
        this.handleMovement(inputState);

        // Handle jumping
        if (inputState.jump && this.canJump) {
            this.jump();
        }

        // Handle sliding
        if (inputState.slide) {
            this.slide();
        }

        // Update invulnerability
        this.updateInvulnerability();
    }

    /**
     * Handle horizontal movement
     */
    handleMovement(inputState) {
        if (inputState.moveLeft && this.currentLane > 0) {
            this.currentLane--;
            this.moveLane();
        }
        if (inputState.moveRight && this.currentLane < GameConfig.WORLD.LANE_COUNT - 1) {
            this.currentLane++;
            this.moveLane();
        }
    }

    /**
     * Move to lane
     */
    moveLane() {
        const laneWidth = GameConfig.PLAYER.LANE_WIDTH;
        const screenWidth = this.scene.sys.game.canvas.width;
        const centerX = screenWidth / 2;
        const targetX = centerX + (this.currentLane - 1) * laneWidth;

        this.scene.tweens.add({
            targets: this,
            x: targetX,
            duration: 150,
            ease: 'Quad.easeInOut',
        });
    }

    /**
     * Jump
     */
    jump() {
        if (!this.isJumping && !this.isSliding && this.canJump) {
            this.body.setVelocityY(GameConfig.PLAYER.JUMP_VELOCITY);
            this.isJumping = true;
            this.canJump = false;
            this.jumps++;
            this.play('jump');
            this.scene.audioManager.playJump();
        }
    }

    /**
     * Slide
     */
    slide() {
        if (!this.isSliding && !this.isJumping) {
            this.isSliding = true;
            this.slides++;
            this.play('slide');
            this.scene.audioManager.playSlide();

            // Reduce height temporarily
            this.setScale(1, 0.5);

            this.scene.time.delayedCall(GameConfig.PLAYER.SLIDE_DURATION * 1000, () => {
                this.isSliding = false;
                this.setScale(1, 1);
            });
        }
    }

    /**
     * Take damage
     */
    takeDamage(amount = 1) {
        if (this.isInvulnerable || this.hasShield) {
            if (this.hasShield) {
                this.hasShield = false;
            }
            return;
        }

        this.lives -= amount;
        this.play('hit');
        this.scene.audioManager.playDamage();
        this.setInvulnerable(this.invulnerabilityDuration);

        if (this.lives <= 0) {
            this.die();
        }
    }

    /**
     * Die
     */
    die() {
        this.scene.physics.pause();
        this.play('hit');
        this.scene.audioManager.playExplosion();
        this.scene.time.delayedCall(500, () => {
            this.scene.gameOver();
        });
    }

    /**
     * Set invulnerability
     */
    setInvulnerable(duration) {
        this.isInvulnerable = true;
        const blinkDuration = 100;
        let blinkCount = 0;

        const blinkInterval = setInterval(() => {
            this.setAlpha(this.alpha === 1 ? 0.5 : 1);
            blinkCount++;

            if (blinkCount * blinkDuration >= duration) {
                clearInterval(blinkInterval);
                this.setAlpha(1);
                this.isInvulnerable = false;
            }
        }, blinkDuration);
    }

    /**
     * Update invulnerability
     */
    updateInvulnerability() {
        // Handled by setInvulnerable timer
    }

    /**
     * Collect coin
     */
    collectCoin(amount = 10) {
        this.coinsCollected += amount;
        SaveSystem.addCoins(amount);
        this.scene.audioManager.playCollectCoin();
    }

    /**
     * Collect gem
     */
    collectGem(amount = 50) {
        this.gemsCollected += amount;
        SaveSystem.addGems(amount);
        this.scene.audioManager.playCollectGem();
    }

    /**
     * Activate power-up
     */
    activatePowerUp(type, duration = 10000) {
        switch (type) {
            case 'magnet':
                this.isMagnetActive = true;
                this.scene.time.delayedCall(duration, () => {
                    this.isMagnetActive = false;
                });
                break;
            case 'shield':
                this.hasShield = true;
                break;
            case 'speed':
                this.isSpeedBoosted = true;
                this.body.setMaxVelocity(GameConfig.PLAYER.MAX_SPEED * 1.5, 500);
                this.scene.time.delayedCall(duration, () => {
                    this.isSpeedBoosted = false;
                    this.body.setMaxVelocity(GameConfig.PLAYER.MAX_SPEED, 500);
                });
                break;
            case 'slow':
                this.isSlowMotion = true;
                this.scene.time.timeScale = 0.5;
                this.scene.time.delayedCall(duration, () => {
                    this.isSlowMotion = false;
                    this.scene.time.timeScale = 1;
                });
                break;
            case 'flying':
                this.hasFlying = true;
                this.body.setGravityY(-1000);
                this.scene.time.delayedCall(duration, () => {
                    this.hasFlying = false;
                    this.body.setGravityY(0);
                });
                break;
        }
    }

    /**
     * Add life
     */
    addLife() {
        this.lives++;
    }

    /**
     * Get score
     */
    getScore() {
        return Math.floor(this.distance) + (this.coinsCollected * GameConfig.SCORE.COIN);
    }

    /**
     * Reset player
     */
    reset() {
        this.distance = 0;
        this.coinsCollected = 0;
        this.gemsCollected = 0;
        this.jumps = 0;
        this.slides = 0;
        this.lives = 3;
        this.isInvulnerable = false;
        this.hasShield = false;
        this.isSpeedBoosted = false;
        this.body.setVelocity(0, 0);
    }
}