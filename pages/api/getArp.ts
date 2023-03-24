// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { spawn } from 'child_process'
import { stderr } from 'process'

type studentData = {
    studentId: string,
    lab: string,
    grade: string,
    name: string,
    macAddress: string,
}

type studentStatus = {
    name: string,
    grade: string,
    lab: string,
    isConnecting: boolean,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<studentStatus[]>
  ) {
    if (req.method === 'GET'){
        // /data/studentList.jsonから学生の情報を取得
        const studentDataList = require('@/data/studentList.json').students as studentData[]
        if (studentDataList.length === 0) {
            res.status(500).json([])
            return
        }

        const child = spawn('arp', ['-a']);

        const studentStatusList: studentStatus[] = []

        if (child.stderr) {
            child.stderr.on('data', (data) => {
                res.status(500).json([])
            });
        } else {
            child.stdout.on('data', (data) => {
                const arpList = data.toString().split('\n')
                studentDataList.forEach((studentData) => {
                    var isConnectingFlag = false
                    arpList.forEach((arp:string) => {
                        const arpInfo = arp.split(' ')
                        // console.log(arpInfo[3] + ' ' + studentData.macAddress)
                        if (arpInfo.length < 4) {
                            return
                        }
                        if (arpInfo[3] === studentData.macAddress) {
                            isConnectingFlag = true
                        }
                    })
                    studentStatusList.push({
                        name: studentData.name,
                        grade: studentData.grade,
                        lab: studentData.lab,
                        isConnecting: isConnectingFlag
                    })
                })

                // console.log(studentStatusList)
                res.status(200).json(studentStatusList)
            });
        }
    } else {
        res.status(405).json([])
    }


}
    
  