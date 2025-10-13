"use client";

import { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Globe,
  Mail,
  Phone,
  Building2,
  Image as ImageIcon,
} from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import type { Vyapari, VyapariFormData, Category, SubCategory } from "../types";

interface VyapariFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  vyapari?: Vyapari | null;
  mode: "create" | "edit";
}

const BUSINESS_TYPES = [
  "Retail",
  "Wholesale",
  "Manufacturing",
  "Service",
  "Restaurant",
  "Healthcare",
  "Education",
  "Technology",
  "Construction",
  "Other",
];

export default function VyapariFormModal({
  isOpen,
  onClose,
  onSuccess,
  vyapari,
  mode,
}: VyapariFormModalProps) {
  const axios = useAxios();

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    SubCategory[]
  >([]);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<VyapariFormData>({
    name: "",
    short_description: "",
    long_description: "",
    logo: "",
    cover_image: "",
    business_type: "Retail",
    category: null,
    subcategory: null,
    email: "",
    phone: "",
    owner: "",
    employee_count: null,
    insta_url: "",
    facebook_url: "",
    website_url: "",
    address: {
      address_line1: "",
      address_line2: "",
      street: "",
      landmark: "",
      sub_district: "",
      city: "",
      district: "",
      state: "",
      postal_code: "",
      country: "India",
    },
    location: {
      latitude: undefined,
      longitude: undefined,
    },
    is_verified: false,
    is_blocked: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, subcategoriesRes] = await Promise.all([
          axios.get("/vyapari/category/"),
          axios.get("/vyapari/subcategory/"),
        ]);
        setCategories(categoriesRes.data.results || categoriesRes.data || []);
        setSubcategories(
          subcategoriesRes.data.results || subcategoriesRes.data || []
        );
      } catch (error: any) {
        toast.error("Failed to fetch categories");
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, axios]);

  useEffect(() => {
    if (mode === "edit" && vyapari) {
      setFormData({
        name: vyapari.name || "",
        short_description: vyapari.short_description || "",
        long_description: vyapari.long_description || "",
        logo: vyapari.logo || "",
        cover_image: vyapari.cover_image || "",
        business_type: vyapari.business_type || "Retail",
        category: vyapari.category || null,
        subcategory: vyapari.subcategory || null,
        email: vyapari.email || "",
        phone: vyapari.phone || "",
        owner: vyapari.owner || "",
        employee_count: vyapari.employee_count || null,
        insta_url: vyapari.insta_url || "",
        facebook_url: vyapari.facebook_url || "",
        website_url: vyapari.website_url || "",
        address: vyapari.address || {
          address_line1: "",
          city: "",
          state: "",
          postal_code: "",
          country: "India",
        },
        location: vyapari.location || {
          latitude: undefined,
          longitude: undefined,
        },
        is_verified: vyapari.is_verified || false,
        is_blocked: vyapari.is_blocked || false,
      });
    } else {
      setFormData({
        name: "",
        short_description: "",
        long_description: "",
        logo: "",
        cover_image: "",
        business_type: "Retail",
        category: null,
        subcategory: null,
        email: "",
        phone: "",
        owner: "",
        employee_count: null,
        insta_url: "",
        facebook_url: "",
        website_url: "",
        address: {
          address_line1: "",
          city: "",
          state: "",
          postal_code: "",
          country: "India",
        },
        location: { latitude: undefined, longitude: undefined },
        is_verified: false,
        is_blocked: false,
      });
    }
  }, [mode, vyapari, isOpen]);

  useEffect(() => {
    if (formData.category) {
      const filtered = subcategories.filter(
        (sub) => sub.category === formData.category
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.category, subcategories]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Business name is required");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    if (!formData.business_type) {
      toast.error("Business type is required");
      return;
    }
    if (mode === "create" && !formData.logo?.trim()) {
      toast.error("Business logo is required");
      return;
    }

    try {
      setSubmitting(true);

      const cleanData: any = {
        ...formData,
        employee_count: formData.employee_count || null,
        category: formData.category || null,
        subcategory: formData.subcategory || null,
      };

      if (cleanData.address) {
        Object.keys(cleanData.address).forEach((key) => {
          if (cleanData.address[key] === "") {
            delete cleanData.address[key];
          }
        });
      }

      if (cleanData.location) {
        if (!cleanData.location.latitude) delete cleanData.location.latitude;
        if (!cleanData.location.longitude) delete cleanData.location.longitude;
      }

      if (mode === "create") {
        await axios.post("/vyapari/vyapari/", cleanData);
        toast.success("Business created successfully");
      } else {
        await axios.put(`/vyapari/vyapari/${vyapari?.id}/`, cleanData);
        toast.success("Business updated successfully");
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.name?.[0] ||
        error.response?.data?.phone?.[0] ||
        error.response?.data?.email?.[0] ||
        error.response?.data?.message ||
        `Failed to ${mode} business`;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Business" : "Edit Business"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the details to add a new business to the directory"
              : "Update the business information"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Basic Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="name">Business Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <Label htmlFor="business_type">Business Type *</Label>
                <Select
                  value={formData.business_type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, business_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category?.toString() || "none"}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value === "none" ? null : parseInt(value),
                      subcategory: null,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subcategory">SubCategory</Label>
                <Select
                  value={formData.subcategory?.toString() || "none"}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      subcategory: value === "none" ? null : parseInt(value),
                    })
                  }
                  disabled={!formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {filteredSubcategories.map((sub) => (
                      <SelectItem key={sub.id} value={sub.id.toString()}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="owner">Owner Name</Label>
                <Input
                  id="owner"
                  value={formData.owner}
                  onChange={(e) =>
                    setFormData({ ...formData, owner: e.target.value })
                  }
                  placeholder="Enter owner name"
                />
              </div>

              <div>
                <Label htmlFor="employee_count">Employee Count</Label>
                <Input
                  id="employee_count"
                  type="number"
                  min="0"
                  value={formData.employee_count || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employee_count: e.target.value
                        ? parseInt(e.target.value)
                        : null,
                    })
                  }
                  placeholder="Number of employees"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="short_description">Short Description</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      short_description: e.target.value,
                    })
                  }
                  placeholder="Brief description (1-2 lines)"
                  rows={2}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="long_description">Detailed Description</Label>
                <Textarea
                  id="long_description"
                  value={formData.long_description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      long_description: e.target.value,
                    })
                  }
                  placeholder="Detailed description of the business"
                  rows={4}
                />
              </div>
            </div>
          </div>

          <Separator />

          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="business@example.com"
                />
              </div>

              <div>
                <Label htmlFor="website_url">Website URL</Label>
                <Input
                  id="website_url"
                  value={formData.website_url}
                  onChange={(e) =>
                    setFormData({ ...formData, website_url: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="insta_url">Instagram URL</Label>
                <Input
                  id="insta_url"
                  value={formData.insta_url}
                  onChange={(e) =>
                    setFormData({ ...formData, insta_url: e.target.value })
                  }
                  placeholder="https://instagram.com/business"
                />
              </div>

              <div>
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  value={formData.facebook_url}
                  onChange={(e) =>
                    setFormData({ ...formData, facebook_url: e.target.value })
                  }
                  placeholder="https://facebook.com/business"
                />
              </div>
            </div>
          </div>

          <Separator />

          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Images
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="logo">Logo URL *</Label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  placeholder="https://example.com/logo.png"
                  required={mode === "create"}
                />
              </div>

              <div>
                <Label htmlFor="cover_image">Cover Image URL</Label>
                <Input
                  id="cover_image"
                  value={formData.cover_image}
                  onChange={(e) =>
                    setFormData({ ...formData, cover_image: e.target.value })
                  }
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
            </div>
          </div>

          <Separator />

          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="address_line1">Address Line 1</Label>
                <Input
                  id="address_line1"
                  value={formData.address?.address_line1 || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        address_line1: e.target.value,
                      },
                    })
                  }
                  placeholder="Street address, building number"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address_line2">Address Line 2</Label>
                <Input
                  id="address_line2"
                  value={formData.address?.address_line2 || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        address_line2: e.target.value,
                      },
                    })
                  }
                  placeholder="Apartment, suite, etc."
                />
              </div>

              <div>
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  value={formData.address?.street || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, street: e.target.value },
                    })
                  }
                  placeholder="Street name"
                />
              </div>

              <div>
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  value={formData.address?.landmark || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        landmark: e.target.value,
                      },
                    })
                  }
                  placeholder="Nearby landmark"
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.address?.city || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                  placeholder="City name"
                />
              </div>

              <div>
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={formData.address?.district || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        district: e.target.value,
                      },
                    })
                  }
                  placeholder="District name"
                />
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.address?.state || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value },
                    })
                  }
                  placeholder="State name"
                />
              </div>

              <div>
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  value={formData.address?.postal_code || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        postal_code: e.target.value,
                      },
                    })
                  }
                  placeholder="PIN code"
                />
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.address?.country || "India"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, country: e.target.value },
                    })
                  }
                  placeholder="Country"
                />
              </div>

              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.location?.latitude || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        latitude: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      },
                    })
                  }
                  placeholder="28.6139"
                />
              </div>

              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.location?.longitude || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        longitude: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      },
                    })
                  }
                  placeholder="77.2090"
                />
              </div>
            </div>
          </div>

          <Separator />

          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Status</h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_verified"
                  checked={formData.is_verified}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      is_verified: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="is_verified" className="cursor-pointer">
                  Verified Business
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_blocked"
                  checked={formData.is_blocked}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_blocked: checked as boolean })
                  }
                />
                <Label htmlFor="is_blocked" className="cursor-pointer">
                  Block Business
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
              ? "Create Business"
              : "Update Business"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
