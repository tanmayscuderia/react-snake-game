export const UP = "UP";
export const DOWN = "DOWN";
export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const DIRECTION_RIGHT = "DIRECTION_RIGHT";
export const DIRECTION_LEFT = "DIRECTION_LEFT";
export const DIRECTION_UP = "DIRECTION_UP";
export const DIRECTION_DOWN = "DIRECTION_DOWN";
export const SET_DIRECTION = "SET_DIRECTION";
export const RESET = "RESET";
export const STOP_GAME = "STOP_GAME";
export const INCREASE_SIZE = "INCREASE_SIZE";
export const INCREASE_SCORE = "INCREASE_SCORE";
export const RESET_SCORE = "RESET_SCORE";

export const moveSnake = (x: number, y: number, move: string) => ({
    type: move,
    payload: [x, y]
});

export const setDirection = (direction: string) => ({
    type: SET_DIRECTION,
    payload: direction
});

export const resetGame = () => ({
    type: RESET
});

export const stopGame = () => ({
    type: STOP_GAME
});

export const increaseSnake = () => ({
    type: INCREASE_SIZE
});

export const updateScore = (type: string) => ({
    type
});

export interface Coordinates {
    x: number;
    y: number;
}

