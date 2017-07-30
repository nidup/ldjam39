
declare var $: any;
declare var window: any;

export default class SoundManager {

    private Pd;
    private game;
    static instance: SoundManager;

    static ReceiverInitRoomtone = 'InitRoomtone';
    static ReceiverTexture = 'Texture';
    static ReceiverStartWalk = 'StartWalk';
    static ReceiverStopWalk = 'StopWalk';
    static ReceiverJump = 'Jump';
    static ReceiverLand = 'Land';
    static ReceiverShutdown = 'Shutdown';
    static ReceiverBox = 'Box';
    static ReceiverWin = 'Win';

    static ActionBang = 'bang';
    static FloorBeton: number = 1;
    static FloorMetal: number = 2;
    static FloorCarton: number = 3;
    static FloorWater: number = 4;

    public currentFloorType: number;

    public soundWalkBeton;
    public soundWalkMetal;
    public soundWalkCarton;
    public soundPickup;
    public soundShutdown;

    private soundsLandMetal = [];
    private soundsLandBeton = [];
    private soundsLandCarton = [];

    private isWalking = false;

    constructor(game: Phaser.Game) {
        this.Pd = window.Pd;
        this.game = game;
    }

    public init ()
    {
        this.soundWalkMetal = this.game.add.audio('walkMetal');
        this.soundWalkBeton = this.game.add.audio('walkBeton');
        this.soundWalkCarton = this.game.add.audio('walkCarton');

        for (var i = 0; i < 4; i++) {
            this.soundsLandMetal.push(this.game.add.audio('land_metal_' + i));
            this.soundsLandBeton.push(this.game.add.audio('land_beton_' + i));
            this.soundsLandCarton.push(this.game.add.audio('land_carton_' + i));
        }

        this.soundPickup = this.game.add.audio('pickup');
        this.soundShutdown = this.game.add.audio('shutdown');
    }

    public send(receiver: String, parameters: any)
    {
        switch (receiver) {
            case SoundManager.ReceiverTexture:
                var changedFloor = this.currentFloorType != parameters[0];
                this.currentFloorType = parameters[0];
                if (this.isWalking && changedFloor) {
                    SoundManager.instance.send(SoundManager.ReceiverStopWalk, [SoundManager.ActionBang]);
                    SoundManager.instance.send(SoundManager.ReceiverStartWalk, [SoundManager.ActionBang]);
                }

                return;
            case SoundManager.ReceiverLand:
                console.log('LANDING');
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
            case SoundManager.ReceiverBox:
                return this.soundPickup.play();
            case SoundManager.ReceiverShutdown:
                return this.soundShutdown.play();
            case SoundManager.ReceiverStartWalk:
                this.isWalking = true;
                switch (this.currentFloorType) {
                    case SoundManager.FloorBeton:
                        return this.soundWalkBeton.loopFull();
                    case SoundManager.FloorMetal:
                        return this.soundWalkMetal.loopFull();
                    case SoundManager.FloorCarton:
                        return this.soundWalkCarton.loopFull();
                }
                return;
            case SoundManager.ReceiverStopWalk:
                this.isWalking = false;
                this.soundWalkBeton.stop();
                this.soundWalkMetal.stop();
                this.soundWalkCarton.stop();
                return;
        }

        // this.Pd.send(receiver, parameters);
    }
}
