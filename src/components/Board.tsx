import React, { useCallback, useEffect, useRef, useState } from "react";
import { State } from '../store/reducers';
import { useDispatch, useSelector } from "react-redux";
import { DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN, RESET_SCORE, moveSnake, resetGame, stopGame, updateScore, Coordinates, increaseSnake, INCREASE_SCORE } from "../store/actions";
import './Board.css';
import Instruction from './Instructions';

const getRandomPosition = (position: number) => {
    const randomPosition = Math.random() * position;
    return randomPosition - (randomPosition % 20);
}

const generateRandomPosition = (width: number, height: number) => {
    return {
        x: getRandomPosition(width),
        y: getRandomPosition(height),
    };
};

const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if (context) {
        context.clearRect(0, 0, 1000, 600);
    }
};

const designCharacters = (
    context: CanvasRenderingContext2D | null,
    objectBody: Coordinates[],
    fillColor: string,
    strokeStyle = "#146356"
) => {
    if (context) {
        objectBody.forEach((object: Coordinates) => {
            context.fillStyle = fillColor;
            context.strokeStyle = strokeStyle;
            context?.fillRect(object.x, object.y, 20, 20);
            context?.strokeRect(object.x, object.y, 20, 20);
        });
    }
};

export const hasSnakeCollided = (
    snake: Coordinates[],
    currentHeadPos: Coordinates
) => {
    let flag = false;
    snake.forEach((position: Coordinates, index: number) => {
        if (
            position.x === currentHeadPos.x &&
            position.y === currentHeadPos.y &&
            index !== 0
        ) {
            flag = true;
        }
    });

    return flag;
};

const Board = ({ height, width }: CanvasScreen) => {
    const dispatch = useDispatch();
    const notAllowedDirection = useSelector((state: State) => state.notAllowedDirection);
    const snake = useSelector((state: State) => state.snake);
    const [position, setPosition] = useState<Coordinates>(generateRandomPosition(width - 20, height - 20));
    const [isEaten, setIsEaten] = useState<boolean>(false);
    const [endGame, setEndGame] = useState<boolean>(false);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (isEaten) {
            const randomPosition = generateRandomPosition(width - 20, height - 20);
            setPosition(randomPosition);
            setIsEaten(false);
            dispatch(increaseSnake());
            dispatch(updateScore(INCREASE_SCORE));
        }
    }, [isEaten, position, height, width, dispatch]);


    const snakeMovement = useCallback(
        (x = 0, y = 0, ds: string) => {
            if (x === 0 && y < 0 && ds !== "UP") {
                dispatch(moveSnake(x, y, DIRECTION_UP));
            }

            if (x === 0 && y > 0 && ds !== "DOWN") {
                dispatch(moveSnake(x, y, DIRECTION_DOWN));
            }

            if (x < 0 && y === 0 && ds !== "LEFT") {
                dispatch(moveSnake(x, y, DIRECTION_LEFT));
            }

            if (x > 0 && y === 0 && ds !== "RIGHT") {
                dispatch(moveSnake(x, y, DIRECTION_RIGHT));
            }
        },
        [dispatch]
    );

    const keyMovement = useCallback(
        (event: KeyboardEvent) => {
            if (notAllowedDirection) {
                console.log('s', event.key);
                    
                switch (event.key) {
                    case "ArrowUp":
                        snakeMovement(0, -20, notAllowedDirection);
                        break;
                    case "ArrowDown":
                        snakeMovement(0, 20, notAllowedDirection);
                        break;
                    case "ArrowLeft":
                        snakeMovement(-20, 0, notAllowedDirection);
                        break;
                    case "ArrowRight":
                        event.preventDefault();
                        snakeMovement(20, 0, notAllowedDirection);
                        break;
                }
            } else {
                if (
                    notAllowedDirection !== "LEFT" &&
                    notAllowedDirection !== "UP" &&
                    notAllowedDirection !== "DOWN" &&
                    event.key === "s"
                )
                    snakeMovement(20, 0, notAllowedDirection);
            }
        },
        [notAllowedDirection, snakeMovement]
    );


    useEffect(() => {
        window.addEventListener("keydown", keyMovement);

        return () => {
            window.removeEventListener("keydown", keyMovement);
        };
    }, [notAllowedDirection, keyMovement]);

    const resetGameNow = useCallback(() => {
        window.removeEventListener("keydown", keyMovement);
        dispatch(resetGame());
        dispatch(updateScore(RESET_SCORE));
        clearBoard(context);
        designCharacters(context, snake, "#31C483");
        designCharacters(
            context,
            [generateRandomPosition(width - 20, height - 20)],
            "#856FA3"
        );
        window.addEventListener("keydown", keyMovement);
    }, [context, dispatch, keyMovement, height, snake, width]);

    useEffect(() => {
        setContext(canvasRef.current && canvasRef.current.getContext("2d"));
        clearBoard(context);
        designCharacters(context, snake, "#31C483");
        designCharacters(context, [position], "#856FA3");

        if (snake[0].x === position?.x && snake[0].y === position?.y) {
            setIsEaten(true);
        }

        if (
            hasSnakeCollided(snake, snake[0]) ||
            snake[0].x >= width ||
            snake[0].x <= 0 ||
            snake[0].y <= 0 ||
            snake[0].y >= height
        ) {
            setEndGame(true);
            dispatch(stopGame());
            window.removeEventListener("keydown", keyMovement);
        } else setEndGame(false);
    }, [context, position, snake, height, width, dispatch, keyMovement]);


    return (
        <>
            <canvas
                className="canvas-container"
                ref={canvasRef}
                width={width}
                height={height}
                style={{
                    border: `1px solid ${endGame ? "red" : "#E3E7F1"}`,
                  }}
            />
            <Instruction resetGame={resetGameNow} />
        </>
    );
};

export default Board;

export interface CanvasScreen {
    width: number;
    height: number;
}
