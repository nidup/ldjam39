
export class Terminal extends Phaser.Sprite {

    private limitLeftX: number;
    private limitRightX: number;
    private distance: number = 30;
    private facing: string;

    public screen: Phaser.Sprite;

    constructor(group: Phaser.Group, nightGroup: Phaser.Group, x: number, y: number, key: string, frame: number) {
        super(group.game, x, y, key, frame);

        this.limitLeftX = x - this.distance;
        this.limitRightX = x + this.distance;

        this.anchor.setTo(.5,.5);
        group.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.collideWorldBounds = true;
        this.body.setSize(40, 80, 6, 16);
        this.animations.add('idle', [0, 1, 2, 3], 3, true);
        this.animations.play('idle');

        this.facing = 'left';
        this.body.allowGravity = false;

        this.body.velocity.set(0, 0);
        this.body.immovable = true;
        this.body.moves = false;

        group.add(this);

        this.alpha = 1;

        this.screen = this.game.add.sprite(this.x, this.y, 'terminal', 0, nightGroup);
        this.screen.anchor.setTo(.5,.5);
        this.screen.animations.add('idle', [4, 5, 6, 7], 3, true);
        this.screen.animations.play('idle');
        this.screen.alpha = 0;
    }

    public byNight()
    {
        this.screen.alpha = 1;
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
