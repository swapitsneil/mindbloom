"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Heart, Activity } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [streak] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mindbloom_streak");
      if (stored) {
        const streakData = JSON.parse(stored);
        return streakData.count || 0;
      }
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900">
          Welcome to MindBloom
        </h1>
        <p className="text-lg text-purple-700 max-w-2xl mx-auto">
          A safe space to feel heard, find support, and take gentle steps toward wellness.
        </p>
        {streak > 0 && (
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-purple-200">
            <Activity className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 font-medium">{streak} day streak</span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all cursor-pointer hover:shadow-lg" onClick={() => router.push("/chat")}>
          <CardHeader>
            <MessageCircle className="w-8 h-8 text-purple-600 mb-2" />
            <CardTitle className="text-purple-900">Start Chatting</CardTitle>
            <CardDescription>Share how you are feeling right now</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">Talk Now</Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-pink-100 hover:border-pink-300 transition-all cursor-pointer hover:shadow-lg" onClick={() => router.push("/mood")}>
          <CardHeader>
            <Heart className="w-8 h-8 text-pink-600 mb-2" />
            <CardTitle className="text-pink-900">Check Mood</CardTitle>
            <CardDescription>Track how you are doing today</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-pink-600 hover:bg-pink-700">Check In</Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all cursor-pointer hover:shadow-lg" onClick={() => router.push("/journal")}>
          <CardHeader>
            <Activity className="w-8 h-8 text-blue-600 mb-2" />
            <CardTitle className="text-blue-900">Journal</CardTitle>
            <CardDescription>Write your thoughts freely</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Writing</Button>
          </CardContent>
        </Card>
      </div>

      {/* Safety Notice */}
      <div className="bg-white/60 backdrop-blur border border-purple-200 rounded-lg p-6 text-center">
        <p className="text-sm text-purple-800">
          <strong>Important:</strong> MindBloom is not therapy. If you are in crisis or danger, 
          please reach out to professional help immediately. We care about your safety.
        </p>
      </div>
    </div>
  );
}
