"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  foundersTeam,
  stateTeam,
  getUniqueStates,
  getTeamMembersByState,
  pageContent,
  type TeamMember,
} from "./teamInfo";
import { Users, MapPin, Crown, Filter, User } from "lucide-react";

const FoundersTeamPage = () => {
  const [selectedState, setSelectedState] = useState<string>("all");
  const uniqueStates = getUniqueStates();
  const filteredStateTeam =
    selectedState === "all" ? stateTeam : getTeamMembersByState(selectedState);

  const TeamMemberCard = ({
    member,
    priority = false,
  }: {
    member: TeamMember;
    priority?: boolean;
  }) => (
    <Card
      className={`group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full border-0 ${
        priority
          ? "bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 shadow-lg"
          : "bg-gradient-to-br from-background to-muted/30 shadow-lg"
      }`}
    >
      <CardHeader className="text-center pb-6 flex-shrink-0">
        <div className="relative mx-auto mb-6">
          <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto">
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/60 transition-all duration-500 shadow-lg group-hover:shadow-xl">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 112px, 128px"
              />
            </div>
          </div>
          {priority && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-2 shadow-lg animate-pulse">
              <Crown className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <CardTitle className="text-xl font-bold text-foreground leading-tight min-h-[4rem] flex items-center justify-center text-center">
          {member.name}
        </CardTitle>
        
        <CardDescription className="text-primary font-bold text-base min-h-[3rem] flex items-center justify-center text-center">
          {member.position}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col px-6 pb-6">
        <div className="space-y-4 flex-1">
          {member.state && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{member.state}</span>
            </div>
          )}

          {member.bio && (
            <div className="flex-1 flex items-center bg-gradient-to-r from-muted/30 to-muted/20 p-4 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground text-center leading-relaxed line-clamp-3 font-medium">
                {member.bio}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Badge
            className={`w-full justify-center py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
              priority
                ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg"
                : "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground hover:from-secondary/90 hover:to-secondary shadow-lg"
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            {member.category === "founders" ? "मुख्य नेतृत्व" : "राज्य टीम"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-primary-foreground/20">
            <Users className="w-4 h-4" />
            हमारी टीम
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground mb-8 leading-tight">
            {pageContent.title}
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 font-medium mb-6 max-w-3xl mx-auto">
            {pageContent.subtitle}
          </p>

          <p className="text-lg text-primary-foreground/80 max-w-4xl mx-auto leading-relaxed">
            {pageContent.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-8 lg:h-12 text-background"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 C150,60 350,0 600,0 C850,0 1050,60 1200,120 L1200,120 L0,120 Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-14">
        <Tabs defaultValue="founders" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-14 items-center justify-center rounded-2xl bg-muted/50 backdrop-blur-sm p-2 text-muted-foreground border border-border shadow-lg">
              <TabsTrigger
                value="founders"
                className="inline-flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg whitespace-nowrap rounded-xl px-6 py-3 text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <Crown className="w-5 h-5" />
                मुख्य नेतृत्व
              </TabsTrigger>
              <TabsTrigger
                value="state-team"
                className="inline-flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg whitespace-nowrap rounded-xl px-6 py-3 text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <MapPin className="w-5 h-5" />
                राज्य टीम
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="founders" className="space-y-12">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Crown className="w-4 h-4" />
                मुख्य नेतृत्व
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {pageContent.foundersSection.title}
              </h2>
              <p className="text-lg sm:text-xl text-primary font-semibold mb-12 max-w-3xl mx-auto">
                {pageContent.foundersSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {foundersTeam.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  priority={index < 3}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="state-team" className="space-y-12">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <MapPin className="w-4 h-4" />
                राज्य टीम
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {pageContent.stateTeamSection.title}
              </h2>
              <p className="text-lg sm:text-xl text-primary font-semibold mb-12 max-w-3xl mx-auto">
                {pageContent.stateTeamSection.subtitle}
              </p>
            </div>

            <div className="flex justify-center mb-12">
              <Card className="p-8 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm border-0 shadow-xl">
                <div className="flex items-center gap-3 mb-6 justify-center">
                  <Filter className="w-6 h-6 text-primary" />
                  <span className="font-bold text-foreground text-lg">
                    राज्य के अनुसार फ़िल्टर करें:
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    variant={selectedState === "all" ? "default" : "outline"}
                    size="lg"
                    className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                      selectedState === "all" 
                        ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                        : "hover:bg-primary/10 hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedState("all")}
                  >
                    सभी राज्य
                  </Button>
                  {uniqueStates.map((state) => (
                    <Button
                      key={state}
                      variant={selectedState === state ? "default" : "outline"}
                      size="lg"
                      className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                        selectedState === state 
                          ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                          : "hover:bg-primary/10 hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedState(state)}
                    >
                      {state}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredStateTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>

            {filteredStateTeam.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-muted/50 rounded-2xl p-12 max-w-md mx-auto">
                  <Users className="w-20 h-20 text-muted-foreground/50 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    कोई टीम सदस्य नहीं मिला
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    चुने गए राज्य के लिए कोई टीम सदस्य उपलब्ध नहीं है।
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-20 pt-16 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-0 shadow-xl">
              <CardContent className="pt-0">
                <Crown className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-primary mb-2">
                  {foundersTeam.length}
                </h3>
                <p className="text-primary/80 font-bold text-lg">मुख्य नेतृत्व</p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-secondary/20 to-secondary/10 border-0 shadow-xl">
              <CardContent className="pt-0">
                <MapPin className="w-16 h-16 text-secondary-foreground mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-secondary-foreground mb-2">
                  {uniqueStates.length}
                </h3>
                <p className="text-secondary-foreground/80 font-bold text-lg">
                  राज्य कवरेज
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-accent/20 to-accent/10 border-0 shadow-xl">
              <CardContent className="pt-0">
                <Users className="w-16 h-16 text-accent-foreground mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-accent-foreground mb-2">
                  {stateTeam.length}
                </h3>
                <p className="text-accent-foreground/80 font-bold text-lg">
                  राज्य टीम सदस्य
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundersTeamPage;
