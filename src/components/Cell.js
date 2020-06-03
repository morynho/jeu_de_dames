import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setSelectPiece, setPieceMove } from "../actions";
import "../css/components/Cell.css";

const Cell = ({
    item,
    row,
    column,
    currentPlayer,
    dispatch,
    select,
    move,
    isFinish,
    isNext,
}) => {
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
                    !isFinish && move && dispatch(setPieceMove(row, column, item));
                }}
            >
                {item !== "" && (
                    <div
                        className={item}
                        onClick={() => {
                            if (!isNext) {
                                !isFinish &&
                                    item.startsWith(currentPlayer.color) &&
                                    dispatch(setSelectPiece(row, column, item));
                            } else {
                                select && dispatch(setSelectPiece(row, column));
                            }
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
        isNext: state.isNext,
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
    isNext: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Cell);
