import { useState } from 'react';
import css from './Login.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useModal } from '../ModalContext/UseModal';
import { loginUser } from '../../services/auth';

//  Додаю інтерфейс пропсів для Login
interface LoginProps {
  setIsAuth: (value: boolean) => void;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}
interface LoginFormData {
  email: string;
  password: string;
}

const Schema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required!'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .max(128, 'Maximum 128 characters')
    .required('Password required!'),
});

//  Прийм ці пропси в компоненті
export default function Login({ setIsAuth, setUserName }: LoginProps) {
  const { closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      //  Авториз через Firebase і отримуємо користувача
      const user = await loginUser(data.email, data.password);

      //  Оновл стани і localStorage для App / Header
      setIsAuth(true);
      const name = user.displayName || 'User';
      setUserName(name);
      localStorage.setItem('userName', name);
      localStorage.setItem('token', 'true');

      closeModal();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Login error:', error.message);
      } else {
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className={css.login}>
      <button className={css.btn_close} aria-label="Close modal" onClick={closeModal}>
        <svg width={19} height={19} className={css.close_icon}>
          <use href="/sprite.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.login_info}>
        <h2 className={css.login_title}>Log In</h2>
        <p className={css.login_text}>
          Welcome back! Please enter your credentials to access your account and continue your
          babysitter search.
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} className={css.input} type="email" placeholder="Email" />
        <p className={css.color_text}>{errors.email?.message}</p>

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
        <button className={css.btn_login} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}
