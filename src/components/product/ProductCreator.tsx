import { ExternalLink, Twitter, Instagram, Youtube, Linkedin, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { CreatorProfile } from "@/components/profile/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ProductCreatorProps {
  profile: CreatorProfile;
  isCollapsible?: boolean;
  className?: string;
}

const socialIcons = {
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  website: Globe,
};

export function ProductCreator({ profile, isCollapsible = false, className }: ProductCreatorProps) {
  const [isOpen, setIsOpen] = useState(!isCollapsible);

  const content = (
    <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-muted/30 border border-border">
      {/* Profile Image */}
      <Avatar className="h-20 w-20 flex-shrink-0">
        <AvatarImage src={profile.profileImage || undefined} alt={profile.name} />
        <AvatarFallback className="text-xl bg-primary/10 text-primary">
          {profile.name.split(" ").map(n => n[0]).join("")}
        </AvatarFallback>
      </Avatar>

      {/* Profile Info */}
      <div className="flex-1 space-y-3">
        <div>
          <h3 className="text-lg font-semibold">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">{profile.headline}</p>
        </div>

        {/* Credentials */}
        {profile.credentials.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.credentials.map((credential, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {credential}
              </Badge>
            ))}
          </div>
        )}

        {/* Bio */}
        <p className="text-sm text-muted-foreground">{profile.bio}</p>

        {/* Social Links */}
        <div className="flex gap-2">
          {Object.entries(profile.socialLinks).map(([platform, url]) => {
            if (!url) return null;
            const Icon = socialIcons[platform as keyof typeof socialIcons];
            return (
              <Button
                key={platform}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                asChild
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (isCollapsible) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.profileImage || undefined} alt={profile.name} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {profile.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">About {profile.name}</span>
            </div>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          {content}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-xl font-semibold">About the Creator</h2>
      {content}
    </div>
  );
}
