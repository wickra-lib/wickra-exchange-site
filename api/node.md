# Node.js

Native napi-rs bindings over the Rust core. The same `Exchange` API — a paper
account fills through the wickra-backtest engine behind the trait a live venue
uses.

```bash
npm install wickra-exchange
```

```javascript
import { Exchange, OrderRequest } from 'wickra-exchange'

const ex = Exchange.paper({ USDT: 100000 }, 1, 5, 10)
console.log('venue:', ex.name())
ex.setPrice('BTC/USDT', 20000)

const order = ex.placeOrder(OrderRequest.marketBuy('BTC/USDT', 1))
console.log(`filled at ${order.averagePrice} (status ${order.status})`)

for (const [asset, free] of Object.entries(ex.balances())) {
  console.log(`  ${asset} free: ${free}`)
}

for (const event of ex.pollEvents()) {
  console.log('event:', event.kind)
}
```

A live venue is the same class — `Exchange.new('binance', creds, opts)` — so the
strategy code is identical paper ↔ live.

## More

- [npm](https://www.npmjs.com/package/wickra-exchange)
- [Source & examples](https://github.com/wickra-lib/wickra-exchange/tree/main/examples/node)
- [Exchanges](https://github.com/wickra-lib/wickra-exchange/blob/main/docs/EXCHANGES.md) · [Authentication](https://github.com/wickra-lib/wickra-exchange/blob/main/docs/AUTH.md)
