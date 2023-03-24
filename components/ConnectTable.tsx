import React, { useState } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, Typography} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

type studentStatus = {
  name: string,
  grade: string,
  lab: string,
  isConnecting: boolean,
}

const ConnectTable = () => {
  const [studentStatusList, setStudentStatusList] = useState<studentStatus[]>([]);
  const [isfetching, setIsFetching] = useState<boolean>(false);
  const [timeStamp, setTimeStamp] = useState<string>("");

  const gradePriority: {[key: string]: number} = {
    "B4": 30,
    "M1": 20,
    "M2": 10,
  };

  const fetchDeviceList = () => {
    setIsFetching(true);
    axios.get('/api/getArp')
      .then((res) => {
        const date = new Date();
        setTimeStamp(date.toLocaleString());
        setStudentStatusList(res.data);
      });
  };

  React.useEffect(() => {
    fetchDeviceList();
    const interval = setInterval(() => {
      fetchDeviceList();
      // 0.5秒待つ
      setTimeout(() => {
        console.log(studentStatusList[0]);
        setIsFetching(false);
      }, 500);
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Typography variant="body1" align="center" color="secondary" paragraph>
        最終更新日時：{timeStamp}
      </Typography>
      {
          isfetching ? <LinearProgress /> : null
      }
      <Typography variant="h6" component="div" gutterBottom>
        高エネルギー研究室
      </Typography>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell align="left">学年</TableCell>
                      <TableCell align="left">名前</TableCell>
                      <TableCell align="right">出席</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {studentStatusList
                    .filter((studentStatus) => studentStatus.lab === "高エネ")
                    .sort((a, b) => gradePriority[a.grade] - gradePriority[b.grade])
                    .map((studentStatus) => (
                      <TableRow
                          key={studentStatus.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{studentStatus.grade}</TableCell> 
                        <TableCell align="left">{studentStatus.name}</TableCell>
                        <TableCell align="right">
                          {
                            studentStatus.isConnecting ? <CheckIcon/> : ""
                          }
                        </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}/>
      <Typography variant="h6" component="div" gutterBottom>
        素粒子研究室
      </Typography>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell align="left">学年</TableCell>
                      <TableCell align="left">名前</TableCell>
                      <TableCell align="right">出席</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {studentStatusList
                    .filter((studentStatus) => studentStatus.lab === "素粒子")
                    .sort((a, b) => gradePriority[a.grade] - gradePriority[b.grade])
                    .map((studentStatus) => (
                      <TableRow
                          key={studentStatus.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{studentStatus.grade}</TableCell> 
                        <TableCell align="left">{studentStatus.name}</TableCell>
                        <TableCell align="right">
                          {
                            studentStatus.isConnecting ? <CheckIcon/> : ""
                          }
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
