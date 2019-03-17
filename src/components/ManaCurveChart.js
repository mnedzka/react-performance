import React from 'react';
import { BarChart, Bar, YAxis, XAxis, ResponsiveContainer } from 'recharts';
import memoize from 'memoize-one';

const calc = deck => {
  const cardsByCost = deck.cards
    .reduce(
      (a, v) =>
        deck.quantity[v.id] === 2
          ? a.concat([v.cost, v.cost])
          : a.concat([v.cost]),
      []
    )
    .reduce((a, v) => {
      let count = {};
      if (v >= 7) {
        count = { '7+': (a['7+'] || 0) + 1 };
      } else {
        count = { [v]: (a[v] || 0) + 1 };
      }
      return Object.assign(a, count);
    }, {});

  const data = Array(8)
    .fill(0)
    .map((v, i) => {
      if (i >= 7) {
        return { text: '7+', cost: cardsByCost['7+'] || 0 };
      }
      return { text: i, cost: cardsByCost[i] || 0 };
    });

  return data
}

const memoizedCalc = memoize(calc)

export default class ManaCurveChart extends React.Component {
  render() {
    const data = memoizedCalc(this.props.deck)
    return (
      <ResponsiveContainer height={150}>
        <BarChart data={data}>
          <YAxis hide type="number" domain={[0, 'dataMax']} />
          <XAxis
            orientation="bottom"
            axisLine={false}
            tickLine={false}
            dataKey="text"
          />
          <Bar
            stroke={this.props.colorSafe ? '#000000' : undefined}
            label={{
              fill: this.props.colorSafe ? '#000000' : '#21ba45',
              formatter: v => (v === 0 ? null : v),
            }}
            dataKey="cost"
            fill={this.props.colorSafe ? '#ffffff' : '#ffc658'}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
