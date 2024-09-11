import styles from "@/components/Message/styles.module.scss"
import Image from "next/image";
import { FC } from "react";

const Message: FC<{ type: "your" | "his", message: string, sended_time: string, readed_time: string }> = ({ type, message, sended_time, readed_time }) => {
  return <div className={`${styles.message} ${type === "his" ? "flex-row-reverse" : ""}`}>
    <div className={styles.avatar}>
      <Image src={"/icons/userProfile.svg"} alt="avatar" width={100} height={100} />
    </div>
    <div className={`${styles.text} ${type === "his" ? "mr-2" : ""}`}>
      <h3 className={`${type === "his" ? "text-right" : ""}`}>Даня</h3>
      <p className={`${type === "his" ? "text-right !text-gray-600" : ""}`}>{message}<br/>
      <span>{sended_time} | {readed_time}</span></p>
    </div>
  </div>
}

export default Message;
