"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  galleryPageContent,
  photoCategories, 
  videoCategories,
  getPhotosByCategory,
  getVideosByCategory,
  formatDate,
  type PhotoItem,
  type VideoItem
} from './gallery';
import { Play, Calendar, MapPin, Eye, Filter } from 'lucide-react';

const GalleryPage = () => {
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState('all');
  const [selectedVideoCategory, setSelectedVideoCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredPhotos = getPhotosByCategory(selectedPhotoCategory);
  const filteredVideos = getVideosByCategory(selectedVideoCategory);

  return (
    <div className="min-h-screen bg-background">
      
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80">

        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-6 py-3 text-sm font-medium backdrop-blur-sm">
              📸 फोटो और वीडियो संग्रह
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-tight text-white">
            {galleryPageContent.title}
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
            {galleryPageContent.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 text-background" viewBox="0 0 1440 120" fill="currentColor">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      
      <section className="py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="photos" className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="inline-flex h-14 items-center justify-center rounded-2xl bg-muted/50 p-2 text-muted-foreground border border-border/50 backdrop-blur-sm shadow-lg">
                <TabsTrigger
                  value="photos"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-xl px-8 py-3 text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md gap-3"
                >
                  📸 फोटो गैलरी
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-xl px-8 py-3 text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md gap-3"
                >
                  🎬 वीडियो गैलरी
                </TabsTrigger>
              </TabsList>
            </div>

            
            <TabsContent value="photos" className="space-y-12">
              
              <div className="flex justify-center">
                <Card className="p-8 bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-sm border border-border/50 shadow-xl rounded-2xl max-w-4xl w-full">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Filter className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold text-foreground">
                      श्रेणी चुनें:
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {photoCategories.map((category) => (
                      <Button
                        key={category.key}
                        variant={selectedPhotoCategory === category.key ? "default" : "outline"}
                        size="lg"
                        onClick={() => setSelectedPhotoCategory(category.key)}
                        className={`${
                          selectedPhotoCategory === category.key 
                            ? "bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary shadow-lg" 
                            : "border-border/50 text-foreground hover:bg-accent/50 hover:border-primary/30"
                        } h-auto py-4 px-4 flex-col gap-2 transition-all duration-300`}
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <span className="text-sm font-medium text-center leading-tight">{category.label}</span>
                      </Button>
                    ))}
                  </div>
                </Card>
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredPhotos.map((photo) => (
                  <Card
                    key={photo.id}
                    className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] bg-gradient-to-b from-card to-card/95 border border-border/50 backdrop-blur-sm overflow-hidden rounded-2xl"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="relative aspect-square p-4">
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20">
                        <Image
                          src={photo.imageUrl}
                          alt={photo.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Hover Overlay Content */}
                        <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center gap-3 text-white">
                            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                              <Eye className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-sm font-bold">देखें</span>
                              <p className="text-xs opacity-90 mt-1">विस्तार से देखने के लिए क्लिक करें</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <figure>
                        <h3 className="font-bold text-foreground mb-3 line-clamp-2 text-lg leading-tight">
                          {photo.title}
                        </h3>
                        <figcaption className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                          {photo.caption}
                        </figcaption>
                      </figure>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {photo.date && (
                          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                            <Calendar className="w-3 h-3 text-primary" />
                            <span className="font-medium">{formatDate(photo.date)}</span>
                          </div>
                        )}
                        {photo.location && (
                          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span className="truncate font-medium">{photo.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPhotos.length === 0 && (
                <div className="text-center py-20">
                  <div className="mb-8">
                    <div className="text-8xl mb-4 opacity-50">📸</div>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary/50 to-primary mx-auto rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    इस श्रेणी में कोई फोटो नहीं मिली
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                    कृपया दूसरी श्रेणी का चयन करें या बाद में फिर से देखें
                  </p>
                </div>
              )}
            </TabsContent>

            
            <TabsContent value="videos" className="space-y-12">
              
              <div className="flex justify-center">
                <Card className="p-8 bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-sm border border-border/50 shadow-xl rounded-2xl max-w-4xl w-full">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Filter className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold text-foreground">
                      श्रेणी चुनें:
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {videoCategories.map((category) => (
                      <Button
                        key={category.key}
                        variant={selectedVideoCategory === category.key ? "default" : "outline"}
                        size="lg"
                        onClick={() => setSelectedVideoCategory(category.key)}
                        className={`${
                          selectedVideoCategory === category.key 
                            ? "bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary shadow-lg" 
                            : "border-border/50 text-foreground hover:bg-accent/50 hover:border-primary/30"
                        } h-auto py-4 px-4 flex-col gap-2 transition-all duration-300`}
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <span className="text-sm font-medium text-center leading-tight">{category.label}</span>
                      </Button>
                    ))}
                  </div>
                </Card>
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map((video) => (
                  <Card
                    key={video.id}
                    className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] bg-gradient-to-b from-card to-card/95 border border-border/50 backdrop-blur-sm overflow-hidden rounded-2xl"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative aspect-video p-4">
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20">
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/50 transition-colors duration-500 flex items-center justify-center">
                          <div className="bg-white/95 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                            <Play className="w-10 h-10 text-primary fill-primary" />
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                          {video.duration}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <figure>
                        <h3 className="font-bold text-foreground mb-3 line-clamp-2 text-lg leading-tight">
                          {video.title}
                        </h3>
                        <figcaption className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                          {video.caption}
                        </figcaption>
                      </figure>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                          <Calendar className="w-3 h-3 text-primary" />
                          <span className="font-medium">{formatDate(video.uploadDate)}</span>
                        </div>
                        {video.location && (
                          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span className="truncate font-medium">{video.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredVideos.length === 0 && (
                <div className="text-center py-20">
                  <div className="mb-8">
                    <div className="text-8xl mb-4 opacity-50">🎬</div>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary/50 to-primary mx-auto rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    इस श्रेणी में कोई वीडियो नहीं मिला
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                    कृपया दूसरी श्रेणी का चयन करें या बाद में फिर से देखें
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0 bg-gradient-to-br from-background to-background/95 text-foreground border-primary/20 shadow-2xl rounded-2xl overflow-hidden">
          {selectedPhoto && (
            <>
              <DialogHeader className="p-8 pb-0 bg-gradient-to-r from-primary/5 to-transparent">
                <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                  {selectedPhoto.title}
                </DialogTitle>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
              </DialogHeader>
              <div className="px-8 pb-8">
                <div className="relative aspect-video mb-8 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-muted/20 to-muted/10">
                  <Image
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1152px) 100vw, 1152px"
                  />
                </div>
                <figure className="mb-8">
                  <figcaption className="text-foreground/80 leading-relaxed mb-6 text-lg">
                    {selectedPhoto.caption}
                  </figcaption>
                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                    {selectedPhoto.date && (
                      <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-medium">{formatDate(selectedPhoto.date)}</span>
                      </div>
                    )}
                    {selectedPhoto.location && (
                      <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-medium">{selectedPhoto.location}</span>
                      </div>
                    )}
                  </div>
                </figure>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0 bg-gradient-to-br from-background to-background/95 text-foreground border-primary/20 shadow-2xl rounded-2xl overflow-hidden">
          {selectedVideo && (
            <>
              <DialogHeader className="p-8 pb-0 bg-gradient-to-r from-primary/5 to-transparent">
                <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                  {selectedVideo.title}
                </DialogTitle>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
              </DialogHeader>
              <div className="px-8 pb-8">
                <div className="relative aspect-video mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/10 shadow-2xl">
                  <iframe
                    src={selectedVideo.videoUrl}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                <figure className="mb-8">
                  <figcaption className="text-foreground/80 leading-relaxed mb-6 text-lg">
                    {selectedVideo.caption}
                  </figcaption>
                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                    <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full">
                      <Play className="w-5 h-5 text-primary" />
                      <span className="font-medium">{selectedVideo.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-medium">{formatDate(selectedVideo.uploadDate)}</span>
                    </div>
                    {selectedVideo.location && (
                      <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-medium">{selectedVideo.location}</span>
                      </div>
                    )}
                  </div>
                </figure>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
