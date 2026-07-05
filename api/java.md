# Java

An FFM (Panama) wrapper over the C ABI. The same `Exchange` API — a paper account
fills through the wickra-backtest engine behind the trait a live venue uses.

```xml
<!-- Maven Central -->
<dependency>
  <groupId>org.wickra</groupId>
  <artifactId>wickra-exchange</artifactId>
  <version>0.1.0</version>
</dependency>
```

```java
import java.util.Map;
import org.wickra.exchange.Exchange;

public final class PaperTrade {
    public static void main(String[] args) {
        try (Exchange ex = Exchange.paper(Map.of("USDT", 100_000.0), 1, 5, 10)) {
            System.out.println("venue: " + ex.name());
            ex.setPrice("BTC/USDT", 20_000.0);

            Exchange.OrderInfo order = ex.placeMarket("BTC/USDT", Exchange.Side.BUY, 1.0);
            System.out.println("filled at " + order.averagePrice() + " (status " + order.status() + ")");

            System.out.println("  BTC free: " + ex.balance("BTC"));
        }
    }
}
```

The binding uses the Java Foreign Function & Memory API, so it needs JDK 22+ and
`--enable-native-access`.

## More

- [Maven Central](https://central.sonatype.com/artifact/org.wickra/wickra-exchange)
- [Source & examples](https://github.com/wickra-lib/wickra-exchange/tree/main/examples/java)
