# About Wickra Exchange

Wickra Exchange is a streaming-native crypto-exchange client: one compile-time-typed
`Exchange` trait that spans the ten largest venues — Binance, OKX, Bybit, Coinbase,
Upbit, Bitget, Gate.io, Kraken, KuCoin and HTX — behind bespoke authentication and
WebSocket state machines. Market data *and* signed order execution live behind the
same API, in eight languages.

## What makes it different

- **One typed API, ten venues.** Symbols, order types, the local order-book builder
  and reconnect/resubscribe are shared. Only the per-exchange signing family differs.
- **Exact decimals.** Prices and quantities in the order layer are exact `Decimal`,
  never `f64`.
- **Pull-based streams.** Market data is drained from your own loop (`poll_events`),
  so the same surface crosses the C ABI to every binding — including single-threaded
  R — as trivially as a synchronous call.
- **It plugs into the rest of Wickra.** `PaperExchange` simulates fills through the
  [wickra-backtest](https://github.com/wickra-lib/wickra-backtest) engine;
  `ReplayExchange` drives recorded microstructure through the same trait; and
  funding / open-interest / liquidation / long-short feeds arrive as the exact typed
  shapes [`wickra-core`](https://github.com/wickra-lib/wickra) consumes.

## Why it exists

Trading tools usually pick one language and one venue abstraction. Wickra Exchange
defines the venue surface **once**, in Rust, and re-exports that single implementation
to Python, Node.js and — over a C ABI — C, C++, C#, Go, Java and R. The same strategy
runs paper and live by swapping the implementation, and the same microstructure feeds
that drive a backtest drive live execution.

## Open source

Wickra Exchange is released under the **MIT OR Apache-2.0** license — permissive,
OSI-approved, free for any use including commercial. Source, issues and releases live
on [GitHub](https://github.com/wickra-lib/wickra-exchange).

## Disclaimer

Wickra Exchange is a software library, **not** a trading system, and is provided
**as-is with no warranty**. Real orders move real money; every signed-execution path
is safety-critical. Use withdrawal-disabled keys, test against exchange testnets
first, never put secret keys in a browser or client, and use it at your own risk.
