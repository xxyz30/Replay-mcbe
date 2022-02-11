import { world } from "mojang-minecraft";
import { Recorder } from "./recorder.js";
import { ReplayerManager } from "./ReplayerManager.js";
// world.events.tick.subscribe(e => {
//     for(let i of world.getPlayers()){
//         i.getTags().forEach(tag => {
//             if(tag.startsWith("req"))
//         })
//     }
// })
let rec = null;
let manager = new ReplayerManager();
world.events.beforeChat.subscribe(e => {
    let strs = e.message.split(" ");
    if (strs.length > 1) {
        switch (strs[0]) {
            case 'start':
                if (rec != null)
                    return;
                //录制开始
                rec = new Recorder(e.sender);
                rec.start(strs[1]);
                e.sender.runCommand("say 录制开始");
                break;
            case 'end':
                //录制结束
                manager.addReplay(rec.end());
                rec = null;
                e.sender.runCommand("say 录制结束");
                break;
            case 'play':
                manager.play(strs[1], e.sender, () => {
                    e.sender.runCommand("say 完成");
                });
        }
    }
});
