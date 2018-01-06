## CoinStatus

It's 43 frickin' degrees in Melbourne today, so I stayed inside fiddling with React.

git remote add origin git@github.com:jfhinchcliffe/cryptostatus.git
Created using create-react-app, axios, and uses the https://min-api.cryptocompare.com/ API

You can also save a link and have it auto populate your coin balances. eg:
https://coinbalance-ohczamcaxn.now.sh/?XRP&300&1.8?LTC&1&350?BTC&5&5000?

Hosted at https://coinbalance-ohczamcaxn.now.sh/

## Todo
- Sanitise input
- Choose crypto from a drop down list instead of entering manually
- SOMEWHAT DONE - Handle non-existent coins gracefully
- DONE - Add a link generator so that people can check their balance without inputting their coins each time
- Chunk the React components up a bit more logically