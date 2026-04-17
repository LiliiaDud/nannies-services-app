import css from "./Registration.module.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "../ModalContext/UseModal";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too long")
    .required("Name is required!"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .max(128, "Maximum 128 characters")
    .required("Password required!"),
});

export default function Registration() {
  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log(data);
    closeModal();
  };

  return (
    <div className={css.registration}>
      <button
        className={css.btn_close}
        aria-label="Close modal"
        onClick={closeModal}
      >
        <svg width={19} height={19} className={css.close_icon}>
          <use href="/sprite.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.registration_info}>
        <h2 className={css.registration_title}>Registration</h2>
        <p className={css.registration_text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          className={css.input}
          type="text"
          placeholder="Name"
        />
        <p className={css.color_text}>{errors.name?.message}</p>
        <input
          {...register("email")}
          className={css.input}
          type="email"
          placeholder="Email"
        />
        <p className={css.color_text}>{errors.email?.message}</p>
        <input
          {...register("password")}
          className={css.input}
          type="password"
          placeholder="Password"
        />
        <p>{errors.password?.message}</p>
        <button className={css.btn_signup} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}