import { useCallback, useState } from 'react';
import { useOpenContractCall } from '@micro-stacks/react';
import styles from '../styles/Home.module.css';
import { sponsorTransaction } from '../common/fetchers';

export const TransactionSigning = () => {
  const [txid, setTxid] = useState('');
  const { openContractCall } = useOpenContractCall();

  const signAndSponsor = useCallback(async () => {
    const receipt = await openContractCall({
      contractName: 'micro-stacks-demo-dc56721f',
      functionName: 'say-hi',
      sponsored: true,
      functionArgs: [],
      contractAddress: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
    });
    if (typeof receipt === 'undefined') return;

    const txid = await sponsorTransaction(receipt.txRaw);
    setTxid(txid);
  }, [openContractCall]);

  return (
    <>
      <button className={styles.button} onClick={signAndSponsor}>
        Sign Sponsored Contract Call
      </button>
      { txid ? <p>TXID: {txid}</p> : null}
    </>
  )
}