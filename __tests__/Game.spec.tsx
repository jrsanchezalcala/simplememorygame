import GAME_DIFFICOULT from "../enums/GAME_DIFFICOULT";
import GAME_STATE from "../enums/GAME_STATE";
import IPictureService from "../interfaces/IPictureService";
import IPlayer from "../interfaces/IPlayers";
import Game from "../models/Game";

const pictures: any = {
    "pic1": {
        name: "pic1",
        src: "pic1.jpg",
        description: "pic1 dsc",
    },
    "pic2": {
        name: "pic2",
        src: "pic2.jpg",
        description: "pic2 dsc",
    },
    "pic3": {
        name: "pic3",
        src: "pic3.jpg",
        description: "pic3 dsc",
    },
    "pic4": {
        name: "pic4",
        src: "pic4.jpg",
        description: "pic4 dsc",
    }
}

describe('Game Model', () => {
    let model: Game;
    let mockService: IPictureService = {
        getAllPictures: function () {
            return pictures;

        },
        load: (nPictures) => {

        }
        ,
        getPicture: (name: any) => {
            if (typeof name === "number") {
                return Object.values(pictures)[name];
            }
            else {
                let ob: any = pictures[name];
                return ob;
            }

        },


        setPicture: (picture) => {

        }
    }
    let playerAlone: IPlayer[] = [{ name: "Juan", totalScore: 0, totalAttempts: 0, totalTimePlay: 0 }]

    beforeEach(() => {


        model = new Game(playerAlone, mockService, GAME_DIFFICOULT.EASY);

    })

    it('buildRandomCells', async () => {
        let cells = await model.buildRandomCells(4, 2);
        expect(cells).toBeDefined();
        expect(cells.length).toBe(4);
        for (let i = 0; i < pictures.length; i++) {
            expect(cells[i].length).toBe(2);
        }

        //expect two of each picture;
        let cellsOneDimension: any = [];
        cells.forEach((row) => { row.forEach(col => { cellsOneDimension.push(col) }) });

        for (let item of cellsOneDimension) {
            let counter = 0;

            for (let item2 of cellsOneDimension) {
                if (item.name == item2.name)
                    counter++;
            }

            expect(counter).toBe(2);
        }


    });

    it('start Game', async () => {
        await model.start();
        expect(model.cells.length === 4);
        expect(model.cells[0].length === 2);
        expect(model.activePlayer).toBe(model.players[0]);
    });

    it('attempts win', async () => {
        await model.start();
        let cells = model.cells;
        let cellsOneDimensionNoRepeated: any = [];
        cells.forEach((row) => {
            row.forEach(col => {
                if(cellsOneDimensionNoRepeated.indexOf(col) < 0)
                    cellsOneDimensionNoRepeated.push(col);
            })
        });
        expect(cellsOneDimensionNoRepeated.length > 0 ).toBe(true);
        for (let cell of cellsOneDimensionNoRepeated) {
            let indexes = findIndexes(cell, cells);
            let res = model.attempt(indexes);
            expect(res).toBe(true);
        }

        //we expect the game will end
        expect(model.state).toBe(GAME_STATE.ENDED);
        expect(model.tempScore).toBe(0);

    })

    it('attempts fail', async () => {
        await model.start();
        let cells = model.cells;
        let cellsOneDimensionNoRepeated: any = [];
        cells.forEach((row) => {
            row.forEach(col => {
                if(cellsOneDimensionNoRepeated.indexOf(col) < 0)
                    cellsOneDimensionNoRepeated.push(col);
            })
        });
        expect(cellsOneDimensionNoRepeated.length > 0 ).toBe(true);
        let nextFail = false;
        let cell = cellsOneDimensionNoRepeated[0];           
        let indexes = findIndexes(cell, cells);
        let res = model.attempt(indexes);
         expect(res).toBe(true);
            expect(model.activePlayer.totalScore == 1);
        
        // make a fail in next attemp 
        
        cell = cellsOneDimensionNoRepeated[0];           
         indexes = findIndexes(cell, cells);
         indexes[1].x = indexes[1].x == model.cells.length - 1 ? 0 : indexes[1].x + 1;
         res = model.attempt(indexes);
         expect(res).toBe(false);
            expect(model.activePlayer.totalScore == 0);

    })
})


function findIndexes(picture: any, cells: any) {
    let repeated = [];

    for (let x = 0; x < cells.length; x++) {
        let row = cells[x];
        for (let y = 0; y < row.length; y++) {
            let column = row[y];
            if (column.name == picture.name) {
                repeated.push({ x, y });
            }
        }
    }
    return repeated;
}