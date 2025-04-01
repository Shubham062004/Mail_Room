
import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, TruckIcon, Users, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/DataContext";

const Dashboard = () => {
  const { vendors, inboundPackages, outboundPackages } = useData();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Vendors",
      value: vendors.length,
      icon: Users,
      color: "bg-blue-500",
      path: "/vendor-management",
    },
    {
      title: "Inbound Packages",
      value: inboundPackages.length,
      icon: Package,
      color: "bg-green-500",
      path: "/inbound",
    },
    {
      title: "Outbound Packages",
      value: outboundPackages.length,
      icon: TruckIcon,
      color: "bg-purple-500",
      path: "/outbound",
    },
    {
      title: "Total Packages",
      value: inboundPackages.length + outboundPackages.length,
      icon: ShoppingBag,
      color: "bg-orange-500",
      path: "/",
    },
  ];

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(stat.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.color} p-2 rounded-full`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendors.slice(0, 5).map((vendor) => (
                <div key={vendor.id} className="flex items-center p-3 border rounded-lg">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{vendor.name}</h3>
                    <p className="text-sm text-gray-500">{vendor.email}</p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">ID: {vendor.id}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {outboundPackages.slice(0, 5).map((pkg) => (
                <div key={pkg.id} className="flex items-center p-3 border rounded-lg">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">To: {pkg.recipientName}</h3>
                    <p className="text-sm text-gray-500">{pkg.packageType} - {pkg.entity}</p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">{pkg.sendingDate}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
