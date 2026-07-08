/**
 * RELIC RUSH - Particle Manager
 * Handles all particle effects
 */

class ParticleManager {
    constructor(scene) {
        this.scene = scene;
    }

    /**
     * Create collection effect
     */
    createCollection(x, y) {
        const emitter = this.scene.add.particles(0xffd700).createEmitter({
            speed: { min: -100, max: 100 },
            angle: { min: 240, max: 300 },
            scale: { start: 0.5, end: 0 },
            lifespan: 600,
            gravityY: 300,
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Circle(x, y, 10),
            },
        });

        emitter.explode(10, x, y);
        this.scene.time.delayedCall(600, () => {
            emitter.stop();
            emitter.emitterObject.destroy();
        });
    }

    /**
     * Create explosion effect
     */
    createExplosion(x, y, scale = 20) {
        const emitter = this.scene.add.particles(0xff4500).createEmitter({
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            lifespan: 800,
            gravityY: 200,
        });

        emitter.explode(scale, x, y);
        this.scene.time.delayedCall(800, () => {
            emitter.stop();
            emitter.emitterObject.destroy();
        });
    }

    /**
     * Create impact effect
     */
    createImpact(x, y) {
        const emitter = this.scene.add.particles(0xffffff).createEmitter({
            speed: { min: -150, max: 150 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            lifespan: 400,
            gravityY: 500,
        });

        emitter.explode(15, x, y);
        this.scene.time.delayedCall(400, () => {
            emitter.stop();
            emitter.emitterObject.destroy();
        });
    }

    /**
     * Create power-up effect
     */
    createPowerUpEffect(x, y, color) {
        const emitter = this.scene.add.particles(color).createEmitter({
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            lifespan: 1000,
            gravityY: 0,
        });

        emitter.explode(30, x, y);
        this.scene.time.delayedCall(1000, () => {
            emitter.stop();
            emitter.emitterObject.destroy();
        });
    }

    /**
     * Create trail effect
     */
    createTrail(x, y, velocity) {
        const emitter = this.scene.add.particles(0x00d4ff).createEmitter({
            speed: 0,
            scale: { start: 0.3, end: 0 },
            lifespan: 300,
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Circle(x, y, 5),
            },
        });

        emitter.emitParticleAt(x, y, 3);
        this.scene.time.delayedCall(300, () => {
            emitter.stop();
            emitter.emitterObject.destroy();
        });
    }

    /**
     * Create heal effect
     */
    createHealEffect(x, y) {
        const emitter = this.scene.add.particles(0x00ff44).createEmitter({
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            lifespan: 600,
            gravityY: -200,
        });

        emitter.explode(20, x, y);
        this.scene.time.delayedCall(600, () => {
            emitter.stop();
            emitter.emitterObject.destroy();
        });
    }

    /**
     * Create ambient particles (dust, etc.)
     */
    createAmbientParticles() {
        const emitter = this.scene.add.particles(0xffff99).createEmitter({
            speed: { min: -20, max: 20 },
            scale: { start: 0.3, end: 0 },
            lifespan: 3000,
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(
                    0,
                    0,
                    this.scene.sys.game.canvas.width,
                    this.scene.sys.game.canvas.height
                ),
            },
            frequency: 100,
        });

        return emitter;
    }

    /**
     * Create slide dust effect
     */
    createSlideDust(x, y) {
        const emitter = this.scene.add.particles(0x8b7355).createEmitter({
            speed: { min: -100, max: 100 },
            angle: { min: 200, max: 340 },
            scale: { start: 0.5, end: 0 },
            lifespan: 500,
            gravityY: 200,
        });

        emitter.explode(15, x, y);
        this.scene.time.delayedCall(500, () => {
            emitter.stop();
            emitter.emitterObject.destroy();
        });
    }
}