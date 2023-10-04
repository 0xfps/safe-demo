// import React from "react"
// import { connect } from '@wagmi/core'
// import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
// import {
//     avalancheFuji,
//     goerli,
//     bscTestnet,
//     fantomTestnet,
// } from "wagmi/chains";
// import { useAccount, useDisconnect, useConnect } from 'wagmi'

// const chains = [avalancheFuji, bscTestnet, fantomTestnet, goerli]

// const connector = new MetaMaskConnector({
//     chains: chains,
//     options: {
//         shimDisconnect: true,
//     }
// })

// function Home() {

//     const { connect } = useConnect()
//     const { address, isConnected } = useAccount()
//     const { disconnect } = useDisconnect()
//     return (
//         <>
//             {
//                 !isConnected ? (
//                     <button onClick={() => connect({ connector: connector })}>Connect</button>
//                 ) : (
//                     <button onClick={() => disconnect()}>Disconnect</button>
//                 )
//             }
//         </>
//     )
// }

// export default React.memo(Home)

// import { useAccount, useConnect } from 'wagmi'

// export function Profile() {
//     const { connect, connectors, error, isLoading, pendingConnector } =
//         useConnect()
//     const { address } = useAccount()

//     return (
//         <div>
//             {connectors.map((connector) => (
//                 <button
//                     disabled={!connector.ready}
//                     key={connector.id}
//                     onClick={() => connect({ connector })}
//                 >
//                     {connector.name}
//                     {!connector.ready && ' (unsupported)'}
//                     {isLoading &&
//                         connector.id === pendingConnector?.id &&
//                         ' (connecting)'}
//                 </button>
//             ))}

//             {error && <div>{error.message}</div>}
//             {address && `${address}`}
//         </div>
//     )
// }

import { useAccount, useConnect, useDisconnect, usePrepareSendTransaction, useSendTransaction } from 'wagmi';

export function Profile() {
    const { connect, connectors, error, pendingConnector } = useConnect();
    const { isConnecting, connector: activeConnector } = useAccount();
    const { disconnect } = useDisconnect();
    const { config } = usePrepareSendTransaction({
        to: '0x000000000000000000000000000000000000beef',
        value: BigInt('0'),
    });

    const { sendTransactionAsync } = useSendTransaction(config);

    return (
        <div>
            <div>
                {activeConnector && (
                    <>
                        <button onClick={() => disconnect()}>Disconnect from {activeConnector.name}</button>
                        <button onClick={() => sendTransactionAsync?.()}>Test transaction</button>
                    </>
                )}

                {connectors
                    .map((x) => (
                        <button key={x.id} onClick={() => { console.log(x); connect({ connector: x }) }}>
                            {x.name}
                            {isConnecting && x.id === pendingConnector?.id && ' (connecting)'}
                        </button>
                    ))}
            </div>

            {error && <div>{error.message}</div>}
        </div>
    );
}
