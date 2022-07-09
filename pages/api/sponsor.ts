import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../common/session';
import { deserializeTransaction, sponsorTransaction, broadcastTransaction } from 'micro-stacks/transactions';
import { StacksTestnet } from 'micro-stacks/network';

import type { NextApiRequest, NextApiResponse } from 'next';

async function sponsorTx(txHex: string) {
  const transaction = deserializeTransaction(txHex);
  const sponsorPrivateKey = process.env.SPONSOR_PRIVATE_KEY;
  if (!sponsorPrivateKey) throw new Error('SPONSOR_PRIVATE_KEY is required');

  const network = new StacksTestnet();
  const sponsoredTx = await sponsorTransaction({
    transaction,
    sponsorPrivateKey: sponsorPrivateKey,
    network,
    fee: '1000',
  })
  // return sponsoredTx.txid();
  const result = await broadcastTransaction(sponsoredTx, network);
  if ('error' in result) {
    console.error('Transaction broadcast failed:', result);
    throw new Error(`Broadcast failed: ${result.error}`);
  }
  return result.txid;
}

async function sponsorTransactionRoute(req: NextApiRequest, res: NextApiResponse) {
  const { txHex } = await req.body;

  if (!txHex)
    return res.status(500).json({ message: 'No `txHex` was found in body' });

  try {
    const txid = await sponsorTx(txHex);
    res.json({ txid });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(sponsorTransactionRoute, sessionOptions);
