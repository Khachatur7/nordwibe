"use client";

import Neighbor from "@/components/Neighbor";
import { users } from "@/config";
import { useTypedSelector } from "@/hooks/selector.hook";
import { IUser } from "@/interfaces/user.interface";
import styles from "@/page/Neighbors/styles.module.scss";
import { useEffect, useState } from "react";

const Neighbors = () => {
  const search = useTypedSelector(
    (selector) => selector.navigationSlice.search.users
  );
  const filters = useTypedSelector(
    (selector) => selector.filtersSlice.neighbors.age
  );
  const [neighbors, setNeighbors] = useState<Array<IUser>>(users);

  // const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     telephone_code: "string",
  //     captcha_token: "string",
  //     user_secret: "string",
  //     username: "string",
  //     email: "string",
  //     first_name: "string",
  //     date_birthday: "2024-09-08T06:02:29.880Z",
  //     gender: "UK",
  //     type_auth: "NM",
  //     password: "string",
  //     purpose: "JB",
  //     occupation: "UK",
  //     smoking: "U",
  //     pets: "U",
  //     first_aid: "U",
  //     social_interaction: "U",
  //     home_town: "",
  //     my_town: "",
  //   }),
  // };

  // useEffect(() => {
  //   fetch(`https://3133319-bo35045.twc1.net/api/v0/users/`).then(res => res.json()).then(res => console.log(res))
  // }, [])

  const hide = (id: number) => {
    setNeighbors(neighbors.filter((user) => user.id != id));
  };

  return (
    <div className={styles.neighbors}>
      <div className={styles.container}>
        {neighbors.map(
          (user) =>
            user.name.toLowerCase().startsWith(search.toLowerCase()) &&
            user.age <= filters.to &&
            user.age >= filters.from && (
              <div className={styles.neigh}>
                <Neighbor user={user} hide={hide} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Neighbors;
