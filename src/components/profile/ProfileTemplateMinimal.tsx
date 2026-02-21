import { useState } from "react";
import { Pencil, Twitter, Instagram, Youtube, Linkedin, Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProfileTemplateProps } from "./types";
import { ContactCreatorDialog } from "./ContactCreatorDialog";

export function ProfileTemplateMinimal({ profile, isEditing, onEditClick, viewerIsPaidUser }: ProfileTemplateProps) {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  const socialIcons = {
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    linkedin: Linkedin,
    website: Globe,
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-card border border-border p-4 sm:p-6">
      {/* Edit Button - Only visible to creator */}
      {isEditing && (
        <Button
          size="sm"
          variant="outline"
          onClick={onEditClick}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 gap-2 touch-target-44"
        >
          <Pencil className="h-4 w-4" />
          <span className="hidden sm:inline">Edit Profile</span>
          <span className="sm:hidden">Edit</span>
        </Button>
      )}

      {/* Compact Inline Layout */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Left: Profile Image + Name/Headline */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary flex items-center justify-center overflow-hidden flex-shrink-0">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg sm:text-xl font-bold text-primary-foreground">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold">{profile.name}</h2>
            <p className="text-sm text-primary font-medium">{profile.headline}</p>
          </div>
        </div>

        {/* Right: Bio + Credentials + Links */}
        <div className="flex-1 space-y-3">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {profile.bio}
          </p>

          {/* Credentials as inline text */}
          {profile.credentials.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {profile.credentials.join(" • ")}
            </p>
          )}

          {/* Social Links - Minimal Icon Row */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(profile.socialLinks).map(([platform, url]) => {
              if (!url) return null;
              const Icon = socialIcons[platform as keyof typeof socialIcons];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center touch-target-44",
                    "text-muted-foreground hover:text-primary hover:bg-primary/10",
                    "transition-colors duration-200"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}

            {/* Contact Me Button - Only for paid users when mobile is visible */}
            {profile.mobileVisible && viewerIsPaidUser && !isEditing && profile.mobileNumber && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 h-8 text-xs ml-2"
                onClick={() => setContactDialogOpen(true)}
              >
                <Phone className="h-3.5 w-3.5" />
                Contact Me
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      <ContactCreatorDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        creatorName={profile.name}
        mobileNumber={profile.mobileNumber || ""}
      />
    </div>
  );
}
