import {useMemo} from "react";
import {Label, Pie, PieChart} from "recharts";

import {Badge} from "@/components/ui/badge";
import {
  Card, CardContent, CardDescription, CardFooter,CardHeader, CardTitle
} from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";

const chartConfig = [
  {
    wins: {label: "Victorias", color: "hsl(var(--ruby-chart-1))"},
    loses: {label: "Derrotas", color: "hsl(var(--ruby-chart-2))"}
  },
  {
    wins: {label: "Victorias", color: "hsl(var(--emerald-chart-1))"},
    loses: {label: "Derrotas", color: "hsl(var(--emerald-chart-2))"}
  },
  {
    wins: {label: "Victorias", color: "hsl(var(--sapphire-chart-1))"},
    loses: {label: "Derrotas", color: "hsl(var(--sapphire-chart-2))"}
  }
];

const SuccessChart = ({chartConfig, chartData, wins}) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[250px] aspect-square mx-auto"
    >
      <PieChart>
        <ChartTooltip 
          cursor={false}
          content={<ChartTooltipContent hideLabel/>}
        />

        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="status"
          innerRadius={57}
          strokeWidth={5}
        >
          <Label 
            content={({viewBox}) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text 
                    x={viewBox.cx} 
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan 
                      x={viewBox.cx} 
                      y={viewBox.cy}
                      className="text-3xl font-bold fill-foreground"
                    >
                      {wins}%
                    </tspan>

                    <tspan 
                      x={viewBox.cx} 
                      y={(viewBox.cy || 0) + 24}
                      className="text-md fill-muted-foreground"
                    >
                      Victorias
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default function LevelStats({levels}) {

  const w_percentages = useMemo(() => {
    const p_array = levels.map(chart => {
      const allMatches = chart.reduce((acc, stat) => acc + stat.amount, 0);
      const winsStat = chart.find(stat => stat.status === "wins").amount;
      const l_percentage = winsStat / allMatches * 100;
      return l_percentage.toFixed(1);
    });    
    return p_array;
  }, [levels]);

  const charts = [];
  for (let i = 0; i < 3; ++i) {
    charts.push(
      <div className="w-70 aspect-square">
        <SuccessChart 
          chartConfig={chartConfig[i]} 
          chartData={levels[i]} 
          wins={w_percentages[i]}
        />
        <Badge>Nivel {i+1}</Badge> 
      </div>
    );
  }

  return (
    <Card className="h-[98%] mt-2 flex-col">
      <CardHeader className="items-center">
        <CardTitle className="text-lg mx-auto">
          Gráficas de Pastel del Grupo
        </CardTitle>
        <CardDescription className="mx-auto">
          Enero - Marzo 2025
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[95%] lg:mx-auto flex flex-col items-center 
      lg:flex-row">{charts}</CardContent>

      <CardFooter className="text-sm flex-col gap-2">
        <div className="leading-none text-muted-foreground">
          Mostrando los porcentajes de victoria por cada nivel en los últimos 
          3 meses
        </div>
      </CardFooter>
    </Card>
  );
}