import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cell from "./Cell";
import "../css/components/Board.css";

const Board = ({ board, pieceSelected, availableMove }) => {
    const drawCell = (board) => {
        return board.map((row, i) => {
            return row.map((cell, j) => {
                if (pieceSelected.row === i && pieceSelected.column === j) {
                    return (
                        <Cell key={`${i}${j}`} item={cell} row={i} column={j} select />
                    );
                } else if (
                    availableMove.some((move) => move.move[0] === i && move.move[1] === j)
                ) {
                    return <Cell key={`${i}${j}`} item={cell} row={i} column={j} move />;
                } else {
                    return <Cell key={`${i}${j}`} item={cell} row={i} column={j} />;
                }
            });
        });
    };

    return <div className="board">{drawCell(board)}</div>;
};

const mapStateToProps = (state) => {
    return {
        board: state.board,
        pieceSelected: state.pieceSelected,
        availableMove: state.availableMove,
    };
};

Board.propTypes = {
    board: PropTypes.array.isRequired,
    pieceSelected: PropTypes.shape({
        row: PropTypes.number,
        column: PropTypes.number,
        piece: PropTypes.string,
    }),
    availableMove: PropTypes.arrayOf(
        PropTypes.shape({
            move: PropTypes.arrayOf(PropTypes.number),
        })
    ),
};

export default connect(mapStateToProps)(Board);
