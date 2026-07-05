# R

A `.Call` binding over the C ABI. The same `Exchange` API — a paper account fills
through the wickra-backtest engine behind the trait a live venue uses. The
pull-based event model crosses cleanly into single-threaded R.

```r
install.packages("wickraexchange", repos = "https://wickra-lib.r-universe.dev")
```

```r
library(wickraexchange)

ex <- wkex_paper(c(USDT = 100000), maker_bps = 1, taker_bps = 5, slippage_bps = 10)
cat("venue:", wkex_name(ex), "\n")
wkex_set_price(ex, "BTC/USDT", 20000)

order <- wkex_place_market(ex, "BTC/USDT", "buy", 1)
cat("filled at", order$average_price, "(status", order$status, ")\n")

cat("  BTC free:", wkex_balance(ex, "BTC"), "\n")
cat("  USDT free:", wkex_balance(ex, "USDT"), "\n")
```

## More

- [r-universe](https://wickra-lib.r-universe.dev)
- [Source & examples](https://github.com/wickra-lib/wickra-exchange/tree/main/examples/r)
