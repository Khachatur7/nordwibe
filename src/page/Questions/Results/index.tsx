"use client";

import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { QuestionsContext } from "../Provider";

export default function Results() {
  const { answers } = useContext(QuestionsContext);
  const p = {
    address: "",
    type: "UK",
    type_extra: "",
    i_am_owner: true,
    count_days_from: 0,
    count_days_to: 0,
    cost: 0,
    is_have_bail: true,
    is_have_fines: true,
    cost_utilities: 0,
    count_neighbors: 0,
    count_rooms: 0,
    floor: 0,
    building_floor: 0,
    repair_type: "UK",
    repair_type_extra: "",
    building_type: "UK",
    building_type_extra: "",
    sound_insulation_type: "UK",
    sound_insulation_type_extra: "",
    accessibility_type: "UK",
    accessibility_type_extra: "",
    is_sunny_side: true,
    is_have_elevator: true,
    is_have_balcony: true,
    is_have_parking_space: true,
    is_have_security: true,
    is_have_horizontal_bars: true,
    is_have_conditioner: true,
    is_have_garbage_chute: true,
    is_have_wifi: true,
    is_have_transport_close: true,
    is_possible_smoke: true,
    is_possible_animals: true,
    is_have_washing_machine: true,
    is_have_dryer: true,
    is_have_iron: true,
    is_have_dishwasher: true,
    is_have_hair_dryer: true,
    is_have_tv: true,
    is_have_guest_table: true,
    is_have_guest_cabinet: true,
    photos_ids: [],
    description: "",
  };
  return (
    <>
      <h1 className={styles.heading}>Results</h1>
      <div>
        {answers.map((answer) => (
          <div style={{ display: "flex", gap: "1rem" }} key={answer.id}>
            <div>{answer.id}</div>
            <div>{answer.content}</div>
          </div>
        ))}
      </div>
    </>
  );
}
