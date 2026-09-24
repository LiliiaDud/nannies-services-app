import css from './Appointment.module.css';
import { useModal } from '../ModalContext/UseModal';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Nanny } from '../../types/types';
import { toast } from 'react-toastify';

interface AppointmentFormData {
  address: string;
  tel: string;
  number: number;
  meetingTime: string;
  email: string;
  parentName: string;
  comment: string;
}

interface AppointmentProps {
  nanny: Nanny;
}

const AppointmentSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  tel: Yup.string()
    .matches(/^\+?[0-9\s-]+$/, 'Invalid phone number format')
    .required('Phone is required'),

  number: Yup.number().positive().required('Child age is required'),

  meetingTime: Yup.string().required('Meeting time is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),

  parentName: Yup.string().required("Parent's name is required"),

  comment: Yup.string().required('Comment is required'),
});

export default function Appointment({ nanny }: AppointmentProps) {
  const { closeModal } = useModal();

  const { register, handleSubmit, reset } = useForm<AppointmentFormData>({
    resolver: yupResolver(AppointmentSchema),
    defaultValues: {
      meetingTime: '00:00',
    },
  });

  const onSubmit = (data: AppointmentFormData) => {
    console.log('Appointment data:', {
      nanny: nanny.name,
      ...data,
    });

    toast.success('Appointment request sent!');
    reset();
    closeModal();
  };
  return (
    <div className={css.appointment}>
      <button className={css.btn_close} aria-label="Close modal" onClick={closeModal}>
        <svg width={19} height={19} className={css.close_icon}>
          <use href="/sprite.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.appointment_info}>
        <h2 className={css.appointment_title}>Make an appointment with a babysitter</h2>
        <p className={css.appointment_text}>
          Arranging a meeting with a caregiver for your child is the first step to creating a safe
          and comfortable environment. Fill out the form below so we can match you with the perfect
          care partner.
        </p>
      </div>
      <div className={css.nanny_info}>
        <div className={css.nanny_photo}>
          <img
            className={css.avatar}
            src={nanny.avatar_url}
            alt={nanny.name}
            width={44}
            height={44}
          ></img>
        </div>
        <div className={css.nanny_name}>
          <p className={css.nanny_name_text}>Nanny</p>
          <p className={css.nanny_name_name}>{nanny.name}</p>
        </div>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form_row}>
          <input {...register('address')} className={css.input_row} placeholder="Address" />
          <input {...register('tel')} className={css.input_row} type="tel" placeholder="+380" />
        </div>

        <div className={css.form_row}>
          <input
            {...register('number')}
            className={css.input_row}
            type="number"
            placeholder="Child's age"
          />
          <input {...register('meetingTime')} className={css.input_row} type="time" />
        </div>

        <input {...register('email')} className={css.input} type="email" placeholder="Email" />

        <input
          {...register('parentName')}
          className={css.input}
          placeholder="Father's or mother's name"
        />

        <textarea
          {...register('comment')}
          className={css.textarea}
          rows={3}
          placeholder="Comment"
        />

        <button className={css.form_btn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
