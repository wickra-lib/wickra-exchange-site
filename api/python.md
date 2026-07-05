# Python

Native PyO3 bindings over the Rust core. The same `Exchange` API — a paper
account fills through the wickra-backtest engine behind the trait a live venue
uses.

```bash
pip install wickra-exchange
```

```python
import wickra_exchange as wx

ex = wx.Exchange.paper({"USDT": 100_000.0}, maker_bps=1.0, taker_bps=5.0, slippage_bps=10.0)
print("venue:", ex.name())
ex.set_price("BTC/USDT", 20_000.0)

order = ex.place_order(wx.OrderRequest.market_buy("BTC/USDT", 1.0))
print(f"filled at {order['average_price']} (status {order['status']})")

for asset, free in ex.balances().items():
    print(f"  {asset} free: {free}")

for event in ex.poll_events():
    print("event:", event["type"])
```

A live venue is the same object — `wx.Exchange.new("binance", creds, opts)` —
so the strategy code is identical paper ↔ live.

## More

- [PyPI](https://pypi.org/project/wickra-exchange/)
- [Source & examples](https://github.com/wickra-lib/wickra-exchange/tree/main/examples/python)
- [Exchanges](https://github.com/wickra-lib/wickra-exchange/blob/main/docs/EXCHANGES.md) · [Authentication](https://github.com/wickra-lib/wickra-exchange/blob/main/docs/AUTH.md)
