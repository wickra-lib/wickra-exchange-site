# C#

Idiomatic .NET classes over the C ABI. The same `Exchange` API — a paper account
fills through the wickra-backtest engine behind the trait a live venue uses.

```bash
dotnet add package WickraExchange
```

```csharp
using WickraExchange;

using var ex = Exchange.Paper(
    new Dictionary<string, double> { ["USDT"] = 100_000.0 },
    makerBps: 1.0, takerBps: 5.0, slippageBps: 10.0);
Console.WriteLine($"venue: {ex.Name()}");
ex.SetPrice("BTC/USDT", 20_000.0);

var order = ex.PlaceMarket("BTC/USDT", Side.Buy, 1.0);
Console.WriteLine($"filled at {order.AveragePrice} (status {order.Status})");

foreach (var (asset, free) in ex.Balances())
{
    Console.WriteLine($"  {asset} free: {free}");
}
```

## More

- [NuGet](https://www.nuget.org/packages/WickraExchange)
- [Source & examples](https://github.com/wickra-lib/wickra-exchange/tree/main/examples/csharp)
