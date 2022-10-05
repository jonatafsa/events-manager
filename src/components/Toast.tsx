import '../styles/components/toast.scss';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Toast() {
  return (
    <div>
      {/* <span>Usuário inserido com sucesso</span> */}
    </div>
  )
}

export const toast = {
  show: (props: ToastProps) => {
    const { message, type, duration, position } = props;
    const toast = document.createElement('div');
    toast.className = `toast slide-left ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);
  }
}