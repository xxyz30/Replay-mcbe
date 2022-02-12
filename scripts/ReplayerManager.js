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
        if (typeof replay == 'string') {
            //TODO
            //解析获得到的JSON
            let replayInstance = JSON.parse(replay);
            this.replays.set(replayInstance.name, replayInstance);
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
     * @param afterReplay 执行完毕后的回调
     * @param afterReplayVar 因为不知道何时执行完毕，所以用于存值
     * @param e 要播放的实体
     */
    play(name, e, afterReplay = null, afterReplayVar = null) {
        if (this.replays.has(name)) {
            new Replayer(e).replay(this.replays.get(name), afterReplay, afterReplayVar);
        }
        else {
            throw new Error(`Not found! ${name}`);
        }
    }
}
