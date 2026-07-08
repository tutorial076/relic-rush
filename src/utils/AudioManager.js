/**
 * RELIC RUSH - Audio Manager
 * Manages all game audio and sound effects
 */

class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.masterVolume = SaveSystem.getSettings().soundVolume || 0.8;
        this.musicVolume = SaveSystem.getSettings().musicVolume || 0.7;
        this.currentMusic = null;
        this.soundCache = {};
        this.musicCache = {};
    }

    /**
     * Play background music
     */
    playMusic(key, config = {}) {
        const settings = {
            volume: this.musicVolume,
            loop: true,
            ...config,
        };

        // Stop current music if playing
        if (this.currentMusic) {
            this.currentMusic.stop();
        }

        // Play new music
        this.currentMusic = this.scene.sound.add(key, settings);
        this.currentMusic.play();

        return this.currentMusic;
    }

    /**
     * Stop music
     */
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.stop();
            this.currentMusic = null;
        }
    }

    /**
     * Pause music
     */
    pauseMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
        }
    }

    /**
     * Resume music
     */
    resumeMusic() {
        if (this.currentMusic && this.currentMusic.isPaused) {
            this.currentMusic.resume();
        }
    }

    /**
     * Play sound effect
     */
    playSFX(key, config = {}) {
        const settings = {
            volume: this.masterVolume,
            ...config,
        };

        try {
            const sound = this.scene.sound.add(key, settings);
            sound.play();
            return sound;
        } catch (e) {
            console.warn('Failed to play sound:', key, e);
            return null;
        }
    }

    /**
     * Play footstep sound
     */
    playFootstep() {
        const variants = ['footstep_1', 'footstep_2', 'footstep_3'];
        const randomVariant = Phaser.Utils.Array.GetRandom(variants);
        this.playSFX(randomVariant, { volume: 0.3 });
    }

    /**
     * Play jump sound
     */
    playJump() {
        this.playSFX('jump', { volume: 0.5 });
    }

    /**
     * Play coin collection sound
     */
    playCollectCoin() {
        this.playSFX('coin', { volume: 0.6 });
    }

    /**
     * Play gem collection sound
     */
    playCollectGem() {
        this.playSFX('gem', { volume: 0.6 });
    }

    /**
     * Play explosion sound
     */
    playExplosion() {
        this.playSFX('explosion', { volume: 0.8 });
    }

    /**
     * Play damage sound
     */
    playDamage() {
        this.playSFX('damage', { volume: 0.6 });
    }

    /**
     * Play slide sound
     */
    playSlide() {
        this.playSFX('slide', { volume: 0.5 });
    }

    /**
     * Play boss music
     */
    playBossMusic() {
        this.playMusic('boss_music', { volume: this.musicVolume });
    }

    /**
     * Play victory music
     */
    playVictoryMusic() {
        this.playMusic('victory_music', { volume: this.musicVolume });
    }

    /**
     * Play game over music
     */
    playGameOverMusic() {
        this.playMusic('gameover_music', { volume: this.musicVolume });
    }

    /**
     * Play environment music
     */
    playEnvironmentMusic(environmentName) {
        const musicKey = `music_${environmentName}`;
        this.playMusic(musicKey, { volume: this.musicVolume });
    }

    /**
     * Set master volume
     */
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        this.scene.sound.volume = this.masterVolume;
    }

    /**
     * Set music volume
     */
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.currentMusic) {
            this.currentMusic.volume = this.musicVolume;
        }
    }

    /**
     * Mute all audio
     */
    muteAll() {
        this.scene.sound.mute = true;
    }

    /**
     * Unmute all audio
     */
    unmuteAll() {
        this.scene.sound.mute = false;
    }

    /**
     * Get master volume
     */
    getMasterVolume() {
        return this.masterVolume;
    }

    /**
     * Get music volume
     */
    getMusicVolume() {
        return this.musicVolume;
    }

    /**
     * Cleanup
     */
    shutdown() {
        this.stopMusic();
    }
}
