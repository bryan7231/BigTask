import UserEvent from "./UserEvent";

class KeyboardEvent implements UserEvent {
    constructor(s:string, t:number, k:number) {
        this.state = s;
        this.time = t;
        this.key = k; 
    }

    state: string;
    time: number;
    key: number; 
}

export default KeyboardEvent;