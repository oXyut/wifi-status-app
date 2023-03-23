// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { spawn } from 'child_process'

type ReqMACAddress = {
    macAddressList: string[]
}

type deviceInfo = {
    macAddress: string,
    isConnecting: boolean,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<deviceInfo[]>
  ) {
    console.log(req.body)
    const { macAddressList } = req.body as ReqMACAddress
    // console.log(macAddressList);
    if (macAddressList.length === 0) {
        res.status(200).json([])
    }
    const child = spawn('arp', ['-a']);

    const deviceInfoList: deviceInfo[] = []

    child.stdout.on('data', (data) => {
        const arpList = data.toString().split('\n')
        macAddressList.forEach((macAddress:string) => {
            var isConnectingFlag = false
            arpList.forEach((arp:string) => {
                const arpInfo = arp.split(' ')
                // console.log(arpInfo[3])
                if (arpInfo.length < 4) {
                    return
                }
                if (arpInfo[3] === macAddress) {
                    // console.log("arpInfo[3] === macAddress");
                    isConnectingFlag = true
                }
            })
            deviceInfoList.push({ macAddress: macAddress, isConnecting: isConnectingFlag })
        })

        console.log(deviceInfoList)
        res.status(200).json(deviceInfoList)
    });

    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        res.status(500).json([])
    });


}
    
  