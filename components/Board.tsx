import IPicture from "../interfaces/IPicture";
import React, { FunctionComponent, useState } from 'react'
import Card from './Card';
import { Grid } from "@mui/material";
import GamePicture from "../models/GamePicture";

type Props = {
  cells : GamePicture[][],
  onSelect ?: (row : number,col : number) => void
}


const Board :   FunctionComponent<Props> = ({ cells , onSelect  }) => {

    const handleClick = (row : number, col : number) => {
        onSelect(row,col);
    }
    const calcWidth = (cells : GamePicture[][]) => {
        let maxWidth = 200;
        let minWidth = 50;
        if(!cells || cells.length == 0)
        return 0;
        let numberColumns = cells[0].length;
        let calcWidth = window?.innerWidth ?  window.innerWidth / numberColumns * 0.8 : minWidth;
        
        return calcWidth > maxWidth ? maxWidth : calcWidth;
    }

    const calcHeight = (cells: GamePicture[][]) => {
        return calcWidth(cells);
    }
    
    return(
        <>
        <style jsx>
           { `
                .card {
                    
                    margin : 2px
                }
            `}
        </style>
        <Grid container>
            {// in this scenerio we get the indexes as a key becouse the index is the key like the key ok each cell in each game 
            cells.map((row,rowIndex) => {
                return <Grid key = {rowIndex} sx={{justifyContent:"center" }} container>
                {
                row.map((col,colIndex) => {
                  return <div  className="card" key={colIndex} onClick={() => handleClick(rowIndex,colIndex)} >
                      <Card picture={col} isUp={col.selected ? true : false} width={calcWidth(cells)} height={calcHeight(cells)}></Card>
                      </div>   
                })
                }
                </Grid>

            })}    
        </Grid>

        </>
    );
}


export default Board;