import { ListPage } from "@/components/Pages/ListPage";
import { Store, getStore } from "@/lib/api/store";
import { useState } from "react";


export default function HomeScreen() {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined);
  return (
    <ListPage<Store>
      instances={["Store"]}
      apiFunction={getStore}
      title={"Lojas"}
      subtitle={"Lojas com cadastro de obreiro"}
      label={"Lojas"}
      path={`/store`}
      currentId={currentId}
      setCurrentId={setCurrentId}
    />
  )
}

