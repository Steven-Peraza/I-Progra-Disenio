
export default class pieza {
    private player: number;
    // private img: string;
    private pos: Array<number>;

    constructor( playo:number, /*pack: string,*/ row: number, col: number) {
        // this.img = pack;
        this.player = playo;
        this.pos = new Array(2);
        this.pos = [row,col];
    }

    /*getImg() {
        return this.img;
    }*/

    getPlayer() {
        return this.player;
    }

    getPos() {
        return this.pos;
    }
}