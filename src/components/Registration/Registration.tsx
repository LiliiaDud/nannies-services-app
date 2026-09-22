import { useState } from 'react';
import css from './Registration.module.css';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useModal } from '../ModalContext/UseModal';
import { registerUser } from '../../services/auth';

// 1. Додаю інтерфейс пропсів для Registration
interface RegistrationProps {
  setIsAuth: (value: boolean) => void;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}
interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

const Schema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(30, 'Too long').required('Name is required!'),
  email: Yup.string().email('Invalid email format').required('Email is required!'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .max(128, 'Maximum 128 characters')
    .required('Password required!'),
});

// 2. Приймаю пропси в компоненті
export default function Registration({ setIsAuth, setUserName }: RegistrationProps) {
  const { closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      // Реєстр і отримуємо користувача
      const user = await registerUser(data.name, data.email, data.password);

      // Онов стани і localStorage
      setIsAuth(true);
      const name = user.displayName || data.name;
      setUserName(name);
      localStorage.setItem('userName', name);
      localStorage.setItem('token', 'true');

      closeModal();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Registration error:', error.message);
      } else {
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <div className={css.registration}>
      <button className={css.btn_close} aria-label="Close modal" onClick={closeModal}>
        <svg width={19} height={19} className={css.close_icon}>
          <use href="/sprite.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.registration_info}>
        <h2 className={css.registration_title}>Registration</h2>
        <p className={css.registration_text}>
          Thank you for your interest in our platform! In order to register, we need some
          information. Please provide us with the following information.
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} className={css.input} type="text" placeholder="Name" />
        <p className={css.color_text}>{errors.name?.message}</p>
        <input {...register('email')} className={css.input} type="email" placeholder="Email" />
        <p className={css.color_text}>{errors.email?.message}</p>
        {/* <input
          {...register('password')}
          className={css.input}
          type="password"
          placeholder="Password"
        /> */}
        <div className={css.box_password}>
          <input
            {...register('password')}
            className={css.input}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <button
            type="button"
            className={css.btn_eyes}
            onClick={() => setShowPassword(prev => !prev)}
            aria-label="Toggle password visibility"
          >
            <svg width={20} height={20} className={css.icon_eye}>
              <use href={`/sprite.svg#${showPassword ? 'icon-eye' : 'icon-eye-off'}`}></use>
            </svg>
          </button>
        </div>
        <p className={css.color_text}>{errors.password?.message}</p>
        <button className={css.btn_signup} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
