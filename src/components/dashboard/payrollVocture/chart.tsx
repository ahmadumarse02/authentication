// components/PayrollChart.tsx
"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = [
    { name: "Jan", netSalary: 420, tax: 120, loan: 60 },
    { name: "Feb", netSalary: 380, tax: 110, loan: 55 },
    { name: "Mar", netSalary: 450, tax: 130, loan: 65 },
    { name: "Apr", netSalary: 410, tax: 115, loan: 58 },
    { name: "May", netSalary: 390, tax: 105, loan: 52 },
    { name: "Jun", netSalary: 440, tax: 125, loan: 62 },
    { name: "Jul", netSalary: 430, tax: 120, loan: 60 },
    { name: "Aug", netSalary: 460, tax: 135, loan: 68 },
    { name: "Sep", netSalary: 470, tax: 140, loan: 70 },
    { name: "Oct", netSalary: 480, tax: 145, loan: 72 },
    { name: "Nov", netSalary: 490, tax: 150, loan: 75 },
    { name: "Dec", netSalary: 500, tax: 155, loan: 78 },
];

export function PayrollChart() {
    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>Annual Payroll Summary</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                            tickFormatter={(value) => `${value}k`}
                            domain={[0, 600]}
                        />
                        <Tooltip
                            formatter={(value) => [`${value}k`, ""]}
                            labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="netSalary" fill="#8884d8" name="Net salary" stackId="a" />
                        <Bar dataKey="tax" fill="#82ca9d" name="Tax" stackId="a" />
                        <Bar dataKey="loan" fill="#ffc658" name="Loan" stackId="a" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}