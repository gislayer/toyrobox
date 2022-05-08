
# ToyRoBox - Toy Robot Game

This game was created for Mott MacDonald : 
Demo URL : [ToyRoBox](https://stalwart-begonia-743d9d.netlify.app/)
GitHub URL : https://github.com/gislayer/toyrobox
Developer : [Ali Kilic](https://www.alikilic.org/)

## Game Commands
### PLACE_ROBOT ROW,COL,FACING
This command places a robot at a given coordinate with an initial Facing direction.
Rows : Between 1 and 5
Cols : Between 1 and 5 
Facing : NORT, EAST, WEST, SOUTH
Sample Command : *PLACE_ROBOT 1,1,NORTH*

![PLACE_ROBOT](https://iili.io/WMFldG.png)
  
---
### PLACE_WALL ROW,COL
This command places a wall at the given coordinate.
Rows : Between 1 and 5
Cols : Between 1 and 5 
Sample Commands : 
PLACE_WALL 3,2
PLACE_WALL 1,3
PLACE_WALL 5,4

![PLACE_WALL](https://iili.io/WMKe6X.png)

---
### MOVE
The MOVE command moves the robot 1 space forward in the direction it is currently facing.
if you want to go 4,1 position you need to enter MOVE command 3 Times or you can push to MOVE button
Sample Commands: 
MOVE
MOVE
MOVE 

![MOVE](https://iili.io/WMftsI.png)

---

### LEFT/RIGHT
The turn commands LEFT and RIGHT, turns the robot 90 degrees to its current left or right. You can use text input or LEFT/RIGHT buttons
Sample Commands: RIGHT

![LEFT/RIGHT](https://iili.io/WMqKsS.png)

---

### REPORT
The game prints out the current location and facing direction of the robot.
You can use text input or REPORT button
Sample Commands: 
MOVE
REPORT

![REPORT](https://iili.io/WMqqq7.png)

## GAME RULES

 - If there are no robots on the board, this command is ignored.
 - Board Size is 5x5 and you can't go outside of board
 - When you try to move outside of board you will come back from opposite edge
 - You can't enter invalid commands
 - You can only create a wall in an empty box
 - You can add as many walls as they like until the board is filled.
 - If the target location is occupied (by the robot, or another wall), then this command is ignored.
 - Invalid coordinates are ignored.
 - Robot can't pass over walls

## Project Information
Start Date : 6 May 2022 22:30
End Date : 8 May 2022 01:30
JS Library : React JS
CSS Library : Bootstrap
Developer : Ali KILIC

## NodeJS Commands

### `npm start`

  

Runs the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

  

The page will reload when you make changes.\

You may also see any lint errors in the console.

  

### `npm test`

  

Launches the test runner in the interactive watch mode.\

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  

### `npm run build`

  

Builds the app for production to the `build` folder.\

It correctly bundles React in production mode and optimizes the build for the best performance.

  

The build is minified and the filenames include the hashes.\

Your app is ready to be deployed!

  

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

  

### `npm run eject`

  

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

  

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

  

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

  

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.