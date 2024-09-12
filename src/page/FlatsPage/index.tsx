"use client";

import Flat from "@/components/Flat";
import { FlatList, flats } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IRealFlat } from "@/interfaces/flat.interface";
import styles from "@/page/FlatsPage/styles.module.scss";
import { useEffect, useState } from "react";

const Flats = () => {
  const search = useTypedSelector(
    (selector) => selector.navigationSlice.search.flats
  );
  // const filters = useTypedSelector((selector) => selector.filtersSlice.flats);
  const [flats,setFlats] = useState<IRealFlat[]>(FlatList)
  return (
    <div className={styles.flats}>
      <div className={styles.container}>
        {flats.map(
          (flat) =>
            // flat.user.name.toLowerCase().startsWith(search.toLowerCase()) &&
            // flat.price <= filters.price.to &&
            // flat.price >= filters.price.from && (
              <div className={styles.flat} key={flat.id.toString() + flat.cost.toString()}>
                <Flat flat={flat} />
              </div>
            // )
        )}
      </div>
    </div>
  );
};

export default Flats;
