// import { InjectedConnector } from '@wagmi/core'
// import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet'
// import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
// import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
// import {
//   avalancheFuji,
//   goerli,
//   bscTestnet,
//   fantomTestnet,
// } from "wagmi/chains";
// import { configureChains, createConfig } from "wagmi";
// import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
// import { WagmiConfig } from "wagmi";
// import Home from './Home';

// const chains = [avalancheFuji, bscTestnet, fantomTestnet, goerli]

// export const InjectedWalletConnector = () => {
//   return new InjectedConnector({
//     chains: chains,
//     options: {
//       name: 'Injected Wallet',
//       getProvider: () => typeof window !== 'undefined' ? window.ethereum : undefined,
//       shimDisconnect: true,
//     }
//   })
// }

// export const MetamaskWalletConnector = () => {
//   return new MetaMaskConnector({
//     chains: chains,
//     options: {
//       shimDisconnect: true,
//     }
//   })
// }

// export const CoinbaseConnector = () => {
//   return new CoinbaseWalletConnector({
//     options: {
//       appName: 'Tradable',
//       jsonRpcUrl: "rpcs.rpcs.testnet[43113].url"
//     },
//   })
// }

// export const WalletConnectV2Connector = () => {
//   return new WalletConnectConnector({
//     chains: chains,
//     options: {
//       projectId: "..."
//     }
//   })
// }

// const { publicClient, webSocketPublicClient } = configureChains(
//   chains,
//   [
//     jsonRpcProvider({
//       rpc: function (chain) {
//         // @ts-ignore
//         return { http: `rpcs.rpcs.testnet[chain.id].url` }
//       }
//     })
//   ]
// )

// const config = createConfig({
//   autoConnect: true,
//   connectors: [
//     InjectedWalletConnector(),
//     MetamaskWalletConnector(),
//     CoinbaseConnector(),
//     WalletConnectV2Connector()
//   ],
//   publicClient,
//   webSocketPublicClient
// })

// function App() {

//   return (
//     <>
//       <WagmiConfig config={config}>
//         <Home />
//       </WagmiConfig>
//     </>
//   )
// }

// export default App

import { useEffect, useState } from "react"
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { SafeConnector } from 'wagmi/connectors/safe';
import { Profile } from './Home'
import { Buffer } from 'buffer';
import { goerli } from "viem/chains"

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()]
)

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer;
}

// Set up wagmi config
const config = createConfig({
  autoConnect: false,
  connectors: [
    new SafeConnector({ chains })
  ],
  publicClient,
  webSocketPublicClient
})

// Pass config to React Context Provider
function App() {
  const [f, setF] = useState(0)
  useEffect(function () {
    if (f < 8) setF(8)
    console.log(f)
  }, [f])
  console.log(f)
  return (
    <WagmiConfig config={config}>
      {f}
      {
        (f < 17) && (
          <button onClick={() => setF((p) => p + 1)}>Click</button>
        )
      }
      <Profile />
    </WagmiConfig>
  )
}

export default App