import Head from "next/head";
import { useCallback, useMemo, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";

const Page = () => {
  return (
    <>
      <Head>
        <title>Calendarios Hoteles</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Calendario Hoteles</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  {/* <AccountProfile /> */}
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  {/* <AccountProfileDetails /> */}
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
