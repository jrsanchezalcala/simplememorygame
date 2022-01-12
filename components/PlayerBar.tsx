import IPicture from "../interfaces/IPicture";
import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { Grid, Typography } from "@mui/material";
import IPlayer from "../interfaces/IPlayers";

type Props = {
    player: IPlayer,

}

const PlayerBar: FunctionComponent<Props> = ({ player }) => {
    return (
        <>
            <Grid container direction="row" sx={{justifyContent:"center"}}>
                <Typography variant="body1" color="primary" sx={{paddingRight : 2}}>{player.name}</Typography>
                <Typography variant="body2" sx={{paddingLeft : 2 , fontWeight : "bold"}}>Score : {player.totalScore || 0}</Typography>
            </Grid>
        </>
    );
}

export default PlayerBar;