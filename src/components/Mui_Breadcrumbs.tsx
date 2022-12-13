import * as React from 'react';
import {Box,Breadcrumbs,Link,Typography} from "@mui/material"


export const MuiBreadcrumbs = () =>
{
    return 
    (
        <Box m={2}>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' href='#'>الصفحة الرئيسية</Link>
                {/* <Link underline='hover' href='#'>حسابي</Link> */}
                <Typography color='text.primary'>حسابي</Typography>
            </Breadcrumbs>

        </Box>
    );
}