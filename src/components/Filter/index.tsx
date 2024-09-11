import {
  ChangeEvent,
  Dispatch,
  FC,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ArrowLeft from "../../../public/svgs/arrowLeft";
import Mark from "../../../public/svgs/mark";
import styles from "../Filter/styles.module.scss";
import { YMaps, Map, GeoObject } from "@pbe/react-yandex-maps";
import ExitF from "../../../public/svgs/exitF";
import FitlerToggle from "../FilterToggle";
import {
  appliances,
  comfort,
  houseType,
  repair,
  soundIsolation,
} from "@/config";

interface IFilter {
  setFilter?: Dispatch<SetStateAction<boolean>>;
}

interface IFilterResult {
  search_point: number[];
  distance: number;
  i_am_owner: boolean;
  min_count_days: number;
  max_count_days: number;
  min_cost: number;
  max_cost: number;
  is_have_bail: boolean;
  is_have_fines: boolean;
  min_cost_utilities: number;
  max_cost_utilities: number;
  min_count_rooms: number;
  max_count_rooms: number;
  min_floor: number;
  max_floor: number;
  min_building_floor: number;
  max_building_floor: number;
  repair_type: number;
  building_type: number;
  sound_insulation_type: number;
  accessibility_type: number;
  is_sunny_side: boolean;
  is_have_elevator: boolean;
  is_have_balcony: boolean;
  is_have_parking_space: boolean;
  is_have_security: boolean;
  is_have_horizontal_bars: boolean;
  is_have_conditioner: boolean;
  is_have_garbage_chute: boolean;
  is_have_wifi: boolean;
  is_have_transport_close: boolean;
  is_possible_smoke: boolean;
  is_possible_animals: boolean;
  is_have_washing_machine: boolean;
  is_have_dryer: boolean;
  is_have_iron: boolean;
  is_have_dishwasher: boolean;
  is_have_hair_dryer: boolean;
  is_have_tv: boolean;
  is_have_guest_table: boolean;
  is_have_guest_cabinet: boolean;
  min_count_photos: number;
  search: string;
  is_favorite: boolean;
}

const Filter: FC<IFilter> = ({ setFilter }) => {
  const [addressCoord, setAddressCoord] = useState([55.75, 37.57]);
  const distance = useRef<HTMLInputElement>(null);
  const min_count_days = useRef<HTMLInputElement>(null);
  const max_count_days = useRef<HTMLInputElement>(null);
  const min_cost = useRef<HTMLInputElement>(null);
  const max_cost = useRef<HTMLInputElement>(null);
  const min_cost_utilities = useRef<HTMLInputElement>(null);
  const max_cost_utilities = useRef<HTMLInputElement>(null);
  const min_count_rooms = useRef<HTMLInputElement>(null);
  const max_count_rooms = useRef<HTMLInputElement>(null);
  const min_floor = useRef<HTMLInputElement>(null);
  const max_floor = useRef<HTMLInputElement>(null);
  const min_building_floor = useRef<HTMLInputElement>(null);
  const max_building_floor = useRef<HTMLInputElement>(null);
  const min_count_photos = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState(false);
  const [city, setCity] = useState<string>("Москва");
  const mapRef = useRef();
  const [ymap, setYmap] = useState();

  const onClickToMap = async (e: any, ymaps?: any) => {
    const coords = e.get("coords");
    setAddressCoord(coords);
    ymaps.geocode(coords).then((res: any) => {
      let firstGeoObject = res.geoObjects.get(0);
      setCity(firstGeoObject.getAddressLine());
    });
  };

  const inputOnChange = async (
    value: React.FormEvent<HTMLInputElement>,
    ymaps?: any
  ) => {
    setCity(value.currentTarget.value);
    ymaps.geocode(value.currentTarget.value).then((res: any) => {
      let firstGeoObject = res.geoObjects.get(0);
      setAddressCoord(firstGeoObject.geometry._coordinates);
    });
  };
  const handleInputChange = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      const newValue = inputRef.current.value;
      // Фильтруем только числовые значения
      if (!/^\d*$/.test(newValue)) {
        inputRef.current.value = newValue.replace(/[^\d]/g, "");
      }
    }
  };

  const geocode = (ymaps: any) => {
    setYmap(ymaps);
  };

  const [filterResult, setFilterResult] = useState<IFilterResult>({
    search_point: [0, 0],
    distance: 10000000000,
    i_am_owner: true,
    min_count_days: 0,
    max_count_days: 0,
    min_cost: 0,
    max_cost: 0,
    is_have_bail: true,
    is_have_fines: true,
    min_cost_utilities: 0,
    max_cost_utilities: 0,
    min_count_rooms: 0,
    max_count_rooms: 0,
    min_floor: 0,
    max_floor: 0,
    min_building_floor: 0,
    max_building_floor: 0,
    repair_type: 0,
    building_type: 0,
    sound_insulation_type: 0,
    accessibility_type: 0,
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
    min_count_photos: 0,
    search: "",
    is_favorite: true,
  });

  useEffect(() => {
    // function login_a() {
    //   fetch("https://3133319-bo35045.twc1.net/api/v0/login/", {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       Authorization: `Basic ${btoa("+79878199999:010101ggg")}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((response) => console.log(response))
    //     .then((res) => list_a())
    //     .catch((error) => {
    //       console.error("Request failed:", error);
    //     });
    // }
    // login_a();
    // function list_a() {
    //   fetch("https://3133319-bo35045.twc1.net/api/v0/users/", {
    //     method: "GET",
    //     credentials: "include",
    //   })
    //     .then((response) => console.log(response))
    //     .catch((error) => console.log(error));
    // }
  }, []);

  return (
    <div className={styles.filter}>
      {map && (
        <>
          <div className={styles.map_popup}>
            <div className={styles.exit} onClick={() => setMap(false)}>
              <ExitF color="#fff" />
            </div>
            <input
              className={styles.input}
              type="text"
              placeholder="Ваш ответ"
              value={city}
              onChange={(value) => inputOnChange(value, ymap)}
            />
            <div className={styles.map}>
              <YMaps query={{ apikey: "a397206b-3df1-47d3-b87e-de0031179a0e" }}>
                <Map
                  style={{ width: "98%", height: "90%" }}
                  instanceRef={mapRef}
                  onLoad={(ymaps) => geocode(ymaps)}
                  onClick={(e: any) => onClickToMap(e, ymap)}
                  state={{
                    center: addressCoord,
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
                  <GeoObject
                    geometry={{
                      type: "Point",
                      coordinates: addressCoord,
                    }}
                  />
                </Map>
              </YMaps>
            </div>
          </div>
        </>
      )}
      <div className={styles.filter_page}>
        <div className={styles.header}>
          <span className={styles.title}>Фильтры</span>
          <div
            className={styles.exit}
            onClick={() => (setFilter ? setFilter(false) : "")}
          >
            <ExitF />
          </div>
          {/* <div className={styles.to_default}>Сбросить</div> */}
        </div>
        <div className={styles.filter_content}>
          <div className={styles.content_line}>
            <div className={styles.place}>
              <div className={styles.place_title}>Расположение</div>
              <div className={styles.placemark} onClick={() => setMap(true)}>
                <div className={styles.item_icon}>
                  <Mark />
                </div>
                <div className={styles.placemart_content}>
                  <span className={styles.placemark_title}>{city}</span>
                  <span className={styles.placemark_subtitle}>
                    метро,район,адрес,ЖК
                  </span>
                </div>
                <div className={styles.arrow_icon}>
                  <ArrowLeft />
                </div>
              </div>
              <div className={styles.place_radius}>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={"100000000"}
                  ref={distance}
                  onChange={(v) => handleInputChange(distance)}
                />
              </div>
            </div>
          </div>
          <div className={styles.content_line}>
            <FitlerToggle id="owner" text="Только от собственника" />
          </div>
          <div className={styles.content_line}>
            <div className={styles.days}>
              <div className={styles.title}>На какой срок (в днях)</div>
              <div className={styles.error}>минимум</div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input
                    className={styles.input}
                    placeholder="От"
                    ref={min_count_days}
                    onChange={(v) => handleInputChange(min_count_days)}
                  />
                </div>
                <div className={styles.max_input}>
                  <input
                    className={styles.input}
                    placeholder="и до"
                    ref={max_count_days}
                    onChange={(v) => handleInputChange(max_count_days)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.price_per_month}>
              <div className={styles.title}>Цена</div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input className={styles.input} placeholder="Цена от"   ref={min_cost}
                    onChange={(v) => handleInputChange(min_cost)}/>
                </div>
                <div className={styles.max_input}>
                  <input className={styles.input} placeholder="и до"   ref={max_cost}
                    onChange={(v) => handleInputChange(max_cost)}/>
                </div>
              </div>
            </div>
          </div>
          <h3 className={styles.big_title}>О квартире</h3>
          <div className={styles.content_line} id={styles.no_gap}>
            <FitlerToggle id="deposit" text="Есть залог" />

            <FitlerToggle id="penalty" text="Есть штрафы" />
          </div>
          <div className={styles.content_line}>
            <div className={styles.days}>
              <div className={styles.title}>Комуннальный услуги</div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input className={styles.input} placeholder="Цена от"   ref={min_cost_utilities}
                    onChange={(v) => handleInputChange(min_cost_utilities)}/>
                </div>
                <div className={styles.max_input}>
                  <input className={styles.input} placeholder="и до"  ref={max_cost_utilities}
                    onChange={(v) => handleInputChange(max_cost_utilities)} />
                </div>
              </div>
            </div>
            <div className={styles.price_per_month}>
              <div className={styles.title}>Количество комнат</div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input className={styles.input} placeholder="От"   ref={min_count_rooms}
                    onChange={(v) => handleInputChange(min_count_rooms)}/>
                </div>
                <div className={styles.max_input}>
                  <input className={styles.input} placeholder="и до"  ref={max_count_rooms}
                    onChange={(v) => handleInputChange(max_count_rooms)} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_line}>
            <div className={styles.days}>
              <div className={styles.title}>Этаж квартиры</div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input className={styles.input} placeholder="От"  ref={min_floor}
                    onChange={(v) => handleInputChange(min_floor)} />
                </div>
                <div className={styles.max_input}>
                  <input className={styles.input} placeholder="и до"   ref={max_floor}
                    onChange={(v) => handleInputChange(max_floor)}/>
                </div>
              </div>
            </div>
            <div className={styles.price_per_month}>
              <div className={styles.title}>Всего этажей</div>
              <div className={styles.content}>
                <div className={styles.min_input}>
                  <input className={styles.input} placeholder="От"   ref={min_building_floor}
                    onChange={(v) => handleInputChange(min_building_floor)}/>
                </div>
                <div className={styles.max_input}>
                  <input className={styles.input} placeholder="и до"  ref={max_building_floor}
                    onChange={(v) => handleInputChange(max_building_floor)} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_line_max}>
            <div className={styles.line_title}>Тип ремонта</div>
            <div className={styles.toggle_list}>
              {repair.map((tog, ind) => {
                return (
                  <div className={`${styles.toggle} ${styles.choosen_toggle}`}>
                    {tog}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.content_line_max}>
            <div className={styles.line_title}>Тип здания</div>
            <div className={styles.toggle_list}>
              {houseType.map((tog, ind) => {
                return (
                  <div className={`${styles.toggle} ${styles.choosen_toggle}`}>
                    {tog}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.content_line_max}>
            <div className={styles.line_title}>Звукоизоляция</div>
            <div className={styles.toggle_list}>
              {soundIsolation.map((tog, ind) => {
                return (
                  <div className={`${styles.toggle} ${styles.choosen_toggle}`}>
                    {tog}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.content_line_max}>
            <div className={styles.line_title}>Доступность</div>
            <div className={styles.toggle_list}>
              {soundIsolation.map((tog, ind) => {
                return (
                  <div className={`${styles.toggle} ${styles.choosen_toggle}`}>
                    {tog}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.content_line}>
            <div className={styles.comfort}>
              <div className={styles.title}>Комфорт</div>
              <div className={styles.content}>
                <div className={styles.toggle_list}>
                  {comfort.map((tog, ind) => {
                    return (
                      <div
                        className={`${styles.toggle} ${styles.choosen_toggle}`}
                      >
                        {tog}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_line}>
            <div className={styles.two_toggles}>
              <FitlerToggle id="smoke" text="Можно курить" />
              <FitlerToggle id="pets" text="Можно с животными" />
            </div>
          </div>

          <div className={styles.content_line}>
            <div className={styles.comfort}>
              <div className={styles.title}>В квартире есть</div>
              <div className={styles.content}>
                <div className={styles.toggle_list}>
                  {appliances.map((tog, ind) => {
                    return (
                      <div
                        className={`${styles.toggle} ${styles.choosen_toggle}`}
                      >
                        {tog}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content_line}>
            <div className={styles.photo_count_and_only_favorites}>
              <span className={styles.title}>Минимум фоторгафий</span>
              <input type="text" className={styles.input} defaultValue={0}   ref={min_count_photos}
                    onChange={(v) => handleInputChange(min_count_photos)}/>
              <FitlerToggle
                id="favorits"
                text="Показывать только избранные объявления"
              />
            </div>
            <div className={styles.description}>
              <span className={styles.title}>Описание квартиры</span>
              <input type="text" className={styles.input} />
            </div>
          </div>
        </div>
        <div className={styles.content_line_max}>
          <button className={styles.show_result}>Показать</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
