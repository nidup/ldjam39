
export class Box extends Phaser.Sprite {

    private limitLeftX: number;
    private limitRightX: number;
    private distance: number = 30;
    private facing: string;

    constructor(group: Phaser.Group, x: number, y: number, key: string, frame: number) {
        super(group.game, x, y, key, frame);

        this.limitLeftX = x - this.distance;
        this.limitRightX = x + this.distance;

        this.anchor.setTo(.5,.5);
        group.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.bounce.y = 0.2;
        this.body.collideWorldBounds = true;
        this.body.setSize(18, 16, 8, 16);
        this.animations.add('blink', [0, 1, 2], 3, true);

        this.animations.play('blink');

        this.facing = 'left';

        this.body.velocity.set(0, 0);
        this.body.immovable = true;
        this.body.moves = false;

        group.add(this);
    }

    public update ()
    {
        // if (this.x < this.limitLeftX) {
        //     this.facing = 'right';
        // } else if (this.x > this.limitRightX) {
        //     this.facing = 'left';
        // }
        //
        // if (this.facing == 'left') {
        //     this.animations.play('left');
        //     this.body.velocity.x = -this.speed;
        //
        // } else if (this.facing == 'right') {
        //     this.animations.play('right');
        //     this.body.velocity.x = this.speed;
        // }
    }
}
