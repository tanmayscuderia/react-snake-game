import { DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN, LEFT, RIGHT, UP, DOWN, Coordinates, setDirection, STOP_GAME, RESET } from "../actions";
import { delay, put, PutEffect, CallEffect, takeLatest } from 'redux-saga/effects';

function* watchSaga() {
    yield takeLatest([RESET, STOP_GAME, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN], changeSaga);
}

export function* changeSaga(params: {
    type: string;
    payload: Coordinates;
}): Generator<
    CallEffect<true>
    | PutEffect<{ type: string; payload: Coordinates }>
    | PutEffect<{ type: string; payload: string }>
> {
    while (params.type !== STOP_GAME && params.type !== RESET) {
        const paramsType = params.type.split("_")[1];
        yield put({
            type: paramsType,
            payload: params.payload,
        });

        switch (paramsType) {
            case UP:
                yield put(setDirection(UP));
                break;
            case DOWN:
                yield put(setDirection(DOWN));
                break;
            case LEFT:
                yield put(setDirection(LEFT));
                break;
            case RIGHT:
                yield put(setDirection(RIGHT));
                break;
        }
        yield delay(100);
    }
}

export default watchSaga;