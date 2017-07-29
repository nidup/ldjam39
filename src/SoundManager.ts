
declare var $: any;
declare var window: any;

export default class SoundManager {

    private Pd;
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
    static FloorBeton = 1;
    static FloorMetal = 2;
    static FloorCarton = 3;
    static FloorWater = 4;

    constructor() {
        this.Pd = window.Pd;
    }

    public init ()
    {
        $.get('assets/puredata/maintest.pd', function(main) {
            this.Pd.loadPatch(main);
            this.Pd.start();
        }.bind(this));
    }

    public send(receiver: String, parameters: any)
    {
        this.Pd.send(receiver, parameters);
    }
}
