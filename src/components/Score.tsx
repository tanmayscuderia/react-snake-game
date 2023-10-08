import { useSelector } from "react-redux";
import { State } from '../store/reducers';
import './Score.css';

const Score = () => {
    const getScore = useSelector((state: State) => state.score);

    return (
        <div className="score-container">
            Score: {getScore}
        </div>
    );
}

export default Score;