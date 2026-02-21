import { useState } from "react";
import { Plus, Search, Calendar, Clock, Users, Video, DollarSign } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const initialSessions = [
  {
    id: 1,
    title: "Content Strategy Workshop",
    type: "group",
    date: "Dec 28, 2024",
    time: "2:00 PM",
    duration: "90 min",
    price: 25,
    capacity: 20,
    booked: 12,
    status: "upcoming",
    description: "Learn how to create a winning content strategy for your brand.",
  },
  {
    id: 2,
    title: "1:1 Business Coaching",
    type: "1:1",
    date: "Dec 29, 2024",
    time: "10:00 AM",
    duration: "60 min",
    price: 45,
    capacity: 1,
    booked: 1,
    status: "upcoming",
    description: "Personal coaching session to help you grow your business.",
  },
  {
    id: 3,
    title: "Brand Building Masterclass",
    type: "group",
    date: "Jan 3, 2025",
    time: "4:00 PM",
    duration: "120 min",
    price: 30,
    capacity: 15,
    booked: 8,
    status: "upcoming",
    description: "Master the art of building a memorable personal brand.",
  },
  {
    id: 4,
    title: "Social Media Deep Dive",
    type: "group",
    date: "Dec 20, 2024",
    time: "3:00 PM",
    duration: "90 min",
    price: 20,
    capacity: 25,
    booked: 25,
    status: "completed",
    description: "Comprehensive guide to social media marketing.",
  },
];

export default function Sessions() {
  const { language } = useLanguage();
  const [sessions, setSessions] = useState(initialSessions);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    type: "group",
    duration: "60",
    price: "",
    capacity: "10",
  });

  const upcomingSessions = sessions.filter((s) => s.status === "upcoming");
  const completedSessions = sessions.filter((s) => s.status === "completed");

  const handleCreateSession = () => {
    const session = {
      id: sessions.length + 1,
      title: newSession.title,
      type: newSession.type,
      date: "Jan 10, 2025",
      time: "2:00 PM",
      duration: `${newSession.duration} min`,
      price: parseFloat(newSession.price) || 0,
      capacity: parseInt(newSession.capacity) || 10,
      booked: 0,
      status: "upcoming" as const,
      description: newSession.description,
    };
    setSessions([session, ...sessions]);
    setNewSession({
      title: "",
      description: "",
      type: "group",
      duration: "60",
      price: "",
      capacity: "10",
    });
    setIsCreateOpen(false);
  };

  const SessionCard = ({ session, index }: { session: typeof sessions[0]; index: number }) => (
    <div
      className="rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-elevated animate-slide-up"
      style={{ animationDelay: `${100 + index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            session.type === "1:1" ? "bg-accent/10" : "bg-primary/10"
          )}>
            <Video className={cn(
              "h-6 w-6",
              session.type === "1:1" ? "text-accent" : "text-primary"
            )} />
          </div>
          <div>
            <h3 className="font-semibold">{session.title}</h3>
            <Badge variant={session.type === "1:1" ? "secondary" : "default"} className="mt-1">
              {session.type === "1:1" ? "1:1 Session" : "Group Workshop"}
            </Badge>
          </div>
        </div>
        <p className="text-2xl font-bold">{session.price} {language === 'ar' ? 'د.ك' : 'KWD'}</p>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {session.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {session.date}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {session.time} ({session.duration})
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {session.booked}/{session.capacity} booked
        </div>
        <div className="flex items-center gap-2 text-sm text-accent font-medium">
          <DollarSign className="h-4 w-4" />
          {session.booked * session.price} {language === 'ar' ? 'د.ك' : 'KWD'} earned
        </div>
      </div>

      {/* Progress bar for capacity */}
      <div className="mb-4">
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              session.booked === session.capacity ? "bg-accent" : "bg-primary"
            )}
            style={{ width: `${(session.booked / session.capacity) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        {session.status === "upcoming" ? (
          <>
            <Button className="flex-1" variant="outline">
              Edit
            </Button>
            <Button className="flex-1 gradient-bg">
              Start Session
            </Button>
          </>
        ) : (
          <Button className="w-full" variant="outline">
            View Recording
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Live Sessions</h1>
            <p className="text-muted-foreground mt-1">
              Manage your consultations and workshops
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-bg hover:opacity-90 transition-opacity">
                <Plus className="h-4 w-4 mr-2" />
                Create Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Session</DialogTitle>
                <DialogDescription>
                  Set up a new live session for your audience
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Session Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Content Strategy Workshop"
                    value={newSession.title}
                    onChange={(e) =>
                      setNewSession({ ...newSession, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What will attendees learn?"
                    value={newSession.description}
                    onChange={(e) =>
                      setNewSession({ ...newSession, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Session Type</Label>
                    <Select
                      value={newSession.type}
                      onValueChange={(value) =>
                        setNewSession({ ...newSession, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1:1">1:1 Consultation</SelectItem>
                        <SelectItem value="group">Group Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select
                      value={newSession.duration}
                      onValueChange={(value) =>
                        setNewSession({ ...newSession, duration: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">120 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ({language === 'ar' ? 'د.ك' : 'KWD'})</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="30"
                      value={newSession.price}
                      onChange={(e) =>
                        setNewSession({ ...newSession, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Max Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="20"
                      value={newSession.capacity}
                      onChange={(e) =>
                        setNewSession({ ...newSession, capacity: e.target.value })
                      }
                      disabled={newSession.type === "1:1"}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSession} className="gradient-bg">
                  Create Session
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="animate-slide-up" style={{ animationDelay: "50ms" }}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingSessions.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedSessions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingSessions.map((session, index) => (
                <SessionCard key={session.id} session={session} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedSessions.map((session, index) => (
                <SessionCard key={session.id} session={session} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
