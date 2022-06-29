

export class Board{
    constructor(rowCount,colCount){
        this.width = rowCount;
        this.height = colCount;
        this.wallLocations = [];
    }

    isInTheArea(x,y){
        if((x < 1 || x > this.width) || ( y < 1 || y > this.height)){
            return false;
        }else{
            return true;
        }
    }

    isEmpty(x,y){
        var filter = this.wallLocations.filter(wall => wall[0] === x && wall[1] === y);
        if(filter.length === 0){
            return true;
        }else{
            return false;
        }
    }
    
    addNewWall(rowNum,colNum){
        const x = rowNum;
        const y = colNum;
        if(this.isInTheArea(x,y)===false){
            return false;
        }
        if(this.isEmpty(x,y)){
            this.wallLocations.push([x,y]);
            return true;
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
        facing = facing.toUpperCase();
        if(this.facings.indexOf(facing)!==-1){
            this.facing = facing;
        }else{
            return false;
        }
    }

    isValidFacing(facing){
        facing = facing.toUpperCase();
        if(this.facings.indexOf(facing)!==-1){
            return true;
        }else{
            return false;
        }
    }

    getFacing(){
        return this.facing;
    }

    getFacingImage(){
        return `./images/assets/${this.facing}.png`;
    }

    getAbsolutePosition(rowNum,colNum){
        var x=0;
        var y=0;
        if(rowNum>5){
            x = 1; 
        }else{
            if(rowNum<1){
                x=5;
            }else{
                x = rowNum;
            }
        }
        if(colNum>5){
            y = 1; 
        }else{
            if(colNum<1){
                y=5;
            }else{
                y = colNum;
            }
        }
        return {x:x,y:y}
    }

    setPosition(rowNum,colNum){
        if(rowNum>5){
            this.x = 1; 
        }else{
            if(rowNum<1){
                this.x=5;
            }else{
                this.x = rowNum;
            }
        }
        if(colNum>5){
            this.y = 1; 
        }else{
            if(colNum<1){
                this.y=5;
            }else{
                this.y = colNum;
            }
        }
    }

    getPosition(){
        return [this.x,this.y];
    }

    getInfo(){
        if(this.x!==null && this.y!==null && this.facing!==null){
            return {x:this.x,y:this.y,facing:this.facing,img:this.getFacingImage()};
        }else{
            return false;
        }
    }

    checkInTheBoard(){
        if(this.x!==null && this.y!==null && this.facing!==null){
            return true;
        }else{
            return false;
        }
    }

    turn(direction){
        var rightToLeft = ["NORTH","EAST","SOUTH","WEST"];
        var leftToRight = ["NORTH","WEST","SOUTH","EAST"];
        var currentIndex = direction.command==='LEFT'?leftToRight.indexOf(this.facing):rightToLeft.indexOf(this.facing);
        var nextIndex = (currentIndex+1)%4;
        var newFacing = direction.command==='LEFT'?leftToRight[nextIndex]:rightToLeft[nextIndex];
        this.setFacing(newFacing);
    }
}

export class Game {
    constructor(rowCount,colCount){
        this.board = new Board(rowCount,colCount);
        this.robot = new Robot();
        this.commandList = ["PLACE_ROBOT","PLACE_WALL", "MOVE", "LEFT", "RIGHT", "REPORT"];
        this.boxes  = this.createBoxes(rowCount,colCount);
        this.sounds = {
            PLACE_ROBOT:new Audio("./sound/wellcome.mp3"),
            GHOST:new Audio("./sound/congrate.mp3"),
            MOVE:new Audio("./sound/move.mp3"),
            LEFT:new Audio("./sound/leftright.mp3"),
            FORBIDEN:new Audio("./sound/forbiden.mp3"),
            WALL:new Audio("./sound/wall.mp3"),
            EMPTY:new Audio("./sound/empty.mp3"),
        };
        this.messages = [];
    }

    createBoxes(rowCount,colCount){
        var boxes = [];
        var robotPosition = this.robot.getInfo();
        for(var j=1;j<=colCount;j++){
            for(var i=rowCount;i>=1;i--){
                var obj = {
                    x:i,
                    y:j,
                    wall:false,
                    facing:false,
                    robot:false
                };
                if(robotPosition.x===i && robotPosition.y===j){
                    obj.robot = true;
                    obj.facing = robotPosition.img;
                }
                if(this.board.isEmpty(i,j)===false){
                    obj.wall = true;
                }
                boxes.push(obj);
            }
        }
        return boxes;
    }

    isValidCommand(text){
        const parts = text.split(" ");
        if(this.commandList.indexOf(parts[0].trim())===-1){
            return false;
        }else{
            if(parts.length===1){
                return {command:parts[0].trim(),task:false};
            }else{
                return {command:parts[0].trim(),task:parts[1].trim()};
            }
            
        }
    }

    getDetailFromText(text){
        const parts = text.split(",");
        if(parts.length>2){
            const rowNum = Number(parseInt(parts[1].trim(),10));
            const colNum = Number(parseInt(parts[2].trim(),10));
            if(isNaN(rowNum) || isNaN(colNum)){
                return false;
            }
            var facing = false;
            if(parts.length>3){
                var facingCheck=parts[3].trim();
                if(this.robot.isValidFacing(facingCheck)){
                    facing = parts[3].trim();
                }else{
                    return false;
                }
            }
            if(parts[0]==="PLACE_ROBOT"){
                if(facing!==false){
                    return {rowNum:rowNum,colNum:colNum,facing:facing};
                }else{
                    this.addWallWarning("You must enter specify a facing direction");
                    return false;
                }
            }else{
                return {rowNum:rowNum,colNum:colNum,facing:facing};
            }
        }else{
            return false;
        }
    }

