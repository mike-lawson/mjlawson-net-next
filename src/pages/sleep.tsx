import { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import * as d3 from 'd3';
import * as d3Legend from 'd3-svg-legend';
import { fetchSleepData, parseSleepData, SleepRow, SleepState } from '@/helpers/sleepFns';

export default function SleepPage() {
  const d3Container = useRef(null);
  const d3LegendContainer = useRef(null);
  const [data, setData] = useState<SleepRow[]>([]);
  const [svgHeight, setSvgHeight] = useState(300);
  const width = 954;

  const formatDay = (d: Date) => {
    if (d.getDate() === 1) {
      return d3.timeFormat('%b %-d')(d);
    }
    return d3.timeFormat('%-d')(d);
  };

  const formatTick = (d: number): string => {
    if (d % 4 !== 0) {
      return '';
    }
    let hour = Math.floor(d / 4);
    if (hour === 0) {
      return '12 AM';
    }
    if (hour === 12) {
      return '12 PM';
    }
    if (hour > 12) {
      hour -= 12;
    }
    return hour.toString();
  };

  useEffect(() => {
    const inner = async () => {
      const raw = await fetchSleepData();
      const parsedData = await parseSleepData(raw);
      setData(parsedData);
    };

    inner();
  }, []);

  useEffect(() => {
    if (!d3Container.current || !d3LegendContainer.current || data.length === 0) {
      return;
    }

    const margin = {
      top: 20,
      right: 0,
      bottom: 0,
      left: 70,
    };
    const legendValues = ['Awake', 'In Bed', 'Asleep', 'Unknown'];
    const values = [SleepState.Awake, SleepState.InBed, SleepState.Asleep, SleepState.Unknown];
    const colors = ['#f7efee', '#f1918d', '#d6003d', '#9bbc8b'];

    const dateExtent = d3.extent(data, (d) => d.date) as [Date, Date];
    if (!dateExtent[0] || !dateExtent[1]) {
      throw new Error('Whoops');
    }
    const height = margin.top + margin.bottom + (d3.timeDay.count(...dateExtent) + 1) * 25;
    setSvgHeight(height);

    const y = d3
      .scaleBand(d3.timeDays(...dateExtent), [margin.top, height - margin.bottom])
      .round(false);

    const x = d3.scaleBand(d3.range(96), [margin.left, width - margin.right]).round(true);

    const legendColorScale = d3.scaleOrdinal().domain(legendValues).range(colors);
    const colorScale = d3
      .scaleOrdinal()
      .domain(values.map((v) => v.toString()))
      .range(colors);

    const xAxis = (g) =>
      g
        .attr('transform', `translate(0, ${margin.top})`)
        // @ts-ignore
        .call(d3.axisTop(x).tickFormat(formatTick))
        .call((g_) => g_.select('.domain').remove());

    const yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left}, 0)`)
        // @ts-ignore
        .call(d3.axisLeft(y).tickFormat(formatDay))
        .call((g_) => g_.select('.domain').remove());

    const svg = d3.select(d3Container.current);

    // Remove current
    svg.selectAll('*').remove();

    svg.append('g').call(xAxis);

    svg.append('g').call(yAxis);

    // @ts-ignore
    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('data-date', (d) => d.date.toString())
      .attr('x', (d) => x(d.date.getHours() * 4 + d.date.getMinutes() / 15))
      .attr('y', (d) => y(d3.timeDay(d.date)))
      .attr('width', width / 96)
      .attr('height', 20)
      .attr('fill', (d) => colorScale(d.state.toString()));

    const legendSvg = d3.select(d3LegendContainer.current);
    legendSvg.selectAll('*').remove();

    legendSvg.append('g').attr('class', 'legendLinear').attr('transform', 'translate(20, 20');

    const legendLinear = d3Legend
      .legendColor()
      .shapeWidth(100)
      .orient('horizontal')
      .scale(legendColorScale);

    // @ts-ignore
    legendSvg.select('.legendLinear').call(legendLinear);
  }, [data]);

  return (
    <>
      <Head>
        <title>Mike Lawson - Swinging the abstraction hammer since 2013</title>
        <meta name="description" content="Sleep is hard." />
      </Head>
      <div>
        <h1 className="text-2xl md:text-3xl mb-2 font-bold text-red-700">Sleep is hard.</h1>
        <h2 className="mb-8">But tracking it doesn&apos;t have to be</h2>
        <div className="flex w-full">
          <div className="w-full prose sm:prose-lg">
            <svg className="legend-svg" viewBox={`0 0 ${width} 50`} ref={d3LegendContainer} />
            <svg viewBox={`0 0 ${width} ${svgHeight}`} ref={d3Container} />
          </div>
        </div>
      </div>
    </>
  );
}
