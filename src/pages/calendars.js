import React from "react";
import Head from "next/head";
import { useState, useCallback, useRef, useEffect } from "react";
import { useDialog } from "src/hooks/use-dialog";
import { usePageView } from "src/hooks/use-page-view";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Card } from "@mui/material";
import CalendarContainer from "./sections/dashboard/calendar-container";
import { CalendarToolbar } from "./sections/dashboard/calendar-toolbar";
import { CalendarStyleContainer } from "./sections/dashboard/calendar-style";
import useMediaQuery from "@mui/material/useMediaQuery";

const Page = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(mdUp ? "timeGridDay" : "dayGridMonth");
  const createDialog = useDialog();
  const calendarRef = useRef(null);

  usePageView();

  const handleScreenResize = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = mdUp ? "dayGridMonth" : "timeGridDay";

      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [calendarRef, mdUp]);

  const handleAddClick = useCallback(() => {
    createDialog.handleOpen();
  }, [createDialog]);

  const handleDateNext = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  }, []);

  const handleDatePrev = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  }, []);

  const handleViewChange = useCallback((view) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(view);
      setView(view);
    }
  }, []);

  useEffect(
    () => {
      handleScreenResize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mdUp]
  );

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
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Calendario Hoteles</Typography>
            </div>

            <CalendarToolbar
              date={date}
              onAddClick={handleAddClick}
              onDateNext={handleDateNext}
              onDatePrev={handleDatePrev}
              onViewChange={handleViewChange}
              view={view}
            />
            <Card>
              <CalendarStyleContainer>
                <CalendarContainer />
              </CalendarStyleContainer>
            </Card>
            {/* <Grid container spacing={3}> */}
            {/* <Grid xs={12} md={6} lg={4}> */}
            {/* <AccountProfile /> */}
            {/* </Grid> */}
            {/* <Grid xs={12} md={6} lg={8}> */}
            {/* <AccountProfileDetails /> */}
            {/* </Grid> */}
            {/* </Grid> */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
