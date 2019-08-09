import bullet from "../prefab/bullet";
import { GameConfig } from "../common/score";


const { ccclass, property } = cc._decorator;

@ccclass
export default class play extends cc.Component {
    @property(cc.Prefab)
    ufoPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property(cc.Node)
    tank: cc.Node = null;

    @property(cc.Node)
    iniBullet: cc.Node = null;

    @property([cc.Node])
    iniUfoArr: Array<cc.Node> = [];

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    time: number = 10;

    flag: number = 0;

    count :number = 0;
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.vecToDegress.bind(this));
        // this.schedule(function () {
        //     self.iniTarget();
        // }, interval);
        // this.schedule(function(){
        //     self.time --;
        //     if(self.time == 0 ){
        //         cc.director.loadScene("overScene");
        //     }
        //     
        // },1,10);
        this.scoreLabel.string = "Score:" + GameConfig.getScore();


     
        // this.schedule(this.callback, 1);

    }
    // callback(){
    //     if (GameConfig.getScore() >= 3 ) {
    //         this.unschedule(this.callback);
    //         this.schedule(this.callbackTwo, 0.5);
    //     }  
    //     this.iniTarget();  
    // }

    // callbackTwo(){
    //     if (GameConfig.getScore() >6 ) {
    //         this.unschedule(this.callbackTwo);
    //     }
    //     this.iniTarget(); 
    // }

    start() {

    }

    vecToDegress(event) {
        let startPos = this.tank.getPosition();
        let startToworldPos = this.node.convertToWorldSpaceAR(startPos);
        let dx = event.getLocation().x - startToworldPos.x;
        let dy = event.getLocation().y - startToworldPos.y;
        let dir = cc.v2(dx, dy);
        //根据朝向计算出夹角弧度
        var angle = dir.signAngle(cc.v2(0, 1));
        //将弧度转换为欧拉角
        let degree = angle / Math.PI * 180;
        this.tank.rotation = degree;
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.parent = this.node;
        let p = this.iniBullet.parent.convertToWorldSpaceAR(this.iniBullet.getPosition());
        let pos = this.node.convertToNodeSpaceAR(p);
        bullet.x = pos.x;
        bullet.y = pos.y;
        cc.systemEvent.emit('getTouchNode', {
            point: cc.v2(event.getLocation().x, event.getLocation().y)
        });
    }

    iniTarget() {
        let dir = Math.floor(Math.random() * 8);
        let ufoNode = cc.instantiate(this.ufoPrefab);
        if (dir == 0) {
            this.iniUfoArr[0].addChild(ufoNode);
            let action = cc.moveTo(3.5, cc.v2(670, -376));
            ufoNode.runAction(action);
        }
        else if (dir == 1) {
            this.iniUfoArr[1].addChild(ufoNode);
            let action = cc.moveTo(4, cc.v2(0, -376));
            ufoNode.runAction(action);
        }
        else if (dir == 2) {
            this.iniUfoArr[2].addChild(ufoNode);
            let action = cc.moveTo(3.5, cc.v2(-670, -376));
            ufoNode.runAction(action);
        }
        else if (dir == 3) {
            this.iniUfoArr[3].addChild(ufoNode);
            let action = cc.moveTo(3, cc.v2(670, 0));
            ufoNode.runAction(action);
        }
        else if (dir == 4) {
            this.iniUfoArr[4].addChild(ufoNode);
            let action = cc.moveTo(3.5, cc.v2(-670, 0));
            ufoNode.runAction(action);
        }
        else if (dir == 5) {
            this.iniUfoArr[5].addChild(ufoNode);
            let action = cc.moveTo(3.5, cc.v2(670, 376));
            ufoNode.runAction(action);
        }
        else if (dir == 6) {
            this.iniUfoArr[6].addChild(ufoNode);
            let action = cc.moveTo(4, cc.v2(0, 376));
            ufoNode.runAction(action);
        }
        else if (dir == 7) {
            this.iniUfoArr[7].addChild(ufoNode);
            let action = cc.moveTo(3.5, cc.v2(-670, 376));
            ufoNode.runAction(action);
        }
    }

    update(dt) {
        this.scoreLabel.string = "Score:" + GameConfig.getScore();
        this.flag++;
        if (GameConfig.getScore() >= 0 && GameConfig.getScore() <= 10) {
            if (this.flag % 60 === 0) {
                this.iniTarget();
            }
        }
        else if (GameConfig.getScore() > 10 && GameConfig.getScore() <= 20) {
            if (this.flag % 50 === 0) {
                this.iniTarget();
            }
        }
        else if (GameConfig.getScore() > 20 && GameConfig.getScore() <= 30) {
            if (this.flag % 40 === 0) {
                this.iniTarget();
            }
        }
        else if (GameConfig.getScore() > 30 && GameConfig.getScore() <= 40) {
            if (this.flag % 30 === 0) {
                this.iniTarget();
            }
        }
        else if (GameConfig.getScore() > 40) {
            if (this.flag % 27 === 0) {
                this.iniTarget();
            }
        }
    }
}
