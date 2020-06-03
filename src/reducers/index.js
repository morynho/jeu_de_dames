import { SET_SELECT_PIECE, SET_PIECE_MOVE, SET_RESTART } from "../constants";
import { moveAvailable, getBoard } from "../functions";

const isNext = (move, row, column) => {
    if (
        Object.keys(move).includes("next") &&
        move.move[0] === row &&
        move.move[1] === column
    ) {
        return true;
    }
    return false;
};

const initialState = {
    board: getBoard(),
    playerOne: { color: "black", pieces: 12 },
    playerTwo: { color: "white", pieces: 12 },
    pieceSelected: { row: null, column: null, piece: null },
    availableMove: [],
    isFinish: [false, null],
    isNext: false,
};

initialState.currentPlayer = initialState.playerOne;

const reducer = (state = initialState, { type, row = -1, column = -1, piece = null }) => {
    switch (type) {
        case SET_SELECT_PIECE:
            const move = moveAvailable(state.board, { row, column, piece });

            if (state.currentPlayer.pieces === 1 && move.length === 0) {
                return Object.assign({}, state, {
                    isFinish:
                        state.currentPlayer.color === "black"
                            ? [true, state.playerTwo]
                            : [true, state.playerOne],
                });
            }

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

            let availableMoveNew = [];

            state.availableMove.forEach((element) => {
                if (element.destroy) {
                    if (element.move[0] === row && element.move[1] === column) {
                        newBoard[element.destroy[0]][element.destroy[1]] = "";

                        if (state.currentPlayer.color === state.playerOne.color) {
                            playerTwoNew.pieces = state.playerTwo.pieces - 1;
                        } else {
                            playerOneNew.pieces = state.playerOne.pieces - 1;
                        }

                        availableMoveNew = state.availableMove.filter((move) =>
                            isNext(move, row, column)
                        );

                        if (availableMoveNew.length > 0) {
                            availableMoveNew = availableMoveNew[0].next.filter(
                                (element) => {
                                    if (Object.keys(element).includes("destroy")) {
                                        return element;
                                    }
                                }
                            );
                        }
                    }
                }
            });

            return Object.assign({}, state, {
                board: newBoard,
                pieceSelected:
                    availableMoveNew.length > 0
                        ? { row: row, column: column, piece: newBoard[row][column] }
                        : { row: null, column: null, piece: null },
                availableMove: availableMoveNew,
                playerOne: playerOneNew,
                playerTwo: playerTwoNew,
                currentPlayer:
                    availableMoveNew.length > 0
                        ? state.currentPlayer
                        : state.currentPlayer.color.startsWith("black")
                        ? playerTwoNew
                        : playerOneNew,
                isFinish: (playerOneNew.pieces === 0 && [true, playerTwoNew]) ||
                    (playerTwoNew.pieces === 0 && [true, playerOneNew]) || [false, null],
                isNext: availableMoveNew.length > 0 ? true : false,
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
