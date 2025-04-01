
import React, { createContext, useContext, useState } from "react";

// Define types for our data
interface Vendor {
  id: number;
  name: string;
  websiteUrl?: string;
  email?: string;
  phone?: string;
  spocPerson?: string;
  agreementStartDate?: string;
  agreementEndDate?: string;
}

interface InboundPackage {
  id: number;
  vendorId: number;
  recipient: string;
  phoneNo?: string;
  packageType?: string;
  unit?: string | number;
  department?: string | number;
  entity?: string;
  sender?: string;
}

interface OutboundPackage {
  id: number;
  recipientName: string;
  unit?: string | number;
  entity?: string;
  vendorId?: number;
  awbNumber?: string;
  packageType?: string;
  sendingDate?: string;
}

interface DataContextType {
  vendors: Vendor[];
  inboundPackages: InboundPackage[];
  outboundPackages: OutboundPackage[];
  addVendor: (vendor: Omit<Vendor, "id">) => void;
  addInboundPackage: (pkg: Omit<InboundPackage, "id">) => void;
  addOutboundPackage: (pkg: Omit<OutboundPackage, "id">) => void;
}

// Sample data
const initialVendors: Vendor[] = [
  { id: 109, name: "Laxmi Narayan", websiteUrl: "https://meet.google.com", email: "raturianikeat@gmail.com", phone: "9315485935", spocPerson: "Mukul", agreementStartDate: "2025-01-17", agreementEndDate: "2025-01-17" },
  { id: 110, name: "Himesh", websiteUrl: "http://meet.google.com", email: "malad@gmail.com", phone: "9315485678", spocPerson: "Ramesh", agreementStartDate: "2025-01-24", agreementEndDate: "2025-01-24" },
  { id: 111, name: "Laxmi Narayan", websiteUrl: "https://www.youtube.com", email: "mumbai@gmail.com", phone: "9315485955", spocPerson: "Sunya", agreementStartDate: "2025-05-16", agreementEndDate: "2025-01-16" },
  { id: 117, name: "Silverline Electric", email: "email@gmail.com", phone: "9696969696" },
  { id: 118, name: "Silverline Electric", email: "email@gmail.com", phone: "9696969696" },
  { id: 119, name: "Silverline Electric", email: "email@gmail.com", phone: "9696969696" },
  { id: 120, name: "Silverline Electric", email: "email@gmail.com", phone: "9696969696" },
  { id: 121, name: "Silverline Electric", email: "email@gmail.com", phone: "9696969696" },
  { id: 122, name: "Silverline Electric", email: "email@gmail.com", phone: "9696969696" },
  { id: 123, name: "Silverline Electric", email: "email@gmail.com", phone: "9696969696" },
  { id: 142, name: "Amazon Logistics", email: "amazon@gmail.com", phone: "9876543210" }
];

const initialInboundPackages: InboundPackage[] = [
  { id: 41, vendorId: 142, recipient: "Nirmala", phoneNo: "9874562345", packageType: "Express", unit: 100, department: 1001, entity: "External", sender: "Aman" },
  { id: 42, vendorId: 110, recipient: "Asagar", phoneNo: "9214354657", packageType: "Classified", unit: 100, department: 101, entity: "High", sender: "Aniket" }
];

const initialOutboundPackages: OutboundPackage[] = [
  { id: 9, recipientName: "Rama", unit: 10, entity: "Rise", vendorId: 110, awbNumber: "AW0-90788787", packageType: "Express", sendingDate: "2025-01-24" },
  { id: 10, recipientName: "Aman", unit: 100, entity: "Bhukad", vendorId: 110, awbNumber: "AW9-90909090", packageType: "Express", sendingDate: "2025-01-21" },
  { id: 11, recipientName: "Aman", unit: 100, entity: "Bhukad", vendorId: 110, awbNumber: "AW9-90909090", packageType: "Express", sendingDate: "2025-01-21" },
  { id: 12, recipientName: "Aman", unit: 100, entity: "Bhukad", vendorId: 110, awbNumber: "AW9-90909090", packageType: "Express", sendingDate: "2025-01-21" },
  { id: 13, recipientName: "Aman", unit: 100, entity: "Bhukad", vendorId: 110, awbNumber: "AW9-90909090", packageType: "Express", sendingDate: "2025-01-21" },
  { id: 14, recipientName: "Aman", unit: 100, entity: "Bhukad", vendorId: 110, awbNumber: "AW9-90909090", packageType: "Express", sendingDate: "2025-01-21" },
  { id: 15, recipientName: "Munni", unit: 100, entity: "Nuani", vendorId: 13, awbNumber: "98998998998", packageType: "Express", sendingDate: "2025-01-26" },
  { id: 16, recipientName: "Sagar", unit: 10, entity: "Amazon", vendorId: 142, awbNumber: "12345678909", packageType: "DOC", sendingDate: "2025-02-23" }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [inboundPackages, setInboundPackages] = useState<InboundPackage[]>(initialInboundPackages);
  const [outboundPackages, setOutboundPackages] = useState<OutboundPackage[]>(initialOutboundPackages);

  const addVendor = (vendor: Omit<Vendor, "id">) => {
    const newId = vendors.length ? Math.max(...vendors.map(v => v.id)) + 1 : 1;
    setVendors([...vendors, { id: newId, ...vendor }]);
  };

  const addInboundPackage = (pkg: Omit<InboundPackage, "id">) => {
    const newId = inboundPackages.length ? Math.max(...inboundPackages.map(p => p.id)) + 1 : 1;
    setInboundPackages([...inboundPackages, { id: newId, ...pkg }]);
  };

  const addOutboundPackage = (pkg: Omit<OutboundPackage, "id">) => {
    const newId = outboundPackages.length ? Math.max(...outboundPackages.map(p => p.id)) + 1 : 1;
    setOutboundPackages([...outboundPackages, { id: newId, ...pkg }]);
  };

  return (
    <DataContext.Provider
      value={{
        vendors,
        inboundPackages,
        outboundPackages,
        addVendor,
        addInboundPackage,
        addOutboundPackage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
