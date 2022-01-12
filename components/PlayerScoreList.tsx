import IPicture from "../interfaces/IPicture";
import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import IPlayer from "../interfaces/IPlayers";

type Props = {
    players: IPlayer[],

}

const PlayerScoreList: FunctionComponent<Props> = ({ players }) => {
    let playersOrdered = players.sort((a,b) => {
        return a.totalScore - b.totalScore;
    })
    return (
        <>
            <List >
                {playersOrdered && playersOrdered.map((player) => {
                    return <ListItem>
                         <ListItemText sx={{paddingRight : 2}}
                    primary={player.name}
                   
                  />
                   <Typography sx={{fontWeight:"bold"}} variant="body2">
                     {player.totalScore || 0}
                  </Typography>
                    </ListItem>
                })}
                </List>

        </>
    );
}

export default PlayerScoreList;