import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Library } from "lucide-react";
import { ScriptCard } from "./ScriptCard";
import { scriptTemplates, ScriptTemplate, GoalType, goalLabels } from "./mockData";

interface ScriptLibraryProps {
  onUseTemplate: (template: ScriptTemplate) => void;
}

const goalFilters: { value: GoalType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Scripts' },
  { value: 'grow', label: 'Grow' },
  { value: 'sell', label: 'Sell' },
  { value: 'educate', label: 'Educate' },
  { value: 'reengage', label: 'Re-engage' },
];

export const ScriptLibrary = ({ onUseTemplate }: ScriptLibraryProps) => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<GoalType | 'all'>('all');

  const filteredTemplates = scriptTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'all' || template.goal === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Library className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Script Library</h2>
            <p className="text-sm text-muted-foreground">Proven frameworks that work</p>
          </div>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search scripts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {goalFilters.map((filter) => (
          <Badge
            key={filter.value}
            variant={activeFilter === filter.value ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/20 transition-colors px-4 py-1.5"
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </Badge>
        ))}
      </div>

      {/* Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <ScriptCard
              key={template.id}
              template={template}
              onUse={onUseTemplate}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Library className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium mb-2">No scripts found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
