import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import timelinePlugin from "@fullcalendar/timeline";

const CalendarContainer = () => {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, timelinePlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        events={[
          {
            resourceId: "a",
            title: "Timed Event",
            start: "2023-10-02T16:00:00+00:00",
          },
        ]}
        resources={[
          {
            id: "a",
            title: "Auditorium A",
          },
          {
            id: "b",
            title: "Auditorium B",
          },
          {
            id: "c",
            title: "Auditorium C",
          },
          {
            id: "d",
            title: "Auditorium D",
          },
        ]}
      />
    </>
  );
};

export default CalendarContainer;
