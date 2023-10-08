import { UP, DOWN, RIGHT, LEFT, RESET, INCREASE_SIZE, INCREASE_SCORE, SET_DIRECTION, Coordinates, RESET_SCORE } from '../actions';

const appState: State = {
    notAllowedDirection: "",
    score: 0,
    snake: [
        { x: 580, y: 300 },
        { x: 560, y: 300 },
        { x: 540, y: 300 },
        { x: 520, y: 300 },
        { x: 500, y: 300 },
    ],

}

const reducer = (state = appState, actions: any) => {
    switch (actions.type) {
        case SET_DIRECTION:
            return { ...state, notAllowedDirection: actions.payload };

        case INCREASE_SIZE:
            const currentLength = state.snake.length;

            return {
                ...state,
                snake: [
                    ...state.snake,
                    {
                        x: state.snake[currentLength - 1].x - 20,
                        y: state.snake[currentLength - 1].y - 20
                    },
                ],
            };

        case INCREASE_SCORE:
            return { ...state, score: state.score + 1 };

        case RESET_SCORE:
            return { ...state, score: 0 };

        case RESET:
            return {
                ...state,
                snake: [
                    { x: 580, y: 300 },
                    { x: 560, y: 300 },
                    { x: 540, y: 300 },
                    { x: 520, y: 300 },
                    { x: 500, y: 300 },
                ],
                notAllowedDirection: ""
            };

        case UP:
        case DOWN:
        case RIGHT:
        case LEFT: {
            let modifiedSnake = [...state.snake];
            modifiedSnake = [{
                x: state.snake[0].x + actions.payload[0],
                y: state.snake[0].y + actions.payload[1],
            }, ...modifiedSnake];
            modifiedSnake.pop();

            return {
                ...state,
                snake: modifiedSnake,
            };
        }
        default:
            return state;
    }
};

export default reducer;

export interface State {
    score: number;
    notAllowedDirection: string;
    snake: Coordinates[] | [];
}