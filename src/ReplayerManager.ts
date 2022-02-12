import { Entity } from "mojang-minecraft";
import { Replayer } from "./replayer.js";
import { Replay } from "./types.js";

/**
 * 回放器管理器
 */
export class ReplayerManager {
    private replays: Map<string, Replay> = new Map()

    /**
     * 添加 回放
     * @param replay 
     */
    public addReplay(replay: string | Replay) {
        if (typeof replay == 'string') {
            //TODO
            //解析获得到的JSON
            let replayInstance: Replay = JSON.parse(replay)
            this.replays.set(replayInstance.name, replayInstance)
        } else if (replay instanceof Replay) {
            this.replays.set(replay.name, replay)
        }
    }
    /**
     * 添加映射关系的回放
     * @param map 
     */
    public addReplayMap(map: Map<string, Replay>) {
        map.forEach((v, k) => this.replays.set(k, v))
    }

    /**
     * 播放
     * @param name 播放id
     * @param afterReplay 执行完毕后的回调
     * @param afterReplayVar 因为不知道何时执行完毕，所以用于存值
     * @param e 要播放的实体
     */
    public play<T>(name: string, e: Entity, afterReplay: (v: T, entity: Entity, replay: Replay) => void = null, afterReplayVar: T = null) {
        if (this.replays.has(name)) {
            new Replayer(e).replay(this.replays.get(name), afterReplay, afterReplayVar)
        } else {
            throw new Error(`Not found! ${name}`);
        }
    }
}