import React, { useMemo, useState, useCallback } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { sampleDataForCharts } from '../../utils/pagination';

interface OptimizedChartProps {
    data: any[];
    type: 'line' | 'bar' | 'pie';
    maxDataPoints?: number;
    height?: number;
    className?: string;
    config?: {
        xKey?: string;
        yKey?: string;
        nameKey?: string;
        valueKey?: string;
        colors?: string[];
        showGrid?: boolean;
        showTooltip?: boolean;
        showLegend?: boolean;
    };
}

const DEFAULT_COLORS = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
];

export function OptimizedChart({
    data,
    type,
    maxDataPoints = 100,
    height = 300,
    className = '',
    config = {}
}: OptimizedChartProps) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        xKey = 'x',
        yKey = 'y',
        nameKey = 'name',
        valueKey = 'value',
        colors = DEFAULT_COLORS,
        showGrid = true,
        showTooltip = true,
        showLegend = false
    } = config;

    // Optimize data for rendering
    const optimizedData = useMemo(() => {
        if (!data || data.length === 0) return [];

        // Sample data if it's too large
        if (data.length > maxDataPoints) {
            return sampleDataForCharts(data, maxDataPoints);
        }

        return data;
    }, [data, maxDataPoints]);

    const handleDataProcessing = useCallback(async () => {
        if (data.length > 1000) {
            setIsLoading(true);
            // Simulate async processing for very large datasets
            await new Promise(resolve => setTimeout(resolve, 100));
            setIsLoading(false);
        }
    }, [data.length]);

    React.useEffect(() => {
        handleDataProcessing();
    }, [handleDataProcessing]);

    if (isLoading) {
        return (
            <div
                className={`flex items-center justify-center ${className}`}
                style={{ height }}
            >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!optimizedData || optimizedData.length === 0) {
        return (
            <div
                className={`flex items-center justify-center text-muted-foreground ${className}`}
                style={{ height }}
            >
                No data available
            </div>
        );
    }

    const commonProps = {
        data: optimizedData,
        margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    const renderChart = () => {
        switch (type) {
            case 'line':
                return (
                    <LineChart {...commonProps}>
                        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                        <XAxis
                            dataKey={xKey}
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        {showTooltip && <Tooltip />}
                        {showLegend && <Legend />}
                        <Line
                            type="monotone"
                            dataKey={yKey}
                            stroke={colors[0]}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                    </LineChart>
                );

            case 'bar':
                return (
                    <BarChart {...commonProps}>
                        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                        <XAxis
                            dataKey={xKey}
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        {showTooltip && <Tooltip />}
                        {showLegend && <Legend />}
                        <Bar
                            dataKey={yKey}
                            fill={colors[0]}
                            radius={[2, 2, 0, 0]}
                        />
                    </BarChart>
                );

            case 'pie':
                return (
                    <PieChart {...commonProps}>
                        <Pie
                            data={optimizedData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey={valueKey}
                            nameKey={nameKey}
                        >
                            {optimizedData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>
                        {showTooltip && <Tooltip />}
                        {showLegend && <Legend />}
                    </PieChart>
                );

            default:
                return null;
        }
    };

    const chartElement = renderChart();
    
    if (!chartElement) {
        return (
            <div
                className={`flex items-center justify-center text-muted-foreground ${className}`}
                style={{ height }}
            >
                Unsupported chart type
            </div>
        );
    }

    return (
        <div className={className} style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                {chartElement}
            </ResponsiveContainer>
            {data.length > maxDataPoints && (
                <div className="text-xs text-muted-foreground mt-1 text-center">
                    Showing {optimizedData.length} of {data.length} data points
                </div>
            )}
        </div>
    );
}

export default OptimizedChart;