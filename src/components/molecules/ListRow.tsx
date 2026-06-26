type ListRowProps = {
  name?: string;
  type?: string;
  createdBy?: string;
  date?: string;
  onEdit?: () => void;
  className?: string;
};

export default function ListRow({
  name = 'Sarah Johnson',
  type = 'Document',
  createdBy = 'Created by Alan',
  date = '24.05.2025',
  onEdit,
  className,
}: ListRowProps) {
  return (
    <div className={`flex gap-s items-center py-s border-b border-lines ${className ?? ''}`}>
      <p className="flex-1 min-w-0 font-grotesk text-h3 leading-h3 tracking-[-0.4px] text-black">
        {name}
      </p>
      <p className="font-pixel text-pixel tracking-[2px] uppercase text-black w-[114px] shrink-0">
        {type}
      </p>
      <p className="font-pixel text-pixel tracking-[2px] uppercase text-black w-[162px] shrink-0">
        {createdBy}
      </p>
      <p className="font-pixel text-pixel tracking-[2px] uppercase text-black text-right w-[74px] shrink-0">
        {date}
      </p>
      <button
        onClick={onEdit}
        className="h-8 flex items-center justify-center px-s py-xs rounded-over bg-control shrink-0"
      >
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary whitespace-nowrap">
          edit
        </span>
      </button>
    </div>
  );
}
