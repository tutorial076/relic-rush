/**
 * RELIC RUSH - Game Scene
 * Main gameplay scene
 */

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;

        // Initialize managers
        this.inputManager = new InputManager(this);
        this.audioManager = new AudioManager(this);
        this.levelGenerator = new LevelGenerator(this);
        this.uiManager = new UIManager(this);
        this.particleManager = new ParticleManager(this);
        this.missionSystem = new MissionSystem(this);
        this.achievementSystem = new AchievementSystem(this);

        // Background
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#0a0a0a');

        // Create player
        const selectedChar = SaveSystem.getSelectedCharacter();
        this.player = new Player(this, width / 2, height - 200, selectedChar);
        this.physics.add.existing(this.player);

        // Camera follows player
        this.cameras.main.startFollow(this.player, true, 0.5, 1);
        this.cameras.main.setBounds(0, -10000, width, 20000);

        // Physics groups
        this.obstacles = this.add.group();
        this.collectibles = this.add.group();
        this.powerUps = this.add.group();
        this.enemies = this.add.group();
        this.bosses = this.add.group();

        // Initialize level
        this.levelGenerator.init();
        this.audioManager.playEnvironmentMusic(this.levelGenerator.currentEnvironment.name);

        // Game state
        this.isGameOver = false;
        this.isPaused = false;
        this.score = 0;
        this.distance = 0;

        // Collision detection
        this.setupCollisions();

        // Track events
        this.setupTracking();
    }

    /**
     * Setup collision detection
     */
    setupCollisions() {
        // Player collision with obstacles
        this.physics.add.collider(this.player, this.obstacles, (player, obstacle) => {
            if (obstacle.onCollidePlayer) {
                obstacle.onCollidePlayer(player);
            }
        });

        // Player collision with collectibles
        this.physics.add.overlap(this.player, this.collectibles, (player, collectible) => {
            if (collectible.collect) {
                collectible.collect(player);
                this.uiManager.showCoinPopup(collectible.x, collectible.y, collectible.value);
            }
        });

        // Player collision with power-ups
        this.physics.add.overlap(this.player, this.powerUps, (player, powerUp) => {
            if (powerUp.collect) {
                powerUp.collect(player);
            }
        });

        // Player collision with enemies
        this.physics.add.collider(this.player, this.enemies, (player, enemy) => {
            if (enemy.onCollidePlayer) {
                enemy.onCollidePlayer(player);
            }
        });

        // Player collision with bosses
        this.physics.add.collider(this.player, this.bosses, (player, boss) => {
            player.takeDamage(1);
        });
    }

    /**
     * Setup event tracking
     */
    setupTracking() {
        // Track missions
        this.time.addEvent({
            delay: 100,
            callback: () => {
                this.missionSystem.updateProgress('distance', 0.1);
            },
            loop: true,
        });
    }

    /**
     * Main update loop
     */
    update() {
        if (this.isGameOver || this.isPaused) return;

        // Update player
        const inputState = this.inputManager.getInputState();
        this.player.update(inputState);

        // Update distance and score
        this.distance = this.player.distance;
        this.score = this.player.getScore();

        // Generate level ahead
        this.levelGenerator.generateAhead(this.player.y);
        this.levelGenerator.increaseDifficulty(this.distance);

        // Update UI
        this.uiManager.updateDistance(this.distance);
        this.uiManager.updateCoins(SaveSystem.getCoins());
        this.uiManager.updateGems(SaveSystem.getGems());
        this.uiManager.updateLives(this.player.lives);
        this.uiManager.updateFPS(this.game.loop.actualFps);

        // Update enemies
        this.enemies.children.entries.forEach(enemy => {
            if (enemy.update) {
                enemy.update(this.player);
            }
        });

        // Update bosses
        this.bosses.children.entries.forEach(boss => {
            if (boss.update) {
                boss.update(this.player);
            }
        });

        // Update collectibles and obstacles
        this.collectibles.children.entries.forEach(obj => {
            if (obj.update) obj.update();
        });
        this.obstacles.children.entries.forEach(obj => {
            if (obj.update) obj.update();
        });
        this.powerUps.children.entries.forEach(obj => {
            if (obj.update) obj.update();
        });

        // Cleanup
        this.levelGenerator.cleanupObjects(this.player.y);
    }

    /**
     * Pause game
     */
    pauseGame() {
        this.isPaused = true;
        this.physics.pause();
        this.scene.pause();
        this.scene.launch('PauseMenuScene');
    }

    /**
     * Resume game
     */
    resumeGame() {
        this.isPaused = false;
        this.physics.resume();
        this.scene.resume();
        this.scene.stop('PauseMenuScene');
    }

    /**
     * Game over
     */
    gameOver() {
        this.isGameOver = true;
        SaveSystem.updateHighScore(this.score);
        SaveSystem.addDistance(this.distance);
        this.scene.start('GameOverScene', {
            score: this.score,
            distance: this.distance,
            coins: this.player.coinsCollected,
            gems: this.player.gemsCollected,
        });
    }
}