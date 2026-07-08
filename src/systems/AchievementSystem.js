/**
 * RELIC RUSH - Achievement System
 * Handles achievements and unlocks
 */

class AchievementSystem {
    constructor(scene) {
        this.scene = scene;
        this.achievements = SaveSystem.getAchievements();
        this.trackers = {
            distance: 0,
            coins: 0,
            gems: 0,
            jumps: 0,
            slides: 0,
            enemiesDefeated: 0,
            bossesBeat: 0,
            obstaclesAvoided: 0,
        };
    }

    /**
     * Update tracker
     */
    updateTracker(tracker, value) {
        this.trackers[tracker] = (this.trackers[tracker] || 0) + value;
        this.checkAchievements();
    }

    /**
     * Check achievements
     */
    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!achievement.unlocked) {
                if (this.checkCondition(achievement.id)) {
                    this.unlockAchievement(achievement);
                }
            }
        });
    }

    /**
     * Check achievement condition
     */
    checkCondition(achievementId) {
        switch (achievementId) {
            case 'achievement_0':
                return this.trackers.distance >= 1000;
            case 'achievement_1':
                return this.trackers.distance >= 10000;
            case 'achievement_2':
                return this.trackers.distance >= 50000;
            case 'achievement_3':
                return this.trackers.coins >= 500;
            case 'achievement_4':
                return this.trackers.gems >= 100;
            case 'achievement_5':
                return this.trackers.jumps >= 100;
            case 'achievement_6':
                return this.trackers.slides >= 50;
            case 'achievement_7':
                return this.trackers.bossesBeat >= 1;
            default:
                return false;
        }
    }

    /**
     * Unlock achievement
     */
    unlockAchievement(achievement) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date().toISOString();
        SaveSystem.unlockAchievement(achievement.id);

        // Show notification
        this.showAchievementNotification(achievement);
    }

    /**
     * Show achievement notification
     */
    showAchievementNotification(achievement) {
        const notification = this.scene.add.text(
            this.scene.sys.game.canvas.width - 200,
            80,
            `🏆 ACHIEVEMENT UNLOCKED!\n${achievement.name}`,
            {
                fontSize: '20px',
                fill: '#ffd700',
                fontStyle: 'bold',
                align: 'center',
                backgroundColor: '#333333',
                padding: { x: 20, y: 10 },
            }
        );
        notification.setOrigin(0.5);
        notification.setScrollFactor(0);
        notification.setDepth(100);

        this.scene.tweens.add({
            targets: notification,
            alpha: 0,
            duration: 3000,
            delay: 2000,
            onComplete: () => {
                notification.destroy();
            },
        });
    }

    /**
     * Get achievements
     */
    getAchievements() {
        return this.achievements;
    }

    /**
     * Get unlocked achievements
     */
    getUnlockedAchievements() {
        return this.achievements.filter(a => a.unlocked);
    }

    /**
     * Get achievement progress
     */
    getProgress() {
        const unlocked = this.getUnlockedAchievements().length;
        return (unlocked / this.achievements.length) * 100;
    }
}