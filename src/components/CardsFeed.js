import React, { Component } from 'react'
import { Card, Icon, Label } from 'semantic-ui-react';
import { COLOR, LIMIT_IN_DECK } from '../cards-rarity-config';

class CardInfo extends React.Component {
  shouldComponentUpdate(next) {
    console.log('cardsInFeed');
    if (
      next.card.id === this.props.card.id &&
      next.quantity === this.props.quantity
    ) {
      console.log('równe');
      return false;
    }
    return true;
  }

  render() {
    const { card, quantity } = this.props;
    return (
      <Card
        color={COLOR[card.rarity]}
        fluid
        onClick={() => this.props.addToDeck(card)}
        key={card.id}
      >
        <Card.Content>
          <Card.Header>
            {quantity && `${quantity}/${LIMIT_IN_DECK[card.rarity]} `}
            {quantity === LIMIT_IN_DECK[card.rarity] && <Icon name="lock" />}
            {card.name}
          </Card.Header>
          <Card.Meta>
            {card.type} | {card.cardClass}
          </Card.Meta>
          <Card.Description>
            <span
              dangerouslySetInnerHTML={{
                __html: card.text,
              }}
            />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Label color={COLOR[card.rarity]}>
            {card.cost}
            <Label.Detail>
              <Icon name="diamond" />
            </Label.Detail>
          </Label>

          {card.attack !== undefined && (
            <Label basic color="grey">
              {card.attack}
              <Label.Detail>
                <Icon name="lightning" />
              </Label.Detail>
            </Label>
          )}
          {card.health && (
            <Label basic color="red">
              {card.health}
              <Label.Detail>
                <Icon name="tint" />
              </Label.Detail>
            </Label>
          )}
          {card.race && (
            <Label basic color="black">
              {card.race}
            </Label>
          )}
        </Card.Content>
      </Card>
    );
  }
}

export class CardsFeed extends React.Component {
  render() {
    return (
      <Card.Group>
        {this.props.cardsInFeed.map(card => (
          <CardInfo
            key={card.id}
            card={card}
            quantity={this.props.deck.quantity[card.id]}
            addToDeck={this.props.addToDeck}
          />
        ))}
      </Card.Group>
    );
  }
}
