import { Button } from "@repo/ui/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui/components/ui/tabs";
import { Download } from "lucide-react";
import LeadsTable from "./leadsTable";
import { Status } from "@repo/db";
import { getAllLeads } from "../actions/get-leads";

// Sample data
// const leads: Customer[] = [
//   {
//     id: BigInt(1),
//     requestDate: new Date("2023-05-01"),
//     name: "John Doe",
//     email: "dummy@test.com",
//     insuranceSum: 100000,
//     trafficLightColor: "green",
//     status: "accepted",
//     duration: 1,
//     premium: 1000,
//   },
//   {
//     id: BigInt(2),
//     requestDate: new Date("2023-05-02"),
//     name: "Jane Smith",
//     insuranceSum: 200000,
//     email: "dummy@test.com",
//     status: "rejected",
//     trafficLightColor: "red",
//     decisiveFactor: "healthCheck",
//     duration: 2,
//     premium: 1800,
//   },
//   {
//     id: BigInt(3),
//     requestDate: new Date("2023-05-03"),
//     name: "Bob Johnson",
//     insuranceSum: 150000,
//     email: "dummy@test.com",
//     status: "accepted_with_conditions",
//     trafficLightColor: "orange",
//     decisiveFactor: "score",
//     duration: 1,
//     premium: 1200,
//   },
//   {
//     id: BigInt(4),
//     requestDate: new Date("2023-05-04"),
//     name: "Alice Brown",
//     email: "dummy@test.com",
//     insuranceSum: 300000,
//     status: "requesting_documents",
//     trafficLightColor: "orange",
//     decisiveFactor: "healthCheck",
//     duration: 3,
//     premium: 2500,
//   },
//   {
//     id: BigInt(99),
//     requestDate: new Date("2023-05-04"),
//     name: "Alice Brown",
//     email: "dummy@test.com",
//     insuranceSum: 300000,
//     status: "draft",
//     duration: 3,
//     premium: 2500,
//   },
//   {
//     id: BigInt(5),
//     requestDate: new Date("2023-05-05"),
//     name: "Charlie Wilson",
//     email: "dummy@test.com",
//     status: "waiting_for_approval",
//     insuranceSum: 250000,
//     trafficLightColor: "orange",
//     decisiveFactor: "score",
//     duration: 2,
//     premium: 2000,
//   },
// ];

const archivedLeadStatuses: Status[] = [
  "accepted",
  "rejected",
  "accepted_with_conditions",
] as const;

const activeLeadStatuses: Status[] = [
  "waiting_for_approval",
  "requesting_documents",
] as const;

export default async function LeadsPage() {
  const leads = await getAllLeads();

  if (!leads || leads.data === null || leads.data === undefined) {
    throw new Error("No leads found");
  }

  const activeLeads = leads.data.filter((lead) =>
    activeLeadStatuses.includes(lead.status as Status),
  );
  const archivedLeads = leads.data.filter((lead) =>
    archivedLeadStatuses.includes(lead.status as Status),
  );
  const draftLeads = leads.data.filter((lead) => lead.status === "draft");

  return (
    <div className="w-full">
      <div className="flex justify-between items-center bg-background mb-8">
        <h1 className="text-3xl">Leads</h1>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-4" />
          Export
        </Button>
      </div>
      <Tabs defaultValue="active" className="">
        <TabsList className="justify-start">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <LeadsTable leads={activeLeads} />
        </TabsContent>
        <TabsContent value="archived" className="mt-4">
          <LeadsTable leads={archivedLeads} />
        </TabsContent>
        <TabsContent value="draft" className="mt-4">
          <LeadsTable leads={draftLeads} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
