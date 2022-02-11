import { Entity, TickEvent, world, Location } from "mojang-minecraft";
import { Replay } from "./types.js";

/**
 * 回放机
 */
export class Replayer {
    private replayEntity: Entity = null
    private replayIndex: number = 0
    private playing: boolean
    private replaying: Replay = null
    private afterReplay: (replay: Replay) => void
    private bindFun = this.play.bind(this)
    /**
     * 构造
     * @param e 要回放的实体
     */
    public constructor(e: Entity) {
        if (e == null) throw new Error("Null Entity!")
        this.replayEntity = e
    }
    /**
     * 播放录像
     * @param replay 录像
     */
    public replay(replay: Replay, afterReplay: (replay: Replay) => void = null) {
        if (this.playing || replay == null || replay.replay == null || replay.replay.length == 0) return
        this.replayIndex = 0;
        this.replaying = replay
        this.afterReplay = afterReplay
        world.events.tick.subscribe(this.bindFun)
    }
    private play(e: TickEvent) {
        let replay: number[] = this.replaying.replay[this.replayIndex++]
        this.replayEntity.teleport(this.getLocation(replay), this.replayEntity.dimension, replay[3], replay[4])
        if (this.replaying.replay.length <= this.replayIndex) {
            world.events.tick.unsubscribe(this.bindFun)
            //回调
            if (this.afterReplay != null) this.afterReplay(this.replaying)
        }
    }
    private getLocation(n: number[]): Location {
        return new Location(n[0], n[1], n[2])
    }
}