import * as React from 'react';
import Info from "../template-components/Typography/Info.js";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

 function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
   
  };
  const maxPage =10

  return (
    <Stack spacing={1}>
    
      <Pagination count={10} page={page} onChange={handleChange} />
      <Typography>Page: <span><Info>{page}</Info>out of {maxPage} </span></Typography>
    </Stack>
  );
}
export default  PaginationControlled