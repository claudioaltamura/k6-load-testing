# k6 Load Testing

## Tests

### Smoke test

start smoke test

```
    k6 run smoke-test.js --out json=test_results.json
```

debug

```
    k6 run -http-debug="full" smoke-test.js
```
