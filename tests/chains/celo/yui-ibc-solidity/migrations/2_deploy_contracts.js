// contracts
const IBCHost = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCHost");
const IBFT2Client = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBFT2Client");
const MockClient = artifacts.require("@hyperledger-labs/yui-ibc-solidity/MockClient");
const IBCClient = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCClient");
const IBCConnection = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCConnection");
const IBCChannel = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCChannel");
const IBCHandler = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCHandler");
const IBCMsgs = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCMsgs");
const IBCIdentifier = artifacts.require("@hyperledger-labs/yui-ibc-solidity/IBCIdentifier");
const SimpleToken = artifacts.require("@hyperledger-labs/yui-ibc-solidity/SimpleToken");
const ICS20TransferBank = artifacts.require("@hyperledger-labs/yui-ibc-solidity/ICS20TransferBank");
const ICS20Bank = artifacts.require("@hyperledger-labs/yui-ibc-solidity/ICS20Bank");


module.exports = function (deployer) {
  deployer.deploy(IBCIdentifier).then(function() {
    return deployer.link(IBCIdentifier, [IBCHost, IBFT2Client, IBCHandler]);
  });
  deployer.deploy(IBCMsgs).then(function() {
    return deployer.link(IBCMsgs, [IBCClient, IBCConnection, IBCChannel, IBCHandler, IBFT2Client]);
  });
  deployer.deploy(IBCClient).then(function() {
    return deployer.link(IBCClient, [IBCHandler, IBCConnection, IBCChannel]);
  });
  deployer.deploy(IBCConnection).then(function() {
    return deployer.link(IBCConnection, [IBCHandler, IBCChannel]);
  });
  deployer.deploy(IBCChannel).then(function() {
    return deployer.link(IBCChannel, [IBCHandler]);
  });
  deployer.deploy(IBFT2Client);
  deployer.deploy(MockClient);
  deployer.deploy(IBCHost).then(function() {
    return deployer.deploy(IBCHandler, IBCHost.address);
  });
  deployer.deploy(SimpleToken, "simple", "simple", 1000000);
  deployer.deploy(ICS20Bank).then(function() {
    return deployer.deploy(ICS20TransferBank, IBCHost.address, IBCHandler.address, ICS20Bank.address);
  });
};
