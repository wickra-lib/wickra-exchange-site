# Go

A cgo wrapper over the C ABI. The same `Exchange` API — a paper account fills
through the wickra-backtest engine behind the trait a live venue uses.

```bash
go get github.com/wickra-lib/wickra-exchange-go
```

```go
package main

import (
	"fmt"

	wx "github.com/wickra-lib/wickra-exchange-go"
)

func main() {
	ex, err := wx.Paper(map[string]float64{"USDT": 100000}, 1, 5, 10)
	if err != nil {
		panic(err)
	}
	defer ex.Close()

	fmt.Println("venue:", ex.Name())
	ex.SetPrice("BTC/USDT", 20000)

	order, err := ex.PlaceMarket("BTC/USDT", wx.Buy, 1)
	if err != nil {
		panic(err)
	}
	fmt.Printf("filled at %v (filled=%v)\n", order.AveragePrice, order.IsFilled())

	btc, _ := ex.Balance("BTC")
	fmt.Printf("  BTC free: %v\n", btc)
}
```

## More

- [Go module (pkg.go.dev)](https://pkg.go.dev/github.com/wickra-lib/wickra-exchange-go)
- [Source & examples](https://github.com/wickra-lib/wickra-exchange/tree/main/examples/go)
