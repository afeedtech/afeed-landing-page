import { useState } from "react";
import { Pencil, Twitter, Instagram, Youtube, Linkedin, Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProfileTemplateProps } from "./types";
import { ContactCreatorDialog } from "./ContactCreatorDialog";

export function ProfileTemplateCreator({ profile, isEditing, onEditClick, viewerIsPaidUser }: ProfileTemplateProps) {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  
  const socialIcons = {
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    linkedin: Linkedin,
    website: Globe,
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-primary/5 to-transparent border border-border p-4 sm:p-8">
      {/* Edit Button - Only visible to creator */}
      {isEditing && (
        <Button
          size="sm"
          variant="outline"
          onClick={onEditClick}
          className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 gap-2 touch-target-44"
        >
          <Pencil className="h-4 w-4" />
          <span className="hidden sm:inline">Edit Profile</span>
          <span className="sm:hidden">Edit</span>
        </Button>
      )}

      {/* Centered Content */}
      <div className="flex flex-col items-center text-center space-y-5">
        {/* Large Centered Profile Image */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary flex items-center justify-center overflow-hidden shadow-elevated ring-4 ring-primary/20">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </span>
            )}
          </div>
        </div>

        {/* Name & Headline */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold">{profile.name}</h2>
          <p className="text-base sm:text-lg text-primary font-medium">{profile.headline}</p>
        </div>

        {/* Bio */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg line-clamp-3 sm:line-clamp-4">
          {profile.bio}
        </p>

        {/* Credentials - Centered */}
        {profile.credentials.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {profile.credentials.map((credential, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {credential}
              </Badge>
            ))}
          </div>
        )}

        {/* Social Links - Centered Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
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
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center touch-target-44",
                  "bg-muted hover:bg-primary hover:text-primary-foreground",
                  "transition-colors duration-200"
                )}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            );
          })}
        </div>

        {/* Contact Me Button - Only for paid users when mobile is visible */}
        {profile.mobileVisible && viewerIsPaidUser && !isEditing && profile.mobileNumber && (
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setContactDialogOpen(true)}
          >
            <Phone className="h-4 w-4" />
            Contact Me
          </Button>
        )}
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
