import { Replay } from "./types.js";
import { Entity, EntityInventoryComponent, TickEvent, world, Location } from 'mojang-minecraft'

/**
 * 记录摄像机的类
 */
export class Recorder {
    private recordingEntity: Entity = null;
    private video: Map<string, Replay> = new Map()
    private starting: boolean = false
    private recording: Replay = null
    private bindFun = this.record.bind(this)
    /**
     * 构造
     * @param e 需要录制的实体
     */
    public constructor(e: Entity) {
        if (e == null) throw new Error("Null Entity!")
        this.recordingEntity = e
    }
    /**
     * 开始录制
     */
    public start(name: string): void {
        if (this.starting) return
        this.starting = true
        this.recording = new Replay()
        this.recording.name = name
        world.events.tick.subscribe(this.bindFun)
    }
    /**
     * 结束录制并保存
     */
    public end(): Replay {
        if (!this.starting) return
        this.starting = false
        world.events.tick.unsubscribe(this.bindFun)
        this.video.set(this.recording.name, this.recording)
        return this.recording
    }
    /**
     * 暂停录制
     */
    public stop(): void {
        if (!this.starting) return
        this.starting = false
        world.events.tick.unsubscribe(this.bindFun)
    }
    /**
     * 继续录制
     */
    public continue(): void {
        if (this.starting) return
        this.starting = true
        world.events.tick.subscribe(this.bindFun)
    }
    private record(e: TickEvent) {
        //录制
        if (this.starting) {
            this.recording.replay.push(this.getEntityPosRot(this.recordingEntity))
        }
    }
    public getAllRecord(): Map<string, Replay> {
        return this.video
    }

    private getEntityPosRot(e: Entity): number[] {
        let l = e.location
        return [l.x, l.y, l.z, this.getPlayerYRotation(e.viewVector.y), e.bodyRotation]
    }
    private getPlayerYRotation(y: number): number {
        return Math.asin(y) * (-180 / Math.PI)
    }

}