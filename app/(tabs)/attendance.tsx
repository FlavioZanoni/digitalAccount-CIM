import AttendanceAccordion from "@/components/AttendanceAccordion/AttendanceAccordion";
import { ListPage } from "@/components/Pages/ListPage";
import { Attendance, getAttendance } from "@/lib/api/attendance";
import { useState } from "react";


export default function PresenceHistoryScreen() {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined);
  return (
    <ListPage<Attendance>
      instances={["Obreiro", "Visitas"]}
      apiFunction={getAttendance}
      apiParams={[{ key: "sla", value: "OBREIRO" }, { key: "sla", value: "VISITA" }]}
      title={"Histórico de presenças"}
      subtitle={"Listagem das presenças registradas"}
      label={"Presenças"}
      dividerLabel={["Obreiro", "Visitas"]}
      currentId={currentId}
      setCurrentId={setCurrentId}
      accordion={AttendanceAccordion}
    />
  )
}
