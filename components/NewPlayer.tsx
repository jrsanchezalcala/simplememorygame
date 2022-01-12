import IPicture from "../interfaces/IPicture";
import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import IPlayer from "../interfaces/IPlayers";
import { FormControl, InputLabel, Input, FormHelperText, TextField } from "@mui/material";

type Props = {
    player: IPlayer,
    onChange: (player: IPlayer) => void
}


const NewPlayer: FunctionComponent<Props> = ({ player = { name: "" }, onChange = () => { } }) => {
    return (
        <>
           <TextField
  helperText="Player name"
  id="player"
  label=""
/>
        </>
    );
}

export default NewPlayer;