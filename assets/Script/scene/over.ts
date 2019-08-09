import { GameConfig } from "../common/score";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        GameConfig
         this.scoreLabel.string  = "得分:"+GameConfig.getScore();
     }
    replayClick(){
        GameConfig.clearScore();
        cc.director.loadScene("playScene");
    };
    backClick(){
        cc.director.loadScene("hallScene");
    }
    start () {

    }

    // update (dt) {}
}
