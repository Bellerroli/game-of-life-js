let displayMatrix = document.getElementById("wrapper");
let dim = [100,100];

let blockSize = Math.min(parseInt($(displayMatrix).css('width'))/dim[0], parseInt($(displayMatrix).css('height'))/dim[1])


let initState = Array.from({length:dim[0]}, e => Array(dim[1]).fill('X'));


let changeList = [];
let blockMatrix = Array.from({length:dim[0]}, e => Array(dim[1]).fill(undefined));

$(document).ready(function (){
    putInState(initState, block, 6,5);
    putInState(initState, ship1,4,15);
    putInState(initState, ship2, 2,25)
    putInState(initState, block,4, 39);
    putInState(initState, pentaDecathlon, 30, 10);
    // putInState(initState, acorn, 10, 10);
    putInState(initState, acorn, 10, 80);
    putInState(initState, acorn, 80, 10);
    putInState(initState, acorn, 80, 80);
    let currState = initState;
    start_display(currState);
    setInterval(()=>{
        currState = get_next_state(currState);
        change_display(currState);
    }, 0)
});


function get_next_state(currState){
    let nextState = Array.from({length:dim[0]}, e => Array(dim[1]).fill('X'));
    for (let i = 0; i < dim[0]; i++) {
        for (let j = 0; j < dim[1]; j++) {
            let res = applyRules(checkNeighbours(currState, i,j), currState[i][j]);
            if(currState[i][j] !== res){
                changeList.push([i,j,res]);
            }
            nextState[i][j] = res;
        }
    }
    return nextState
}

function start_display(state){
    for (let i = 0; i < dim[0]; i++) {
        for (let j = 0; j < dim[1]; j++) {
            let className;
            if(state[i][j] === 'O') {
                className = 'O';
            }
            else {
                className = '';
            }
            let blockElement = $("<div class='block'></div>").css({'width':blockSize, 'height':blockSize
                , 'top': i*blockSize, 'left': j*blockSize}).addClass(className+" i"+i+" j"+j)
            $(displayMatrix).append(blockElement);
            blockMatrix[i][j] = blockElement;
            console.log(blockElement);
        }
    }
}

function change_display(state){
    // for (let i = 0; i < dim[0]; i++) {
    //     for (let j = 0; j < dim[1]; j++) {
    //         let domBlock = $(displayMatrix).children(".i"+i+".j"+j);
    //         if(state[i][j] === 'X'){
    //             if(domBlock.hasClass("O")){
    //                 domBlock.removeClass("O")
    //             }
    //         }
    //         else{
    //             if(!domBlock.hasClass("O")){
    //                 domBlock.addClass("O")
    //             }
    //         }
    //     }
    // }
    changeList.forEach((element)=>{
        let block = blockMatrix[element[0]][element[1]];
        if(element[2] === 'O'){
            block.addClass("O");
        }
        else{
           block.removeClass("O");
        }
    });
    changeList = [];
}

function putInState(state, type, x,y){
    for (let i = 0; i < type.length; i++) {
        for (let j = 0; j < type[0].length; j++) {
            state[i+x][j+y] = type[i][j]
        }
    }
}


function applyRules(neighbours, currState){
    if(currState === 'X'){
        if(neighbours === 3) return 'O';
        else return 'X';
    }
    if(neighbours>1 && neighbours<4) return 'O';
    else return 'X';
}

function checkNeighbours(state, i,j){
    let num_neighbours = 0;
    if(i>0 && j>0 && dim[0]-1>i && dim[1]-1>j){
        for (let x = i-1; x < i+2; x++) {
            for (let y = j-1; y < j+2; y++) {
                if(x===i && y === j) continue;
                if(state[x][y] === 'O'){
                    num_neighbours++;
                }
            }
        }
    }
    else if(i === 0 && j === 0){
        for (let x = i; x < i+2; x++) {
            for (let y = j; y < j+2; y++) {
                if(x===i && y === j) continue;
                if(state[x][y] === 'O'){
                    num_neighbours++;
                }
            }
        }
    }
    else if(i === 0 && j === dim[1]-1){
        for (let x = i; x < i+2; x++) {
            for (let y = j-1; y < j+1; y++) {
                if(x===i && y === j) continue;
                if(state[x][y] === 'O'){
                    num_neighbours++;
                }
            }
        }
    }
    else if(i === dim[0]-1 && j === 0){
        for (let x = i-1; x < i+1; x++) {
            for (let y = j; y < j+2; y++) {
                if(x===i && y === j) continue;
                if(state[x][y] === 'O'){
                    num_neighbours++;
                }
            }
        }
    }
    else if(i === dim[0]-1 && j === dim[1]-1){
        for (let x = i-1; x < i+1; x++) {
            for (let y = j; y < j+1; y++) {
                if(x===i && y === j) continue;
                if(state[x][y] === 'O'){
                    num_neighbours++;
                }
            }
        }
    }
    else if(i === dim[0]-1 && j === 0){
        for (let x = i-1; x < i+1; x++) {
            for (let y = j; y < j+2; y++) {
                if(x===i && y === j) continue;
                if(state[x][y] === 'O'){
                    num_neighbours++;
                }
            }
        }
    }
    else if(i === 0 && j < 0 && j < dim[1]){
        for (let x = i; x < i+2; x++) {
            for (let y = j-1; y < j+2; y++) {
                if(x===i && y === j) continue;
                if(state[x][y] === 'O'){
                    num_neighbours++;
                }
            }
        }
    }
    else if(i === dim[0]-1 && j < 0 && j < dim[1]){
        for (let x = i-1; x < i+1; x++) {
            for (let y = j-1; y < j+2; y++) {
                if(x===i && y === j) continue;
                if(state[x][y] === 'O'){
                    num_neighbours++;
                }
            }
        }
    }
    else if(j === 0 && i < 0 && i < dim[1]){
        for (let x = i-1; x < i+2; x++) {
            for (let y = j; y < j+2; y++) {
                if(x===i && y === j) continue;
                if(state[x][y] === 'O'){
                    num_neighbours++;
                }
            }
        }
    }
    else if(j === dim[0]-1 && i < 0 && i < dim[1]){
        for (let x = i-1; x < i+2; x++) {
            for (let y = j-1; y < j+1; y++) {
                if(x===i && y === j) continue;
                if(state[x][y] === 'O'){
                    num_neighbours++;
                }
            }
        }
    }
    return num_neighbours;
}
