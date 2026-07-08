"use server";
import { sendRequest } from "@/utils/api";

export async function getDashboardAnalytics(days: number) {
    return sendRequest<any>({
        url: "/analytics/dashboard",
        method: "GET",
        queryParams: { days },
    });
}

export async function getRecentOrdersForDashboard() {
    return sendRequest<any>({
        url: "/order",
        method: "GET",
        queryParams: {
            current: 1,
            pageSize: 5,
        },
    });
}