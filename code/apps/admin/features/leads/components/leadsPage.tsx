import { Status } from "@repo/db";
import { Button } from "@repo/ui/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { Download } from "lucide-react";
import { getMyLeads } from "../actions/get-leads";
import LeadsTable from "./leadsTable";

const archivedLeadStatuses: Status[] = [
  "accepted",
  "rejected",
  "waiting_for_documents",
  "accepted_with_conditions",
] as const;

const activeLeadStatuses: Status[] = [
  "requesting_documents",
  "waiting_for_counter_offer",
  "review_documents",
] as const;

export default async function LeadsPage() {
  const leads = await getMyLeads();

  if (!leads || !leads.data || leads.data.length === 0) {
    return <div>No leads found</div>;
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
          <Download className="h-4 w-4 mr-4 " />
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
