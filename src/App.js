import React from "react";
import { connect } from "react-redux";
import Board from "./components/Board";
import PropTypes from "prop-types";
import { setRestart } from "./actions";
import Swal from "sweetalert2";
import "./css/App.css";

function App({ dispatch, isFinish, currentPlayer }) {
    if (isFinish[0]) {
        Swal.fire({
            icon: "success",
            title: "Jeu de dames",
            text: "Victoire des pions " + isFinish[1].color,
        });
    }

    const restartGame = () => {
        dispatch(setRestart());
    };

    return (
        <div
            className="app"
            style={{ backgroundColor: (isFinish[0] && "#ffffff") || currentPlayer.color }}
        >
            <Board />

            <div>
                <button onClick={restartGame}>Rejouer</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isFinish: state.isFinish,
        currentPlayer: state.currentPlayer,
    };
};

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFinish: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                color: PropTypes.string.isRequired,
                pieces: PropTypes.number.isRequired,
            }),
        ])
    ),
    currentPlayer: PropTypes.shape({
        color: PropTypes.string.isRequired,
        pieces: PropTypes.number.isRequired,
    }),
};

export default connect(mapStateToProps)(App);
