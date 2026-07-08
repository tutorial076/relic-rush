/**
 * RELIC RUSH - Level Generator
 * Procedurally generates endless levels with obstacles and collectibles
 */

class LevelGenerator {
    constructor(scene) {
        this.scene = scene;
        this.currentEnvironment = 0;
        this.environments = GameConfig.ENVIRONMENTS;
        this.spawnDistance = GameConfig.WORLD.SPAWN_DISTANCE;
        this.despawnDistance = GameConfig.WORLD.DESPAWN_DISTANCE;
        this.lastSpawnY = 0;
        this.obstacleChance = 0.3;
        this.collectibleChance = 0.5;
        this.powerUpChance = 0.05;
        this.enemyChance = 0.2;
        this.bossDistance = 5000;
        this.nextBossDistance = this.bossDistance;
        this.spawnedObjects = [];
    }

    /**
     * Initialize level
     */
    init() {
        this.selectRandomEnvironment();
        this.generateInitialLevel();
    }

    /**
     * Select random environment
     */
    selectRandomEnvironment() {
        this.currentEnvironment = Phaser.Math.RND.pick(this.environments);
        return this.currentEnvironment;
    }

    /**
     * Generate initial level
     */
    generateInitialLevel() {
        const initialSpawns = 15;
        for (let i = 0; i < initialSpawns; i++) {
            const y = -this.spawnDistance + (i * 500);
            this.spawnChunk(y);
        }
    }

    /**
     * Generate new chunks ahead of player
     */
    generateAhead(playerY) {
        if (playerY - this.lastSpawnY < this.spawnDistance) {
            return;
        }

        const chunksToGenerate = 3;
        for (let i = 0; i < chunksToGenerate; i++) {
            const y = this.lastSpawnY - this.spawnDistance;
            this.spawnChunk(y);
            this.lastSpawnY = y;
        }
    }

    /**
     * Spawn a chunk of content
     */
    spawnChunk(baseY) {
        const laneWidth = GameConfig.WORLD.LANE_WIDTH;
        const screenWidth = this.scene.sys.game.canvas.width;
        const centerX = screenWidth / 2;
        const chunkSize = 400;

        for (let i = 0; i < 4; i++) {
            const y = baseY - (i * 300);
            const lane = Phaser.Math.RND.integerInRange(0, 2);
            const x = centerX + (lane - 1) * laneWidth;

            // Random object spawn
            const random = Math.random();

            if (random < this.powerUpChance) {
                this.spawnPowerUp(x, y);
            } else if (random < this.powerUpChance + this.collectibleChance) {
                this.spawnCollectible(x, y);
            } else if (random < this.powerUpChance + this.collectibleChance + this.enemyChance) {
                this.spawnEnemy(x, y);
            } else if (random < this.powerUpChance + this.collectibleChance + this.enemyChance + this.obstacleChance) {
                this.spawnObstacle(x, y);
            }
        }
    }

    /**
     * Spawn obstacle
     */
    spawnObstacle(x, y) {
        const obstacleTypes = Object.keys(GameConfig.OBSTACLES);
        const type = Phaser.Utils.Array.GetRandom(obstacleTypes);
        const obstacle = new Obstacle(this.scene, x, y, type);
        this.spawnedObjects.push(obstacle);
        return obstacle;
    }

    /**
     * Spawn collectible
     */
    spawnCollectible(x, y) {
        const collectibleTypes = Object.keys(GameConfig.COLLECTIBLES);
        const type = Phaser.Utils.Array.GetRandom(collectibleTypes);
        const collectible = new Collectible(this.scene, x, y, type);
        this.spawnedObjects.push(collectible);
        return collectible;
    }

    /**
     * Spawn power-up
     */
    spawnPowerUp(x, y) {
        const powerUpTypes = Object.keys(GameConfig.POWERUPS);
        const type = Phaser.Utils.Array.GetRandom(powerUpTypes);
        const powerUp = new PowerUp(this.scene, x, y, type);
        this.spawnedObjects.push(powerUp);
        return powerUp;
    }

    /**
     * Spawn enemy
     */
    spawnEnemy(x, y) {
        const enemyTypes = Object.keys(GameConfig.ENEMIES);
        const type = Phaser.Utils.Array.GetRandom(enemyTypes);
        const enemy = new Enemy(this.scene, x, y, type);
        this.spawnedObjects.push(enemy);
        return enemy;
    }

    /**
     * Spawn boss at milestone
     */
    spawnBoss(x, y, distance) {
        if (distance >= this.nextBossDistance) {
            const bossConfig = Phaser.Utils.Array.GetRandom(GameConfig.BOSSES);
            const boss = new Boss(this.scene, x, y, bossConfig.name.split(' ')[0]);
            this.spawnedObjects.push(boss);
            this.nextBossDistance += this.bossDistance;
            return boss;
        }
        return null;
    }

    /**
     * Clean up out-of-bounds objects
     */
    cleanupObjects(playerY) {
        this.spawnedObjects = this.spawnedObjects.filter(obj => {
            if (obj.y > playerY + this.despawnDistance) {
                if (obj.healthBar) {
                    obj.healthBar.destroy();
                }
                obj.destroy();
                return false;
            }
            return true;
        });
    }

    /**
     * Change environment
     */
    changeEnvironment() {
        const prevEnv = this.currentEnvironment;
        while (this.currentEnvironment === prevEnv) {
            this.selectRandomEnvironment();
        }
        return this.currentEnvironment;
    }

    /**
     * Get current environment
     */
    getCurrentEnvironment() {
        return this.currentEnvironment;
    }

    /**
     * Increase difficulty
     */
    increaseDifficulty(distance) {
        const milestone = Math.floor(distance / 5000);
        this.obstacleChance = Math.min(0.5, 0.3 + (milestone * 0.03));
        this.enemyChance = Math.min(0.4, 0.2 + (milestone * 0.02));
        this.powerUpChance = Math.max(0.01, 0.05 - (milestone * 0.005));
    }

    /**
     * Reset
     */
    reset() {
        this.lastSpawnY = 0;
        this.nextBossDistance = this.bossDistance;
        this.spawnedObjects.forEach(obj => {
            if (obj.healthBar) obj.healthBar.destroy();
            obj.destroy();
        });
        this.spawnedObjects = [];
    }
}