import { world, Location } from "mojang-minecraft";
/**
 * 回放机
 */
export class Replayer {
    /**
     * 构造
     * @param e 要回放的实体
     */
    constructor(e) {
        this.replayEntity = null;
        this.replayIndex = 0;
        this.replaying = null;
        this.afterReplayVar = null;
        this.bindFun = null;
        if (e == null)
            throw new Error("Null Entity!");
        this.replayEntity = e;
        this.bindFun = this.play.bind(this);
    }
    /**
     * 播放录像
     * @param replay 录像
     */
    replay(replay, afterReplay = null, afterReplayVar = null) {
        if (this.playing || replay == null || replay.replay == null || replay.replay.length == 0)
            return;
        this.replayIndex = 0;
        this.replaying = replay;
        this.afterReplay = afterReplay;
        this.afterReplayVar = afterReplayVar;
        world.events.tick.subscribe(this.bindFun);
    }
    play(e) {
        let replay = this.replaying.replay[this.replayIndex++];
        this.replayEntity.teleport(this.getLocation(replay), this.replayEntity.dimension, replay[3], replay[4]);
        //当录像的内容<=当前播放的index
        if (this.replaying.replay.length <= this.replayIndex) {
            world.events.tick.unsubscribe(this.bindFun);
            if (this.afterReplay != null)
                this.afterReplay(this.afterReplayVar, this.replayEntity, this.replaying);
        }
    }
    getLocation(n) {
        return new Location(n[0], n[1], n[2]);
    }
}
