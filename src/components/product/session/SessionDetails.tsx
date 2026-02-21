import { Calendar, Clock, Users, Video, RotateCcw, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product, SessionResource } from "@/components/profile/types";
import { format, parseISO, isPast, isFuture } from "date-fns";

interface SessionDetailsProps {
  product: Product;
  hasAccess: boolean;
  className?: string;
}

export function SessionDetails({ product, hasAccess, className }: SessionDetailsProps) {
  const sessionDate = product.sessionDate ? parseISO(product.sessionDate) : null;
  const isUpcoming = sessionDate ? isFuture(sessionDate) : true;
  const isPastSession = sessionDate ? isPast(sessionDate) : false;

  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="text-xl font-semibold">Session Details</h2>

      {/* Session Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Date & Time */}
        {sessionDate && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Date & Time</span>
            </div>
            <div className="font-medium">
              {format(sessionDate, "MMM d, yyyy")}
            </div>
            {product.sessionTime && (
              <div className="text-sm text-muted-foreground">
                {product.sessionTime} {product.timezone && `(${product.timezone})`}
              </div>
            )}
          </div>
        )}

        {/* Duration */}
        {product.duration && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Duration</span>
            </div>
            <div className="font-medium">{product.duration}</div>
          </div>
        )}

        {/* Capacity */}
        {product.sessionType === "group" && product.capacity && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">Capacity</span>
            </div>
            <div className="font-medium">
              {product.enrolled || 0} / {product.capacity} spots
            </div>
            {(product.enrolled || 0) >= product.capacity && (
              <Badge variant="destructive" className="mt-1 text-xs">Full</Badge>
            )}
          </div>
        )}

        {/* Replay */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm">Replay</span>
          </div>
          <div className="font-medium">
            {product.replayEnabled !== false ? "Available" : "Not available"}
          </div>
        </div>
      </div>

      {/* Session Type Badge */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="capitalize">
          <Video className="h-3 w-3 mr-1" />
          {product.sessionType === "1:1" ? "1:1 Session" : "Group Session"}
        </Badge>
        {isUpcoming && sessionDate && (
          <Badge variant="outline">Upcoming</Badge>
        )}
        {isPastSession && product.replayEnabled !== false && (
          <Badge variant="outline">Replay Available</Badge>
        )}
      </div>

      {/* Post-Purchase Actions */}
      {hasAccess && (
        <div className="space-y-3">
          {isUpcoming ? (
            <Button className="w-full sm:w-auto gradient-bg">
              <Video className="h-4 w-4 mr-2" />
              Join Session
            </Button>
          ) : product.replayEnabled !== false ? (
            <Button className="w-full sm:w-auto gradient-bg">
              <Video className="h-4 w-4 mr-2" />
              Watch Replay
            </Button>
          ) : null}
        </div>
      )}

      {/* Session Resources (Post-Purchase) */}
      {hasAccess && product.resources && product.resources.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">Session Resources</h3>
          <div className="space-y-2">
            {product.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border hover:bg-muted transition-colors"
              >
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{resource.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
