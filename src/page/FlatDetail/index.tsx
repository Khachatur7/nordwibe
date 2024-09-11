"use client";

import Convenience from "@/components/Convenience";
import IconCard from "@/components/IconCard";
import { conveniences, flats } from "@/config";
import styles from "@/page/FlatDetail/styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { notFound, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addToFavourites } from "@/store/slices/user";
import Like from "@/../public/icons/like.svg";
import { useTypedSelector } from "@/hooks/selector.hook";
import { Swiper, SwiperSlide } from "swiper/react";
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
import TickLOGO from "../../../public/svgs/tick";

const FlatDetail: FC<{ id: string }> = ({ id }) => {
  const flat = flats.find((f) => f.id === Number(id));
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const user = useTypedSelector((selector) => selector.userSlice.user);
  const [addressCoord, setAddressCoord] = useState();
  const mapRef = useRef();
  const [district, setDistrict] = useState<string>("");

  const onClickToMap = async (e: any) => {
    const coords = e.get("coords");
    setAddressCoord(coords);
  };

  const geocode = (ymaps: any) => {
    
  //   ymaps.multiRouter.MultiRoute({
  //     referencePoints: [
  //       [55.75, 37.57],
  //         'метро Арбатская'
  //     ],
  //     params: {
  //       routingMode: "pedestrian"  
  //     }
  // }, {
        
  //       boundsAutoApply: true
  // });
    ymaps
      .geocode([55.75, 37.57], {
        kind: "district",
        results: 1,
      })
      .then((res: any) => {
        let firstGeoObject = res.geoObjects.get(0);
        setDistrict(firstGeoObject.getAddressLine());
      });
  };

  useEffect(() => {
  
  }, []);

  if (!flat) return notFound();

  return (
    <div className={styles.flat}>
      {open && (
        <>
          <div className={styles.module}>
            <div className={styles.exit}>
              <svg
                onClick={() => setOpen(false)}
                viewBox="0 -0.5 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="1"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                    fill="#5755c4"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              slidesPerGroup={1}
              centeredSlides={true}
              centeredSlidesBounds={true}
              pagination={{ clickable: true }}
              navigation
              className={styles.swiper_module}
            >
              <SwiperSlide className={styles.slide}>
                <img src={"/flat.png"} alt="banner" />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img src={"/flat.png"} alt="banner" />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img src={"/flat.png"} alt="banner" />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img src={"/flat.png"} alt="banner" />
              </SwiperSlide>
            </Swiper>
          </div>
        </>
      )}

      <div className={styles.container}>
        <div className={styles.sw_parent}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            slidesPerGroup={1}
            centeredSlides={true}
            centeredSlidesBounds={true}
            pagination={{ clickable: true }}
            className={styles.swiper}
          >
            <SwiperSlide onClick={() => setOpen(true)} className={styles.slide}>
              <img src={"/flat.png"} alt="banner" />
            </SwiperSlide>
            <SwiperSlide onClick={() => setOpen(true)} className={styles.slide}>
              <img src={"/flat.png"} alt="banner" />
            </SwiperSlide>
            <SwiperSlide onClick={() => setOpen(true)} className={styles.slide}>
              <img src={"/flat.png"} alt="banner" />
            </SwiperSlide>
            <SwiperSlide onClick={() => setOpen(true)} className={styles.slide}>
              <img src={"/flat.png"} alt="banner" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={styles.containerUser}>
          <div className={styles.userCard}>
            <Link href={`/profile/${flat.user.id}`}>
              <div className={styles.avatar}>
                <Image
                  src={"/icons/userProfile.svg"}
                  alt="avatar"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
            <div className={styles.userInformation}>
              <Link href={`/profile/${flat.user.id}`}>
                <h1>
                  {flat.user.name}, {flat.user.age}
                </h1>
              </Link>
              <h4>{flat.user.city}</h4>
            </div>
          </div>
          <h1>XX%</h1>
        </div>
        <h3 className={styles.price}>15000руб/мес</h3>
        <h3 className={styles.commun} onClick={() => setOpen(true)}>
          Комуналка:XXXXруб/мес
        </h3>
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
                <li>
                  Район:{" "}
                  {
                    district
                      .split(",")
                      [district.split(",").length - 1].split(" ")[
                      district
                        .split(",")
                        [district.split(",").length - 1].split(" ").length - 1
                    ]
                  }
                </li>
                <li>Удаленность от</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.userButtons}>
          <div>
            <Link href={`/profile/${flat.user.id}`}>
              <button>Написать</button>
            </Link>
          </div>
          <div>
            <Link href={pathname}>
              <Image
                src={`/icons/like${
                  user.favourites.flats.find((fl) => fl.id === flat.id)
                    ? "d"
                    : ""
                }.svg`}
                alt="like"
                width={100}
                height={100}
                onClick={() =>
                  dispatch(addToFavourites({ type: "flats", value: flat }))
                }
              />
            </Link>
          </div>
        </div>
        <div className={styles.description}>
          <p>Здесь представлено описание предложения от автора</p>
          {true && (
            <span>
              {" "}
              <TickLOGO /> повышенная доступность
            </span>
          )}
          {true && (
            <span>
              {" "}
              <TickLOGO /> есть лист ответственности
            </span>
          )}
        </div>
        <div className={styles.conveniences}>
          <p className={styles.p}>удобства</p>
          <div className={styles.cards}>
            {conveniences.map((convenience) => (
              <div className={styles.conv}>
                <Convenience label={convenience} />
              </div>
            ))}
          </div>
          <p>Еще удобства</p>
        </div>
        <div className={styles.all_eq}>
          <p className={styles.p}>Оснащенность квартиры</p>

          <div className={styles.equipments}>
            {conveniences.map((convenience) => (
              <div className={styles.equipment}>
                <Convenience label={convenience} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.location}>
          <h4>Расположение</h4>
          <YMaps query={{ apikey: "a397206b-3df1-47d3-b87e-de0031179a0e" }}>
            <Map
              onLoad={(ymaps) => geocode(ymaps)}
              style={{ width: "98%", height: "250px", marginLeft: "1%" }}
              instanceRef={mapRef}
              onClick={(e: any) => onClickToMap(e)}
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
              {addressCoord && (
                <GeoObject
                  geometry={{
                    type: "Point",
                    coordinates: addressCoord,
                  }}
                />
              )}
            </Map>
          </YMaps>
        </div>
        <div className={styles.about}>
          <h4>О квартире</h4>
          <div className={styles.cards}>
            <IconCard label={`Срок : меньше месяца`} icon="term" />
            <IconCard label={`Комнаты : n комнат`} icon="rooms" />
            <IconCard label={`Ремонт : современный`} icon="repair" />
            <IconCard label={`Тип дома : советский фонд`} icon="term" />
            <IconCard label={`Шумоизоляция : нет шумов`} icon="rooms" />
            <IconCard
              label={`Солнечная сторона : солнце попадает`}
              icon="repair"
            />
          </div>
        </div>
        <div className={styles.about}>
          <h4>О районе</h4>
          <div className={styles.cards}>
            <IconCard label="Магазин" icon="shop" time={5} />
            <IconCard label="Остановка" icon="stop" time={5} />
            <IconCard label="Кафе" icon="cafe" time={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatDetail;
