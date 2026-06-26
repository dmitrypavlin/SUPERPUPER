import Icon from './Icon';

type ProjectPreviewProps = {
  description?: string;
  tags?: string[];
  className?: string;
};

export default function ProjectPreview({
  description = 'Full-stack e-commerce solution with React frontend and Node.js backend',
  tags = ['React', 'Node.js', 'MongoDB', 'WebSocket'],
  className,
}: ProjectPreviewProps) {
  return (
    <div className={`flex flex-col gap-x py-s border-t border-lines w-full ${className ?? ''}`}>
      <p className="font-grotesk text-h3 leading-h3 text-primary max-w-[419px]">
        {description}
      </p>
      <div className="flex items-start gap-xxxs flex-wrap">
        {tags.map(tag => (
          <div
            key={tag}
            className="h-8 inline-flex items-center gap-[10px] p-xs rounded-s bg-on-yd"
          >
            <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary whitespace-nowrap">
              {tag}
            </span>
            <Icon icon="more" />
          </div>
        ))}
      </div>
    </div>
  );
}
