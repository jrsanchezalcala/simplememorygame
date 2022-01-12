import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import GAME_DIFFICOULT from '../enums/GAME_DIFFICOULT'
import IPlayer from '../interfaces/IPlayers'
import Router from 'next/router'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import GAME_STATE from '../enums/GAME_STATE'

const SelectPlayer: NextPage = () => {
  let [difficoult, setDifficoult] = useState<GAME_DIFFICOULT>(GAME_DIFFICOULT.EASY);
  let [players, setPlayers] = useState<Array<IPlayer>>([{ name: "" }]);
  let [error, setError] = useState<string>(null);
  const handleChangePlayer = (name: string, index: number) => {

    let repeated = repeatedPlayerName(name);
    let changePlayers = [...players];
    changePlayers[index].name = name;
    setPlayers(changePlayers);
    if (repeated)
      setError("There are repeated player names , please insert different names");
    else
      setError("");
  }

  const repeatedPlayerName = (name: string) => {
    return players.filter((player) => player.name === name).length > 0;
  }
  const removePlayer = (index: number) => {
    let temp = [...players];
    temp.splice(index, 1);
    setPlayers(temp);
  }

  const renderPlayers = () => {

    return <Grid container>
    {players && players.map((item, index) => {
          return <Grid item>
            <TextField required
            id="outlined-required"
            label="Player Name"
            defaultValue={item.name} value={item.name} key={index} onChange={(e) => handleChangePlayer(e.target.value, index)}
          />
            {index > 0 && <IconButton onClick={() => { removePlayer(index) }} ><RemoveIcon></RemoveIcon></IconButton>}
            </Grid >
      })
    }
    </Grid>

      }

  const addPlayer = () => {
    if (players.length < 10) {
        setPlayers([...players, { name: "" }]);
    }
  }

  const canSubmit = () => {
        let submitPlayers = players.filter((item) => item.name)
    return submitPlayers.length > 0 && !error
  }

  const submit = () => {
        let playersQuery = btoa(JSON.stringify(players));
      let query = `?difficoult=${difficoult}&players=${playersQuery}`;
      Router.push("/game" + query);
  }
      console.log(canSubmit());
      return (
      <>
        <Head>
          <title>Simple memory game example</title>
          <meta name="description" content="Created by Juan Sanchez Alcala" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

        </Head>

        <main>
          <Grid container sx={{ justifyContent: "center", padding: 2 }} spacing={2}>
            <Grid item sx={{ marginBottom: 2 }}>
              <Typography variant="h5">Memory Game Example</Typography>
              <Typography variant="subtitle1">By Juan Sanchez Alcala</Typography>
            </Grid>
            <Grid container item>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Difficoult</InputLabel>
                <Select
                  labelId="difficoult-label"
                  id="difficoult"
                  value={difficoult}
                  label="Difficoult"
                  onChange={(e) => { setDifficoult(e.target.value as GAME_DIFFICOULT) }}
                >
                  <MenuItem value={GAME_DIFFICOULT.EASY}>EASY</MenuItem>
                  <MenuItem value={GAME_DIFFICOULT.MEDIUM}>MEDIUM</MenuItem>
                  <MenuItem value={GAME_DIFFICOULT.HARD}>HARD</MenuItem>


                </Select>
              </FormControl>
            </Grid>
            <Grid container item>
              <Grid container direction="row" sx={{ alignItems: "center" }} item>
                <Typography>Players</Typography>
                {players.length < 10 ? <Button onClick={addPlayer}><AddIcon></AddIcon></Button> : null}
              </Grid>
              <Grid container item>
                {

                  renderPlayers()
                }
              </Grid>

            </Grid>
            <Grid sx={{ marginTop: 2 }}>
              <Button variant="contained" disabled={!canSubmit()} onClick={submit}>Play</Button>
            </Grid>
          </Grid>
        </main>

      </>


      )
}

      export default SelectPlayer
