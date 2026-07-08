/**
 * RELIC RUSH - Loading Scene
 * Preloads all game assets
 */

class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        // Show loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff',
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff',
            },
        });
        percentText.setOrigin(0.5, 0.5);

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 100,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff',
            },
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', value => {
            percentText.setText(Math.round(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', file => {
            assetText.setText('Loading: ' + file.key);
        });

        // Log any asset load errors to console for debugging
        this.load.on('loaderror', file => {
            try {
                console.error('Asset load error:', file && file.key, file && (file.src || file.url) || file);
            } catch (e) {
                console.error('Asset load error (unknown file):', e);
            }
        });

        // On complete, clean up visuals
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // Safety timeout: if loader hasn't finished after 20s, log and force complete
        this.time.delayedCall(20000, () => {
            // If loader hasn't finished, force the complete event so the app can continue
            if (this.load.totalToLoad && this.load.totalToLoad > 0 && this.load.progress < 0.999) {
                console.warn('Loader timeout — forcing continue. Check network/console for missing assets.');
                // Dump remaining files for debugging
                try {
                    console.warn('Remaining to load:', this.load.totalToLoad, 'progress:', this.load.progress);
                } catch (e) {
                    // ignore
                }
                this.load.emit('complete');
            }
        });

        // Load all assets
        const assetManager = new AssetManager(this);
        assetManager.loadAllAssets();
    }

    create() {
        this.scene.start('MainMenuScene');
    }
}
