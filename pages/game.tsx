import type { NextPage } from 'next'
import PlayerBar from '../components/PlayerBar'
import GAME_DIFFICOULT from '../enums/GAME_DIFFICOULT'
import GAME_STATE from '../enums/GAME_STATE'
import IPictureService from '../interfaces/IPictureService'
import IPlayer from '../interfaces/IPlayers'
import IRequestService from '../interfaces/IRequestService'
import Game from '../models/Game'
import PictureService from '../services/PictureService'
import RequestService from '../services/RequestService'
import Board from '../components/Board';

import WinnerDialog from '../components/WinnerDialog';
import GamePicture from '../models/GamePicture'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Box, CircularProgress, Grid } from '@mui/material'
import PlayerScoreList from '../components/PlayerScoreList'
import Router from 'next/router'
interface Props {
  players: IPlayer[];
  difficoult: GAME_DIFFICOULT,
  timeFail?: number
}

interface Selected {
  x: number,
  y: number
}

const GamePage: NextPage<Props> = ({ players, difficoult, timeFail = 1000 }) => {
  let requestService: IRequestService = new RequestService();
  let pictureService: IPictureService = new PictureService(requestService);
  let [game, setGame] = useState<Game>(null);
  let [winner, setWinner] = useState<IPlayer>(null);
  let [loading, setLoading] = useState<boolean>(true);
  let [pause, setPause] = useState<boolean>(false);
  let [activePlayer , setActivePlayer] = useState<IPlayer>(null);
  useEffect(() => {
    let game = new Game(players, pictureService, difficoult);
    setGame(game);
    game.start().then(() => {
      setLoading(false);
      setActivePlayer({...game.activePlayer});

    });

  }, [])

  let [selected, setSelected] = useState<Array<Selected>>([]);

  const handleSelect = async (row: number, col: number) => {
    if (pause)
      return;
    let newSelection = { x: row, y: col };
    let newSelected = [...selected, newSelection];
    if (selected.length >= 1 && selected.length % 2 === 1) {
      let lastSelectedPair = newSelected.slice(-2);
      setSelected(newSelected);
      setPause(true);
      let result = await game.attempt(lastSelectedPair);
      setActivePlayer({...game.activePlayer});
      if (result) {
        if (game.state === GAME_STATE.ENDED)
          handleEnd();
        else
          setPause(false);
      }
      else {

        setTimeout(() => {
          setPause(false);
          setSelected([]);
        }, timeFail)
      }

    }
    else {
      setSelected(newSelected)
    }
  }

  const handleEnd = () => {
    setWinner(activePlayer);
    setSelected([]);
  }

  const resetPlayers = () => {
    setWinner(null);
    setGame(null);
    Router.push("/");
  }

  const restart = async () => {
    let resetPlayer = players.map((player : IPlayer) => {
      player.totalScore = 0;
      player.totalAttempts = 0;
      player.totalTimePlay = 0;
      return player;
    })
    let game = new Game(resetPlayer, pictureService, difficoult);
    await game.start();
    setWinner(null);
    setLoading(false);
    setPause(false);
    setGame(game);
    setActivePlayer(resetPlayer[0]);
  }

  function getCells(cells: GamePicture[][]) {

    let newCells = cells.map((row) => {
      return row.map((cell) => {
        return { ...cell, selected: false };
      });
    });
    selected.forEach(item => {
      newCells[item.x][item.y].selected = true;
    })
    return newCells;
  }


  if (!game)
    return <h1>Sorry there is no game</h1>;
  return (
    <>

      <Head>
        <title>Simple memory game example</title>
        <meta name="description" content="Created by Juan Sanchez Alcala" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <Grid container sx={{ padding: 2 }} spacing={2}>
        {loading ?
          <>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </> :
          <>
            <Grid container item>{activePlayer ? <PlayerBar player={activePlayer}></PlayerBar> : null}</Grid>
            <Grid container item>
              {winner ? <WinnerDialog defaultOpen={true} onClickResetPlayers={resetPlayers} onClickRestart={restart}>
                <>
                <h1>Player {game.activePlayer} has win </h1>
                <h2>Please select one of the options to play again</h2>
                </>
              </WinnerDialog> : null}
            </Grid>
            <Grid container item>
              <Board cells={getCells(game.cells as GamePicture[][])} onSelect={handleSelect}></Board>
            </Grid>
            <Grid container sx={{justifyContent:"center", borderTop:"solid 1px gray" , marginTop: 2 }} >
              <PlayerScoreList players={[...players]}></PlayerScoreList>
            </Grid>
          </>
        }
      </Grid>


    </>
  )
}



GamePage.getInitialProps = async (context) => {
  const query = context.query;
  return parseQueryData(query);
}

function parseQueryData(query: any) {
  let out = [];
  let players: IPlayer[];
  let difficoult: GAME_DIFFICOULT = query?.difficoult ? parseInt(query.difficoult) as GAME_DIFFICOULT : GAME_DIFFICOULT.HARD;
  if (query?.players)
    players = JSON.parse(atob(query?.players as string));
  else
    players = [{ name: "anonimous" }];
  return { players, difficoult };
}

export default GamePage
