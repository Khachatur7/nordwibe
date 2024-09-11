"use client";

import Form from "@/components/Form";
import FormHeading from "@/components/Form/Heading";
import Button from "@/components/Button";
import React, { useState } from "react";
import { QuestionType } from "@/page/Questions/Provider";
import styles from "../styles.module.scss";
import TextInput from "@/components/Form/TextInput";

type QuestionProps = {
    question: QuestionType;
    onAnswer: (answer: string) => void;
    placeholder?: {
        floor: string,
        all: string
    }
    answer: number[]
};

export default function TwoNumberInput(props: QuestionProps) {
    const [first, setFirst] = useState<string>("")
    const [second, setSecond] = useState<string>("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (first && second) props.onAnswer(JSON.stringify([+first, +second]));
    }

    return (
        <Form action={handleSubmit}>
            <FormHeading for={props.question.id.toString()}>
                {props.question.content}
            </FormHeading>

            <fieldset className={styles.options}>
                <TextInput
                    id={props.question.id.toString()}
                    type="number"
                    placeholder={props.placeholder?.floor || "Ваш ответ"}
                    onChange={(value) => setFirst(value)}
                />

                <TextInput
                    id={props.question.id.toString()}
                    type="number"
                    placeholder={props.placeholder?.all || "Ваш ответ"}
                    onChange={(value) => setSecond(value)}
                />
            </fieldset>

            <Button type="submit">Продолжить</Button>
        </Form>
    );
}