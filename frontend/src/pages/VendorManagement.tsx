
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import TabNavigation from "@/components/TabNavigation";
import { useData } from "@/context/DataContext";
import { Input } from "@/components/ui/input";

const VendorManagement = () => {
  const { vendors } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: "ID", accessor: "id", width: "8%" },
    { header: "NAME", accessor: "name", width: "15%" },
    { header: "WEBSITE URL", accessor: "websiteUrl", width: "15%" },
    { header: "EMAIL", accessor: "email", width: "15%" },
    { header: "PHONE", accessor: "phone", width: "10%" },
    { header: "SPOC PERSON", accessor: "spocPerson", width: "12%" },
    { header: "AGREEMENT START DATE", accessor: "agreementStartDate", width: "12%" },
    { header: "AGREEMENT END DATE", accessor: "agreementEndDate", width: "12%" },
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
          placeholder="Search by Vendor name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button
          onClick={() => navigate("/add-vendor")}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Vendor
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredVendors}
          actionColumn={true}
          onEdit={(id) => console.log("Edit", id)}
        />
      </div>
    </div>
  );
};

export default VendorManagement;
