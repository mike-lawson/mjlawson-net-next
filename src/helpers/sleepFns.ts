// import * as d3 from 'd3';
import add from 'date-fns/add';
import parse from 'date-fns/parse';
import endOfDay from 'date-fns/endOfDay';
import isBefore from 'date-fns/isBefore';
import format from 'date-fns/format';

export enum SleepState {
  Awake,
  InBed,
  Asleep,
  Unknown,
}

export type SleepRow = {
  date: Date;
  state: SleepState;
};

type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type ScatterplotRow = {
  date: Date;
  x: Day;
  y: number;
};

type RowData = {
  start: Date;
  toBed: Date;
  asleep: Date | null;
  awake: Date | null;
  outOfBed: Date;
};

export const fetchSleepData = async (): Promise<string> => {
  const fetchResults = await fetch('/sleep-data.csv');
  const data = await fetchResults.text();
  return data;
};

export const parseSleepData = (input: string): SleepRow[] => {
  // Split into rows and drop header
  const rows = input
    .split('\n')
    .slice(1)
    .filter((x) => x)
    .map(parseDataRow);
  // Determine the first and last date we will be tracking
  let currentDateTime = rows[0].start;
  // Add another day as a cushion - for now
  const endDateTime = endOfDay(rows[rows.length - 1].outOfBed);

  const sleepRows: SleepRow[] = [];
  let index = 0;
  let state: SleepState = SleepState.Unknown;

  while (isBefore(currentDateTime, endDateTime)) {
    if (!rows[index]) {
      sleepRows.push({
        date: currentDateTime,
        state,
      });
      currentDateTime = add(currentDateTime, { minutes: 15 });
      // eslint-disable-next-line no-continue
      continue;
    }
    const { toBed, asleep, awake, outOfBed } = rows[index];

    // check before to bed - set as whatever state was before
    if (isBefore(currentDateTime, toBed)) {
      sleepRows.push({
        date: currentDateTime,
        state,
      });
      currentDateTime = add(currentDateTime, { minutes: 15 });
    } else if (asleep && isBefore(currentDateTime, asleep)) {
      state = SleepState.InBed;
      sleepRows.push({
        date: currentDateTime,
        state,
      });
      currentDateTime = add(currentDateTime, { minutes: 15 });
    } else if (isBefore(currentDateTime, awake)) {
      // If we didn't fall asleep, don't set state to asleep
      state = asleep ? SleepState.Asleep : SleepState.InBed;
      sleepRows.push({
        date: currentDateTime,
        state,
      });
      currentDateTime = add(currentDateTime, { minutes: 15 });
    } else if (isBefore(currentDateTime, outOfBed)) {
      state = SleepState.InBed;
      sleepRows.push({
        date: currentDateTime,
        state,
      });
      currentDateTime = add(currentDateTime, { minutes: 15 });
    } else {
      // We've reached the end of this row, increment index
      state = SleepState.Awake;
      index += 1;
    }
  }

  return sleepRows;
};

export const buildScatterplotData = (input: SleepRow[]): ScatterplotRow[] => {
  let currentState = SleepState.Unknown;
  const output: ScatterplotRow[] = [];
  input.forEach((row) => {
    const { date, state } = row;
    if (state === SleepState.Asleep && state !== currentState) {
      output.push({
        date,
        x: format(date, 'cccc') as Day,
        y: parseInt(format(date, 'H'), 10),
      });
    }
    currentState = state;
  });
  return output;
};

const parseDataRow = (row: string): RowData => {
  const [date, toBedString, asleepString, awakeString, outOfBedString] = row.split(',');

  const start = parseDateTime(date, '00:00');
  // To bed will always have the same date as start
  const toBed = parseDateTime(date, toBedString);

  let asleep: Date | null = null;
  // We need to check if asleepString is less than
  if (asleepString) {
    asleep = parseDateTime(date, asleepString);
    if (toBedString > asleepString) {
      // Add a day
      asleep = add(asleep, { days: 1 });
    }
  }

  let awake: Date | null;
  if (awakeString) {
    awake = parseDateTime(date, awakeString);
    if (toBedString > awakeString) {
      awake = add(awake, { days: 1 });
    }
  }

  let outOfBed: Date;
  if (!outOfBedString || outOfBedString === '?') {
    outOfBed = awake;
  } else {
    outOfBed = parseDateTime(date, outOfBedString);
    if (toBedString > outOfBedString) {
      outOfBed = add(outOfBed, { days: 1 });
    }
  }

  return {
    start,
    toBed,
    asleep,
    awake,
    outOfBed,
  };
};

const parseDateTime = (date: string, time: string): Date =>
  parse(`${date}${time}`, 'yyyy-MM-ddHH:mm', new Date());
