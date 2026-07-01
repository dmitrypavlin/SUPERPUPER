import Profile from '../molecules/Profile';

type KanbanPerson = { name: string; role: string };
type KanbanColumn = { title: string; count: number; people: KanbanPerson[] };

const DEFAULT_COLUMNS: KanbanColumn[] = [
  {
    title: 'Applied', count: 4,
    people: [
      { name: 'Michael Thompson', role: 'Product Manager' },
      { name: 'Emily Carter',     role: 'UX Designer' },
      { name: 'James Wilson',     role: 'Data Analyst' },
      { name: 'Olivia Brown',     role: 'Marketing Specialist' },
    ],
  },
  {
    title: 'Screening', count: 6,
    people: [
      { name: 'Michael Thompson',  role: 'Project Manager' },
      { name: 'Emily Davis',       role: 'UX Designer' },
      { name: 'David Garcia',      role: 'Data Analyst' },
      { name: 'Jessica Martinez',  role: 'Marketing Specialist' },
      { name: 'Daniel Lee',        role: 'Systems Administrator' },
      { name: 'Laura Wilson',      role: 'Product Owner' },
    ],
  },
  {
    title: 'Interview', count: 3,
    people: [
      { name: 'Michael Thompson', role: 'Product Manager' },
      { name: 'Jessica Williams', role: 'UI/UX Designer' },
      { name: 'David Brown',      role: 'Data Scientist' },
    ],
  },
  {
    title: 'Offer', count: 1,
    people: [
      { name: 'Sophia Martinez', role: 'UX Designer' },
    ],
  },
];

type KanbanProps = {
  title?: string;
  columns?: KanbanColumn[];
  className?: string;
  onPersonClick?: (person: KanbanPerson) => void;
};

export default function Kanban({ title = 'Pipeline', columns = DEFAULT_COLUMNS, className, onPersonClick }: KanbanProps) {
  return (
    <div className={`flex flex-col gap-[50px] items-center px-x pb-xxl w-full ${className ?? ''}`}>
      <h1 className="font-antiqa text-h1 leading-[0.9] text-primary text-center tracking-[-0.84px] w-[830px]">
        {title}
      </h1>
      <div className="bg-card-white flex flex-wrap gap-l items-start p-x rounded-l w-full">
        {columns.map(col => (
          <div key={col.title} className="flex-1 min-w-[254px] flex flex-col gap-m">
            <div className="flex items-start justify-between w-full whitespace-nowrap">
              <span className="font-antiqa text-[40px] leading-none tracking-[-0.4px] text-primary">{col.title}</span>
              <span className="font-antiqa text-[40px] leading-none tracking-[-0.4px] text-secondary">{col.count}</span>
            </div>
            <div className="flex flex-col gap-xxxs w-full">
              {col.people.map((p, i) => (
                <Profile
                  key={i}
                  size="short-outlined"
                  name={p.name}
                  role={p.role}
                  className="w-full rounded-s"
                  onClick={onPersonClick ? () => onPersonClick(p) : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
