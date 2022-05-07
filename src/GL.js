

export class Board{
    constructor(rowCount,colCount){
        debugger;
        this.width = rowCount-1;
        this.height = colCount-1;
        this.wallLocations = [];
    }

    isInTheArea(x,y){
        debugger;
        if(x < 0 || x >= this.width || y < 0 || y >= this.height){
            return false;
        }else{
            return true;
        }
    }

    isEmpty(x,y){
        debugger;
        var filter = this.wallLocations.filter(wall => wall[0] === x && wall[1] === y);
        if(filter.length === 0){
            return true;
        }else{
            return false;
        }
    }
    
    addNewWall(rowNum,colNum){
        debugger;
        const x = rowNum-1;
        const y = colNum-1;
        if(this.isInTheArea(x,y)===false){
            return false;
        }
        if(this.isEmpty(x,y)){
            this.wallLocations.push([x,y]);
        }else{
            return false;
        }
    }
}

export class Robot {
    constructor() {
        this.x=null;
        this.y=null;
        this.facing=null;
        this.facings = ["NORTH", "EAST", "SOUTH", "WEST"];
    }

    setFacing(facing){
        debugger;
        facing = facing.toUpperCase();
        if(this.facings.indexOf(facing)!==-1){
            this.facing = facing;
        }else{
            return false;
        }
    }

    getFacing(){
        return this.facing;
    }

    getFacingImage(){
        return `../public/images/assets/${this.facing}.png`;
    }

    setPosition(rowNum,colNum){
        this.x = rowNum-1;
        this.y = colNum-1;
    }

    getPosition(){
        return [this.x,this.y];
    }

    getInfo(){
        return {x:this.x,y:this.y,facing:this.facing};
    }

    turn(direction){
        debugger;
        var leftToRight = ["NORTH","EAST","SOUTH","WEST"];
        var rightToLeft = ["NORTH","WEST","SOUTH","EAST"];
        var currentIndex = direction==='LEFT'?leftToRight.indexOf(this.facing):rightToLeft.indexOf(this.facing);
        var nextIndex = (currentIndex+1)%4;
        var newFacing = direction==='LEFT'?leftToRight[nextIndex]:rightToLeft[nextIndex];
        this.setFacing(newFacing);
    }
}

export class Game {
    constructor(rowCount,colCount){
        debugger;
        this.board = new Board(rowCount,colCount);
        this.robot = new Robot();
        this.commandList = ["PLACE_ROBOT","PLACE_WALL", "MOVE", "LEFT", "RIGHT", "REPORT"];
        this.boxes  = this.createBoxes(rowCount,colCount);
    }

    createBoxes(rowCount,colCount){
        debugger;
        var boxes = [];
        for(var j=1;j<=colCount;j++){
            //var rowName = i;
            for(var i=rowCount;i>=1;i--){
                //var colName = j;
                boxes.push({x:i,y:j});
            }
        }
        return boxes;
    }

    isValidCommand(text){
        debugger;
        const parts = text.split(",");
        if(this.commandList.indexOf(parts[0].trim())===-1){
            return false;
        }else{
            return parts[0];
        }
    }

    getDetailFromText(text){
        debugger;
        const parts = text.split(",");
        if(parts.length>2){
            const rowNum = Number(parseInt(parts[1].trim(),10));
            const colNum = Number(parseInt(parts[2].trim(),10));
            var facing = false;
            if(parts.length>3){
                facing = parts[3].trim();
            }
            return {rowNum:rowNum,colNum:colNum,facing:facing}
        }else{
            return false;
        }
    }

    runPlaceRobot(rowNum,colNum,facing){
        debugger;
        if(this.board.isInTheArea(rowNum,colNum) && this.board.isEmpty(rowNum,colNum)){
            this.robot.setPosition(rowNum,colNum);
            this.robot.setFacing(facing);
            return true;
        }else{
            return false;
        }
    }

    runPlaceWall(rowNum,colNum){
        debugger;
        const status = this.board.addNewWall(rowNum,colNum);
        if(status===false){
            return false;
        }else{
            return true;
        }
    }

    runMove(){
        var robotInfo = this.robot.getInfo();
        if(robotInfo!==false){

        }else{
            return false;
        }
    }

    command(text) {
        debugger;
        text=text.toUpperCase();
        var commandText = this.isValidCommand(text);
        if(commandText===false){
            return false;
        }
        switch(commandText){
            case 'PLACE_ROBOT':{
                const detail = this.getDetailFromText(text);
                if(detail!==false){
                    var result = this.runPlaceRobot(detail.rowNum,detail.colNum,detail.facing);
                    if(result===false){
                        return false;
                    }
                }else{
                    return false;
                }
                break;
            }
            case 'PLACE_WALL':{
                const detail = this.getDetailFromText(text);
                if(detail!==false){
                    var result1 = this.runPlaceWall(detail.rowNum,detail.colNum);
                    if(result1===false){
                        return false;
                    }
                }else{
                    return false;
                }
                break;
            }
            case 'REPORT':{
                var report =  this.robot.getInfo();
                if(report!==false){
                    return report;
                }else{
                    return false;
                }
            }
            case 'MOVE':{
                var result2 = this.runMove();
                if(result2!==false){
                    return result2;
                }else{
                    return false;
                }
            }
            case 'LEFT':{
                this.robot.turn(commandText);
                break;
            }
            case 'RIGHT':{
                this.robot.turn(commandText);
                break;
            }
            default:{
                return false;
            }
        }
    }
}