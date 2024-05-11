import React, { useState } from "react";
import "../../Styles/LandingAuth/InstructionsModal.css";

/**
 * An interface that provides strong typing to an instruction modal's enabled prop.
 */
export interface InstructionsModalProp {

  /**
   * Whether or not the modal is enabled.
   */
  instructionsModalState: boolean;
}

/**
 * A modal that pops out when the i icon is clicked on the homepage.
 * It brings a popup with the instructions of how to play the game.
 */
const InstructionsModal: React.FC<InstructionsModalProp> = ({instructionsModalState}) => {
  return (
    <div
      className={
        "instructions-modal " + (instructionsModalState ? "" : "disabled")
      }
    >
      <p className="title">
        <b>RULES</b>
      </p>
      <div className="rules">
        <p>
          <b>SETTING UP THE GAME</b>
          <br />
          The first 2 rounds of gameplay will be for setup. On each turn, place
          1 road and 1 settlement on the game board.
          <br />
          <b>BUILDING COSTS</b>
          <br />
          You receive resources for each terrain hex around vour starting
          settlements. You will receive the appropriate resource cards from
          their stacks when the number on the hex is rolled. Each player keeps
          their resource cards hidden in their hand.
          <br />
          Important: Settlements and cities may only be placed at the corners of
          the terrain hexes never along the edges. Roads may only be placed at
          the edges of the terrain hexes - 1 road per edge.
          <br /> <b>TURN OVERVIEW</b>
          <br />
          On your turn, you can do the following in the order listed: You must
          roll for resource production (the result applies to all players). You
          may trade resource cards with other players and/or with the bank. You
          may build roads, settlements or cities and/or buy development cards.
          You may also play one development card at any time during your turn.
          After you're done, click the pass turn button.
        </p>
        <p className="list">
          <b>1. Resource Production.</b> You begin your turn by clicking the
          roll dice button. The sum of the dice determines which terrain hexes
          produce resources. Each player who has a settlement on an intersection
          that borders a terrain hex marked with the number rolled receives 1
          resource card of the hex's type. If you have 2 or 3 settlements
          bordering that hex, you receive 1 resource card for each settlement.
          You receive 2 resource cards for each city you own that borders that
          hex.
        </p>
        <p className="list">
          <b>2. Trade.</b> Afterwards, you may trade freely to gain needed
          resource cards by clicking the “trade” button.
        </p>
        <p className="list">
          <b>3. Build.</b> Now you can build. Through building, you can increase
          your victory points, expand your road network, improve your resource
          production, and/or buy useful development cards. To build, you must
          pay specific combinations of resource cards. When you click the action
          you want to take and where you want to place, the appropriate number
          of cards will be taken from your hand. Development cards cannot be
          played until the next round.
        </p>
        <p className="sub-list">
          a) <u>Road (Requires: Brick & Lumber).</u> The player with the most
          number of roads on the board greater than 5 receives the special card
          of “Most Roads” <i>Tip: This creates a 4 victory point swing!</i>
        </p>
        <p className="sub-list">
          b) <u>Settlement (Requires: Brick, Lumber, Wool, & Grain).</u> Each
          settlement is worth 1 victory point.
        </p>
        <p className="sub-list">
          c) <u>City (Requires: 3 Ore & 2 Grain).</u> You may only establish a
          city by upgrading one of your settlements. When you upgrade a
          settlement to a city, the number on your settlement will increment to
          symbolize how many of each resource you will receive. Each city is
          worth the number it displays in victory points.
        </p>
        <p className="sub-list">
          d) <u>Buying a Development Card (Requires: Ore, Wool, & Grain).</u>
          When you purchase a development card, the actions corresponding to
          them will be automatically performed. Each has a different effect (see
          4.a, below).
        </p>
        <p className="list">
          <b>4. Special Cases</b>
        </p>
        <p className="sub-list">
          a) <u>Knight Cards:</u> If you play a knight card, you will receive a
          random resource from the bank. If a player holds 3 knight cards, they
          receive the special card "Largest Army," which is worth 2 victory
          points. If another player has more knight cards in front of them than
          the current holder of the Largest Army card, they immediately receive
          the special card and its 2 victory points.
        </p>
        <p className="sub-list">
          b) <u>Victory Point Cards:</u> When you draw this type of development
          card, you will automatically receive a victory point.
        </p>
        <b>ENDING THE GAME</b>
        <br /> If you have 10 or more victory points during your turn, the game
        ends and you are the winner! If you reach 10 points when it is not your
        turn, the game continues until any player (including you) has 10 points
        on their turn.
      </div>
    </div>
  );
};

export default InstructionsModal;
