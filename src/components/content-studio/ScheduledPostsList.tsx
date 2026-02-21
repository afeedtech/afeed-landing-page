import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { ScheduledPostCard } from "./ScheduledPostCard";
import { scheduledPosts as initialPosts, ScheduledPost } from "./mockData";
import { useToast } from "@/hooks/use-toast";

interface ScheduledPostsListProps {
  onCreateNew: () => void;
}

export const ScheduledPostsList = ({ onCreateNew }: ScheduledPostsListProps) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<ScheduledPost[]>(initialPosts);

  const handleEdit = (id: string) => {
    toast({
      title: "Edit mode",
      description: "Opening script editor...",
    });
  };

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Post deleted",
      description: "The scheduled post has been removed.",
    });
  };

  const handleReschedule = (id: string) => {
    toast({
      title: "Reschedule",
      description: "Opening scheduler...",
    });
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Calendar className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No content scheduled yet</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Create your first script to get started. Consistency is the key to growth.
        </p>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Your First Script
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Scheduled Content</h2>
            <p className="text-sm text-muted-foreground">{posts.length} posts scheduled</p>
          </div>
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <ScheduledPostCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReschedule={handleReschedule}
          />
        ))}
      </div>
    </div>
  );
};
