type ErrorMsgProps = {
  text?: string;
  className?: string;
};

export default function ErrorMsg({
  text = 'add more money for salary, you dumb ass',
  className,
}: ErrorMsgProps) {
  return (
    <div
      className={`flex gap-s items-start p-xs rounded-s bg-on-red font-grotesk text-caps tracking-[1.6px] uppercase text-tech-red whitespace-nowrap ${className ?? ''}`}
    >
      <span className="shrink-0">error!</span>
      <span>{text}</span>
    </div>
  );
}
