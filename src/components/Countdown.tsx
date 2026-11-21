import React, { useEffect, useState } from 'react';
import { EVENT_CONFIG, toPersianDigits } from '../config/event';

interface CountdownRemaining {
  status: 'unconfigured' | 'counting' | 'completed';
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateRemaining(isoDate: string | null): CountdownRemaining {
  if (!isoDate) {
    return { status: 'unconfigured', days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const targetMs = Date.parse(isoDate);
  if (Number.isNaN(targetMs)) {
    return { status: 'unconfigured', days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diffMs = targetMs - Date.now();
  if (diffMs <= 0) {
    return { status: 'completed', days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { status: 'counting', days, hours, minutes, seconds };
}

function padTwo(value: number): string {
  return toPersianDigits(String(value).padStart(2, '0'));
}

export const Countdown: React.FC = () => {
  const [remaining, setRemaining] = useState<CountdownRemaining>(() =>
    calculateRemaining(EVENT_CONFIG.EVENT_DATE_ISO)
  );

  useEffect(() => {
    if (!EVENT_CONFIG.EVENT_DATE_ISO) return;

    const tick = () => {
      setRemaining(calculateRemaining(EVENT_CONFIG.EVENT_DATE_ISO));
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  if (remaining.status === 'unconfigured') {
    return (
      <div className="w-full py-3 px-4 rounded-2xl bg-[#FAF5ED]/80 border border-[#C6A46A]/40 text-center">
        <p className="text-[13px] text-[#6C5E52]">
          شمارش معکوس پس از ثبت سال دقیق مراسم فعال می‌شود.
        </p>
      </div>
    );
  }

  if (remaining.status === 'completed') {
    return (
      <div
        role="status"
        className="w-full py-4 px-5 rounded-2xl bg-[#FAF5ED]/88 border border-[#C6A46A]/50 text-center shadow-[0_6px_18px_-10px_rgba(64,54,45,0.14)]"
      >
        <p className="text-[15px] font-semibold text-[#757D1E]">
          {EVENT_CONFIG.copy.eventCompletedTitle}
        </p>
        <p className="text-[12.5px] text-[#6C5E52] mt-1 leading-relaxed">
          {EVENT_CONFIG.copy.eventCompletedSubtitle}
        </p>
      </div>
    );
  }

  const units = [
    { label: 'روز', value: toPersianDigits(remaining.days) },
    { label: 'ساعت', value: padTwo(remaining.hours) },
    { label: 'دقیقه', value: padTwo(remaining.minutes) },
    { label: 'ثانیه', value: padTwo(remaining.seconds) },
  ];

  return (
    <div aria-label="شمارش معکوس تا آغاز مراسم" className="w-full">
      <div className="grid grid-cols-4 gap-2.5">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center py-3 px-1.5 rounded-2xl bg-[#FAF6EE]/90 border border-[#C6A46A]/45 shadow-[0_6px_16px_-10px_rgba(64,54,45,0.16)]"
          >
            <span className="text-[22px] sm:text-[24px] font-semibold leading-none text-[#40362D] tabular-nums">
              {unit.value}
            </span>
            <span className="text-[11px] font-medium text-[#6C5E52] mt-1.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
