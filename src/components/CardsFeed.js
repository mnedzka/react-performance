import React, { memo } from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import { FixedSizeList } from 'react-window';

import { COLOR, LIMIT_IN_DECK } from '../cards-rarity-config';

const CardInfo = memo(props => {
  const { card, quantity, addToDeck, height } = props;
  return (
    <Card
      color={COLOR[card.rarity]}
      fluid
      style={{ height }}
      onClick={() => addToDeck(card)}
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
});

export class CardsFeed extends React.PureComponent {
  render() {
    return (
      <FixedSizeList
        itemData={this.props.cardsInFeed}
        height={750}
        itemCount={this.props.cardsInFeed.length}
        itemSize={180}
      >
        {({ data, index, style }) => {
          const card = data[index];
          const height = style.height - 10;
          const quantity = this.props.deck.quantity[card.id];
          return (
            <div style={{ ...style, padding: 5 }}>
              <CardInfo
                addToDeck={this.props.addToDeck}
                height={height}
                card={card}
                quantity={quantity}
              />
            </div>
          );
        }}
      </FixedSizeList>
    );
  }
}