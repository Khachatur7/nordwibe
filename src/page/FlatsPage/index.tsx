"use client";

import Flat from "@/components/Flat";
import { flats } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import styles from "@/page/FlatsPage/styles.module.scss";
import { useEffect, useState } from "react";

const Flats = () => {
  const search = useTypedSelector(
    (selector) => selector.navigationSlice.search.flats
  );
  const filters = useTypedSelector((selector) => selector.filtersSlice.flats);

  return (
    <div className={styles.flats}>
      <div className={styles.container}>
        {flats.map(
          (flat) =>
            flat.user.name.toLowerCase().startsWith(search.toLowerCase()) &&
            flat.price <= filters.price.to &&
            flat.price >= filters.price.from && (
              <div className={styles.flat} key={flat.id.toString() + flat.price.toString()}>
                <Flat flat={flat} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Flats;
