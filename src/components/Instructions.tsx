import './Instructions.css';

const Instruction = ({ resetGame }: InstructionType) => { 
 return (
    <div className='instructions-container'>
    <h3> Guidelines </h3>
    <div>
        Press 'S' to start
    </div>
    <div>
        Use the 'Arrow keys' to move the snake
    </div>
    <div className='reset-game-container'>
        <button className="button" onClick={() => resetGame()}> Reset</button>
    </div>
    </div>
)};

export default Instruction;

export interface InstructionType {
    resetGame: () => void;
}