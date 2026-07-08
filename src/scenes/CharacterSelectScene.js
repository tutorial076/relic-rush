/**
 * RELIC RUSH - Character Select Scene
 * Select player character
 */

class CharacterSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelectScene' });
    }

    create() {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background
        this.add.rectangle(centerX, centerY, width, height, 0x0a0a0a);

        // Title
        this.add.text(centerX, 50, '👤 SELECT CHARACTER', {
            fontSize: '48px',
            fill: '#ffd700',
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5);

        // Balance
        const coins = SaveSystem.getCoins();
        this.add.text(centerX, 120, `Coins: ${coins}`, {
            fontSize: '20px',
            fill: '#ffd700',
            align: 'center',
        }).setOrigin(0.5);

        // Characters
        const characters = SaveSystem.getCharacters();
        const selectedChar = SaveSystem.getSelectedCharacter();
        let charX = centerX - 300;
        const charSpacing = 200;

        characters.forEach((character, index) => {
            this.createCharacterButton(
                charX + index * charSpacing,
                centerY,
                character,
                selectedChar === character.id,
                () => {
                    if (character.unlocked) {
                        SaveSystem.setSelectedCharacter(character.id);
                        this.scene.start('MainMenuScene');
                    } else if (coins >= character.cost) {
                        SaveSystem.removeCoins(character.cost);
                        SaveSystem.unlockCharacter(character.id);
                        SaveSystem.setSelectedCharacter(character.id);
                        this.scene.restart();
                    } else {
                        alert(`Need ${character.cost - coins} more coins!`);
                    }
                }
            );
        });

        // Back button
        this.createBackButton(centerX, height - 80);
    }

    createCharacterButton(x, y, character, isSelected, callback) {
        const bgColor = isSelected ? '#00ff44' : (character.unlocked ? '#333333' : '#555555');
        const text = character.unlocked
            ? `${character.name}\n(Selected)`
            : `${character.name}\n${character.cost} Coins`;

        const button = this.add.text(x, y, text, {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: bgColor,
            padding: { x: 15, y: 20 },
            align: 'center',
        });
        button.setOrigin(0.5);
        button.setInteractive({ useHandCursor: true });
        button.on('pointerdown', callback);
        button.on('pointerover', () => {
            button.setBackgroundColor(isSelected ? '#00ff44' : '#555555');
        });
        button.on('pointerout', () => {
            button.setBackgroundColor(bgColor);
        });
        return button;
    }

    createBackButton(x, y) {
        const button = this.add.text(x, y, '← BACK', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 30, y: 12 },
            fontStyle: 'bold',
        });
        button.setOrigin(0.5);
        button.setInteractive({ useHandCursor: true });
        button.on('pointerdown', () => this.scene.start('MainMenuScene'));
        button.on('pointerover', () => button.setBackgroundColor('#555555'));
        button.on('pointerout', () => button.setBackgroundColor('#333333'));
        return button;
    }
}