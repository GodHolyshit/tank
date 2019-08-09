import { GameConfig } from "../common/score";

// import play from "../playScene/play";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class bullet extends cc.Component {

    bulletMoveSpeed = 6;
    worldPos = cc.v2(0, 0);
    touchPos = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.systemEvent.on('getTouchNode', this.getTouchNode, this);
        this.worldPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
    }

    onDestroy() {
        cc.systemEvent.off('getTouchNode', this.getTouchNode, this);
    }

    start() {

    }

    onCollisionEnter(other, self) {
        if (other.node.group == "wall") {
            self.node.destroy();
        }
        if (other.node.group == "ufo") {
            GameConfig.setScore();
            other.node.destroy();
            self.node.destroy();
        }
    }

    getTouchNode(event) {       
        if (!this.touchPos) {           
            this.touchPos = event.point;   
        }
    }

    update(dt) {
        if (!this.touchPos) {
            return;
        }
        var dx = this.touchPos.x - this.worldPos.x;
        var dy = this.touchPos.y - this.worldPos.y;
        var dir = cc.v2(dx, dy);
        var angle = dir.signAngle(cc.v2(0, 1));
        var degree = angle / Math.PI * 180 - 90;
        this.node.rotation = degree;
        this.bulletMoveSpeed += dt * 3;
        this.node.x += dt * dir.x * this.bulletMoveSpeed;
        this.node.y += dt * dir.y * this.bulletMoveSpeed;
    }
}
