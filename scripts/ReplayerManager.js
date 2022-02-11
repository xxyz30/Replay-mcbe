import { Replayer } from "./replayer.js";
import { Replay } from "./types.js";
/**
 * 回放器管理器
 */
export class ReplayerManager {
    constructor() {
        this.replays = new Map();
    }
    /**
     * 添加 回放
     * @param replay
     */
    addReplay(replay) {
        if (replay instanceof String) {
            //TODO
            //解析获得到的JSON
        }
        else if (replay instanceof Replay) {
            this.replays.set(replay.name, replay);
        }
    }
    /**
     * 添加映射关系的回放
     * @param map
     */
    addReplayMap(map) {
        map.forEach((v, k) => this.replays.set(k, v));
    }
    /**
     * 播放
     * @param name 播放id
     * @param e 要播放的实体
     */
    play(name, e, afterReplay = null) {
        if (this.replays.has(name)) {
            new Replayer(e).replay(this.replays.get(name), afterReplay);
        }
        else {
            throw new Error(`Not found! ${name}`);
        }
    }
}
