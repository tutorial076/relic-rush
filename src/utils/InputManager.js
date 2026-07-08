/**
 * RELIC RUSH - Input Manager
 * Handles keyboard and touch input
 */

class InputManager {
    constructor(scene) {
        this.scene = scene;
        this.isDesktop = !this.isTouch();
        this.setupKeyboardInput();
        this.setupTouchInput();
        this.inputState = {
            moveLeft: false,
            moveRight: false,
            jump: false,
            slide: false,
        };
    }

    /**
     * Check if device supports touch
     */
    isTouch() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Setup keyboard input
     */
    setupKeyboardInput() {
        const keys = this.scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
            slide: Phaser.Input.Keyboard.KeyCodes.S,
            leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
            rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        });

        // Left movement
        this.scene.input.keyboard.on('keydown-A', () => {
            this.inputState.moveLeft = true;
        });
        this.scene.input.keyboard.on('keyup-A', () => {
            this.inputState.moveLeft = false;
        });

        this.scene.input.keyboard.on('keydown-LEFT', () => {
            this.inputState.moveLeft = true;
        });
        this.scene.input.keyboard.on('keyup-LEFT', () => {
            this.inputState.moveLeft = false;
        });

        // Right movement
        this.scene.input.keyboard.on('keydown-D', () => {
            this.inputState.moveRight = true;
        });
        this.scene.input.keyboard.on('keyup-D', () => {
            this.inputState.moveRight = false;
        });

        this.scene.input.keyboard.on('keydown-RIGHT', () => {
            this.inputState.moveRight = true;
        });
        this.scene.input.keyboard.on('keyup-RIGHT', () => {
            this.inputState.moveRight = false;
        });

        // Jump
        this.scene.input.keyboard.on('keydown-SPACE', () => {
            this.inputState.jump = true;
        });
        this.scene.input.keyboard.on('keyup-SPACE', () => {
            this.inputState.jump = false;
        });

        // Slide
        this.scene.input.keyboard.on('keydown-S', () => {
            this.inputState.slide = true;
        });
        this.scene.input.keyboard.on('keyup-S', () => {
            this.inputState.slide = false;
        });
    }

    /**
     * Setup touch input
     */
    setupTouchInput() {
        this.scene.input.on('pointerdown', (pointer) => {
            if (pointer.isDown) {
                this.handleTouchInput(pointer);
            }
        });

        this.scene.input.on('pointermove', (pointer) => {
            if (pointer.isDown) {
                this.handleTouchSwipe(pointer);
            }
        });

        this.scene.input.on('pointerup', () => {
            this.inputState.moveLeft = false;
            this.inputState.moveRight = false;
            this.inputState.jump = false;
            this.inputState.slide = false;
        });
    }

    /**
     * Handle touch input
     */
    handleTouchInput(pointer) {
        const screenWidth = this.scene.sys.game.canvas.width;
        const screenHeight = this.scene.sys.game.canvas.height;

        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;

        // Determine which area was touched
        const touchX = pointer.x;
        const touchY = pointer.y;

        // Upper half - jump or slide
        if (touchY < centerY) {
            this.inputState.jump = true;
        }
        // Lower half - movement
        else {
            if (touchX < centerX / 2) {
                this.inputState.moveLeft = true;
            } else if (touchX > screenWidth - centerX / 2) {
                this.inputState.moveRight = true;
            } else {
                this.inputState.slide = true;
            }
        }
    }

    /**
     * Handle touch swipe input
     */
    handleTouchSwipe(pointer) {
        const minSwipeDistance = 30;
        const deltaX = pointer.position.x - pointer.prevPosition.x;
        const deltaY = pointer.position.y - pointer.prevPosition.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > minSwipeDistance) {
                this.inputState.moveRight = true;
                this.inputState.moveLeft = false;
            } else if (deltaX < -minSwipeDistance) {
                this.inputState.moveLeft = true;
                this.inputState.moveRight = false;
            }
        } else {
            // Vertical swipe
            if (deltaY > minSwipeDistance) {
                this.inputState.slide = true;
                this.inputState.jump = false;
            } else if (deltaY < -minSwipeDistance) {
                this.inputState.jump = true;
                this.inputState.slide = false;
            }
        }
    }

    /**
     * Get input state
     */
    getInputState() {
        return this.inputState;
    }

    /**
     * Check if moving left
     */
    isMovingLeft() {
        return this.inputState.moveLeft;
    }

    /**
     * Check if moving right
     */
    isMovingRight() {
        return this.inputState.moveRight;
    }

    /**
     * Check if jumping
     */
    isJumping() {
        return this.inputState.jump;
    }

    /**
     * Check if sliding
     */
    isSliding() {
        return this.inputState.slide;
    }

    /**
     * Reset input state
     */
    resetInput() {
        this.inputState = {
            moveLeft: false,
            moveRight: false,
            jump: false,
            slide: false,
        };
    }

    /**
     * Disable input
     */
    disable() {
        this.scene.input.keyboard.enabled = false;
        this.scene.input.enabled = false;
    }

    /**
     * Enable input
     */
    enable() {
        this.scene.input.keyboard.enabled = true;
        this.scene.input.enabled = true;
    }
}
