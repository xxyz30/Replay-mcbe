import { Replay } from "./types.js";
import { world } from 'mojang-minecraft';
/**
 * 记录摄像机的类
 */
export class Recorder {
    /**
     * 构造
     * @param e 需要录制的实体
     */
    constructor(e) {
        this.recordingEntity = null;
        this.video = new Map();
        this.starting = false;
        this.recording = null;
        this.bindFun = this.record.bind(this);
        if (e == null)
            throw new Error("Null Entity!");
        this.recordingEntity = e;
    }
    /**
     * 开始录制
     */
    start(name) {
        if (this.starting)
            return;
        this.starting = true;
        this.recording = new Replay();
        this.recording.name = name;
        world.events.tick.subscribe(this.bindFun);
    }
    /**
     * 结束录制并保存
     */
    end() {
        if (!this.starting)
            return;
        this.starting = false;
        world.events.tick.unsubscribe(this.bindFun);
        this.video.set(this.recording.name, this.recording);
        return this.recording;
    }
    /**
     * 暂停录制
     */
    stop() {
        if (!this.starting)
            return;
        this.starting = false;
        world.events.tick.unsubscribe(this.bindFun);
    }
    /**
     * 继续录制
     */
    continue() {
        if (this.starting)
            return;
        this.starting = true;
        world.events.tick.subscribe(this.bindFun);
    }
    record(e) {
        //录制
        if (this.starting) {
            this.recording.replay.push(this.getEntityPosRot(this.recordingEntity));
        }
    }
    getAllRecord() {
        return this.video;
    }
    getEntityPosRot(e) {
        let l = e.location;
        return [l.x, l.y, l.z, this.getPlayerYRotation(e.viewVector.y), e.bodyRotation];
    }
    getPlayerYRotation(y) {
        return Math.asin(y) * (-180 / Math.PI);
    }
}
