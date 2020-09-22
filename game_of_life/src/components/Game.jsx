import React from 'react';
import Grid from './Grid';
import Controls from './Controls';

function copyGrid(arr) {
    return JSON.parse(JSON.stringify(arr));
}

class Game extends React.Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 25;
        this.columns = 25;
        this.state = {
            // number of cycles, simulation runs through
            generations: 0,
            // inital grid with all cells dead
            grid: Array(this.rows).fill().map(() => Array(this.columns).fill(false)), 
        }
    }

    selectCell = (row, col) => {
        // make new grid to modifiy it
        let newGrid = copyGrid(this.state.grid)
        //whatever clicked cell was set to opposite
        newGrid[row][col] = !newGrid[row][col];
        // set new grid to state
        this.setState({
            grid: newGrid
        })
    }

    randomSeed = () => {
        // make a new grid and random modify it
        let newGrid = copyGrid(this.state.grid)
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                //make a quarter of the cells alive at start
                if (Math.floor(Math.random() * 4) === 1) {
                    newGrid[i][j] = true
                }
            }
        }
        // set new grid to state
        this.setState({
            grid: newGrid
        })
    }

    play = () => {
        clearInterval(this.interval)
        this.interval = setInterval(this.run, this.speed)
    }

    pause = () => {
		clearInterval(this.intervalId);
	}

    run = () => {
        let grid = this.state.grid
        let newGrid = copyGrid(this.state.grid)

        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                let count = 0
                // i and j cannot be negative indexes then check
                // if neighbors are live and increment count if they are
                if (i > 0) {
                    if (grid[i - 1][j]) count++;
                }
                if (i > 0 && j > 0) {
                    if (grid[i - 1][j - 1]) count++;
                }
                if (i > 0 && j < this.columns - 1) {
                    if (grid[i - 1][j + 1]) count++;
                }
                if (j < this.columns - 1) {
                    if (grid[i][j + 1]) count++;
                }
                if (j > 0) {
                    if (grid[i][j - 1]) count++;
                }
                if (i < this.rows - 1) {
                    if (grid[i + 1][j]) count++;
                }    
                if (i < this.rows - 1 && j > 0) {
                    if (grid[i + 1][j - 1]) count++;
                }
                if (i < this.rows - 1 && j < this.columns - 1) {
                    if (grid[i + 1][j + 1]) count++;
                }
                //based on count set cell to live or dead
                if (grid[i][j] && (count < 2 || count > 3)) {
                    newGrid[i][j] = false;
                }
                if (!grid[i][j] && count === 3) {
                    newGrid[i][j] = true;
                }
            }
        }
        this.setState({
            grid: newGrid,
            generations: this.state.generations + 1
          });        
    }
    // for now randomly populated
    componentDidMount() {
        this.randomSeed()
        this.play()
    }

    render() {
        return (
            <div>
                <h4>Generations: {this.state.generations}</h4>
                <Grid 
                    grid={this.state.grid}
                    rows={this.rows}
                    columns={this.columns}
                    selectCell={this.selectCell}
                />
                <Controls 
                    play={this.play}
                    pause={this.pause}
                    stop={this.stop}
                />
            </div>
        )
    }
}

export default Game;