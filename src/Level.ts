
import {RatPatrol} from "./RatPatrol";

export class Level
{
    private num: number;
    private startPosition: Phaser.Point;
    private boxPosition: Phaser.Point;
    private ratPatrols: RatPatrol[];
    private day: string;

    public constructor(num: number, startPosition: Phaser.Point, boxPosition: Phaser.Point, day: string, ratPatrols: RatPatrol[])
    {
        this.startPosition = startPosition;
        this.boxPosition = boxPosition;
        this.num = num;
        this.day = day;
        this.ratPatrols = ratPatrols;
    }

    public getStartPosition()
    {
        return this.startPosition;
    }

    public getDoorPosition()
    {
        return new Phaser.Point(this.startPosition.x - 45, this.startPosition.y-2);
    }

    public getColleaguePosition()
    {
        return new Phaser.Point(this.startPosition.x - 50, this.startPosition.y + 5);
    }

    public getBoxPosition()
    {
        return this.boxPosition;
    }

    public getNum(): number
    {
        return this.num;
    }

    public getDay(): string
    {
        return this.day;
    }

    public getRatPatrols(): RatPatrol[]
    {
        return this.ratPatrols;
    }
}