
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import TabNavigation from "@/components/TabNavigation";
import { useData } from "@/context/DataContext";
import { Input } from "@/components/ui/input";

const OutboundPackages = () => {
  const { outboundPackages } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPackages = outboundPackages.filter(pkg => 
    pkg.recipientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: "ID", accessor: "id", width: "5%" },
    { header: "RECIPIENT", accessor: "recipientName", width: "12%" },
    { header: "UNIT", accessor: "unit", width: "7%" },
    { header: "ENTITY", accessor: "entity", width: "10%" },
    { header: "VENDOR ID", accessor: "vendorId", width: "8%" },
    { header: "AWB NUMBER", accessor: "awbNumber", width: "15%" },
    { header: "PACKAGE TYPE", accessor: "packageType", width: "13%" },
    { header: "SENDING DATE", accessor: "sendingDate", width: "12%" },
    { header: "REMOVE PACKAGE", accessor: "removePackage", width: "10%" },
  ];

  // Adding a dummy field for the remove package button
  const dataWithRemoveButton = filteredPackages.map(pkg => ({
    ...pkg,
    removePackage: <Trash2 className="h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer" />
  }));

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
          placeholder="Search By Sender name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button
          onClick={() => navigate("/add-outbound")}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={dataWithRemoveButton}
          viewColumn={true}
          onView={(id) => console.log("View", id)}
        />
      </div>
    </div>
  );
};

export default OutboundPackages;
