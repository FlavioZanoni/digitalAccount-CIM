import { ListPage } from "@/components/Pages/ListPage";
import { Appointment, getAppointment } from "@/lib/api/appointment";
import { useState } from "react";


export default function PresenceHistoryScreen() {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined);
  return (
    <ListPage<Appointment>
      instances={["Calendar"]}
      apiFunction={getAppointment}
      title={"Agenda de sessões"}
      subtitle={"Listagem das reuniões previstas"}
      label={"Sessões"}
      currentId={currentId}
      setCurrentId={setCurrentId}
    />
  )
}

