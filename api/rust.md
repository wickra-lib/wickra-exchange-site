# Rust

The native crate. One typed `Exchange` trait spans all ten venues; a
`PaperExchange` fills deterministically through the wickra-backtest engine
behind the same trait.

```bash
cargo add wickra-exchange
```

```rust
use rust_decimal_macros::dec;
use wickra_exchange::{Exchange, Execution, MarketData, OrderRequest, PaperExchange, Symbol};

let market = Symbol::new("BTC", "USDT");

let mut exchange = PaperExchange::new()
    .with_fees(dec!(1), dec!(5))   // maker / taker basis points
    .with_slippage_bps(dec!(10))
    .with_balance("USDT", dec!(100000));
exchange.set_price(&market, dec!(20000));

let order = exchange.place_order(&OrderRequest::market_buy(market, dec!(1)))?;
println!("filled at {:?} ({:?})", order.average_price, order.status);

// Market data and execution events flow through the same pull loop.
for event in exchange.poll_events() {
    println!("event: {event:?}");
}
```

A live venue is the same trait — construct with `Exchange::new("binance", creds, opts)`
and swap the implementation; the strategy code does not change.

## More

- [crates.io/crates/wickra-exchange](https://crates.io/crates/wickra-exchange) · [docs.rs](https://docs.rs/wickra-exchange)
- [Source & examples](https://github.com/wickra-lib/wickra-exchange/tree/main/examples/rust)
- [Exchanges](https://github.com/wickra-lib/wickra-exchange/blob/main/docs/EXCHANGES.md) · [Authentication](https://github.com/wickra-lib/wickra-exchange/blob/main/docs/AUTH.md) · [Derivatives & advanced orders](https://github.com/wickra-lib/wickra-exchange/blob/main/docs/DERIVATIVES.md)
