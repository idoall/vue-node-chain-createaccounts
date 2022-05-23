import Web3 from 'web3';

export default (await import('vue')).defineComponent({
name: 'MSHK.TOP',
data() {
return {
msg: '',
greeting: 'Hello World! Welcome to mshk.top',
GanacheUrl: 'localhost:8545',
CurrentAccount: null,
ChainId: null
};
},
methods: {
mnemonicCreateAccounts() {
var accWeb3 = new Web3();
var mnemonic = accWeb3.eth.utils.HDNode.entropyToMnemonic(accWeb3.eth.utils.randomBytes(16));
console.log(mnemonic);
},
// 请求当前帐号信息
handleAccountsChanged() {
var obj = this;
try {
// Request account access if needed
// window.ethereum.enable()
window.ethereum
.request({ method: 'eth_requestAccounts' })
.then(function (ac) {
obj.CurrentAccount = ac[0];
console.log('handleAccountsChanged:' + obj.CurrentAccount);
})
.catch((err) => {
if (err.code === 4001) {
// EIP-1193 userRejectedRequest error
// If this happens, the user rejected the connection request.
obj.msg = ('Please connect to MetaMask.');
} else {
obj.msg = ('handleAccountsChanged Error:' + err);
}
});
} catch (error) {
// User denied account access...
}
},
// 判断当前网络是否为 Binance Smart Chain Mainnet
checkCurrBSCChain() {
var obj = this;
try {
window.ethereum
.request({
method: 'eth_chainId' // Returns the currently configured chain id, a value used in replay-protected transaction signing as introduced by EIP-155.
})
.then(function (d) {
obj.ChainId = Web3.utils.hexToNumber(d);
console.log('当前网络ID:' + obj.ChainId);
if (obj.ChainId !== 56) {
obj.switchBSCChain();
} else {
obj.handleAccountsChanged();
}
})
.catch((err) => {
if (err.code === 4001) {
// EIP-1193 userRejectedRequest error
// If this happens, the user rejected the connection request.
obj.msg = 'Please connect to MetaMask.';
} else {
obj.msg = ('eth_chainId Error:' + err);
}
});
} catch (error) {
obj.msg = ('checkCurrBSCChain Error:' + error);
}
},
// 添加 Binance Smart Chain Mainnet 到小狐狸钱包，更多网络添加可以参考 https://chainlist.org/
addBSCChain() {
var obj = this;
try {
window.ethereum
.request({
method: 'wallet_addEthereumChain',
params: [
{
chainId: Web3.utils.numberToHex(56),
chainName: 'Binance Smart Chain Mainnet',
nativeCurrency: {
name: 'BNB',
symbol: 'BNB',
decimals: 18
},
rpcUrls: ['https://bsc-dataseed.binance.org'],
blockExplorerUrls: ['https://www.bscscan.com'] // 一个或多个指向链的区块浏览器网站的 URL
}
]
})
.then(obj.handleAccountsChanged);
} catch (ee) {
obj.msg = ('wallet_addEthereumChain Error:' + ee);
}
},
// 切换到 Binance Smart Chain Mainnet
switchBSCChain() {
var obj = this;
try {
console.log(111);
window.ethereum
.request({
method: 'wallet_switchEthereumChain',
params: [{
chainId: Web3.utils.numberToHex(56) // Binance Smart Chain Mainnet ID
}]
}).catch((err) => {
if (err.code === 4001) {
// EIP-1193 userRejectedRequest error
// If this happens, the user rejected the connection request.
obj.msg = 'Please connect to MetaMask.';
} else if (err.message.indexOf('wallet_addEthereumChain') !== -1) {
obj.addBSCChain();
} else {
obj.msg = ('wallet_switchEthereumChain Error:' + err);
}
});
} catch (error) {
obj.msg = ('wallet_switchEthereumChain Error:' + error);
}
},
connectBSCChain() {
var obj = this;
if (window.ethereum) {
// 当前钱切换用户时的事件
window.ethereum.on('accountsChanged', (accounts) => {
// Handle the new accounts, or lack thereof.
// "accounts" will always be
obj.CurrentAccount = accounts;
obj.msg = ('AccountsChanged:' + this.CurrentAccount);
});
window.ethereum.on('chainChanged', (chainId) => {
// Handle the new chain.
// Correctly handling chain changes can be complicated.
// We recommend reloading the page unless you have good reason not to.
obj.ChainId = chainId;
});
obj.checkCurrBSCChain();
} else {
obj.msg = ('Non-Ethereum browser detected. You should consider trying MetaMask!https://metamask.io/download/');
}
},
getBSCPrice(addr) {
var obj = this;
obj.web3 = new Web3(window.ethereum);
var aggregatorV3InterfaceABI = [{ 'inputs': [], 'name': 'decimals', 'outputs': [{ 'internalType': 'uint8', 'name': '', 'type': 'uint8' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'name': 'description', 'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [{ 'internalType': 'uint80', 'name': '_roundId', 'type': 'uint80' }], 'name': 'getRoundData', 'outputs': [{ 'internalType': 'uint80', 'name': 'roundId', 'type': 'uint80' }, { 'internalType': 'int256', 'name': 'answer', 'type': 'int256' }, { 'internalType': 'uint256', 'name': 'startedAt', 'type': 'uint256' }, { 'internalType': 'uint256', 'name': 'updatedAt', 'type': 'uint256' }, { 'internalType': 'uint80', 'name': 'answeredInRound', 'type': 'uint80' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'name': 'latestRoundData', 'outputs': [{ 'internalType': 'uint80', 'name': 'roundId', 'type': 'uint80' }, { 'internalType': 'int256', 'name': 'answer', 'type': 'int256' }, { 'internalType': 'uint256', 'name': 'startedAt', 'type': 'uint256' }, { 'internalType': 'uint256', 'name': 'updatedAt', 'type': 'uint256' }, { 'internalType': 'uint80', 'name': 'answeredInRound', 'type': 'uint80' }], 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [], 'name': 'version', 'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }], 'stateMutability': 'view', 'type': 'function' }];
var priceFeed = new obj.web3.eth.Contract(aggregatorV3InterfaceABI, addr, {
from: obj.CurrentAccount // default from address
// gasPrice: '30000000000000' // 用于此交易的以 wei 为单位的 gas 价格
});
// var priceFeed = new obj.web3.eth.Contract(aggregatorV3InterfaceABI, addr)
priceFeed.methods.decimals().call()
.then((decimals) => {
// Do something with roundData
console.log('decimals', decimals);
// 获取最新一轮的数据
priceFeed.methods.latestRoundData().call()
.then((roundData) => {
// Do something with roundData
console.log('Latest Round Data', roundData);
// console.log(this.strtodec(roundData.answer, 18 - decimals))
obj.msg = '当前价格:' + obj.web3.utils.fromWei(this.strtodec(roundData.answer, 18 - decimals), 'ether');
});
});
},
strtodec(amount, dec) {
var stringf = '';
for (var i = 0; i < dec; i++) {
stringf = stringf + '0';
}
return amount + stringf;
}
},
mounted() {
this.connectBSCChain();
}
});
