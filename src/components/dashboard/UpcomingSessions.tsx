import { Calendar, Clock, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sessions = [
  {
    id: 1,
    title: "Content Strategy Workshop",
    type: "group",
    date: "Dec 28, 2024",
    time: "2:00 PM",
    attendees: 12,
    maxAttendees: 20,
  },
  {
    id: 2,
    title: "1:1 Coaching with Omar",
    type: "1:1",
    date: "Dec 29, 2024",
    time: "10:00 AM",
    attendees: 1,
    maxAttendees: 1,
  },
  {
    id: 3,
    title: "Brand Building Masterclass",
    type: "group",
    date: "Jan 3, 2025",
    time: "4:00 PM",
    attendees: 8,
    maxAttendees: 15,
  },
];

export function UpcomingSessions() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
          <p className="text-sm text-muted-foreground">Your scheduled live sessions</p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{session.title}</p>
                <Badge variant={session.type === "1:1" ? "secondary" : "default"} className="text-xs">
                  {session.type === "1:1" ? "1:1" : "Group"}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {session.date}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {session.time}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {session.attendees}/{session.maxAttendees}
                </div>
              </div>
            </div>
            <Button size="sm" variant="ghost">
              Start
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
