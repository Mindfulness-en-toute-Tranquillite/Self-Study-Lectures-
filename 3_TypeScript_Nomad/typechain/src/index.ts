// import * as crypto from "crypto"
import crypto from "crypto"; //tsconfig.json 에 "esModuleInterop": true 추가 및 "allowJs": true, 삭제. 이렇게 import 가능.
interface BlockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape{
    public hash: string;
    constructor(
        public prevHash:string,
        public height:number,
        public data:string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash:string, height:number, data:string){
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex")
    }
} 