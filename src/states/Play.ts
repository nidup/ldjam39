
import {Hero} from "../Hero";
import {Box} from "../Box";
import SoundManager from "../SoundManager";
import {Level} from "../Level";
import {Door} from "../Door";

export default class Play extends Phaser.State
{
    private blackout: boolean = false;
    private changingLevel = false;
    private levels: Level[];
    private levelNumber: number = 0;
    private hero: Hero;
    private box: Box;
    private door: Door;
    private map;
    private layer;
    private background;
    private debug: boolean = false;
    //private briefingText : Phaser.BitmapText;

    public create()
    {
        if (this.debug) {
            this.game.time.advancedTiming = true
        }
        this.game.stage.backgroundColor = '#9badb7';

//        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background-night');
        this.background = this.game.add.tileSprite(0, 0, 1280, 800, 'background');
        this.background.loadTexture('background');
//        this.background.fixedToCamera = true;

        //this.briefingText = this.game.add.bitmapText(40, 40, 'carrier-command','Night has come, Let\'s collect underpants!', 10);
        //this.briefingText.fixedToCamera = true;

        this.levels = [
            new Level(1, new Phaser.Point(80, 700), new Phaser.Point(1200, 700)),
            new Level(2, new Phaser.Point(80, 700), new Phaser.Point(1100, 550)),
            new Level(3, new Phaser.Point(80, 700), new Phaser.Point(1200, 700))
        ];

        this.startNewLevel();
        this.game.camera.follow(this.hero);

        SoundManager.instance.send('InitRoomtone', ['bang']);
    }

    private startNewLevel()
    {
        if (this.changingLevel == true && this.blackout == true) {
            return;
        }
        this.changingLevel = true;
        const level = this.levels[this.levelNumber];
        this.levelNumber++;

        if (this.hero) {
            this.hero.destroy(true);
            this.box.destroy(true);
            this.door.destroy(true);
        }



        this.map = this.game.add.tilemap('level'+level.getNum());
        this.map.addTilesetImage('tiles-1');
        this.map.setCollision(
            [
                1, 2, 3, 4, 5, 6, 7,
                12, 13, 17,
                21, 22, 23, 24, 25, 26, 27,
                32, 33,
                42
            ]
        );

        this.layer = this.map.createLayer('Tile Layer 1');
        if (this.debug) {
            this.layer.debug = true;
        }
        this.layer.resizeWorld();
        this.game.physics.arcade.gravity.y = 350;

        this.box = new Box(this.game, level.getBoxPosition().x, level.getBoxPosition().y, 'gnome', 0);
        this.door = new Door(this.game, level.getDoorPosition().x, level.getDoorPosition().y, 'door', 0);
        this.hero = new Hero(this.game, level.getStartPosition().x, level.getStartPosition().y, 'lionel', 0, this.game.input.keyboard);

        this.blackout = false;
        this.changingLevel = false;
    }

    public update()
    {
        this.game.physics.arcade.collide(this.hero, this.layer, function (hero: Hero, tile) {
            hero.changeFloor(tile.index);

            // Handle the fact that the hero may be in the air, so, handle landing
            if (!hero.wasOnFloor && !hero.body.onWall()) {
                hero.lands();
                hero.wasOnFloor = true;
            }
        });
        this.hero.update();

        this.game.physics.arcade.collide(this.box, this.layer);
        this.box.update();

        this.game.physics.arcade.collide(this.hero, this.box, function () {
            SoundManager.instance.send(SoundManager.ReceiverBox, [SoundManager.ActionBang]);
            this.box.destroy();
            var s = this.game.add.sprite(0, 0, 'blackout');
            s.alpha = 0.75;
            this.blackout = true;
        }, null, this);

        this.game.physics.arcade.collide(this.hero, this.door, function () {
            if (this.blackout) {
               console.log('nex level');
               this.startNewLevel()
            }
        }.bind(this), null, this);
    }

    public render()
    {
        if (this.debug) {
            this.game.debug.body(this.hero);
            this.game.debug.body(this.box);
            this.game.debug.body(this.door);
            this.game.debug.text(
                "FPS: "  + this.game.time.fps + " ",
                2,
                14,
                "#00ff00"
            );
        }
    }
}
