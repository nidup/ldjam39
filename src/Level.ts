
export class Level
{
    private num: number;
    private startPosition: Phaser.Point;
    private boxPosition: Phaser.Point;

    public constructor(num: number, startPosition: Phaser.Point, boxPosition: Phaser.Point)
    {
        this.startPosition = startPosition;
        this.boxPosition = boxPosition;
        this.num = num;
    }

    public getStartPosition()
    {
        return this.startPosition;
    }

    public getDoorPosition()
    {
        return new Phaser.Point(this.startPosition.x - 45, this.startPosition.y-2);
    }

    public getBoxPosition()
    {
        return this.boxPosition;
    }

    public getNum(): number
    {
        return this.num;
    }
}