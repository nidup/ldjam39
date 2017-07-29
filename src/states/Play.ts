
import {Hero} from "../Hero";
import {Box} from "../Box";
import SoundManager from "../SoundManager";
import {Level} from "../Level";
import {Door} from "../Door";

//import * as Pd from "../lib/webpd-latest.min.js";

export default class Play extends Phaser.State
{
    private blackout: boolean = false;
    private level: Level;
    private hero: Hero;
    private box: Box;
    private door: Door;
    private map;
    private layer;
    private background;
    private debug: boolean = true;
    // private briefingText : Phaser.BitmapText;

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

        // this.briefingText = this.game.add.bitmapText(40, 40, 'carrier-command','Night has come, Let\'s collect underpants!', 10);
        // this.briefingText.fixedToCamera = true;

        this.level = new Level(new Phaser.Point(5, 700));

        this.map = this.game.add.tilemap('level1');
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

        this.hero = new Hero(this.game, this.level.getStartPosition().x, this.level.getStartPosition().y, 'lionel', 0, this.game.input.keyboard);
        this.box = new Box(this.game, 1200, 700, 'gnome', 0);
        this.door = new Door(this.game, this.level.getStartPosition().x, this.level.getStartPosition().y, 'gnome', 0);
        this.game.camera.follow(this.hero);

        SoundManager.instance.send('InitRoomtone', ['bang']);
    }

    public update()
    {
        this.game.physics.arcade.collide(this.hero, this.layer, function (hero: Hero, tile) {
            hero.changeFloor(tile.index);
        });
        this.hero.update();

        this.game.physics.arcade.collide(this.box, this.layer);
        this.box.update();

        this.game.physics.arcade.collide(this.hero, this.box, function () {
            SoundManager.instance.send('sample', ['bang']);
            this.box.destroy();
            var s = this.game.add.sprite(0, 0, 'blackout');
            s.alpha = 0.75;
            this.blackout = true;
        }, null, this);

        this.game.physics.arcade.collide(this.hero, this.door, function () {
            if (this.blackout) {
               console.log('nex level');
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
