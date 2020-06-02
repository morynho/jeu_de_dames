export const moveAvailable = (board, { row, column, piece }) => {
    let move = [];
    if (piece === "black") {
        move = simplePiece(board, "white", row, column, true);
    } else if (piece === "white") {
        move = simplePiece(board, "black", row, column);
    } else {
        for (let i = row, j = column; i > 0 && j < 7; i--, j++) {
            if (board[i - 1][j + 1] === "") {
                move.push({ move: [i - 1, j + 1] });
            } else if (
                i > 1 &&
                j < 6 &&
                !piece.startsWith(board[i - 1][j + 1]) &&
                board[i - 2][j + 2] === ""
            ) {
                move.push({ move: [i - 2, j + 2], destroy: [i - 1, j + 1] });
                break;
            } else {
                break;
            }
        }

        for (let i = row, j = column; i > 0 && j > 0; i--, j--) {
            if (board[i - 1][j - 1] === "") {
                move.push({ move: [i - 1, j - 1] });
            } else if (
                i > 1 &&
                j > 1 &&
                !piece.startsWith(board[i - 1][j - 1]) &&
                board[i - 2][j - 2] === ""
            ) {
                move.push({ move: [i - 2, j - 2], destroy: [i - 1, j - 1] });
                break;
            } else {
                break;
            }
        }

        for (let i = row, j = column; i < 7 && j < 7; i++, j++) {
            if (board[i + 1][j + 1] === "") {
                move.push({ move: [i + 1, j + 1] });
            } else if (
                i < 6 &&
                j < 6 &&
                !piece.startsWith(board[i + 1][j + 1]) &&
                board[i + 2][j + 2] === ""
            ) {
                move.push({ move: [i + 2, j + 2], destroy: [i + 1, j + 1] });
                break;
            } else {
                break;
            }
        }

        for (let i = row, j = column; i < 7 && j > 0; i++, j--) {
            if (board[i + 1][j - 1] === "") {
                move.push({ move: [i + 1, j - 1] });
            } else if (
                i < 6 &&
                j > 1 &&
                !piece.startsWith(board[i + 1][j - 1]) &&
                board[i + 2][j - 2] === ""
            ) {
                move.push({ move: [i + 2, j - 2], destroy: [i + 1, j - 1] });
                break;
            } else {
                break;
            }
        }
    }
    return move;
};

const getRow = (even, odd) => {
    return Array.from(Array(8), (x, i) => (i % 2 === 0 ? even : odd));
};

export const getBoard = () => {
    return Array.from(Array(8), (element, index) => {
        if (index % 2 === 0) {
            if (index <= 2) return getRow(null, "black");
            else if (index >= 5) return getRow(null, "white");
            else return getRow(null, "");
        } else {
            if (index <= 2) return getRow("black", null);
            else if (index >= 5) return getRow("white", null);
            else return getRow("", null);
        }
    });
};

export const simplePiece = (board, color, row, column, plus = false) => {
    let move = [];
    const row1 = plus ? row + 1 : row - 1;
    const row2 = plus ? row + 2 : row - 2;

    if (column > 0 && board[row1][column - 1] === "") {
        move.push({ move: [row1, column - 1] });
    } else if (
        ((plus && column > 1 && row < 6) || (!plus && column > 1 && row > 1)) &&
        board[row1][column - 1].startsWith(color) &&
        board[row2][column - 2] === ""
    ) {
        move.push({ move: [row2, column - 2], destroy: [row1, column - 1] });
    }

    if (column < 7 && board[row1][column + 1] === "") {
        move.push({ move: [row1, column + 1] });
    } else if (
        ((plus && row < 6 && column < 6) || (!plus && row > 1 && column < 6)) &&
        board[row1][column + 1].startsWith(color) &&
        board[row2][column + 2] === ""
    ) {
        move.push({ move: [row2, column + 2], destroy: [row1, column + 1] });
    }

    return move;
};
