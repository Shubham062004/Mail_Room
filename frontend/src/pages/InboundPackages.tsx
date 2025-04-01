
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import TabNavigation from "@/components/TabNavigation";
import { useData } from "@/context/DataContext";
import { Input } from "@/components/ui/input";

const InboundPackages = () => {
  const { inboundPackages, vendors } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Get vendor names for display
  const getVendorName = (vendorId: number) => {
    const vendor = vendors.find(v => v.id === vendorId);
    return vendor?.name || "Unknown";
  };

  const displayData = inboundPackages.map(pkg => ({
    ...pkg,
    vendorName: getVendorName(pkg.vendorId)
  }));

  const filteredPackages = displayData.filter(pkg => 
    pkg.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: "ID", accessor: "id", width: "5%" },
    { header: "VENDOR ID", accessor: "vendorId", width: "10%" },
    { header: "RECIPIENT", accessor: "recipient", width: "15%" },
    { header: "PHONE NO", accessor: "phoneNo", width: "10%" },
    { header: "PACKAGE TYPE", accessor: "packageType", width: "15%" },
    { header: "UNIT", accessor: "unit", width: "10%" },
    { header: "DEPARTMENT", accessor: "department", width: "10%" },
    { header: "ENTITY", accessor: "entity", width: "10%" },
    { header: "SENDER", accessor: "sender", width: "15%" },
  ];

  const tabs = [
    { label: "Delivery Vendor", value: "delivery-vendor", path: "/vendor-management" },
    { label: "Inbound", value: "inbound", path: "/inbound" },
    { label: "Outbound", value: "outbound", path: "/outbound" },
  ];

  return (
    <div className="flex-1 p-6">
      <TabNavigation tabs={tabs} />
      
      <div className="flex items-center justify-between mb-6">
        <Input
          type="text"
          placeholder="Search By Vendor name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button
          onClick={() => navigate("/add-inbound")}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Record
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredPackages}
          viewColumn={true}
          onView={(id) => console.log("View", id)}
        />
      </div>
    </div>
  );
};

export default InboundPackages;
