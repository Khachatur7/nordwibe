"use client"

import styles from "@/components/Flat/styles.module.scss"
import { useTypedSelector } from "@/hooks/selector.hook";
import { IFlat } from "@/interfaces/flat.interface";
import { IUser } from "@/interfaces/user.interface";
import { AppDispatch } from "@/store";
import { addToFavourites } from "@/store/slices/user";
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import {
  YMaps,
  Map,
  Placemark,
  GeoObject,
} from "@pbe/react-yandex-maps";
const Flat: FC<{ flat: IFlat }> = ({ flat }) => {
  const dispatch = useDispatch<AppDispatch>()
  const pathname = usePathname()
  const user = useTypedSelector(selector => selector.userSlice.user)
  const mapRef = useRef();
  const [district, setDistrict] = useState<string>("");

  const geocode = (ymaps: any) => {  ymaps
    .geocode([55.75, 37.57], {
      kind: "district",
      results: 1,
    })
    .then((res: any) => {
      let firstGeoObject = res.geoObjects.get(0);
      setDistrict(firstGeoObject.getAddressLine());
    });}
  useEffect(()=>{
  
  },[])
  return <Link href={`/flats/${flat.id}`}>
    <div className={styles.flat}>
      <div className={styles.banner}>
      <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          slidesPerGroup={1}
          centeredSlides={true}
          centeredSlidesBounds={true}
          pagination={{ clickable: true }}
          navigation
        >
          <SwiperSlide ><img src={"/flat.png"} alt="banner" /></SwiperSlide>
          <SwiperSlide ><img src={"/flat.png"} alt="banner" /></SwiperSlide>
          <SwiperSlide ><img src={"/flat.png"} alt="banner" /></SwiperSlide>
          <SwiperSlide ><img src={"/flat.png"} alt="banner" /></SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.containerUser}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>
            <Image src={"/icons/userProfile.svg"} alt="avatar" width={100} height={100} />
          </div>
          <div className={styles.userInformation}>
            <h1>{flat.user.name}, {flat.user.age}</h1>
            <h4>{flat.user.city}</h4>
          </div>
        </div>
        <h1 className="ml-5">XX%</h1>
      </div>
      <h3 className={styles.price}>{flat.price}руб/мес</h3>
      <span className={styles.commun}>Комуналка:XXXXруб/мес</span>

      <div className={styles.flatInfo}>
        <div className={styles.blocks}>
          <ul>
          <li>Общая комната</li>
            <li>Без залога</li>
            <li>x/y этаж</li>
            <li>Снимаю эту квартиру</li>
            <li>Можно с животными</li>
            <li>Не курить</li>
          </ul>
        </div>
        <div className={styles.bottomBlocks}>
          <div>
            <ul>
              <li>Адрес:</li>
              <li>Район:{" "}
                  {
                    district
                      .split(",")
                      [district.split(",").length - 1].split(" ")[
                      district
                        .split(",")
                        [district.split(",").length - 1].split(" ").length - 1
                    ]
                  }</li>
            </ul>
          </div>
        </div>
      </div>
      <YMaps query={{ apikey: "a397206b-3df1-47d3-b87e-de0031179a0e" }}>
            <Map
              onLoad={(ymaps) => geocode(ymaps)}
              style={{ display:"none"}}
              instanceRef={mapRef}
              defaultState={{
                center: [55.75, 37.57],
                zoom: 9,
                controls: ["zoomControl", "fullscreenControl"],
              }}
              modules={[
                "control.ZoomControl",
                "control.FullscreenControl",
                "multiRouter.MultiRoute",
                "geocode",
              ]}
            >
              <Placemark defaultGeometry={[55.75, 37.57]} />
            </Map>
          </YMaps>
      <div className={styles.userButtons}>
        <div>
          <Link href={`/profile/${flat.user.id}`}><button>Написать</button></Link>
        </div>
       
      </div>
    </div>
  </Link>
}

export default Flat;
