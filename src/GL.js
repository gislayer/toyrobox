

class Robot {

    constructor(row, col, facing) {
        this.x = 5;
        this.y = 5;
        this.row = row;
        this.col = col;
        this.facing = facing;
    }

    setRow(row) {
        if(row<=this.x && row>=1 ){
            this.row = row;
        }else{
            return false;
        }
    }

    getRow(){
        return this.row;
    }

    setCol(col) {
        this.col = col;
    }

    getCol(){
        return this.col;
    }

    setFacing(facing){
        const types = ["NORTH", "EAST", "SOUTH", "WEST"];
        if(types.indexOf(facing)!==-1){
            this.facing = facing;
        }else{
            return false;
        }
    }

    getFacing(){
        return this.facing;
    }

    command(command) {
        const parts = command.split(",");
        const arr = parts.map(part => part.trim().toUpperCase());
        var commanTypes = ["PLACE_ROBOT","PLACE_WALL", "MOVE", "LEFT", "RIGHT", "REPORT"];
        if(commanTypes.indexOf(arr[0])==-1){
            return false;
        }
        switch(arr[0]){
            case 'PLACE_ROBOT':{
                this.setRow(Number(arr[1]));
                this.setCol(Number(arr[2]));
                this.setFacing(parts[3].toUpperCase());
                break;
            }
            case 'PLACE_WALL':{
                break;
            }
            case 'REPORT':{
                break;
            }
            case 'MOVE':{
                break;
            }
            case 'LEFT':{
                break;
            }
            case 'RIGHT':{
                break;
            }
        }
    }
}