
import SoundManager from "./SoundManager";
export class Hero extends Phaser.Sprite {

    private originX: number;
    private originY: number;
    private finishX: number;
    private cursorKeys: Phaser.CursorKeys;
    private jumpingKey: Phaser.Key;
    private jumpTimer = 0;
    private facing = 'right';
    private dancing = false;
    public wasOnFloor = true;
    public walkingFloorIndex = 0;

    constructor(group: Phaser.Group, x: number, y: number, key: string, frame: number, keyboard: Phaser.Keyboard) {
        super(group.game, x, y, key, frame);

        this.originX = x;
        this.originY = y;
        this.finishX = x;

        this.anchor.setTo(.5,.5);
        group.game.physics.enable(this, Phaser.Physics.ARCADE);

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

        group.add(this);

        this.cursorKeys = keyboard.createCursorKeys();
        this.jumpingKey = keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

    public update ()
    {
        var isWalking = false;
        this.body.velocity.x = 0;

        if (!this.body.onFloor() && this.wasOnFloor === true) {
            this.wasOnFloor = false;
        }

        this.updateSoundPan();

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
            SoundManager.instance.send(SoundManager.ReceiverStartWalk, [SoundManager.ActionBang]);
        }

        if (this.jumpingKey.isDown && this.body.onFloor() && this.game.time.now > this.jumpTimer) {

            SoundManager.instance.send(SoundManager.ReceiverJump, [SoundManager.ActionBang]);
            this.body.velocity.y = -300;
            this.jumpTimer = this.game.time.now + 100;

            if (this.facing == 'left') {
                this.animations.play('jump-left');
                this.facing = 'left';
            } else if (this.facing == 'right') {
                this.animations.play('jump-right');
                this.facing = 'right';
            }
        }
    }

    public biten () {
        this.restartLevel();
    }

    public drown () {
        this.restartLevel();
    }

    public changeOriginPosition() {
        this.originX = this.x;
        this.originY = this.y;
    }

    public isBackHome() {
        return this.x < this.finishX;
    }

    public dance () {
        this.x = this.x + 1; // TODO: dirty hack to raise coins emitter
        this.dancing = true;
    }

    public changeFloor(index)
    {
        if (index == this.walkingFloorIndex) {
            return;
        }

        var textureSounds = {
            10: SoundManager.FloorBeton,
            11: SoundManager.FloorMetal,
            12: SoundManager.FloorCarton,
            13: SoundManager.FloorWater
        };

        // console.log('NOW WALKING ON ' + index);
        this.walkingFloorIndex = index;
        SoundManager.instance.send(SoundManager.ReceiverTexture, [textureSounds[index]]);
    }

    public updateSoundPan()
    {
        SoundManager.instance.send('pos', [this.x / 1280]);
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
