import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/organisms/Header';
import CardTop from '../components/organisms/CardTop';
import Btn from '../components/molecules/Btn';
import Dropdown from '../components/molecules/Dropdown';

const IMG_TEXTURE = 'https://www.figma.com/api/mcp/asset/f65736c7-eba2-47d7-a97c-e4adf99fda1d';

const ATTEMPTS = [
  {
    label: 'First attempt',
    status: 'failed',
    offered: { salary: '$8 750',  perks: ['Lead Role', 'Cookies', 'Free Education']      },
    counter: { salary: '$12 750', perks: ['Lead Role', 'Remote-work', 'Gym']             },
  },
  {
    label: 'Second attempt',
    status: 'failed',
    offered: { salary: '$9 500',  perks: ['Lead Role', 'Remote-work', 'Stock Options']   },
    counter: { salary: '$11 000', perks: ['Lead Role', 'Flexible Hours', 'Education']    },
  },
  {
    label: 'Third attempt',
    status: 'pending',
    offered: { salary: '$10 500', perks: ['Lead Role', 'Remote-work', 'Health Insurance'] },
    counter: { salary: '$10 200', perks: ['Lead Role', 'Remote-work', 'Gym']             },
  },
];

const BENEFIT_OPTIONS = ['Frontend Team', 'Remote-work', 'Gym', 'Education', 'Stock Options', 'Health Insurance', 'Flexible Hours'];

// Вес каждого бенефита в баллах (до 15 каждый)
const BENEFIT_WEIGHTS: Record<string, number> = {
  'Remote-work':      15,
  'Stock Options':    14,
  'Health Insurance': 13,
  'Flexible Hours':   12,
  'Education':        11,
  'Gym':              8,
  'Frontend Team':    5,
};

// Base=37, SalaryMax=43, Benefits up to 15 each
// At salary=35 + Frontend(5) + Remote-work(13) + Gym(8) → 37+15+5+13+8 = 78%
const BASE_SCORE = 37;
const SALARY_MAX_PTS = 43;

function calcPrediction(salary: number, b1: string, b2: string, b3: string) {
  const salaryPts = (salary / 100) * SALARY_MAX_PTS;
  const benefitPts = (BENEFIT_WEIGHTS[b1] ?? 5) + (BENEFIT_WEIGHTS[b2] ?? 5) + (BENEFIT_WEIGHTS[b3] ?? 5);
  return Math.min(99, Math.round(BASE_SCORE + salaryPts + benefitPts));
}

const statusDot: Record<string, string> = {
  failed:  'bg-[#cc0000]',
  accepted: 'bg-tech-green',
  pending:  'bg-secondary',
};
const statusText: Record<string, string> = {
  failed:  'text-[#cc0000]',
  accepted: 'text-tech-green',
  pending:  'text-secondary',
};

type NegotiateState = { name?: string; role?: string };

