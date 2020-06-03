export const moveAvailable = (board, { row, column, piece }) => {
    if (piece === "black") return simplePiece(board, "white", row, column);
    else if (piece === "white") return simplePiece(board, "black", row, column);
    else return kingPiece(board, row, column, piece);
};

const getRow = (even, odd) => Array.from(Array(8), (x, i) => (i % 2 === 0 ? even : odd));

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

const getNewBoard = (board, r, r1, r2, c, c1, c2, piece, simple = false) => {
    let newBoard = board.map((item) => [...item]);
    newBoard[r][c] = "";
    newBoard[r1][c1] = "";
    newBoard[r2][c2] = !simple ? piece : piece === "black" ? "white" : "black";

    return newBoard;
};

const simplePiece = (board, piece, r, c) => {
    let move = [];
    const r1 = piece === "white" ? r + 1 : r - 1;
    const r2 = piece === "white" ? r + 2 : r - 2;

    if (r1 > 7 || r1 < 0) return move;

    if (c > 0 && board[r1][c - 1] === "") {
        move.push({ move: [r1, c - 1] });
    } else if (
        ((r1 > r && c > 1 && r < 6) || (r1 < r && c > 1 && r > 1)) &&
        board[r1][c - 1].startsWith(piece) &&
        board[r2][c - 2] === ""
    ) {
        let newBoard = getNewBoard(board, r, r1, r2, c, c - 1, c - 2, piece, true);
        move.push({
            move: [r2, c - 2],
            next: simplePiece(newBoard, piece, r2, c - 2),
            destroy: [r1, c - 1],
        });
    }

    if (c < 7 && board[r1][c + 1] === "") {
        move.push({ move: [r1, c + 1] });
    } else if (
        ((r1 > r && r < 6 && c < 6) || (r1 < r && r > 1 && c < 6)) &&
        board[r1][c + 1].startsWith(piece) &&
        board[r2][c + 2] === ""
    ) {
        let newBoard = getNewBoard(board, r, r1, r2, c, c + 1, c + 2, piece, true);
        move.push({
            move: [r2, c + 2],
            next: simplePiece(newBoard, piece, r2, c + 2),
            destroy: [r1, c + 1],
        });
    }

    return move;
};

const kingPiece = (board, r, c, piece) => {
    let move = [];
    for (let i = r, j = c; i > 0 && j < 7; i--, j++) {
        let result = kingSearch(board, i, j, piece, false, true, move);
        if (!result) break;
        else move = result;
    }

    for (let i = r, j = c; i > 0 && j > 0; i--, j--) {
        let result = kingSearch(board, i, j, piece, false, false, move);
        if (!result) break;
        else move = result;
    }

    for (let i = r, j = c; i < 7 && j < 7; i++, j++) {
        let result = kingSearch(board, i, j, piece, true, true, move);
        if (!result) break;
        else move = result;
    }

    for (let i = r, j = c; i < 7 && j > 0; i++, j--) {
        let result = kingSearch(board, i, j, piece, true, false, move);
        if (!result) break;
        else move = result;
    }

    return move;
};

const kingSearch = (board, r, c, piece, r_direction, c_direction, move) => {
    let r1 = r_direction ? r + 1 : r - 1;
    let r2 = r_direction ? r + 2 : r - 2;

    let c1 = c_direction ? c + 1 : c - 1;
    let c2 = c_direction ? c + 2 : c - 2;

    if (board[r1][c1] === "") {
        move.push({ move: [r1, c1] });
    } else if (
        ((r_direction && r < 6) || (!r_direction && r > 1)) &&
        ((c_direction && c < 6) || (!c_direction && c > 1)) &&
        !piece.startsWith(board[r1][c1]) &&
        board[r2][c2] === ""
    ) {
        let newBoard = getNewBoard(board, r, r1, r2, c, c1, c2, piece);
        move.push({
            move: [r2, c2],
            next: kingPiece(newBoard, r2, c2, piece),
            destroy: [r1, c1],
        });
        return false;
    } else {
        return false;
    }

    return move;
};
