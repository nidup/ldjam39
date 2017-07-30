
export class Colleague extends Phaser.Sprite {

    private originX: number;
    private originY: number;
    private finishX: number;
    public weekendText1 : Phaser.BitmapText;
    public weekendText2 : Phaser.BitmapText;

    constructor(dayGroup: Phaser.Group, x: number, y: number, key: string, frame: number) {
        super(dayGroup.game, x, y, key, frame);

        this.originX = x;
        this.originY = y;
        this.finishX = x;

        this.anchor.setTo(.5,.5);

        this.animations.add('idle', [0, 1], 2, true);
        this.animations.add('right', [4, 5, 6, 7], 6, true);

        this.weekendText1 = this.game.add.bitmapText(210, 330, 'carrier-command', 'Somebody is here?', 10, dayGroup);
        this.weekendText1.alpha = 0;

        this.weekendText2 = this.game.add.bitmapText(210, 330, 'carrier-command', 'No? Anyway, weekend time!', 10, dayGroup);
        this.weekendText2.alpha = 0;

        this.alpha = 0;
        dayGroup.add(this);
    }

    public switchOffTheLight (onceSwitchedOffCallback)
    {
        this.alpha = 1;
        this.animations.play('right');
        const tween = this.game.add.tween(this).to( { x: this.x + 40 }, 500, 'Linear', true);
        tween.onComplete.addOnce(function(){
            this.animations.play('idle');

            this.weekendText1.alpha = 1;
            this.weekendText1.x = this.x - 10;
            this.weekendText1.y = this.y - 50;
            const duration = 4000;
            const tweenText = this.game.add.tween(this.weekendText1).to( { alpha: 0.5 }, duration, "Linear", true);
            tweenText.onComplete.addOnce(function(){
                this.weekendText1.alpha = 0;
                this.weekendText2.alpha = 1;
                this.weekendText2.x = this.x - 10;
                this.weekendText2.y = this.y - 50;
                const duration = 4000;
                this.game.add.tween(this.weekendText2).to( { alpha: 0.5 }, duration, "Linear", true);
                const tweenText2 = this.game.add.tween(this.weekendText2).to( { alpha: 0 }, duration, "Linear", true);
                tweenText2.onComplete.addOnce(onceSwitchedOffCallback);

            }.bind(this));

        }.bind(this));
    }

}
