import { Button } from "@repo/ui/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui/components/ui/tabs";
import { Download } from "lucide-react";

export default async function LeadsPage() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center bg-background mb-10">
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
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="p-4 rounded-lg bg-card text-card-foreground">
            <h2 className="text-lg font-semibold mb-2">Active Content</h2>
            <p>Your active content goes here.</p>
          </div>
        </TabsContent>
        <TabsContent value="archived" className="mt-4">
          <div className="p-4 rounded-lg bg-card text-card-foreground">
            <h2 className="text-lg font-semibold mb-2">Archived Content</h2>
            <p>Your archived content goes here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
