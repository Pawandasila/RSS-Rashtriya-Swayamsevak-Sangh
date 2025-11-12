"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateCurrentUser } from "@/module/dashboard/users/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  User,
  MapPin,
  CreditCard,
  Camera,
  Save,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { NotProvided } from "./_components/NotProvided";
import { EditableField } from "./_components/EditableField";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  blood_group: string;
  gender: string;
  profession: string;
  aadhar_number: string;
  pan_number: string;
  street: string;
  sub_district: string;
  district: string;
  city: string;
  division: string;
  state: string;
  country: string;
  postal_code: string;
}

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDERS = ["Male", "Female", "Other"];

export default function SettingsPage() {
  const { user, setUserData } = useAuth();
  const { updateCurrentUser, isUpdating } = useUpdateCurrentUser();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    blood_group: "",
    gender: "",
    profession: "",
    aadhar_number: "",
    pan_number: "",
    street: "",
    sub_district: "",
    district: "",
    city: "",
    division: "",
    state: "",
    country: "",
    postal_code: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob || "",
        blood_group: user.blood_group || "",
        gender: user.gender || "",
        profession: user.profession || "",
        aadhar_number: user.aadhar_number || "",
        pan_number: user.pan_number || "",
        street: user.street || "",
        sub_district: user.sub_district || "",
        district: user.district || "",
        city: user.city || "",
        division: user.division || "",
        state: user.state || "",
        country: user.country || "",
        postal_code: user.postal_code || "",
      });
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldEdit = (fieldName: string) => {
    setEditingField(fieldName);
  };

  const handleFieldSave = async (fieldName: string) => {
    const fieldValue = formData[fieldName as keyof UserFormData];
    
    const result = await updateCurrentUser({ [fieldName]: fieldValue });

    if (result.success && result.data) {
      setUserData(result.data);
      toast.success(`${fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} updated successfully!`);
      setEditingField(null);
    } else {
      toast.error(result.error || `Failed to update ${fieldName}`);
    }
  };

  const handleFieldCancel = (fieldName: string) => {
    // Reset to original value
    if (user) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: (user as any)[fieldName] || "",
      }));
    }
    setEditingField(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const result = await updateCurrentUser({ image: file });

    if (result.success && result.data) {
      setUserData(result.data);
      toast.success("Profile image updated successfully!");
    } else {
      toast.error(result.error || "Failed to upload image");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const userImageUrl = user.image?.startsWith("http")
    ? user.image
    : user.image
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.image}`
    : null;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Account Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your profile information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  {userImageUrl ? (
                    <AvatarImage src={userImageUrl} alt={user.name} />
                  ) : (
                    <AvatarFallback className="text-3xl bg-primary/10">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUpdating}
                />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ID: {user.user_id}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {user.is_verified && (
                    <Badge variant="default" className="text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {user.is_volunteer && (
                    <Badge variant="secondary" className="text-xs">
                      Volunteer
                    </Badge>
                  )}
                  {user.is_admin_account && (
                    <Badge variant="destructive" className="text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />

              <div className="w-full space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  {user.is_blocked ? (
                    <Badge variant="destructive" className="text-xs">
                      <XCircle className="w-3 h-3 mr-1" />
                      Blocked
                    </Badge>
                  ) : (
                    <Badge variant="default" className="text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Joined:</span>
                  <span className="font-medium">
                    {new Date(user.date_joined).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    isEditing={editingField === "name"}
                    isLoading={isUpdating && editingField === "name"}
                    required
                    placeholder="Enter your full name"
                    onEdit={() => handleFieldEdit("name")}
                    onSave={() => handleFieldSave("name")}
                    onCancel={() => handleFieldCancel("name")}
                    onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                  />

                  <EditableField
                    label="Email"
                    name="email"
                    value={formData.email}
                    type="text"
                    isEditing={false}
                    required
                    disabled
                    placeholder="your.email@example.com"
                    onEdit={() => {}}
                    onSave={() => {}}
                    onCancel={() => {}}
                    onChange={() => {}}
                  />

                  <EditableField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    isEditing={editingField === "phone"}
                    isLoading={isUpdating && editingField === "phone"}
                    required
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    onEdit={() => handleFieldEdit("phone")}
                    onSave={() => handleFieldSave("phone")}
                    onCancel={() => handleFieldCancel("phone")}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                  />

                  <EditableField
                    label="Date of Birth"
                    name="dob"
                    value={formData.dob}
                    type="date"
                    isEditing={editingField === "dob"}
                    isLoading={isUpdating && editingField === "dob"}
                    placeholder="Select your date of birth"
                    onEdit={() => handleFieldEdit("dob")}
                    onSave={() => handleFieldSave("dob")}
                    onCancel={() => handleFieldCancel("dob")}
                    onChange={(value) => setFormData(prev => ({ ...prev, dob: value }))}
                  />

                  <EditableField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    type="select"
                    options={GENDERS}
                    isEditing={editingField === "gender"}
                    isLoading={isUpdating && editingField === "gender"}
                    placeholder="Select gender"
                    onEdit={() => handleFieldEdit("gender")}
                    onSave={() => handleFieldSave("gender")}
                    onCancel={() => handleFieldCancel("gender")}
                    onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                  />

                  <EditableField
                    label="Blood Group"
                    name="blood_group"
                    value={formData.blood_group}
                    type="select"
                    options={BLOOD_GROUPS}
                    isEditing={editingField === "blood_group"}
                    isLoading={isUpdating && editingField === "blood_group"}
                    placeholder="Select blood group"
                    onEdit={() => handleFieldEdit("blood_group")}
                    onSave={() => handleFieldSave("blood_group")}
                    onCancel={() => handleFieldCancel("blood_group")}
                    onChange={(value) => setFormData(prev => ({ ...prev, blood_group: value }))}
                  />

                  <EditableField
                    label="Profession"
                    name="profession"
                    value={formData.profession}
                    isEditing={editingField === "profession"}
                    isLoading={isUpdating && editingField === "profession"}
                    placeholder="Enter your profession"
                    className="md:col-span-2"
                    onEdit={() => handleFieldEdit("profession")}
                    onSave={() => handleFieldSave("profession")}
                    onCancel={() => handleFieldCancel("profession")}
                    onChange={(value) => setFormData(prev => ({ ...prev, profession: value }))}
                  />
                </div>
              </div>

              <Separator />

              {/* Identity Documents */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Identity Documents
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="Aadhar Number"
                    name="aadhar_number"
                    value={formData.aadhar_number}
                    isEditing={editingField === "aadhar_number"}
                    isLoading={isUpdating && editingField === "aadhar_number"}
                    placeholder="12-digit Aadhar number"
                    maxLength={12}
                    onEdit={() => handleFieldEdit("aadhar_number")}
                    onSave={() => handleFieldSave("aadhar_number")}
                    onCancel={() => handleFieldCancel("aadhar_number")}
                    onChange={(value) => setFormData(prev => ({ ...prev, aadhar_number: value }))}
                  />

                  <EditableField
                    label="PAN Number"
                    name="pan_number"
                    value={formData.pan_number}
                    isEditing={editingField === "pan_number"}
                    isLoading={isUpdating && editingField === "pan_number"}
                    placeholder="10-character PAN number"
                    maxLength={10}
                    onEdit={() => handleFieldEdit("pan_number")}
                    onSave={() => handleFieldSave("pan_number")}
                    onCancel={() => handleFieldCancel("pan_number")}
                    onChange={(value) => setFormData(prev => ({ ...prev, pan_number: value.toUpperCase() }))}
                  />
                </div>
              </div>

              <Separator />

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="Street Address"
                    name="street"
                    value={formData.street}
                    type="textarea"
                    isEditing={editingField === "street"}
                    isLoading={isUpdating && editingField === "street"}
                    placeholder="House/Flat number, Street name"
                    className="md:col-span-2"
                    onEdit={() => handleFieldEdit("street")}
                    onSave={() => handleFieldSave("street")}
                    onCancel={() => handleFieldCancel("street")}
                    onChange={(value) => setFormData(prev => ({ ...prev, street: value }))}
                  />

                  <EditableField
                    label="Sub District"
                    name="sub_district"
                    value={formData.sub_district}
                    isEditing={editingField === "sub_district"}
                    isLoading={isUpdating && editingField === "sub_district"}
                    placeholder="Enter sub district"
                    onEdit={() => handleFieldEdit("sub_district")}
                    onSave={() => handleFieldSave("sub_district")}
                    onCancel={() => handleFieldCancel("sub_district")}
                    onChange={(value) => setFormData(prev => ({ ...prev, sub_district: value }))}
                  />

                  <EditableField
                    label="District"
                    name="district"
                    value={formData.district}
                    isEditing={editingField === "district"}
                    isLoading={isUpdating && editingField === "district"}
                    placeholder="Enter district"
                    onEdit={() => handleFieldEdit("district")}
                    onSave={() => handleFieldSave("district")}
                    onCancel={() => handleFieldCancel("district")}
                    onChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                  />

                  <EditableField
                    label="City"
                    name="city"
                    value={formData.city}
                    isEditing={editingField === "city"}
                    isLoading={isUpdating && editingField === "city"}
                    placeholder="Enter city"
                    onEdit={() => handleFieldEdit("city")}
                    onSave={() => handleFieldSave("city")}
                    onCancel={() => handleFieldCancel("city")}
                    onChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                  />

                  <EditableField
                    label="Division"
                    name="division"
                    value={formData.division}
                    isEditing={editingField === "division"}
                    isLoading={isUpdating && editingField === "division"}
                    placeholder="Enter division"
                    onEdit={() => handleFieldEdit("division")}
                    onSave={() => handleFieldSave("division")}
                    onCancel={() => handleFieldCancel("division")}
                    onChange={(value) => setFormData(prev => ({ ...prev, division: value }))}
                  />

                  <EditableField
                    label="State"
                    name="state"
                    value={formData.state}
                    isEditing={editingField === "state"}
                    isLoading={isUpdating && editingField === "state"}
                    placeholder="Enter state"
                    onEdit={() => handleFieldEdit("state")}
                    onSave={() => handleFieldSave("state")}
                    onCancel={() => handleFieldCancel("state")}
                    onChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
                  />

                  <EditableField
                    label="Country"
                    name="country"
                    value={formData.country}
                    isEditing={editingField === "country"}
                    isLoading={isUpdating && editingField === "country"}
                    placeholder="Enter country"
                    onEdit={() => handleFieldEdit("country")}
                    onSave={() => handleFieldSave("country")}
                    onCancel={() => handleFieldCancel("country")}
                    onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                  />

                  <EditableField
                    label="Postal Code"
                    name="postal_code"
                    value={formData.postal_code}
                    isEditing={editingField === "postal_code"}
                    isLoading={isUpdating && editingField === "postal_code"}
                    placeholder="6-digit PIN code"
                    maxLength={6}
                    onEdit={() => handleFieldEdit("postal_code")}
                    onSave={() => handleFieldSave("postal_code")}
                    onCancel={() => handleFieldCancel("postal_code")}
                    onChange={(value) => setFormData(prev => ({ ...prev, postal_code: value }))}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
