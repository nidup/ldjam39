
import {Hero} from "../Hero";

export default class Menu extends Phaser.State {

    private titleText : Phaser.BitmapText;
    private authorText : Phaser.BitmapText;
    private briefingTextLine1 : Phaser.BitmapText;
    private briefingTextLine2 : Phaser.BitmapText;
    private briefingTextLine3 : Phaser.BitmapText;
    private startText : Phaser.BitmapText;
    private hero: Phaser.Sprite;
    private door: Phaser.Sprite;
    private commandText : Phaser.BitmapText;
    private map;
    private layer;
    private background;
    private box;

    public create ()
    {
        this.game.stage.backgroundColor = '#1b1128';
        this.background = this.game.add.tileSprite(0, 0, 1280, 800, 'background', 0);
        this.background.loadTexture('background');

        this.map = this.game.add.tilemap('intro');
        this.map.addTilesetImage('tiles-1');

        this.layer = this.map.createLayer('Tile Layer 1', 1280, 800);
        this.layer.resizeWorld();


        let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);

        this.titleText = this.game.add.bitmapText(440, 150, 'carrier-command','Lionel\'s Weekend', 27);
        this.fadein(this.titleText);

        this.briefingTextLine1 = this.game.add.bitmapText(440, 250, 'carrier-command','Left / right keys to move', 12);
        this.fadein(this.briefingTextLine1);

        this.briefingTextLine2 = this.game.add.bitmapText(440, 290, 'carrier-command','Space bar to jump', 12);
        this.fadein(this.briefingTextLine2);

        this.briefingTextLine3 = this.game.add.bitmapText(440, 330, 'carrier-command','Up key to climb ladders', 12);
        this.fadein(this.briefingTextLine3);

        this.startText = this.game.add.bitmapText(440, 450, 'carrier-command','Press space to start', 12);
        this.startText.alpha = 0;
        //  Create our tween. This will fade the sprite to alpha 1 over the duration of 2 seconds
        const tween = this.game.add.tween(this.startText).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
        //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
        //  The 3000 tells it to wait for 3 seconds before starting the fade back.
        tween.yoyo(true, 1000);

        
        this.authorText = this.game.add.bitmapText(680, 780, 'carrier-command','Ludum Date #39 by grena, quentin, baptiste, nidup', 10);

        this.hero = this.game.add.sprite(500, 577, 'lionel', 0);
        this.hero.animations.add('idle', [0, 1], 2, true);
        this.hero.play('idle');

        this.door = this.game.add.sprite(20, 650, 'door', 0);
        this.door.animations.add('idle', [0, 1], 0.5, true);
        this.door.animations.play('idle');

        this.box = this.game.add.sprite(1220, 590, 'box', 0);
        this.box.animations.add('idle', [0, 1, 2], 3, true);
        this.box.animations.play('idle');
    }

    private fadein(text)
    {
        text.alpha = 0.1;
        this.game.add.tween(text).to( { alpha: 1 }, 2000, "Linear", true);
    }

    public startGame ()
    {
        this.game.state.start('Play');
    }

    public shutdown ()
    {
        this.titleText.destroy();
        this.authorText.destroy();
        this.briefingTextLine1.destroy();
        this.briefingTextLine2.destroy();
        this.briefingTextLine3.destroy();
        this.startText.destroy();
        this.hero.destroy();
        this.map.destroy();
        this.layer.destroy();
        this.background.destroy();
        this.door.destroy();
        this.box.destroy();
    }
}