export default function DesignNegotiate() {
  const navigate  = useNavigate();
  const { state } = useLocation() as { state: NegotiateState | null };

  const name = state?.name ?? 'Michael Thompson';
  const role = state?.role ?? 'Product Manager';

  const [salary,   setSalary]   = useState(35);
  const [benefit1, setBenefit1] = useState('Frontend Team');
  const [benefit2, setBenefit2] = useState('Remote-work');
  const [benefit3, setBenefit3] = useState('Gym');

  const salaryValue = Math.round(8000 + (salary / 100) * 60000);
  const salaryDisplay = `$${salaryValue.toLocaleString('en-US').replace(',', ' ')}`;

  const predicted = calcPrediction(salary, benefit1, benefit2, benefit3);

  return (
    <div className="min-h-screen bg-base">
      <Header
        showSecondRow
        secondRowType="default"
        showBack
        showBar={false}
        transparent
        onBack={() => navigate(-1)}
        onHomeClick={() => navigate('/design')}
      />

      <div className="max-w-[830px] mx-auto flex flex-col gap-xxs pb-xxl pt-xxs">

        {/* CardTop */}
        <CardTop type="default" name={name} role={role} />

        {/* Attempt cards */}
        {ATTEMPTS.map((a) => (
          <div key={a.label} className="bg-card-white rounded-l p-x flex flex-col gap-l">
            <span className="font-pixel text-pixel tracking-[2px] uppercase text-secondary">{a.label}</span>
            <div className="flex items-start justify-between w-full">

              {/* Left: company offer */}
              <div className="flex flex-col gap-s w-[290px]">
                <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">{a.offered.salary}</span>
                <div className="flex flex-col gap-xs">
                  {a.offered.perks.map(p => (
                    <span key={p} className="font-pixel text-pixel tracking-[2px] uppercase text-secondary">{p}</span>
                  ))}
                </div>
              </div>

              {/* Center: status */}
              <div className="flex items-center gap-xs shrink-0">
                <span className={`w-[5px] h-[5px] rounded-full shrink-0 ${statusDot[a.status]}`} />
                <span className={`font-pixel text-pixel tracking-[2px] uppercase ${statusText[a.status]}`}>{a.status}</span>
              </div>

              {/* Right: candidate counter */}
              <div className="flex flex-col gap-s w-[290px] items-start">
                <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary w-full text-right">{a.counter.salary}</span>
                <div className="flex flex-col gap-xs w-full items-start">
                  {a.counter.perks.map(p => (
                    <span key={p} className="font-pixel text-pixel tracking-[2px] uppercase text-secondary">{p}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Bottom: Offer form + Prediction */}
        <div className="flex gap-xxs items-stretch">

          {/* Offer form */}
          <div className="bg-card-white rounded-l p-x flex flex-col gap-l items-center w-[340px] shrink-0">
            <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary text-center w-full">Offer</span>

            <div className="flex flex-col gap-x w-full">
              {/* Salary input + slider */}
              <div className="flex flex-col gap-s w-full">
                <div className="flex flex-col gap-xs w-full">
                  <span className="font-grotesk text-caps tracking-[1.6px] uppercase text-primary">Salary</span>
                  <div className="h-8 flex items-center px-s bg-control rounded-s w-full">
                    <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{salaryDisplay}</span>
                  </div>
                </div>
                {/* Slider */}
                <div className="relative h-1 w-full bg-control rounded-l">
                  <div
                    className="absolute h-1 left-0 bg-brown rounded-l"
                    style={{ width: `${salary}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={salary}
                    onChange={e => setSalary(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                    className="absolute -translate-y-1/2 top-1/2 w-[14px] h-[14px] bg-brown border-2 border-white rounded-full pointer-events-none"
                    style={{ left: `calc(${salary}% - 7px)` }}
                  />
                </div>
              </div>

              <Dropdown showHeadline headline="1st benefit" value={benefit1} options={BENEFIT_OPTIONS} theme="on-color" onChange={setBenefit1} />
              <Dropdown showHeadline headline="2nd benefit" value={benefit2} options={BENEFIT_OPTIONS} theme="on-color" onChange={setBenefit2} />
              <Dropdown showHeadline headline="3rd benefit" value={benefit3} options={BENEFIT_OPTIONS} theme="on-color" onChange={setBenefit3} />
            </div>

            <Btn btnType="small" label="Send Offer" />
          </div>

          {/* Prediction */}
          <div className="flex-1 bg-card-white rounded-l p-x flex flex-col gap-l items-center justify-center overflow-hidden relative min-h-[400px]">
            <div className="absolute inset-0 pointer-events-none rounded-l overflow-hidden">
              <img alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-30" src={IMG_TEXTURE} />
            </div>
            <span className="font-antiqa text-[230px] leading-none text-tech-green text-center tracking-[-2.3px] tabular-nums relative z-10 transition-all duration-300">{predicted}%</span>
            <span className="font-antiqa text-[40px] leading-tight text-tech-green text-center tracking-[-0.4px] relative z-10">predicted approvement</span>
          </div>

        </div>
      </div>
    </div>
  );
}
