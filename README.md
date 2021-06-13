# bnfyi-js
Banano For Your Information - Store data in Banano addresses.

## Goal
To store data in wallets, link it to a block (e.g. a send block), automatically detect and parse the data.

At the moment you can only encode and decode data in Banano addresses.

## Limitations
The upper limit for storage is 8216 bytes for the data encoded in msgpack. An 8216 byte msgpack would be encoded in 257 addresses.

## Examples of encoding data in addresses
### Encode short data
Encoding data that take up less than 25 bytes will only take up a single address.

```
const bnfyi = require('bnfyi');

const shortData = { note: "wen poem bread" };
const shortDataInAddresses = bnfyi.encodeInAddresses(shortData);
```

The resulting value of `shortDataInAddresses` from the example above will be:
```
[ 'ban_1foryourinfoi8k8wuunepq9gsdg63r8ysdf63j96sd3ei1111117dfm1e5s' ]
```

To decode `shortDataInAddresses` again:
```
const decodedShortData = bnfyi.decodeFromAddresses(shortDataInAddresses));
```
The resulting value of `decodedShortData` will be the same as `shortData`.


### Encode longer data
```
const longData = {
  note: "Lament of Anemone\n" + 
        "After seeing what there is to see\n" +
        "After reposting every meme\n" +
        "\n" +
        "Everything is the same\n" +
        "Predictable\n" +
        "\n" +
        "Going into the routine\n" +
        "Minion quarantine\n" +
        "\n" +
        "Omniscient sonder of Anemone"
};
const longDataInAddresses = bnfyi.encodeInAddresses(longData);
```

The resulting value of `longDataInAddresses` from the example above will be:
```
[
  'ban_3foryourinfo1p1taumhgjkxmgkee7ppcumn63qpea43fskptuug4ghq4mah',
  'ban_1saca7m9asdk63spcsdbfsmk1xuae7t41x5aeos8ca5bgei9aus1wrwae8uf',
  'ban_1wu7en764smneos41wm7g3qq8x5bfsmk1sdpeos9ka5feoppc4icmdicu91s',
  'ban_1jdpeos9kx5af7q8ga5bgei9at5763sp4ud73ba96sd6f7jqard4jdgsoj5f',
  'ban_1u573a76guubfsmk1tdggjqk1x5aeni96uuogjnpwsacbonpwtdh79im6pnk',
  'ban_1uj1g7tp4wm3fst8kum73a76yudgf7sp8td7fst41wuhfsk8cwj18uggrztf',
  'ban_1uu8631pwsdffxq8c11111111111111111111111111111111111i35yqo7f'
]
```

To decode `longDataInAddresses` again:
```
const decodedLongData = bnfyi.decodeFromAddresses(longDataInAddresses);
```
The resulting value of `decodedLongData` from the example above will be the same as the value of `longData`.
