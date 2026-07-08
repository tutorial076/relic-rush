/**
 * RELIC RUSH - Settings Scene
 * Game settings menu
 */

class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }

    create() {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background
        this.add.rectangle(centerX, centerY, width, height, 0x0a0a0a);

        // Title
        this.add.text(centerX, centerY - 250, 'SETTINGS', {
            fontSize: '48px',
            fill: '#ffd700',
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5);

        const settings = SaveSystem.getSettings();
        let optionY = centerY - 150;
        const optionSpacing = 60;

        // Music Volume
        this.createSlider(centerX, optionY, 'Music Volume', settings.musicVolume, (value) => {
            settings.musicVolume = value;
            SaveSystem.updateSettings(settings);
        });
        optionY += optionSpacing;

        // Sound Volume
        this.createSlider(centerX, optionY, 'Sound Volume', settings.soundVolume, (value) => {
            settings.soundVolume = value;
            SaveSystem.updateSettings(settings);
        });
        optionY += optionSpacing * 1.5;

        // Graphics Quality
        this.createToggle(centerX, optionY, `Graphics: ${settings.graphicsQuality.toUpperCase()}`, () => {
            const qualities = ['low', 'medium', 'high'];
            const currentIndex = qualities.indexOf(settings.graphicsQuality);
            settings.graphicsQuality = qualities[(currentIndex + 1) % qualities.length];
            SaveSystem.updateSettings(settings);
        });
        optionY += optionSpacing;

        // Fullscreen
        this.createToggle(centerX, optionY, `Fullscreen: ${settings.fullscreen ? 'ON' : 'OFF'}`, () => {
            settings.fullscreen = !settings.fullscreen;
            SaveSystem.updateSettings(settings);
        });
        optionY += optionSpacing * 1.5;

        // Reset Progress
        this.createButton(centerX, optionY, '⚠ RESET PROGRESS', () => {
            if (confirm('Are you sure? This will reset all your progress!')) {
                SaveSystem.resetProgress();
                this.scene.start('MainMenuScene');
            }
        }, '#ff4444');
        optionY += optionSpacing * 1.5;

        // Back Button
        this.createButton(centerX, optionY, '← BACK', () => {
            this.scene.start('MainMenuScene');
        }, '#333333');
    }

    createSlider(x, y, label, value, callback) {
        // Label
        this.add.text(x - 100, y, label, {
            fontSize: '20px',
            fill: '#ffffff',
        }).setOrigin(1, 0.5);

        // Slider background
        const sliderBg = this.add.rectangle(x + 50, y, 100, 10, 0x333333);
        sliderBg.setInteractive({ useHandCursor: true });

        // Slider fill
        const sliderFill = this.add.rectangle(x + 50 - 50 + value * 100, y, value * 100, 10, 0x00ff44);

        sliderBg.on('pointerdown', (pointer) => {
            const newValue = Math.max(0, Math.min(1, (pointer.x - (x)) / 100));
            sliderFill.setX(x + 50 - 50 + newValue * 100);
            sliderFill.setDisplayWidth(newValue * 100);
            callback(newValue);
        });

        // Value text
        this.add.text(x + 150, y, `${Math.round(value * 100)}%`, {
            fontSize: '18px',
            fill: '#ffd700',
        }).setOrigin(0, 0.5);
    }

    createToggle(x, y, text, callback) {
        const button = this.add.text(x, y, text, {
            fontSize: '20px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 },
        });
        button.setOrigin(0.5);
        button.setInteractive({ useHandCursor: true });
        button.on('pointerdown', callback);
        button.on('pointerover', () => button.setBackgroundColor('#555555'));
        button.on('pointerout', () => button.setBackgroundColor('#333333'));
        return button;
    }

    createButton(x, y, text, callback, bgColor = '#333333') {
        const button = this.add.text(x, y, text, {
            fontSize: '20px',
            fill: '#ffffff',
            backgroundColor: bgColor,
            padding: { x: 30, y: 12 },
            fontStyle: 'bold',
        });
        button.setOrigin(0.5);
        button.setInteractive({ useHandCursor: true });
        button.on('pointerdown', callback);
        button.on('pointerover', () => button.setBackgroundColor('#555555'));
        button.on('pointerout', () => button.setBackgroundColor(bgColor));
        return button;
    }
}