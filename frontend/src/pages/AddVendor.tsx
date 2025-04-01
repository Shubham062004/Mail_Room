
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from "@/components/DatePicker";
import { useToast } from "@/hooks/use-toast";

const AddVendor = () => {
  const { addVendor } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    websiteUrl: "",
    email: "",
    phone: "",
    spocPerson: "",
    status: "Active",
  });
  
  const [agreementStartDate, setAgreementStartDate] = useState<Date | undefined>(undefined);
  const [agreementEndDate, setAgreementEndDate] = useState<Date | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format dates to strings if they exist
    const startDate = agreementStartDate ? new Date(agreementStartDate).toISOString().split('T')[0] : undefined;
    const endDate = agreementEndDate ? new Date(agreementEndDate).toISOString().split('T')[0] : undefined;
    
    addVendor({
      ...formData,
      agreementStartDate: startDate,
      agreementEndDate: endDate,
    });
    
    toast({
      title: "Vendor Created",
      description: `${formData.name} has been added successfully.`
    });
    
    navigate("/vendor-management");
  };
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-black text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold text-center">Create New Vendor</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-b-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name:</label>
              <Input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Enter Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Website URL:</label>
              <Input 
                name="websiteUrl" 
                value={formData.websiteUrl} 
                onChange={handleChange} 
                placeholder="Enter Website URL"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <Input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter Email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone:</label>
              <Input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Enter Phone Number"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">SPOC Person:</label>
              <Input 
                name="spocPerson" 
                value={formData.spocPerson} 
                onChange={handleChange} 
                placeholder="Enter SPOC Person"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Agreement Start Date:</label>
              <DatePicker 
                value={agreementStartDate} 
                onChange={setAgreementStartDate} 
                placeholder="dd-mm-yyyy"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Agreement End Date:</label>
              <DatePicker 
                value={agreementEndDate} 
                onChange={setAgreementEndDate} 
                placeholder="dd-mm-yyyy"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Agreement Attachment:</label>
              <Input 
                type="file" 
                onChange={handleFileChange} 
                className="cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status:</label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/vendor-management")}
          >
            Go Back
          </Button>
          <Button type="submit" className="bg-black hover:bg-gray-800">
            Create Vendor
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddVendor;
