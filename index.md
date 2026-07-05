---
layout: home
title: Wickra Exchange — one typed API across ten crypto exchanges
titleTemplate: false

hero:
  name: "Wickra Exchange"
  text: "One typed API. Ten exchanges."
  tagline: "Market data and signed order execution across 10 crypto exchanges, in eight languages. One compile-time-typed Exchange trait, built on the Wickra core."
  image:
    src: /wickra-mark.svg
    alt: Wickra Exchange
  actions:
    - theme: brand
      text: View on GitHub
      link: https://github.com/wickra-lib/wickra-exchange
    - theme: alt
      text: Exchanges
      link: https://github.com/wickra-lib/wickra-exchange/blob/main/docs/EXCHANGES.md
    - theme: alt
      text: API
      link: /api/rust

features:
  - icon: 🧩
    title: One typed API
    details: A single compile-time-typed Exchange trait spans all ten venues. Symbols, order types, the local order-book builder and reconnect/resubscribe are shared; only the signing family differs per exchange.
  - icon: 🌐
    title: Ten venues
    details: "Binance, OKX, Bybit, Coinbase, Upbit, Bitget, Gate.io, Kraken, KuCoin and HTX — spot and derivatives behind bespoke authentication and WebSocket state machines."
  - icon: 🧮
    title: Exact decimals
    details: Prices and quantities in the order layer are exact Decimal, never f64. Market-data streams are pull-based (poll_events), so the same surface crosses the C ABI to every binding — including single-threaded R.
  - icon: 📦
    title: Eight languages, zero deps
    details: "Native Rust, Python and Node.js plus a C ABI that C, C++, C#, Go, Java and R link against. No third-party runtime dependencies. No WASM: signed trading needs raw sockets and secret keys a browser forbids."
  - icon: 🔁
    title: Paper equals live
    details: PaperExchange is a first-class Exchange that simulates fills through the wickra-backtest engine. The same strategy runs paper ↔ live by swapping the implementation — nothing else changes.
  - icon: 📈
    title: Microstructure-native
    details: "Funding, open interest, liquidations and long/short ratio arrive as the exact typed shapes wickra-core consumes (DerivativesTick, OrderBook, TradePrint, CrossSection) — feeding 514 indicators and the backtester with zero glue."
---

<script setup>
const installTabs = [
  { label: 'Python', lang: 'bash', code: 'pip install wickra-exchange' },
  { label: 'Node',   lang: 'bash', code: 'npm install wickra-exchange' },
  { label: 'Rust',   lang: 'bash', code: 'cargo add wickra-exchange' },
  { label: 'C',      lang: 'bash', code: '# prebuilt header + library from GitHub releases:\n# github.com/wickra-lib/wickra-exchange/releases' },
  { label: 'C#',     lang: 'bash', code: 'dotnet add package WickraExchange' },
  { label: 'Go',     lang: 'bash', code: 'go get github.com/wickra-lib/wickra-exchange-go' },
  { label: 'Java',   lang: 'xml',  code: '<!-- Maven Central -->\n<dependency>\n  <groupId>org.wickra</groupId>\n  <artifactId>wickra-exchange</artifactId>\n  <version>0.1.0</version>\n</dependency>' },
  { label: 'R',      lang: 'r',    code: 'install.packages("wickraexchange", repos = "https://wickra-lib.r-universe.dev")' },
]

const rustCode = `use rust_decimal_macros::dec;
use wickra_exchange::{Exchange, Execution, MarketData, OrderRequest, PaperExchange, Symbol};

let market = Symbol::new("BTC", "USDT");

// A paper account is a first-class Exchange: it fills deterministically
// through the wickra-backtest engine — the same API a live venue uses.
let mut exchange = PaperExchange::new()
    .with_fees(dec!(1), dec!(5))       // maker / taker basis points
    .with_slippage_bps(dec!(10))
    .with_balance("USDT", dec!(100000));
exchange.set_price(&market, dec!(20000));

let order = exchange.place_order(&OrderRequest::market_buy(market, dec!(1)))?;
println!("filled at {:?} ({:?})", order.average_price, order.status);

for event in exchange.poll_events() {
    println!("event: {event:?}");
}`

const pyCode = `import wickra_exchange as wx

# A paper account is a first-class Exchange: same API as a live venue.
ex = wx.Exchange.paper({"USDT": 100_000.0}, maker_bps=1.0, taker_bps=5.0, slippage_bps=10.0)
ex.set_price("BTC/USDT", 20_000.0)

order = ex.place_order(wx.OrderRequest.market_buy("BTC/USDT", 1.0))
print(f"filled at {order['average_price']} (status {order['status']})")

for event in ex.poll_events():
    print("event:", event["type"])`

const nodeCode = `import { Exchange, OrderRequest } from 'wickra-exchange'

// A paper account is a first-class Exchange: same API as a live venue.
const ex = Exchange.paper({ USDT: 100000 }, 1, 5, 10)
ex.setPrice('BTC/USDT', 20000)

const order = ex.placeOrder(OrderRequest.marketBuy('BTC/USDT', 1))
console.log(\`filled at \${order.averagePrice} (status \${order.status})\`)

for (const event of ex.pollEvents()) {
  console.log('event:', event.kind)
}`

const snippetTabs = [
  { label: 'Rust',   lang: 'rust',       code: rustCode },
  { label: 'Python', lang: 'python',     code: pyCode },
  { label: 'Node',   lang: 'javascript', code: nodeCode },
]
</script>

## Install

The same `Exchange` API from every language — native Rust, Python and Node.js, plus a C ABI for C, C++, C#, Go, Java and R.

<InstallTabs :tabs="installTabs" />

## The paper account is a first-class exchange

`PaperExchange` implements the same `Exchange` trait a live venue does and fills
orders deterministically through the [wickra-backtest](https://github.com/wickra-lib/wickra-backtest)
engine. A strategy written against the trait runs paper ↔ live by swapping the
implementation — no key, no network, same code.

<InstallTabs :tabs="snippetTabs" />

## Built on the Wickra core

Wickra Exchange is part of the [Wickra](https://wickra.org) ecosystem. Its
microstructure feeds — funding, open interest, liquidations, long/short ratio —
arrive as the exact typed shapes [`wickra-core`](https://github.com/wickra-lib/wickra)
consumes, so the same data drives 514 streaming indicators, the backtester, and
live execution with zero glue.

> ⚠️ **Real orders move real money.** Every signed-execution path is
> safety-critical. Use withdrawal-disabled keys, test against exchange testnets
> first, and never put secret keys in a browser or client. Wickra Exchange is not
> a trading system and comes with no warranty — use at your own risk.
