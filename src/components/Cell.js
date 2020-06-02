import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setSelectPiece, setPieceMove } from "../actions";
import "../css/components/Cell.css";

const Cell = ({ item, row, column, currentPlayer, dispatch, select, move, isFinish }) => {
    if (item === null) return <div className="cell cell--yellow"></div>;
    else {
        return (
            <div
                className={`cell ${
                    select
                        ? "cell--brown--select"
                        : move
                        ? "cell--green--move"
                        : "cell--brown"
                }`}
                onClick={() => {
                    !isFinish && move && dispatch(setPieceMove(row, column));
                }}
            >
                {item !== "" && (
                    <div
                        className={item}
                        onClick={() => {
                            !isFinish &&
                                item.startsWith(currentPlayer.color) &&
                                dispatch(setSelectPiece(row, column, item));
                        }}
                    ></div>
                )}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        currentPlayer: state.currentPlayer,
        isFinish: state.isFinish[0],
    };
};

Cell.propTypes = {
    item: PropTypes.string,
    row: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired,
    currentPlayer: PropTypes.shape({
        color: PropTypes.string.isRequired,
        pieces: PropTypes.number.isRequired,
    }),
    dispatch: PropTypes.func.isRequired,
    select: PropTypes.bool,
    move: PropTypes.bool,
};

export default connect(mapStateToProps)(Cell);
