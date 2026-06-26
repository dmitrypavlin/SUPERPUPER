type ExperiencePreviewProps = {
  dateRange?: string;
  title?: string;
  company?: string;
  description?: string;
  className?: string;
};

export default function ExperiencePreview({
  dateRange = 'Jan 2022 — Present (3 years)',
  title = 'Senior Frontend Developer',
  company = 'TechCorp Solutions',
  description = 'Led development of React applications, mentored junior developers, improved performance by 40%',
  className,
}: ExperiencePreviewProps) {
  return (
    <div className={`flex flex-col gap-x py-s border-t border-lines w-full ${className ?? ''}`}>
      <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">
        {dateRange}
      </span>
      <div className="flex flex-col gap-s w-full">
        <span className="font-grotesk text-h3 leading-h3 text-primary">{title}</span>
        <div className="flex flex-col gap-[8px]">
          <span className="font-grotesk text-grotesk leading-grotesk text-primary">{company}</span>
          <span className="font-grotesk text-grotesk leading-grotesk text-primary">{description}</span>
        </div>
      </div>
    </div>
  );
}
