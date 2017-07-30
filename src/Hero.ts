
import SoundManager from "./SoundManager";
export class Hero extends Phaser.Sprite {

    private originX: number;
    private originY: number;
    private finishX: number;
    private cursorKeys: Phaser.CursorKeys;
    private jumpingKey: Phaser.Key;
    private jumpTimer = 0;
    private climbingKey: Phaser.Key;
    private facing = 'right';
    public wasOnFloor = false;
    public wasWalking = false;
    public walkingFloorIndex = 0;

    public glasses: Phaser.Sprite;

    constructor(dayGroup: Phaser.Group, nightGroup: Phaser.Group, x: number, y: number, key: string, frame: number, keyboard: Phaser.Keyboard) {
        super(dayGroup.game, x, y, key, frame);

        this.originX = x;
        this.originY = y;
        this.finishX = x;

        this.anchor.setTo(.5,.5);
        dayGroup.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.bounce.y = 0.0;
        this.body.collideWorldBounds = true;
        this.body.setSize(20, 60, 10, 4);

        this.body.gravity.y = 1000;

        this.animations.add('idle-right', [0, 1], 2, true);
        this.animations.add('idle-left', [2, 3], 4, true);
        this.animations.add('dancing', [4, 5, 6, 7], 4, true);
        this.animations.add('right', [8, 9, 10, 11], 6, true);
        this.animations.add('left', [15, 14, 13, 12], 6, true);
        this.animations.add('jump-right', [16, 17, 18, 19], 6, false);
        this.animations.add('jump-left', [23, 22, 21, 20], 6, false);

        dayGroup.add(this);

        this.cursorKeys = keyboard.createCursorKeys();
        this.jumpingKey = keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        this.climbingKey = keyboard.addKey(Phaser.KeyCode.UP);

        this.glasses = this.game.add.sprite(this.x, this.y, 'glasses', 0, nightGroup);
        this.glasses.animations.add('idle-right', [0, 1], 2, true);
        this.glasses.animations.add('idle-left', [2, 3], 2, true);
        this.glasses.animations.play('idle-right');
        this.glasses.alpha = 0;
    }

    public update ()
    {
        var isWalking = false;
        this.body.velocity.x = 0;

        this.updateSoundPan();
        this.updateWalkingState();

        // Remember if he was in the AIR
        if (!this.body.onFloor() && this.wasOnFloor === true) {
            this.wasOnFloor = false;
        }

        if (this.cursorKeys.left.isDown) {
            this.body.velocity.x = -150;
            isWalking = true;

            if (this.facing != 'left') {
                this.animations.play('left');
                this.facing = 'left';
            }

        } else if (this.cursorKeys.right.isDown) {
            this.body.velocity.x = 150;
            isWalking = true;

            if (this.facing != 'right') {
                this.animations.play('right');
                this.facing = 'right';
            }

        } else {
            if (this.facing == 'right' && this.facing != 'idle') {
                this.animations.play('idle-right');
                this.facing = 'idle';

            } else if (this.facing == 'left' && this.facing != 'idle') {
                this.animations.play('idle-left');
                this.facing = 'idle';
            }
        }

        if (isWalking) {
            // SoundManager.instance.send(SoundManager.ReceiverStartWalk, [SoundManager.ActionBang]);
        }

        if (this.jumpingKey.isDown && this.body.onFloor() && this.game.time.now > this.jumpTimer) {

            SoundManager.instance.send(SoundManager.ReceiverJump, [SoundManager.ActionBang]);
            this.body.velocity.y = -400;
            this.jumpTimer = this.game.time.now + 100;

            if (this.facing == 'left') {
                this.animations.play('jump-left');
                this.facing = 'left';
            } else if (this.facing == 'right') {
                this.animations.play('jump-right');
                this.facing = 'right';
            }

            this.animations.currentAnim.onComplete.addOnce(function(){
                this.animations.play(this.facing);
                console.log('ee');
            }.bind(this));
        }

        const ladderTop = this.walkingFloorIndex == 41;
        if (ladderTop) {
            console.log('echelle haut');
        }

        const ladderBottom = this.walkingFloorIndex == 71;
        if (ladderBottom && this.climbingKey.isDown) {
            console.log('echelle bas');
            this.body.velocity.y = -150;
        }

        this.glasses.x = this.body.x - 10;
        this.glasses.y = this.body.y - 5;

        if (this.facing == 'left') {
            this.glasses.animations.play('idle-left');
        } else if (this.facing == 'right') {
            this.glasses.animations.play('idle-right');
        }

    }

    public byDay()
    {
        this.glasses.alpha = 0;
    }

    public byNight()
    {
        this.glasses.alpha = 1;
    }

    public changeOriginPosition() {
        this.originX = this.x;
        this.originY = this.y;
    }

    public isBackHome() {
        return this.x < this.finishX;
    }

    public changeFloor(index)
    {
        if (index == this.walkingFloorIndex) {
            return;
        }

        var textureSounds = {
            // BETON
            4: SoundManager.FloorBeton,
            5: SoundManager.FloorBeton,
            6: SoundManager.FloorBeton,

            // METAL
            25: SoundManager.FloorMetal,

            // CARTON
            42: SoundManager.FloorCarton,

            13: SoundManager.FloorWater,

            // LADDER TOP
            41: SoundManager.FloorMetal,

            // LADDER BOTTOM
            71: SoundManager.FloorMetal
        };

        // console.log('NOW WALKING ON ' + index);
        this.walkingFloorIndex = index;
        SoundManager.instance.send(SoundManager.ReceiverTexture, [textureSounds[index]]);
    }

    public updateSoundPan()
    {
        SoundManager.instance.send('pos', [this.x / 1280]);
    }

    public updateWalkingState()
    {
        if (!this.body.onFloor()) {
            console.log('STOP WALKING');
            SoundManager.instance.send(SoundManager.ReceiverStopWalk, [SoundManager.ActionBang]);
            this.wasWalking = false;
            return;
        }

        // Remember if he was walking
        if (this.body.deltaAbsX() > 0 && !this.wasWalking) {
            console.log('START WALKING');
            SoundManager.instance.send(SoundManager.ReceiverStartWalk, [SoundManager.ActionBang]);
            this.wasWalking = true;
            return;
        }

        if (this.body.deltaAbsX() == 0 && this.wasWalking) {
            console.log('STOP WALKING');
            SoundManager.instance.send(SoundManager.ReceiverStopWalk, [SoundManager.ActionBang]);
            this.wasWalking = false;
            return;
        }
    }

    public lands()
    {
        SoundManager.instance.send(SoundManager.ReceiverLand, [SoundManager.ActionBang]);
    }

    private restartLevel() {
        this.x = this.originX;
        this.y = this.originY;
    }
}
