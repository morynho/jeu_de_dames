import { SET_SELECT_PIECE, SET_PIECE_MOVE, SET_RESTART } from "../constants";
import { moveAvailable, getBoard } from "../functions";

const initialState = {
    board: getBoard(),
    playerOne: { color: "black", pieces: 12 },
    playerTwo: { color: "white", pieces: 12 },
    pieceSelected: { row: null, column: null, piece: null },
    availableMove: [],
    isFinish: [false, null],
};

initialState.currentPlayer = initialState.playerOne;

const reducer = (state = initialState, { type, row = -1, column = -1, piece = null }) => {
    switch (type) {
        case SET_SELECT_PIECE:
            const move = moveAvailable(state.board, {
                row,
                column,
                piece,
            });
            return Object.assign({}, state, {
                pieceSelected: {
                    row,
                    column,
                    piece,
                },
                availableMove: move,
            });
        case SET_PIECE_MOVE:
            let newBoard = [...state.board];
            newBoard[state.pieceSelected.row][state.pieceSelected.column] = "";
            newBoard[row][column] =
                (state.pieceSelected.piece === "black" && row === 7) ||
                (state.pieceSelected.piece === "white" && row === 0)
                    ? state.pieceSelected.piece.concat("--", "king")
                    : state.pieceSelected.piece;
            let playerOneNew = Object.assign({}, state.playerOne);
            let playerTwoNew = Object.assign({}, state.playerTwo);
            state.availableMove.forEach((element) => {
                if (element.destroy) {
                    if (element.move[0] === row && element.move[1] === column) {
                        newBoard[element.destroy[0]][element.destroy[1]] = "";
                        if (state.currentPlayer === state.playerOne) {
                            playerTwoNew.pieces = state.playerTwo.pieces - 1;
                        } else {
                            playerOneNew.pieces = state.playerOne.pieces - 1;
                        }
                    }
                }
            });
            return Object.assign({}, state, {
                board: newBoard,
                pieceSelected: { row: null, column: null, piece: null },
                availableMove: [],
                playerOne: playerOneNew,
                playerTwo: playerTwoNew,
                currentPlayer: state.currentPlayer.color.startsWith("black")
                    ? playerTwoNew
                    : playerOneNew,
                isFinish:
                    (playerOneNew.pieces === 0 && [true, playerTwoNew]) ||
                    (playerTwoNew.pieces === 0 && [true, playerOneNew]) ||
                    false,
            });
        case SET_RESTART:
            return Object.assign({}, state, {
                board: getBoard(),
                playerOne: { ...state.playerOne, pieces: 12 },
                playerTwo: { ...state.playerTwo, pieces: 12 },
                pieceSelected: { row: null, column: null, piece: null },
                availableMove: [],
                isFinish: [false, null],
                currentPlayer: { ...state.playerOne, pieces: 12 },
            });
        default:
            return state;
    }
};

export default reducer;
