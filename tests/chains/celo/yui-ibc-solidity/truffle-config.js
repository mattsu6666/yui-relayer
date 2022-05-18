/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 */

 const ContractKit = require('@celo/contractkit')
 const Web3 = require('web3')
 require('dotenv').config()
 
 const web3 = new Web3('http://localhost:8545') 
 const kit = ContractKit.newKitFromWeb3(web3)
 kit.connection.addAccount(process.env.PRIVATE_KEY)
 //console.log(`private key: ${process.env.PRIVATE_KEY}`)

 const address = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY).address;
 //console.log(`address: ${address}`)
 
 module.exports = {
   /**
    * Networks define how you connect to your ethereum client and let you set the
    * defaults web3 uses to send transactions. If you don't specify one truffle
    * will spin up a development blockchain for you on port 9545 when you
    * run `develop` or `test`. You can ask a truffle command to use a specific
    * network from the command line, e.g
    *
    * $ truffle test --network <network-name>
    */
 
   networks: {
     // Useful for testing. The `development` name is special - truffle uses it by default
     // if it's defined here and no other network is specified at the command line.
     // You should run a client (like ganache-cli, geth or parity) in a separate terminal
     // tab if you use this network and you must also set the `host`, `port` and `network_id`
     // options below to some value.
     //
     localnet: {
       provider: kit.connection.web3.currentProvider,
       network_id: "*",
       gas: 8000000,
       from: address
     },
    //  alfajores: {
    //    provider: kit.connection.web3.currentProvider, // CeloProvider
    //    network_id: 44787,                   // latest Alfajores network id
    //    gas: 4000000,                        // Gas limit used for deploys, truffle gas estimation doesn't work work so we have to hardcode it
    //  },
    //  mainnet: {
    //    provider: kit.connection.web3.currentProvider, // make sure web3 (above) is connected to mainnet (ie https://forno.celo.org)
    //    network_id: 42220,
    //    gas: 4000000,
    //  }, 
   },
 
   // Set default mocha options here, use special reporters etc.
   mocha: {
     // timeout: 100000
   },
 
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 1000
       },
      //  evmVersion: "byzantium"
      }
    }
  },

  plugins: [
    'truffle-contract-size'
  ] }
