import React from "react";
import styles from "../../styles.module.scss";
import Link from "next/link";
import SignWith from "../../../../components/SignInSocial";
import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button";

export default function PhoneInput() {
  return (
    <Form>
      <FormHeading for="phone">РЕГИСТРАЦИЯ</FormHeading>
      <TextInput name="phone" type="tel" id="phone" placeholder="Номер" />

      <SignWith />

      <div className={`${styles.haveAccount} ${styles.mar1}`}>
        <div>Есть аккаунт?</div>

        <Link className={styles.link} href={"/sign-in"}>
          Войти!
        </Link>
      </div>

      <div className={styles.captcha}></div>

      <Button type="submit">Продолжить</Button>
    </Form>
  );
}
