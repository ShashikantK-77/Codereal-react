// UserActivityLogs.js
import PageTitle from 'components/Typography/PageTitle';
import React from 'react';
import { Card, TableContainer, Table, TableHeader, TableCell, TableBody } from '@windmill/react-ui';

const UserActivityLogs = () => {
  // Example data for user activity logs
  const userActivityLogs = [
    { id: 1, user: 'John Doe', action: 'Login', timestamp: '2023-01-01 10:30 AM' },
    { id: 2, user: 'Jane Doe', action: 'Logout', timestamp: '2023-01-01 11:45 AM' },
    // Add more activity logs as needed
  ];

  return (
    <div>
      <PageTitle>User Activity Logs</PageTitle>

      <Card>
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Timestamp</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {userActivityLogs.map((log) => (
                <tr key={log.id}>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                </tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default UserActivityLogs;
