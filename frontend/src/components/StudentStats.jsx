import {useState} from "react";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Select, SelectContent, SelectItem, SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const chartConfig = {
  score: {label: "Puntaje", color: "hsl(var(--sapphire-chart-1))"}
};

const SelectLevel = ({level, setLevel}) => {
  return (
    <Select value={level} onValueChange={setLevel}>
      <SelectTrigger
        aria-label="Select a value"
        className="x-[160px] sm:ml-auto rounded-lg"
      >
        <SelectValue placeholder="Nivel 1"></SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={1} className="rounded-xl">
          Nivel 1
          </SelectItem>
        <SelectItem value={2} className="rounded-xl">
          Nivel 2
        </SelectItem>
        <SelectItem value={3} className="rounded-xl">
          Nivel 3
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

const SelectTimeRange = ({timeRange, setTimeRange}) => {
  return (
    <Select value={timeRange} onValueChange={setTimeRange}>
      <SelectTrigger
        aria-label="Select a value"
        className="x-[160px] sm:ml-auto rounded-lg "
      >
        <SelectValue placeholder="Ultimos 3 meses" />
      </SelectTrigger>

      <SelectContent className="rounded-xl">
        <SelectItem value="90d" className="rounded-lg">
          Ultimos 3 meses
        </SelectItem>
        <SelectItem value="30d" className="rounded-lg">
          Ultimos 30 días
        </SelectItem>
        <SelectItem value="7d" className="rounded-lg">
          Ultimos 7 días
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

const ScoreChart = ({chartData}) => {
  const formatter = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sp-MX", { 
      month: "short", day: "numeric" 
    });
  };

  return (
    <ChartContainer 
      config={chartConfig}
      className="w-full h-[250px] aspect-auto"
    >
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
            <stop 
              offset="5%" 
              stopColor="var(--color-score)" 
              stopOpacity={0.8}
            />
            <stop 
              offset="95%" 
              stopColor="var(--color-score)" 
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="playedAt"
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => formatter(value)}
        />

        <ChartTooltip 
          cursor={false} 
          content={
            <ChartTooltipContent 
              labelFormatter={(value) => formatter(value)} 
              indicator="dot" 
            />} 
        />

        <Area
          dataKey="score"
          type="natural"
          fill="url(#fillScore)"
          stroke="var(--color-score)"
          stackId="a"
        />

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default function StudentStats({matches}) {
  const [timeRange, setTimeRange] = useState("90d");
  const [level, setLevel] = useState(1);

  const filteredMatches = matches.filter(item => {
    const date = new Date(item.playedAt);
    const referenceDate = new Date("2024-06-30");
    let daysToSubstract = 90;
    if (timeRange === "30d") {
      daysToSubstract = 30;
    } else if (timeRange === "7d") {
      daysToSubstract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubstract);
    return date >= startDate && item.level === level;
  });

  return (
    <Card>
      <CardHeader className="py-5 border-b flex items-center sm:flex-row">
        <div className="text-center sm:text-left grid flex-1 gap-1">
          <CardTitle> Desempeño en el nivel {level} </CardTitle>
          <CardDescription>
            Mostrando los puntajes en un rango de tiempo
          </CardDescription>
        </div>
        <SelectLevel level={level} setLevel={setLevel} />
        <SelectTimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ScoreChart chartData={filteredMatches} />
      </CardContent>
    </Card>
  );
};