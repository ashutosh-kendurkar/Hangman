import React from 'react';

class Hangman extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words:['hangman','test','endgame','tesla'],
            word: '',
            entry: '',
            guesses: '',
            attempts: 0,
            wordWithMissingLetters: '',
            success:false
        }
    }


    createNewWord = () => {
        let finalWord = '';
        const _word=this.state.words[(Math.floor(Math.random() * 2) + 1  )]
        _word.split('').map((letter, index) => {
            if (index % 2 === 0) {
                finalWord = finalWord + letter;
            }
            else {
                finalWord = finalWord + '_';
            }
        });
        this.setState({ attempts:0,entry:'',guesses:'', word:_word, wordWithMissingLetters: finalWord,success:false });
        this.nameInput.focus();
    }

    componentDidMount() {
        this.createNewWord();
    }



    replaceChar = (char, index) => {
        let arr = this.state.wordWithMissingLetters.split("");
        arr[index] = char;
        let result = arr.join("");
        return result;
    }

    checkEntry = () => {
        let newWord=this.state.wordWithMissingLetters;
        newWord.split("").map((ch, index) => {
            if (ch === '_') {
                if (this.state.word.charAt(index) === this.state.entry) { 
                    newWord = this.replaceChar(this.state.entry, index) 
                };
            }
        })
        this.checkResult(newWord);
              
    }

    checkResult=(newWord)=>{
        let _success=this.state.success;
        if(newWord.includes('_') && this.state.attempts>=10){
            _success=false;
        }
        if(!newWord.includes('_')){
            _success=true;
        }

        this.setState({ wordWithMissingLetters: newWord,success:_success });
    }

    handleEntry = (e) => {
        if (this.state.attempts <= 10 && this.state.wordWithMissingLetters.includes("_")) {
            this.setState({ entry: e.key, attempts: this.state.attempts + 1, guesses: this.state.guesses + e.key }, () => this.checkEntry());
        }
        
    }

    showResult =()=>{
        if(this.state.success){
            return <span className='success'>Congratulations! you have won.</span>
        }
        else{
            if(this.state.attempts>=10){
                return <span className='failed'>Sorry, No of Attempts are Over, you have failed</span>
            }
        }
    }

    render() {
        return (
            <div>
                <span>{this.showResult()}</span>
                <br/>
                <span>Guess the missing letters</span>
                <br />
                {this.state.wordWithMissingLetters}
                <br />
                <input
                    type="text"
                    id="missingLetter"
                    value={this.state.entry}
                    onKeyPress={this.handleEntry}
                    ref={(input) => { this.nameInput = input; }} 
                ></input>
                <br />
                <span>Attempts</span>
                <br />
                {this.state.guesses.split("").join(' ')}
                <br/>
                <button onClick={()=>this.createNewWord()}>Start Over</button>
            </div>
        )
    }
}

export default Hangman;