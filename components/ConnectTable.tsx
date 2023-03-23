import React, { useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress} from '@mui/material';

type DeviceInfo = {
  macAddress: string;
  isConnecting: boolean;
};

const ConnectTable = () => {
  const [deviceList, setDeviceList] = useState<DeviceInfo[]>([]);
  const [isfetching, setIsFetching] = useState<boolean>(false);

  const fetchDeviceList = () => {
    setIsFetching(true);
    axios.post('/api/getArp', { macAddressList: ['5a:bd:2e:58:76:5e'] }).then((res) => {
        setDeviceList(res.data);
        });
  };

  React.useEffect(() => {
    fetchDeviceList();
    const interval = setInterval(() => {
      fetchDeviceList();
      // 1秒待つ
      setTimeout(() => {
        console.log(deviceList[0]);
        setIsFetching(false);
      }, 1000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    {
        isfetching ? <LinearProgress /> : null
    }
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>MACアドレス</TableCell>
                    <TableCell align="right">接続状況</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {deviceList.map((device) => (
                    <TableRow
                        key={device.macAddress}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {device.macAddress}
                        </TableCell>
                        <TableCell align="right">
                            {device.isConnecting? '接続中' : '未接続'}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </>
  );
};

export default ConnectTable;
