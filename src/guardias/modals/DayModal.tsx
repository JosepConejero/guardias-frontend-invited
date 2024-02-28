/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Stack } from "@mui/material";
import { useEffect, useState, SyntheticEvent } from "react";
import { useCalendarStore } from "../../hooks/useCalendarStore";

import { CheckboxesBox } from "./dayModalComponents/CheckboxesBox";
import { UserTechniciansBox } from "./dayModalComponents/UserTechniciansBox";
import { UsersGuardsBox } from "./dayModalComponents/UsersGuardsBox";
import { useGuardDayStore } from "../../hooks/useGuardDayStore";
import { useAppUsersStore } from "../../hooks/useAppUsersStore";
import Swal from "sweetalert2";
import { DateBox } from "./dayModalComponents/DateBox";
import { ButtonsBox } from "./dayModalComponents/ButtonsBox";
import { SpinnerInModal } from "../customizedComponents";
import { useAuthStore } from "../../hooks";
import { EventGuardDay } from "../../interfaces";

const emptyGuardDay: EventGuardDay = {
  simpleDate: { year: 2999, month: 0, day: 0 },
  technicians: [],
  isHoliday: false,
  isThereOffice2h: false,
  isThereExtraMeeting: false,
  extraMeetingText: "",
  note: "",
  techniciansOut: [],
};

export const DayModal = ({
  closeModal,
}: {
  closeModal: () => void;
}): JSX.Element | undefined => {
  const { activeGuardDay, guardDayInformation, startSavingGuardDay, isSaving } =
    useCalendarStore();
  const { selectGuardDay } = useGuardDayStore();
  const { guardDayOpened, loadTechniciansInGuardDay } = useGuardDayStore();
  const { getTeachersIn, emptyTeachersName } = useAppUsersStore();
  const { user } = useAuthStore();

  let newFormValues: EventGuardDay = {} as EventGuardDay;
  if (activeGuardDay) {
    newFormValues = guardDayInformation(activeGuardDay);

    if (!newFormValues) {
      newFormValues = {
        ...emptyGuardDay,
        simpleDate: {
          day: activeGuardDay.day,
          month: activeGuardDay.month,
          year: activeGuardDay.year,
        },
      };
    }
  } else {
    newFormValues = emptyGuardDay;
  }

  const [, setFormValues] = useState<EventGuardDay>(newFormValues); //formValues

  /*
  interface SwalOptions {
    title?: string;
    text?: string;
    target?: HTMLElement | undefined | string;
    icon?: "success" | "error" | "warning" | "info" | "question";
  }

   const swalOptions: SwalOptions = {
    title:
      "Los nombres de los técnicos/formadores de guardia no pueden estar vacíos.",
    text: "Por favor, modifica esto antes de guardar",
    target: document.getElementById("modal-fondo")!,
    icon: "error",
  }; */

  const onSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    if (!emptyTeachersName(guardDayOpened!.technicians)) {
      await startSavingGuardDay(guardDayOpened!);

      closeModal();
    } else {
      //  Swal.fire(swalOptions);
      Swal.fire({
        title:
          "Los nombres de los técnicos/formadores de guardia no pueden estar vacíos.",
        text: "Por favor, modifica esto antes de guardar",
        target: document.getElementById("modal-fondo")!,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (activeGuardDay) {
      const newFormValues: EventGuardDay = guardDayInformation(activeGuardDay);

      if (newFormValues) {
        setFormValues({ ...newFormValues });
        selectGuardDay({ ...newFormValues });
      } else {
        setFormValues({
          ...emptyGuardDay,
          simpleDate: {
            day: activeGuardDay.day,
            month: activeGuardDay.month,
            year: activeGuardDay.year,
          },
        });
        selectGuardDay({
          ...emptyGuardDay,
          simpleDate: {
            day: activeGuardDay.day,
            month: activeGuardDay.month,
            year: activeGuardDay.year,
          },
        });
      }
    }
  }, [activeGuardDay]);

  useEffect(() => {
    if (guardDayOpened) {
      loadTechniciansInGuardDay(
        getTeachersIn([...guardDayOpened.techniciansOut])
      );
    }
  }, [guardDayOpened?.techniciansOut]);

  if (!guardDayOpened) return;

  return (
    <>
      {isSaving ? (
        <SpinnerInModal text="Grabando..." />
      ) : (
        <>
          <Grid
            id="dialog-guard-day"
            sx={{
              width: { xs: "390px", md: "900px" },
            }}
          >
            <Grid
              sx={{
                my: 1,
                mx: { md: 0.5 },
              }}
            >
              <form
                aria-label="submit-form"
                onSubmit={onSubmit}
                className="animate__animated animate__fadeIn animate__faster"
              >
                <Stack>
                  <DateBox />

                  <Stack>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        md={9}
                        p={1}
                        sx={{
                          width: { md: "700px" },
                        }}
                      >
                        <UsersGuardsBox />
                      </Grid>

                      <Grid item xs={12} md={3} p={1}>
                        <UserTechniciansBox />
                      </Grid>
                    </Grid>

                    <Grid p={1}>
                      <CheckboxesBox />
                    </Grid>
                  </Stack>

                  <ButtonsBox
                    onCloseModal={closeModal}
                    cancelDisabled={false}
                    okDisabled={!user.isDataModifier}
                  />
                </Stack>
              </form>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
