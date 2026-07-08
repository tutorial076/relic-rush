/**
 * RELIC RUSH - Save Manager
 * Handles all local storage operations
 */

class SaveManager {
    constructor() {
        this.storagePrefix = 'RELIC_RUSH_';
        this.initializeStorage();
    }

    /**
     * Initialize default storage values
     */
    initializeStorage() {
        if (!this.get('initialized')) {
            this.set('coins', 0);
            this.set('gems', 0);
            this.set('high_score', 0);
            this.set('total_distance', 0);
            this.set('characters', this.getDefaultCharacters());
            this.set('achievements', this.getDefaultAchievements());
            this.set('daily_rewards', this.getDefaultDailyRewards());
            this.set('missions', this.getDefaultMissions());
            this.set('settings', this.getDefaultSettings());
            this.set('initialized', true);
        }
    }

    /**
     * Save a value to local storage
     */
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(this.storagePrefix + key, serialized);
            return true;
        } catch (e) {
            console.error('Failed to save:', key, e);
            return false;
        }
    }

    /**
     * Get a value from local storage
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.storagePrefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Failed to retrieve:', key, e);
            return defaultValue;
        }
    }

    /**
     * Add coins
     */
    addCoins(amount) {
        const current = this.get('coins', 0);
        const updated = Math.max(0, current + amount);
        this.set('coins', updated);
        return updated;
    }

    /**
     * Remove coins
     */
    removeCoins(amount) {
        return this.addCoins(-amount);
    }

    /**
     * Get coin balance
     */
    getCoins() {
        return this.get('coins', 0);
    }

    /**
     * Add gems
     */
    addGems(amount) {
        const current = this.get('gems', 0);
        const updated = Math.max(0, current + amount);
        this.set('gems', updated);
        return updated;
    }

    /**
     * Remove gems
     */
    removeGems(amount) {
        return this.addGems(-amount);
    }

    /**
     * Get gem balance
     */
    getGems() {
        return this.get('gems', 0);
    }

    /**
     * Update high score
     */
    updateHighScore(score) {
        const current = this.get('high_score', 0);
        if (score > current) {
            this.set('high_score', score);
            return true;
        }
        return false;
    }

    /**
     * Get high score
     */
    getHighScore() {
        return this.get('high_score', 0);
    }

    /**
     * Update total distance
     */
    addDistance(distance) {
        const current = this.get('total_distance', 0);
        const updated = current + distance;
        this.set('total_distance', updated);
        return updated;
    }

    /**
     * Get total distance
     */
    getTotalDistance() {
        return this.get('total_distance', 0);
    }

    /**
     * Unlock character
     */
    unlockCharacter(characterId) {
        const characters = this.get('characters', this.getDefaultCharacters());
        const char = characters.find(c => c.id === characterId);
        if (char) {
            char.unlocked = true;
        }
        this.set('characters', characters);
    }

    /**
     * Get characters
     */
    getCharacters() {
        return this.get('characters', this.getDefaultCharacters());
    }

    /**
     * Set selected character
     */
    setSelectedCharacter(characterId) {
        this.set('selected_character', characterId);
    }

    /**
     * Get selected character
     */
    getSelectedCharacter() {
        return this.get('selected_character', 'explorer');
    }

    /**
     * Unlock achievement
     */
    unlockAchievement(achievementId) {
        const achievements = this.get('achievements', this.getDefaultAchievements());
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            achievement.unlockedAt = new Date().toISOString();
        }
        this.set('achievements', achievements);
    }

    /**
     * Get achievements
     */
    getAchievements() {
        return this.get('achievements', this.getDefaultAchievements());
    }

    /**
     * Update mission progress
     */
    updateMissionProgress(missionId, progress) {
        const missions = this.get('missions', this.getDefaultMissions());
        const mission = missions.find(m => m.id === missionId);
        if (mission) {
            mission.progress = Math.min(progress, mission.target);
            if (mission.progress >= mission.target && !mission.completed) {
                mission.completed = true;
                mission.completedAt = new Date().toISOString();
            }
        }
        this.set('missions', missions);
    }

    /**
     * Get missions
     */
    getMissions() {
        return this.get('missions', this.getDefaultMissions());
    }

    /**
     * Reset missions (daily)
     */
    resetDailyMissions() {
        this.set('missions', this.getDefaultMissions());
    }

    /**
     * Get settings
     */
    getSettings() {
        return this.get('settings', this.getDefaultSettings());
    }

    /**
     * Update settings
     */
    updateSettings(settings) {
        const current = this.getSettings();
        this.set('settings', { ...current, ...settings });
    }

    /**
     * Check daily reward status
     */
    canClaimDailyReward() {
        const lastClaim = this.get('last_daily_claim', null);
        if (!lastClaim) return true;

        const lastDate = new Date(lastClaim);
        const today = new Date();
        
        return lastDate.toDateString() !== today.toDateString();
    }

    /**
     * Claim daily reward
     */
    claimDailyReward() {
        if (!this.canClaimDailyReward()) {
            return false;
        }

        this.addCoins(100);
        this.set('last_daily_claim', new Date().toISOString());
        return true;
    }

    /**
     * Clear all data
     */
    resetProgress() {
        localStorage.clear();
        this.initializeStorage();
    }

    /**
     * Get default characters
     */
    getDefaultCharacters() {
        return GameConfig.CHARACTERS.map(char => ({
            ...char,
        }));
    }

    /**
     * Get default achievements
     */
    getDefaultAchievements() {
        const achievements = [];
        for (let i = 0; i < GameConfig.ACHIEVEMENT_COUNT; i++) {
            achievements.push({
                id: `achievement_${i}`,
                name: `Achievement ${i + 1}`,
                description: `Complete achievement ${i + 1}`,
                unlocked: false,
                unlockedAt: null,
            });
        }
        return achievements;
    }

    /**
     * Get default daily missions
     */
    getDefaultMissions() {
        return GameConfig.DAILY_MISSIONS.map(mission => ({
            ...mission,
            progress: 0,
            completed: false,
            completedAt: null,
        }));
    }

    /**
     * Get default daily rewards
     */
    getDefaultDailyRewards() {
        return {
            claimed: false,
            claimedAt: null,
        };
    }

    /**
     * Get default settings
     */
    getDefaultSettings() {
        return {
            musicVolume: 0.7,
            soundVolume: 0.8,
            graphicsQuality: 'high',
            language: 'en',
            fullscreen: false,
            screenShake: true,
            particleEffects: true,
        };
    }
}

// Create global instance
const SaveSystem = new SaveManager();
