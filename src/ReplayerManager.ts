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
        if (replay instanceof String) {
            //TODO
            //解析获得到的JSON
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
     * @param e 要播放的实体
     */
    public play(name: string, e: Entity, afterReplay: (replay: Replay) => void = null) {
        if (this.replays.has(name)) {
            new Replayer(e).replay(this.replays.get(name), afterReplay)
        } else {
            throw new Error(`Not found! ${name}`);
        }
    }
}