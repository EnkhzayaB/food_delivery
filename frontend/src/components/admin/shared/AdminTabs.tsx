"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Package, LogOut, ChefHat } from "lucide-react";
import { OrderDashboard } from "../order";
import { DishesManager } from "../dishes";
import { Button } from "@/components/ui/button";
interface AdminTabsProps {
  initialOrders?: any[];
}

export function AdminTabs({ initialOrders = [] }: AdminTabsProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Set initial tab based on current route
  useEffect(() => {
    if (pathname.includes("/orders")) {
      setActiveTab("orders");
    } else if (pathname.includes("/dishes")) {
      setActiveTab("dishes");
    } else {
      setActiveTab("dashboard");
    }
  }, [pathname]);

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="logo" className="w-9 h-9" />
              <div>
                <h1 className="font-bold text-xl text-gray-900">
                  Nom<span className="text-red-500">Nom</span>
                </h1>
                <p className="text-sm text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 font-medium">Admin User</div>
            <Button
              onClick={handleBack}
              variant="outline"
              size="sm"
              className="text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="inline-flex h-16 items-center justify-center rounded-xl bg-gray-100 p-2 text-muted-foreground mb-8 shadow-sm">
            <TabsTrigger
              value="dashboard"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-8 py-3 text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-md gap-3 min-w-[140px]"
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-8 py-3 text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-md gap-3 min-w-[140px]"
            >
              <Package className="h-5 w-5" />
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="dishes"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-8 py-3 text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-md gap-3 min-w-[140px]"
            >
              <ChefHat className="h-5 w-5" />
              Food menu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="m-0">
            <div className="grid gap-6">
              {/* Welcome Card */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Welcome to NomNom Admin
                    </h2>
                    <p className="text-red-100">
                      Manage your food delivery business efficiently
                    </p>
                  </div>
                  <BarChart3 className="h-16 w-16 text-red-200" />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Quick Actions</p>
                      <p className="text-lg font-semibold">Manage Orders</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Analytics</p>
                      <p className="text-lg font-semibold">Coming Soon</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Package className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Menu</p>
                      <p className="text-lg font-semibold">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="m-0">
            <OrderDashboard initialOrders={initialOrders} />
          </TabsContent>

          <TabsContent value="dishes" className="m-0">
            <DishesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
