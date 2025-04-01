
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "@/components/DatePicker";
import { useToast } from "@/hooks/use-toast";

const AddOutbound = () => {
  const { vendors, addOutboundPackage } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [vendorId, setVendorId] = useState<string>("");
  const [sendingDate, setSendingDate] = useState<Date | undefined>(undefined);
  
  const [formData, setFormData] = useState({
    senderId: "",
    recipientName: "",
    recipientEmail: "",
    entity: "",
    unit: "",
    mobile: "",
    awbNumber: "",
    company: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    packageType: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format date to string if it exists
    const formattedDate = sendingDate ? new Date(sendingDate).toISOString().split('T')[0] : undefined;
    
    addOutboundPackage({
      recipientName: formData.recipientName,
      unit: formData.unit,
      entity: formData.entity,
      vendorId: vendorId ? parseInt(vendorId) : undefined,
      awbNumber: formData.awbNumber,
      packageType: formData.packageType,
      sendingDate: formattedDate,
    });
    
    toast({
      title: "Outbound Package Created",
      description: "The package has been added successfully."
    });
    
    navigate("/outbound");
  };
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-black text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold text-center">Create New Outbound Package</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-b-lg shadow-md">
        <div className="flex justify-between items-center p-6 border-b mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Select Vendor:</label>
            <Select value={vendorId} onValueChange={setVendorId}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select Vendor" />
              </SelectTrigger>
              <SelectContent>
                {vendors.map(vendor => (
                  <SelectItem key={vendor.id} value={vendor.id.toString()}>
                    {vendor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Sending Date:</label>
            <DatePicker 
              value={sendingDate} 
              onChange={setSendingDate} 
              placeholder="dd-mm-yyyy"
            />
          </div>
        </div>
        
        <h2 className="text-lg font-medium mb-4 text-center">Package Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sender Id:</label>
              <Input 
                name="senderId" 
                value={formData.senderId} 
                onChange={handleChange} 
                placeholder="Enter Sender Id"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Recipient Name:</label>
              <Input 
                name="recipientName" 
                value={formData.recipientName} 
                onChange={handleChange} 
                required
                placeholder="Enter Recipient Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Recipient Email:</label>
              <Input 
                type="email"
                name="recipientEmail" 
                value={formData.recipientEmail} 
                onChange={handleChange} 
                placeholder="Enter Recipient Email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Entity:</label>
              <Input 
                name="entity" 
                value={formData.entity} 
                onChange={handleChange} 
                placeholder="Enter Entity"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Unit:</label>
              <Input 
                name="unit" 
                value={formData.unit} 
                onChange={handleChange} 
                placeholder="Enter Unit"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Mobile:</label>
              <Input 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleChange} 
                placeholder="Enter Mobile Number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">AWB Number:</label>
              <Input 
                name="awbNumber" 
                value={formData.awbNumber} 
                onChange={handleChange} 
                placeholder="Enter AWB Number"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company:</label>
              <Input 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                placeholder="Enter Company"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Address Line 1:</label>
              <Input 
                name="addressLine1" 
                value={formData.addressLine1} 
                onChange={handleChange} 
                placeholder="Enter Address Line 1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Address Line 2:</label>
              <Input 
                name="addressLine2" 
                value={formData.addressLine2} 
                onChange={handleChange} 
                placeholder="Enter Address Line 2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">State:</label>
              <Select 
                value={formData.state} 
                onValueChange={(value) => handleSelectChange("state", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">City:</label>
              <Select 
                value={formData.city} 
                onValueChange={(value) => handleSelectChange("city", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Package Type:</label>
              <Input 
                name="packageType" 
                value={formData.packageType} 
                onChange={handleChange} 
                placeholder="Enter Package Type"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/outbound")}
          >
            Go Back
          </Button>
          <Button type="submit" className="bg-black hover:bg-gray-800">
            Create Package
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddOutbound;