    runPlaceRobot(rowNum,colNum,facing){
        if(this.board.isInTheArea(rowNum,colNum) && this.board.isEmpty(rowNum,colNum)){
            this.robot.setPosition(rowNum,colNum);
            this.robot.setFacing(facing);
            this.boxes = this.createBoxes(this.board.width,this.board.height);
            //this.sounds.PLACE_ROBOT.play();
            return this.boxes;
        }else{
            return false;
        }
        
    }

    runPlaceWall(rowNum,colNum){
        const status = this.board.addNewWall(rowNum,colNum);
        if(status===false){
            return false;
        }else{
            //this.sounds.WALL.play();
            return true;
        }
    }

    runMove(){
        var robotInfo = this.robot.getInfo();
        if(robotInfo!==false){
            var x = robotInfo.x;
            var y = robotInfo.y;
            switch(robotInfo.facing){
                case 'EAST':{
                    y++;
                    break;
                }
                case 'WEST':{
                    y--;
                    break;
                }
                case 'NORTH':{
                    x++;
                    break;
                }
                case 'SOUTH':{
                    x--;
                    break;
                }
                default:{

                }
            }
            var abs = this.robot.getAbsolutePosition(x,y);
            if(this.board.isEmpty(abs.x,abs.y)){
                this.robot.setPosition(x,y);
                this.boxes = this.createBoxes(this.board.width,this.board.height);
                //this.sounds.MOVE.play();
                return this.boxes;
            }else{
                this.sounds.FORBIDEN.play()
                this.addWallWarning("You can't move there");
                return false;
            }
            
        }else{
            this.addWallWarning("You Must Enter a Place Robot First");
            return false;
        }
    }

    addWallWarning(text){
        var time = new Date().toDateString();
        var num = this.messages.length+1;
        this.messages.push({
            type:'Forbidden',
            num:num,
            status:false,
            text:text,
            time:time
        }); 
    }

    addReport(text){
        var time = new Date().toDateString();
        var num = this.messages.length+1;
        this.messages.push({
            type:'Report',
            num:num,
            status:true,
            text:text,
            time:time
        }); 
    }

    addMessage(text){
        var time = new Date().toDateString();
        var num = this.messages.length+1;
        this.messages.push({
            type:'Command',
            num:num,
            status:true,
            text:text,
            time:time
        });
    }

    addWarning(text){
        text = `"${text}" Command is not valid`;
        var time = new Date().toDateString();
        var num = this.messages.length+1;
        this.messages.push({
            type:'Warning',
            num:num,
            status:false,
            text:text,
            time:time
        });
    }

    boxUpdate(){
        this.boxes = this.createBoxes(this.board.width,this.board.height);
    }

    command(text) {
        if(text===""){
            //this.sounds.EMPTY.play();
            return false;
        }
        text=text.toUpperCase();
        var commandText = this.isValidCommand(text);
        if(commandText===false){
            this.addWarning(text);
            return false;
        }
        switch(commandText.command){
            case 'PLACE_ROBOT':{
                const detail = this.getDetailFromText(commandText.command+','+commandText.task);
                if(detail!==false){
                    var result = this.runPlaceRobot(detail.rowNum,detail.colNum,detail.facing);
                    if(result===false){
                        this.addWarning(text);
                        return false;
                    }else{
                        this.addMessage(text);
                    }
                }else{
                    this.addWarning(text);
                    return false;
                }
                break;
            }
            case 'PLACE_WALL':{
                const detail = this.getDetailFromText(commandText.command+','+commandText.task);
                const robotPosition = this.robot.getInfo();
                if(robotPosition.x===detail.rowNum && robotPosition.y===detail.colNum){
                    this.addMessage(text);
                    this.addWarning("There is robot in the place, you can't place wall there");
                    return false; 
                }
                if(detail!==false){
                    var result1 = this.runPlaceWall(detail.rowNum,detail.colNum);
                    if(result1===false){
                        this.addMessage(text);
                        return false;
                    }else{
                        this.addMessage(text);
                        this.boxUpdate();
                    }
                }else{
                    this.addMessage(text);
                    return false;
                }
                
                break;
            }
            case 'REPORT':{
                if(this.robot.checkInTheBoard()===false){
                    this.addWarning("You must enter a PLACE ROBOT first");
                    return false;
                }
                var report =  this.robot.getInfo();
                if(report!==false){
                    this.addMessage(text);
                    this.addReport(`${report.x},${report.y},${report.facing}`);
                    return report;
                }else{
                    return false;
                }
            }
            case 'MOVE':{
                var result2 = this.runMove();
                if(result2!==false){
                    this.addMessage(text);
                    return result2;
                }else{
                    return false;
                }
            }
            case 'LEFT':{
                if(this.robot.checkInTheBoard()===false){
                    this.addWarning("You must enter a PLACE ROBOT first");
                    return false;
                }
                this.robot.turn(commandText);
                this.boxUpdate();
                //this.sounds.LEFT.play();
                this.addMessage(text);
                break;
            }
            case 'RIGHT':{
                if(this.robot.checkInTheBoard()===false){
                    this.addWarning("You must enter a PLACE ROBOT first");
                    return false;
                }
                this.robot.turn(commandText);
                this.boxUpdate();
                //this.sounds.LEFT.play();
                this.addMessage(text);
                break;
            }
            default:{
                return false;
            }
        }
    }
}