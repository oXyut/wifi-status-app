// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { spawn } from 'child_process'

type ReqMACAddress = {
    macAddress: string[]
}

type Data = {
    macAddress: string[],
    ipAddress: string[],
    isCennecting: boolean[],
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const { macAddress } = req.body as ReqMACAddress
    if (macAddress.length === 0) {
        res.status(200).json({ macAddress: [], ipAddress: [], isCennecting: [] })
    }
    const child = spawn('arp', ['-a']);

    const isConnectingList: boolean[] = []
    const ipAddressList: string[] = []
    const macAddressList: string[] = []

    child.stdout.on('data', (data) => {
        const arpList = data.toString().split('\r\n')
        arpList.forEach((arp:string) => {
            const arpInfo = arp.split(' ')
            const arpMacAddress = arpInfo[3]
            const arpIpAddress = arpInfo[1].replace('(', '').replace(')', '')
            if (macAddress.includes(arpMacAddress)) {
                isConnectingList.push(true)
                ipAddressList.push(arpIpAddress)
                macAddressList.push(arpMacAddress)
            }
        })
        res.status(200).json({ macAddress: macAddressList, ipAddress: ipAddressList, isCennecting: isConnectingList })
    });

    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        res.status(500).json({ macAddress: [], ipAddress: [], isCennecting: [] })
    });


}
    
  