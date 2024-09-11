import React from "react";
import styles from "../../styles.module.scss";
import Link from "next/link";
import SignWith from "../../../../components/SignInSocial";
import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button";

export default function SignIn() {
  return (
    <Form type="sign-in">
      <FormHeading for="phone">ВХОД</FormHeading>

      <TextInput name="phone" type="tel" id="phone" placeholder="Номер" />

      <TextInput
        name="password"
        type="password"
        id="password"
        placeholder="Пароль"
      />

      <div className={styles.captcha}></div>

      <Button type="submit">Продолжить</Button>

      <SignWith />

      <div className={`${styles.haveAccount} ${styles.mar1}`}>
        <div>Нет аккаунта?</div>

        <Link className={styles.link} href={"/sign-up"}>
          Зарегистрироваться!
        </Link>
      </div>
      <Link
        className={`${styles.link} ${styles.noUnderLine}`}
        href={"/sign-in/phone-confirmation"}
      >
        Забыли пароль?
      </Link>
    </Form>
  );
}
