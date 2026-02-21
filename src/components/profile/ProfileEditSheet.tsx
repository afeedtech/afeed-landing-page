import { useState, useRef } from "react";
import { Camera, X, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { CreatorProfile, ProfileTemplateType } from "./types";

interface ProfileEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CreatorProfile;
  onProfileChange: (profile: Partial<CreatorProfile>) => void;
  selectedTemplate: ProfileTemplateType;
}

export function ProfileEditSheet({
  open,
  onOpenChange,
  profile,
  onProfileChange,
  selectedTemplate,
}: ProfileEditSheetProps) {
  const [editedProfile, setEditedProfile] = useState<CreatorProfile>(profile);
  const [newCredential, setNewCredential] = useState("");
  const profileImageRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({
          ...prev,
          [type === "profile" ? "profileImage" : "coverImage"]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addCredential = () => {
    if (newCredential.trim()) {
      setEditedProfile((prev) => ({
        ...prev,
        credentials: [...prev.credentials, newCredential.trim()],
      }));
      setNewCredential("");
    }
  };

  const removeCredential = (index: number) => {
    setEditedProfile((prev) => ({
      ...prev,
      credentials: prev.credentials.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    onProfileChange(editedProfile);
    onOpenChange(false);
    toast.success("Profile updated successfully");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Update your profile information visible to visitors
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Profile Image Upload */}
          <div className="space-y-3">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-4">
              <div
                onClick={() => profileImageRef.current?.click()}
                className="w-20 h-20 rounded-full bg-primary flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              >
                {editedProfile.profileImage ? (
                  <img
                    src={editedProfile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="h-6 w-6 text-primary-foreground" />
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => profileImageRef.current?.click()}
              >
                Upload Image
              </Button>
              <input
                ref={profileImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "profile")}
              />
            </div>
          </div>

          {/* Cover Image Upload - Only for Authority Template */}
          {selectedTemplate === "authority" && (
            <div className="space-y-3">
              <Label>Cover Image</Label>
              <div
                onClick={() => coverImageRef.current?.click()}
                className="w-full h-32 rounded-lg bg-muted flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              >
                {editedProfile.coverImage ? (
                  <img
                    src={editedProfile.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload cover image
                    </span>
                  </div>
                )}
              </div>
              <input
                ref={coverImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "cover")}
              />
            </div>
          )}

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={editedProfile.name}
              onChange={(e) =>
                setEditedProfile((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Your name"
            />
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={editedProfile.headline}
              onChange={(e) =>
                setEditedProfile((prev) => ({ ...prev, headline: e.target.value }))
              }
              placeholder="Short tagline about you"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={editedProfile.bio}
              onChange={(e) =>
                setEditedProfile((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Tell visitors about yourself"
              rows={4}
              maxLength={400}
            />
            <p className="text-xs text-muted-foreground text-right">
              {editedProfile.bio.length}/400
            </p>
          </div>

          {/* Credentials */}
          <div className="space-y-3">
            <Label>Credentials & Highlights</Label>
            <div className="flex flex-wrap gap-2">
              {editedProfile.credentials.map((credential, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="gap-1 pr-1 cursor-pointer"
                >
                  {credential}
                  <button
                    onClick={() => removeCredential(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newCredential}
                onChange={(e) => setNewCredential(e.target.value)}
                placeholder="Add credential (e.g., '10+ Years Experience')"
                onKeyDown={(e) => e.key === "Enter" && addCredential()}
              />
              <Button type="button" variant="outline" size="icon" onClick={addCredential}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <Label>Social Links</Label>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-xs text-muted-foreground">
                  Twitter / X
                </Label>
                <Input
                  id="twitter"
                  value={editedProfile.socialLinks.twitter || ""}
                  onChange={(e) =>
                    setEditedProfile((prev) => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                    }))
                  }
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-xs text-muted-foreground">
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  value={editedProfile.socialLinks.instagram || ""}
                  onChange={(e) =>
                    setEditedProfile((prev) => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, instagram: e.target.value },
                    }))
                  }
                  placeholder="https://instagram.com/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube" className="text-xs text-muted-foreground">
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  value={editedProfile.socialLinks.youtube || ""}
                  onChange={(e) =>
                    setEditedProfile((prev) => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, youtube: e.target.value },
                    }))
                  }
                  placeholder="https://youtube.com/@channel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-xs text-muted-foreground">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={editedProfile.socialLinks.linkedin || ""}
                  onChange={(e) =>
                    setEditedProfile((prev) => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                    }))
                  }
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-xs text-muted-foreground">
                  Website
                </Label>
                <Input
                  id="website"
                  value={editedProfile.socialLinks.website || ""}
                  onChange={(e) =>
                    setEditedProfile((prev) => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, website: e.target.value },
                    }))
                  }
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
