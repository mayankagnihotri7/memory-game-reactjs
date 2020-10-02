import React, { Component } from "react";
import BOX_DATA from "../box.data";
import Box from "./Box";
import uuid from "react-uuid";

export default class BoxContainer extends Component {
  constructor() {
    super();
    this.state = {
      cards: BOX_DATA,
      numberOfMoves: 0,
      score: 0,
      visibleTile: null,
    };
  }

  openCard = (id) => {
    let newCards = this.state.cards.map((card) => {
      if (card.id === id) {
        card.isClicked = true;
      }
      return card;
    });
    this.setState({ cards: newCards });
  };

  closeCard = (id) => {
    let newCards = this.state.cards.map((card) => {
      if (card.id === id) {
        card.isClicked = false;
      }
      return card;
    });
    this.setState({ cards: newCards });
  };

  handleClick = (id, name) => {
    // check if any tile is already open
    if (!this.state.visibleTile) {
      // if no open tile, set clicked tile to open
      this.openCard(id);
      this.setState({
        visibleTile: {
          id,
          name,
        },
      });
      console.log(this.state.visibleTile, "if not open");
    } else {
      // if open tile exists, check for match.
      if (
        this.state.visibleTile.id !== id &&
        this.state.visibleTile.name === name
      ) {
        // MATCH!!
        this.openCard(id);
        this.setState({ visibleTile: null });
        console.log("Matched!");
      } else {
        // NO MATCH
        this.openCard(id);
        setTimeout(() => {
          this.closeCard(this.state.visibleTile?.id);
          this.setState({ visibleTile: null });
          this.closeCard(id);
        }, 1000);
        console.log("no match!");
      }
    }

    // let newCards = this.state.cards.map((card) => {
    //   if (name === card.name && id !== card.id) {
    //     card.isClicked = true;
    //   } else {
    //     // console.log("Try Again!");
    //   }
    //   return card;
    // });
    // this.setState({ card: newCards });
  };

  render() {
    const { cards } = this.state;

    return (
      <div className="container">
        <h1>Score: {this.state.score}</h1>
        <h2>Moves: {this.state.numberOfMoves}</h2>
        <ul className="deck">
          {cards.map((card) => {
            /* return <Box key={uuid()} {...card} click={this.handleClick} />; */

            return (
              <li
                onClick={() => this.handleClick(card.id, card.name)}
                className="card"
                key={uuid()}
              >
                {!card.isClicked ? (
                  <span></span>
                ) : (
                  <div className="card">{card.icon}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
