/**
 * RELIC RUSH - Mission System
 * Handles daily missions and progression
 */

class MissionSystem {
    constructor(scene) {
        this.scene = scene;
        this.missions = SaveSystem.getMissions();
        this.currentMission = 0;
        this.initializeMissions();
    }

    /**
     * Initialize missions
     */
    initializeMissions() {
        // Reset daily missions if date changed
        const lastDate = SaveSystem.get('last_mission_date', null);
        const today = new Date().toDateString();

        if (lastDate !== today) {
            SaveSystem.resetDailyMissions();
            SaveSystem.set('last_mission_date', today);
            this.missions = SaveSystem.getMissions();
        }
    }

    /**
     * Update mission progress
     */
    updateProgress(missionId, value) {
        const mission = this.missions.find(m => m.id === missionId);
        if (mission && !mission.completed) {
            mission.progress = Math.min(mission.progress + value, mission.target);
            SaveSystem.updateMissionProgress(missionId, mission.progress);
            this.checkMissionCompletion(mission);
        }
    }

    /**
     * Check mission completion
     */
    checkMissionCompletion(mission) {
        if (mission.progress >= mission.target && !mission.completed) {
            mission.completed = true;
            this.onMissionComplete(mission);
        }
    }

    /**
     * On mission complete
     */
    onMissionComplete(mission) {
        // Award coins
        SaveSystem.addCoins(mission.reward);

        // Show notification
        const notification = this.scene.add.text(
            this.scene.sys.game.canvas.width / 2,
            this.scene.sys.game.canvas.height / 2,
            `MISSION COMPLETE!\n${mission.name}\n+${mission.reward} Coins`,
            {
                fontSize: '28px',
                fill: '#00ff44',
                fontStyle: 'bold',
                align: 'center',
            }
        );
        notification.setOrigin(0.5);
        notification.setScrollFactor(0);
        notification.setDepth(200);

        this.scene.tweens.add({
            targets: notification,
            alpha: 0,
            duration: 2000,
            delay: 1000,
            onComplete: () => {
                notification.destroy();
            },
        });
    }

    /**
     * Get active mission
     */
    getActiveMission() {
        return this.missions[0] || null;
    }

    /**
     * Get all missions
     */
    getMissions() {
        return this.missions;
    }

    /**
     * Get mission progress percentage
     */
    getMissionProgress(missionId) {
        const mission = this.missions.find(m => m.id === missionId);
        if (mission) {
            return (mission.progress / mission.target) * 100;
        }
        return 0;
    }

    /**
     * Claim mission rewards
     */
    claimRewards() {
        let totalReward = 0;
        this.missions.forEach(mission => {
            if (mission.completed && !mission.claimed) {
                totalReward += mission.reward;
                mission.claimed = true;
            }
        });
        return totalReward;
    }
}