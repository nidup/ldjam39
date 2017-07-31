
export default class SoundManager {

    private game;
    static instance: SoundManager;

    static AmbientDay = 'AmbientDay';
    static AmbientNight = 'Night';

    static ChangeFloor = 'Texture';
    static StartWalk = 'StartWalk';
    static StopWalk = 'StopWalk';
    static Jump = 'Jump';
    static Landing = 'Land';
    static Shutdown = 'Shutdown';
    static PickBox = 'Box';
    static StartClimbing = 'Ladder';
    static StopClimbing = 'LadderStop';
    static DoorClose = 'Door';

    static FloorBeton: number = 1;
    static FloorMetal: number = 2;
    static FloorCarton: number = 3;

    public currentFloorType: number;

    public soundWalkBeton;
    public soundWalkMetal;
    public soundWalkCarton;
    public soundClimbing;

    public soundPickup;
    public soundShutdown;

    private soundsLandMetal = [];
    private soundsLandBeton = [];
    private soundsLandCarton = [];

    private soundDay;
    private soundNight;

    private soundsEvent = [];
    private nextEventTime = 0;

    private soundDoor;

    private isWalking = false;

    constructor(game: Phaser.Game) {
        this.game = game;
    }

    public init ()
    {
        this.soundWalkMetal = this.game.add.audio('walkMetal');
        this.soundWalkBeton = this.game.add.audio('walkBeton');
        this.soundWalkCarton = this.game.add.audio('walkCarton');
        this.soundClimbing = this.game.add.audio('ladder');
        this.soundDay = this.game.add.audio('day');
        this.soundNight = this.game.add.audio('night');
        this.soundDoor = this.game.add.audio('door');

        for (var i = 0; i < 4; i++) {
            this.soundsLandMetal.push(this.game.add.audio('land_metal_' + i));
            this.soundsLandBeton.push(this.game.add.audio('land_beton_' + i));
            this.soundsLandCarton.push(this.game.add.audio('land_carton_' + i));
        }

        for (var i = 0; i < 6; i++) {
            this.soundsEvent.push(this.game.add.audio('event_' + i));
        }

        this.soundPickup = this.game.add.audio('pickup');
        this.soundShutdown = this.game.add.audio('shutdown');
    }

    public send(receiver: String, parameters: any = null)
    {
        switch (receiver) {
            case SoundManager.ChangeFloor:
                var changedFloor = this.currentFloorType != parameters[0];
                this.currentFloorType = parameters[0];
                if (this.isWalking && changedFloor) {
                    SoundManager.instance.send(SoundManager.StopWalk);
                    SoundManager.instance.send(SoundManager.StartWalk);
                }

                return;
            case SoundManager.Landing:
                var rand = Math.floor(Math.random() * (3));
                switch (this.currentFloorType) {
                    case SoundManager.FloorBeton:
                        return this.soundsLandBeton[rand].play();
                    case SoundManager.FloorMetal:
                        return this.soundsLandMetal[rand].play();
                    case SoundManager.FloorCarton:
                        return this.soundsLandCarton[rand].play();
                }
                return;
            case SoundManager.PickBox:
                return this.soundPickup.play();
            case SoundManager.Shutdown:
                return this.soundShutdown.play();
            case SoundManager.StartWalk:
                this.isWalking = true;
                switch (this.currentFloorType) {
                    case SoundManager.FloorBeton:
                        return this.soundWalkBeton.loopFull(4);
                    case SoundManager.FloorMetal:
                        return this.soundWalkMetal.loopFull(4);
                    case SoundManager.FloorCarton:
                        return this.soundWalkCarton.loopFull(4);
                }
                return;
            case SoundManager.StopWalk:
                this.isWalking = false;
                this.soundWalkBeton.stop();
                this.soundWalkMetal.stop();
                this.soundWalkCarton.stop();
                return;
            case SoundManager.AmbientDay:
                this.soundNight.stop();
                return this.soundDay.loopFull(5);
            case SoundManager.AmbientNight:
                this.soundDay.stop();
                return this.soundNight.loopFull(5);
            case SoundManager.StartClimbing:
                return this.soundClimbing.loopFull(3);
            case SoundManager.StopClimbing:
                return this.soundClimbing.stop();
            case SoundManager.DoorClose:
                return this.soundDoor.play('', 0, 4);
        }
    }

    public playRandomEvent()
    {
        if (this.game.time.now >= this.nextEventTime) {
            var min = 12;
            var max = 25;
            let randSound = Math.floor(Math.random() * (6));
            let randNext = Math.floor(Math.random() * (max - min + 1)) + min;

            this.soundsEvent[randSound].play('', 0, 0.7);
            this.nextEventTime = this.game.time.now + (randNext * 1000);
        }
    }
}
