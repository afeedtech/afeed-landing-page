import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Save, 
  X,
  Smartphone
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Platform } from "./mockData";
import { useToast } from "@/hooks/use-toast";

// Platform icons as simple components
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface SchedulingPanelProps {
  hookPreview: string;
  onSchedule: (platform: Platform, date: Date, time: string) => void;
  onSaveDraft: () => void;
  onClose: () => void;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export const SchedulingPanel = ({ hookPreview, onSchedule, onSaveDraft, onClose }: SchedulingPanelProps) => {
  const { toast } = useToast();
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");

  const togglePlatform = (platform: Platform) => {
    if (platform === 'youtube') {
      toast({
        title: "Coming Soon",
        description: "YouTube Shorts scheduling will be available soon!",
      });
      return;
    }
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSchedule = () => {
    if (selectedPlatforms.length === 0 || !date || !time) {
      toast({
        title: "Missing information",
        description: "Please select a platform, date, and time.",
        variant: "destructive",
      });
      return;
    }

    selectedPlatforms.forEach(platform => {
      onSchedule(platform, date, time);
    });
  };

  const canSchedule = selectedPlatforms.length > 0 && date && time;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Schedule Your Post</h2>
          <p className="text-sm text-muted-foreground mt-1">Consistency beats perfection.</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Options */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Select Platforms</CardTitle>
              <CardDescription>Choose where to publish</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button
                  variant={selectedPlatforms.includes('tiktok') ? 'default' : 'outline'}
                  onClick={() => togglePlatform('tiktok')}
                  className="flex-1 gap-2"
                >
                  <TikTokIcon />
                  TikTok
                </Button>
                <Button
                  variant={selectedPlatforms.includes('instagram') ? 'default' : 'outline'}
                  onClick={() => togglePlatform('instagram')}
                  className="flex-1 gap-2"
                >
                  <InstagramIcon />
                  Reels
                </Button>
                <Button
                  variant="outline"
                  onClick={() => togglePlatform('youtube')}
                  className="flex-1 gap-2 relative"
                  disabled
                >
                  <YouTubeIcon />
                  Shorts
                  <Badge variant="secondary" className="absolute -top-2 -right-2 text-[10px] px-1.5">
                    Soon
                  </Badge>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Date Picker */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {/* Time Picker */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Select Time</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <SelectValue placeholder="Choose a time slot" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">Times shown in your local timezone</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Preview */}
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="relative w-48 h-80 bg-muted rounded-3xl border-4 border-foreground/20 overflow-hidden">
                {/* Phone notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-foreground/20 rounded-full" />
                
                {/* Content area */}
                <div className="absolute inset-4 top-10 bg-background rounded-xl p-3 flex flex-col">
                  <div className="flex-1 space-y-2">
                    <p className="text-xs font-medium line-clamp-6">{hookPreview}</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex gap-1">
                      {selectedPlatforms.map(p => (
                        <Badge key={p} variant="secondary" className="text-[10px]">
                          {p}
                        </Badge>
                      ))}
                    </div>
                    {date && time && (
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {format(date, "MMM d")} at {time}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-4 border-t border-border">
        <Button variant="secondary" onClick={onSaveDraft} className="gap-2">
          <Save className="h-4 w-4" />
          Save as Draft
        </Button>
        <Button onClick={handleSchedule} disabled={!canSchedule} className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          Schedule
        </Button>
      </div>
    </div>
  );
};
