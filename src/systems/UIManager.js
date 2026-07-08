/**
 * RELIC RUSH - UI Manager
 * Handles all user interface elements
 */

class UIManager {
    constructor(scene) {
        this.scene = scene;
        this.uiElements = {};
        this.createUI();
    }

    /**
     * Create all UI elements
     */
    createUI() {
        this.createDistanceDisplay();
        this.createCoinDisplay();
        this.createGemDisplay();
        this.createLivesDisplay();
        this.createMultiplierDisplay();
        this.createMissionDisplay();
        this.createPauseButton();
        this.createFPSCounter();
    }

    /**
     * Create distance display
     */
    createDistanceDisplay() {
        this.uiElements.distanceText = this.scene.add.text(20, 20, 'Distance: 0m', {
            fontSize: '24px',
            fill: '#ffd700',
            fontStyle: 'bold',
        });
        this.uiElements.distanceText.setScrollFactor(0);
        this.uiElements.distanceText.setDepth(10);
    }

    /**
     * Create coin display
     */
    createCoinDisplay() {
        this.uiElements.coinText = this.scene.add.text(
            this.scene.sys.game.canvas.width - 150,
            20,
            '🪙 Coins: 0',
            {
                fontSize: '24px',
                fill: '#ffd700',
                fontStyle: 'bold',
            }
        );
        this.uiElements.coinText.setScrollFactor(0);
        this.uiElements.coinText.setDepth(10);
    }

    /**
     * Create gem display
     */
    createGemDisplay() {
        this.uiElements.gemText = this.scene.add.text(
            this.scene.sys.game.canvas.width - 150,
            60,
            '💎 Gems: 0',
            {
                fontSize: '24px',
                fill: '#00d4ff',
                fontStyle: 'bold',
            }
        );
        this.uiElements.gemText.setScrollFactor(0);
        this.uiElements.gemText.setDepth(10);
    }

    /**
     * Create lives display
     */
    createLivesDisplay() {
        this.uiElements.livesText = this.scene.add.text(
            this.scene.sys.game.canvas.width - 150,
            100,
            '❤️ Lives: 3',
            {
                fontSize: '24px',
                fill: '#ff4444',
                fontStyle: 'bold',
            }
        );
        this.uiElements.livesText.setScrollFactor(0);
        this.uiElements.livesText.setDepth(10);
    }

    /**
     * Create multiplier display
     */
    createMultiplierDisplay() {
        this.uiElements.multiplierText = this.scene.add.text(20, 60, 'Multiplier: 1.0x', {
            fontSize: '20px',
            fill: '#ff00ff',
            fontStyle: 'bold',
        });
        this.uiElements.multiplierText.setScrollFactor(0);
        this.uiElements.multiplierText.setDepth(10);
    }

    /**
     * Create mission display
     */
    createMissionDisplay() {
        this.uiElements.missionText = this.scene.add.text(20, 100, 'Mission: Collect 500 Coins', {
            fontSize: '18px',
            fill: '#00ff44',
            fontStyle: 'bold',
        });
        this.uiElements.missionText.setScrollFactor(0);
        this.uiElements.missionText.setDepth(10);
    }

    /**
     * Create pause button
     */
    createPauseButton() {
        const buttonX = this.scene.sys.game.canvas.width / 2;
        const buttonY = this.scene.sys.game.canvas.height - 60;

        this.uiElements.pauseButton = this.scene.add.text(buttonX, buttonY, '⏸ PAUSE', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
        });
        this.uiElements.pauseButton.setScrollFactor(0);
        this.uiElements.pauseButton.setDepth(10);
        this.uiElements.pauseButton.setOrigin(0.5);
        this.uiElements.pauseButton.setInteractive({ useHandCursor: true });
        this.uiElements.pauseButton.on('pointerdown', () => {
            this.scene.pauseGame();
        });
    }

    /**
     * Create FPS counter
     */
    createFPSCounter() {
        if (GameConfig.PHYSICS.DEBUG) {
            this.uiElements.fpsText = this.scene.add.text(20, this.scene.sys.game.canvas.height - 40, 'FPS: 60', {
                fontSize: '16px',
                fill: '#00ff44',
            });
            this.uiElements.fpsText.setScrollFactor(0);
            this.uiElements.fpsText.setDepth(10);
        }
    }

    /**
     * Update distance display
     */
    updateDistance(distance) {
        this.uiElements.distanceText.setText(`Distance: ${Math.floor(distance)}m`);
    }

    /**
     * Update coin display
     */
    updateCoins(coins) {
        this.uiElements.coinText.setText(`🪙 Coins: ${coins}`);
    }

    /**
     * Update gem display
     */
    updateGems(gems) {
        this.uiElements.gemText.setText(`💎 Gems: ${gems}`);
    }

    /**
     * Update lives display
     */
    updateLives(lives) {
        this.uiElements.livesText.setText(`❤️ Lives: ${lives}`);
    }

    /**
     * Update multiplier display
     */
    updateMultiplier(multiplier) {
        this.uiElements.multiplierText.setText(`Multiplier: ${multiplier.toFixed(1)}x`);
    }

    /**
     * Update mission display
     */
    updateMission(mission) {
        this.uiElements.missionText.setText(`Mission: ${mission}`);
    }

    /**
     * Update FPS counter
     */
    updateFPS(fps) {
        if (this.uiElements.fpsText) {
            this.uiElements.fpsText.setText(`FPS: ${Math.round(fps)}`);
        }
    }

    /**
     * Show damage notification
     */
    showDamageNotification(x, y) {
        const text = this.scene.add.text(x, y, '-1 ❤️', {
            fontSize: '32px',
            fill: '#ff0000',
            fontStyle: 'bold',
        });
        text.setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            y: y - 100,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                text.destroy();
            },
        });
    }

    /**
     * Show coin popup
     */
    showCoinPopup(x, y, amount) {
        const text = this.scene.add.text(x, y, `+${amount} 🪙`, {
            fontSize: '24px',
            fill: '#ffd700',
            fontStyle: 'bold',
        });
        text.setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            y: y - 80,
            alpha: 0,
            duration: 800,
            onComplete: () => {
                text.destroy();
            },
        });
    }

    /**
     * Show screen shake effect
     */
    screenShake(intensity = 5, duration = 100) {
        const cameras = this.scene.cameras.main;
        cameras.shake(duration, intensity / 100);
    }

    /**
     * Hide UI temporarily
     */
    hideUI() {
        Object.values(this.uiElements).forEach(element => {
            if (element && element.setVisible) {
                element.setVisible(false);
            }
        });
    }

    /**
     * Show UI
     */
    showUI() {
        Object.values(this.uiElements).forEach(element => {
            if (element && element.setVisible) {
                element.setVisible(true);
            }
        });
    }
}