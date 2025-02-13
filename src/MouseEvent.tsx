import UserEvent from "./UserEvent";

class MouseEvent implements UserEvent {
    constructor(s: string, t: number, x: number, y:number) {
        this.state = s;
        this.time = t;
        this.x_pos = x;
        this.y_pos = y; 
    }

    state: string;
    time: number;
    x_pos: number;
    y_pos: number;
}

export default MouseEvent;