import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function App() {
  const [checkedValue, setCheckedValue] = useState("");
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errorMessages = {
    firstName: "Please enter your first name",
    lastName: "Please enter your last name",
    email: "Please enter a valid email address",
    queryType: "Please select a query type",
    message: "Please enter a message",
    consent: "Please consent to being contacted",
  };

  function handleChange(e) {
    const { checked, type, name, value } = e.target;
    if (name === "queryType") {
      setCheckedValue(value);
    }
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!formValues.firstName) newErrors.firstName = errorMessages.firstName;
    if (!formValues.lastName) newErrors.lastName = errorMessages.lastName;
    if (!formValues.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/))
      newErrors.email = errorMessages.email;
    if (!formValues.queryType) newErrors.queryType = errorMessages.queryType;
    if (!formValues.message) newErrors.message = errorMessages.message;
    if (!formValues.consent) newErrors.consent = errorMessages.consent;
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitting form data", formValues);
      setIsSubmitted(true);
      setCheckedValue("");
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        queryType: "",
        message: "",
        consent: false,
      });
      console.log("submit", formValues);
    } else {
      console.log("Validation errors:", newErrors);
    }
  }

  return (
    <>
      {isSubmitted && <SubmitSuccess />}
      <div className={styles.formContainer}>
        <h1>Contact Us</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.nameField}>
            <div>
              <label htmlFor="firstName">
                First Name <span>*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                className={errors.firstName ? styles.inputError : ""}
              />
              {errors.firstName && (
                <p className={styles.error}>{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName">
                Last Name <span>*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                className={errors.lastName ? styles.inputError : ""}
              />
              {errors.lastName && (
                <p className={styles.error}>{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className={styles.emailField}>
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className={errors.email ? styles.inputError : ""}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.queryField}>
            <label htmlFor="query">
              Query Type <span>*</span>
            </label>
            <div>
              <label
                className={checkedValue === "general" ? styles.checked : ""}
              >
                <input
                  type="radio"
                  name="queryType"
                  value="general"
                  checked={checkedValue === "general"}
                  onChange={handleChange}
                />
                <span></span>
                General Enquiry
              </label>
              <label
                className={checkedValue === "support" ? styles.checked : ""}
              >
                <input
                  type="radio"
                  name="queryType"
                  value="support"
                  checked={checkedValue === "support"}
                  onChange={handleChange}
                />
                <span></span>
                Support Request
              </label>
            </div>
            {errors.queryType && (
              <p className={styles.error}>{errors.queryType}</p>
            )}
          </div>
          <div className={styles.messageField}>
            <label htmlFor="message">
              Message <span>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleChange}
              className={errors.message ? styles.inputError : ""}
            ></textarea>
            {errors.message && <p className={styles.error}>{errors.message}</p>}
          </div>
          <div className={styles.consentField}>
            <div>
              <input
                type="checkbox"
                name="consent"
                id="consent"
                checked={formValues.consent}
                onChange={handleChange}
                className={errors.consent ? styles.inputError : ""}
              />
              <label htmlFor="consent">
                I consent to being contacted by the team. <span>*</span>
              </label>
            </div>

            {errors.consent && (
              <p className={`${styles.error} ${styles.consentError}`}>
                {errors.consent}
              </p>
            )}
          </div>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

function SubmitSuccess() {
  return (
    <div className={styles.successContainer}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          fill="none"
          viewBox="0 0 20 21"
        >
          <path
            fill="#fff"
            d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z"
          />
        </svg>
        <span>Message Sent</span>
      </div>
      <p>Thanks for Completing form. We'll be in touch soon!</p>
    </div>
  );
}
