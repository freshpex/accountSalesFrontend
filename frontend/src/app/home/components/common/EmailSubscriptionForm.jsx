import { useState } from "react";
import ContainedButton from "./buttons/ContainedButton";
import ErrorMessage from "./notifications/ErrorMessage";
import SuccessMessage from "./notifications/SuccessMessage";

export default function EmailSubscriptionForm({ formExtraClasses, inputExtraClasses }) {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            setError(true);
            let errorTimeout;
            if (errorTimeout) {
                clearTimeout(errorTimeout);
            }
            errorTimeout = setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        setSuccess(true);
        let successTimeout;
        if (successTimeout) {
            clearTimeout(successTimeout);
        }
        successTimeout = setTimeout(() => {
            setSuccess(false);
        }, 1500);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={`bg-neutral-100 text-neutral-900 | p-1 | border-2 border-solid border-neutral-400 rounded-full | flex justify-between | focus-within:border-primary | transition-colors | ${formExtraClasses}`}
            >
                <input
                    type="email"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your email address.."
                    className={`grow | pl-4 | border-none outline-none | placeholder:text-neutral-500 placeholder:text-300 placeholder:leading-relaxed | ${inputExtraClasses}`}
                />

                <ContainedButton
                    type="submit"
                    extraClasses="shrink-0 | px-[30px] py-[15px] | text-300 font-semibold leading-tight"
                >
                    Subscribe Now
                </ContainedButton>
            </form>

            {error && <ErrorMessage message="Email field can not be empty!" extraClasses="mt-1 text-right" />}
            {success && <SuccessMessage message="Thank you for subscribing!" extraClasses="mt-1 text-right" />}
        </>
    );
}
