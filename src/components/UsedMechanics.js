import React from 'react';
import { Label, Header } from 'semantic-ui-react';

export class UsedMechanics extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header size="medium">Użyte mechaniki:</Header>
        <Label.Group>
          {Object.keys(this.props.usedMechanics).map(c => (
            <Label
              as="a"
              onMouseOver={() => this.props.setHighlightMechanic(c)}
              onMouseOut={() => this.props.setHighlightMechanic('')}
              basic
              key={c}
            >
              {c}
              <Label.Detail>{this.props.usedMechanics[c]}</Label.Detail>
            </Label>
          ))}
        </Label.Group>
      </React.Fragment>
    );
  }
}
