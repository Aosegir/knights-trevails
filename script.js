// MOVES shows the 8 possible moves a knight can make at any given time
const MOVES = [[1, 2], [-1, 2], [2, 1], [-2, 1], [1, -2], [-1, -2], [2, -1], [-2, -1]];
// BAD shows coordinates relative to end point to avoid
const BADS = [[2, 2], [-2, 2], [2, -2], [-2, -2], [0, 3], [3, 0], [0, -3], [-3, 0]];


// samesquare's only function is to see if two sets of coordinates are the same
function sameSquare(pointOne, pointTwo) {
    return ((pointOne[0] === pointTwo[0]) && (pointOne[1] === pointTwo[1]));
};

// movepiece's only function is to take a position & a move and output the new position
function movePiece(origin, movement) {
    return [(origin[0] + movement[0]), (origin[1] + movement[1])];
};


// checkboard's only function is to take in an array of positions on the board
// and removing any that are off the board
function checkBoard(moves) {
    let goodMoves = moves.filter((move) => (move[0] > 0 && move[0] < 9) 
        && (move[1] > 0 && move[1] < 9));

    return goodMoves;
};


// calculatemove's only function is to create a new array given a position
// and an array with which to translate that move
function calculateMoves(position, arr) {
    // edge case: if calculatemoves is given a position that isn't possible, throw
    // an error
    if((position[0] < 1 || position[0] > 8) || (position[1] < 1 || position[1] > 8)) throw new Error("positon not possible");

    let possibleMoves = [];

    // loop through array given to create new move based on transformation
    for(let item of arr) {
        // calling movePiece function here
        possibleMoves.push(movePiece(position, item));
    };

    // calling checkBoard here
    return checkBoard(possibleMoves);
};


// removeoverlap's only function is to take two arrays and remove any elements from the
// first array that appear in the second
function removeOverlap(arrOne, arrTwo) {
    let newItems = [];

    let stringOne = arrOne.map(String);
    let stringTwo = arrTwo.map(String);

    for(let i = 0; i < arrOne.length; i++) {
        if(!stringTwo.includes(stringOne[i])) {
            newItems.push(arrOne[i]);
        };
    };

    return newItems;
};


// calcDistance's only function is to take in two coordinates and return
// the absolute value of their difference
function calcDistance(coordinateOne, coordinateTwo) {
    return Math.abs(coordinateOne - coordinateTwo);
};


// distanceFromEnd's only function is to compare the overall distance a possible move
// is away from the end position and return that value
function distanceFromEnd(move, end) {
    let xDistance = calcDistance(move[0], end[0]);
    let yDistance = calcDistance(move[1], end[1]);

    return xDistance + yDistance;
};

// nextmove's only function is to take in an array of possible moves and an end point
// and find the end point / the move that moves closest to the end point
function nextMove(possibleMoves, end) {
    // if the end move is here, return that one
    if(possibleMoves.map(String).includes(end.toString())) return end;

    let closest = possibleMoves[0];
    let closestDifference = distanceFromEnd(closest, end);

    for(let currentMove of possibleMoves) {
        if(distanceFromEnd(currentMove, end) === 3) {
            return currentMove;
        } else {
            let currentDifference = distanceFromEnd(currentMove, end);
            // calculate absolute distance by using math.abs to find which value is
            // closest to 3
            let tempCurrent = Math.abs(currentDifference - 3);
            let tempClosest = Math.abs(closestDifference - 3);
            if(tempCurrent < tempClosest) {
                closest = currentMove;
            };
        };
    };

    return closest;
};


// finalmovesarray is the array that will store the series of moves knightstrevails needs
let finalMovesArray = [];

// knightstrevails function will output the shortest path a knight can move from
// one position on a chessboard to another
function knightsTrevails(start, end) {
    // step -1: add current position to final moves array;
    finalMovesArray.push(start);

    // step 0: implement base case which returns the array of moves taken
    if(sameSquare(start, end)) {
        console.log(finalMovesArray);
        return;
    };

    // step 1: create array of possible moves the knight can currently move to
    let possibleMoves = calculateMoves(start, MOVES);

    // step 2: calculate the moves to avoid reaching based on the end point
    let badMoves = calculateMoves(end, BADS);

    // step 3: filter possibleMoves and remove any overlap with badMoves
    possibleMoves = removeOverlap(possibleMoves, badMoves);

    // step 4: calculate the next move with the ones remaining: use the end move if found,
    // otherwise pick the move with the coordinate sum closest to 3
    let next = nextMove(possibleMoves, end);

    // step 5: repeat the loop with the next closest knight's move
    knightsTrevails(next, end);
};

knightsTrevails([1, 1], [2, 2]);