# Security

## Reporting a vulnerability

Please report security problems **privately** — do not open a public issue for a
suspected vulnerability. Report through either channel:

- GitHub → the [wickra-exchange repository](https://github.com/wickra-lib/wickra-exchange)
  → the **Security** tab → **Report a vulnerability** (private advisory), or
- email **[support@wickra.org](mailto:support@wickra.org)**.

We aim to acknowledge within a few days, agree a disclosure timeline, and credit
reporters who wish to be named once a fix ships.

## Scope

Wickra Exchange handles API credentials and places signed orders, so its
authentication, signing and transport paths are safety-critical. Reports about
credential handling, request signing, order construction, or transport integrity are
especially welcome.

The full policy — including supported versions — is in
[SECURITY.md](https://github.com/wickra-lib/wickra-exchange/blob/main/SECURITY.md) in
the source repository.

## Handling your keys

Wickra Exchange never transmits your API keys anywhere except the exchange you
configured. Use withdrawal-disabled keys, test against exchange testnets first, and
never place secret keys in a browser or client-side context.
