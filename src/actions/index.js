import { SET_SELECT_PIECE, SET_PIECE_MOVE, SET_RESTART } from "../constants";

export const setSelectPiece = (row, column, piece) => {
    return {
        type: SET_SELECT_PIECE,
        row,
        column,
        piece,
    };
};

export const setPieceMove = (row, column, piece) => {
    return {
        type: SET_PIECE_MOVE,
        row,
        column,
        piece,
    };
};

export const setRestart = () => {
    return {
        type: SET_RESTART,
    };
};
