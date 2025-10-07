"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User as UserIcon,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import useAuth from "@/hooks/use-auth";

export default function Page() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = window.localStorage.getItem("user_data");
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (e) {
          console.warn("Unable to parse user_data", e);
        }
      }
    }
  }, []);

  const isMember = user?.is_member_account || false;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome{user?.name ? `, ${user.name}` : " to Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          Welcome to the Rashtriya Swayamsevak Sangh dashboard. Here you can
          view your activities and information.
        </p>
      </div>

      {/* Member Profile Card - Only show for members */}
      {isMember && userData && (
        <Card className="overflow-hidden border bg-white shadow-md">
          <CardHeader className="border-b ">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <Image
                  src={userData?.image || "/logo/logo.png"}
                  alt={userData?.name || "Member"}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl text-black">
                {userData.name?.toUpperCase() || "MEMBER"}
              </CardTitle>
              <CardDescription className="text-gray-800">
                RSS Volunteer Member
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className=" pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Mail className="h-5 w-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500">Email</p>
                <p className="text-sm font-semibold text-gray-900">
                  {userData.email || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Phone className="h-5 w-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500">Phone</p>
                <p className="text-sm font-semibold text-gray-900">
                  {userData.phone || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <UserIcon className="h-5 w-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500">Gender</p>
                <p className="text-sm font-semibold text-gray-900">
                  {userData.gender || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500">
                  Date of Birth
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {userData.dob || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Briefcase className="h-5 w-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500">Profession</p>
                <p className="text-sm font-semibold text-gray-900">
                  {userData.profession || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <MapPin className="h-5 w-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500">Location</p>
                <p className="text-sm font-semibold text-gray-900">
                  {[userData.city, userData.state].filter(Boolean).join(", ") ||
                    "N/A"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Stats - Only show for non-members */}
      {!isMember && (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="m22 21-3-3m0 0a5.26 5.26 0 0 1 0-5.74" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Branches
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Activities
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+5 new activities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Goal</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">Goal Complete</p>
          </CardContent>
        </Card>
      </div>
      )}

      {/* Membership Card - Show for everyone */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="relative overflow-hidden border border-orange-200 bg-white text-foreground shadow-xl">
          <CardHeader className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-orange-700">
              <UserPlus className="h-4 w-4 text-orange-600" />
              Join the movement
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-orange-700">
                Become a Member
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Unlock access to leadership training, cultural events, and a
                nationwide community dedicated to service.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Guided mentorship and training sessions",
                "Exclusive invites to regional and national events",
                "Collaborate on community impact initiatives",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button
              variant="secondary"
              className="group h-12 w-full items-center justify-center gap-2 rounded-xl  shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 "
            >
              <span className="text-sm font-semibold uppercase tracking-wide">
                Apply for Membership
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
