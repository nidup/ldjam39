
export class Rat extends Phaser.Sprite {

    private limitLeftX: number;
    private limitRightX: number;
    private speed: number = 80;
    private facing: string;
    public eyes: Phaser.Sprite;

    constructor(dayGroup: Phaser.Group, nightGroup: Phaser.Group, x: number, y: number, toX: number, key: string, frame: number) {
        super(dayGroup.game, x, y, key, frame);

        this.limitLeftX = x;
        this.limitRightX = toX;

        this.anchor.setTo(.5,.5);
        dayGroup.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.bounce.y = 0.2;
        this.body.collideWorldBounds = true;
        this.body.setSize(18, 16, 8, 16);
        this.animations.add('right', [0, 1], 10, true);
        this.animations.add('left', [4, 5], 10, true);

        this.facing = 'left';

        dayGroup.add(this);

        this.eyes = this.game.add.sprite(this.x, this.y, 'rat', 0, nightGroup);
        this.eyes.animations.add('right', [2, 3], 10, true);
        this.eyes.animations.add('left', [6, 7], 10, true);
        this.eyes.alpha = 0;
    }

    public byNight()
    {
        this.eyes.alpha = 1;
    }

    public update ()
    {
        if (this.x < this.limitLeftX) {
            this.facing = 'right';
        } else if (this.x > this.limitRightX) {
            this.facing = 'left';
        }

        if (this.facing == 'left') {
            this.animations.play('left');
            this.body.velocity.x = -this.speed;

        } else if (this.facing == 'right') {
            this.animations.play('right');
            this.body.velocity.x = this.speed;
        }

        this.eyes.x = this.body.x - 15;
        this.eyes.y = this.body.y - 16;
        if (this.facing == 'left') {
            this.eyes.animations.play('left');
        } else if (this.facing == 'right') {
            this.eyes.animations.play('right');
        }
    }
}
