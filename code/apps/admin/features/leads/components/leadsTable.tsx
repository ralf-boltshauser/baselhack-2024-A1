"use client";

import { useState } from "react";
import { Input } from "@repo/ui/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Badge } from "@repo/ui/components/ui/badge";
import { Search, ChevronUp, ChevronDown, Filter } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { formatCurrency, formatDate, formatYear } from "~/lib/format-helpers";
import { Customer, Status } from "@repo/db";
import { useRouter } from "next/navigation";

const renderStatusBadge = (status: Status) => {
  switch (status) {
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "accepted":
      return <Badge variant="default">Accepted</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    case "accepted_with_conditions":
      return <Badge variant="default">Accepted with conditions</Badge>;
    case "requesting_documents":
      return <Badge variant="warning">Requesting documents</Badge>;
    case "waiting_for_counter_offer":
      return <Badge variant="warning">Waiting for counter offer</Badge>;
    case "review_documents":
      return <Badge variant="warning">Review documents</Badge>;
    default:
      return <Badge variant="default">Unknown</Badge>;
  }
};

export default function LeadsTable({ leads }: { leads: Customer[] }) {
  const router = useRouter();

  // states
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState<Status | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Customer;
    direction: "asc" | "desc";
  } | null>(null);

  // Filter and sort leads
  const filteredLeads = leads
    .filter((lead) => {
      if (!stateFilter) return true;
      return lead.status === stateFilter;
    })
    .filter((lead) =>
      Object.values(lead).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const aValue = a[sortConfig.key] ?? "";
      const bValue = b[sortConfig.key] ?? "";
      if (aValue === bValue) return 0;
      return sortConfig.direction === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
          ? 1
          : -1;
    });

  // Handle sorting
  const handleSort = (key: keyof Customer) => {
    setSortConfig((prevConfig) =>
      prevConfig && prevConfig.key === key
        ? {
            ...prevConfig,
            direction: prevConfig.direction === "asc" ? "desc" : "asc",
          }
        : { key, direction: "asc" },
    );
  };

  // Render sort indicator
  const renderSortIndicator = (key: keyof Customer) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className=" ml-0">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="pl-8 w-[300px]"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("id")}
              className="cursor-pointer"
            >
              ID {renderSortIndicator("id")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("requestDate")}
              className="cursor-pointer"
            >
              Date {renderSortIndicator("requestDate")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              Customer {renderSortIndicator("name")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("email")}
              className="cursor-pointer"
            >
              Email {renderSortIndicator("email")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("insuranceSum")}
              className="cursor-pointer"
            >
              Insurance Amount {renderSortIndicator("insuranceSum")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("duration")}
              className="cursor-pointer"
            >
              Insurance Period {renderSortIndicator("duration")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("premium")}
              className="cursor-pointer"
            >
              Premium Price {renderSortIndicator("premium")}
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                State {renderSortIndicator("status")}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-8 w-8 p-0"
                    >
                      <span className="sr-only">Filter state</span>
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setStateFilter(null)}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setStateFilter("waiting_for_counter_offer")
                      }
                    >
                      Waiting for counter offer
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStateFilter("review_documents")}
                    >
                      Review documents
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStateFilter("requesting_documents")}
                    >
                      Request documents
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setStateFilter("draft")}>
                      Draft
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStateFilter("rejected")}
                    >
                      Rejected
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStateFilter("accepted")}
                    >
                      Accepted
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStateFilter("accepted_with_conditions")}
                    >
                      Accepted with conditions
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map((lead) => (
            <TableRow
              key={lead.id}
              className="cursor-pointer"
              onClick={() => {
                router.push(`/${lead.id}`);
              }}
            >
              <TableCell>{lead.id?.toString()}</TableCell>
              <TableCell>{formatDate(lead.requestDate)}</TableCell>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>
                {lead.insuranceSum ? formatCurrency(lead.insuranceSum) : ""}
              </TableCell>
              <TableCell>
                {lead.duration ? formatYear(lead.duration) : ""}
              </TableCell>
              <TableCell>
                {lead.premium ? formatCurrency(lead.premium) : ""}
              </TableCell>
              <TableCell>{renderStatusBadge(lead.status as Status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
