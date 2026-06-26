const imgs = {
  katya: '/avatars/katya.png',
  dog:   '/avatars/dog.png',
  petya: '/avatars/petya.png',
};

type AvatarProps = {
  variant?: 'katya' | 'dog' | 'petya';
  size?: number;
  className?: string;
};

export default function Avatar({ variant = 'katya', size = 30, className }: AvatarProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-full shrink-0 ${className ?? ''}`}
      style={{ width: size, height: size }}
    >
      <img src={imgs[variant]} alt={variant} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
}
